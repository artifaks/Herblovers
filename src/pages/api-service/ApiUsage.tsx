import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getApiKeyUsage, 
  getApiKeyUsageStats,
  getUserApiKeys,
  ApiKey,
  ApiUsage,
  ApiUsageStats
} from '@/lib/api-service';
import { supabase } from '@/lib/supabase';
import { 
  BarChart, 
  Clock, 
  ArrowLeft, 
  Loader2,
  AlertCircle,
  FileText,
  Activity,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ApiUsage: React.FC = () => {
  const { keyId } = useParams<{ keyId: string }>();
  const [apiKey, setApiKey] = useState<ApiKey | null>(null);
  const [usageData, setUsageData] = useState<ApiUsage[]>([]);
  const [usageStats, setUsageStats] = useState<ApiUsageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        // Redirect to login if not authenticated
        navigate('/login?returnTo=/api-service/usage/' + keyId);
      }
    };

    checkAuth();
    loadData();
  }, [keyId, navigate]);

  const loadData = async () => {
    if (!keyId) return;
    
    setLoading(true);
    setError(null);

    try {
      // Get API key details
      const { keys, error: keysError } = await getUserApiKeys();
      if (keysError) {
        setError(keysError);
      } else {
        const key = keys.find(k => k.id === keyId);
        if (key) {
          setApiKey(key);
        } else {
          setError('API key not found');
        }
      }

      // Get API usage data
      const { usage, error: usageError } = await getApiKeyUsage(keyId);
      if (usageError) {
        setError(usageError);
      } else {
        setUsageData(usage);
      }

      // Get API usage statistics
      const { stats, error: statsError } = await getApiKeyUsageStats(keyId);
      if (statsError) {
        setError(statsError);
      } else if (stats) {
        setUsageStats(stats);
      }
    } catch (err) {
      setError('Failed to load API usage data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return 'text-green-600 bg-green-50 border-green-200';
    if (statusCode >= 400 && statusCode < 500) return 'text-amber-600 bg-amber-50 border-amber-200';
    if (statusCode >= 500) return 'text-red-600 bg-red-50 border-red-200';
    return 'text-blue-600 bg-blue-50 border-blue-200';
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = usageData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(usageData.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading && !apiKey) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading API usage data...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-12">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-1"
        onClick={() => navigate('/api-service/manage')}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to API Management
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">API Usage Dashboard</h1>
        {apiKey && (
          <p className="mt-2 text-xl text-muted-foreground">
            {apiKey.name} {' '}
            <Badge variant="outline" className={apiKey.status === 'active' 
              ? "bg-green-50 text-green-700 border-green-200" 
              : "bg-red-50 text-red-700 border-red-200"
            }>
              {apiKey.status === 'active' ? 'Active' : 'Revoked'}
            </Badge>
          </p>
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {apiKey && usageStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Requests</CardTitle>
              <div className="text-2xl font-bold">{usageStats.total.toLocaleString()}</div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Out of {apiKey.plan?.request_limit.toLocaleString()} monthly limit
              </div>
              <Progress 
                value={(usageStats.total / (apiKey.plan?.request_limit || 1)) * 100} 
                className="h-2 mt-2" 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Daily Requests</CardTitle>
              <div className="text-2xl font-bold">{usageStats.daily.toLocaleString()}</div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Out of {apiKey.plan?.daily_rate_limit.toLocaleString()} daily limit
              </div>
              <Progress 
                value={(usageStats.daily / (apiKey.plan?.daily_rate_limit || 1)) * 100} 
                className="h-2 mt-2" 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Plan</CardTitle>
              <div className="text-2xl font-bold">{apiKey.plan?.name}</div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                ${apiKey.plan?.price.toFixed(2)}/month
              </div>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="text-xs">
                  Upgrade Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="requests">
        <TabsList className="mb-6">
          <TabsTrigger value="requests">
            <FileText className="h-4 w-4 mr-2" />
            Request Log
          </TabsTrigger>
          <TabsTrigger value="endpoints">
            <Activity className="h-4 w-4 mr-2" />
            Endpoints
          </TabsTrigger>
          <TabsTrigger value="status">
            <BarChart className="h-4 w-4 mr-2" />
            Status Codes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests">
          {usageData.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No API requests have been made with this key yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Recent API Requests</CardTitle>
                  <CardDescription>
                    Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, usageData.length)} of {usageData.length} requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Endpoint</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Response Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {formatDate(item.created_at)}
                          </TableCell>
                          <TableCell>{item.endpoint}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {item.method}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(item.status_code)}>
                              {item.status_code}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{item.response_time_ms}ms</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="endpoints">
          {!usageStats || Object.keys(usageStats.endpoints).length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Activity className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No endpoint data available yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Endpoint Usage</CardTitle>
                <CardDescription>
                  Breakdown of API requests by endpoint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(usageStats.endpoints)
                    .sort(([, a], [, b]) => b - a)
                    .map(([endpoint, count]) => (
                      <div key={endpoint}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{endpoint}</span>
                          <span className="text-sm text-muted-foreground">{count} requests</span>
                        </div>
                        <Progress 
                          value={(count / usageStats.total) * 100} 
                          className="h-2" 
                        />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="status">
          {!usageStats || Object.keys(usageStats.status_codes).length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BarChart className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No status code data available yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Status Code Distribution</CardTitle>
                <CardDescription>
                  Breakdown of API responses by status code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(usageStats.status_codes)
                    .sort(([a], [b]) => parseInt(a) - parseInt(b))
                    .map(([code, count]) => (
                      <div key={code}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium flex items-center">
                            <Badge variant="outline" className={getStatusColor(parseInt(code))}>
                              {code}
                            </Badge>
                            <span className="ml-2">
                              {parseInt(code) >= 200 && parseInt(code) < 300 && 'Success'}
                              {parseInt(code) >= 400 && parseInt(code) < 500 && 'Client Error'}
                              {parseInt(code) >= 500 && 'Server Error'}
                            </span>
                          </span>
                          <span className="text-sm text-muted-foreground">{count} requests</span>
                        </div>
                        <Progress 
                          value={(count / usageStats.total) * 100} 
                          className="h-2" 
                        />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiUsage;
