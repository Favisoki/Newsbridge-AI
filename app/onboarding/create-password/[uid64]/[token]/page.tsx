"use client";

import type React from "react";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Eye, EyeOff } from "lucide-react";
import { useCreatePassword, useSetToken } from "@/app/api/auth/mutations";
import useToast from "@/app/hooks/useToast";
import { useAuth } from "@/app/context/auth-context";

export default function CreatePasswordPage() {
  const params = useParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [passwords, setPasswords] = useState({
    password1: "",
    password2: "",
  });
  const { setUser } = useAuth();

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

  const { errorToastHandler, successToastHandler } = useToast();
  const { mutate: setToken } = useSetToken((err) =>
    errorToastHandler("failed to set access token!")
  );

  const {
    mutate: createPassword,
    isPending,
    data: dataInfo,
  } = useCreatePassword(
    (errMsg) => {
      if (errMsg.includes("status code 400")) {
        errorToastHandler("Token is invalid or expired");
        return;
      }
      errorToastHandler(errMsg);
    },
    async (_, data) => {
      if (data?.status === 200 && data?.data?.access && data?.data?.user) {
        setUser(data?.data.user);
        setToken({
          token: data?.data.access,
          user: data?.data.user,
        });
        // Redirect after storing cookie
        router.refresh();
        setTimeout(() => router.push("/onboarding/password-created"), 100);
      }
    }
  );

  const uid64 = params.uid64 as string;
  const token = params.token as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (passwords.password1 !== passwords.password2) {
      setError("Passwords do not match");
      return;
    }

    if (passwords.password1.length < 8) {
      setError("Password must be at least 8 characters");
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
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
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
          Create Your Password
        </h1>
        <p className="text-gray-600 text-center mb-8 text-sm">
          Set a strong password to secure your Newbridge account
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className="w-full pr-10"
                value={passwords.password1}
                onChange={(e) =>
                  setPasswords({ ...passwords, password1: e.target.value })
                }
                required
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Password Criteria
            </label>
            <div className="space-y-2">
              {criteria.map((item, index) => (
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full pr-10"
                value={passwords.password2}
                onChange={(e) =>
                  setPasswords({ ...passwords, password2: e.target.value })
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
            disabled={isPending}
          >
            {isPending ? "Creating Password..." : "Create Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
