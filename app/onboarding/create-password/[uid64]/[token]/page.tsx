"use client";

import type React from "react";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, CheckCircle2Icon, CircleX, Eye, EyeOff } from "lucide-react";
import { useCreatePassword, useSetToken } from "@/app/api/auth/mutations";
import useToast from "@/app/hooks/useToast";
import { useAuth } from "@/app/context/auth-context";
import AuthWrapper from "@/components/Layouts/auth-wrapper";
import GradientButton from "@/components/ui/gradient-button";
import CustomInput from "@/components/ui/custom-input";

export default function CreatePasswordPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [passwords, setPasswords] = useState({
    password1: "",
    password2: "",
  });
  const { setUser } = useAuth();

  const { errorToastHandler, successToastHandler } = useToast();
  const { mutate: setToken } = useSetToken((err) =>
    errorToastHandler("failed to set access token!")
  );

  const uid64 = params.uid64 as string;
  const token = params.token as string;
  const userType = searchParams.get("user_type") as string;

  const routeHandler = () => {
    const link =
      userType === "mediaHouse"
        ? "/onboarding/password-created?type=mediaHouse"
        : "/onboarding/password-created?type=journalist";
    return link;
  };

  const { mutate: createPassword, isPending } = useCreatePassword(
    (errMsg) => {
      if (errMsg.includes("status code 400")) {
        errorToastHandler(
          "Token is invalid or expired. Please request a new invitation."
        );
        return;
      }
      errorToastHandler(
        errMsg || "Failed to create password. Please try again."
      );
    },
    async (_, data) => {
      if (data?.status === 200 && data?.data?.access && data?.data?.user) {
        successToastHandler("Password created successfully!");

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
              console.log("Cookies set successfully");
              router.refresh();
              // Small delay to ensure cookies are set
              setTimeout(() => router.push(routeHandler()), 200);
            },
            onError: (error) => {
              console.error("Failed to set cookies:", error);
              errorToastHandler(
                "Authentication setup failed. Please try logging in."
              );
            },
          }
        );
      }
    }
  );

  const criteria = [
    {
      label: "Lowercase character e.g a,b,c",
      met: /[a-z]/.test(passwords?.password1),
    },
    {
      label: "Uppercase character e.g A,B,C",
      met: /[A-Z]/.test(passwords?.password1),
    },
    {
      label: "Non-alphanumeric character e.g @,!,#",
      met: /[^a-zA-Z0-9]/.test(passwords?.password1),
    },
    {
      label: "Numeric character e.g 1,2,3",
      met: /[0-9]/.test(passwords?.password1),
    },
  ];

  const allCriteriaMet = criteria.every((condition) => condition.met);
  const isDisabled =
    !allCriteriaMet ||
    !passwords.password1 ||
    !passwords.password2 ||
    isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (passwords.password1 !== passwords.password2) {
      setError("Passwords do not match");
      return;
    }

    const allCriteriaMet = criteria.every((c) => c.met);
    if (!allCriteriaMet) {
      setError("Password must meet all criteria");
      return;
    }

    createPassword({ data: passwords, uid64, token });
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-lg">
        <AuthWrapper>
          <h1 className="text-2xl font-semibold text-[#1E1E1E] tracking-[-1.5] mb-4 text-center">
            Create Password
          </h1>
          <p className="text-[#00000099] font-normal tracking-[-1.3] text-center mb-8">
            Create your password to complete your account setup.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password */}
            <CustomInput
              type={"password"}
              label="New Password"
              placeholder="Enter new password"
              value={passwords.password1}
              onChange={(e) => {
                setPasswords({ ...passwords, password1: e.target.value });
                setError("");
              }}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              error={undefined}
              name={"password1"}
            />

            <div className="space-y-2">
              <p className="text-base tracking-[-1] font-medium text-gray-900">
                Password Criteria
              </p>
              {criteria.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <CheckCircle2Icon
                    strokeWidth={1.5}
                    className={`w-7 h-7 ${
                      item.met ? `text-green-600` : `text-[#646464]`
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Confirm Password */}
            <CustomInput
              type={"password"}
              label="Confirm Password"
              placeholder="Enter new password"
              value={passwords.password2}
              onChange={(e) => {
                    setPasswords({ ...passwords, password2: e.target.value });
                    setError("");
                  }}
              showPassword={showConfirm}
              onTogglePassword={() => setShowConfirm(!showConfirm)}
              error={error}
              name={"password2"}
              disabled={isPending}
            />
           
            {/* Submit Button */}
            <GradientButton
              disabled={isDisabled}
              type="submit"
              btnText={isPending ? "Resetting..." : "Reset Password"}
            />
          </form>
        </AuthWrapper>
      </div>
    </div>
  );
}
