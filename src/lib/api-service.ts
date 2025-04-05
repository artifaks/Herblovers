import { supabase } from './supabase';

export interface ApiPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  request_limit: number;
  daily_rate_limit: number;
  features: Record<string, boolean>;
  is_active: boolean;
}

export interface ApiKey {
  id: string;
  user_id: string;
  plan_id: string;
  api_key: string;
  name: string;
  status: 'active' | 'revoked';
  last_used_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  plan?: ApiPlan;
}

export interface ApiUsage {
  id: string;
  api_key_id: string;
  endpoint: string;
  method: string;
  status_code: number;
  response_time_ms: number;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

export interface ApiUsageStats {
  total: number;
  daily: number;
  endpoints: Record<string, number>;
  methods: Record<string, number>;
  status_codes: Record<string, number>;
}

/**
 * Get all available API plans
 */
export const getApiPlans = async (): Promise<{ plans: ApiPlan[]; error?: string }> => {
  try {
    // Use the public-api-keys Edge Function instead of direct database access
    const { data, error } = await supabase.functions.invoke('public-api-keys');

    if (error) {
      console.error('Error fetching API plans:', error);
      return { 
        plans: [], 
        error: error.message 
      };
    }

    return { plans: data.plans as ApiPlan[] || [] };
  } catch (error) {
    console.error('Error fetching API plans:', error);
    return { 
      plans: [], 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

/**
 * Get user's API keys
 */
export const getUserApiKeys = async (): Promise<{ keys: ApiKey[]; error?: string }> => {
  try {
    // Use the public-api-keys Edge Function instead of direct database access
    const { data, error } = await supabase.functions.invoke('public-api-keys');

    if (error) {
      console.error('Error fetching API keys:', error);
      return { 
        keys: [], 
        error: error.message 
      };
    }

    return { keys: data.keys as ApiKey[] || [] };
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return { 
      keys: [], 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

/**
 * Create a new API key
 */
export const createApiKey = async (planId: string, name: string): Promise<{ key?: ApiKey; error?: string }> => {
  try {
    // First, generate a new API key using the RPC function
    const { data: apiKeyValue, error: genError } = await supabase.rpc('generate_api_key');
    
    if (genError) {
      console.error('Error generating API key:', genError);
      return { error: genError.message };
    }
    
    // Create the API key record
    const { data, error } = await supabase
      .from('api_keys')
      .insert({
        plan_id: planId,
        name,
        api_key: apiKeyValue,
        status: 'active',
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year expiry
      })
      .select(`
        *,
        plan:plan_id(*)
      `)
      .single();

    if (error) {
      console.error('Error creating API key:', error);
      return { error: error.message };
    }

    return { key: data as ApiKey };
  } catch (error) {
    console.error('Error creating API key:', error);
    return { 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

/**
 * Revoke an API key
 */
export const revokeApiKey = async (keyId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('api_keys')
      .update({ status: 'revoked' })
      .eq('id', keyId);

    if (error) {
      console.error('Error revoking API key:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error revoking API key:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

/**
 * Get API usage for a specific key
 */
export const getApiKeyUsage = async (keyId: string): Promise<{ usage: ApiUsage[]; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('api_usage')
      .select('*')
      .eq('api_key_id', keyId)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching API usage:', error);
      return { 
        usage: [], 
        error: error.message 
      };
    }

    return { usage: data as ApiUsage[] || [] };
  } catch (error) {
    console.error('Error fetching API usage:', error);
    return { 
      usage: [], 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

/**
 * Get API usage statistics for a specific key
 */
export const getApiKeyUsageStats = async (keyId: string): Promise<{ stats?: ApiUsageStats; error?: string }> => {
  try {
    // Get total usage
    const { count: total, error: totalError } = await supabase
      .from('api_usage')
      .select('*', { count: 'exact', head: true })
      .eq('api_key_id', keyId);

    if (totalError) {
      console.error('Error fetching API usage stats:', totalError);
      return { error: totalError.message };
    }

    // Get daily usage (last 24 hours)
    const { count: daily, error: dailyError } = await supabase
      .from('api_usage')
      .select('*', { count: 'exact', head: true })
      .eq('api_key_id', keyId)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if (dailyError) {
      console.error('Error fetching API usage stats:', dailyError);
      return { error: dailyError.message };
    }

    // Get endpoint usage
    const { data: endpointData, error: endpointError } = await supabase
      .from('api_usage')
      .select('endpoint')
      .eq('api_key_id', keyId);

    if (endpointError) {
      console.error('Error fetching API usage stats:', endpointError);
      return { error: endpointError.message };
    }

    // Count endpoints
    const endpoints: Record<string, number> = {};
    endpointData.forEach(item => {
      endpoints[item.endpoint] = (endpoints[item.endpoint] || 0) + 1;
    });

    // Get method usage
    const { data: methodData, error: methodError } = await supabase
      .from('api_usage')
      .select('method')
      .eq('api_key_id', keyId);

    if (methodError) {
      console.error('Error fetching API usage stats:', methodError);
      return { error: methodError.message };
    }

    // Count methods
    const methods: Record<string, number> = {};
    methodData.forEach(item => {
      methods[item.method] = (methods[item.method] || 0) + 1;
    });

    // Get status code usage
    const { data: statusData, error: statusError } = await supabase
      .from('api_usage')
      .select('status_code')
      .eq('api_key_id', keyId);

    if (statusError) {
      console.error('Error fetching API usage stats:', statusError);
      return { error: statusError.message };
    }

    // Count status codes
    const status_codes: Record<string, number> = {};
    statusData.forEach(item => {
      status_codes[item.status_code] = (status_codes[item.status_code] || 0) + 1;
    });

    return {
      stats: {
        total: total || 0,
        daily: daily || 0,
        endpoints,
        methods,
        status_codes,
      }
    };
  } catch (error) {
    console.error('Error fetching API usage stats:', error);
    return { 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

/**
 * Create a Stripe checkout session for API plan
 */
export const createApiPlanCheckout = async (
  planId: string, 
  successUrl: string, 
  cancelUrl: string
): Promise<{ sessionUrl?: string; error?: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke('create-api-plan-checkout', {
      body: { planId, successUrl, cancelUrl }
    });

    if (error) {
      console.error('Error creating API plan checkout:', error);
      return { error: error.message };
    }

    return { sessionUrl: data.url };
  } catch (error) {
    console.error('Error creating API plan checkout:', error);
    return { 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};
