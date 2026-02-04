"use client"

import ReportUi from "../components/report-ui"
import { useCitizenReports } from "@/context/citizen-reports-context"

export default function CitizenReports() {
  const citizenReports = useCitizenReports()

  if (!citizenReports) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const {
    reportFeed,
    filteredReportFeed,
    totalCount,
    isLoading,
    currentPage,
    totalPages,
    hasNext,
    hasPrevious,
    hasActiveFilter,
    clearFilters,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    isFilterLoading,
    searchQuery,
    setSearchQuery,
  } = citizenReports

  // Use filteredReportFeed if available, otherwise fall back to reportFeed
  const displayReports = filteredReportFeed || reportFeed || []

  return (
    <ReportUi
      header={"Citizen Reports"}
      description="Explore stories shared by citizens across regions"
      reportUi={displayReports}
      totalCount={hasActiveFilter ? displayReports.length : totalCount}
      isLoading={isLoading}
      currentPage={currentPage}
      totalPages={totalPages}
      hasNext={hasNext}
      hasPrevious={hasPrevious}
      setCurrentPage={setCurrentPage}
      goToNextPage={goToNextPage}
      goToPreviousPage={goToPreviousPage}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      story={displayReports}
      hasActiveFilter={hasActiveFilter}
      clearFilters={clearFilters}
    />
  )
}
