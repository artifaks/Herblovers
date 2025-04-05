import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getUserSubscription, 
  cancelSubscription,
  UserSubscription
} from '@/lib/subscription-service';
import { supabase } from '@/lib/supabase';
import { Calendar, CreditCard, Download, BarChart, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

// Mock data for usage statistics
const mockUsageData = {
  currentPeriod: {
    start: new Date(new Date().setDate(1)).toISOString(),
    end: new Date(new Date().setMonth(new Date().getMonth() + 1, 0)).toISOString(),
    requestsMade: 1250,
    requestsLimit: 10000,
    percentUsed: 12.5
  },
  history: [
    { month: 'January', requests: 980 },
    { month: 'February', requests: 1100 },
    { month: 'March', requests: 890 },
    { month: 'April', requests: 1250 }
  ]
};

// Mock data for billing history
const mockBillingHistory = [
  { 
    id: 'inv_123456', 
    date: '2025-04-01', 
    amount: 29.99, 
    status: 'paid', 
    invoice_url: '#' 
  },
  { 
    id: 'inv_123455', 
    date: '2025-03-01', 
    amount: 29.99, 
    status: 'paid', 
    invoice_url: '#' 
  },
  { 
    id: 'inv_123454', 
    date: '2025-02-01', 
    amount: 29.99, 
    status: 'paid', 
    invoice_url: '#' 
  }
];

// Mock payment method
const mockPaymentMethod = {
  brand: 'visa',
  last4: '4242',
  expMonth: 12,
  expYear: 2026
};

const SubscriptionDashboard: React.FC = () => {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelingSubscription, setCancelingSubscription] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadSubscriptionData();
  }, []);

  const loadSubscriptionData = async () => {
    setLoading(true);
    setError(null);

    try {
      const { subscription: userSubscription, error: subError } = await getUserSubscription();
      
      if (subError) {
        setError(subError);
      } else if (userSubscription) {
        setSubscription(userSubscription);
      } else {
        // No subscription found, redirect to subscription page
        navigate('/subscription');
      }
    } catch (err) {
      setError('Failed to load subscription data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription) return;

    try {
      setCancelingSubscription(true);
      const { success, error } = await cancelSubscription();

      if (error) {
        toast({
          title: "Error",
          description: `Failed to cancel subscription: ${error}`,
          variant: "destructive"
        });
      } else if (success) {
        toast({
          title: "Subscription Canceled",
          description: "Your subscription has been canceled and will end at the current billing period."
        });
        loadSubscriptionData();
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while canceling your subscription.",
        variant: "destructive"
      });
      console.error(err);
    } finally {
      setCancelingSubscription(false);
    }
  };

  const handleUpdatePaymentMethod = () => {
    // In a real implementation, this would redirect to Stripe's customer portal
    // or create a checkout session for updating payment methods
    toast({
      title: "Update Payment Method",
      description: "This would redirect to Stripe's customer portal in production."
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <Clock className="h-8 w-8 animate-spin text-primary" />
          <p>Loading subscription data...</p>
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
            onClick={loadSubscriptionData}
          >
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!subscription) {
    return null; // Should never happen as we redirect if no subscription
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container max-w-6xl py-8">
      <h1 className="text-3xl font-bold mb-6">Subscription Dashboard</h1>
      
      {/* Subscription Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Subscription Overview</CardTitle>
          <CardDescription>
            Your current subscription plan and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">{subscription.tier?.name || 'Unknown Plan'}</h3>
              <p className="text-muted-foreground mb-4">{subscription.tier?.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium">
                    {subscription.status === 'active' ? (
                      <span className="text-green-600">Active</span>
                    ) : subscription.status === 'canceled' ? (
                      <span className="text-amber-600">Canceled (Expires soon)</span>
                    ) : (
                      <span className="text-red-600">{subscription.status}</span>
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium">${subscription.tier?.price.toFixed(2)}/month</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Period:</span>
                  <span className="font-medium">
                    {formatDate(mockUsageData.currentPeriod.start)} - {formatDate(mockUsageData.currentPeriod.end)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Billing Date:</span>
                  <span className="font-medium">{formatDate(mockUsageData.currentPeriod.end)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Usage This Month</h3>
              <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${mockUsageData.currentPeriod.percentUsed}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm mb-6">
                <span>{mockUsageData.currentPeriod.requestsMade} requests</span>
                <span>{mockUsageData.currentPeriod.percentUsed}% of {mockUsageData.currentPeriod.requestsLimit}</span>
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleUpdatePaymentMethod}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Update Payment Method
                </Button>
                
                <Button 
                  variant="destructive" 
                  className="w-full" 
                  onClick={handleCancelSubscription}
                  disabled={cancelingSubscription || subscription.status === 'canceled'}
                >
                  {cancelingSubscription ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Canceling...
                    </>
                  ) : (
                    <>Cancel Subscription</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Detailed Information Tabs */}
      <Tabs defaultValue="usage">
        <TabsList className="mb-4">
          <TabsTrigger value="usage">
            <BarChart className="h-4 w-4 mr-2" />
            Usage Statistics
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing & Invoices
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Usage History</CardTitle>
              <CardDescription>
                Your API request usage over the past few months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {mockUsageData.history.map((month) => (
                  <div key={month.month} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-primary rounded-t-sm" 
                      style={{ 
                        height: `${(month.requests / mockUsageData.currentPeriod.requestsLimit) * 100 * 2}px`,
                        maxHeight: '200px'
                      }}
                    ></div>
                    <div className="mt-2 text-xs text-center">
                      <div>{month.month}</div>
                      <div className="font-medium">{month.requests}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="bg-gray-100 p-2 rounded">
                  <CreditCard className="h-8 w-8" />
                </div>
                <div>
                  <p className="font-medium capitalize">{mockPaymentMethod.brand} •••• {mockPaymentMethod.last4}</p>
                  <p className="text-sm text-muted-foreground">
                    Expires {mockPaymentMethod.expMonth}/{mockPaymentMethod.expYear}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="ml-auto" 
                  onClick={handleUpdatePaymentMethod}
                >
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Invoice</th>
                      <th className="text-left p-3">Amount</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-right p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBillingHistory.map((invoice) => (
                      <tr key={invoice.id} className="border-t">
                        <td className="p-3">{formatDate(invoice.date)}</td>
                        <td className="p-3">{invoice.id}</td>
                        <td className="p-3">${invoice.amount.toFixed(2)}</td>
                        <td className="p-3 capitalize">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            invoice.status === 'paid' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <a href={invoice.invoice_url} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4 mr-1" />
                              PDF
                            </a>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionDashboard;
