"use client";

import ReportUi from "@/components/dashboard/components/report-ui";
import { useSuperAdminDashboard } from "@/context/super-admin-context";

export default function Reports() {
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
  } = useSuperAdminDashboard();

  return (
    <ReportUi
          header={"Reports"}
          description="Monitor all reports received across the Newsbridge ecosystem."
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
          setSearchQuery={setSearchQuery} story={reportFeed}    />
  );
}
