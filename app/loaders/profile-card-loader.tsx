import { Card, CardContent } from "@/components/ui/card";

export function UserCardSkeleton() {
  return (
    <Card className="w-1/2 mb-2 bg-white">
      <CardContent className="space-y-6">
        <div className="flex items-center gap-3">
          {/* Avatar skeleton */}
          <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse"></div>
          
          <div className="space-y-3 flex-1">
            {/* Name skeleton */}
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            {/* Email skeleton */}
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}