"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Users, Settings } from "lucide-react"

export function SuperadminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { href: "/superadmin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/superadmin/reports", label: "Reports", icon: FileText },
    { href: "/superadmin/users", label: "User Management", icon: Users },
    { href: "/superadmin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <aside className="w-[200px] bg-[#1a2332] text-white flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-8 h-8 bg-[#6B7FE8] rounded-lg flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-semibold text-base">NewsBridge</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== "/superadmin" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm ${
                isActive ? "bg-[#2d3748] text-white" : "text-gray-300 hover:bg-[#252d3d]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
