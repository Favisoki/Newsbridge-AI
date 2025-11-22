"use client";

import ReportUi from "../components/report-ui";
import { useCitizenReports } from "@/context/citizen-reports-context";

export default function CitizenReports() {
  const {
    reportFeed,
    totalCount,
    isLoading,
    currentPage,
    totalPages,
    hasNext,
    hasPrevious,
    hasActiveFilter,
    clearFilters,
    filteredReportFeed,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    isFilterLoading,
    searchQuery,
    setSearchQuery,
  } = useCitizenReports();

  return (
    <ReportUi
      header={"Citizen Reports"}
      description="Explore stories shared by citizens across regions"
      reportUi={filteredReportFeed}
      totalCount={hasActiveFilter ? filteredReportFeed?.length : totalCount}
      isLoading={isLoading || isFilterLoading}
      currentPage={currentPage}
      totalPages={totalPages}
      hasNext={hasNext}
      hasPrevious={hasPrevious}
      setCurrentPage={setCurrentPage}
      goToNextPage={goToNextPage}
      goToPreviousPage={goToPreviousPage}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      story={filteredReportFeed}
      hasActiveFilter={hasActiveFilter}
      clearFilters={clearFilters}
    />
  );
}
