"use client"

import type React from "react"

import { useGetAllReports } from "@/app/api/auth/queries"
import useToast from "@/app/hooks/useToast"
import { debounce } from "@/lib/utils"
import { createContext, useContext, type ReactNode, useMemo, useState, useRef, useEffect, Suspense } from "react"

export interface ReportFeed {
  id: number
  title: string | null
  translated_text: string | null
  text: string | null
  category: string | null
  language: string | null
  created_at: string
  location: string | null
  video: string | null
  audio: string | null
  summary: string | null
}

interface CitizenReportsContextType {
  // Stories data
  reportFeed: ReportFeed[]
  filteredReportFeed: ReportFeed[]
  totalCount: number
  isLoading: boolean
  isError: boolean

  // Pagination
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
  setCurrentPage: (page: number | ((prev: number) => number)) => void
  goToNextPage: () => void
  goToPreviousPage: () => void

  // Search & Filter
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedFilter: string
  setSelectedFilter: (filter: string) => void

  filterCategory: string
  setFilterCategory: (category: string) => void
  filterRegion: string
  setFilterRegion: (region: string) => void
  filterLanguage: string
  setFilterLanguage: (language: string) => void
  filterStoryType: string
  setFilterStoryType: (storyType: string) => void
  hasActiveFilter: boolean
  isFilterLoading: boolean
  clearFilters: () => void

  // Utility
  itemsPerPage: number
  dashboardHeader: string
  setDashboardHeader: React.Dispatch<React.SetStateAction<string>>
}

const CitizenReportsContext = createContext<CitizenReportsContextType | undefined>(undefined)

// Split into a separate component that uses useSearchParams
function CitizenReportsProviderContent({ children }: { children: ReactNode }) {
  const { successToastHandler, errorToastHandler, loadingToastHandler } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebounceSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [dashboardHeader, setDashboardHeader] = useState("Report Feed")
  const dataFetchedRef = useRef(false)
  const [currentPage, setCurrentPage] = useState(1)

  const [filterCategory, setFilterCategory] = useState("")
  const [filterRegion, setFilterRegion] = useState("")
  const [filterLanguage, setFilterLanguage] = useState("")
  const [filterStoryType, setFilterStoryType] = useState("")
  const [isFilterLoading, setIsFilterLoading] = useState(false)

  // Pass currentPage to React Query hook
  const { data, isLoading, isError } = useGetAllReports(currentPage, debouncedSearchQuery)

  // Extract data from API response
  const reportFeed: ReportFeed[] = data?.results || []
  const totalCount = data?.count || 0
  const hasNext = !!data?.next
  const hasPrevious = !!data?.previous

  const hasActiveFilter = !!(filterCategory || filterRegion || filterLanguage || filterStoryType)

  const filteredReportFeed = useMemo(() => {
    if (!hasActiveFilter) return reportFeed

    return reportFeed.filter((report) => {
      const matchesCategory = !filterCategory || report.category?.toLowerCase() === filterCategory.toLowerCase()
      const matchesRegion = !filterRegion || report.location?.toLowerCase().includes(filterRegion.toLowerCase())
      const matchesLanguage = !filterLanguage || report.language?.toLowerCase() === filterLanguage.toLowerCase()
      // Story type filter would need a story_type field in the report
      return matchesCategory && matchesRegion && matchesLanguage
    })
  }, [reportFeed, filterCategory, filterRegion, filterLanguage, filterStoryType, hasActiveFilter])

  const clearFilters = () => {
    setFilterCategory("")
    setFilterRegion("")
    setFilterLanguage("")
    setFilterStoryType("")
  }

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebounceSearchQuery(value)
      }, 500),
    [],
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchQuery])

  useEffect(() => {
    debouncedSetSearch(searchQuery)
  }, [searchQuery, debouncedSetSearch])

  // Toast notification for data fetching failure (only once)
  useEffect(() => {
    if (dataFetchedRef.current) return
    if (isError) {
      errorToastHandler("Failed to fetch")
      dataFetchedRef.current = true
    }
  }, [isLoading, isError, data, loadingToastHandler, errorToastHandler, successToastHandler])

  // Calculate pagination info
  const itemsPerPage = 10 // API returns 10 items per page
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  // Pagination handlers
  const goToNextPage = () => {
    if (hasNext) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const goToPreviousPage = () => {
    if (hasPrevious) {
      setCurrentPage((prev) => Math.max(1, prev - 1))
    }
  }

  const value = useMemo(
    () => ({
      // Stories data
      reportFeed,
      filteredReportFeed,
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

      filterCategory,
      setFilterCategory,
      filterRegion,
      setFilterRegion,
      filterLanguage,
      setFilterLanguage,
      filterStoryType,
      setFilterStoryType,
      hasActiveFilter,
      isFilterLoading,
      clearFilters,

      // Utility
      itemsPerPage,
      dashboardHeader,
      setDashboardHeader,
    }),
    [
      reportFeed,
      filteredReportFeed,
      totalCount,
      isLoading,
      isError,
      currentPage,
      totalPages,
      hasNext,
      hasPrevious,
      searchQuery,
      selectedFilter,
      filterCategory,
      filterRegion,
      filterLanguage,
      filterStoryType,
      hasActiveFilter,
      isFilterLoading,
      itemsPerPage,
      dashboardHeader,
      setDashboardHeader,
    ],
  )

  return <CitizenReportsContext.Provider value={value}>{children}</CitizenReportsContext.Provider>
}

// Main provider with Suspense wrapper
export function CitizenReportProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <CitizenReportsProviderContent>{children}</CitizenReportsProviderContent>
    </Suspense>
  )
}

export function useCitizenReports() {
  const context = useContext(CitizenReportsContext)
  return context
}
