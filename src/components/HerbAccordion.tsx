
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import HerbItem from './HerbItem';
import { Herb, HerbCategory } from '@/data/herbs';
import { cn } from '@/lib/utils';

interface HerbAccordionProps {
  category: HerbCategory;
  isExpanded: boolean;
  onToggle: () => void;
  onSelectHerb: (herb: Herb) => void;
}

const HerbAccordion: React.FC<HerbAccordionProps> = ({ 
  category, 
  isExpanded, 
  onToggle,
  onSelectHerb 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Get a preview of the benefits
  const getBenefitPreview = () => {
    if (!category.herbs.length) return '';
    
    // Join the first couple of benefits
    const benefits = category.herbs.flatMap(herb => herb.benefits);
    const uniqueBenefits = Array.from(new Set(benefits)).slice(0, 2);
    return uniqueBenefits.join(' • ');
  };

  return (
    <div className="bg-white dark:bg-gray-800" id={`category-${category.id}`}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "w-full flex items-center justify-between p-4 transition-colors duration-200",
          "focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700"
        )}
        aria-expanded={isExpanded}
        aria-controls={`herb-list-${category.id}`}
      >
        <div className="flex items-center gap-3">
          <div 
            className="flex items-center justify-center w-10 h-10 rounded-full transition-all"
            style={{
              backgroundColor: `${category.color}20`,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            <span 
              className="text-xl leading-none" 
              role="img" 
              aria-label={`${category.name} category icon`}
              style={{ color: category.color }}
            >
              {category.icon}
            </span>
          </div>
          <div className="text-left">
            <h2 
              className="text-lg font-semibold"
              style={{ color: category.color }}
            >
              {category.name}
            </h2>
            {!isExpanded && category.herbs.length > 0 && (
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                <p>
                  {category.herbs.length} herbs • Example: {category.herbs[0].name}
                </p>
                <p className="text-gray-400 dark:text-gray-500 italic text-xs mt-1">
                  {getBenefitPreview()}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span 
            className="text-sm px-2 py-1 rounded-full"
            style={{
              backgroundColor: `${category.color}20`,
              color: category.color
            }}
          >
            {category.herbs.length} herbs
          </span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" style={{ color: category.color }} aria-hidden="true" />
          ) : (
            <ChevronDown className="h-5 w-5" style={{ color: category.color }} aria-hidden="true" />
          )}
        </div>
      </button>

      <div
        id={`herb-list-${category.id}`}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
        role="region"
        aria-labelledby={`category-${category.id}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {category.herbs.map((herb) => (
            <div 
              key={herb.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectHerb(herb)}
            >
              <HerbItem 
                herb={herb} 
                categoryColor={category.color}
                isStandalone={false} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HerbAccordion;
