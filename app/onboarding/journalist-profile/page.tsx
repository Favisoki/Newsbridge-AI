"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import Image from "next/image";
import { X, CheckCircle } from "lucide-react";
import { getSignupData } from "@/lib/utils";
import { useUpdateUser } from "@/app/api/auth/mutations";
import useToast from "@/app/hooks/useToast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";
import { useDraft } from "@/app/hooks/useSaveDraft";

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
    coverages: normalizeToArray(existingData?.coverages), // General, Politics, Economics
    regions: normalizeToArray(existingData?.regions), // ✅ NEW: North, West, East, South
    languages: normalizeToArray(existingData?.languages),
  });

  // ✅ Use the draft hook - always enabled for saving
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

  // For coverages (General, Politics, Economics)
  const toggleCoverage = (coverage: string) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      coverages: (prev.coverages || []).includes(coverage)
        ? (prev.coverages || []).filter((c: string) => c !== coverage)
        : [...(prev.coverages || []), coverage],
    }));
  };

  //  For regions (North, West, East, South)
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

    // Transform arrays into objects for backend
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

    //  Transform regions into objects for backend
    if (changedFields.regions) {
      changedFields.regions = changedFields.regions.map(
        (region: string, index: number) => ({ id: index, name: region })
      );
    }

    console.log("📤 Submitting changed fields:", changedFields);
    updateUser({ data: changedFields, id: existingData?.id });
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
    <div className="w-full max-w-2xl">
      <div className="flex justify-center mb-8">
        <Image
          src="/images/newbridge-logo.png"
          alt="Newbridge"
          width={40}
          height={40}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to NewsBridge {formData.firstName}
          </h1>
          {hasDraft && (
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Draft saved
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-8">
          Let's set up your journalist profile.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone number
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="Kenya">Kenya</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Abuja">Abuja</option>
                <option value="Lagos">Lagos</option>
                <option value="Accra">Accra</option>
              </select>
            </div>
          </div>

          {/* ✅ Preferred coverages (General, Politics, Economics) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Preferred coverages
            </label>
            <div className="flex flex-wrap gap-2">
              {["General", "Politics", "Economics"].map((coverage) => (
                <button
                  key={coverage}
                  type="button"
                  onClick={() => toggleCoverage(coverage)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    (formData.coverages || []).includes(coverage)
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {coverage}
                </button>
              ))}
            </div>
          </div>

          {/* ✅ Preferred reporting region (North, West, East, South) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Preferred reporting region
            </label>
            <div className="flex flex-wrap gap-2">
              {["North", "West", "East", "South"].map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => toggleRegion(region)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    (formData.regions || []).includes(region)
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* ✅ Preferred reporting language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Preferred reporting language
            </label>
            <div className="flex flex-wrap gap-2">
              {["English", "Hausa", "Yoruba"].map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => toggleLanguage(language)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    (formData.languages || []).includes(language)
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save & Continue to Dashboard"}
          </Button>
        </form>
      </div>

      <div className="text-center mt-6 text-sm text-gray-600">
        <span>Need help? </span>
        <a href="#" className="text-blue-600 hover:text-blue-700">
          Contact support
        </a>
      </div>

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