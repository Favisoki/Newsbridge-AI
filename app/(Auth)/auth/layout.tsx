import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center sm:p-14 p-4" style={{backgroundImage: "url('/onboarding-bg.png')", backgroundSize: "cover" }}>
      {children}
    </div>
  )
}
