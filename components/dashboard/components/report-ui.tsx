"use client";

import { Search, ChevronDown, Calendar, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoryCard } from "../components/story-card";
import EmptyState from "@/components/Common/empty-state";
import { useEffect, useRef, useState } from "react";
import Modal from "@/components/ui/modal";
import ReportDetailModal from "@/components/modal-components/report-details-modal";
import { ObjectLiteral } from "@/lib/utils";
import { StoryCardSkeletonList } from "@/app/loaders/dashboard-loader";
import FilterModal from "@/components/Common/filter-component";
import SmartDatePicker from "@/components/Common/smart-date-picker";
import { usePathname } from "next/navigation";
import { useCitizenReports } from "@/context/citizen-reports-context";
import { useDashboard } from "@/context/dashboard-context";

interface ReportUiProps {
  story: ObjectLiteral; 
  reportUi: any[];
  totalCount: number;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  clearFilters: () => void;
  hasNext: boolean;
  description: string
  header: string
  hasActiveFilter: boolean
  hasPrevious: boolean;
  setCurrentPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function ReportUi({
  story,
  reportUi,
  totalCount,
  isLoading,
  hasActiveFilter,
  currentPage,
  totalPages,
  clearFilters,
  hasNext,
  hasPrevious,
  setCurrentPage,
  goToNextPage,
  goToPreviousPage,
  searchQuery,
  description,
  setSearchQuery,
  header
}: ReportUiProps) {
  const [isClicked, setIsClicked] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null);
    console.log(reportUi)


useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
      setIsClicked(false);
    }
  };

  if (isClicked) {
    document.addEventListener('mousedown', handleClickOutside);
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [isClicked]);
  
  const pathname = usePathname();

const providerValue = pathname.startsWith("/dashboard/citizen-reports")
  ? useCitizenReports()
  : useDashboard();


  return (
    <div className="p-8">
      {/* Active Reports Section */}
      <div className="mt-2">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl tracking-[-2] font-bold text-gray-900">
              {header} ({totalCount})
            </h2>
            <p className="text-gray-600 mt-1">
              {description}
            </p>
          </div>
          <SmartDatePicker />
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
          <div ref={filterRef} className="relative">
          <Button onClick={() => setIsClicked(prev => !prev)} variant="outline" className="gap-2 bg-white p-5 text-[#2D2D2D]">
            Filter by
            {isClicked ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
            {isClicked && <FilterModal setIsClicked={setIsClicked} provider={providerValue} />}
          </div>
         {hasActiveFilter && <Button variant={'ghost'} onClick={clearFilters} className="flex gap-2 py-5 hover:bg-gray-100">
            <X className="text-red-700" />
            <p className="">Clear Filters</p>
          </Button>}
        </div>

        {/* Recent Reports */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Reports
          </h3>

          {isLoading ? (
            <StoryCardSkeletonList />
          ) : (
            <div className="space-y-4">
              {reportUi.length > 0 ? (
                reportUi.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))
              ) : (
                <EmptyState feedback="No report feed found for your preference" />
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className={`flex items-center justify-between ${reportUi.length > 0 ? "" : "hidden"}`}>
          <Button
            variant="ghost"
            onClick={goToPreviousPage}
            disabled={!hasPrevious || isLoading}
          >
            ← Previous
          </Button>

          <div className={`flex items-center gap-4`}>
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
            <span className="text-sm text-gray-500">of {totalPages} pages</span>
          </div>

          <Button
            variant="ghost"
            onClick={goToNextPage}
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
