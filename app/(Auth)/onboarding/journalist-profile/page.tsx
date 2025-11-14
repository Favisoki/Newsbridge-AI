"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import Image from "next/image";
import { X, CheckCircle, User, PhoneCall } from "lucide-react";
import { getSignupData } from "@/lib/utils";
import { useUpdateUser } from "@/app/api/auth/mutations";
import useToast from "@/app/hooks/useToast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useDraft } from "@/app/hooks/useSaveDraft";
import CustomInput from "@/components/ui/custom-input";
import CustomSelect, { SelectOption } from "@/components/ui/custom-select";
import AuthWrapper from "@/components/Layouts/auth-wrapper";
import GoBack from "@/components/Common/go-back";
import GradientButton from "@/components/ui/gradient-button";

export default function JournalistProfile() {
  const { signupData, user } = useAuth();
  const localStorageBackup = getSignupData();
  const existingData = user || signupData || localStorageBackup;
  const router = useRouter();

  // Helper function to normalize data from array of objects to array of strings
  const normalizeToArray = (data: any): string[] => {
    if (!data) return [];
    if (Array.isArray(data)) {
      return data.map((item) => (typeof item === "string" ? item : item.name));
    }
    if (typeof data === "object" && data.name) {
      return [data.name];
    }
    return [];
  };

  const hasFreshUserData = Boolean(user || signupData);

  const initialData = useRef({
    firstName: existingData?.first_name || existingData?.firstName || "",
    lastName: existingData?.last_name || existingData?.lastName || "",
    email: existingData?.email || "",
    phone: existingData?.phone_number || existingData?.phone || "",
    country: existingData?.country || "Nigeria",
    city: existingData?.city || "Lagos",
    coverages: normalizeToArray(existingData?.coverages),
    regions: normalizeToArray(existingData?.regions),
    languages: normalizeToArray(existingData?.languages),
  });

  const {
    data: formData,
    setData: setFormData,
    clearDraft,
    hasDraft,
    isLoading: isDraftLoading,
  } = useDraft({
    key: "journalist-profile-draft",
    initialData: initialData.current,
    enabled: true,
    onSave: (data) => {
      console.log("✅ Draft saved successfully:", data);
    },
    onLoad: (data) => {
      console.log("✅ Draft loaded successfully:", data);
    },
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { errorToastHandler, successToastHandler } = useToast();

  const {
    mutate: updateUser,
    isPending,
    data: dataInfo,
  } = useUpdateUser(
    (errMsg) => {
      errorToastHandler(dataInfo?.data.detail || errMsg);
    },
    (_, data) => {
      clearDraft();
      router.push("/dashboard?msg=firsttime-signup");
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: typeof formData) => ({
      ...prev,
      [name]: value,
    }));
  };

  // For dropdowns - returns a function that updates formData
  const handleDropdownChange = (name: string) => (value: string) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleCoverage = (coverage: string) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      coverages: (prev.coverages || []).includes(coverage)
        ? (prev.coverages || []).filter((c: string) => c !== coverage)
        : [...(prev.coverages || []), coverage],
    }));
  };

  const toggleRegion = (region: string) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      regions: (prev.regions || []).includes(region)
        ? (prev.regions || []).filter((r: string) => r !== region)
        : [...(prev.regions || []), region],
    }));
  };

  const toggleLanguage = (language: string) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      languages: (prev.languages || []).includes(language)
        ? (prev.languages || []).filter((l: string) => l !== language)
        : [...(prev.languages || []), language],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const changedFields: any = {};

    for (const key in formData) {
      const current = formData[key as keyof typeof formData];
      const initial = initialData.current[key as keyof typeof formData];

      if (JSON.stringify(current) !== JSON.stringify(initial)) {
        changedFields[key] = current;
      }
    }

    if (changedFields.languages) {
      changedFields.languages = changedFields.languages.map(
        (lang: string, index: number) => ({ id: index, name: lang })
      );
    }

    if (changedFields.coverages) {
      changedFields.coverages = changedFields.coverages.map(
        (coverage: string, index: number) => ({ id: index, name: coverage })
      );
    }

    if (changedFields.regions) {
      changedFields.regions = changedFields.regions.map(
        (region: string, index: number) => ({ id: index, name: region })
      );
    }

    console.log("📤 Submitting changed fields:", changedFields);
    updateUser({ data: changedFields, id: existingData?.id });
  };

  // Dropdown options
  const countryOptions: SelectOption[] = [
    { value: "Nigeria", label: "Nigeria" },
    { value: "Ghana", label: "Ghana" },
    { value: "Kenya", label: "Kenya" },
  ];

  const cityOptions: SelectOption[] = [
    { value: "Abuja", label: "Abuja" },
    { value: "Lagos", label: "Lagos" },
    { value: "Accra", label: "Accra" },
  ];

  const getPrefferedStyles = (formData: any[], data: string) => {
    return `px-4 py-2 rounded-lg border transition-colors ${
      (formData || []).includes(data)
        ? "border-[#3754A3]/50 bg-[#3754A3]/5 text-[#3754A3]"
        : "border-[#e5e7eb] text-gray-600 hover:border-[#3754A3]/30"
    } disabled:opacity-50 disabled:cursor-not-allowed`;
  };

  if (isDraftLoading) {
    return (
      <div className="w-full max-w-2xl flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-5xl my-24">
      <div className="mb-8">
        <GoBack iconSize={18} to="/" />
      </div>
      <AuthWrapper>
        <div className="absolute top-14 right-7">
          {hasDraft && (
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Draft saved
            </span>
          )}
        </div>
        <div className="w-full text-center my-4">
          <h1 className="text-2xl font-semibold text-black tracking-[-1.5] mb-4">
            Welcome to NewsBridge {formData.firstName}
          </h1>
          <p className="text-[#00000099] font-normal tracking-[-1.3] mb-8">
            Let's set up your journalist profile.
          </p>
        </div>
        <div className="absolute left-1 w-[99%] mx-auto border-b border-[#F1F1F1]" />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <CustomInput
              Icon={User}
              name="firstName"
              type="text"
              label="First Name"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isPending}
            />

            <CustomInput
              Icon={User}
              name="lastName"
              type="text"
              label="Last Name"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              disabled={isPending}
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomInput
              name="email"
              type="email"
              label="Email Address"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isPending}
            />

            <CustomInput
              Icon={PhoneCall}
              name="phone"
              type="tel"
              label="Phone Number"
              placeholder="+234"
              value={formData.phone}
              onChange={handleChange}
              disabled={isPending}
            />
          </div>

          {/* Country & City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomSelect
              name="country"
              label="Country"
              placeholder="Select Country"
              value={formData.country}
              onChange={handleDropdownChange("country")}
              options={countryOptions}
              disabled={isPending}
            />

            <CustomSelect
              name="city"
              label="City"
              placeholder="Select City"
              value={formData.city}
              onChange={handleDropdownChange("city")}
              options={cityOptions}
              disabled={isPending}
            />
          </div>

          <div className="grid grid-cols-2 justify-between gap-4 gap-y-8 my-12 tracking-[-1]">
            {/* Preferred coverages */}
            <div>
              <label className="block text-base font-medium text-[#27272A] mb-3">
                Preferred coverages
              </label>
              <div className="flex flex-wrap gap-2">
                {["General", "Politics", "Economics"].map((coverage) => (
                  <button
                    key={coverage}
                    type="button"
                    onClick={() => toggleCoverage(coverage)}
                    disabled={isPending}
                    className={getPrefferedStyles(formData.coverages, coverage)}
                  >
                    {coverage}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred reporting region */}
            <div>
              <label className="block text-base font-medium text-[#27272A] mb-3">
                Preferred reporting region
              </label>
              <div className="flex flex-wrap gap-2">
                {["North", "West", "East", "South"].map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => toggleRegion(region)}
                    disabled={isPending}
                    className={getPrefferedStyles(formData.regions, region)}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred reporting language */}
            <div>
              <label className="block text-base font-medium text-[#27272A] mb-3">
                Preferred reporting language
              </label>
              <div className="flex flex-wrap gap-2">
                {["English", "Hausa", "Yoruba"].map((language) => (
                  <button
                    key={language}
                    type="button"
                    onClick={() => toggleLanguage(language)}
                    disabled={isPending}
                    className={getPrefferedStyles(formData.languages, language)}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <GradientButton
            type="submit"
            disabled={isPending}
            classes="w-[244px] tracking-[-1]"
            btnText={isPending ? "Saving..." : "Save & Continue to Dashboard"}
          />
        </form>
      </AuthWrapper>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center relative">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="flex justify-center mb-6">
              <CheckCircle size={64} className="text-green-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Profile Updated!
            </h2>
            <p className="text-gray-600 mb-8">
              Your profile has been successfully updated.
            </p>

            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
            >
              Continue to Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
