import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getUserSubscription } from '@/lib/subscription-service';
import { getUserApiKeys } from '@/lib/api-service';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  User, 
  CreditCard, 
  Key, 
  BarChart, 
  Settings,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [subscription, setSubscription] = useState<any>(null);
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login?returnTo=/profile');
      return;
    }

    loadUserData();
  }, [user, authLoading, navigate]);

  const loadUserData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Load user's subscription
      const { subscription: userSubscription } = await getUserSubscription();
      setSubscription(userSubscription);

      // Load user's API keys
      const { keys } = await getUserApiKeys();
      setApiKeys(keys);
    } catch (err) {
      console.error('Error loading user data:', err);
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <Clock className="h-8 w-8 animate-spin text-primary" />
          <p>Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto my-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error}
          <Button 
            variant="outline" 
            className="mt-2" 
            onClick={loadUserData}
          >
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!user) {
    return null; // Should never happen as we redirect if no user
  }

  return (
    <div className="container max-w-6xl py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      
      {/* User Profile Card */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${user.email?.split('@')[0]}&background=random`} />
            <AvatarFallback>{user.email?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.email?.split('@')[0]}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Account Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">User ID:</span>
                  <span className="font-medium truncate max-w-[200px]">{user.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Type:</span>
                  <span className="font-medium">
                    {subscription ? subscription.tier?.name : 'Free'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">API Keys:</span>
                  <span className="font-medium">{apiKeys.length}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                className="justify-start" 
                onClick={() => navigate('/subscription')}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Subscription
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-start" 
                onClick={() => navigate('/api-service/manage')}
              >
                <Key className="mr-2 h-4 w-4" />
                Manage API Keys
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-start" 
                onClick={() => navigate('/api-service/analytics')}
              >
                <BarChart className="mr-2 h-4 w-4" />
                View API Analytics
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-start" 
                onClick={() => navigate('/subscription/dashboard')}
              >
                <Settings className="mr-2 h-4 w-4" />
                Subscription Dashboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs for different sections */}
      <Tabs defaultValue="subscription" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subscription">
            <CreditCard className="h-4 w-4 mr-2" />
            Subscription
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="h-4 w-4 mr-2" />
            API Keys
          </TabsTrigger>
        </TabsList>
        
        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Subscription</CardTitle>
              <CardDescription>
                Your current subscription plan and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {subscription ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">{subscription.tier?.name}</h3>
                      <p className="text-muted-foreground">{subscription.tier?.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${subscription.tier?.price.toFixed(2)}/{subscription.tier?.interval}</p>
                      <p className={`text-sm ${
                        subscription.status === 'active' 
                          ? 'text-green-600' 
                          : 'text-amber-600'
                      }`}>
                        {subscription.status === 'active' ? 'Active' : 'Canceled'}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => navigate('/subscription/dashboard')}
                    className="w-full"
                  >
                    View Subscription Dashboard
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="mb-4">You don't have an active subscription.</p>
                  <Button onClick={() => navigate('/subscription')}>
                    View Subscription Plans
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* API Keys Tab */}
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your API Keys</CardTitle>
              <CardDescription>
                Manage your API keys and access
              </CardDescription>
            </CardHeader>
            <CardContent>
              {apiKeys.length > 0 ? (
                <div className="space-y-4">
                  <ul className="space-y-2">
                    {apiKeys.map((key) => (
                      <li key={key.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{key.name}</p>
                          <p className="text-sm text-muted-foreground">Plan: {key.plan?.name}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/api-service/usage/${key.id}`)}
                        >
                          View Usage
                        </Button>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => navigate('/api-service/manage')}
                    className="w-full"
                  >
                    Manage API Keys
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="mb-4">You don't have any API keys yet.</p>
                  <Button onClick={() => navigate('/api-service/manage')}>
                    Create API Key
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
