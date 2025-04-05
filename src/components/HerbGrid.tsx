
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Herb } from '@/data/herbs';
import HerbItem from './HerbItem';
import { HerbSkeleton } from './HerbSkeleton';
import { useToast } from '@/hooks/use-toast';
import { toggleFavorite, getFavorites } from '@/lib/favorites';

interface HerbGridProps {
  herbs: Herb[];
  isLoading?: boolean;
  loadingCount?: number;
  categoryColors?: Record<string, string>;
  viewType?: 'grid' | 'list';
}

const HerbGrid: React.FC<HerbGridProps> = ({
  herbs,
  isLoading = false,
  loadingCount = 6,
  categoryColors = {},
  viewType = 'grid'
}) => {
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load favorites from localStorage
  React.useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // Handle favorite toggle
  const handleToggleFavorite = (herbId: string) => {
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

  // Handle herb click
  const handleHerbClick = (herbId: string) => {
    navigate(`/herb/${herbId}`);
  };

  return (
    <div className={viewType === 'grid' 
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      : "flex flex-col gap-4"
    }>
      {isLoading ? (
        Array(loadingCount).fill(0).map((_, index) => (
          <HerbSkeleton key={index} viewType={viewType} />
        ))
      ) : (
        herbs.map(herb => (
          <HerbItem
            key={herb.id}
            herb={herb}
            categoryColor={categoryColors[herb.category] || '#6b7280'}
            onClick={() => handleHerbClick(herb.id)}
            isFavorite={favorites.includes(herb.id)}
            onToggleFavorite={handleToggleFavorite}
            viewType={viewType}
          />
        ))
      )}
    </div>
  );
};

export default HerbGrid;
