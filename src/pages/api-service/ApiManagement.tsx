import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getApiPlans, 
  getUserApiKeys, 
  createApiKey,
  revokeApiKey,
  ApiPlan,
  ApiKey
} from '@/lib/api-service';
import { supabase } from '@/lib/supabase';
import { 
  Key, 
  Plus, 
  Trash2, 
  Copy, 
  CheckCircle, 
  XCircle, 
  Loader2,
  AlertCircle,
  Clock,
  BarChart4
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ApiManagement: React.FC = () => {
  const [plans, setPlans] = useState<ApiPlan[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isCreatingKey, setIsCreatingKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);
  const [keyCopied, setKeyCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUser(data.session.user);
      } else {
        // Redirect to login if not authenticated
        navigate('/login?returnTo=/api-service/manage');
      }
    };

    checkAuth();
    loadData();
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Load API plans
      const { plans: apiPlans, error: plansError } = await getApiPlans();
      if (plansError) {
        setError(plansError);
      } else {
        setPlans(apiPlans);
        if (apiPlans.length > 0 && !selectedPlanId) {
          setSelectedPlanId(apiPlans[0].id);
        }
      }

      // Load user's API keys
      const { keys, error: keysError } = await getUserApiKeys();
      if (keysError) {
        setError(keysError);
      } else {
        setApiKeys(keys);
      }
    } catch (err) {
      setError('Failed to load API data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateKey = async () => {
    if (!selectedPlanId || !newKeyName.trim()) {
      setError('Please select a plan and provide a name for your API key');
      return;
    }

    setIsCreatingKey(true);
    setError(null);

    try {
      const { key, error: createError } = await createApiKey(selectedPlanId, newKeyName);
      
      if (createError) {
        setError(createError);
      } else if (key) {
        setApiKeys([key, ...apiKeys]);
        setNewlyCreatedKey(key.api_key);
        setNewKeyName('');
        setIsDialogOpen(false);
      }
    } catch (err) {
      setError('Failed to create API key');
      console.error(err);
    } finally {
      setIsCreatingKey(false);
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { success, error: revokeError } = await revokeApiKey(keyId);
      
      if (revokeError) {
        setError(revokeError);
      } else if (success) {
        // Update the key status in the local state
        setApiKeys(apiKeys.map(key => 
          key.id === keyId ? { ...key, status: 'revoked' } : key
        ));
      }
    } catch (err) {
      setError('Failed to revoke API key');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 2000);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  if (loading && apiKeys.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading API management...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight">API Management</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Create and manage API keys to access the Herb Harmony API
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {newlyCreatedKey && (
        <Alert className="mb-8 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>API Key Created Successfully</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <p>Your new API key has been created. Make sure to copy it now as you won't be able to see it again.</p>
            <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
              <code className="text-sm font-mono flex-1 overflow-x-auto">{newlyCreatedKey}</code>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => copyToClipboard(newlyCreatedKey)}
                className="flex items-center gap-1"
              >
                {keyCopied ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {keyCopied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your API Keys</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create New API Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription>
                Create a new API key to access the Herb Harmony API. You'll only be able to view the key once after creation.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Key Name</Label>
                <Input
                  id="name"
                  placeholder="My API Key"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="plan">API Plan</Label>
                <Select value={selectedPlanId} onValueChange={setSelectedPlanId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.name} - ${plan.price.toFixed(2)}/month
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateKey} disabled={isCreatingKey}>
                {isCreatingKey && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create API Key
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {apiKeys.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Key className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              You don't have any API keys yet. Create your first key to start using the Herb Harmony API.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {apiKeys.map((key) => (
            <Card key={key.id} className={key.status === 'revoked' ? 'opacity-60' : ''}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {key.name}
                      {key.status === 'active' ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          Revoked
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Created on {new Date(key.created_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/api-service/usage/${key.id}`)}
                      className="flex items-center gap-1"
                    >
                      <BarChart4 className="h-4 w-4" />
                      Usage
                    </Button>
                    {key.status === 'active' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevokeKey(key.id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                        Revoke
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="details">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="usage">Usage</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Plan</h3>
                        <p className="text-sm">{key.plan?.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Price</h3>
                        <p className="text-sm">${key.plan?.price.toFixed(2)}/month</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Request Limit</h3>
                        <p className="text-sm">{key.plan?.request_limit.toLocaleString()} requests/month</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Daily Rate Limit</h3>
                        <p className="text-sm">{key.plan?.daily_rate_limit.toLocaleString()} requests/day</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Last Used</h3>
                        <p className="text-sm">{formatDate(key.last_used_at)}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Expires On</h3>
                        <p className="text-sm">{formatDate(key.expires_at)}</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="usage">
                    <div className="flex flex-col items-center justify-center py-4">
                      <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground text-center">
                        Visit the usage dashboard for detailed analytics on your API usage.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => navigate(`/api-service/usage/${key.id}`)}
                      >
                        View Usage Dashboard
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="pt-0 border-t">
                <div className="w-full">
                  <h3 className="text-sm font-medium mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {key.plan?.features && Object.entries(key.plan.features).map(([feature, enabled]) => (
                      <Badge 
                        key={feature} 
                        variant="outline"
                        className={enabled 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : "bg-gray-50 text-gray-500 border-gray-200"
                        }
                      >
                        {feature.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        {enabled ? (
                          <CheckCircle className="ml-1 h-3 w-3 text-green-500" />
                        ) : (
                          <XCircle className="ml-1 h-3 w-3 text-gray-400" />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiManagement;
