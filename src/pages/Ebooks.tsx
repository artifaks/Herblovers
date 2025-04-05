import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Book, DollarSign, ShoppingCart, Leaf, BookOpen, Download } from "lucide-react";
import { toast } from "sonner";
import NavBar from "@/components/NavBar";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";

interface Ebook {
  id: string;
  title: string;
  description: string;
  price: number;
  cover_image_url: string;
  file_url: string;
  author: string;
  category?: string;
  stripe_product_id?: string;
  stripe_price_id?: string;
}

const Ebooks = () => {
  const [cart, setCart] = useState<string[]>([]);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Check for success parameter
  useEffect(() => {
    const success = searchParams.get('success');
    const ebookId = searchParams.get('ebookId');
    
    if (success === 'true' && ebookId) {
      toast.success("Payment successful! Downloading your eBook...");
      // Find the ebook in our list
      const ebook = ebooks.find(e => e.id === ebookId);
      if (ebook && ebook.file_url) {
        setTimeout(() => {
          window.open(ebook.file_url, '_blank');
          
          // Clean up URL parameters after successful download
          setSearchParams({});
        }, 1500);
      }
    } else if (searchParams.get('canceled') === 'true') {
      toast.error("Payment canceled.");
      
      // Clean up URL parameters after canceled payment
      setSearchParams({});
    }
  }, [searchParams, ebooks, setSearchParams]);
  
  // Fetch ebooks from Supabase
  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('ebooks')
          .select('*')
          .order('published_date', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setEbooks(data);
        }
      } catch (error) {
        console.error('Error fetching ebooks:', error);
        toast.error("Failed to load ebooks");
      } finally {
        setLoading(false);
      }
    };
    
    fetchEbooks();
  }, []);

  const addToCart = (ebookId: string) => {
    setCart((prev) => [...prev, ebookId]);
    toast.success("eBook added to cart");
  };
  
  const handleCheckout = async (ebookId: string) => {
    try {
      setPurchasing(true);
      toast.loading("Preparing checkout...");
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          ebookId,
          returnUrl: window.location.origin + '/ebooks'
        },
      });
      
      if (error) throw error;
      
      // Redirect to Stripe Checkout
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setPurchasing(false);
    }
  };

  const getCategoryColor = (category: string = "general") => {
    switch (category) {
      case "heart":
        return "bg-herb-heart";
      case "digestive":
        return "bg-herb-digestive";
      case "womens":
        return "bg-herb-womens";
      case "mens":
        return "bg-herb-mens";
      case "cognitive":
        return "bg-herb-cognitive";
      case "tea":
        return "bg-herb-tea";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-herb-bg via-white to-herb-bg py-16">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-herb-heart opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 h-64 w-64 rounded-full bg-herb-cognitive opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-24 right-1/3 h-80 w-80 rounded-full bg-herb-tea opacity-20 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent pb-2">
              Herbal Wisdom Library
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
              Discover our collection of premium herbal eBooks written by expert herbalists
            </p>
            
            <div className="mt-8 flex justify-center space-x-4">
              <Button className="gap-2" size="lg">
                <BookOpen className="h-5 w-5" />
                Browse Collection
              </Button>
              <Button variant="outline" className="gap-2" size="lg">
                <Leaf className="h-5 w-5" />
                Learn More
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <p className="font-semibold text-herb-heart">{ebooks.length}+</p>
                <p className="text-xs text-gray-500">eBooks</p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <p className="font-semibold text-herb-cognitive">Expert</p>
                <p className="text-xs text-gray-500">Authors</p>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <p className="font-semibold text-herb-digestive">PDF</p>
                <p className="text-xs text-gray-500">Format</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent">
            Herbalist Haven eBooks
          </h1>
          <p className="text-center max-w-2xl mx-auto text-gray-600 mb-8">
            Expand your knowledge with our curated collection of herbal eBooks. Each guide is crafted by expert herbalists to help you harness the power of plants for optimal wellness.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-herb-heart"></div>
          </div>
        ) : ebooks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No eBooks available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ebooks.map((ebook) => (
              <div
                key={ebook.id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg"
              >
                <div className="h-48 relative">
                  <img
                    src={ebook.cover_image_url || `https://placehold.co/300x400/e63946/ffffff?text=${encodeURIComponent(ebook.title)}`}
                    alt={ebook.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://placehold.co/300x400/e63946/ffffff?text=${encodeURIComponent(ebook.title)}`;
                    }}
                  />
                  <div
                    className={`absolute top-3 right-3 ${getCategoryColor(ebook.category)} text-white text-xs px-2 py-1 rounded-full`}
                  >
                    {ebook.category ? ebook.category.charAt(0).toUpperCase() + ebook.category.slice(1) : 'General'}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Book className="h-4 w-4 mr-2 text-herb-heart" />
                      {ebook.title}
                    </h3>
                    <span className="font-bold text-herb-heart flex items-center">
                      <DollarSign className="h-4 w-4" /> {ebook.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">By {ebook.author || 'Unknown Author'}</p>
                  <p className="mt-2 text-gray-600 text-sm h-20 overflow-hidden">
                    {ebook.description}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => addToCart(ebook.id)}
                      disabled={cart.includes(ebook.id) || purchasing}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {cart.includes(ebook.id) ? "Added to Cart" : "Add to Cart"}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-herb-heart text-herb-heart hover:bg-herb-heart/10"
                      onClick={() => handleCheckout(ebook.id)}
                      disabled={purchasing}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-herb-heart" />
              Your Cart ({cart.length} items)
            </h2>
            <ul className="mb-4">
              {cart.map((id) => {
                const ebook = ebooks.find((e) => e.id === id);
                return (
                  <li key={id} className="flex justify-between py-2 border-b">
                    <span>{ebook?.title}</span>
                    <span className="font-semibold">${ebook?.price.toFixed(2)}</span>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>
                $
                {cart
                  .reduce((sum, id) => {
                    const ebook = ebooks.find((e) => e.id === id);
                    return sum + (ebook?.price || 0);
                  }, 0)
                  .toFixed(2)}
              </span>
            </div>
            <Button 
              className="w-full mt-4" 
              onClick={() => {
                // Checkout first item in cart for simplicity
                // In a real app, you'd handle the entire cart
                if (cart.length > 0) {
                  handleCheckout(cart[0]);
                }
              }}
              disabled={purchasing}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ebooks;
