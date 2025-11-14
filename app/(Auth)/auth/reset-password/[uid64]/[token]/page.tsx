"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, CheckCircle2Icon, CircleX, Eye, EyeOff, X } from "lucide-react";
import useToast from "@/app/hooks/useToast";
import { useResetEmail } from "@/app/api/auth/mutations";
import AuthWrapper from "@/components/Layouts/auth-wrapper";
import GradientButton from "@/components/ui/gradient-button";
import CustomInput from "@/components/ui/custom-input";

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [passwords, setPasswords] = useState({
    password1: "",
    password2: "",
  });
  const { errorToastHandler } = useToast();
  const { mutate: resetPassword, isPending: loading } = useResetEmail(
    (errMsg) => errorToastHandler(errMsg),
    (_, data) => {
      if (data?.data) {
        router.push("/auth/reset-success");
      }
    }
  );

  const criteria = [
    {
      label: "Lowercase character e.g a,b,c",
      met: /[a-z]/.test(passwords.password1),
    },
    {
      label: "Uppercase character e.g A,B,C",
      met: /[A-Z]/.test(passwords.password1),
    },
    {
      label: "Non-alphanumeric character e.g @,!,#",
      met: /[^a-zA-Z0-9]/.test(passwords.password1),
    },
    {
      label: "Numeric character e.g 1,2,3",
      met: /[0-9]/.test(passwords.password1),
    },
  ];

  const allCriteriaMet = criteria.every((condition) => condition.met);
  const isDisabled =
    !allCriteriaMet || !passwords.password1 || !passwords.password2 || loading;

  const uid64 = params.uid64 as string;
  const token = params.token as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.password1 !== passwords.password2) {
      errorToastHandler("Passwords do not match");
      setError("Passwords do not match");
      return;
    }

    if (!allCriteriaMet) {
      errorToastHandler("Password must meet all criteria");
      return;
    }

    resetPassword({ data: passwords, uid64, token });
  };

  return (
    <div className="w-full max-w-lg">
      {/* Logo */}
      <AuthWrapper>
        <h1 className="text-2xl font-semibold text-[#1E1E1E] tracking-[-1.5] mb-4 text-center">
          Reset Password
        </h1>
        <p className="text-[#00000099] font-normal tracking-[-1.3] text-center mb-8">
          Please enter a password you can remember
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password */}
          <CustomInput
            name="password1"
            type="password"
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
          />

          {/* Password Criteria */}
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
            name="password2"
            type="password"
            label="Confirm Password"
            placeholder="Confirm password"
            value={passwords.password2}
            onChange={(e) => {
              setPasswords({ ...passwords, password2: e.target.value });
              setError("");
            }}
            showPassword={showConfirm}
            onTogglePassword={() => setShowConfirm(!showConfirm)}
            error={passwords.password2 && error}
          />

          {/* Submit Button */}
          <GradientButton
            disabled={isDisabled}
            type="submit"
            btnText={loading ? "Resetting..." : "Reset Password"}
          />
        </form>
      </AuthWrapper>
    </div>
  );
}
