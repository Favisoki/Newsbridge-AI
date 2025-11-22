"use client";

import { useGetPreferenceReports } from "@/app/api/auth/queries";
import useToast from "@/app/hooks/useToast";
import { debounce } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
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

interface DashboardContextType {
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
  hasActiveFilter: boolean;
  setDashboardHeader: React.Dispatch<React.SetStateAction<string>>;
  filterCategory: string;
  filterRegion: string;
  filterLanguage: string;
  filterStoryType: string;
  setFilterCategory: (value: string) => void;
  setFilterRegion: (value: string) => void;
  setFilterLanguage: (value: string) => void;
  setFilterStoryType: (value: string) => void;
  clearFilters: () => void;
  filteredReportFeed: ReportFeed[];
    isFilterLoading: boolean;

}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

// Split into a separate component that uses useSearchParams
function DashboardProviderContent({ children }: { children: ReactNode }) {
  const { successToastHandler, errorToastHandler, loadingToastHandler } =
    useToast();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebounceSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [dashboardHeader, setDashboardHeader] = useState("Report Feed");
    const [isFilterLoading, setIsFilterLoading] = useState(false)
  const toastShownRef = useRef(false);
  const dataFetchedRef = useRef(false);

  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  // Pass currentPage to React Query hook
  const { data, isLoading, isError } = useGetPreferenceReports(
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

  const [filterCategory, setFilterCategory] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [filterStoryType, setFilterStoryType] = useState("");

    const hasActiveFilter = !!(filterCategory.trim() || filterRegion.trim() || filterLanguage.trim() || filterStoryType.trim())


  const filteredReportFeed = useMemo(() => {
    let filtered = reportFeed;

    // Filter by category
    if (filterCategory) {
      filtered = filtered.filter(
        (report) =>
          report.category?.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    // Filter by region/location
    if (filterRegion) {
      filtered = filtered.filter((report) =>
        report.location?.toLowerCase().includes(filterRegion.toLowerCase())
      );
    }

    // Filter by language
    if (filterLanguage) {
      filtered = filtered.filter(
        (report) =>
          report.language?.toLowerCase() === filterLanguage.toLowerCase()
      );
    }

    // Filter by story type (video/audio/text)
    if (filterStoryType) {
      filtered = filtered.filter((report) => {
        if (filterStoryType === "video") return !!report.video;
        if (filterStoryType === "audio" || filterStoryType === "podcast")
          return !!report.audio;
        if (filterStoryType === "article") return !!report.text;
        return true;
      });
    }

    return filtered;
  }, [
    reportFeed,
    filterCategory,
    filterRegion,
    filterLanguage,
    filterStoryType,
  ]);

    useEffect(() => {
  // Start loading when filters change
  setIsFilterLoading(true);

  const timer = setTimeout(() => {
    setIsFilterLoading(false);
  }, 500); // add slight delay to show loading UI

  return () => clearTimeout(timer);
}, [filterCategory, filterRegion, filterLanguage, filterStoryType, reportFeed]);


  // Add clear filters function
  const clearFilters = () => {
    setFilterCategory("");
    setFilterRegion("");
    setFilterLanguage("");
    setFilterStoryType("");
  };

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
      Cookies.set("blockSpecialRoutes", "true", {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      // Remove query param from URL
      const params = new URLSearchParams(searchParams.toString());
      params.delete("msg");
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, successToastHandler, router]);

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

      filterCategory,
      filterRegion,
      filterLanguage,
      filterStoryType,
      setFilterCategory,
      hasActiveFilter,
      setFilterRegion,
      setFilterLanguage,
      setFilterStoryType,
      clearFilters,
      filteredReportFeed,
      isFilterLoading
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
      hasActiveFilter,
      itemsPerPage,
      dashboardHeader,
      setDashboardHeader,
      filterCategory,
      filterRegion,
      filterLanguage,
      filterStoryType,
      setFilterCategory,
      setFilterRegion,
      setFilterLanguage,
      setFilterStoryType,
      clearFilters,
      filteredReportFeed,
      isFilterLoading
    ]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

// Main provider with Suspense wrapper
export function DashboardProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <DashboardProviderContent>{children}</DashboardProviderContent>
    </Suspense>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context)
    throw new Error("useDashboard must be used within DashboardProvider");
  return context;
}
