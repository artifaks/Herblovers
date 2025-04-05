import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  BarChart4, 
  PieChart as PieChartIcon, 
  Activity, 
  Clock, 
  AlertTriangle,
  Download
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getUserApiKeys, ApiKey } from '@/lib/api-service';

// Mock data for API usage analytics
const generateMockData = () => {
  // Daily usage for the past 30 days
  const dailyUsage = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      requests: Math.floor(Math.random() * 300) + 50,
    };
  });

  // Endpoint usage distribution
  const endpointUsage = [
    { name: '/herbs', value: 45 },
    { name: '/categories', value: 25 },
    { name: '/search', value: 20 },
    { name: '/properties', value: 10 },
  ];

  // Status code distribution
  const statusCodes = [
    { name: '200 OK', value: 85 },
    { name: '400 Bad Request', value: 8 },
    { name: '401 Unauthorized', value: 5 },
    { name: '404 Not Found', value: 2 },
  ];

  // Response time distribution
  const responseTimeDistribution = [
    { name: '<100ms', value: 65 },
    { name: '100-300ms', value: 25 },
    { name: '300-500ms', value: 8 },
    { name: '>500ms', value: 2 },
  ];

  // Hourly distribution
  const hourlyDistribution = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    requests: Math.floor(Math.random() * 100) + 10,
  }));

  return {
    dailyUsage,
    endpointUsage,
    statusCodes,
    responseTimeDistribution,
    hourlyDistribution,
    totalRequests: dailyUsage.reduce((sum, day) => sum + day.requests, 0),
    avgResponseTime: 125, // milliseconds
    errorRate: 15, // percentage
  };
};

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ApiAnalytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [selectedApiKey, setSelectedApiKey] = useState<string>('');
  const [timeRange, setTimeRange] = useState<string>('30d');
  const [analyticsData, setAnalyticsData] = useState(generateMockData());

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    setLoading(true);
    try {
      const { keys, error } = await getUserApiKeys();
      if (error) {
        setError(error);
      } else {
        setApiKeys(keys);
        if (keys.length > 0) {
          setSelectedApiKey(keys[0].id);
        }
      }
    } catch (err) {
      setError('Failed to load API keys');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeyChange = (value: string) => {
    setSelectedApiKey(value);
    // In a real implementation, this would fetch new analytics data for the selected key
    setAnalyticsData(generateMockData());
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    // In a real implementation, this would fetch new analytics data for the selected time range
    setAnalyticsData(generateMockData());
  };

  const handleExportData = () => {
    // In a real implementation, this would generate and download a CSV or JSON file
    alert('In production, this would download your analytics data as CSV');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <Clock className="h-8 w-8 animate-spin text-primary" />
          <p>Loading analytics data...</p>
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
            onClick={loadApiKeys}
          >
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (apiKeys.length === 0) {
    return (
      <div className="container max-w-6xl py-8">
        <Alert className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No API Keys Found</AlertTitle>
          <AlertDescription>
            You don't have any API keys yet. Create an API key to start tracking usage analytics.
          </AlertDescription>
        </Alert>
        <Button onClick={() => window.location.href = '/api-service/manage'}>
          Manage API Keys
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">API Usage Analytics</h1>
          <p className="text-muted-foreground">Monitor and analyze your API usage patterns</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedApiKey} onValueChange={handleApiKeyChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select API Key" />
            </SelectTrigger>
            <SelectContent>
              {apiKeys.map((key) => (
                <SelectItem key={key.id} value={key.id}>
                  {key.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{analyticsData.totalRequests.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              In the last {timeRange === '7d' ? '7 days' : timeRange === '30d' ? '30 days' : timeRange === '90d' ? '90 days' : 'year'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{analyticsData.avgResponseTime} ms</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all endpoints
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className={`h-5 w-5 mr-2 ${analyticsData.errorRate > 10 ? 'text-amber-500' : 'text-green-500'}`} />
              <span className="text-2xl font-bold">{analyticsData.errorRate}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Non-200 status codes
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for different analytics views */}
      <Tabs defaultValue="usage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usage">
            <BarChart4 className="h-4 w-4 mr-2" />
            Usage Trends
          </TabsTrigger>
          <TabsTrigger value="endpoints">
            <PieChartIcon className="h-4 w-4 mr-2" />
            Endpoint Distribution
          </TabsTrigger>
          <TabsTrigger value="performance">
            <Activity className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
        </TabsList>
        
        {/* Usage Trends Tab */}
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily API Requests</CardTitle>
              <CardDescription>
                Number of API requests per day over the selected time period
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.dailyUsage}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    angle={-45} 
                    textAnchor="end"
                    tick={{ fontSize: 12 }}
                    height={60}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="requests" fill="#8884d8" name="Requests" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Hourly Distribution</CardTitle>
              <CardDescription>
                Average number of requests by hour of day
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.hourlyDistribution}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="hour" 
                    tickFormatter={(hour) => `${hour}:00`}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} requests`, 'Count']}
                    labelFormatter={(hour) => `${hour}:00 - ${(hour + 1) % 24}:00`}
                  />
                  <Bar dataKey="requests" fill="#82ca9d" name="Requests" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Endpoint Distribution Tab */}
        <TabsContent value="endpoints" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Endpoint Usage Distribution</CardTitle>
                <CardDescription>
                  Percentage of requests by endpoint
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.endpointUsage}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData.endpointUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} %`, 'Percentage']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Status Code Distribution</CardTitle>
                <CardDescription>
                  Percentage of requests by status code
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.statusCodes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData.statusCodes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} %`, 'Percentage']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Response Time Distribution</CardTitle>
              <CardDescription>
                Percentage of requests by response time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.responseTimeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analyticsData.responseTimeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} %`, 'Percentage']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiAnalytics;
