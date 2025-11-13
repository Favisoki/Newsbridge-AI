"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    try {
      console.log("[v0] Submitting waitlist email:", email)

      // Call backend API - using the existing invite-onboard endpoint
      // This can be updated to a dedicated /waitlist/ endpoint once available
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://newsbridge-backend.onrender.com"}/invite-onboard/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            source: "waitlist", // Flag to identify waitlist signups
          }),
        },
      )

      console.log("[v0] Waitlist response status:", response.status)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to join waitlist")
      }

      setIsSuccess(true)
      setEmail("")

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (err) {
      console.error("[v0] Waitlist submission error:", err)
      setError(err instanceof Error ? err.message : "Failed to join waitlist. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
    <div className="absolute inset-0">
          <Image
            src="/images/background-bridge.png"
            alt="Bridge background"
            fill
            className="object-cover"
            priority
          />
        </div>
      <div className="w-full max-w-3xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image
            src={"/images/logo.png"}
            width={28}
            height={25}
            alt={"Logo"}
          />
          <span className="text-lg font-semibold text-[#3C60AF]">
            NewsBridge
          </span>
        </Link>
      </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance">
            AI-Powered Story Sourcing for Modern Newsrooms
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            NewsBridge helps journalists uncover verified stories shared by citizens through WhatsApp. Using AI
            translation and cultural context detection, it transforms raw reports into insights that power inclusive
            journalism across Africa.
          </p>
        </div>

        {/* Waitlist Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-3 items-start">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="w-5 h-5" />
              </div>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isSuccess}
                className="pl-10 h-12 text-base"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || isSuccess || !email}
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              {isLoading ? "Joining..." : "Join"}
            </Button>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-800">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{"You're on the list! We'll notify you when NewsBridge launches."}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </form>

        {/* Illustration */}
        <div className="mt-12 max-w-xl mx-auto">
          <Image
            src="/images/design-mode/Desktop%20-%2020.png"
            alt="Journalist with microphones illustration"
            width={600}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  )
}
