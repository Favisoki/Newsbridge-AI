export function StoryCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 relative animate-pulse">
      {/* View Details Button Skeleton */}
      <div className="absolute top-6 right-6">
        <div className="h-9 w-28 bg-gray-200 rounded-3xl"></div>
      </div>

      {/* Tags Row */}
      <div className="flex gap-2 mb-3 items-center">
        {/* Media Icon */}
        <div className="w-5 h-5 bg-gray-200 rounded"></div>
        
        {/* Category Badge */}
        <div className="h-7 w-20 bg-gray-200 rounded-full"></div>
        
        {/* Language Badge */}
        <div className="h-7 w-32 bg-gray-200 rounded-full"></div>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-4 h-4 bg-gray-200 rounded"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>

      {/* Headline */}
      <div className="mb-2 pr-32 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-5 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Excerpt */}
      <div className="mb-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>

      {/* Source Info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        
        <div className="space-y-2 flex-1">
          {/* Name */}
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          
          {/* Location */}
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// If you want to show multiple skeleton cards at once:
export function StoryCardSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <StoryCardSkeleton key={index} />
      ))}
    </div>
  );
}
