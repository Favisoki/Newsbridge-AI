import type { ReactNode } from "react"

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-pattern-repeat flex items-center justify-center px-4 pt-32 pb-8">{children}</div>
  )
}
