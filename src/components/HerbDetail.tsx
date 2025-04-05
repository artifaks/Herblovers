import React, { useState } from 'react';
import { Herb, BenefitScore, BenefitScoreObject, ComplementaryHerb } from '@/data/herbs';
import SubscriptionGate from './SubscriptionGate';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  ChevronLeft, 
  Leaf, 
  Beaker, 
  BookOpen, 
  Zap, 
  ExternalLink, 
  History,
  TestTube,
  LineChart,
  BarChart4,
  Users,
  Info,
  Droplets,
  Sparkles,
  Star,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  FlaskConical,
  Ruler
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from "@/components/ui/progress";
import PreparationMethodCard from './PreparationMethodCard';

interface HerbDetailProps {
  herb: Herb;
  onBack: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (herbId: string) => void;
}

const HerbDetail: React.FC<HerbDetailProps> = ({
  herb,
  onBack,
  isFavorite = false,
  onToggleFavorite,
}) => {
  // Convert benefitScores to array if it's an object
  const getBenefitScoresArray = (): BenefitScore[] => {
    if (!herb.benefitScores) return [];
    if (Array.isArray(herb.benefitScores)) {
      return herb.benefitScores;
    }
    
    // Convert object format to array format
    return Object.entries(herb.benefitScores as Record<string, number>).map(([category, score]) => ({
      category,
      score: typeof score === 'number' ? score * 10 : score // Convert 0-10 scale to 0-100
    }));
  };

  const [activeTab, setActiveTab] = useState('overview');
  const benefitScores = getBenefitScoresArray();

  // Ensure complementaryHerbs are properly handled
  const complementaryHerbs = herb.complementaryHerbs || [];

  // Find the category color from the category name
  const getCategoryColor = () => {
    // This is a simplified version, in a real app you might want to map this from the category data
    switch (herb.category) {
      case 'heart-health': return '#EF4444';
      case 'digestive-health': return '#10B981';
      case 'mens-health': return '#3B82F6';
      case 'womens-health': return '#EC4899';
      case 'cognitive-health': return '#8B5CF6';
      case 'herbal-teas': return '#059669';
      case 'liver-detox': return '#059669';
      case 'joint-bone-health': return '#0EA5E9';
      case 'respiratory-health': return '#3B82F6';
      case 'skin-health': return '#EC4899';
      default: return '#6B7280';
    }
  };

  const categoryColor = getCategoryColor();
  
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div 
        className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 py-8 px-4 relative"
        style={{ 
          backgroundImage: `radial-gradient(circle at 90% 50%, ${categoryColor}15, transparent 70%)` 
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-start mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            
            {onToggleFavorite && (
              <Badge 
                variant="outline"
                className="flex items-center gap-1 px-3 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => onToggleFavorite(herb.id)}
              >
                <Heart
                  className={cn("h-4 w-4", isFavorite ? "fill-red-500 text-red-500" : "text-gray-400")}
                />
                <span className="text-sm">
                  {isFavorite ? "Saved" : "Save"}
                </span>
              </Badge>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6 mt-4">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
              <Leaf className="w-10 h-10 md:w-14 md:h-14" style={{ color: categoryColor }} />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <Badge 
                className="mb-2 font-normal"
                style={{ backgroundColor: categoryColor, color: 'white' }}
              >
                {herb.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-1">{herb.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 italic">{herb.scientificName}</p>
              
              <p className="mt-3 text-gray-700 dark:text-gray-300 max-w-2xl">
                {herb.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                  <Leaf className="h-4 w-4" />
                  <span>Benefits</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                  <TestTube className="h-4 w-4" />
                  <span>Preparation</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                  <Beaker className="h-4 w-4" />
                  <span>Tincture</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                  <History className="h-4 w-4" />
                  <span>History</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                  <LineChart className="h-4 w-4" />
                  <span>Visualizations</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto max-w-6xl py-6 px-4">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid grid-cols-5 max-w-2xl mx-auto mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="prep">Prep</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="studies">Scientific Studies</TabsTrigger>
            <TabsTrigger value="pairings">Pairings</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Health Benefits */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Health Benefits</span>
                </h2>
                
                <ul className="space-y-3">
                  {herb.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Benefits Visualization */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BarChart4 className="h-5 w-5 text-blue-500" />
                  <span>Benefits Visualization</span>
                </h2>
                
                <div className="space-y-4">
                  {benefitScores.map((score, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{score.category}</span>
                        <span>{score.score}%</span>
                      </div>
                      <Progress value={score.score} className="h-2 w-full" 
                        style={{ 
                          '--theme-primary': categoryColor
                        } as React.CSSProperties} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Usage Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Usage</h2>
              <p className="text-gray-700 dark:text-gray-300">{herb.usage}</p>
              
              {herb.cautions && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-amber-600">Cautions</h3>
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
                    <p className="text-amber-800 dark:text-amber-300">
                      {Array.isArray(herb.cautions) ? herb.cautions.join(", ") : herb.cautions}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Preparation Methods Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Beaker className="h-5 w-5 text-blue-500" />
                <span>Preparation Methods</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {herb.preparations.map((prep, index) => (
                  <PreparationMethodCard 
                    key={index} 
                    preparation={prep} 
                    color={categoryColor}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Preparation Tab */}
          <TabsContent value="prep" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Beaker className="h-5 w-5 text-purple-500" />
                <span>Preparation Methods</span>
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                {herb.preparations.map((prep, index) => (
                  <PreparationMethodCard 
                    key={index} 
                    preparation={prep} 
                    color={categoryColor}
                  />
                ))}
              </div>
              
              {herb.detailedPreparations && herb.detailedPreparations.length > 0 && (
                <SubscriptionGate 
                  feature="detailed_preparations"
                  title="Advanced Preparation Methods"
                  description="Unlock detailed preparation instructions with step-by-step guides for this herb."
                >
                  <div className="mt-10">
                    <div className="flex items-center gap-2 mb-6">
                      <FlaskConical className="h-5 w-5 text-emerald-500" />
                      <h3 className="text-lg font-medium">Advanced Preparation Methods</h3>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      {herb.detailedPreparations.map((prep, index) => (
                      <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 border-b flex items-center gap-3"
                             style={{ borderColor: prep.color || categoryColor }}>
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${prep.color || categoryColor}15` }}
                          >
                            <FlaskConical className="h-5 w-5" style={{ color: prep.color || categoryColor }} />
                          </div>
                          <div>
                            <h3 className="font-medium">{prep.type || prep.name}</h3>
                          </div>
                        </div>
                        
                        <CardContent className="pt-5">
                          <p className="text-gray-600 dark:text-gray-300 mb-4">{prep.description}</p>
                          
                          {prep.details && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{prep.details}</p>
                          )}
                          
                          {/* Ingredients Section */}
                          {prep.ingredients && prep.ingredients.length > 0 && (
                            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="flex items-center gap-2 mb-3">
                                <Leaf className="h-4 w-4 text-green-500" />
                                <h4 className="text-sm font-medium">Ingredients</h4>
                              </div>
                              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                {prep.ingredients.map((ingredient, idx) => (
                                  <li key={idx} className="ml-1">{ingredient}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {/* Dosage Information */}
                          {prep.dosage && (
                            <div className="flex items-start gap-2 my-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                              <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                              <div>
                                <span className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Dosage</span>
                                <p className="text-sm">{prep.dosage}</p>
                              </div>
                            </div>
                          )}
                          
                          {/* Preparation Steps */}
                          {(prep.steps || prep.instructions) && (
                            <div className="mt-4">
                              <div className="flex items-center gap-2 mb-3">
                                <CheckCircle2 className="h-5 w-5 text-gray-500" />
                                <h4 className="text-sm font-medium">Preparation Steps</h4>
                              </div>
                              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                                {(prep.steps || prep.instructions).map((step, stepIndex) => (
                                  <li key={stepIndex} className="pb-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                                    <span className="ml-2">{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          )}
                          
                          {/* Notes Section */}
                          {(prep.notes || prep.additionalNotes) && (
                            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-md">
                              <div className="flex items-start gap-3">
                                <Info className="h-4 w-4 text-amber-500 mt-0.5" />
                                <div className="text-xs text-amber-700 dark:text-amber-300">
                                  <span className="font-medium">Note:</span> {prep.notes || prep.additionalNotes}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Preparation Time */}
                          {prep.preparationTime && (
                            <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="h-3.5 w-3.5" />
                              <span>Preparation time: {prep.preparationTime}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <History className="h-5 w-5 text-amber-500" />
                <span>Historical Use</span>
              </h2>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Historical information about {herb.name} would be displayed here, including traditional uses across different cultures and time periods.
              </p>
              
              <div className="border-l-4 border-amber-500 pl-4 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-r-lg">
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "{herb.name} has been used in traditional medicine systems for centuries, valued for its {herb.benefits[0].toLowerCase()} properties."
                </p>
              </div>
            </div>
          </TabsContent>
          
          {/* Scientific Studies Tab */}
          <TabsContent value="studies" className="space-y-6">
            <SubscriptionGate 
              feature="scientific_research"
              title="Scientific Research"
              description="Unlock access to peer-reviewed studies and scientific research about this herb."
            >
              {herb.scientificResearch && herb.scientificResearch.length > 0 ? (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <TestTube className="h-5 w-5 text-blue-500" />
                    <span>Scientific Research</span>
                  </h2>
                  
                  <div className="space-y-6">
                    {herb.scientificResearch.map((study, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></span>
                        <span>{study.title}: {study.summary}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
                  <p className="text-gray-500 dark:text-gray-400">No scientific studies available for this herb.</p>
                </div>
              )}
            </SubscriptionGate>
          </TabsContent>
          
          {/* Pairings Tab */}
          <TabsContent value="pairings" className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span>Synergistic Herb Pairings</span>
              </h2>
              
              <h3 className="text-lg font-medium mb-3">Recommended Herb Pairings</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Herbs that work synergistically with {herb.name}
              </p>
              
              {herb.complementaryHerbs && herb.complementaryHerbs.length > 0 ? (
                <div className="space-y-4">
                  {herb.complementaryHerbs.map((complementary, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{complementary.name} + {herb.name}</h4>
                          </div>
                          {complementary.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{complementary.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">No recommended pairings available for this herb.</p>
                </div>
              )}

              <h3 className="text-lg font-medium mt-8 mb-3">Other Herbs You Might Like</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Ginger</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Similar warming properties</p>
                  </div>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Hawthorn</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Supports cardiovascular health</p>
                  </div>
                </div>
              </div>
            </div>

            {/* External Resources */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">External Resources</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href={`https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(herb.scientificName)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div>
                    <p className="font-medium">PubMed Research</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Scientific articles</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
                
                <a href={`https://plants.usda.gov/home/basicSearch?text=${encodeURIComponent(herb.scientificName)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div>
                    <p className="font-medium">USDA Plant Database</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Botanical information</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
                
                <a href={`https://examine.com/search/?q=${encodeURIComponent(herb.name)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div>
                    <p className="font-medium">Examine.com</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Evidence-based analysis</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
              </div>
              
              <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="pt-1">
                    <Users className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-800 dark:text-amber-300">Disclaimer</h3>
                    <p className="text-sm text-amber-700 dark:text-amber-200 mt-1">
                      The information provided is for educational purposes only. 
                      Always consult with a healthcare professional before starting any herbal regimen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HerbDetail;
