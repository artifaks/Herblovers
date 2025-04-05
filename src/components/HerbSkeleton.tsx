
import { Skeleton } from "@/components/ui/skeleton";

interface HerbSkeletonProps {
  viewType?: 'grid' | 'list';
}

export function HerbSkeleton({ viewType = 'grid' }: HerbSkeletonProps) {
  if (viewType === 'list') {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-3 rounded-sm" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
    </div>
  );
}

export function HerbListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <HerbSkeleton key={i} viewType="list" />
      ))}
    </div>
  );
}

export function HerbGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <HerbSkeleton key={i} viewType="grid" />
      ))}
    </div>
  );
} 
