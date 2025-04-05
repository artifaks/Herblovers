import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Leaf, CreditCard, BarChart2, Database, Book, Crown, ShieldCheck, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="container max-w-6xl py-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-50 via-teal-50 to-emerald-50 p-8 mb-16">
        <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:max-w-xl">
            <Badge className="mb-4 bg-herb-heart text-white hover:bg-herb-heart/90">Herb Harmony Platform</Badge>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent mb-4">
              Monetize Your Herbal Knowledge
            </h1>
            <p className="text-xl text-slate-600 mb-6">
              Unlock the full potential of herbal data with our comprehensive subscription and API services platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-herb-heart hover:bg-herb-heart/90">
                <Link to="/subscription">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-full md:w-1/3 aspect-square md:aspect-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <Leaf className="h-24 w-24 md:h-32 md:w-32 text-herb-heart animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Powerful Features for Herbalists</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Explore our comprehensive suite of tools designed to help you monetize and share your herbal knowledge.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-t-4 border-t-herb-heart hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-herb-heart/10">
                  <Crown className="h-5 w-5 text-herb-heart" />
                </div>
                <CardTitle>Premium Subscriptions</CardTitle>
              </div>
              <CardDescription>Monetize your herbal knowledge</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Offer tiered subscription plans with exclusive content, detailed herb profiles, and premium features to your users.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/subscription">View Subscription Plans</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-t-4 border-t-blue-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Database className="h-5 w-5 text-blue-500" />
                </div>
                <CardTitle>API Services</CardTitle>
              </div>
              <CardDescription>Integrate herb data anywhere</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Provide developers with API access to your herbal database. Set rate limits, manage API keys, and track usage analytics.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link to="/api-service">Explore API Services</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-t-4 border-t-purple-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <BarChart2 className="h-5 w-5 text-purple-500" />
                </div>
                <CardTitle>Analytics Dashboard</CardTitle>
              </div>
              <CardDescription>Track performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Monitor subscription growth, API usage, revenue trends, and user engagement with detailed analytics dashboards.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link to="/api-service/analytics">View Analytics</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-t-4 border-t-amber-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Book className="h-5 w-5 text-amber-500" />
                </div>
                <CardTitle>Digital Products</CardTitle>
              </div>
              <CardDescription>Sell ebooks and guides</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Create and sell digital products like ebooks, guides, and educational content about herbal remedies.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link to="/ebooks">Browse Digital Products</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-t-4 border-t-emerald-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                </div>
                <CardTitle>Secure Payments</CardTitle>
              </div>
              <CardDescription>Powered by Stripe</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Process payments securely with Stripe integration. Support for subscriptions, one-time purchases, and more.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link to="/direct-stripe" className="flex items-center justify-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Test Stripe Integration
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-t-4 border-t-rose-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-rose-500/10">
                  <Zap className="h-5 w-5 text-rose-500" />
                </div>
                <CardTitle>Quick Setup</CardTitle>
              </div>
              <CardDescription>Start monetizing today</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Get started quickly with our easy setup process. Configure your subscription tiers and start earning revenue.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link to="/faq">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-xl bg-gradient-to-r from-herb-heart/90 to-herb-heart p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to monetize your herbal knowledge?</h2>
            <p className="text-white/90 mb-0 md:mb-0">Start offering premium subscriptions and API services today.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/pricing">View Pricing</Link>
            </Button>
            {!isAuthenticated && (
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/20 hover:text-white">
                <Link to="/login">Sign Up Now</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
