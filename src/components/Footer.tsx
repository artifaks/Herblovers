
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Heart, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-12 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400">Herbalist Haven</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Your trusted resource for herbal knowledge and traditional wisdom.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">for herbalists everywhere</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/herbs" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  Herb Database
                </Link>
              </li>
              <li>
                <Link to="/ebooks" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  Ebooks & Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:contact@herbalisthaven.com" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              For educational purposes only. Always consult with a healthcare professional before using herbs.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {currentYear} Herbalist Haven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
