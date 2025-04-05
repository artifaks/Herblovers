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
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get Stripe secret key from environment variable
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({ error: 'Stripe secret key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    // For development/testing, use a mock user instead of verifying JWT
    // This allows testing the subscription flow without authentication
    // IMPORTANT: Replace this with proper authentication in production
    const mockUser = {
      id: 'mock-user-id',
      email: 'test@example.com',
    };
    const user = mockUser;

    // Parse request body
    const { tierId, successUrl, cancelUrl } = await req.json();

    if (!tierId || !successUrl || !cancelUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Mock subscription tiers data (matching our public-tiers function)
    const mockTiers = [
      {
        id: '1',
        name: 'Free',
        description: 'Basic access to herb information',
        price: 0.00,
        interval: 'monthly',
        features: {
          basic_herb_info: true,
          favorites: true,
          herb_categories: true
        },
        is_active: true
      },
      {
        id: '2',
        name: 'Premium',
        description: 'Full access to all herb details and features',
        price: 9.99,
        interval: 'monthly',
        features: {
          basic_herb_info: true,
          favorites: true,
          herb_categories: true,
          detailed_preparations: true,
          scientific_research: true,
          advanced_search: true
        },
        is_active: true
      },
      {
        id: '3',
        name: 'Annual Premium',
        description: 'Full access with yearly discount',
        price: 99.99,
        interval: 'yearly',
        features: {
          basic_herb_info: true,
          favorites: true,
          herb_categories: true,
          detailed_preparations: true,
          scientific_research: true,
          advanced_search: true,
          priority_support: true
        },
        is_active: true
      }
    ];
    
    // Find the tier in our mock data
    const tier = mockTiers.find(t => t.id === tierId);
    
    if (!tier) {
      return new Response(
        JSON.stringify({ error: 'Subscription tier not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user already has a Stripe customer ID
    let customerId;
    const { data: existingSubscriptions, error: subError } = await supabase
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .not('stripe_customer_id', 'is', null)
      .limit(1);

    if (!subError && existingSubscriptions && existingSubscriptions.length > 0) {
      customerId = existingSubscriptions[0].stripe_customer_id;
    } else {
      // Create a new customer in Stripe
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_id: user.id,
        },
      });
      customerId = customer.id;
    }

    // Create the price object based on the tier
    console.log('Creating price for tier:', tier);
    
        // For testing, we'll use a hardcoded price ID similar to your ebook implementation
    // This approach is more reliable for testing purposes
    let priceId;
    
    // Create a simple product for testing if it doesn't exist
    try {
      // First, check if we already have a product for testing
      const productName = `${tier.name} Subscription`;
      console.log('Looking for existing products with name:', productName);
      
      const existingProducts = await stripe.products.list({
        limit: 1,
        active: true,
      });
      
      let productId;
      
      if (existingProducts.data.length > 0) {
        // Use the first existing product
        productId = existingProducts.data[0].id;
        console.log('Using existing product:', productId);
      } else {
        // Create a new product
        console.log('Creating new product for testing');
        const product = await stripe.products.create({
          name: productName,
          description: tier.description || productName,
        });
        productId = product.id;
        console.log('Created new product with ID:', productId);
      }
      
      // Now create a price for this product
      console.log('Creating price for product:', productId);
      const price = await stripe.prices.create({
        product: productId,
        currency: 'usd',
        unit_amount: Math.round(tier.price * 100), // Convert to cents
        recurring: {
          interval: tier.interval || 'month',
        },
      });
      
      priceId = price.id;
      console.log('Created price with ID:', priceId);
    } catch (priceError) {
      console.error('Error creating price:', priceError);
      return new Response(
        JSON.stringify({ error: `Error creating price: ${priceError.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create checkout session - similar to your ebook sales implementation
    console.log('Creating checkout session with customer ID:', customerId);
    console.log('Success URL:', successUrl);
    console.log('Cancel URL:', cancelUrl);
    
    let session;
    try {
      // Create the session with minimal required parameters
      const sessionParams = {
        customer: customerId,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          user_id: user.id,
          tier_id: tierId,
        },
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        allow_promotion_codes: true,
      };
      
      console.log('Creating checkout session with params:', JSON.stringify(sessionParams));
      session = await stripe.checkout.sessions.create(sessionParams);
      
      console.log('Created checkout session:', session.id);
      console.log('Checkout URL:', session.url);
    } catch (sessionError) {
      console.error('Error creating checkout session:', sessionError);
      return new Response(
        JSON.stringify({ error: `Error creating checkout session: ${sessionError.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Return the checkout URL in the response
    console.log('Returning checkout URL:', session.url);
    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
