"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ChevronDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoryCard } from "@/components/dashboard/story-card";
import { useRouter, useSearchParams } from "next/navigation";
import useToast from "../hooks/useToast";
import { useGetAllReports } from "../api/auth/queries";
import EmptyState from "@/components/Common/empty-state";

export default function NewsBoard() {
  const { successToastHandler, errorToastHandler, loadingToastHandler } = useToast();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const toastShownRef = useRef(false);
  const dataFetchedRef = useRef(false);
  
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  // Pass currentPage to React Query hook
  const { data, isLoading, isError } = useGetAllReports(currentPage);

  // Extract data from API response
  const mockStories = data?.results || [];
  const totalCount = data?.count || 0;
  const hasNext = !!data?.next;
  const hasPrevious = !!data?.previous;

  // Toast notifications for data fetching (only once)
  useEffect(() => {
    if (dataFetchedRef.current) return;
    
    if (isLoading) {
      loadingToastHandler("Fetching...");
    } else if (isError) {
      errorToastHandler("Failed to fetch");
      dataFetchedRef.current = true;
    } else if (data) {
      successToastHandler("Success!");
      dataFetchedRef.current = true;
    }
  }, [isLoading, isError, data]);

  // Welcome message toast
  useEffect(() => {
    if (toastShownRef.current) return;

    const msg = searchParams.get("msg");
    if (!msg) return;

    let message = "";

    if (msg === "login-success") {
      message = "Login Success";
    } else if (msg === "firsttime-signup") {
      message = "Welcome to your Dashboard";
    }

    if (message) {
      successToastHandler(message);
      toastShownRef.current = true;

      // Remove query param from URL
      const params = new URLSearchParams(searchParams.toString());
      params.delete("msg");
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, []);

  // Filtering logic
  const filteredStories = Array.isArray(mockStories) && mockStories.length > 0 
    ? mockStories.filter((story) => {
        if (!story) return false;
        
        const title = (story.title || '').toLowerCase();
        const translatedText = (story.translated_text || '').toLowerCase();
        const text = (story.text || '').toLowerCase();
        const category = (story.category || '').toLowerCase();
        const location = (story.location || '').toLowerCase();
        const query = (searchQuery || '').toLowerCase();
        
        const matchesSearch = query === '' || 
          title.includes(query) || 
          translatedText.includes(query) ||
          text.includes(query) ||
          location.includes(query) ||
          category.includes(query);
        
        const matchesFilter = selectedFilter === "all" || 
          category === selectedFilter.toLowerCase();
        
        return matchesSearch && matchesFilter;
      }) 
    : [];

  // Calculate pagination info
  const itemsPerPage = 10; // API returns 10 items per page
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="p-8">
      {/* Active Reports Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Active Reports ({totalCount})
            </h2>
            <p className="text-gray-600 mt-1">
              Review incoming citizen journalism reports
            </p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Calendar className="w-4 h-4" />
            Today
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, reporters, location or topic"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // Don't reset page when searching within current page results
              }}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            Filter by
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>

        {/* Recent Reports */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Reports
          </h3>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-500">Loading reports...</div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStories.length > 0 ? (
                filteredStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))
              ) : (
                <EmptyState feedback="No report feed found for your preference" />
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={!hasPrevious || isLoading}
          >
            ← Previous
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show 5 page numbers centered around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                if (pageNum < 1 || pageNum > totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    disabled={isLoading}
                    className={`w-8 h-8 rounded ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 disabled:opacity-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <span className="text-sm text-gray-500">
              of {totalPages} pages
            </span>
          </div>
          
          <Button
            variant="ghost"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={!hasNext || isLoading}
          >
            Next →
          </Button>
        </div>
      </div>

      {/* WhatsApp Icon */}
      <div className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 cursor-pointer">
        <span className="text-2xl">💬</span>
      </div>
    </div>
  );
}