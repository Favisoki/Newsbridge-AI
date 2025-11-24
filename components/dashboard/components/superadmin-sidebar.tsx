"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Users, Settings } from "lucide-react"
import { useSuperAdminDashboard } from "@/context/super-admin-context"
import { useEffect } from "react"
import Logo from "@/components/Common/Logo"

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
    <aside className="w-[280px] bg-[#1a1f37] text-white flex flex-col h-screen fixed left-0 top-10">
      {/* Logo */}
      <div className="p-7 border-b border-slate-800">
      <Logo textSize="text-white text-lg font-bold !tracking-[-0.8]"/>

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
