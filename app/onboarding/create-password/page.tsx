"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Eye, EyeOff, Check } from "lucide-react"
import Image from "next/image"

export default function CreatePassword() {
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const criteria = [
    { label: "Lowercase character e.g a,b,c", met: /[a-z]/.test(password) },
    { label: "Uppercase character e.g A,B,C", met: /[A-Z]/.test(password) },
    { label: "Non-alphanumeric character e.g @,!,#", met: /[^a-zA-Z0-9]/.test(password) },
    { label: "Numeric character e.g 1,2,3", met: /[0-9]/.test(password) },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password creation
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-center mb-8">
        <Image src="/images/newbridge-logo.png" alt="Newbridge" width={40} height={40} />
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create password</h1>
        <p className="text-gray-600 mb-8">Create your password to complete your account setup.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Password Criteria</label>
            <div className="space-y-2">
              {criteria.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      item.met ? "bg-green-500 border-green-500" : "border-gray-300"
                    }`}
                  >
                    {item.met && <Check size={14} className="text-white" />}
                  </div>
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Repeat Password</label>
            <div className="relative">
              <Input
                type={showRepeatPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showRepeatPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
            Create password
          </Button>
        </form>
      </div>

      <div className="text-center mt-6 text-sm text-gray-600">
        <span>Need help? </span>
        <a href="#" className="text-blue-600 hover:text-blue-700">
          Contact support
        </a>
      </div>
    </div>
  )
}
