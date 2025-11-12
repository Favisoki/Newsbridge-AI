"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Check } from "lucide-react";
import { useLogin, useSetToken } from "@/app/api/auth/mutations";
import useToast from "@/app/hooks/useToast";
import { useAuth } from "@/app/context/auth-context";
import Logo from "@/components/Common/Logo";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth()

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
              setTimeout(() => router.push("/dashboard?msg=login-success"), 200);
            },
            onError: (error) => {
              console.error("Failed to set cookies:", error);
              errorToastHandler("Authentication setup failed. Please try logging in again.");
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
    <div className="w-full max-w-md">
      {/* Logo */}
      <Logo />

      {/* Card */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-8">
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
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="your.email@example.com"
              className="w-full"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              disabled={isPending}
            />
          </div>

          {/* Email Criteria - Only show if user started typing */}
          {formData.email && (
            <div>
              <div className="space-y-2">
                {emailCriteria.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        item.met
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {item.met && <Check size={14} className="text-white" />}
                    </div>
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pr-10"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                disabled={isPending}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Password Criteria - Only show if user started typing */}
          {formData.password && (
            <div>
              <div className="space-y-2">
                {passwordCriteria.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        item.met
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {item.met && <Check size={14} className="text-white" />}
                    </div>
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
            disabled={isPending}
          >
            {isPending ? "Signing in..." : "Log in"}
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Become a reporter
          </Link>
        </p>
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
