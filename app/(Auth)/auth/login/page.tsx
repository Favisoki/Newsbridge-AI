"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogin, useSetToken } from "@/app/api/auth/mutations";
import useToast from "@/app/hooks/useToast";
import { useAuth } from "@/context/auth-context";
import GoBack from "@/components/Common/go-back";
import GradientButton from "@/components/ui/gradient-button";
import AuthWrapper from "@/components/Layouts/auth-wrapper";
import CustomInput from "@/components/ui/custom-input";

const style = {
  input:
    "w-full border-none shadow-none font-[poppins] !ring-0 placeholder:text-[#ADADAD]/70 placeholder:font-normal placeholder:text-base",
};

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const emailCriteria = [
    {
      label: "Valid email format",
      met: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
    },
  ];

  const passwordCriteria = [
    {
      label: "At least 6 characters",
      met: formData.password.length >= 6,
    },
  ];

  const { errorToastHandler, successToastHandler } = useToast();
  const { mutate: setToken } = useSetToken();

  const { mutate: login, isPending } = useLogin(
    (errMsg) => {
      errorToastHandler(errMsg);
      setError(errMsg);
    },
    (_, data) => {
      if (data?.status === 200 && data?.data?.access && data?.data?.user) {
        // Set the user in context
        setUser(data?.data.user);

        // Set the token in cookies via API route
        setToken(
          {
            token: data?.data.access,
            refresh: data?.data.refresh,
            user: data?.data.user,
          },
          {
            onSuccess: () => {
              console.log(" Cookies set successfully");
              router.refresh();
              // Small delay to ensure cookies are set
              setTimeout(
                () => router.push("/dashboard?msg=login-success"),
                200
              );
            },
            onError: (error) => {
              console.error("Failed to set cookies:", error);
              errorToastHandler(
                "Authentication setup failed. Please try logging in again."
              );
            },
          }
        );
      }
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Email validation
    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password validation
    if (!formData.password) {
      setError("Password is required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    login(payload);
  };

  return (
    <div className="w-full max-w-lg">
      <GoBack className="mb-8" />
      <AuthWrapper>
        <h1 className="text-2xl font-semibold text-[#1E1E1E] tracking-[-1.5] mb-4 text-center">
          Welcome Back
        </h1>
        <p className="text-[#00000099] font-normal tracking-[-1] text-center mb-8">
          Sign in to continue to Newbridge
        </p>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <CustomInput
            type={"text"}
            label="New Password"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={undefined}
            disabled={isPending}
            name={"email"}
          />

          {/* Password */}
          <CustomInput
            type={"password"}
            label="New Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            error={undefined}
            disabled={isPending}
            name={"password"}
          />

          {/* Forgot Password Link */}
          <div className="text-left w-full">
            <Link
              href="/auth/forgot-password"
              className="text-base font-medium tracking-[-1] text-[#192D65] hover:text-[#2148A2] transition-colors duration-300"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <GradientButton
            btnText={isPending ? "Logging in..." : "Log in"}
            borderColor="#213670"
            disabled={isPending}
          />
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-[#3754A3] text-base mt-6 font-semibold tracking-[-1] underline underline-offset-3 hover:text-[#2148A2] transition-colors duration-300">
          <Link href="/auth/signup">
            Don't have an account? Become a reporter
          </Link>
        </p>
      </AuthWrapper>
    </div>
  );
}
