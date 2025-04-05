import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { hasFeatureAccess, getUserTier } from '@/lib/subscription-service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lock } from 'lucide-react';

interface SubscriptionGateProps {
  feature: string;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const SubscriptionGate: React.FC<SubscriptionGateProps> = ({
  feature,
  children,
  title = 'Premium Content',
  description = 'This content is available to premium subscribers only.'
}) => {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [userTier, setUserTier] = useState<string>('Free');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const access = await hasFeatureAccess(feature);
        setHasAccess(access);
        
        const tier = await getUserTier();
        setUserTier(tier);
      } catch (error) {
        console.error('Error checking feature access:', error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [feature]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <Card className="border-dashed">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <Lock className="h-12 w-12 text-muted-foreground" />
        </div>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">
          You're currently on the <span className="font-medium">{userTier}</span> plan.
          Upgrade to access this premium feature and more.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild>
          <Link to="/subscription">Upgrade Subscription</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionGate;
