import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import Stripe from 'https://esm.sh/stripe@12.0.0?dts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2023-10-16' });

    const { tierId, successUrl, cancelUrl } = await req.json();
    if (!tierId || !successUrl || !cancelUrl) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const mockTiers = [
      { id: '1', name: 'Free', price: 0.00, interval: 'monthly' },
      { id: '2', name: 'Premium', price: 9.99, interval: 'monthly' },
      { id: '3', name: 'Annual Premium', price: 99.99, interval: 'yearly' },
    ];
    const tier = mockTiers.find(t => t.id === tierId);
    if (!tier) return new Response(JSON.stringify({ error: 'Invalid tier' }), { status: 404, headers: corsHeaders });

    const user = { id: 'mock-user-id', email: 'test@example.com' }; // replace with real user in production

    let customerId: string;
    const { data: existing } = await supabase
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .not('stripe_customer_id', 'is', null)
      .limit(1);

    if (existing?.length) {
      customerId = existing[0].stripe_customer_id;
    } else {
      const customer = await stripe.customers.create({ email: user.email });
      customerId = customer.id;
    }

    const productName = `${tier.name} Subscription`;
    const existingProducts = await stripe.products.list({
      limit: 1,
      active: true,
    });
    let productId;
    if (existingProducts.data.length > 0) {
      productId = existingProducts.data[0].id;
    } else {
      const product = await stripe.products.create({
        name: productName,
        description: productName,
      });
      productId = product.id;
    }

    const price = await stripe.prices.create({
      product: productId,
      currency: 'usd',
      unit_amount: Math.round(tier.price * 100), // Convert to cents
      recurring: {
        interval: tier.interval || 'month',
      },
    });

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [{ price: price.id, quantity: 1 }],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
