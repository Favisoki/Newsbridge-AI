"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

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
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-600 text-center mb-8">Sign in to continue to Newbridge</p>

        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
            <Input type="email" placeholder="your.email@example.com" className="w-full" />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2">Log in</Button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-medium">
            Become a reporter
          </Link>
        </p>
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
