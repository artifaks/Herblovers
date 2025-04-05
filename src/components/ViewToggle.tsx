
import React from 'react';
import { List, Grid } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { cn } from '@/lib/utils';

interface ViewToggleProps {
  view: 'list' | 'grid';
  onChange: (view: 'list' | 'grid') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onChange }) => {
  return (
    <ToggleGroup 
      type="single" 
      value={view} 
      onValueChange={(value) => {
        if (value) onChange(value as 'list' | 'grid');
      }}
      className="bg-muted rounded-md p-1"
    >
      <ToggleGroupItem 
        value="grid" 
        aria-label="Grid view"
        className={cn(
          "h-8 w-8 p-0 data-[state=on]:bg-background data-[state=on]:text-foreground",
          view === 'grid' && "shadow-sm"
        )}
      >
        <Grid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="list" 
        aria-label="List view"
        className={cn(
          "h-8 w-8 p-0 data-[state=on]:bg-background data-[state=on]:text-foreground",
          view === 'list' && "shadow-sm"
        )}
      >
        <List className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ViewToggle;
