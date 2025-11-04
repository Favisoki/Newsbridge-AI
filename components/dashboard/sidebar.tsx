"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, FileText, Settings } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    { href: "/dashboard", label: "News Board", icon: LayoutDashboard },
    { href: "/dashboard/team", label: "Team Activity", icon: Users },
    { href: "/dashboard/citizen-reports", label: "Citizen Reports", icon: FileText },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">NB</span>
          </div>
          <span className="font-bold text-lg">NewsBridge</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-700"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-gray-400">© 2025 NewsBridge</p>
      </div>
    </aside>
  )
}
