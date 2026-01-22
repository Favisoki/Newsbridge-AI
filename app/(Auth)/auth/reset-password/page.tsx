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
        <h1 className="text-2xl font-bold text-foreground mb-2 text-center">Reset Password</h1>
        <p className="text-muted-foreground text-center mb-8 text-sm">Please enter a password you can remember</p>

        <form className="space-y-6">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Password Criteria - Using semantic tokens */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Password Criteria</p>
            {criteria.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${item.met ? "bg-chart-3/20" : "bg-muted"}`}
                >
                  {item.met && <Check className="w-3 h-3 text-chart-3" />}
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Repeat Password */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Repeat Password</label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button - Using semantic tokens */}
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2">Reset</Button>
        </form>

        {/* Back to Login - Using semantic tokens */}
        <div className="text-center mt-6">
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
