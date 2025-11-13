"use client"

import { useAuth } from "@/app/context/auth-context"
import { Bell } from "lucide-react"
import { Button } from "../ui/button"

export function DashboardHeader() {
  const { user, logout } = useAuth()
  console.log(user)
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      {/* Left - Title */}
      <h1 className="text-xl font-semibold text-gray-900">NewsBoard</h1>

      {/* Right - Notifications and Profile */}
      <div className="flex items-center gap-4">
        <Button onClick={logout}>Logout</Button>
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.first_name + " " + user?.last_name}</p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            DL
          </div>
        </div>
      </div>
    </header>
  )
}
