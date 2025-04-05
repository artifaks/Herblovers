import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration - in a real app, this would come from your Supabase database
interface Ebook {
  id: string;
  title: string;
  file_path: string;
  cover_path: string;
  price: number;
  category_id: string;
}

interface DiagnosticResult {
  ebook: Ebook;
  fileExists: boolean;
  coverExists: boolean;
  issues: string[];
}

const EbooksDiagnostic: React.FC = () => {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [diagnosticResults, setDiagnosticResults] = useState<DiagnosticResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFixing, setIsFixing] = useState(false);
  const { toast } = useToast();

  // Mock function to fetch ebooks - in a real app, this would fetch from Supabase
  const fetchEbooks = async () => {
    // Simulating API call
    return new Promise<Ebook[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Herbal Remedies for Beginners',
            file_path: '/ebooks/herbal-remedies.pdf',
            cover_path: '/covers/herbal-remedies.jpg',
            price: 9.99,
            category_id: 'general'
          },
          {
            id: '2',
            title: 'Brain Herbs: A Complete Guide',
            file_path: '/ebooks/brain-herbs.pdf',
            cover_path: '/covers/brain-herbs.jpg',
            price: 12.99,
            category_id: 'brain-herbs'
          },
          {
            id: '3',
            title: 'Heart Health with Herbs',
            file_path: '/ebooks/heart-health.pdf',
            cover_path: '/covers/missing-cover.jpg',
            price: 14.99,
            category_id: 'heart-herbs'
          },
          {
            id: '4',
            title: 'Women\'s Herbal Wisdom',
            file_path: '/ebooks/missing-file.pdf',
            cover_path: '/covers/womens-herbs.jpg',
            price: 11.99,
            category_id: 'womens-herbs'
          }
        ]);
      }, 1000);
    });
  };

  // Mock function to check if a file exists in storage
  const checkFileExists = async (path: string): Promise<boolean> => {
    // Simulating storage check
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate some files missing
        if (path.includes('missing')) {
          resolve(false);
        } else {
          resolve(true);
        }
      }, 300);
    });
  };

  // Mock function to fix storage issues
  const fixStorageIssues = async (results: DiagnosticResult[]): Promise<void> => {
    setIsFixing(true);
    let fixed = 0;

    for (const result of results) {
      if (result.issues.length > 0) {
        // Simulate fixing each issue
        await new Promise((resolve) => {
          setTimeout(() => {
            fixed++;
            setProgress(Math.round((fixed / results.filter(r => r.issues.length > 0).length) * 100));
            resolve(null);
          }, 800);
        });
      }
    }

    // Update diagnostic results after fixing
    const updatedResults = [...diagnosticResults].map(result => {
      if (result.issues.length > 0) {
        return {
          ...result,
          fileExists: true,
          coverExists: true,
          issues: []
        };
      }
      return result;
    });

    setDiagnosticResults(updatedResults);
    setIsFixing(false);
    toast({
      title: "Storage issues fixed",
      description: `Fixed issues with ${fixed} ebooks`,
      duration: 3000,
    });
  };

  // Run diagnostic check
  const runDiagnostic = async () => {
    setIsLoading(true);
    setProgress(0);
    
    const results: DiagnosticResult[] = [];
    let completed = 0;
    
    for (const ebook of ebooks) {
      const fileExists = await checkFileExists(ebook.file_path);
      const coverExists = await checkFileExists(ebook.cover_path);
      
      const issues: string[] = [];
      if (!fileExists) issues.push('Ebook file is missing');
      if (!coverExists) issues.push('Cover image is missing');
      
      results.push({
        ebook,
        fileExists,
        coverExists,
        issues
      });
      
      completed++;
      setProgress(Math.round((completed / ebooks.length) * 100));
    }
    
    setDiagnosticResults(results);
    setIsLoading(false);
    
    const issueCount = results.reduce((count, result) => count + result.issues.length, 0);
    if (issueCount > 0) {
      toast({
        title: `Found ${issueCount} issue${issueCount === 1 ? '' : 's'}`,
        description: "Use the 'Fix All Issues' button to attempt automatic repair",
        duration: 5000,
      });
    } else {
      toast({
        title: "No issues found",
        description: "All ebook files and covers are available",
        duration: 3000,
      });
    }
  };

  // Initialize data
  useEffect(() => {
    const initData = async () => {
      const ebooksData = await fetchEbooks();
      setEbooks(ebooksData);
      setIsLoading(false);
    };
    
    initData();
  }, []);

  // Run initial diagnostic when ebooks are loaded
  useEffect(() => {
    if (ebooks.length > 0 && diagnosticResults.length === 0) {
      runDiagnostic();
    }
  }, [ebooks]);

  const issueCount = diagnosticResults.reduce((count, result) => count + result.issues.length, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Ebooks Diagnostic Tool</h1>
        
        <div className="grid gap-6">
          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>Diagnostic Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Healthy</h3>
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {diagnosticResults.filter(r => r.issues.length === 0).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Ebooks with no issues</p>
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-500" />
                    <h3 className="font-medium">Issues</h3>
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {issueCount}
                  </p>
                  <p className="text-sm text-muted-foreground">Problems detected</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">Affected</h3>
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {diagnosticResults.filter(r => r.issues.length > 0).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Ebooks with issues</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={runDiagnostic} 
                    disabled={isLoading || isFixing}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh Diagnostic
                  </Button>
                  
                  <Button 
                    onClick={() => fixStorageIssues(diagnosticResults)} 
                    disabled={isLoading || isFixing || issueCount === 0}
                    variant="default"
                  >
                    Fix All Issues
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Last checked: {new Date().toLocaleString()}
                </div>
              </div>
              
              {(isLoading || isFixing) && (
                <div className="mt-4">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-center mt-1 text-muted-foreground">
                    {isLoading ? 'Running diagnostic...' : 'Fixing issues...'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Results Table */}
          <Card>
            <CardHeader>
              <CardTitle>Diagnostic Results</CardTitle>
            </CardHeader>
            <CardContent>
              {diagnosticResults.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>File Status</TableHead>
                      <TableHead>Cover Status</TableHead>
                      <TableHead>Issues</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {diagnosticResults.map((result) => (
                      <TableRow key={result.ebook.id}>
                        <TableCell className="font-medium">{result.ebook.title}</TableCell>
                        <TableCell>{result.ebook.category_id}</TableCell>
                        <TableCell>
                          {result.fileExists ? (
                            <div className="flex items-center text-green-500">
                              <CheckCircle className="h-4 w-4 mr-1" /> OK
                            </div>
                          ) : (
                            <div className="flex items-center text-red-500">
                              <XCircle className="h-4 w-4 mr-1" /> Missing
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {result.coverExists ? (
                            <div className="flex items-center text-green-500">
                              <CheckCircle className="h-4 w-4 mr-1" /> OK
                            </div>
                          ) : (
                            <div className="flex items-center text-red-500">
                              <XCircle className="h-4 w-4 mr-1" /> Missing
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {result.issues.length > 0 ? (
                            <ul className="list-disc list-inside text-sm text-red-500">
                              {result.issues.map((issue, index) => (
                                <li key={index}>{issue}</li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-green-500">No issues</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No diagnostic results available</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Help Section */}
          <Card>
            <CardHeader>
              <CardTitle>Troubleshooting Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <AlertTitle>Missing Files</AlertTitle>
                  <AlertDescription>
                    If files are missing, ensure they've been properly uploaded to your storage bucket. 
                    The diagnostic tool will attempt to recreate necessary folders and update file paths.
                  </AlertDescription>
                </Alert>
                
                <Alert>
                  <AlertTitle>Storage Permissions</AlertTitle>
                  <AlertDescription>
                    Make sure your storage bucket has the correct permissions set. Public files should 
                    have appropriate RLS policies to allow access.
                  </AlertDescription>
                </Alert>
                
                <Alert>
                  <AlertTitle>File Paths</AlertTitle>
                  <AlertDescription>
                    Ensure all file paths in the database match the actual paths in storage. The fix 
                    function will attempt to correct common path issues.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EbooksDiagnostic;
