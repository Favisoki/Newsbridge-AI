"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignupPage() {
  return (
    <div className="w-full max-w-2xl">
      {/* Back Link */}
      <div className="mb-16">
        <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
          ← Back Home
        </Link>
      </div>

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
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Where journalists and media houses connect
        </h1>
        <p className="text-gray-600 text-center mb-12 text-sm">
          to verify, translate, and share real-time stories across Africa.
        </p>

        {/* Two Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Independent Journalists */}
          <div className="border-2 border-blue-200 rounded-lg p-6 hover:border-blue-400 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                👤
              </div>
              <h2 className="text-lg font-semibold text-gray-900">For Independent Journalists</h2>
            </div>
            <ul className="space-y-2 mb-6 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Discover real community stories</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Collaborate securely with contributors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Stay connected across regions</span>
              </li>
            </ul>
            <Link href="/onboarding/independent-journalists">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
            </Link>
          </div>

          {/* Media Houses */}
          <div className="border-2 border-yellow-300 rounded-lg p-6 hover:border-yellow-400 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-lg">
                🏢
              </div>
              <h2 className="text-lg font-semibold text-gray-900">For Media Houses</h2>
            </div>
            <ul className="space-y-2 mb-6 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>Discover real community stories</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>Collaborate securely with contributors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>Stay connected across regions</span>
              </li>
            </ul>
            <Link href="/onboarding/media-house">
              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm mt-8">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
