import { supabase } from './supabase';

export interface SubscriptionTier {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: Record<string, boolean>;
  is_active: boolean;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  tier_id: string;
  status: 'active' | 'canceled' | 'past_due';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  tier?: SubscriptionTier;
}

/**
 * Get all available subscription tiers
 */
export const getSubscriptionTiers = async (): Promise<{ tiers: SubscriptionTier[]; error?: string }> => {
  try {
    // Use the public-tiers Edge Function instead of direct database access
    const { data, error } = await supabase.functions.invoke('public-tiers');

    if (error) {
      console.error('Error fetching subscription tiers:', error);
      return { 
        tiers: [], 
        error: error.message 
      };
    }

    return { tiers: data.tiers as SubscriptionTier[] || [] };
  } catch (error) {
    console.error('Error fetching subscription tiers:', error);
    return { 
      tiers: [], 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

/**
 * Get current user's subscription
 */
export const getUserSubscription = async (): Promise<{ subscription?: UserSubscription; error?: string }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('user_subscriptions')
      .select(`
        *,
        tier:tier_id(*)
      `)
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows returned" error
      console.error('Error fetching user subscription:', error);
      return { error: error.message };
    }

    return { subscription: data as UserSubscription };
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    return { 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

/**
 * Check if user has access to a specific feature
 */
export const hasFeatureAccess = async (featureName: string): Promise<boolean> => {
  try {
    const { subscription, error } = await getUserSubscription();
    
    if (error || !subscription) {
      // If there's an error or no subscription, check if the feature is available in the free tier
      const { tiers } = await getSubscriptionTiers();
      const freeTier = tiers.find(tier => tier.price === 0);
      return freeTier?.features?.[featureName] || false;
    }
    
    // @ts-ignore - tier is added in the join
    return subscription.tier?.features?.[featureName] || false;
  } catch (error) {
    console.error('Error checking feature access:', error);
    return false;
  }
};

/**
 * Create a Stripe checkout session for subscription
 */
export const createSubscriptionCheckout = async (
  tierId: string, 
  successUrl: string, 
  cancelUrl: string
): Promise<{ sessionUrl?: string; error?: string }> => {
  try {
    console.log('Creating subscription checkout for tier:', tierId);
    
    // Direct API call to the Edge Function (similar to the ebook implementation)
    const response = await fetch(
      'https://guafuutwjluavxwkfvbk.supabase.co/functions/v1/create-subscription-checkout',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tierId,
          successUrl,
          cancelUrl,
        }),
      }
    );

    const data = await response.json();
    console.log('Stripe checkout response:', data);

    if (!response.ok) {
      return { error: data.error || 'Error creating checkout session' };
    }

    if (!data.url) {
      return { error: 'No checkout URL returned' };
    }

    return { sessionUrl: data.url };
  } catch (error) {
    console.error('Error in createSubscriptionCheckout:', error);
    return { error: error instanceof Error ? error.message : 'Failed to create checkout session' };
  }
};

/**
 * Cancel user's subscription
 */
export const cancelSubscription = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    const { subscription, error: subError } = await getUserSubscription();
    
    if (subError || !subscription) {
      return { success: false, error: subError || 'No active subscription found' };
    }

    const { data, error } = await supabase.functions.invoke('cancel-subscription', {
      body: { subscriptionId: subscription.stripe_subscription_id }
    });

    if (error) {
      console.error('Error canceling subscription:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
};

/**
 * Get user's current subscription tier name
 * Returns 'Free' if no active subscription
 */
export const getUserTier = async (): Promise<string> => {
  try {
    const { subscription } = await getUserSubscription();
    
    if (!subscription) {
      return 'Free';
    }
    
    // @ts-ignore - tier is added in the join
    return subscription.tier?.name || 'Free';
  } catch (error) {
    console.error('Error getting user tier:', error);
    return 'Free';
  }
};
