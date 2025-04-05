
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Herb, herbCategories } from '@/data/herbs';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Heart, Beaker, Leaf, BookOpen, AlertTriangle, History } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getFavorites, toggleFavorite } from '@/lib/favorites';
import { useToast } from '@/hooks/use-toast';
import HerbDetailVisualization from '@/components/HerbDetailVisualization';
import PreparationMethodCard from '@/components/PreparationMethodCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { HerbSkeleton } from '@/components/HerbSkeleton';

const HerbDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [activeTab, setActiveTab] = React.useState<string>('overview');
  const [loading, setLoading] = React.useState<boolean>(true);

  // Find the herb from all categories
  const herb = React.useMemo(() => {
    for (const category of herbCategories) {
      const foundHerb = category.herbs.find(h => h.id === id);
      if (foundHerb) {
        return { ...foundHerb, categoryColor: category.color };
      }
    }
    return null;
  }, [id]);

  // Simulate loading
  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  // Load favorites
  React.useEffect(() => {
    // Set favorites directly from localStorage
    setFavorites(getFavorites());
  }, []);

  const handleToggleFavorite = () => {
    if (!herb) return;
    
    const newFavorites = toggleFavorite(herb.id);
    setFavorites(newFavorites);
    
    toast({
      title: newFavorites.includes(herb.id) 
        ? `${herb.name} added to favorites` 
        : `${herb.name} removed from favorites`,
      duration: 2000,
    });
  };

  // Convert benefitScores to array if it's an object
  const getBenefitScoresArray = (herb: Herb | null) => {
    if (!herb || !herb.benefitScores) return [];
    if (Array.isArray(herb.benefitScores)) {
      return herb.benefitScores;
    }
    
    // Convert object format to array format with proper type casting
    return Object.entries(herb.benefitScores).map(([category, score]) => ({
      category,
      score: typeof score === 'number' ? score : Number(score) // Ensure score is a number
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <div className="container mx-auto py-12 px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="animate-pulse">
            <div className="h-8 w-1/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-5/6"></div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="col-span-1">
                <HerbSkeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!herb) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <div className="container mx-auto py-12 px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Herb Not Found</h1>
            <p>The herb you're looking for doesn't exist in our database.</p>
          </div>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(herb.id);
  const categoryColor = (herb as any).categoryColor || '#6b7280';
  // Use the helper function to ensure we always have a BenefitScore[] here
  const benefitScoresArray = getBenefitScoresArray(herb);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      
      {/* Hero Section */}
      <div 
        className="bg-white dark:bg-gray-800 shadow-sm"
        style={{ 
          backgroundImage: `radial-gradient(circle at 90% 50%, ${categoryColor}15, transparent 70%)` 
        }}
      >
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="flex items-center"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Herbs
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "flex items-center gap-1.5",
                isFavorite && "border-red-200 bg-red-50 hover:bg-red-100 hover:text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:hover:bg-red-900/30"
              )}
              onClick={handleToggleFavorite}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isFavorite && "fill-red-500 text-red-500"
                )}
              />
              <span>{isFavorite ? "Saved" : "Save Herb"}</span>
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <Badge 
                className="mb-2"
                style={{ backgroundColor: categoryColor }}
              >
                {herb.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Badge>
              
              <h1 className="text-3xl font-bold mb-2">{herb.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 italic mb-4">{herb.scientificName}</p>
              
              <p className="mb-6">{herb.description}</p>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Key Benefits</h2>
                <div className="flex flex-wrap gap-2">
                  {herb.benefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary">{benefit}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">How It's Used</h2>
                <p>{herb.usage}</p>
              </div>
              
              {herb.origin && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-3">Origin & History</h2>
                  <p>{herb.origin}</p>
                </div>
              )}
            </div>
            
            <div className="w-full md:w-1/3">
              <HerbDetailVisualization 
                benefitScores={benefitScoresArray}
                complementaryHerbs={herb.complementaryHerbs || []}
                cautions={herb.cautions || []}
                categoryColor={categoryColor}
                detailedPreparations={herb.detailedPreparations || []}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs Section */}
      <div className="container mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 max-w-md mx-auto mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="preparations">Preparations</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="safety">Safety</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Plant Information */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    <span>Plant Information</span>
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    {herb.parts && (
                      <div>
                        <span className="font-medium">Parts Used:</span> {herb.parts.join(', ')}
                      </div>
                    )}
                    
                    {herb.harvestSeason && (
                      <div>
                        <span className="font-medium">Harvest Season:</span> {herb.harvestSeason}
                      </div>
                    )}
                    
                    {herb.growingInfo && (
                      <div>
                        <span className="font-medium">Growing Information:</span> {herb.growingInfo}
                      </div>
                    )}
                    
                    {herb.sustainabilityInfo && (
                      <div>
                        <span className="font-medium">Sustainability:</span> {herb.sustainabilityInfo}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Traditional Uses */}
              {herb.traditionalUses && herb.traditionalUses.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <History className="h-5 w-5 text-amber-600" />
                      <span>Traditional Uses</span>
                    </h3>
                    
                    <ul className="space-y-2 text-sm">
                      {herb.traditionalUses.map((use, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2"></span>
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              
              {/* Active Constituents */}
              {herb.constituents && herb.constituents.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Beaker className="h-5 w-5 text-purple-600" />
                      <span>Active Constituents</span>
                    </h3>
                    
                    <ul className="space-y-2 text-sm">
                      {herb.constituents.map((constituent, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500 mt-2"></span>
                          <span>{constituent}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          {/* Preparations Tab */}
          <TabsContent value="preparations" className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Preparation Methods</h2>
            
            {herb.detailedPreparations && herb.detailedPreparations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {herb.detailedPreparations.map((prep, index) => (
                  <PreparationMethodCard key={index} preparation={prep} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {herb.preparations.map((prep, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-2">{prep.type}</h3>
                    <p className="mb-2 text-gray-700 dark:text-gray-300">{prep.description}</p>
                    {prep.dosage && (
                      <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="font-medium">Dosage:</span> {prep.dosage}
                      </div>
                    )}
                    {prep.steps && prep.steps.length > 0 && (
                      <div className="mt-3">
                        <h4 className="font-medium mb-1">Steps:</h4>
                        <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
                          {prep.steps.map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Research Tab */}
          <TabsContent value="research" className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              <span>Scientific Research</span>
            </h2>
            
            {herb.scientificResearch && herb.scientificResearch.length > 0 ? (
              <div className="space-y-4">
                {herb.scientificResearch.map((research, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="font-medium text-lg mb-2">{research.title}</h3>
                      {research.year && <p className="text-sm text-gray-500 mb-3">{research.year}</p>}
                      <p className="text-gray-700 dark:text-gray-300">{research.summary}</p>
                      {research.link && (
                        <a 
                          href={research.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-4 inline-block text-blue-600 hover:underline text-sm"
                        >
                          Read more about this research
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-md">
                <p className="text-gray-500">No scientific research available for this herb.</p>
                <p className="text-sm mt-2">Want to learn more? Check out reputable herbal databases or speak with a herbalist.</p>
              </div>
            )}
          </TabsContent>
          
          {/* Safety Tab */}
          <TabsContent value="safety" className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              <span>Safety Information</span>
            </h2>
            
            {herb.safetyProfile ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {herb.safetyProfile.safetyRating && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-medium mb-3">Safety Rating</h3>
                      <Badge 
                        className={cn(
                          getSafetyRatingColor(herb.safetyProfile.safetyRating)
                        )}
                      >
                        {herb.safetyProfile.safetyRating}
                      </Badge>
                    </CardContent>
                  </Card>
                )}
                
                {herb.safetyProfile.sideEffects && herb.safetyProfile.sideEffects.length > 0 && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-medium mb-3">Potential Side Effects</h3>
                      <ul className="space-y-2">
                        {herb.safetyProfile.sideEffects.map((effect, index) => (
                          <li key={index} className="flex gap-2 text-gray-700 dark:text-gray-300">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2"></span>
                            <span>{effect}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                
                {herb.safetyProfile.drugInteractions && herb.safetyProfile.drugInteractions.length > 0 && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-medium mb-3">Drug Interactions</h3>
                      <ul className="space-y-2">
                        {herb.safetyProfile.drugInteractions.map((interaction, index) => (
                          <li key={index} className="flex gap-2 text-gray-700 dark:text-gray-300">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></span>
                            <span>{interaction}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                
                {(herb.safetyProfile.pregnancySafety || herb.safetyProfile.childrenSafety) && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-medium mb-3">Special Populations</h3>
                      
                      {herb.safetyProfile.pregnancySafety && (
                        <div className="mb-3">
                          <h4 className="text-sm font-medium">Pregnancy & Breastfeeding:</h4>
                          <p className="text-gray-700 dark:text-gray-300">{herb.safetyProfile.pregnancySafety}</p>
                        </div>
                      )}
                      
                      {herb.safetyProfile.childrenSafety && (
                        <div>
                          <h4 className="text-sm font-medium">Children:</h4>
                          <p className="text-gray-700 dark:text-gray-300">{herb.safetyProfile.childrenSafety}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div>
                {herb.cautions ? (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-medium mb-3">Cautions</h3>
                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                        {Array.isArray(herb.cautions) ? (
                          <ul className="space-y-2">
                            {herb.cautions.map((caution, index) => (
                              <li key={index} className="flex gap-2 text-amber-800 dark:text-amber-200">
                                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2"></span>
                                <span>{caution}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-amber-800 dark:text-amber-200">{herb.cautions}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <p className="text-gray-500">No detailed safety information available for this herb.</p>
                    <p className="text-sm mt-2">Always consult with a healthcare professional before using herbs medicinally.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Disclaimer */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mt-8">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Disclaimer: This information is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease. 
                Always consult with a qualified healthcare practitioner before using any herbal remedy, especially if you are pregnant, nursing, have a medical condition, or are taking medications.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Helper function to get color for safety rating
const getSafetyRatingColor = (rating: string): string => {
  switch (rating) {
    case 'Safe':
      return 'bg-green-500 hover:bg-green-600';
    case 'Generally Safe':
      return 'bg-blue-500 hover:bg-blue-600';
    case 'Use with Caution':
      return 'bg-amber-500 hover:bg-amber-600';
    case 'Consult Professional':
      return 'bg-red-500 hover:bg-red-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

export default HerbDetailPage;
