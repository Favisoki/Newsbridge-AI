import type React from "react";
import { SuperadminSidebar } from "@/components/dashboard/components/superadmin-sidebar";
import { SuperAdminProvider } from "@/context/super-admin-context";
import { SuperAdminDashboardHeader } from "@/components/dashboard/components/header";

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SuperAdminProvider>
        <SuperAdminDashboardHeader />
      <div className="flex min-h-screen bg-gray-50 tracking-[-1]">
        <SuperadminSidebar />
        <main className="flex-1 ml-[200px]">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </SuperAdminProvider>
  );
}