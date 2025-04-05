
const FAVORITES_KEY = 'herbal-favorites';

// Get all favorites
export const getFavorites = (): string[] => {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (!savedFavorites) return [];
    return JSON.parse(savedFavorites);
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

// Add a favorite
export const addFavorite = (id: string): void => {
  try {
    const favorites = getFavorites();
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error adding favorite:', error);
  }
};

// Remove a favorite
export const removeFavorite = (id: string): void => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(favId => favId !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
};

// Check if an item is a favorite
export const isFavorite = (id: string): boolean => {
  try {
    const favorites = getFavorites();
    return favorites.includes(id);
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};

// Toggle favorite status and return updated favorites array
export const toggleFavorite = (id: string): string[] => {
  try {
    const favorites = getFavorites();
    if (favorites.includes(id)) {
      // Remove favorite
      const updatedFavorites = favorites.filter(favId => favId !== id);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    } else {
      // Add favorite
      const updatedFavorites = [...favorites, id];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return getFavorites(); // Return current state in case of error
  }
};
