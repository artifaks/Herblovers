import { Link } from "react-router-dom";
import { Book, Database, Leaf, ShoppingCart, BarChart2, Settings, Activity, Crown, HelpCircle, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";
import AuthNav from "./AuthNav";
import { useAuth } from "@/contexts/AuthContext";

const NavBar = () => {
  const { isAdminUser } = useAuth();
  
  return (
    <div className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-herb-heart" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 bg-clip-text text-transparent">
            Herbalist Haven
          </span>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/herbs" className={navigationMenuTriggerStyle()}>
                  <Database className="mr-2 h-4 w-4" />
                  Herbs Database
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        to="/herbs"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-herb-heart/20 to-herb-heart/10 p-6 no-underline outline-none focus:shadow-md"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium text-herb-heart">
                          Herb Database
                        </div>
                        <p className="text-sm leading-tight text-slate-600">
                          Explore our comprehensive herbal remedies database
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem to="/herbs" title="Heart & Circulatory">
                    Support for heart health
                  </ListItem>
                  <ListItem to="/herbs" title="Digestive System">
                    Herbs for digestive wellness
                  </ListItem>
                  <ListItem to="/herbs" title="Women's Health">
                    Natural remedies for women
                  </ListItem>
                  <ListItem to="/herbs" title="Men's Health">
                    Support for men's wellness
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/ebooks" className={navigationMenuTriggerStyle()}>
                  <Book className="mr-2 h-4 w-4" />
                  eBooks
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/herb-comparison" className={navigationMenuTriggerStyle()}>
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Herb Comparison
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/subscription" className={navigationMenuTriggerStyle()}>
                  <Crown className="mr-2 h-4 w-4" />
                  Subscription
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/pricing" className={navigationMenuTriggerStyle()}>
                  <DollarSign className="mr-2 h-4 w-4" />
                  Pricing
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/faq" className={navigationMenuTriggerStyle()}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  FAQ
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {isAdminUser && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>Admin Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <ListItem to="/admin" title="Admin Dashboard">
                      Add and manage herbs in the database
                    </ListItem>
                    <ListItem to="/ebooks/diagnostic" title="Ebooks Diagnostic">
                    Diagnose and fix ebook storage issues
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>
          <AuthNav />
        </div>
      </div>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default NavBar;
