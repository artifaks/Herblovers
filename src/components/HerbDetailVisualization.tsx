
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { BenefitScore, ComplementaryHerb, DetailedPreparation } from '@/data/herbs';
import { AlertTriangle, ChevronDown, Link, Pill, Leaf, Beaker, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HerbDetailVisualizationProps {
  benefitScores: BenefitScore[];
  complementaryHerbs: ComplementaryHerb[];
  cautions: string[] | string;
  categoryColor: string;
  detailedPreparations?: DetailedPreparation[];
}

const HerbDetailVisualization: React.FC<HerbDetailVisualizationProps> = ({
  benefitScores,
  complementaryHerbs,
  cautions,
  categoryColor,
  detailedPreparations
}) => {
  // Convert cautions to array if it's a string
  const cautionsArray = typeof cautions === 'string' ? [cautions] : cautions;
  
  // For expandable preparations
  const [expandedPreps, setExpandedPreps] = React.useState<Record<string, boolean>>({});
  
  const togglePreparation = (prepType: string) => {
    setExpandedPreps(prev => ({
      ...prev,
      [prepType]: !prev[prepType]
    }));
  };

  // Get icon for preparation type
  const getPreparationIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('decoction') || lowerType.includes('tea')) {
      return <Leaf className="h-5 w-5 text-green-600" />;
    } else if (lowerType.includes('tincture')) {
      return <Beaker className="h-5 w-5 text-purple-500" />;
    } else if (lowerType.includes('capsule')) {
      return <Pill className="h-5 w-5 text-blue-500" />;
    } else if (lowerType.includes('powder')) {
      return <Circle className="h-5 w-5 text-gray-500" />;
    } else if (lowerType.includes('soup') || lowerType.includes('traditional')) {
      return <Leaf className="h-5 w-5 text-green-600" />;
    }
    return <Circle className="h-5 w-5" />;
  };

  return (
    <div className="space-y-8">
      {/* Benefits Visualization */}
      {benefitScores.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-orange-600">Benefits Visualization</h2>
          <div className="space-y-6">
            {benefitScores.map((score, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm items-center mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{score.category}</span>
                  <span className={cn(
                    "font-medium",
                    getBenefitScoreTextColor(score.score)
                  )}>{score.score}%</span>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className={cn(
                          "h-2.5 rounded-full",
                          getBenefitScoreBarColor(score.score)
                        )}
                        style={{ width: `${score.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-2 px-1 text-xs text-gray-500">
            <span>0</span>
            <span>20</span>
            <span>40</span>
            <span>60</span>
            <span>80</span>
            <span>100</span>
          </div>
        </div>
      )}

      {/* Common Preparations */}
      {detailedPreparations && detailedPreparations.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-orange-600">Common Preparations</h2>
          <div className="space-y-3">
            {detailedPreparations.map((prep, index) => (
              <div
                key={index}
                className={cn(
                  "border rounded-lg transition-all duration-200 overflow-hidden",
                  expandedPreps[prep.type] ? "shadow-md" : "shadow-sm"
                )}
                style={{ 
                  backgroundColor: prep.color ? `${prep.color}10` : undefined,
                  borderColor: prep.color ? prep.color : '#e5e7eb'
                }}
              >
                <div
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => togglePreparation(prep.type)}
                >
                  <div className="flex items-center gap-3">
                    {getPreparationIcon(prep.type)}
                    <div>
                      <h3 className="font-medium" style={{ 
                        color: prep.color ? prep.color : 'inherit'
                      }}>{prep.type}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{prep.description}</p>
                    </div>
                  </div>
                  {(prep.details || prep.steps || prep.ingredients) && (
                    <ChevronDown 
                      className={cn(
                        "h-5 w-5 transition-transform",
                        expandedPreps[prep.type] && "transform rotate-180"
                      )} 
                    />
                  )}
                </div>
                
                {expandedPreps[prep.type] && (
                  <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                    {prep.details && <p className="mt-2 pt-2 text-sm">{prep.details}</p>}
                    
                    {prep.ingredients && prep.ingredients.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-1">Ingredients:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                          {prep.ingredients.map((ingredient, idx) => (
                            <li key={idx}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {prep.steps && prep.steps.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-1">Steps:</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                          {prep.steps.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                    
                    {prep.dosage && (
                      <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm font-medium">Dosage:</span> <span className="text-sm">{prep.dosage}</span>
                      </div>
                    )}
                    
                    {prep.notes && (
                      <div className="mt-3 text-sm italic text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Note:</span> {prep.notes}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Complementary Herbs */}
      {complementaryHerbs && complementaryHerbs.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-orange-600">
            <Link className="h-5 w-5" />
            <span>Complementary Herbs</span>
          </h2>
          <div className="space-y-3">
            {complementaryHerbs.map((herb, index) => (
              <div 
                key={index} 
                className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800"
              >
                <div className="font-medium text-amber-800 dark:text-amber-300">
                  {herb.name}
                </div>
                {herb.description && (
                  <p className="text-amber-700 dark:text-amber-400 mt-1">
                    {herb.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cautions */}
      {cautionsArray && cautionsArray.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-orange-600">
            <AlertTriangle className="h-5 w-5" />
            <span>Cautions</span>
          </h2>
          <ul className="space-y-2">
            {cautionsArray.map((caution, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400 mt-2 flex-shrink-0"></span>
                <span>{caution}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Helper function to get appropriate color for benefit score text
const getBenefitScoreTextColor = (score: number): string => {
  if (score >= 90) return 'text-green-500';
  if (score >= 80) return 'text-blue-500';
  if (score >= 70) return 'text-amber-500';
  if (score >= 60) return 'text-red-500';
  return 'text-gray-500';
};

// Helper function to get appropriate color for benefit score bar
const getBenefitScoreBarColor = (score: number): string => {
  if (score >= 90) return 'bg-green-500';
  if (score >= 80) return 'bg-blue-500';
  if (score >= 70) return 'bg-amber-500';
  if (score >= 60) return 'bg-red-500';
  return 'bg-gray-500';
};

export default HerbDetailVisualization;
