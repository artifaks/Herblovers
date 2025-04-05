
import React, { useState, useEffect } from 'react';
import { Herb } from '@/data/herbs';
import { useToast } from '@/hooks/use-toast';
import HerbItem from '@/components/HerbItem';
import HerbDetail from '@/components/HerbDetail';
import ViewToggle from '@/components/ViewToggle';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { addFavorite, removeFavorite, getFavorites } from '@/lib/favorites';

interface HerbDatabaseProps {
  herbs: Herb[];
}

// Define a type that extends Herb to include the color property
interface HerbWithColor extends Herb {
  color?: string;
}

const HerbDatabase: React.FC<HerbDatabaseProps> = ({ herbs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'list' | 'grid'>('grid');
  const [selectedHerb, setSelectedHerb] = useState<HerbWithColor | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Properly handle the async function
    const loadFavorites = async () => {
      try {
        const storedFavorites = await getFavorites();
        setFavorites(storedFavorites);
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
      }
    };
    
    loadFavorites();
  }, []);

  const toggleFavorite = (herbId: string) => {
    let newFavorites: string[];
    if (favorites.includes(herbId)) {
      removeFavorite(herbId);
      newFavorites = favorites.filter(id => id !== herbId);
      toast({
        title: "Removed from favorites.",
        description: "This herb has been removed from your favorites list.",
      });
    } else {
      addFavorite(herbId);
      newFavorites = [...favorites, herbId];
      toast({
        title: "Added to favorites!",
        description: "You can now find this herb in your favorites.",
      });
    }
    setFavorites(newFavorites);
  };

  const isHerbFavorite = (herbId: string): boolean => {
    return favorites.includes(herbId);
  };

  // Cast herbs to HerbWithColor type for TypeScript to recognize the color property
  const herbsWithColor = herbs as HerbWithColor[];

  const filteredHerbs = herbsWithColor.filter(herb =>
    herb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    herb.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    herb.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (selectedHerb) {
    return (
      <HerbDetail
        herb={selectedHerb}
        onBack={() => setSelectedHerb(null)}
        isFavorite={isHerbFavorite(selectedHerb.id)}
        onToggleFavorite={toggleFavorite}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto flex-1">
          <Input
            type="text"
            placeholder="Search for herbs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          {searchTerm && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-0 top-0 h-full rounded-l-none"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <ViewToggle view={view} onChange={setView} />
      </div>
      
      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHerbs.map((herb) => (
            <HerbItem
              key={herb.id}
              herb={herb}
              categoryColor={herb.color || '#6B7280'}
              onClick={() => setSelectedHerb(herb)}
              isFavorite={isHerbFavorite(herb.id)}
              onToggleFavorite={toggleFavorite}
              viewType="grid"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHerbs.map((herb) => (
            <HerbItem
              key={herb.id}
              herb={herb}
              categoryColor={herb.color || '#6B7280'}
              onClick={() => setSelectedHerb(herb)}
              isFavorite={isHerbFavorite(herb.id)}
              onToggleFavorite={toggleFavorite}
              viewType="list"
            />
          ))}
        </div>
      )}

      {filteredHerbs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No herbs found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default HerbDatabase;
