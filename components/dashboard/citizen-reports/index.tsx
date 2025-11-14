"use client";

import { useDashboard } from "@/context/dashboard-context";
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
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    searchQuery,
    setSearchQuery,
  } = useCitizenReports();

  return (
    <ReportUi
      header={"Citizen Reports"}
      description="Showing reports that match your newsroom's focus areas"
      reportUi={reportFeed}
      totalCount={totalCount}
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
    />
  );
}
