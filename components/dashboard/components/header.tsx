"use client";

import { useAuth } from "@/context/auth-context";
import { Bell } from "lucide-react";
import { Button } from "../../ui/button";
import { getNameAbbr } from "@/lib/utils";
import { useDashboard } from "@/context/dashboard-context";
import { useSuperAdminDashboard } from "@/context/super-admin-context";
import { UserProfileSkeleton } from "@/app/loaders/user-profile-loader";

export function DashboardHeader() {
  const { user, isLoading } = useAuth();
  const { dashboardHeader } = useDashboard();
  const fullName = user?.first_name + " " + user?.last_name;
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
      {/* Left - Title */}
      <h1 className="text-xl tracking-[-1.3] font-semibold text-gray-900">
        {dashboardHeader}
      </h1>

      {/* Right - Notifications and Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        {isLoading ? (
          <UserProfileSkeleton />
        ) : (
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="w-10.5 h-10.5 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              {getNameAbbr(fullName)}
            </div>
            <div className="">
              <p className="font-medium text-gray-900">{fullName}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export function SuperAdminDashboardHeader() {
  const { user, logout, isLoggingOut } = useAuth();
  const { superAdminHeader } = useSuperAdminDashboard();
  const fullName = user?.first_name + " " + user?.last_name;
  return (
    <header className="ml-[209px] bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      {/* Left - Title */}
      <h1 className="text-xl font-semibold text-gray-900">
        {superAdminHeader}
      </h1>

      {/* Right - Notifications and Profile */}
      <div className="flex items-center gap-4">
        <Button onClick={logout}>
          {isLoggingOut ? "Logging out.." : "Logout"}
        </Button>
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{fullName}</p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {getNameAbbr(fullName)}
          </div>
        </div>
      </div>
    </header>
  );
}
