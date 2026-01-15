"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function VerifyEmailPage() {
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="w-full max-w-md">
      {/* Logo - Using semantic tokens */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">NB</span>
          </div>
          <span className="text-lg font-semibold text-foreground">Newbridge</span>
        </div>
      </div>

      {/* Card - Using semantic tokens */}
      <div className="bg-card rounded-lg shadow-lg p-8">
        {/* Email Icon - Using semantic tokens */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center text-4xl">✉️</div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2 text-center">Check Your Email</h1>
        <p className="text-muted-foreground text-center mb-8 text-sm">
          We sent a verification link to <strong>your.email@gmail.com</strong>. Please verify your email address.
        </p>

        {/* Timer - Using semantic tokens */}
        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-foreground">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </p>
        </div>

        {/* Resend Button - Using semantic tokens */}
        <Button className="w-full bg-primary/20 hover:bg-primary/30 text-primary py-2 mb-6" disabled>
          Resend email
        </Button>

        {/* Back to Login - Using semantic tokens */}
        <div className="text-center">
          <Link
            href="/auth/login"
            className="text-primary hover:text-primary/80 text-sm font-medium flex items-center justify-center gap-1"
          >
            ← Back to Login
          </Link>
        </div>
      </div>

      {/* Support Link - Using semantic tokens */}
      <div className="text-center mt-6 text-sm text-muted-foreground">
        Need help?{" "}
        <a href="#" className="text-primary hover:text-primary/80">
          Contact support
        </a>
      </div>
    </div>
  )
}
