"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"

export default function MediaHouseSuccess() {
  const router = useRouter()

  return (
    <div className="w-full max-w-2xl">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">NB</span>
        </div>
      </div>

      {/* Success Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Thank you for applying</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Your media house request has been submitted for review. You'll receive an email once your access is approved.
        </p>

        {/* Action Button */}
        <button
          onClick={() => router.push("/")}
          className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
        >
          Back to Homepage
        </button>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-sm">
        <span className="text-muted-foreground">Need help? </span>
        <Link href="#" className="text-primary font-semibold hover:underline">
          Contact support
        </Link>
      </div>
    </div>
  )
}
