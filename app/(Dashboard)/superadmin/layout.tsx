import type React from "react"
import { SuperadminSidebar } from "@/components/dashboard/components/superadmin-sidebar"

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SuperadminSidebar />
      <main className="flex-1 ml-[200px]">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
