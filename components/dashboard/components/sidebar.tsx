"use client";

import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useDashboard } from "@/context/dashboard-context";
import { Logout } from "@/components/Common/Svgs";
import Logo from "@/components/Common/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";

export function Sidebar() {
  const { isMobileMenuOpen, setIsMobileMenuOpen, setDashboardHeader } =
    useDashboard();
  const pathname = usePathname();
  const { user, setIsLogoutModal } = useAuth();
  const userType = user?.user_type;
  const menuItems = [
    { href: "/dashboard", label: "Report Feed", icon: LayoutDashboard },
    ...(userType === "mediaHouse"
    }
  }, [pathname, setDashboardHeader]);

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <>
      {/* Mobile Menu Button */}

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative mt-9
          w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col
          h-screen lg:h-auto
          z-40
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="p-7 border-b border-slate-800">
          <Logo textSize="text-white text-lg font-bold !tracking-[-0.8]" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-slate-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <button
          onClick={() => setIsLogoutModal(true)}
          className="absolute left-4 bottom-20 w-[86%] flex items-center gap-1.5 hover:scale-105 transition duration-300 cursor-pointer rounded-lg mx-auto py-3 px-4 hover:bg-slate-700"
        >
          <Logout />
          <p className="text-[#DC2626] text-base">Log out</p>
        </button>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700">
          <p className="text-xs text-gray-400">© 2025 NewsBridge</p>
        </div>
      </aside>
    </>
  );
}