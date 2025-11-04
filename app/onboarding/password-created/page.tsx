"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PasswordCreated() {
  return (
    <div className="w-full max-w-md">
      <div className="flex justify-center mb-8">
        <Image src="/images/newbridge-logo.png" alt="Newbridge" width={40} height={40} />
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} className="text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Password Created Successfully</h1>
        <p className="text-gray-600 mb-8">Let's continue setting up your account</p>

        <Link href="/onboarding/journalist-profile">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
            Continue Setup
          </Button>
        </Link>
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
