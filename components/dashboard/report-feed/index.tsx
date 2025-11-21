"use client";

import { useDashboard } from "@/context/dashboard-context";
import ReportUi from "../components/report-ui";

export default function DashboardPage() {
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
  } = useDashboard();

  return (
    <ReportUi
      header={"Report Feed"}
      description={"Showing reports that match your newsroom's focus areas"}
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
      story={reportFeed}
    />
  );
}
