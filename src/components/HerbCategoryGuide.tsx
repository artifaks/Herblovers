
import React from 'react';
import { HerbCategory } from '@/data/herbs';

interface HerbCategoryGuideProps {
  categories: HerbCategory[];
}

const HerbCategoryGuide: React.FC<HerbCategoryGuideProps> = ({ categories }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Herb Category Color Guide</h2>
      <div className="space-y-3">
        {categories.map(category => (
          <div 
            key={category.id}
            className="p-3 rounded-md border-l-4 transition-all hover:shadow-sm"
            style={{ borderLeftColor: category.color, backgroundColor: `${category.color}10` }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg" role="img" aria-label={`${category.name} icon`}>
                {category.icon}
              </span>
              <div>
                <h3 className="text-sm font-medium" style={{ color: category.color }}>
                  Herbs that support
                </h3>
                <p className="text-sm" style={{ color: category.color }}>
                  {category.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HerbCategoryGuide;
