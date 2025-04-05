-- Create subscription_tiers table
CREATE TABLE IF NOT EXISTS subscription_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  interval TEXT NOT NULL, -- 'monthly', 'yearly'
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_subscriptions table to track user subscriptions
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier_id UUID NOT NULL REFERENCES subscription_tiers(id) ON DELETE CASCADE,
  status TEXT NOT NULL, -- 'active', 'canceled', 'past_due'
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT false,
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, tier_id)
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_subscription_tiers_updated_at
BEFORE UPDATE ON subscription_tiers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at
BEFORE UPDATE ON user_subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert default subscription tiers
INSERT INTO subscription_tiers (name, description, price, interval, features)
VALUES 
  ('Free', 'Basic access to herb information', 0.00, 'monthly', '{"basic_herb_info": true, "favorites": true, "herb_categories": true}'),
  ('Premium', 'Full access to all herb details and features', 9.99, 'monthly', '{"basic_herb_info": true, "favorites": true, "herb_categories": true, "detailed_preparations": true, "scientific_research": true, "advanced_search": true}'),
  ('Annual Premium', 'Full access with yearly discount', 99.99, 'yearly', '{"basic_herb_info": true, "favorites": true, "herb_categories": true, "detailed_preparations": true, "scientific_research": true, "advanced_search": true, "priority_support": true}');

-- Set up Row Level Security (RLS) policies
ALTER TABLE subscription_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Subscription tiers are viewable by all
CREATE POLICY "Subscription tiers are viewable by all"
  ON subscription_tiers FOR SELECT
  USING (true);

-- Only admins can modify subscription tiers
CREATE POLICY "Only admins can insert subscription tiers"
  ON subscription_tiers FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update subscription tiers"
  ON subscription_tiers FOR UPDATE
  USING (is_admin());

CREATE POLICY "Only admins can delete subscription tiers"
  ON subscription_tiers FOR DELETE
  USING (is_admin());

-- Users can view their own subscriptions
CREATE POLICY "Users can view their own subscriptions"
  ON user_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Only admins can insert/update/delete user subscriptions (or will be handled by Stripe webhook)
CREATE POLICY "Only admins can insert user subscriptions"
  ON user_subscriptions FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update user subscriptions"
  ON user_subscriptions FOR UPDATE
  USING (is_admin());

CREATE POLICY "Only admins can delete user subscriptions"
  ON user_subscriptions FOR DELETE
  USING (is_admin());

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

-- Create function to check if a user has an active subscription
CREATE OR REPLACE FUNCTION has_active_subscription(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  has_subscription BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM user_subscriptions
    WHERE user_id = user_uuid
    AND status = 'active'
    AND current_period_end > now()
  ) INTO has_subscription;
  
  RETURN has_subscription;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user's subscription tier
CREATE OR REPLACE FUNCTION get_user_subscription_tier(user_uuid UUID)
RETURNS TEXT AS $$
DECLARE
  tier_name TEXT;
BEGIN
  SELECT t.name INTO tier_name
  FROM user_subscriptions s
  JOIN subscription_tiers t ON s.tier_id = t.id
  WHERE s.user_id = user_uuid
  AND s.status = 'active'
  AND s.current_period_end > now()
  LIMIT 1;
  
  RETURN COALESCE(tier_name, 'Free');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
