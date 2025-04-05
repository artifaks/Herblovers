
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Herb } from '@/data/herbs';

interface HerbCategorySectionProps {
  id: string;
  name: string;
  icon: string;
  color: string;
  herbs: Herb[];
  isExpanded: boolean;
  onToggle: (id: string) => void;
  onHerbClick: (herb: Herb) => void;
}

const HerbCategorySection: React.FC<HerbCategorySectionProps> = ({
  id,
  name,
  icon,
  color,
  herbs,
  isExpanded,
  onToggle,
  onHerbClick
}) => {
  if (herbs.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer"
        style={{ backgroundColor: `${color}15` }}
        onClick={() => onToggle(id)}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-lg font-semibold" style={{ color: color }}>
            {name}
          </h2>
          <span className="inline-block px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full text-xs">
            {herbs.length} herbs
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 w-8 p-0"
        >
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {herbs.map(herb => (
            <div 
              key={herb.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border-l-4"
              style={{ borderLeftColor: color }}
              onClick={() => onHerbClick(herb)}
            >
              <h3 className="text-lg font-semibold">{herb.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-2">{herb.scientificName}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {herb.benefits.slice(0, 2).map((benefit, index) => (
                  <span
                    key={`${herb.id}-${index}`}
                    className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-md"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HerbCategorySection;
