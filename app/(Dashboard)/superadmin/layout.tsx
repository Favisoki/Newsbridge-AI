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
        <SuperadminSidebar />
        <SuperAdminDashboardHeader />
        <main className="flex-1 ml-[280px] relative top-30">
          <div className="p-8">{children}</div>
        </main>
    </SuperAdminProvider>
  );
}
