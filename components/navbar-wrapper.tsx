"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"

export function NavbarWrapper() {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith("/dashboard")
  const isAuth = pathname.startsWith("/auth") || pathname.startsWith("/onboarding")
  const isSuperAdmin = pathname.startsWith("/superadmin")
  const isWaitlist = pathname.startsWith("/waitlist");

  return !isDashboard && !isAuth && !isSuperAdmin && !isWaitlist ? <Navbar /> : null
}
