'use client'
import type React from "react";
import { Sidebar } from "@/components/dashboard/components/sidebar";
import { DashboardHeader } from "@/components/dashboard/components/header";
import { DashboardProvider } from "@/context/dashboard-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="flex h-screen bg-gray-50 tracking-[-1]">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
        </div>
      </div>
    </DashboardProvider>
  );
}
