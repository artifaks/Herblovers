
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Herb } from '@/data/herbs';
import { ChevronRight, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toggleFavorite, getFavorites } from '@/lib/favorites';
import { useToast } from '@/hooks/use-toast';

interface HerbListProps {
  herbs: Herb[];
  categoryColors?: Record<string, string>;
}

const HerbList: React.FC<HerbListProps> = ({ herbs, categoryColors = {} }) => {
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load favorites from localStorage
  React.useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // Handle favorite toggle
  const handleToggleFavorite = (e: React.MouseEvent, herbId: string) => {
    e.stopPropagation();
    const newFavorites = toggleFavorite(herbId);
    setFavorites(newFavorites);

    const herb = herbs.find(h => h.id === herbId);
    if (herb) {
      toast({
        title: newFavorites.includes(herbId) 
          ? `${herb.name} added to favorites` 
          : `${herb.name} removed from favorites`,
        duration: 2000,
      });
    }
  };

  const handleHerbClick = (herbId: string) => {
    navigate(`/herb/${herbId}`);
  };

  return (
    <div className="divide-y dark:divide-gray-700">
      {herbs.map(herb => (
        <div
          key={herb.id}
          className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 px-3 rounded-md"
          onClick={() => handleHerbClick(herb.id)}
        >
          <div className="flex items-center">
            <div
              className="w-2 h-12 rounded-sm mr-3"
              style={{ backgroundColor: categoryColors[herb.category] || '#6b7280' }}
            ></div>
            <div>
              <h3 className="font-medium text-sm md:text-base">{herb.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm italic">{herb.scientificName}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={(e) => handleToggleFavorite(e, herb.id)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full mr-1"
            >
              <Heart 
                className={cn(
                  "h-4 w-4 md:h-5 md:w-5",
                  favorites.includes(herb.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                )} 
              />
            </button>
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HerbList;
