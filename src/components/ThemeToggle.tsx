
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { useTheme } from '@/lib/theme-provider';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isDarkMode}
        onCheckedChange={() => setTheme(isDarkMode ? 'light' : 'dark')}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      />
      <div className="flex items-center">
        <Sun className={`h-4 w-4 transition-opacity ${isDarkMode ? 'opacity-50' : 'opacity-100'}`} />
        <Moon className={`h-4 w-4 ml-2 transition-opacity ${isDarkMode ? 'opacity-100' : 'opacity-50'}`} />
      </div>
    </div>
  );
};

export default ThemeToggle;
