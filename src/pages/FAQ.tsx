import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  CreditCard, 
  Key, 
  HelpCircle, 
  Lock, 
  User, 
  FileText,
  Leaf,
  BookOpen,
  Server,
  Zap
} from 'lucide-react';

const FAQ: React.FC = () => {
  return (
    <div className="container max-w-4xl py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground">
          Everything you need to know about Herb Harmony's subscription and API services
        </p>
      </div>

      <Tabs defaultValue="subscription" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subscription">
            <CreditCard className="h-4 w-4 mr-2" />
            Subscription
          </TabsTrigger>
          <TabsTrigger value="api">
            <Server className="h-4 w-4 mr-2" />
            API Service
          </TabsTrigger>
          <TabsTrigger value="account">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
        </TabsList>

        {/* Subscription FAQs */}
        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Subscription FAQs
              </CardTitle>
              <CardDescription>
                Common questions about our subscription plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="sub-1">
                  <AccordionTrigger>What subscription plans do you offer?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">We offer three subscription tiers:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Free Tier:</strong> Basic access to herb information with limited features at no cost.</li>
                      <li><strong>Premium Monthly:</strong> Full access to all herb details, advanced search, and scientific research for $9.99/month.</li>
                      <li><strong>Annual Premium:</strong> Same features as Premium with a yearly discount at $99.99/year (saving over 16%).</li>
                    </ul>
                    <div className="mt-4">
                      <Button asChild size="sm" variant="outline">
                        <Link to="/subscription">View Subscription Plans</Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="sub-2">
                  <AccordionTrigger>How do I upgrade or downgrade my subscription?</AccordionTrigger>
                  <AccordionContent>
                    <p>You can upgrade or downgrade your subscription at any time from your Subscription Dashboard. When upgrading, the change takes effect immediately. When downgrading, your current subscription will remain active until the end of your billing period, then switch to the new plan.</p>
                    <div className="mt-4">
                      <Button asChild size="sm" variant="outline">
                        <Link to="/subscription/dashboard">Go to Subscription Dashboard</Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="sub-3">
                  <AccordionTrigger>Can I cancel my subscription?</AccordionTrigger>
                  <AccordionContent>
                    <p>Yes, you can cancel your subscription at any time from your Subscription Dashboard. After cancellation, your subscription will remain active until the end of your current billing period. You won't be charged again, and your plan will revert to the Free tier once your paid subscription expires.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="sub-4">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent>
                    <p>We accept all major credit and debit cards, including Visa, Mastercard, American Express, and Discover. Payment processing is handled securely through Stripe.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="sub-5">
                  <AccordionTrigger>Is there a free trial for premium plans?</AccordionTrigger>
                  <AccordionContent>
                    <p>We don't currently offer a free trial, but we do have a Free tier that gives you access to basic features indefinitely. This allows you to explore the platform before committing to a premium subscription. Additionally, all subscriptions come with a 14-day money-back guarantee if you're not satisfied.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="sub-6">
                  <AccordionTrigger>What features are included in the premium plans?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Premium plans include:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Detailed herb preparation methods and dosage information</li>
                      <li>Scientific research and studies for each herb</li>
                      <li>Advanced search and filtering capabilities</li>
                      <li>Ability to save favorites and create custom collections</li>
                      <li>Access to exclusive content and updates</li>
                      <li>Priority customer support</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Service FAQs */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                API Service FAQs
              </CardTitle>
              <CardDescription>
                Common questions about our API service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="api-1">
                  <AccordionTrigger>What API plans do you offer?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">We offer three API plans:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Free API:</strong> Basic API access with 1,000 requests limit and 100 daily rate limit at no cost.</li>
                      <li><strong>Basic API:</strong> Standard access with 10,000 requests limit and 1,000 daily rate limit for $29.99/month.</li>
                      <li><strong>Premium API:</strong> Unlimited access with 100,000 requests limit and 5,000 daily rate limit for $99.99/month.</li>
                    </ul>
                    <div className="mt-4">
                      <Button asChild size="sm" variant="outline">
                        <Link to="/api-service/manage">View API Plans</Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="api-2">
                  <AccordionTrigger>How do I get an API key?</AccordionTrigger>
                  <AccordionContent>
                    <p>You can generate API keys from the API Management page. Simply log in to your account, navigate to the API Management section, select your desired plan, and create a new API key. Each key can be named for different projects or applications.</p>
                    <div className="mt-4">
                      <Button asChild size="sm" variant="outline">
                        <Link to="/api-service/manage">Manage API Keys</Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="api-3">
                  <AccordionTrigger>What endpoints are available in the API?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Our API provides access to the following endpoints:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><code>/herbs</code> - Get a list of all herbs or specific herb details</li>
                      <li><code>/categories</code> - Access herb categories and classifications</li>
                      <li><code>/properties</code> - Information about medicinal properties</li>
                      <li><code>/search</code> - Advanced search functionality</li>
                      <li><code>/preparations</code> - Details on preparation methods</li>
                    </ul>
                    <p className="mt-2">For complete documentation of all endpoints, parameters, and response formats, please refer to our API Documentation.</p>
                    <div className="mt-4">
                      <Button asChild size="sm" variant="outline">
                        <Link to="/api-service/docs">View API Documentation</Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="api-4">
                  <AccordionTrigger>How do I monitor my API usage?</AccordionTrigger>
                  <AccordionContent>
                    <p>You can monitor your API usage through the API Analytics dashboard. This provides detailed insights into your request patterns, endpoint usage, response times, and error rates. You can also set up usage alerts to be notified when you're approaching your plan limits.</p>
                    <div className="mt-4">
                      <Button asChild size="sm" variant="outline">
                        <Link to="/api-service/analytics">View API Analytics</Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="api-5">
                  <AccordionTrigger>What happens if I exceed my API request limit?</AccordionTrigger>
                  <AccordionContent>
                    <p>If you exceed your monthly request limit, additional requests will be rejected with a 429 (Too Many Requests) status code until your limit resets at the start of your next billing cycle. To avoid service interruption, you can upgrade to a higher plan at any time, which will take effect immediately.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="api-6">
                  <AccordionTrigger>Do you offer custom API plans for high-volume users?</AccordionTrigger>
                  <AccordionContent>
                    <p>Yes, we offer custom enterprise plans for high-volume users or those with specific requirements. These plans include higher request limits, dedicated support, custom endpoint development, and service level agreements (SLAs). Please contact our sales team to discuss your needs and get a custom quote.</p>
                    <div className="mt-4">
                      <Button size="sm" variant="outline">
                        Contact Sales
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account FAQs */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Account FAQs
              </CardTitle>
              <CardDescription>
                Common questions about your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="acc-1">
                  <AccordionTrigger>How do I create an account?</AccordionTrigger>
                  <AccordionContent>
                    <p>You can create an account by clicking the "Sign Up" button on the login page. You'll need to provide your email address and create a password. You can also sign up using your Google account for a faster registration process.</p>
                    <div className="mt-4">
                      <Button asChild size="sm" variant="outline">
                        <Link to="/login">Sign Up</Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="acc-2">
                  <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                  <AccordionContent>
                    <p>If you've forgotten your password, you can reset it by clicking the "Forgot Password" link on the login page. You'll receive an email with instructions to create a new password. For security reasons, password reset links expire after 24 hours.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="acc-3">
                  <AccordionTrigger>Can I change my email address?</AccordionTrigger>
                  <AccordionContent>
                    <p>Yes, you can change your email address from your account settings. You'll need to verify your new email address before the change takes effect. Note that changing your email address will not affect your subscription or API keys.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="acc-4">
                  <AccordionTrigger>How do I delete my account?</AccordionTrigger>
                  <AccordionContent>
                    <p>You can request account deletion from your account settings. Please note that deleting your account will cancel any active subscriptions, revoke all API keys, and permanently remove your data from our system. This action cannot be undone.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="acc-5">
                  <AccordionTrigger>Is my data secure?</AccordionTrigger>
                  <AccordionContent>
                    <p>Yes, we take data security seriously. All data is encrypted in transit and at rest. We use industry-standard security practices to protect your information. We never store your payment information directly; all payment processing is handled securely by Stripe.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="acc-6">
                  <AccordionTrigger>How can I contact support?</AccordionTrigger>
                  <AccordionContent>
                    <p>You can contact our support team by emailing support@herbharmony.com or using the contact form on our website. Premium subscribers receive priority support with faster response times.</p>
                    <div className="mt-4">
                      <Button size="sm" variant="outline">
                        Contact Support
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-6">Our support team is here to help you with any other questions you might have.</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline">
            <HelpCircle className="mr-2 h-4 w-4" />
            Contact Support
          </Button>
          <Button>
            <Zap className="mr-2 h-4 w-4" />
            View Pricing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
