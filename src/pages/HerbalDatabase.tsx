
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { herbCategories } from '@/data/herbs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Heart, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getFavorites, toggleFavorite } from '@/lib/favorites';
import { useToast } from '@/hooks/use-toast';

const HerbalDatabasePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Initialize favorites from localStorage
    setFavorites(getFavorites());
  }, []);

  // Get all herbs from all categories
  const allHerbs = herbCategories.flatMap(category => {
    // Add the category color to each herb for easier access
    return category.herbs.map(herb => ({
      ...herb,
      color: category.color
    }));
  });

  // Filter herbs based on search term
  const filteredHerbs = searchTerm 
    ? allHerbs.filter(herb => 
        herb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        herb.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        herb.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : allHerbs;

  // Group herbs by category
  const herbsByCategory = {};
  filteredHerbs.forEach(herb => {
    if (!herbsByCategory[herb.category]) {
      herbsByCategory[herb.category] = [];
    }
    herbsByCategory[herb.category].push(herb);
  });

  // Calculate count of herbs in each category
  const categoryHerbCounts = {};
  herbCategories.forEach(category => {
    categoryHerbCounts[category.id] = herbsByCategory[category.id]?.length || 0;
  });

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedCategories(new Set(herbCategories.map(c => c.id)));
  };

  const collapseAll = () => {
    setExpandedCategories(new Set());
  };

  const handleFavoriteToggle = (e: React.MouseEvent, herbId: string) => {
    e.stopPropagation();
    const newFavorites = toggleFavorite(herbId);
    setFavorites(newFavorites);
    
    const herb = allHerbs.find(h => h.id === herbId);
    if (herb) {
      toast({
        title: newFavorites.includes(herbId) 
          ? `${herb.name} added to favorites` 
          : `${herb.name} removed from favorites`,
        duration: 2000,
      });
    }
  };

  // Function to get the herb card for each category
  const getHerbCard = (herb: any) => {
    const isFavorite = favorites.includes(herb.id);
    
    return (
      <div 
        key={herb.id}
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border-l-4 relative group"
        style={{ borderLeftColor: herb.color }}
        onClick={() => navigate(`/herb/${herb.id}`)}
      >
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={(e) => handleFavoriteToggle(e, herb.id)}
          >
            <Heart 
              className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-gray-400")} 
            />
          </Button>
        </div>
        
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
          {herb.benefits.length > 2 && (
            <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-md">
              +{herb.benefits.length - 2} more
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <div className="container mx-auto py-8 px-4 pb-12">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-8">Herbalist Haven Database</h1>
        
        {/* Herb Category Color Guide */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Herb Category Color Guide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {herbCategories.map(category => (
              <div 
                key={category.id}
                className="p-3 rounded-md border-l-4 transition-all hover:shadow-sm cursor-pointer"
                style={{ borderLeftColor: category.color, backgroundColor: `${category.color}10` }}
                onClick={() => {
                  toggleCategory(category.id);
                  // Scroll to category
                  const element = document.getElementById(`category-${category.id}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
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
        
        {/* Search and Filters */}
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search herbs by name, scientific name, or benefits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10"
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
        
        {/* Herb count and expand/collapse buttons */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            {filteredHerbs.length} herbs found
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={expandAll}
              className="flex items-center gap-1"
            >
              <ChevronDown className="h-4 w-4" />
              Expand All
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={collapseAll}
              className="flex items-center gap-1"
            >
              <ChevronUp className="h-4 w-4" />
              Collapse All
            </Button>
          </div>
        </div>
        
        {/* Categories and Herbs */}
        <div className="space-y-4">
          {herbCategories.map(category => {
            const categoryHerbs = herbsByCategory[category.id] || [];
            if (categoryHerbs.length === 0) return null;
            
            const isExpanded = expandedCategories.has(category.id);
            
            return (
              <div 
                key={category.id}
                id={`category-${category.id}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
              >
                <div 
                  className="flex justify-between items-center p-4 cursor-pointer"
                  style={{ backgroundColor: `${category.color}15` }}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    <h2 className="text-lg font-semibold" style={{ color: category.color }}>
                      {category.name}
                    </h2>
                    <span className="inline-block px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full text-xs">
                      {categoryHerbs.length} herbs
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
                    {categoryHerbs.map(herb => getHerbCard(herb))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HerbalDatabasePage;
