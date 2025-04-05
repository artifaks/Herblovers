
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Leaf, ShoppingCart, Download } from "lucide-react";
import { toast } from "sonner";

export type RecipeDetailProps = {
  isOpen: boolean;
  onClose: () => void;
  recipe: {
    id: string;
    title: string;
    image: string;
    duration: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    benefits: string[];
  };
};

const RecipeDetail = ({ isOpen, onClose, recipe }: RecipeDetailProps) => {
  const ebookUrl = "https://kipqzmgjqwijpulxctfs.supabase.co/storage/v1/object/public/ebooks//Unlocking%20Your%20Body-%20Fitness%20Biohacks%20for%20Peak%20Performance.pdf";
  const ebookPrice = 7.99;

  const handleDownloadEbook = () => {
    // In a real app, you would handle payment processing here
    // For now, just simulate a successful purchase with a toast
    toast.success(`Purchasing eBook for $${ebookPrice}...`);
    
    // After a simulated delay, initiate the download
    setTimeout(() => {
      window.open(ebookUrl, '_blank');
      toast.success("Download started!");
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {recipe.title}
          </DialogTitle>
          <DialogDescription className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{recipe.duration}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-md"
          />

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{recipe.description}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc pl-5 space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Instructions</h3>
            <ol className="list-decimal pl-5 space-y-2">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="text-gray-700">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Leaf className="h-4 w-4 mr-1 text-herb-heart" />
              Benefits
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {recipe.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-700">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button className="gap-2 bg-herb-heart hover:bg-herb-heart/90">
              <ShoppingCart className="h-4 w-4" />
              Add Ingredients to Shopping List
            </Button>
            
            <Button 
              variant="outline" 
              className="gap-2 border-herb-cognitive text-herb-cognitive hover:bg-herb-cognitive/10"
              onClick={handleDownloadEbook}
            >
              <Download className="h-4 w-4" />
              Download eBook (${ebookPrice})
            </Button>
            
            <Button variant="outline" onClick={onClose} className="sm:ml-auto">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetail;
