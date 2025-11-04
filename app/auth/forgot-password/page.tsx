"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ForgotPasswordPage() {
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Forgot Password</h1>
        <p className="text-gray-600 text-center mb-8 text-sm">We'll send you a verification code</p>

        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
            <Input type="email" placeholder="your.email@example.com" className="w-full" />
          </div>

          {/* Submit Button */}
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2">Send Verification Code</Button>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-6">
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
