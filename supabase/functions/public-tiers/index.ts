import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

serve(async (req) => {
  // Enable CORS
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Content-Type': 'application/json',
  })

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers })
  }

  try {
    // Mock subscription tiers data
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
    ]

    // Return the mock subscription tiers
    return new Response(
      JSON.stringify({ tiers: mockTiers }),
      { headers, status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers, status: 500 }
    )
  }
})
