import React, { useState } from 'react';
import { Herb } from '@/data/herbs';
import { CheckCircle, AlertCircle, ChevronDown, ChevronUp, Link, Droplet, Pill, PieChart, TestTube, Leaf, RotateCcw, Info, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Add the missing interface
interface BenefitScore {
  category: string;
  score: number;
}

interface HerbItemProps {
  herb: Herb;
  categoryColor: string;
  isStandalone?: boolean;
  onClick?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (herbId: string) => void;
  viewType?: 'grid' | 'list';
}

interface BenefitScoreObject {
  [key: string]: number;
}

const HerbItem: React.FC<HerbItemProps> = ({ 
  herb, 
  categoryColor, 
  isStandalone = false, 
  onClick,
  isFavorite = false,
  onToggleFavorite,
  viewType = 'grid'
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get 1-2 quick benefits to display as tags
  const quickBenefits = herb.benefits.slice(0, 2);

  // Helper function to create color with opacity
  const getColorWithOpacity = (color: string, opacity: number) => {
    // Convert hex to RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // Helper functions for visualization - updated with more vibrant colors
  const getBenefitScoreColor = (score: number): string => {
    if (score >= 80) return 'bg-rose-500';
    if (score >= 60) return 'bg-amber-500'; 
    if (score >= 40) return 'bg-emerald-500';
    return 'bg-blue-500';
  };

  const getPreparationBackgroundColor = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'tincture': return 'bg-purple-100 border border-purple-300';
      case 'capsules': return 'bg-blue-100 border border-blue-300';
      case 'powder': return 'bg-slate-100 border border-slate-300';
      case 'decoction': return 'bg-green-100 border border-green-300';
      case 'infusion': return 'bg-amber-100 border border-amber-300';
      case 'tea': return 'bg-emerald-100 border border-emerald-300';
      case 'traditional soups': return 'bg-indigo-100 border border-indigo-300';
      default: return 'bg-gray-100 border border-gray-300';
    }
  };

  const getPreparationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'tincture': return <Droplet className="h-4 w-4 text-purple-600" />;
      case 'capsules': return <Pill className="h-4 w-4 text-blue-600" />;
      case 'powder': return <PieChart className="h-4 w-4 text-slate-600" />;
      case 'infusion': return <TestTube className="h-4 w-4 text-amber-600" />;
      case 'tea': return <Leaf className="h-4 w-4 text-emerald-600" />;
      case 'decoction': return <Droplet className="h-4 w-4 text-green-600" />;
      case 'traditional soups': return <Droplet className="h-4 w-4 text-indigo-600" />;
      default: return <Droplet className="h-4 w-4 text-gray-600" />;
    }
  };

  // Convert benefitScores to array format if it's an object
  const getBenefitScoresArray = (): BenefitScore[] => {
    if (!herb.benefitScores) return [];
    if (Array.isArray(herb.benefitScores)) {
      return herb.benefitScores;
    }
    // Convert object format to array format
    return Object.entries(herb.benefitScores as BenefitScoreObject).map(([category, score]) => ({
      category,
      score: typeof score === 'number' ? score * 10 : score // Convert 0-10 scale to 0-100
    }));
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(herb.id);
    }
  };

  // Modified onClick handler to ensure it's used
  const handleItemClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (viewType === 'list') {
    return (
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-all cursor-pointer border-l-4"
        style={{borderLeftColor: categoryColor}}
        onClick={handleItemClick}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{herb.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-2">{herb.scientificName}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {quickBenefits.map((benefit, index) => (
                <Badge
                  key={`${herb.id}-benefit-${index}`}
                  variant="secondary"
                  className="text-xs"
                >
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteClick}
              className="h-8 w-8"
            >
              <Heart 
                className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-gray-400")} 
              />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative h-[300px] w-full cursor-pointer" 
      onClick={handleItemClick}
    >
      <div 
        className={cn(
          "absolute inset-0 w-full h-full transition-all duration-500",
          "transform-gpu",
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div 
          className={cn(
            "absolute inset-0 w-full h-full bg-white rounded-lg shadow-md p-4",
            "backface-hidden"
          )}
          style={{
            borderColor: getColorWithOpacity(categoryColor, isHovered ? 0.5 : 0.3),
            backgroundColor: getColorWithOpacity(categoryColor, isHovered ? 0.15 : 0.1),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-semibold">{herb.name}</h4>
              <p className="text-sm text-gray-600 italic">{herb.scientificName}</p>
            </div>
            <div className="flex gap-2">
              {onToggleFavorite && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={handleFavoriteClick}
                >
                  <Heart 
                    className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-gray-400")} 
                  />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(true);
                }}
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <h5 className="font-medium mb-2">Key Benefits</h5>
            <div className="flex flex-wrap gap-2">
              {quickBenefits.map((benefit, index) => (
                <Badge
                  key={`${herb.id}-benefit-${index}-${benefit}`}
                  variant="secondary"
                  className="text-xs"
                >
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
          {herb.description && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">{herb.description}</p>
            </div>
          )}
        </div>

        {/* Back of card */}
        <div 
          className={cn(
            "absolute inset-0 w-full h-full bg-white rounded-lg shadow-md p-4",
            "backface-hidden [transform:rotateY(180deg)]"
          )}
          style={{
            borderColor: getColorWithOpacity(categoryColor, 0.3),
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-lg font-semibold">{herb.name}</h4>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4 overflow-y-auto max-h-[calc(100%-2rem)]">
            <div>
              <h5 className="font-medium mb-2">Preparations</h5>
              <div className="grid grid-cols-1 gap-2">
                {herb.preparations.map((prep, index) => (
                  <div
                    key={`${herb.id}-prep-${index}-${prep.type}`}
                    className={cn("p-2 rounded-lg text-sm", getPreparationBackgroundColor(prep.type))}
                  >
                    <div className="flex items-center gap-2">
                      {getPreparationIcon(prep.type)}
                      <span className="font-medium">{prep.type}</span>
                    </div>
                    <p className="mt-1 text-gray-600">{prep.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {herb.cautions && (
              <div>
                <h5 className="font-medium mb-2 flex items-center gap-2 text-amber-700">
                  <AlertCircle className="h-4 w-4" />
                  Cautions
                </h5>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                  <p className="text-sm text-amber-800">
                    {Array.isArray(herb.cautions) ? herb.cautions.join(", ") : herb.cautions}
                  </p>
                </div>
              </div>
            )}

            {herb.complementaryHerbs?.length > 0 && (
              <div>
                <h5 className="font-medium mb-2">Complementary Herbs</h5>
                <div className="flex flex-wrap gap-2">
                  {herb.complementaryHerbs.map((complementary, index) => (
                    <Badge
                      key={`${herb.id}-complementary-${index}-${complementary.id || complementary.name}`}
                      variant="outline"
                      className="text-xs"
                    >
                      {complementary.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HerbItem;
