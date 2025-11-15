"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from 'lucide-react'
import Image from "next/image"
import { apiClient } from "@/lib/api-client"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes("@")) {
      setMessage({ type: "error", text: "Please enter a valid email address" })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      await apiClient.submitWaitlist(email)
      setMessage({ 
        type: "success", 
        text: "Thank you for joining! We'll be in touch soon." 
      })
      setEmail("")
      
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: "Something went wrong. Please try again." 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] relative overflow-hidden">
      {/* Background Bridge Illustrations */}
      <div className="absolute left-0 top-1/3 w-1/4 opacity-30">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-bridge-k3CZWHxuIFK0esxR7praB0iXqMsrwz.png"
          alt=""
          width={300}
          height={200}
          className="w-full"
        />
      </div>
      <div className="absolute right-0 top-1/3 w-1/4 opacity-30 scale-x-[-1]">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-bridge-k3CZWHxuIFK0esxR7praB0iXqMsrwz.png"
          alt=""
          width={300}
          height={200}
          className="w-full"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo */}
        <div className="mb-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#4A6CF7] rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold text-[#4A6CF7]">NewsBridge</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#1F2937] mb-6 max-w-4xl leading-tight">
          AI-Powered Story Sourcing for Modern Newsrooms
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-center text-[#6B7280] mb-10 max-w-3xl leading-relaxed">
          NewsBridge helps journalists uncover verified stories shared by citizens through WhatsApp.
          Using AI translation and cultural context detection, it transforms raw reports into insights that
          power inclusive journalism across Africa.
        </p>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md mb-8">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="your-email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="h-12 px-8 bg-[#4A6CF7] hover:bg-[#3B5BDB] text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Joining..." : "Join"}
            </Button>
          </div>

          {/* Success/Error Message */}
          {message && (
            <div
              className={`mt-4 p-3 rounded-lg text-sm text-center ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}
        </form>

        {/* Reporter Illustration */}
        <div className="w-full max-w-lg mt-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/reporter-woman-Actc2y25nPW9ntaWE4tuBGx2Oe5sVt.png"
            alt="Journalist with microphones"
            width={500}
            height={300}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  )
}
