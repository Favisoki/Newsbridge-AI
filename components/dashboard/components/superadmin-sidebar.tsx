"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Users, Settings } from "lucide-react"
import { useSuperAdminDashboard } from "@/context/super-admin-context"
import { useEffect } from "react"

export function SuperadminSidebar() {
  const pathname = usePathname()
  const { setSuperAdminHeader } = useSuperAdminDashboard()

  const menuItems = [
    { href: "/superadmin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/superadmin/reports", label: "Reports", icon: FileText },
    { href: "/superadmin/users", label: "User Management", icon: Users },
    { href: "/superadmin/settings", label: "Settings", icon: Settings },
  ]

   useEffect(() => {
      const activeItem = menuItems.find(item => item.href === pathname)
      if (activeItem) {
        setSuperAdminHeader(activeItem.label)
      }
    }, [pathname, setSuperAdminHeader])
  
    
  return (
    <aside className="w-[200px] bg-[#1a1f37] text-white flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50">
        <Link href="/superadmin" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-8 h-8 bg-[#5b7cfa] rounded-full flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-semibold text-base">NewsBridge</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-[#2a3150] text-white" : "text-gray-300 hover:bg-[#252b45] hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
