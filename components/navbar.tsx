"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/#features", label: "Features" },
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#who-its-for", label: "Who it's For" },
    { href: "/#team", label: "The Team" },
    { href: "/#guide", label: "User Guide" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href.split("#")[0])
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg">
          <div className="px-8 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">NB</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">Newsbridge</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-blue-600  border-blue-600 pb-1"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-blue-100">
                  Sign in
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Request Access</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
