import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ebookId, returnUrl } = await req.json();
    
    console.log(`Fetching ebook with ID: ${ebookId}`);
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );
    
    // Get the eBook details from Supabase
    const { data: ebook, error } = await supabaseClient
      .from('ebooks')
      .select('*')
      .eq('id', ebookId)
      .single();
    
    if (error || !ebook) {
      console.error('Error fetching ebook:', error);
      throw new Error('Ebook not found');
    }
    
    console.log(`Creating checkout session for ebook: ${ebook.title} (${ebookId})`);
    
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });
    
    // Check if we already have a Stripe product ID for this ebook
    let productId = ebook.stripe_product_id;
    let priceId = ebook.stripe_price_id;
    
    // If we don't have a product ID yet, create one
    if (!productId) {
      console.log('No Stripe product ID found, creating on-demand product');
      const product = await stripe.products.create({
        name: ebook.title,
        description: ebook.description,
        images: ebook.cover_image_url ? [ebook.cover_image_url] : [],
        metadata: {
          ebook_id: ebook.id
        }
      });
      
      productId = product.id;
      
      // Update the ebook with the Stripe product ID
      await supabaseClient
        .from('ebooks')
        .update({ stripe_product_id: productId })
        .eq('id', ebookId);
    } else {
      console.log(`Using Stripe product ID: ${productId}`);
    }
    
    // If we don't have a price ID yet, create one
    if (!priceId) {
      const price = await stripe.prices.create({
        product: productId,
        unit_amount: Math.round(ebook.price * 100), // Convert to cents
        currency: 'usd',
      });
      
      priceId = price.id;
      
      // Update the ebook with the Stripe price ID
      await supabaseClient
        .from('ebooks')
        .update({ stripe_price_id: priceId })
        .eq('id', ebookId);
    } else {
      console.log(`Using cached price ID: ${priceId}`);
    }
    
    // Use the provided return URL or the default one
    const origin = returnUrl || req.headers.get('origin');
    if (!origin) {
      console.error('Return URL not provided and origin header missing, using fallback URL');
    }
    
    // Create a Stripe checkout session with fixed success URL
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Ensure the success_url points to a valid route in your application
      success_url: `${origin || 'https://your-app-url.com'}/ebooks?success=true&ebookId=${ebookId}`,
      cancel_url: `${origin || 'https://your-app-url.com'}/ebooks?canceled=true`,
    });
    
    console.log(`Checkout session created: ${session.id}, URL: ${session.url}`);
    
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
