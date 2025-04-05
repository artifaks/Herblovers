import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { createSubscriptionCheckout } from '@/lib/subscription-service';

const TestStripe: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
  };

  const handleTestStripe = async () => {
    setLoading(true);
    setError(null);
    addLog('Starting Stripe checkout test...');

    try {
      // Test with a fixed tier ID
      const tierId = '2'; // Premium tier
      const successUrl = `${window.location.origin}/subscription/success`;
      const cancelUrl = `${window.location.origin}/subscription`;

      addLog(`Testing with tierId: ${tierId}`);
      addLog(`Success URL: ${successUrl}`);
      addLog(`Cancel URL: ${cancelUrl}`);

      // Directly call the Stripe checkout function
      const { sessionUrl, error: checkoutError } = await createSubscriptionCheckout(
        tierId,
        successUrl,
        cancelUrl
      );

      if (checkoutError) {
        addLog(`Error creating checkout: ${checkoutError}`);
        setError(checkoutError);
      } else if (sessionUrl) {
        addLog(`Checkout session created successfully!`);
        addLog(`Redirecting to: ${sessionUrl}`);
        
        // Redirect to the Stripe checkout page
        window.location.href = sessionUrl;
      } else {
        addLog('No session URL or error returned');
        setError('No session URL or error returned');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      addLog(`Exception caught: ${errorMessage}`);
      setError(errorMessage);
      console.error('Test Stripe error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Direct test using the Stripe API client from your ebook implementation
  const handleDirectStripeTest = async () => {
    setLoading(true);
    setError(null);
    addLog('Starting direct Stripe test...');

    try {
      // Call the Edge Function directly with fetch
      addLog('Calling Edge Function directly with fetch...');
      const response = await fetch(
        'https://guafuutwjluavxwkfvbk.supabase.co/functions/v1/create-subscription-checkout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tierId: '2',
            successUrl: `${window.location.origin}/subscription/success`,
            cancelUrl: `${window.location.origin}/subscription`,
          }),
        }
      );

      const data = await response.json();
      addLog(`Response status: ${response.status}`);
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
    <div className="container max-w-4xl py-12">
      <h1 className="text-3xl font-bold mb-6">Stripe Checkout Test</h1>
      
      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Test Stripe Checkout</CardTitle>
            <CardDescription>
              Test the Stripe checkout integration for subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This will test the Stripe checkout integration by creating a checkout session for the Premium tier.
            </p>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <div className="flex gap-4">
              <Button onClick={handleTestStripe} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  'Test Stripe Checkout'
                )}
              </Button>
              <Button onClick={handleDirectStripeTest} disabled={loading} variant="outline">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  'Direct API Test'
                )}
              </Button>
            </div>
            
            {logs.length > 0 && (
              <div className="w-full mt-4">
                <h3 className="text-sm font-medium mb-2">Logs:</h3>
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md overflow-auto max-h-60">
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
      </div>
    </div>
  );
};

export default TestStripe;
