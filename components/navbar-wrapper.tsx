"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"

export function NavbarWrapper() {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith("/dashboard")
  const isAuth = pathname.startsWith("/auth") || pathname.startsWith("/onboarding")
  const isSuperAdmin = pathname.startsWith("/superadmin")

  return !isDashboard && !isAuth && !isSuperAdmin ? <Navbar /> : null
}
