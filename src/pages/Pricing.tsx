import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check, X, CreditCard, Server, Zap, Leaf, BookOpen, HelpCircle } from 'lucide-react';

const Pricing: React.FC = () => {
  const [annualBilling, setAnnualBilling] = useState(false);

  const subscriptionTiers = [
    {
      id: 'free',
      name: 'Free',
      description: 'Basic access to herb information',
      monthlyPrice: 0,
      annualPrice: 0,
      features: {
        'Basic herb information': true,
        'Favorites list': true,
        'Herb categories': true,
        'Detailed preparations': false,
        'Scientific research': false,
        'Advanced search': false,
        'Priority support': false,
      },
      popularFeature: false,
      ctaText: 'Get Started',
      ctaLink: '/login'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Full access to all herb details and features',
      monthlyPrice: 9.99,
      annualPrice: 99.99,
      features: {
        'Basic herb information': true,
        'Favorites list': true,
        'Herb categories': true,
        'Detailed preparations': true,
        'Scientific research': true,
        'Advanced search': true,
        'Priority support': false,
      },
      popularFeature: true,
      ctaText: 'Subscribe Now',
      ctaLink: '/subscription'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Custom solutions for organizations',
      monthlyPrice: null,
      annualPrice: null,
      features: {
        'Basic herb information': true,
        'Favorites list': true,
        'Herb categories': true,
        'Detailed preparations': true,
        'Scientific research': true,
        'Advanced search': true,
        'Priority support': true,
        'Custom integrations': true,
        'Dedicated account manager': true,
        'SLA guarantees': true
      },
      popularFeature: false,
      ctaText: 'Contact Sales',
      ctaLink: '#'
    }
  ];

  const apiTiers = [
    {
      id: 'free-api',
      name: 'Free API',
      description: 'Basic API access with limited requests',
      monthlyPrice: 0,
      annualPrice: 0,
      features: {
        'Request limit': '1,000 per month',
        'Rate limit': '100 per day',
        'Basic herb endpoints': true,
        'Categories endpoint': true,
        'Search endpoint': false,
        'Advanced filtering': false,
        'Bulk operations': false,
        'API key management': true,
        'Usage analytics': false,
        'Priority support': false,
      },
      popularFeature: false,
      ctaText: 'Get API Key',
      ctaLink: '/api-service/manage'
    },
    {
      id: 'basic-api',
      name: 'Basic API',
      description: 'Standard API access for small projects',
      monthlyPrice: 29.99,
      annualPrice: 299.99,
      features: {
        'Request limit': '10,000 per month',
        'Rate limit': '1,000 per day',
        'Basic herb endpoints': true,
        'Categories endpoint': true,
        'Search endpoint': true,
        'Advanced filtering': true,
        'Bulk operations': false,
        'API key management': true,
        'Usage analytics': true,
        'Priority support': false,
      },
      popularFeature: true,
      ctaText: 'Subscribe Now',
      ctaLink: '/api-service/manage'
    },
    {
      id: 'premium-api',
      name: 'Premium API',
      description: 'Unlimited API access for production applications',
      monthlyPrice: 99.99,
      annualPrice: 999.99,
      features: {
        'Request limit': '100,000 per month',
        'Rate limit': '5,000 per day',
        'Basic herb endpoints': true,
        'Categories endpoint': true,
        'Search endpoint': true,
        'Advanced filtering': true,
        'Bulk operations': true,
        'API key management': true,
        'Usage analytics': true,
        'Priority support': true,
      },
      popularFeature: false,
      ctaText: 'Subscribe Now',
      ctaLink: '/api-service/manage'
    }
  ];

  return (
    <div className="container max-w-6xl py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that's right for you, whether you're exploring herbs or building the next great herbal application
        </p>
      </div>

      <Tabs defaultValue="subscription" className="space-y-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="subscription">
            <CreditCard className="h-4 w-4 mr-2" />
            Subscription
          </TabsTrigger>
          <TabsTrigger value="api">
            <Server className="h-4 w-4 mr-2" />
            API Service
          </TabsTrigger>
        </TabsList>

        {/* Subscription Pricing */}
        <TabsContent value="subscription">
          <div className="flex justify-center items-center mb-8 space-x-2">
            <Label htmlFor="billing-toggle">Monthly</Label>
            <Switch
              id="billing-toggle"
              checked={annualBilling}
              onCheckedChange={setAnnualBilling}
            />
            <Label htmlFor="billing-toggle" className="flex items-center">
              Annual
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                Save 16%
              </Badge>
            </Label>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {subscriptionTiers.map((tier) => (
              <Card 
                key={tier.id} 
                className={`flex flex-col ${tier.popularFeature ? 'border-primary shadow-lg' : ''}`}
              >
                {tier.popularFeature && (
                  <Badge className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    {tier.monthlyPrice !== null ? (
                      <>
                        <span className="text-3xl font-bold">
                          ${annualBilling ? (tier.annualPrice / 12).toFixed(2) : tier.monthlyPrice.toFixed(2)}
                        </span>
                        <span className="text-muted-foreground">/month</span>
                        
                        {annualBilling && tier.monthlyPrice > 0 && (
                          <div className="text-sm text-muted-foreground mt-1">
                            Billed annually (${tier.annualPrice.toFixed(2)})
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="text-3xl font-bold">Custom</span>
                    )}
                  </div>
                  
                  <ul className="space-y-2">
                    {Object.entries(tier.features).map(([feature, included]) => (
                      <li key={feature} className="flex items-start">
                        {included === true ? (
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        ) : included === false ? (
                          <X className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                        ) : (
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        )}
                        <span className={included === false ? 'text-muted-foreground' : ''}>
                          {typeof included === 'string' ? included : feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    asChild 
                    className="w-full" 
                    variant={tier.popularFeature ? 'default' : 'outline'}
                  >
                    <Link to={tier.ctaLink}>
                      {tier.ctaText}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* API Pricing */}
        <TabsContent value="api">
          <div className="flex justify-center items-center mb-8 space-x-2">
            <Label htmlFor="api-billing-toggle">Monthly</Label>
            <Switch
              id="api-billing-toggle"
              checked={annualBilling}
              onCheckedChange={setAnnualBilling}
            />
            <Label htmlFor="api-billing-toggle" className="flex items-center">
              Annual
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                Save 16%
              </Badge>
            </Label>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {apiTiers.map((tier) => (
              <Card 
                key={tier.id} 
                className={`flex flex-col ${tier.popularFeature ? 'border-primary shadow-lg' : ''}`}
              >
                {tier.popularFeature && (
                  <Badge className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-3xl font-bold">
                      ${annualBilling ? (tier.annualPrice / 12).toFixed(2) : tier.monthlyPrice.toFixed(2)}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                    
                    {annualBilling && tier.monthlyPrice > 0 && (
                      <div className="text-sm text-muted-foreground mt-1">
                        Billed annually (${tier.annualPrice.toFixed(2)})
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-2">
                    {Object.entries(tier.features).map(([feature, included]) => (
                      <li key={feature} className="flex items-start">
                        {included === true ? (
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        ) : included === false ? (
                          <X className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                        ) : (
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        )}
                        <span className={included === false ? 'text-muted-foreground' : ''}>
                          {typeof included === 'string' ? included : feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    asChild 
                    className="w-full" 
                    variant={tier.popularFeature ? 'default' : 'outline'}
                  >
                    <Link to={tier.ctaLink}>
                      {tier.ctaText}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* FAQ Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Find answers to common questions about our pricing and plans
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Can I change plans anytime?</h3>
            <p className="text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades, or at the end of your billing cycle for downgrades.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Do you offer refunds?</h3>
            <p className="text-muted-foreground">
              We offer a 14-day money-back guarantee for all subscription plans. If you're not satisfied, contact our support team within 14 days of purchase for a full refund.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We accept all major credit and debit cards, including Visa, Mastercard, American Express, and Discover. Payment processing is handled securely through Stripe.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Do you offer discounts for non-profits?</h3>
            <p className="text-muted-foreground">
              Yes, we offer special pricing for non-profit organizations, educational institutions, and research facilities. Please contact our sales team for more information.
            </p>
          </div>
        </div>
        
        <div className="mt-8">
          <Button asChild>
            <Link to="/faq">
              <HelpCircle className="mr-2 h-4 w-4" />
              View All FAQs
            </Link>
          </Button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-slate-50 dark:bg-slate-900 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of herbalists, researchers, and developers who are already using Herb Harmony
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/subscription">
              <Leaf className="mr-2 h-5 w-5" />
              Explore Subscription Plans
            </Link>
          </Button>
          
          <Button asChild size="lg" variant="outline">
            <Link to="/api-service/manage">
              <Server className="mr-2 h-5 w-5" />
              Get API Access
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
