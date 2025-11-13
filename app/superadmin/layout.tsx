import type React from "react"
import { SuperadminSidebar } from "@/components/dashboard/superadmin-sidebar"
import { AuthProvider } from "@/lib/auth-context"

export default function SuperadminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-gray-50">
        <SuperadminSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </AuthProvider>
  )
}
