import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Book, 
  Code, 
  Key, 
  Lock, 
  FileJson, 
  Search, 
  Database, 
  List, 
  Info,
  ExternalLink
} from 'lucide-react';

const ApiDocs: React.FC = () => {
  return (
    <div className="container max-w-6xl py-12">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Herb Harmony API Documentation</h1>
          <p className="mt-2 text-xl text-muted-foreground">
            Integrate herbal wisdom into your applications
          </p>
        </div>
        <Button asChild>
          <Link to="/api-service/manage">Manage API Keys</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-blue-500" />
              Authentication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              All API requests require an API key passed in the request headers.
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
              <code className="text-xs">
                <span className="text-purple-600 dark:text-purple-400">headers</span>: {'{'}
                <br />
                &nbsp;&nbsp;<span className="text-blue-600 dark:text-blue-400">'x-api-key'</span>: <span className="text-green-600 dark:text-green-400">'YOUR_API_KEY'</span>
                <br />
                {'}'}
              </code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="h-5 w-5 text-green-500" />
              Response Format
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              All API responses are returned in JSON format with a consistent structure.
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
              <code className="text-xs">
                {'{'}
                <br />
                &nbsp;&nbsp;<span className="text-blue-600 dark:text-blue-400">"data"</span>: [...],
                <br />
                &nbsp;&nbsp;<span className="text-blue-600 dark:text-blue-400">"metadata"</span>: {'{'}...{'}'}
                <br />
                {'}'}
              </code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-red-500" />
              Rate Limits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              API requests are subject to rate limits based on your subscription plan.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Free Plan</span>
                <span>100/day</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Basic Plan</span>
                <span>1,000/day</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Premium Plan</span>
                <span>5,000/day</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="endpoints" className="mt-8">
        <TabsList className="mb-6">
          <TabsTrigger value="endpoints">
            <Code className="h-4 w-4 mr-2" />
            API Endpoints
          </TabsTrigger>
          <TabsTrigger value="examples">
            <Book className="h-4 w-4 mr-2" />
            Code Examples
          </TabsTrigger>
          <TabsTrigger value="plans">
            <Database className="h-4 w-4 mr-2" />
            API Plans
          </TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  GET /api/herbs
                </CardTitle>
                <CardDescription>
                  Retrieve a list of herbs with basic information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Query Parameters</h3>
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="font-medium">Parameter</div>
                        <div className="font-medium">Description</div>
                        <div className="font-medium">Required</div>
                        
                        <div>category</div>
                        <div>Filter herbs by category</div>
                        <div>No</div>
                        
                        <div>limit</div>
                        <div>Number of results to return (default: 50, max: 100)</div>
                        <div>No</div>
                        
                        <div>offset</div>
                        <div>Number of results to skip (for pagination)</div>
                        <div>No</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Example Request</h3>
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                      <code className="text-xs">
                        GET /api/herbs?category=brain-herbs&limit=10
                      </code>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Example Response</h3>
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md overflow-auto max-h-60">
                      <code className="text-xs whitespace-pre">
{`{
  "data": [
    {
      "id": "ashwagandha-brain",
      "name": "Ashwagandha",
      "scientificName": "Withania somnifera",
      "category": "brain-herbs",
      "description": "Ashwagandha is an adaptogenic herb that helps reduce stress and anxiety while supporting cognitive function and memory."
    },
    {
      "id": "holy-basil-brain",
      "name": "Holy Basil",
      "scientificName": "Ocimum sanctum",
      "category": "brain-herbs",
      "description": "Holy Basil, also known as Tulsi, is a sacred herb in Ayurvedic medicine known for its ability to enhance clarity, focus, and cognitive function."
    }
  ],
  "metadata": {
    "count": 2,
    "offset": 0,
    "limit": 10
  }
}`}
                      </code>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Required Plan</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      All Plans
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  GET /api/herbs/:id
                </CardTitle>
                <CardDescription>
                  Retrieve detailed information about a specific herb
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Path Parameters</h3>
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="font-medium">Parameter</div>
                        <div className="font-medium">Description</div>
                        
                        <div>id</div>
                        <div>The unique identifier of the herb</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Example Request</h3>
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                      <code className="text-xs">
                        GET /api/herbs/ashwagandha-brain
                      </code>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Example Response</h3>
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md overflow-auto max-h-60">
                      <code className="text-xs whitespace-pre">
{`{
  "data": {
    "id": "ashwagandha-brain",
    "name": "Ashwagandha",
    "scientificName": "Withania somnifera",
    "category": "brain-herbs",
    "description": "Ashwagandha is an adaptogenic herb that helps reduce stress and anxiety while supporting cognitive function and memory.",
    "benefits": [
      "Reduces stress and anxiety",
      "Improves memory and cognitive function",
      "Supports focus and concentration",
      "May help with neurodegenerative conditions"
    ],
    "usage": "Commonly taken as a supplement in capsule or powder form, or as a tea.",
    "cautions": "May interact with thyroid medications, sedatives, and immunosuppressants. Not recommended during pregnancy."
  }
}`}
                      </code>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Response Fields</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      The Basic plan includes basic herb information. The Premium plan includes all fields.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 justify-start">
                        Basic Fields (All Plans)
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 justify-start">
                        Detailed Fields (Premium Plan)
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <List className="h-5 w-5 text-blue-500" />
                  GET /api/categories
                </CardTitle>
                <CardDescription>
                  Retrieve a list of all herb categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Example Request</h3>
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                      <code className="text-xs">
                        GET /api/categories
                      </code>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Example Response</h3>
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md overflow-auto max-h-60">
                      <code className="text-xs whitespace-pre">
{`{
  "data": [
    "brain-herbs",
    "heart-herbs",
    "stomach-herbs",
    "womens-herbs",
    "mens-herbs",
    "herbal-teas"
  ]
}`}
                      </code>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Required Plan</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      All Plans
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-blue-500" />
                  GET /api/search
                </CardTitle>
                <CardDescription>
                  Search for herbs by name, scientific name, or description
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Query Parameters</h3>
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="font-medium">Parameter</div>
                        <div className="font-medium">Description</div>
                        <div className="font-medium">Required</div>
                        
                        <div>query</div>
                        <div>Search term to match against herb name, scientific name, or description</div>
                        <div>Yes</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Example Request</h3>
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                      <code className="text-xs">
                        GET /api/search?query=anxiety
                      </code>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Example Response</h3>
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md overflow-auto max-h-60">
                      <code className="text-xs whitespace-pre">
{`{
  "data": [
    {
      "id": "ashwagandha-brain",
      "name": "Ashwagandha",
      "scientificName": "Withania somnifera",
      "category": "brain-herbs",
      "description": "Ashwagandha is an adaptogenic herb that helps reduce stress and anxiety while supporting cognitive function and memory."
    },
    {
      "id": "holy-basil-brain",
      "name": "Holy Basil",
      "scientificName": "Ocimum sanctum",
      "category": "brain-herbs",
      "description": "Holy Basil, also known as Tulsi, is a sacred herb in Ayurvedic medicine known for its ability to enhance clarity, focus, and cognitive function."
    }
  ],
  "metadata": {
    "count": 2,
    "query": "anxiety"
  }
}`}
                      </code>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Required Plan</h3>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Basic & Premium Plans
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="examples">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>JavaScript Example</CardTitle>
                <CardDescription>
                  Using the Herb Harmony API with JavaScript/Node.js
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md overflow-auto">
                  <code className="text-xs whitespace-pre">
{`// Using fetch in a browser or Node.js environment
const API_KEY = 'your_api_key';
const API_BASE_URL = 'https://kipqzmgjqwijpulxctfs.supabase.co/functions/v1/api';

async function getHerbs() {
  try {
    const response = await fetch(\`\${API_BASE_URL}/herbs?category=brain-herbs\`, {
      headers: {
        'x-api-key': API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(\`API error: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching herbs:', error);
  }
}

// Call the function
getHerbs();`}
                  </code>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Python Example</CardTitle>
                <CardDescription>
                  Using the Herb Harmony API with Python
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md overflow-auto">
                  <code className="text-xs whitespace-pre">
{`import requests

API_KEY = 'your_api_key'
API_BASE_URL = 'https://kipqzmgjqwijpulxctfs.supabase.co/functions/v1/api'

def get_herb_details(herb_id):
    try:
        response = requests.get(
            f'{API_BASE_URL}/herbs/{herb_id}',
            headers={'x-api-key': API_KEY}
        )
        
        response.raise_for_status()  # Raise exception for 4XX/5XX responses
        
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f'Error fetching herb details: {e}')
        return None

# Example usage
herb_data = get_herb_details('ashwagandha-brain')
if herb_data:
    print(f"Name: {herb_data['data']['name']}")
    print(f"Scientific Name: {herb_data['data']['scientificName']}")
    print(f"Description: {herb_data['data']['description']}")
    
    # Print benefits if available in your plan
    if 'benefits' in herb_data['data']:
        print("\\nBenefits:")
        for benefit in herb_data['data']['benefits']:
            print(f"- {benefit}")
`}
                  </code>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>React Example</CardTitle>
                <CardDescription>
                  Using the Herb Harmony API in a React application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md overflow-auto">
                  <code className="text-xs whitespace-pre">
{`import React, { useState, useEffect } from 'react';

const API_KEY = 'your_api_key';
const API_BASE_URL = 'https://kipqzmgjqwijpulxctfs.supabase.co/functions/v1/api';

function HerbList() {
  const [herbs, setHerbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHerbs = async () => {
      try {
        const response = await fetch(\`\${API_BASE_URL}/herbs\`, {
          headers: {
            'x-api-key': API_KEY
          }
        });
        
        if (!response.ok) {
          throw new Error(\`API error: \${response.status}\`);
        }
        
        const data = await response.json();
        setHerbs(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHerbs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Herb List</h1>
      <ul>
        {herbs.map(herb => (
          <li key={herb.id}>
            <h2>{herb.name}</h2>
            <p><em>{herb.scientificName}</em></p>
            <p>{herb.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HerbList;`}
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="plans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Free Plan</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  Basic API access for testing and development
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-green-500 w-1.5 h-1.5 mt-2" />
                    <span>1,000 requests per month</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-green-500 w-1.5 h-1.5 mt-2" />
                    <span>100 requests per day</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-green-500 w-1.5 h-1.5 mt-2" />
                    <span>Basic herb information</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-green-500 w-1.5 h-1.5 mt-2" />
                    <span>Categories endpoint</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link to="/api-service/manage">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-primary">
              <CardHeader>
                <Badge className="w-fit mb-2">Popular</Badge>
                <CardTitle>Basic Plan</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$29.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  Standard API access for small projects and applications
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-green-500 w-1.5 h-1.5 mt-2" />
                    <span>10,000 requests per month</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-green-500 w-1.5 h-1.5 mt-2" />
                    <span>1,000 requests per day</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-green-500 w-1.5 h-1.5 mt-2" />
                    <span>Basic herb information</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-green-500 w-1.5 h-1.5 mt-2" />
                    <span>Detailed herb information</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-green-500 w-1.5 h-1.5 mt-2" />
                    <span>Search endpoint</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-green-500 w-1.5 h-1.5 mt-2" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button className="w-full">
                  <Link to="/api-service/manage">Subscribe</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Premium Plan</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$99.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  Unlimited API access for production applications
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-green-500 w-1.5 h-1.5 mt-2" />
                    <span>100,000 requests per month</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-green-500 w-1.5 h-1.5 mt-2" />
                    <span>5,000 requests per day</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-green-500 w-1.5 h-1.5 mt-2" />
                    <span>All features from Basic plan</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-green-500 w-1.5 h-1.5 mt-2" />
                    <span>Advanced filtering</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-green-500 w-1.5 h-1.5 mt-2" />
                    <span>Bulk operations</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-green-500 w-1.5 h-1.5 mt-2" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="w-full">
                  <Link to="/api-service/manage">Subscribe</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiDocs;
