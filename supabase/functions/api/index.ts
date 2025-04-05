import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

interface ApiResponse {
  status: number;
  body: any;
}

// Helper function to validate API key
async function validateApiKey(
  supabase: any,
  apiKey: string | null
): Promise<{ valid: boolean; plan?: any; error?: string }> {
  if (!apiKey) {
    return { valid: false, error: 'API key is required' };
  }

  // Call the database function to check if the API key is valid
  const { data, error } = await supabase.rpc('is_valid_api_key', {
    api_key_value: apiKey,
  });

  if (error) {
    console.error('Error validating API key:', error);
    return { valid: false, error: 'Error validating API key' };
  }

  if (!data) {
    return { valid: false, error: 'Invalid API key or rate limit exceeded' };
  }

  // Get the plan details for the API key
  const { data: keyData, error: keyError } = await supabase
    .from('api_keys')
    .select('plan_id')
    .eq('api_key', apiKey)
    .single();

  if (keyError) {
    console.error('Error fetching API key details:', keyError);
    return { valid: false, error: 'Error fetching API key details' };
  }

  const { data: planData, error: planError } = await supabase
    .from('api_plans')
    .select('*')
    .eq('id', keyData.plan_id)
    .single();

  if (planError) {
    console.error('Error fetching plan details:', planError);
    return { valid: false, error: 'Error fetching plan details' };
  }

  return { valid: true, plan: planData };
}

// Helper function to log API usage
async function logApiUsage(
  supabase: any,
  apiKey: string,
  endpoint: string,
  method: string,
  statusCode: number,
  responseTimeMs: number,
  ipAddress: string,
  userAgent: string
): Promise<void> {
  try {
    await supabase.rpc('log_api_usage', {
      api_key_value: apiKey,
      endpoint,
      method,
      status_code: statusCode,
      response_time_ms: responseTimeMs,
      ip_address: ipAddress,
      user_agent: userAgent,
    });
  } catch (error) {
    console.error('Error logging API usage:', error);
  }
}

// Handler for /herbs endpoint
async function getHerbs(supabase: any, plan: any, url: URL): Promise<ApiResponse> {
  // Check if the plan allows access to this endpoint
  if (!plan.features.basic_herb_info) {
    return {
      status: 403,
      body: { error: 'Your plan does not include access to this endpoint' },
    };
  }

  // Parse query parameters
  const category = url.searchParams.get('category');
  const limit = parseInt(url.searchParams.get('limit') || '50', 10);
  const offset = parseInt(url.searchParams.get('offset') || '0', 10);
  
  // Base query
  let query = supabase.from('herbs').select('id, name, scientificName, category, description');
  
  // Add category filter if provided
  if (category) {
    query = query.eq('category', category);
  }
  
  // Add pagination
  query = query.range(offset, offset + limit - 1);
  
  // Execute query
  const { data, error, count } = await query;
  
  if (error) {
    console.error('Error fetching herbs:', error);
    return {
      status: 500,
      body: { error: 'Error fetching herbs' },
    };
  }
  
  return {
    status: 200,
    body: {
      data,
      metadata: {
        count: data.length,
        offset,
        limit,
      },
    },
  };
}

// Handler for /herbs/:id endpoint
async function getHerbById(supabase: any, plan: any, herbId: string): Promise<ApiResponse> {
  // Check if the plan allows access to this endpoint
  if (!plan.features.basic_herb_info) {
    return {
      status: 403,
      body: { error: 'Your plan does not include access to this endpoint' },
    };
  }

  // Determine which fields to select based on the plan
  let selectFields = 'id, name, scientificName, category, description, benefits, usage, cautions';
  
  // If the plan includes detailed herb info, select additional fields
  if (plan.features.detailed_herb_info) {
    selectFields += ', preparations, benefitScores, complementaryHerbs, origin, harvestSeason, parts, traditionalUses, constituents, sustainabilityInfo, growingInfo, image, safetyProfile, scientificResearch, tags, audience, detailedPreparations';
  }
  
  // Execute query
  const { data, error } = await supabase
    .from('herbs')
    .select(selectFields)
    .eq('id', herbId)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      return {
        status: 404,
        body: { error: 'Herb not found' },
      };
    }
    
    console.error('Error fetching herb:', error);
    return {
      status: 500,
      body: { error: 'Error fetching herb' },
    };
  }
  
  return {
    status: 200,
    body: { data },
  };
}

// Handler for /categories endpoint
async function getCategories(supabase: any, plan: any): Promise<ApiResponse> {
  // Check if the plan allows access to this endpoint
  if (!plan.features.categories) {
    return {
      status: 403,
      body: { error: 'Your plan does not include access to this endpoint' },
    };
  }

  // Get unique categories from herbs table
  const { data, error } = await supabase
    .from('herbs')
    .select('category')
    .order('category');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return {
      status: 500,
      body: { error: 'Error fetching categories' },
    };
  }
  
  // Extract unique categories
  const categories = [...new Set(data.map(herb => herb.category))];
  
  return {
    status: 200,
    body: { data: categories },
  };
}

// Handler for /search endpoint
async function searchHerbs(supabase: any, plan: any, url: URL): Promise<ApiResponse> {
  // Check if the plan allows access to this endpoint
  if (!plan.features.search) {
    return {
      status: 403,
      body: { error: 'Your plan does not include access to this endpoint' },
    };
  }

  const query = url.searchParams.get('query');
  
  if (!query) {
    return {
      status: 400,
      body: { error: 'Search query is required' },
    };
  }
  
  // Determine which fields to select based on the plan
  let selectFields = 'id, name, scientificName, category, description';
  
  // If the plan includes detailed herb info, select additional fields
  if (plan.features.detailed_herb_info) {
    selectFields += ', benefits, usage';
  }
  
  // Execute search query
  const { data, error } = await supabase
    .from('herbs')
    .select(selectFields)
    .or(`name.ilike.%${query}%, scientificName.ilike.%${query}%, description.ilike.%${query}%`)
    .limit(50);
  
  if (error) {
    console.error('Error searching herbs:', error);
    return {
      status: 500,
      body: { error: 'Error searching herbs' },
    };
  }
  
  return {
    status: 200,
    body: {
      data,
      metadata: {
        count: data.length,
        query,
      },
    },
  };
}

// Main request handler
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const startTime = Date.now();
  
  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get API key from request headers
    const apiKey = req.headers.get('x-api-key');
    
    // Validate API key
    const { valid, plan, error } = await validateApiKey(supabase, apiKey);
    
    if (!valid) {
      return new Response(
        JSON.stringify({ error: error || 'Invalid API key' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse URL and extract path components
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    
    // Skip the 'api' part of the path if present
    const startIndex = pathParts[0] === 'api' ? 1 : 0;
    const resource = pathParts[startIndex];
    const id = pathParts[startIndex + 1];

    // Route request to appropriate handler
    let response: ApiResponse;
    
    if (resource === 'herbs' && !id) {
      response = await getHerbs(supabase, plan, url);
    } else if (resource === 'herbs' && id) {
      response = await getHerbById(supabase, plan, id);
    } else if (resource === 'categories') {
      response = await getCategories(supabase, plan);
    } else if (resource === 'search') {
      response = await searchHerbs(supabase, plan, url);
    } else {
      response = {
        status: 404,
        body: { error: 'Endpoint not found' },
      };
    }

    // Log API usage
    const responseTime = Date.now() - startTime;
    const ipAddress = req.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    if (apiKey) {
      await logApiUsage(
        supabase,
        apiKey,
        url.pathname,
        req.method,
        response.status,
        responseTime,
        ipAddress,
        userAgent
      );
    }

    return new Response(
      JSON.stringify(response.body),
      { 
        status: response.status, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Unhandled error:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
