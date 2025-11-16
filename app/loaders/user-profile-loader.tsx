export function UserProfileSkeleton() {
  return (
    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
      {/* Avatar skeleton */}
      <div className="w-10.5 h-10.5 bg-gray-200 rounded-full animate-pulse"></div>
      
      <div className="space-y-2">
        {/* Name skeleton */}
        <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
        {/* Role skeleton */}
        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
