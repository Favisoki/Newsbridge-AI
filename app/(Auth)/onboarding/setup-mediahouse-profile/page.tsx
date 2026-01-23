"use client";

import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { X, User, Mail, Phone } from "lucide-react";
import Logo from "@/components/Common/Logo";
import { useAuth } from "@/context/auth-context";
import { getSignupData } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useToast from "@/app/hooks/useToast";
import { useUpdateUser } from "@/app/api/auth/mutations";
import { useDraft } from "@/app/hooks/useSaveDraft";

export default function MediaHouseSetup() {
  const { user, signupData } = useAuth();
  const localStorageBackup = getSignupData();
  const existingData = user || signupData || localStorageBackup;
  const router = useRouter();
  const [isDataReady, setIsDataReady] = useState(false);
  const hasInitialized = useRef(false); // Prevent re-initialization

  // Use useMemo to recalculate when existingData changes
  const initialData = useMemo(
    () => ({
      fullName: "",
      email: "",
      role: "",
      phone: "",
      id: existingData?.id,
      invitedEmails: [] as string[],
    }),
    [existingData?.id]
  );

  // Use the draft hook
  const {
    data: formData,
    setData: setFormData,
    clearDraft,
    hasDraft,
    isLoading: isDraftLoading,
  } = useDraft({
    key: "media-house-setup-draft",
    initialData: initialData,
    enabled: true,
    onSave: (data) => {
      console.log("📝 Media house draft saved:", data);
    },
    onLoad: (data) => {
      console.log("📂 Media house draft loaded:", data);
    },
  });

  const { errorToastHandler } = useToast();

  // ONE-TIME sync of ID when component mounts or when ID becomes available
  useEffect(() => {
    if (hasInitialized.current) return; // Already initialized

    if (existingData?.id && !formData?.id) {
      console.log("🔄 Initial sync of ID to formData:", existingData.id);
      setFormData((prev) => ({
        ...prev,
        id: existingData.id,
        fullName:
          prev?.fullName ||
          existingData?.full_name ||
          existingData?.fullName ||
          "",
        email: prev?.email || existingData?.email || "",
        role: prev?.role || existingData?.role || "",
        phone:
          prev?.phone ||
          existingData?.phone_number ||
          existingData?.phone ||
          "",
      }));
      hasInitialized.current = true;
    } else if (formData?.id) {
      hasInitialized.current = true;
    }
  }, [existingData?.id, formData?.id]); // Remove setFormData and existingData from dependencies

  // Mark data as ready when we have both formData and ID
  useEffect(() => {
    if (formData?.id) {
      setIsDataReady(true);
    }
  }, [formData?.id]); // Only depend on the ID

  const {
    mutate: updateUser,
    isPending,
    data: dataInfo,
  } = useUpdateUser(
    (errMsg) => {
      errorToastHandler(dataInfo?.data?.detail || errMsg);
    },
    (_, data) => {
      if (data?.data?.id) {
        console.log("✅ User updated successfully, clearing draft");
        clearDraft();
        router.push("/dashboard?msg=firsttime-signup");
      }
    }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeEmail = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      invitedEmails: prev.invitedEmails.filter((_, i) => i !== index),
    }));
  };

  const addEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const emailInput = e.currentTarget;
    const email = emailInput.value.trim();

    if (e.key === "Enter" && email) {
      e.preventDefault();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errorToastHandler("Please enter a valid email address");
        return;
      }

      if (formData.invitedEmails.includes(email)) {
        errorToastHandler("This email has already been added");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        invitedEmails: [...prev.invitedEmails, email],
      }));

      emailInput.value = "";
    }
  };

  const handleSubmit = () => {
    console.log("🔍 Submitting with formData:", formData);

    if (!formData?.id) {
      errorToastHandler("User ID is missing. Please try logging in again.");
      router.push("/login");
      return;
    }

    if (!formData.fullName?.trim()) {
      errorToastHandler("Please enter your full name");
      return;
    }
    if (!formData.email?.trim()) {
      errorToastHandler("Please enter your email address");
      return;
    }
    if (!formData.role?.trim()) {
      errorToastHandler("Please enter your role");
      return;
    }

    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      role: formData.role,
      phone_number: formData.phone || "",
      invited_emails: formData.invitedEmails || [],
    };

    console.log("📤 Sending payload:", payload, "for user ID:", formData.id);
    updateUser({ data: payload, id: formData.id });
  };

  // Show loading state while data is loading
  if (isDraftLoading || !isDataReady) {
    return (
      <div className="min-h-screen bg-transparentflex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {isDraftLoading
              ? "Loading your workspace setup..."
              : "Preparing your data..."}
          </p>
        </div>
      </div>
    );
  }

  // Redirect to login if no user data exists
  if (!existingData?.id) {
    console.error("❌ No user data found, redirecting to login");
    errorToastHandler("Failed to load user data. Please log in again.");
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg border-2 shadow-sm p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome to NewsBridge Media House
              </h1>
              {hasDraft && (
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Draft saved
                </span>
              )}
            </div>
            <p className="text-gray-600">
              Add your team and confirm your contact details to complete your
              setup
            </p>
          </div>

          <div className="space-y-8">
            {/* Contact Person Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Person
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      name="fullName"
                      value={formData?.fullName || ""}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData?.email || ""}
                      onChange={handleChange}
                      placeholder="your_email@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData?.role || ""}
                    onChange={handleChange}
                    placeholder="e.g Reporter, Photojournalist, Editor"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone number{" "}
                    <span className="text-gray-400">(optional)</span>
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData?.phone || ""}
                      onChange={handleChange}
                      placeholder="08082280966"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Team Invitations Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Invite Team Members
              </h2>
              <p className="text-gray-700 mb-4">
                Invite your newsroom colleagues to join your workspace. They'll
                receive an email to create their accounts
              </p>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {(formData?.invitedEmails || []).map((email, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-full border border-gray-300 text-sm"
                    >
                      <span className="text-gray-700">{email}</span>
                      <button
                        onClick={() => removeEmail(index)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        type="button"
                        aria-label={`Remove ${email}`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  <input
                    type="email"
                    onKeyDown={addEmail}
                    placeholder="Type email and press Enter"
                    className="flex-1 min-w-[200px] px-3 py-2 bg-transparent outline-none text-sm placeholder:text-gray-400"
                  />
                </div>
              </div>

              {(formData?.invitedEmails?.length || 0) > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  {formData.invitedEmails.length} team member
                  {formData.invitedEmails.length !== 1 ? "s" : ""} invited
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isPending || !formData?.id}
              type="button"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-lg font-medium text-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Sending invites...
                </span>
              ) : (
                "Send Invites & Continue"
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <span>Need help? </span>
          <a href="#" className="text-blue-600 hover:text-blue-700 underline">
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
}
