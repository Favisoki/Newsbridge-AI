"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, Settings } from "lucide-react";
import { useDashboard } from "@/context/dashboard-context";
import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { Logout } from "@/components/Common/Svgs";
import Logo from "@/components/Common/Logo";

export function Sidebar() {
  const pathname = usePathname();
  const { setDashboardHeader } = useDashboard();
  const { user, setIsLogoutModal } = useAuth();
  const userType = user?.user_type;

  const menuItems = [
    { href: "/dashboard", label: "Report Feed", icon: LayoutDashboard },
    ...(userType === "mediaHouse"
      ? [{ href: "/dashboard/team", label: "Team Activity", icon: Users }]
      : []),
    {
      href: "/dashboard/citizen-reports",
      label: "Citizen Reports",
      icon: FileText,
    },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  useEffect(() => {
    const activeItem = menuItems.find((item) => item.href === pathname);
    if (activeItem) {
      setDashboardHeader(activeItem.label);
    }
  }, [pathname, setDashboardHeader]);

  return (
    <aside className="relative w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col">
      {/* Logo */}
      <div className="p-7 border-b border-slate-800">
      <Logo textSize="text-white text-lg font-bold !tracking-[-0.8]"/>

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
      <button onClick={() => setIsLogoutModal(true)} className="absolute left-4 bottom-20 w-[86%] flex items-center gap-1.5 hover:scale-105 transition duration-300 cursor-pointer rounded-lg mx-auto py-3 px-4 hover:bg-slate-700">
     
        <Logout />
        <p className="text-[#DC2626] text-base">Log out</p>
        </button>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-gray-400">© 2025 NewsBridge</p>
      </div>
    </aside>
  );
}
