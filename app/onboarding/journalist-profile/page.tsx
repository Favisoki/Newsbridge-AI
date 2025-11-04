"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"
import { X, CheckCircle } from "lucide-react"

export default function JournalistProfile() {
  const [formData, setFormData] = useState({
    firstName: "Addams",
    lastName: "Brown",
    email: "your.email@example.com",
    phone: "+2348082237898",
    country: "Nigeria",
    city: "Abuja",
    regions: ["North"],
    languages: ["English"],
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleRegion = (region: string) => {
    setFormData((prev) => ({
      ...prev,
      regions: prev.regions.includes(region) ? prev.regions.filter((r) => r !== region) : [...prev.regions, region],
    }))
  }

  const toggleLanguage = (language: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccessModal(true)
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-center mb-8">
        <Image src="/images/newbridge-logo.png" alt="Newbridge" width={40} height={40} />
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to NewsBridge {formData.firstName}</h1>
        <p className="text-gray-600 mb-8">Let's set up your journalist profile.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
              <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full" />
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
                <option value="Abuja">Abuja</option>
                <option value="Lagos">Lagos</option>
                <option value="Accra">Accra</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Preferred reporting region</label>
            <div className="flex flex-wrap gap-2">
              {["North", "East", "West"].map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => toggleRegion(region)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    formData.regions.includes(region)
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Preferred reporting language</label>
            <div className="flex flex-wrap gap-2">
              {["English", "Hausa", "Yoruba"].map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => toggleLanguage(language)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    formData.languages.includes(language)
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
            Save & Continue to Dashboard
          </Button>
        </form>
      </div>

      <div className="text-center mt-6 text-sm text-gray-600">
        <span>Need help? </span>
        <a href="#" className="text-blue-600 hover:text-blue-700">
          Contact support
        </a>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center relative">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="flex justify-center mb-6">
              <CheckCircle size={64} className="text-green-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you, {formData.firstName}</h2>
            <p className="text-gray-600 mb-8">
              Your request has been submitted for review. You'll receive an email once your access is approved
            </p>

            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
            >
              Back to Homepage
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
