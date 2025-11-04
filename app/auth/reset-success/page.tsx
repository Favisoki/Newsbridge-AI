"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function ResetSuccessPage() {
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
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Password Reset Successfully</h1>
        <p className="text-gray-600 text-center mb-8 text-sm">Please log into your account</p>

        {/* Login Button */}
        <Link href="/auth/login">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2">Login</Button>
        </Link>
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
