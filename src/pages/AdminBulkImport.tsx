import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { additionalHerbs } from '@/data/additional-herbs';
import { Herb } from '@/data/herbs';
import { addHerb, getAllHerbs } from '@/lib/herb-service';

const AdminBulkImport: React.FC = () => {
  const [importing, setImporting] = useState(false);
  const [importedHerbs, setImportedHerbs] = useState<string[]>([]);
  const [existingHerbs, setExistingHerbs] = useState<Herb[]>([]);

  // Fetch existing herbs on component mount
  useEffect(() => {
    const fetchHerbs = async () => {
      const { herbs, error } = await getAllHerbs();
      if (error) {
        toast.error(`Error fetching herbs: ${error}`);
      } else {
        setExistingHerbs(herbs);
        
        // Mark herbs that already exist in the database as imported
        const existingHerbNames = herbs.map(h => h.name);
        setImportedHerbs(existingHerbNames);
      }
    };
    
    fetchHerbs();
  }, []);

  const handleImportHerb = async (herb: Herb) => {
    try {
      // Check if herb already exists in our local state
      if (existingHerbs.some(h => h.id === herb.id)) {
        toast.info(`Herb "${herb.name}" already exists in the database.`);
        return false;
      }
      
      // Save the herb to Supabase
      const { success, error } = await addHerb(herb);
      
      if (success) {
        // Add the herb to our local state
        setExistingHerbs(prev => [...prev, herb]);
        
        // Add the herb name to the list of imported herbs
        setImportedHerbs(prev => [...prev, herb.name]);
        
        // Show success message
        toast.success(`Herb "${herb.name}" imported successfully!`);
        
        return true;
      } else {
        toast.error(`Failed to import herb "${herb.name}": ${error}`);
        return false;
      }
    } catch (error) {
      console.error('Error importing herb:', error);
      toast.error(`Failed to import herb "${herb.name}": ${error instanceof Error ? error.message : 'Unknown error'}`);
      return false;
    }
  };

  const handleImportAll = async () => {
    setImporting(true);
    setImportedHerbs([]);
    
    let successCount = 0;
    
    for (const herb of additionalHerbs) {
      const success = await handleImportHerb(herb);
      if (success) {
        successCount++;
      }
      // Add a small delay to avoid overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    toast.success(`Imported ${successCount} of ${additionalHerbs.length} herbs successfully!`);
    setImporting(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Import Herbs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This tool allows you to import multiple pre-defined herbs at once. 
              There are {additionalHerbs.length} herbs available for import.
            </p>
            
            <Button 
              onClick={handleImportAll} 
              disabled={importing}
              className="w-full md:w-auto"
            >
              {importing ? 'Importing...' : 'Import All Herbs'}
            </Button>
            
            {importedHerbs.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Imported Herbs:</h3>
                <ul className="text-sm space-y-1 max-h-60 overflow-y-auto border rounded-md p-3">
                  {importedHerbs.map((herbName, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> {herbName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Herbs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The following herbs are available for import:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {additionalHerbs.map((herb) => (
                <Card key={herb.id} className="overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    {herb.image && (
                      <img 
                        src={herb.image} 
                        alt={herb.name} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg">{herb.name}</h3>
                    <p className="text-sm italic text-muted-foreground mb-2">
                      {herb.scientificName}
                    </p>
                    <p className="text-sm line-clamp-3 mb-3">
                      {herb.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => handleImportHerb(herb)}
                      disabled={importing || importedHerbs.includes(herb.name)}
                    >
                      {importedHerbs.includes(herb.name) ? 'Imported' : 'Import Herb'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBulkImport;
