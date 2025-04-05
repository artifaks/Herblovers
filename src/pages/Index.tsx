
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Leaf, BookOpen, ShoppingCart, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import { Card, CardContent } from "@/components/ui/card";
import RecipeDetail from "@/components/RecipeDetail";
import { featuredRecipes } from "@/data/recipes";

const LandingPage = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);

  const handleRecipeClick = (recipeId: string) => {
    setSelectedRecipe(recipeId);
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };
  
  const currentRecipe = featuredRecipes.find(recipe => recipe.id === selectedRecipe);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden py-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://kipqzmgjqwijpulxctfs.supabase.co/storage/v1/object/public/recipe-images//homeopathy-2024-12-19-18-51-32-utc.jpg" 
            alt="Herbal preparations background" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-4">
              Your Guide to DIY Herbal Preparations
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Craft Your Own Natural Remedies
            </h1>
            <p className="mt-3 text-xl text-gray-100 sm:mt-4 max-w-xl">
              Discover step-by-step guides for creating herbal salves, tinctures, oils, 
              and teas. From ingredient lists to brewing timers, we've got you covered.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="gap-2 bg-herb-heart hover:bg-herb-heart/90">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="gap-2 border-white text-white hover:bg-white/10">
                View Timers
                <Timer className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Herbal Preparation Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Herbal Preparation Categories
          </h2>
          <p className="text-gray-600">Explore different types of herbal preparations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <img 
              src="https://kipqzmgjqwijpulxctfs.supabase.co/storage/v1/object/public/recipe-images//melted-ghee-butter-2024-10-18-05-24-42-utc.JPG"
              alt="Healing salves" 
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1">Healing Salves</h3>
              <p className="text-sm text-gray-600">
                Soothing balms for external use on skin, wounds, and sore muscles.
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <img 
              src="https://kipqzmgjqwijpulxctfs.supabase.co/storage/v1/object/public/recipe-images//Herbal%20tinctures.jpg" 
              alt="Herbal tinctures" 
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1">Herbal Tinctures</h3>
              <p className="text-sm text-gray-600">
                Concentrated herbal extracts preserved in alcohol or glycerin.
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <img 
              src="https://kipqzmgjqwijpulxctfs.supabase.co/storage/v1/object/public/recipe-images//Infused%20oils.jpg" 
              alt="Infused oils" 
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1">Infused Oils</h3>
              <p className="text-sm text-gray-600">
                Herbs steeped in carrier oils for culinary or medicinal purposes.
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <img 
              src="https://kipqzmgjqwijpulxctfs.supabase.co/storage/v1/object/public/recipe-images//Herbal%20Teas.jpg" 
              alt="Herbal teas" 
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1">Herbal Teas</h3>
              <p className="text-sm text-gray-600">
                Aromatic brews made from dried herbs, flowers, and roots.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Featured Recipes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Featured Recipes
            </h2>
            <p className="text-gray-600">Popular herbal preparations to get you started</p>
          </div>
          <Link to="#" className="text-herb-heart font-medium flex items-center">
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{recipe.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{recipe.duration}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {recipe.shortDescription}
                </p>
                <Button 
                  variant="link" 
                  className="text-herb-heart font-medium text-sm p-0 flex items-center h-auto"
                  onClick={() => handleRecipeClick(recipe.id)}
                >
                  View Recipe <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-herb-bg/30">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-12">
          Everything You Need For Your Herbal Journey
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-herb-digestive/20 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-herb-digestive" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Step-by-Step Tutorials</h3>
            <p className="text-gray-600">
              Clear instructions for creating your own herbal preparations with detailed guidance.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-herb-heart/20 flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-6 w-6 text-herb-heart" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Shopping Lists</h3>
            <p className="text-gray-600">
              Organize your ingredients and never forget an essential herb or supply.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-herb-cognitive/20 flex items-center justify-center mx-auto mb-4">
              <Timer className="h-6 w-6 text-herb-cognitive" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Precision Timers</h3>
            <p className="text-gray-600">
              Set the perfect brewing, infusing, and cooling times for optimal results.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Ready to start your herbal journey?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our recipes, set up your shopping list, and craft your own natural remedies today.
          </p>
          <Button className="gap-2 bg-herb-heart hover:bg-herb-heart/90">
            Browse Recipes
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Recipe Detail Modal */}
      {currentRecipe && (
        <RecipeDetail 
          isOpen={!!selectedRecipe} 
          onClose={handleCloseRecipe} 
          recipe={currentRecipe}
        />
      )}
    </div>
  );
};

export default LandingPage;
