-- Drop the existing policy
DROP POLICY IF EXISTS "Subscription tiers are viewable by all" ON subscription_tiers;

-- Create a new policy that allows anonymous access
CREATE POLICY "Subscription tiers are viewable by all"
  ON subscription_tiers FOR SELECT
  USING (true);

-- Drop the existing policy for API plans
DROP POLICY IF EXISTS "API plans are viewable by all" ON api_plans;

-- Create a new policy that allows anonymous access to API plans
CREATE POLICY "API plans are viewable by all"
  ON api_plans FOR SELECT
  USING (true);
