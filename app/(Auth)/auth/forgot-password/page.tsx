"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import useToast from "@/app/hooks/useToast"
import { useResendResetEmail, useSendResetEmail } from "@/app/api/auth/mutations"
import { useCountdownTimer } from "@/app/hooks/use-countdown-timer"
import CheckEmail from "@/public/check-email.svg"
import Image from "next/image"
import { Mail } from "lucide-react"
import GradientButton from "@/components/ui/gradient-button"
import GoBack from "@/components/Common/go-back"
import AuthWrapper from "@/components/Layouts/auth-wrapper"
import CustomInput from "@/components/ui/custom-input"

function ForgotPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailFromUrl = searchParams.get("email")
  const successFromUrl = searchParams.get("success") === "true"

  const [email, setEmail] = useState(emailFromUrl || "")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(successFromUrl)
  const { errorToastHandler, successToastHandler } = useToast()

  // Add countdown timer hook
  const { timeLeft, canResend, startTimer } = useCountdownTimer(30, "forgot-password-timer")

  // Initialize state from URL params
  useEffect(() => {
    if (emailFromUrl && successFromUrl) {
      setEmail(emailFromUrl)
      setSuccess(true)
    }
  }, [emailFromUrl, successFromUrl])

  const { mutate: sendResetEmail, isPending: loading } = useSendResetEmail(
    (errMsg) => errorToastHandler(errMsg),
    (_, data) => {
      if (data?.status === 200 && data?.data?.detail) {
        setSuccess(true)
        // Update URL with email and success params
        router.push(`/auth/forgot-password?email=${encodeURIComponent(email)}&success=true`)
        startTimer()
      }
    },
  )

  const { mutate: resendResetEmail, isPending: resending } = useResendResetEmail(
    (errMsg) => errorToastHandler(errMsg),
    (_, data) => {
      if (data?.status === 200 && data?.data?.detail) {
        successToastHandler("Verification Email Resent")
        startTimer()
      }
    },
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setError("Please enter your email address")
      errorToastHandler("Please enter your email address")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      errorToastHandler("Please enter a valid email address")
      return
    }

    setError("")
    sendResetEmail({ email })
  }

  const handleResend = () => {
    if (!canResend || resending) return
    resendResetEmail({ email })
  }

  return (
    <div className="w-full max-w-lg">
      <AuthWrapper>
        {!success ? (
          <>
            <h1 className="text-2xl font-semibold text-foreground tracking-[-1.5] mb-4 text-center">Forgot Password</h1>
            <p className="text-muted-foreground font-normal tracking-[-1] text-center mb-8">
              We'll send you a Verification code
            </p>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email */}
              <CustomInput
                type="email"
                label="Email Address"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                Icon={Mail}
                disabled={loading}
                name="email"
              />

              {/* Submit Button */}
              <GradientButton
                btnText={loading ? "Sending..." : "Send Verification Code"}
                disabled={loading}
                type="submit"
              />
            </form>
          </>
        ) : (
          <div className="text-center px-2">
            <div className="mb-6">
              <div className="flex items-center justify-center mx-auto">
                <Image src={CheckEmail || "/placeholder.svg"} alt="Check email" width={84} height={84} />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-foreground tracking-[-1.5] mb-4 text-center">
              Check your Email
            </h1>
            <p className="text-muted-foreground font-normal tracking-[-1] text-center leading-[150%] text-base">
              We sent a verification link to <span className="font-bold mr-1">{email || "youremail@gmail.com"}.</span>
              Please verify your email address
            </p>
            <div>
              <p className="text-[#39474F] text-xl tracking-[-1.9] mt-7 mb-4">{timeLeft}</p>
              <GradientButton
                btnText={resending ? "Sending..." : "Resend Email"}
                disabled={!canResend || resending}
                onClick={handleResend}
                type="button"
              />
            </div>
          </div>
        )}

        {/* Back to Login */}
        <div className="mt-8">
          <GoBack iconSize={18} btnText="Back to Login" className="text-lg" to="/auth/login" />
        </div>
      </AuthWrapper>
    </div>
  )
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  )
}
