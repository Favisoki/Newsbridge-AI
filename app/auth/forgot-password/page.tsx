"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import useToast from "@/app/hooks/useToast";
import { useSendResetEmail } from "@/app/api/auth/mutations";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { errorToastHandler, successToastHandler } = useToast();
  const [createLink, setCreateLink] = useState(null)


  const { mutate, isPending: loading } = useSendResetEmail(
    (errMsg) => errorToastHandler(errMsg),
    (_, data) => {
      if (data?.status === 200 && data?.data?.detail) {
        setCreateLink(data?.data?.reset_link)
        setSuccess(true)
      }
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setError("");
    mutate({ email });
  };

  return (
    <div className="w-full max-w-md">
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
        {!success ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Forgot Password
            </h1>
            <p className="text-gray-600 text-center mb-8 text-sm">
              We'll send you a verification code
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Submit Button */}
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Verification Code"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Check your email
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-gray-600 text-xs mb-6">
              Check your spam folder if you don't see it in your inbox.
              </p>
              <p className="text-xs text-gray-700 mb-2">until sending emails have been embedded, click the link below to create password</p>
              <Link className="text-xs font-semibold text-blue-500 mb-2" href={createLink ?? "#"}>Click to continue</Link>
          </div>
        )}

        {/* Back to Login */}
        <div className="text-center mt-6">
          <Link
            href="/auth/login"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center gap-1"
          >
            ← Back to Login
          </Link>
        </div>
      </div>

      {/* Support Link */}
      <div className="text-center mt-6 text-sm text-gray-600">
        Need help?{" "}
        <a
          href="mailto:info@newsbridge.com"
          className="text-blue-600 hover:text-blue-700"
        >
          Contact support
        </a>
      </div>
    </div>
  );
}
