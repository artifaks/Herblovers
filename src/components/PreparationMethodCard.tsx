
import React from 'react';
import { Preparation } from '@/data/herbs';
import { Card, CardContent } from './ui/card';
import { Beaker, ListChecks, Ruler, Clock, FlaskConical, Droplets, PenTool } from 'lucide-react';

interface PreparationMethodCardProps {
  preparation: Preparation;
  color?: string;
}

const PreparationMethodCard: React.FC<PreparationMethodCardProps> = ({
  preparation,
  color = '#6b7280'
}) => {
  // Choose the appropriate icon based on preparation type
  const getPreparationIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('tea') || lowerType.includes('infusion')) {
      return <Droplets className="h-5 w-5" style={{ color }} />;
    } else if (lowerType.includes('tincture')) {
      return <FlaskConical className="h-5 w-5" style={{ color }} />;
    } else if (lowerType.includes('oil')) {
      return <Droplets className="h-5 w-5" style={{ color }} />;
    } else if (lowerType.includes('powder') || lowerType.includes('capsule')) {
      return <PenTool className="h-5 w-5" style={{ color }} />;
    }
    return <Beaker className="h-5 w-5" style={{ color }} />;
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div 
        className="p-4 border-b flex items-center gap-3"
        style={{ borderColor: color }}
      >
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          {getPreparationIcon(preparation.type)}
        </div>
        <div>
          <h3 className="font-medium">{preparation.type}</h3>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          {preparation.description}
        </p>
        
        {preparation.dosage && (
          <div className="flex items-start gap-2 mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <Ruler className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <span className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Dosage</span>
              <p className="text-sm">{preparation.dosage}</p>
            </div>
          </div>
        )}
        
        {preparation.steps && preparation.steps.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <ListChecks className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Steps</span>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              {preparation.steps.map((step, index) => (
                <li key={index} className="pb-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <span className="ml-2">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Preparation Time Indicator */}
        <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3.5 w-3.5" />
          <span>Preparation time: {preparation.type.toLowerCase().includes('tincture') ? '4-6 weeks' : 
                                 preparation.type.toLowerCase().includes('oil') ? '2-4 weeks' : 
                                 preparation.type.toLowerCase().includes('tea') ? '5-10 minutes' : 
                                 '15-30 minutes'}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreparationMethodCard;
