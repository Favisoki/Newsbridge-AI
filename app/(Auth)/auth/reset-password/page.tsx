"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Check } from "lucide-react"

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [password, setPassword] = useState("")

  const criteria = [
    { label: "Lowercase character e.g a,b,c", met: /[a-z]/.test(password) },
    { label: "Uppercase character e.g A,B,C", met: /[A-Z]/.test(password) },
    { label: "Non-alphanumeric character e.g @,!,#", met: /[^a-zA-Z0-9]/.test(password) },
    { label: "Numeric character e.g 1,2,3", met: /[0-9]/.test(password) },
  ]

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
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Reset Password</h1>
        <p className="text-gray-600 text-center mb-8 text-sm">Please enter a password you can remember</p>

        <form className="space-y-6">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">New Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Password Criteria */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">Password Criteria</p>
            {criteria.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${item.met ? "bg-green-100" : "bg-gray-100"}`}
                >
                  {item.met && <Check className="w-3 h-3 text-green-600" />}
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Repeat Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Repeat Password</label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2">Reset</Button>
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
