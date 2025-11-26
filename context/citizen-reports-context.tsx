"use client";

import {
    useGetAllReports,
  useGetPreferenceReports,
} from "@/app/api/auth/queries";
import useToast from "@/app/hooks/useToast";
import { debounce } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useContext,
  type ReactNode,
  useMemo,
  useState,
  useRef,
  useEffect,
  Suspense,
} from "react";

export interface ReportFeed {
  id: number;
  title: string | null;
  translated_text: string | null;
  text: string | null;
  category: string | null;
  language: string | null;
  created_at: string;
  location: string | null;
  video: string | null;
  audio: string | null;
  summary: string | null;
}

interface CitizenReportsContextType {
  // Stories data
  reportFeed: ReportFeed[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;

  // Pagination
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;

  // Utility
  itemsPerPage: number;
  dashboardHeader: string;
  setDashboardHeader: React.Dispatch<React.SetStateAction<string>>;
}

const CitizenReportsContext = createContext<CitizenReportsContextType | undefined>(
  undefined
);

// Split into a separate component that uses useSearchParams
function CitizenReportsProviderContent({ children }: { children: ReactNode }) {
  const { successToastHandler, errorToastHandler, loadingToastHandler } =
    useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebounceSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [dashboardHeader, setDashboardHeader] = useState("Report Feed");
  const dataFetchedRef = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Pass currentPage to React Query hook
  const { data, isLoading, isError } = useGetAllReports(
    currentPage,
    debouncedSearchQuery
  );

  // Extract data from API response
  const reportFeed: ReportFeed[] = data?.results || [];
  const totalCount = data?.count || 0;
  const hasNext = !!data?.next;
  const hasPrevious = !!data?.previous;

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebounceSearchQuery(value);
      }, 500),
    []
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  useEffect(() => {
    debouncedSetSearch(searchQuery);
  }, [searchQuery, debouncedSetSearch]);

  // Toast notification for data fetching failure (only once)
  useEffect(() => {
    if (dataFetchedRef.current) return;
    if (isError) {
      errorToastHandler("Failed to fetch");
      dataFetchedRef.current = true;
    }
  }, [
    isLoading,
    isError,
    data,
    loadingToastHandler,
    errorToastHandler,
    successToastHandler,
  ]);

  // Calculate pagination info
  const itemsPerPage = 10; // API returns 10 items per page
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Pagination handlers
  const goToNextPage = () => {
    if (hasNext) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (hasPrevious) {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  };

  const value = useMemo(
    () => ({
      // Stories data
      reportFeed,
      totalCount,
      isLoading,
      isError,

      // Pagination
      currentPage,
      totalPages,
      hasNext,
      hasPrevious,
      setCurrentPage,
      goToNextPage,
      goToPreviousPage,

      // Search & Filter
      searchQuery,
      setSearchQuery,
      selectedFilter,
      setSelectedFilter,

      // Utility
      itemsPerPage,
      dashboardHeader,
      setDashboardHeader,
    }),
    [
      reportFeed,
      totalCount,
      isLoading,
      isError,
      currentPage,
      totalPages,
      hasNext,
      hasPrevious,
      searchQuery,
      selectedFilter,
      itemsPerPage,
      dashboardHeader,
      setDashboardHeader,
    ]
  );

  return (
    <CitizenReportsContext.Provider value={value}>
      {children}
    </CitizenReportsContext.Provider>
  );
}

// Main provider with Suspense wrapper
export function CitizenReportProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <CitizenReportsProviderContent>{children}</CitizenReportsProviderContent>
    </Suspense>
  );
}

export function useCitizenReports() {
  const context = useContext(CitizenReportsContext);
  if (!context)
    throw new Error("useCitizenReports must be used within CitizenReportsProvider");
  return context;
}
