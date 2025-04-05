import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2, CreditCard, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const DirectStripeTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
  };

  // Direct test using the Stripe API client from your ebook implementation
  const handleDirectStripeTest = async () => {
    setLoading(true);
    setError(null);
    addLog('Starting direct Stripe test...');

    try {
      // Prepare the request data
      const tierId = '2'; // Premium tier
      const successUrl = `${window.location.origin}/subscription/success`;
      const cancelUrl = `${window.location.origin}/subscription`;

      addLog(`Testing with tierId: ${tierId}`);
      addLog(`Success URL: ${successUrl}`);
      addLog(`Cancel URL: ${cancelUrl}`);

      // Call the Edge Function directly with fetch (similar to your ebook implementation)
      addLog('Calling Edge Function directly with fetch...');
      const response = await fetch(
        'https://guafuutwjluavxwkfvbk.supabase.co/functions/v1/create-subscription-checkout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add authorization if needed
          },
          body: JSON.stringify({
            tierId,
            successUrl,
            cancelUrl,
          }),
        }
      );

      addLog(`Response status: ${response.status}`);
      
      const data = await response.json();
      addLog(`Response data: ${JSON.stringify(data)}`);

      if (!response.ok) {
        setError(data.error || 'Error calling Edge Function');
      } else if (data.url) {
        addLog(`Direct checkout session created successfully!`);
        addLog(`Redirecting to: ${data.url}`);
        window.location.href = data.url;
      } else {
        addLog('No URL in response');
        setError('No URL in response');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      addLog(`Exception caught: ${errorMessage}`);
      setError(errorMessage);
      console.error('Direct Stripe test error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-5xl py-12">
      <div className="flex flex-col items-center text-center mb-10">
        <Badge className="mb-4 bg-herb-heart text-white hover:bg-herb-heart/90">Stripe Integration</Badge>
        <h1 className="text-4xl font-bold mb-4">Secure Payment Processing</h1>
        <p className="text-slate-600 max-w-2xl">
          Test our seamless Stripe integration for subscription payments and one-time purchases.
        </p>
      </div>
      
      <Tabs defaultValue="direct" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="direct">Direct API Test</TabsTrigger>
          <TabsTrigger value="info">How It Works</TabsTrigger>
        </TabsList>
        
        <TabsContent value="direct" className="mt-6">
          <Card className="border-t-4 border-t-emerald-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <CreditCard className="h-5 w-5 text-emerald-500" />
                </div>
                <CardTitle>Direct Stripe API Test</CardTitle>
              </div>
              <CardDescription>
                Test the Stripe checkout integration using direct API calls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1">
                  <h3 className="text-sm font-medium mb-2">What This Test Does:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
                      <span className="text-sm">Directly calls the Stripe Edge Function</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
                      <span className="text-sm">Creates a test subscription checkout session</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
                      <span className="text-sm">Redirects to Stripe's secure checkout page</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
                      <span className="text-sm">Bypasses Supabase client for direct API access</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="rounded-lg border p-4 bg-slate-50">
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <ShieldCheck className="h-4 w-4 text-emerald-500 mr-1" />
                      Test Card Details
                    </h3>
                    <p className="text-xs text-slate-600 mb-3">Use these details on the Stripe checkout page:</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs font-medium">Card Number:</span>
                        <code className="text-xs bg-white px-2 py-1 rounded border">4242 4242 4242 4242</code>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs font-medium">Expiry:</span>
                        <code className="text-xs bg-white px-2 py-1 rounded border">Any future date</code>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs font-medium">CVC:</span>
                        <code className="text-xs bg-white px-2 py-1 rounded border">Any 3 digits</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {loading && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Loader2 className="h-4 w-4 animate-spin text-herb-heart" />
                    <span className="text-sm font-medium">Processing request...</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <Button 
                onClick={handleDirectStripeTest} 
                disabled={loading} 
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 w-full md:w-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Start Stripe Checkout
                  </>
                )}
              </Button>
              
              {logs.length > 0 && (
                <div className="w-full mt-4">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-herb-heart/10 text-herb-heart text-xs mr-2">{logs.length}</span>
                    API Request Logs:
                  </h3>
                  <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md overflow-auto max-h-60 border">
                    {logs.map((log, index) => (
                      <div key={index} className="text-xs font-mono whitespace-pre-wrap mb-1">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="info" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>How Our Stripe Integration Works</CardTitle>
              <CardDescription>
                Secure payment processing for subscriptions and one-time purchases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-herb-heart/10 flex items-center justify-center">
                    <span className="text-herb-heart font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Secure API Calls</h3>
                    <p className="text-sm text-slate-600">Our Edge Functions securely communicate with Stripe's API without exposing sensitive data to the client.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-herb-heart/10 flex items-center justify-center">
                    <span className="text-herb-heart font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Checkout Sessions</h3>
                    <p className="text-sm text-slate-600">We create secure checkout sessions for both subscription plans and one-time purchases.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-herb-heart/10 flex items-center justify-center">
                    <span className="text-herb-heart font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Secure Redirects</h3>
                    <p className="text-sm text-slate-600">Users are securely redirected to Stripe's hosted checkout page for payment processing.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-herb-heart/10 flex items-center justify-center">
                    <span className="text-herb-heart font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Webhooks & Callbacks</h3>
                    <p className="text-sm text-slate-600">After payment, Stripe notifies our system via webhooks, and users are redirected to success pages.</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <a href="https://stripe.com/docs" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  Learn More About Stripe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DirectStripeTest;
