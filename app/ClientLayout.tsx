"use client"

import type React from "react"
import { Navbar } from "@/components/navbar"
import { usePathname } from "next/navigation"

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith("/dashboard")

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
    </>
  )
}
