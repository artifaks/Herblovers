import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { getUserSubscription } from '@/lib/subscription-service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle } from 'lucide-react';

const SubscriptionSuccess: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          // Not logged in, redirect to login
          navigate('/login?returnTo=/subscription');
          return;
        }

        // Check if user has an active subscription
        const { subscription, error: subError } = await getUserSubscription();
        
        if (subError) {
          setError('Failed to verify subscription status');
          console.error(subError);
        } else if (subscription) {
          setSubscriptionActive(true);
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Verifying your subscription...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-md py-12">
      <Card>
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-center text-2xl">Thank You!</CardTitle>
          <CardDescription className="text-center">
            {subscriptionActive
              ? 'Your subscription has been successfully activated.'
              : 'Your subscription is being processed.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <p className="text-center">
              {subscriptionActive
                ? 'You now have access to all premium features and content.'
                : 'It may take a few moments for your subscription to be fully activated.'}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/subscription">Manage Subscription</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Explore Herbs</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionSuccess;
