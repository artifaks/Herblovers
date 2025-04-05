import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getSubscriptionTiers, 
  getUserSubscription, 
  createSubscriptionCheckout,
  cancelSubscription,
  SubscriptionTier,
  UserSubscription
} from '@/lib/subscription-service';
import { supabase } from '@/lib/supabase';
import { Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SubscriptionPage: React.FC = () => {
  const [tiers, setTiers] = useState<SubscriptionTier[]>([]);
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelingSubscription, setCancelingSubscription] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUser(data.session.user);
      }
    };

    checkAuth();
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Load subscription tiers
      const { tiers: subscriptionTiers, error: tiersError } = await getSubscriptionTiers();
      if (tiersError) {
        setError(tiersError);
      } else {
        setTiers(subscriptionTiers);
      }

      // Load user's current subscription if logged in
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        const { subscription, error: subError } = await getUserSubscription();
        if (!subError && subscription) {
          setUserSubscription(subscription);
        }
      }
    } catch (err) {
      setError('Failed to load subscription data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (tierId: string) => {
    if (!user) {
      // Redirect to login page with return URL
      navigate('/login?returnTo=/subscription');
      return;
    }

    try {
      setLoading(true);
      const { sessionUrl, error } = await createSubscriptionCheckout(
        tierId,
        `${window.location.origin}/subscription/success`,
        `${window.location.origin}/subscription`
      );

      if (error) {
        setError(error);
      } else if (sessionUrl) {
        window.location.href = sessionUrl;
      }
    } catch (err) {
      setError('Failed to create checkout session');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!userSubscription) return;

    try {
      setCancelingSubscription(true);
      const { success, error } = await cancelSubscription();

      if (error) {
        setError(error);
      } else if (success) {
        // Reload subscription data
        loadData();
      }
    } catch (err) {
      setError('Failed to cancel subscription');
      console.error(err);
    } finally {
      setCancelingSubscription(false);
    }
  };

  const formatPrice = (price: number, interval: string) => {
    return `$${price.toFixed(2)}/${interval === 'monthly' ? 'month' : 'year'}`;
  };

  const isCurrentTier = (tierId: string) => {
    return userSubscription?.tier_id === tierId;
  };

  if (loading && tiers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading subscription options...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Herb Harmony Subscription Plans</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Choose the plan that's right for you and unlock the full potential of herbal wisdom
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-8">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {userSubscription && (
        <div className="mb-8">
          <Alert>
            <AlertTitle>Current Subscription</AlertTitle>
            <AlertDescription>
              You are currently subscribed to the{' '}
              <span className="font-medium">{userSubscription.tier?.name}</span> plan.
              {userSubscription.cancel_at_period_end ? (
                <span className="block mt-2">
                  Your subscription will end on{' '}
                  {new Date(userSubscription.current_period_end).toLocaleDateString()}.
                </span>
              ) : (
                <span className="block mt-2">
                  Your next billing date is{' '}
                  {new Date(userSubscription.current_period_end).toLocaleDateString()}.
                </span>
              )}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <Card key={tier.id} className={`flex flex-col ${isCurrentTier(tier.id) ? 'border-primary' : ''}`}>
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">{formatPrice(tier.price, tier.interval)}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <h3 className="font-medium mb-4">Features:</h3>
              <ul className="space-y-3">
                {Object.entries(tier.features || {}).map(([feature, included]) => (
                  <li key={feature} className="flex items-start">
                    {included ? (
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                    )}
                    <span className="text-sm">
                      {feature.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {isCurrentTier(tier.id) ? (
                userSubscription?.cancel_at_period_end ? (
                  <Button disabled className="w-full" variant="outline">
                    Cancellation Scheduled
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleCancelSubscription}
                    disabled={cancelingSubscription}
                  >
                    {cancelingSubscription && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Cancel Subscription
                  </Button>
                )
              ) : (
                <Button
                  className="w-full"
                  onClick={() => handleSubscribe(tier.id)}
                  disabled={loading || tier.price === 0}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {tier.price === 0 ? 'Current Free Plan' : 'Subscribe'}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
