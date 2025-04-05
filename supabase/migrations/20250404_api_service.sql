-- Create API plans table
CREATE TABLE IF NOT EXISTS api_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  request_limit INTEGER NOT NULL,
  daily_rate_limit INTEGER NOT NULL,
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create API keys table
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES api_plans(id) ON DELETE CASCADE,
  api_key TEXT NOT NULL UNIQUE,
  name TEXT,
  status TEXT NOT NULL, -- 'active', 'revoked'
  last_used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create API usage tracking table
CREATE TABLE IF NOT EXISTS api_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  api_key_id UUID NOT NULL REFERENCES api_keys(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER NOT NULL,
  response_time_ms INTEGER,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create API billing table
CREATE TABLE IF NOT EXISTS api_billing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES api_plans(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL, -- 'pending', 'paid', 'failed'
  billing_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  billing_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  invoice_url TEXT,
  stripe_invoice_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Set up triggers for updated_at
CREATE TRIGGER update_api_plans_updated_at
BEFORE UPDATE ON api_plans
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_api_keys_updated_at
BEFORE UPDATE ON api_keys
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_api_billing_updated_at
BEFORE UPDATE ON api_billing
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert default API plans
INSERT INTO api_plans (name, description, price, request_limit, daily_rate_limit, features)
VALUES 
  ('Free', 'Basic API access with limited requests', 0.00, 1000, 100, '{"basic_herb_info": true, "categories": true}'),
  ('Basic', 'Standard API access for small projects', 29.99, 10000, 1000, '{"basic_herb_info": true, "detailed_herb_info": true, "categories": true, "search": true}'),
  ('Premium', 'Unlimited API access for production applications', 99.99, 100000, 5000, '{"basic_herb_info": true, "detailed_herb_info": true, "categories": true, "search": true, "advanced_filtering": true, "bulk_operations": true}');

-- Create or replace is_admin function if it doesn't exist
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  admin_emails TEXT[] := ARRAY['artifaks@gmail.com']; -- Add admin emails here
BEGIN
  RETURN (
    auth.email() = ANY(admin_emails)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Set up Row Level Security (RLS) policies
ALTER TABLE api_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_billing ENABLE ROW LEVEL SECURITY;

-- API plans are viewable by all
CREATE POLICY "API plans are viewable by all"
  ON api_plans FOR SELECT
  USING (true);

-- Only admins can modify API plans
CREATE POLICY "Only admins can insert API plans"
  ON api_plans FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update API plans"
  ON api_plans FOR UPDATE
  USING (is_admin());

CREATE POLICY "Only admins can delete API plans"
  ON api_plans FOR DELETE
  USING (is_admin());

-- Users can view their own API keys
CREATE POLICY "Users can view their own API keys"
  ON api_keys FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own API keys
CREATE POLICY "Users can create their own API keys"
  ON api_keys FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own API keys
CREATE POLICY "Users can update their own API keys"
  ON api_keys FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own API keys
CREATE POLICY "Users can delete their own API keys"
  ON api_keys FOR DELETE
  USING (auth.uid() = user_id);

-- API usage is viewable by the API key owner
CREATE POLICY "API usage is viewable by the API key owner"
  ON api_usage FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM api_keys
      WHERE api_keys.id = api_usage.api_key_id
      AND api_keys.user_id = auth.uid()
    )
  );

-- Only the system can insert API usage records
CREATE POLICY "Only the system can insert API usage"
  ON api_usage FOR INSERT
  WITH CHECK (is_admin());

-- Users can view their own billing records
CREATE POLICY "Users can view their own billing records"
  ON api_billing FOR SELECT
  USING (auth.uid() = user_id);

-- Only admins can insert/update/delete billing records
CREATE POLICY "Only admins can insert billing records"
  ON api_billing FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update billing records"
  ON api_billing FOR UPDATE
  USING (is_admin());

CREATE POLICY "Only admins can delete billing records"
  ON api_billing FOR DELETE
  USING (is_admin());

-- Create function to check if an API key is valid and has not exceeded its limits
CREATE OR REPLACE FUNCTION is_valid_api_key(api_key_value TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  key_exists BOOLEAN;
  key_active BOOLEAN;
  key_expired BOOLEAN;
  daily_limit_exceeded BOOLEAN;
  total_limit_exceeded BOOLEAN;
  api_key_id UUID;
  plan_id UUID;
  daily_rate_limit INTEGER;
  request_limit INTEGER;
  daily_count INTEGER;
  total_count INTEGER;
BEGIN
  -- Check if API key exists and is active
  SELECT 
    EXISTS(SELECT 1 FROM api_keys WHERE api_key = api_key_value) INTO key_exists;
  
  IF NOT key_exists THEN
    RETURN FALSE;
  END IF;
  
  SELECT 
    id,
    status = 'active',
    COALESCE(expires_at < now(), FALSE),
    plan_id
  INTO 
    api_key_id,
    key_active,
    key_expired,
    plan_id
  FROM api_keys 
  WHERE api_key = api_key_value;
  
  IF NOT key_active OR key_expired THEN
    RETURN FALSE;
  END IF;
  
  -- Get plan limits
  SELECT 
    daily_rate_limit,
    request_limit
  INTO 
    daily_rate_limit,
    request_limit
  FROM api_plans
  WHERE id = plan_id;
  
  -- Check daily usage
  SELECT 
    COUNT(*)
  INTO 
    daily_count
  FROM api_usage
  WHERE 
    api_key_id = api_key_id
    AND created_at > (now() - interval '1 day');
  
  daily_limit_exceeded := daily_count >= daily_rate_limit;
  
  -- Check total usage (for billing period - assume monthly)
  SELECT 
    COUNT(*)
  INTO 
    total_count
  FROM api_usage
  WHERE 
    api_key_id = api_key_id
    AND created_at > date_trunc('month', now());
  
  total_limit_exceeded := total_count >= request_limit;
  
  -- Update last used timestamp
  UPDATE api_keys
  SET last_used_at = now()
  WHERE id = api_key_id;
  
  RETURN NOT (daily_limit_exceeded OR total_limit_exceeded);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to log API usage
CREATE OR REPLACE FUNCTION log_api_usage(
  api_key_value TEXT,
  endpoint TEXT,
  method TEXT,
  status_code INTEGER,
  response_time_ms INTEGER,
  ip_address TEXT,
  user_agent TEXT
)
RETURNS VOID AS $$
DECLARE
  api_key_id UUID;
BEGIN
  -- Get API key ID
  SELECT id INTO api_key_id
  FROM api_keys
  WHERE api_key = api_key_value;
  
  -- Insert usage record
  INSERT INTO api_usage (
    api_key_id,
    endpoint,
    method,
    status_code,
    response_time_ms,
    ip_address,
    user_agent
  ) VALUES (
    api_key_id,
    endpoint,
    method,
    status_code,
    response_time_ms,
    ip_address,
    user_agent
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to generate a secure API key
CREATE OR REPLACE FUNCTION generate_api_key()
RETURNS TEXT AS $$
DECLARE
  key TEXT;
  key_exists BOOLEAN;
BEGIN
  LOOP
    -- Generate a random string for the API key (prefix with 'hh_' for Herb Harmony)
    key := 'hh_' || encode(gen_random_bytes(24), 'base64');
    
    -- Replace any non-alphanumeric characters
    key := regexp_replace(key, '[^a-zA-Z0-9]', '', 'g');
    
    -- Check if this key already exists
    SELECT EXISTS(SELECT 1 FROM api_keys WHERE api_key = key) INTO key_exists;
    
    -- If the key doesn't exist, we can use it
    IF NOT key_exists THEN
      RETURN key;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;
