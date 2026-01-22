"use client";

import { useAuth } from "@/context/auth-context";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "../../ui/button";
import { getNameAbbr } from "@/lib/utils";
import { useDashboard } from "@/context/dashboard-context";
import { useSuperAdminDashboard } from "@/context/super-admin-context";
import { UserProfileSkeleton } from "@/app/loaders/user-profile-loader";

export function DashboardHeader() {
  const { user, isLoading } = useAuth();
  const { dashboardHeader, setIsMobileMenuOpen, isMobileMenuOpen } = useDashboard();
  const fullName = user?.first_name && user?.last_name 
    ? `${user.first_name} ${user.last_name}`.trim()
    : user?.first_name || user?.last_name || "";
  
  // Show skeleton during loading OR logging out
  const shouldShowSkeleton = isLoading || !user || !fullName;
  
  return (
    <header className="bg-white border-b border-gray-200 sm:px-8 px-4 py-5 flex items-center justify-between mt-10">
      {!isMobileMenuOpen && <Button
        variant={'outline'}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className=" z-10 py-5 text-black rounded-lg lg:hidden"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>}

      {/* Left - Title */}
      <h1 className="text-xl tracking-[-1.3] lg:block hidden font-semibold text-gray-900">
        {dashboardHeader}
      </h1>

      {/* Right - Notifications and Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 rounded-lg transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        {shouldShowSkeleton ? (
          <UserProfileSkeleton />
        ) : (
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="w-10.5 h-10.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              {getNameAbbr(fullName)}
            </div>
            <div className="hidden lg:block">
              <p className="font-medium text-gray-900">{fullName ?? "User"}</p>
              <p className="text-xs text-gray-500">{user?.role ?? "Role"}</p>
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
  const fullName = user?.first_name && user?.last_name 
    ? `${user.first_name} ${user.last_name}`.trim()
    : user?.first_name || user?.last_name || "";
  
  return (
    <header className="fixed left-[280px] right-0 top-10 bg-white border-b border-gray-200 px-8 py-5.5 flex items-center justify-between z-10">
      {/* Left - Title */}
      <h1 className="text-xl font-semibold text-gray-900">
        {superAdminHeader}
      </h1>

      {/* Right - Notifications and Profile */}
      <div className="flex items-center gap-4">
        <Button onClick={logout} disabled={isLoggingOut}>
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
        
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{fullName || "User"}</p>
            <p className="text-xs text-gray-500">{user?.role || "Role"}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {getNameAbbr(fullName)}
          </div>
        </div>
      </div>
    </header>
  );
}
