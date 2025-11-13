"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import useToast from "@/app/hooks/useToast";
import { useSendResetEmail } from "@/app/api/auth/mutations";
import CheckEmail from "@/public/check-email.svg";
import Image from "next/image"
import { Mail } from "lucide-react";
import GradientButton from "@/components/ui/gradient-button";
import GoBack from "@/components/Common/go-back";
import AuthWrapper from "@/components/Layouts/auth-wrapper";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { errorToastHandler } = useToast();
  const [createLink, setCreateLink] = useState(null);

  const { mutate, isPending: loading } = useSendResetEmail(
    (errMsg) => errorToastHandler(errMsg),
    (_, data) => {
      if (data?.status === 200 && data?.data?.detail) {
        setCreateLink(data?.data?.reset_link);
        setSuccess(true);
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

  const timer = "00:30"

  return (
    <div className="w-full max-w-lg">
      <AuthWrapper>
        {success ? (
          <>
            <h1 className="text-2xl font-semibold text-[#1E1E1E] tracking-[-1.5] mb-4 text-center">
              Forgot Password
            </h1>
            <p className="text-[#00000099] font-normal tracking-[-1] text-center mb-8">
              We'll send you a Verification code
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email */}
              <div>
                <label className="block text-base font-medium text-[#27272A] mb-2">
                  Email Address
                </label>
                <div className="flex items-center rounded-2xl py-2 px-4 border border-[#e5e7eb]">
                  <Mail className="size-6 text-[#39474F]/65" />
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className={
                      "w-full border-none shadow-none font-[poppins] !ring-0 placeholder:text-[#ADADAD]/70 placeholder:font-normal placeholder:text-base"
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <GradientButton
                btnText={loading ? "Sending..." : "Send Verification Code"}
                disabled={loading}
              />
            </form>
          </>
        ) : (
          <div className="text-center px-2">
            <div className="mb-6">
              <div className="flex items-center justify-center mx-auto">
                <Image
                  src={CheckEmail}
                  alt="Check email"
                  width={84}
                  height={84}
                />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-[#1E1E1E] tracking-[-1.5] mb-4 text-center">
              Check your Email
            </h1>
             <p className="text-[#00000099] font-normal tracking-[-1] text-center leading-[150%] text-base">
                We sent a verification link to <span className="font-bold mr-1">{email || "youremail@gmail.com"}.</span>
                Please verify your email address
              </p>
              <div>

            <p className="text-[#39474F] text-xl tracking-[-1.9] mt-7 mb-4">
             {timer}
            </p>
            <GradientButton btnText={"Resend Email"} />
              </div>
            <Link
              className="text-xs font-semibold text-blue-500 mb-2"
              href={createLink ?? "#"}
            >
              Click to continue
            </Link>
          </div>
        )}

        {/* Back to Login */}
        <div className="mt-8">
          <GoBack
            iconSize={18}
            btnText="Back to Login"
            className="text-lg"
            to="/auth/login"
          />
        </div>
      </AuthWrapper>
    </div>
  );
}
