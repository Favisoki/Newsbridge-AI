export function ReportDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Title Skeleton */}
      <div className="mb-4 pr-8 space-y-3">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Date Skeleton */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-4 h-4 bg-gray-200 rounded"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>

      {/* Author Info Skeleton */}
      <div className="flex items-center gap-3 mb-8">
        {/* Avatar */}
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        
        <div className="space-y-2 flex-1">
          {/* Name */}
          <div className="h-4 w-36 bg-gray-200 rounded"></div>
          
          {/* Location */}
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-3 w-28 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Original Submission Section */}
      <div className="mb-6">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="h-5 w-40 bg-gray-200 rounded"></div>
        </div>

        {/* Submission Card */}
        <div
          className="border p-6 rounded-lg"
          style={{
            borderColor: "#E1CD2B",
            boxShadow: "0px 20px 40px 0px #C3C3C340",
          }}
        >
          {/* Media Player Skeleton */}
          <div className="bg-gray-200 rounded-xl mb-4" style={{ height: "240px" }}></div>

          {/* Transcript Skeleton */}
          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Translation Section */}
      <div className="mb-6">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="h-5 w-44 bg-gray-200 rounded"></div>
        </div>

        {/* Translation Card */}
        <div
          className="px-6 py-1 rounded-2xl"
          style={{ backgroundColor: "#F5F7FF", borderRadius: "8px" }}
        >
          {/* Header with confidence score */}
          <div className="flex items-center justify-between mt-2 mb-6">
            <div className="h-4 w-52 bg-gray-200 rounded"></div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
              <div className="h-7 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Translation Text */}
          <div
            className="border border-blue-100 rounded-lg p-4 mb-6"
            style={{
              backgroundColor: "#E7EBFD",
              border: "1px solid #C7D8FF",
            }}
          >
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-4/5"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Follow Story Button Skeleton */}
      <div className="h-11 w-[155px] bg-gray-200 rounded"></div>
    </div>
  );
}

export function ReportDetailError({ errorMessage, onClose }: { errorMessage?: string, onClose: () => void }) {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Error Icon with gradient background */}
        <div 
          className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #3754A3 0%, #E1CD2B 100%)",
            opacity: 0.1
          }}
        >
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #3754A3 0%, #E1CD2B 100%)"
            }}
          >
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Error Title */}
        <h2 
          className="text-2xl font-bold mb-3"
          style={{ color: "#3754A3" }}
        >
          Unable to Load Report
        </h2>

        {/* Error Message */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {errorMessage || "We couldn't load this report. Please check your connection and try again."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-lg text-white font-medium transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #3754A3 0%, #E1CD2B 100%)"
            }}
          >
            Try Again
          </button>
          
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg font-medium transition-all hover:bg-gray-100"
            style={{
              border: "1px solid #E1CD2B",
              color: "#3754A3"
            }}
          >
            Go Back
          </button>
        </div>

        {/* Support Text */}
        <p className="text-sm text-gray-500 mt-8">
          Need help?{" "}
          <a 
            href="#" 
            className="font-medium hover:underline"
            style={{ color: "#3754A3" }}
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
