"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { apiClient } from "@/lib/former-api-client"

export default function ResetPasswordPage() {
  const params = useParams()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwords, setPasswords] = useState({
    password1: "",
    password2: "",
  })

  const uid64 = params.uid64 as string
  const token = params.token as string

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (passwords.password1 !== passwords.password2) {
      setError("Passwords do not match")
      return
    }

    if (passwords.password1.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setLoading(true)
    try {
      const response = await apiClient.resetPassword(uid64, token, passwords)
      if (response.success) {
        router.push("/auth/reset-success")
      } else {
        setError(response.error || "Failed to reset password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

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
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Reset Your Password</h1>
        <p className="text-gray-600 text-center mb-8 text-sm">Enter your new password below</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">New Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full pr-10"
                value={passwords.password1}
                onChange={(e) => setPasswords({ ...passwords, password1: e.target.value })}
                required
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Confirm Password</label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full pr-10"
                value={passwords.password2}
                onChange={(e) => setPasswords({ ...passwords, password2: e.target.value })}
                required
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
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  )
}
