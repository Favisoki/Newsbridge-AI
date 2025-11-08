"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { apiClient } from "@/lib/api-client"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface SuccessModalProps {
  firstName: string
  onClose: () => void
}

function SuccessModal({ firstName, onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 border-4 border-blue-500">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse" />
            <CheckCircle2 className="w-16 h-16 text-green-500 relative z-10" />
          </div>
        </div>

        <h2 className="text-center text-xl font-bold text-gray-900 mb-2">Thank you, {firstName}</h2>

        <p className="text-center text-gray-600 mb-8">
          Your request has been submitted for review. You'll receive an email once your access is approved
        </p>

        <Button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
        >
          Back to Homepage
        </Button>
      </div>
    </div>
  )
}

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

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.agreeToTerms) {
      setError("Please fill in all required fields and agree to the terms")
      return
    }

    setIsLoading(true)

    try {
      const response = await apiClient.journalistSignup({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phone,
        country: formData.country,
        city: formData.city,
        role: formData.role,
        why_join: formData.motivation,
        agree_terms: formData.agreeToTerms,
        // Required fields per API documentation
        languages: [{ name: "English" }], // Default to English, will be enhanced with real data later
        coverages: [{ name: "General" }], // Default coverage, will be enhanced with real data later
      })

      if (response.success) {
        setShowSuccessModal(true)
      } else {
        const errorMessage = response.error || "Failed to submit request"
        if (errorMessage.includes("Failed to fetch") || errorMessage.includes("Network error")) {
          setError(
            "Unable to connect to the server. This may be due to CORS restrictions or network issues. Please ensure the backend server at https://newsbridge-backend.onrender.com is running and properly configured to allow requests from this domain.",
          )
        } else {
          setError(errorMessage)
        }
      }
    } catch (err) {
      console.error("[v0] Submission error:", err)
      if (err instanceof TypeError && err.message.includes("fetch")) {
        setError(
          "Network connection failed. Please check: 1) Your internet connection, 2) The backend server is accessible, 3) CORS is properly configured on the backend server.",
        )
      } else {
        setError("An unexpected error occurred. Please try again or contact support.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleModalClose = () => {
    setShowSuccessModal(false)
    window.location.href = "/"
  }

  return (
    <>
      {showSuccessModal && <SuccessModal firstName={formData.firstName} onClose={handleModalClose} />}

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

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full"
                  required
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
                  disabled={isLoading}
                  className="w-full"
                  required
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                disabled={isLoading}
                className="w-4 h-4 rounded border-gray-300"
                required
              />
              <label className="text-sm text-gray-600">I agree to NewsBridge's Terms of Use and Privacy Policy</label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Submitting..." : "Submit request"}
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
    </>
  )
}
