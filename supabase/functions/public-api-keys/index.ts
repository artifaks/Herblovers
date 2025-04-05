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
    // Mock API plans data
    const mockApiPlans = [
      {
        id: '1',
        name: 'Free',
        description: 'Basic API access with limited requests',
        price: 0.00,
        request_limit: 1000,
        daily_rate_limit: 100,
        features: {
          basic_herb_info: true,
          categories: true
        },
        is_active: true
      },
      {
        id: '2',
        name: 'Basic',
        description: 'Standard API access for small projects',
        price: 29.99,
        request_limit: 10000,
        daily_rate_limit: 1000,
        features: {
          basic_herb_info: true,
          detailed_herb_info: true,
          categories: true,
          search: true
        },
        is_active: true
      },
      {
        id: '3',
        name: 'Premium',
        description: 'Unlimited API access for production applications',
        price: 99.99,
        request_limit: 100000,
        daily_rate_limit: 5000,
        features: {
          basic_herb_info: true,
          detailed_herb_info: true,
          categories: true,
          search: true,
          advanced_filtering: true,
          bulk_operations: true
        },
        is_active: true
      }
    ]

    // Mock API keys data
    const mockApiKeys = [
      {
        id: '1',
        name: 'Test API Key',
        api_key: 'hh_' + Math.random().toString(36).substring(2, 15),
        plan_id: '2',
        status: 'active',
        created_at: new Date().toISOString(),
        last_used_at: new Date().toISOString(),
        plan: mockApiPlans[1]
      }
    ]

    // Return the mock API data
    return new Response(
      JSON.stringify({ 
        plans: mockApiPlans,
        keys: mockApiKeys
      }),
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
