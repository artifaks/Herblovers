import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { herbCategories } from '@/data/herbs';
import { toast } from 'sonner';
import AdminBulkImport from './AdminBulkImport';
import { addHerb } from '@/lib/herb-service';

const AdminDashboard: React.FC = () => {
  const [newHerb, setNewHerb] = useState({
    id: '',
    name: '',
    scientificName: '',
    category: '',
    description: '',
    benefits: [''],
    usage: '',
    cautions: '',
    preparations: [{ type: '', description: '', dosage: '', steps: [''] }],
    origin: '',
    parts: [''],
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewHerb(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setNewHerb(prev => ({ ...prev, category: value }));
  };

  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...newHerb.benefits];
    updatedBenefits[index] = value;
    setNewHerb(prev => ({ ...prev, benefits: updatedBenefits }));
  };

  const addBenefit = () => {
    setNewHerb(prev => ({ ...prev, benefits: [...prev.benefits, ''] }));
  };

  const removeBenefit = (index: number) => {
    const updatedBenefits = newHerb.benefits.filter((_, i) => i !== index);
    setNewHerb(prev => ({ ...prev, benefits: updatedBenefits }));
  };

  const handlePartChange = (index: number, value: string) => {
    const updatedParts = [...newHerb.parts];
    updatedParts[index] = value;
    setNewHerb(prev => ({ ...prev, parts: updatedParts }));
  };

  const addPart = () => {
    setNewHerb(prev => ({ ...prev, parts: [...prev.parts, ''] }));
  };

  const removePart = (index: number) => {
    const updatedParts = newHerb.parts.filter((_, i) => i !== index);
    setNewHerb(prev => ({ ...prev, parts: updatedParts }));
  };

  const handlePreparationChange = (index: number, field: string, value: string) => {
    const updatedPreparations = [...newHerb.preparations];
    updatedPreparations[index] = { ...updatedPreparations[index], [field]: value };
    setNewHerb(prev => ({ ...prev, preparations: updatedPreparations }));
  };

  const handlePreparationStepChange = (prepIndex: number, stepIndex: number, value: string) => {
    const updatedPreparations = [...newHerb.preparations];
    const updatedSteps = [...(updatedPreparations[prepIndex].steps || [''])];
    updatedSteps[stepIndex] = value;
    updatedPreparations[prepIndex] = { ...updatedPreparations[prepIndex], steps: updatedSteps };
    setNewHerb(prev => ({ ...prev, preparations: updatedPreparations }));
  };

  const addPreparation = () => {
    setNewHerb(prev => ({
      ...prev,
      preparations: [...prev.preparations, { type: '', description: '', dosage: '', steps: [''] }]
    }));
  };

  const removePreparation = (index: number) => {
    const updatedPreparations = newHerb.preparations.filter((_, i) => i !== index);
    setNewHerb(prev => ({ ...prev, preparations: updatedPreparations }));
  };

  const addPreparationStep = (prepIndex: number) => {
    const updatedPreparations = [...newHerb.preparations];
    const updatedSteps = [...(updatedPreparations[prepIndex].steps || []), ''];
    updatedPreparations[prepIndex] = { ...updatedPreparations[prepIndex], steps: updatedSteps };
    setNewHerb(prev => ({ ...prev, preparations: updatedPreparations }));
  };

  const removePreparationStep = (prepIndex: number, stepIndex: number) => {
    const updatedPreparations = [...newHerb.preparations];
    const updatedSteps = (updatedPreparations[prepIndex].steps || []).filter((_, i) => i !== stepIndex);
    updatedPreparations[prepIndex] = { ...updatedPreparations[prepIndex], steps: updatedSteps };
    setNewHerb(prev => ({ ...prev, preparations: updatedPreparations }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newHerb.name || !newHerb.scientificName || !newHerb.category || !newHerb.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Generate ID if empty
    let herbToSave = { ...newHerb };
    if (!herbToSave.id) {
      const id = `${newHerb.name.toLowerCase().replace(/\s+/g, '-')}-${newHerb.category}`;
      herbToSave = { ...herbToSave, id };
      setNewHerb(herbToSave);
    }

    // Show loading toast
    const loadingToast = toast.loading(`Adding herb "${herbToSave.name}"...`);
    
    try {
      // Save the herb to Supabase
      const { success, error } = await addHerb(herbToSave);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (success) {
        // Show success message
        toast.success(`Herb "${herbToSave.name}" added successfully!`);
        
        // Reset form
        setNewHerb({
          id: '',
          name: '',
          scientificName: '',
          category: '',
          description: '',
          benefits: [''],
          usage: '',
          cautions: '',
          preparations: [{ type: '', description: '', dosage: '', steps: [''] }],
          origin: '',
          parts: [''],
          image: '',
        });
      } else {
        toast.error(`Failed to add herb: ${error}`);
      }
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      console.error('Error adding herb:', error);
      toast.error(`Failed to add herb: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Bulk import functionality is now handled by the AdminBulkImport component

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="add-herb" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add-herb">Add New Herb</TabsTrigger>
            <TabsTrigger value="bulk-import">Bulk Import</TabsTrigger>
          </TabsList>
          
          <TabsContent value="add-herb">
            <Card>
              <CardHeader>
                <CardTitle>Add New Herb</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Basic Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={newHerb.name}
                          onChange={handleChange}
                          placeholder="e.g., Ashwagandha"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="scientificName" className="text-sm font-medium">
                          Scientific Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="scientificName"
                          name="scientificName"
                          value={newHerb.scientificName}
                          onChange={handleChange}
                          placeholder="e.g., Withania somnifera"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={newHerb.category}
                        onValueChange={handleCategoryChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {herbCategories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="description"
                        name="description"
                        value={newHerb.description}
                        onChange={handleChange}
                        placeholder="Provide a detailed description of the herb..."
                        rows={4}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="usage" className="text-sm font-medium">
                        Usage
                      </label>
                      <Textarea
                        id="usage"
                        name="usage"
                        value={newHerb.usage}
                        onChange={handleChange}
                        placeholder="How is this herb typically used?"
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="cautions" className="text-sm font-medium">
                        Cautions
                      </label>
                      <Textarea
                        id="cautions"
                        name="cautions"
                        value={newHerb.cautions}
                        onChange={handleChange}
                        placeholder="Any warnings or contraindications..."
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="origin" className="text-sm font-medium">
                        Origin
                      </label>
                      <Input
                        id="origin"
                        name="origin"
                        value={newHerb.origin}
                        onChange={handleChange}
                        placeholder="e.g., India"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="image" className="text-sm font-medium">
                        Image URL
                      </label>
                      <Input
                        id="image"
                        name="image"
                        value={newHerb.image}
                        onChange={handleChange}
                        placeholder="URL to an image of the herb"
                      />
                    </div>
                  </div>
                  
                  {/* Benefits */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Benefits</h3>
                      <Button type="button" variant="outline" size="sm" onClick={addBenefit}>
                        Add Benefit
                      </Button>
                    </div>
                    
                    {newHerb.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={benefit}
                          onChange={(e) => handleBenefitChange(index, e.target.value)}
                          placeholder={`Benefit ${index + 1}`}
                        />
                        {newHerb.benefits.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeBenefit(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Plant Parts */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Plant Parts Used</h3>
                      <Button type="button" variant="outline" size="sm" onClick={addPart}>
                        Add Part
                      </Button>
                    </div>
                    
                    {newHerb.parts.map((part, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={part}
                          onChange={(e) => handlePartChange(index, e.target.value)}
                          placeholder={`Part ${index + 1} (e.g., Root, Leaf)`}
                        />
                        {newHerb.parts.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removePart(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Preparations */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Preparations</h3>
                      <Button type="button" variant="outline" size="sm" onClick={addPreparation}>
                        Add Preparation
                      </Button>
                    </div>
                    
                    {newHerb.preparations.map((prep, prepIndex) => (
                      <Card key={prepIndex} className="p-4">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Preparation {prepIndex + 1}</h4>
                            {newHerb.preparations.length > 1 && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removePreparation(prepIndex)}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Type</label>
                              <Input
                                value={prep.type}
                                onChange={(e) => handlePreparationChange(prepIndex, 'type', e.target.value)}
                                placeholder="e.g., Tincture, Tea, Capsule"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Dosage</label>
                              <Input
                                value={prep.dosage || ''}
                                onChange={(e) => handlePreparationChange(prepIndex, 'dosage', e.target.value)}
                                placeholder="e.g., 1-2 tsp, 300-500mg daily"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea
                              value={prep.description}
                              onChange={(e) => handlePreparationChange(prepIndex, 'description', e.target.value)}
                              placeholder="Description of this preparation method..."
                              rows={2}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium">Steps</label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addPreparationStep(prepIndex)}
                              >
                                Add Step
                              </Button>
                            </div>
                            
                            {(prep.steps || []).map((step, stepIndex) => (
                              <div key={stepIndex} className="flex items-center gap-2">
                                <Input
                                  value={step}
                                  onChange={(e) => handlePreparationStepChange(prepIndex, stepIndex, e.target.value)}
                                  placeholder={`Step ${stepIndex + 1}`}
                                />
                                {(prep.steps || []).length > 1 && (
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removePreparationStep(prepIndex, stepIndex)}
                                  >
                                    Remove
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  <Button type="submit" className="w-full">Add Herb</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bulk-import">
            <AdminBulkImport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
