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
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">NB</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">Newbridge</span>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Email Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-4xl">✉️</div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Check Your Email</h1>
        <p className="text-gray-600 text-center mb-8 text-sm">
          We sent a verification link to <strong>your.email@gmail.com</strong>. Please verify your email address.
        </p>

        {/* Timer */}
        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-gray-900">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </p>
        </div>

        {/* Resend Button */}
        <Button className="w-full bg-blue-200 hover:bg-blue-300 text-blue-900 py-2 mb-6" disabled>
          Resend email
        </Button>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            href="/auth/login"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center gap-1"
          >
            ← Back to Login
          </Link>
        </div>
      </div>

      {/* Support Link */}
      <div className="text-center mt-6 text-sm text-gray-600">
        Need help?{" "}
        <a href="#" className="text-blue-600 hover:text-blue-700">
          Contact support
        </a>
      </div>
    </div>
  )
}
