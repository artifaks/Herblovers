import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import Stripe from 'https://esm.sh/stripe@12.0.0?dts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get the Stripe webhook secret from environment variable
    const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeWebhookSecret || !stripeSecretKey) {
      console.error('Missing Stripe webhook secret or API key');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    // Get the signature from the headers
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return new Response(
        JSON.stringify({ error: 'No Stripe signature found' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get the raw body
    const body = await req.text();
    
    // Verify the webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(
        JSON.stringify({ error: `Webhook signature verification failed: ${err.message}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Extract metadata from the session
        const userId = session.metadata?.user_id;
        const tierId = session.metadata?.tier_id;
        
        if (!userId || !tierId) {
          console.error('Missing user_id or tier_id in session metadata');
          return new Response(
            JSON.stringify({ error: 'Missing metadata' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
        
        // Get the subscription from Stripe
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        
        // Insert or update the user's subscription in the database
        const { error: upsertError } = await supabase
          .from('user_subscriptions')
          .upsert({
            user_id: userId,
            tier_id: tierId,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
            stripe_subscription_id: subscription.id,
            stripe_customer_id: subscription.customer,
          }, {
            onConflict: 'user_id, tier_id',
          });
          
        if (upsertError) {
          console.error('Error upserting subscription:', upsertError);
          return new Response(
            JSON.stringify({ error: 'Database error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
        }
        
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        
        // Find the user subscription in the database
        const { data: userSubscriptions, error: findError } = await supabase
          .from('user_subscriptions')
          .select('id')
          .eq('stripe_subscription_id', subscription.id);
          
        if (findError || !userSubscriptions || userSubscriptions.length === 0) {
          console.error('Subscription not found in database:', subscription.id);
          return new Response(
            JSON.stringify({ error: 'Subscription not found' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
          );
        }
        
        // Update the subscription in the database
        const { error: updateError } = await supabase
          .from('user_subscriptions')
          .update({
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          })
          .eq('stripe_subscription_id', subscription.id);
          
        if (updateError) {
          console.error('Error updating subscription:', updateError);
          return new Response(
            JSON.stringify({ error: 'Database error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
        }
        
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        
        // Update the subscription status in the database
        const { error: updateError } = await supabase
          .from('user_subscriptions')
          .update({
            status: 'canceled',
            cancel_at_period_end: false,
          })
          .eq('stripe_subscription_id', subscription.id);
          
        if (updateError) {
          console.error('Error updating subscription:', updateError);
          return new Response(
            JSON.stringify({ error: 'Database error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
        }
        
        break;
      }
      
      default:
        // Ignore other event types
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
