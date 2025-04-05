import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, List } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavigationBar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/herbs', label: 'Herbs', icon: List },
    { path: '/ebooks', label: 'eBooks', icon: BookOpen },
  ];

  return (
    <nav 
      className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                    "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                    isActive 
                      ? "text-indigo-600 bg-indigo-50" 
                      : "text-gray-600 hover:text-gray-900"
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar; 