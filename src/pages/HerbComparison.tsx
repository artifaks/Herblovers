import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { herbCategories } from '@/data/herbs';
import { Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Get all herbs from all categories
const allHerbs = herbCategories.flatMap(category => category.herbs);

const HerbComparison: React.FC = () => {
  const [selectedHerbs, setSelectedHerbs] = useState<string[]>([]);
  const maxComparisons = 3; // Maximum number of herbs to compare at once

  const handleHerbSelect = (herbId: string) => {
    if (selectedHerbs.includes(herbId)) {
      // Remove herb if already selected
      setSelectedHerbs(selectedHerbs.filter(id => id !== herbId));
    } else if (selectedHerbs.length < maxComparisons) {
      // Add herb if not at max
      setSelectedHerbs([...selectedHerbs, herbId]);
    }
  };

  const handleClearAll = () => {
    setSelectedHerbs([]);
  };

  // Get full herb objects for the selected herbs
  const herbsToCompare = selectedHerbs.map(id => 
    allHerbs.find(herb => herb.id === id)
  ).filter(herb => herb !== undefined);

  // Get all unique benefit categories from the selected herbs
  const allBenefitCategories = new Set<string>();
  herbsToCompare.forEach(herb => {
    if (herb?.benefitScores && Array.isArray(herb.benefitScores)) {
      herb.benefitScores.forEach(benefit => {
        allBenefitCategories.add(benefit.category);
      });
    }
  });

  // Get all unique preparation types from the selected herbs
  const allPreparationTypes = new Set<string>();
  herbsToCompare.forEach(herb => {
    herb?.preparations.forEach(prep => {
      allPreparationTypes.add(prep.type);
    });
  });

  // Helper function to get benefit score for a specific category
  const getBenefitScore = (herb: any, category: string) => {
    if (!herb?.benefitScores) return null;
    
    if (Array.isArray(herb.benefitScores)) {
      const benefit = herb.benefitScores.find(b => b.category === category);
      return benefit ? benefit.score : null;
    }
    
    return null;
  };

  // Helper function to check if herb has a specific preparation type
  const hasPreparationType = (herb: any, type: string) => {
    return herb?.preparations.some(prep => prep.type === type) || false;
  };

  // Helper function to get preparation details for a specific type
  const getPreparationDetails = (herb: any, type: string) => {
    if (!herb) return null;
    return herb.preparations.find(prep => prep.type === type);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Herb Comparison</h1>
        
        {/* Herb Selection */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Select Herbs to Compare (Max {maxComparisons})</h2>
              <Button variant="outline" onClick={handleClearAll}>Clear All</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: maxComparisons }).map((_, index) => (
                <div key={index} className="w-full">
                  <Select
                    value={selectedHerbs[index] || ""}
                    onValueChange={(value) => {
                      if (value) {
                        const newSelected = [...selectedHerbs];
                        if (index < newSelected.length) {
                          newSelected[index] = value;
                        } else {
                          newSelected.push(value);
                        }
                        setSelectedHerbs(newSelected);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Select Herb ${index + 1}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {herbCategories.map(category => (
                        <React.Fragment key={category.id}>
                          <div className="px-2 py-1.5 text-sm font-semibold bg-muted">
                            {category.name}
                          </div>
                          {category.herbs.map(herb => (
                            <SelectItem 
                              key={herb.id} 
                              value={herb.id}
                              disabled={selectedHerbs.includes(herb.id) && selectedHerbs.indexOf(herb.id) !== index}
                            >
                              {herb.name}
                            </SelectItem>
                          ))}
                        </React.Fragment>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Comparison Results */}
        {selectedHerbs.length > 0 ? (
          <div className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/4">Property</TableHead>
                        {herbsToCompare.map((herb, index) => (
                          <TableHead key={index}>
                            {herb?.name || `Herb ${index + 1}`}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Scientific Name</TableCell>
                        {herbsToCompare.map((herb, index) => (
                          <TableCell key={index} className="italic">
                            {herb?.scientificName || '-'}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Category</TableCell>
                        {herbsToCompare.map((herb, index) => (
                          <TableCell key={index}>
                            {herb ? (
                              <Badge 
                                style={{ 
                                  backgroundColor: herbCategories.find(c => c.id === herb.category)?.color || '#888',
                                  color: 'white'
                                }}
                              >
                                {herbCategories.find(c => c.id === herb.category)?.name || herb.category}
                              </Badge>
                            ) : '-'}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Origin</TableCell>
                        {herbsToCompare.map((herb, index) => (
                          <TableCell key={index}>
                            {herb?.origin || '-'}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Parts Used</TableCell>
                        {herbsToCompare.map((herb, index) => (
                          <TableCell key={index}>
                            {herb?.parts ? herb.parts.join(', ') : '-'}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            {/* Benefits */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/4">Benefit</TableHead>
                        {herbsToCompare.map((herb, index) => (
                          <TableHead key={index}>
                            {herb?.name || `Herb ${index + 1}`}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from(allBenefitCategories).map((category) => (
                        <TableRow key={category}>
                          <TableCell className="font-medium">{category}</TableCell>
                          {herbsToCompare.map((herb, index) => {
                            const score = getBenefitScore(herb, category);
                            return (
                              <TableCell key={index}>
                                {score !== null ? (
                                  <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                      <div 
                                        className="bg-primary h-2.5 rounded-full" 
                                        style={{ width: `${score}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-sm">{score}%</span>
                                  </div>
                                ) : '-'}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                      
                      <TableRow>
                        <TableCell className="font-medium">All Benefits</TableCell>
                        {herbsToCompare.map((herb, index) => (
                          <TableCell key={index}>
                            {herb?.benefits ? (
                              <ul className="list-disc list-inside text-sm">
                                {herb.benefits.map((benefit, i) => (
                                  <li key={i}>{benefit}</li>
                                ))}
                              </ul>
                            ) : '-'}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            {/* Preparations */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Preparation Methods</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/4">Preparation</TableHead>
                        {herbsToCompare.map((herb, index) => (
                          <TableHead key={index}>
                            {herb?.name || `Herb ${index + 1}`}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from(allPreparationTypes).map((type) => (
                        <TableRow key={type}>
                          <TableCell className="font-medium">{type}</TableCell>
                          {herbsToCompare.map((herb, index) => (
                            <TableCell key={index}>
                              {hasPreparationType(herb, type) ? (
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center text-green-500">
                                    <Check className="h-4 w-4 mr-1" /> Available
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {getPreparationDetails(herb, type)?.dosage || ''}
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center text-red-500">
                                  <X className="h-4 w-4 mr-1" /> Not available
                                </div>
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            {/* Safety Information */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Safety Information</h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/4">Safety Aspect</TableHead>
                        {herbsToCompare.map((herb, index) => (
                          <TableHead key={index}>
                            {herb?.name || `Herb ${index + 1}`}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Cautions</TableCell>
                        {herbsToCompare.map((herb, index) => (
                          <TableCell key={index}>
                            {herb?.cautions ? (
                              Array.isArray(herb.cautions) ? (
                                <ul className="list-disc list-inside text-sm">
                                  {herb.cautions.map((caution, i) => (
                                    <li key={i}>{caution}</li>
                                  ))}
                                </ul>
                              ) : herb.cautions
                            ) : 'No known cautions'}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Safety Rating</TableCell>
                        {herbsToCompare.map((herb, index) => (
                          <TableCell key={index}>
                            {herb?.safetyProfile?.safetyRating || 'Not rated'}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Pregnancy Safe</TableCell>
                        {herbsToCompare.map((herb, index) => (
                          <TableCell key={index}>
                            {herb?.safetyProfile?.pregnancySafe !== undefined ? (
                              herb.safetyProfile.pregnancySafe ? (
                                <div className="flex items-center text-green-500">
                                  <Check className="h-4 w-4 mr-1" /> Yes
                                </div>
                              ) : (
                                <div className="flex items-center text-red-500">
                                  <X className="h-4 w-4 mr-1" /> No
                                </div>
                              )
                            ) : (
                              'Unknown'
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
              Select herbs to compare their properties
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              You can compare up to {maxComparisons} herbs at once
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HerbComparison;
