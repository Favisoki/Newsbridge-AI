"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function TellUsAboutYourself() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    role: "",
    motivation: "",
    agreeToTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-center mb-8">
        <Image src="/images/newbridge-logo.png" alt="Newbridge" width={40} height={40} />
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm mb-8 inline-flex items-center gap-1">
          ← Back Home
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tell us about Yourself</h1>
        <p className="text-gray-600 mb-8">We need some basic information to get started</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <Input
                type="text"
                name="firstName"
                placeholder="your name@example.com"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <Input
                type="text"
                name="lastName"
                placeholder="your name@example.com"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <Input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
              <Input
                type="tel"
                name="phone"
                placeholder="+234"
                value={formData.phone}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Country</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="Kenya">Kenya</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Accra">Accra</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <Input
              type="text"
              name="role"
              placeholder="e.g. Reporter, Photographer, Editor"
              value={formData.role}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Why you want to join NewsBridge</label>
            <textarea
              name="motivation"
              placeholder="Enter Reason"
              value={formData.motivation}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300"
            />
            <label className="text-sm text-gray-600">I agree to NewsBridge's Terms of Use and Privacy Policy</label>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
            Submit request
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
