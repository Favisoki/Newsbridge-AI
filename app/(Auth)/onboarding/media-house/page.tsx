"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useToast from "@/app/hooks/useToast";
import { useMediaSignup } from "@/app/api/auth/mutations";
import { saveSignupData } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import Logo from "@/components/Common/Logo";
import GoBack from "@/components/Common/go-back";
import AuthWrapper from "@/components/Layouts/auth-wrapper";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

function SuccessModal({ name, isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
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
        <h2 className="text-2xl font-bold text-center text-foreground mb-2">
          Thank you {name}
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Your request has been submitted for review. You'll receive an email
          once your access is approved.
        </p>
        <button
          onClick={onClose}
          className="w-full px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
}

export default function MediaHouseOnboarding() {
  const { setSignupData } = useAuth();
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    organizationName: "",
    workEmail: "",
    focusArea: "",
    organizationType: "",
    focusArea2: "",
    country: "",
    city: "",
    website: "",
    termsAccepted: false,
    authorizationAccepted: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { errorToastHandler } = useToast();

  const { mutate: mediaSignup, isPending: loading } = useMediaSignup(
    (errMsg) => errorToastHandler(errMsg),
    (success, data) => {
      if (data) {
        console.log(data?.data);
        saveSignupData(data?.data as Partial<unknown>);
        setSignupData(data?.data as Partial<unknown>);
        setShowSuccessModal(true);
      }
    }
  );

  const focusAreaOptions = [
    { id: 1, name: "Investigative Journalism" },
    { id: 2, name: "Breaking News" },
    { id: 3, name: "Community Reports" },
    { id: 4, name: "Feature Stories" },
    { id: 5, name: "Opinion/Analysis" },
  ];
  const organizationTypeOptions = [
    "Traditional Media House",
    "Online News Platform",
    "Broadcast Station",
    "Independent Publisher",
    "News Aggregator",
  ];
  const countries = [
    "Nigeria",
  ];
  const cities: Record<string, string[]> = {
    Nigeria: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.organizationName.trim())
      newErrors.organizationName = "Organization name is required";
    if (!formData.workEmail.trim())
      newErrors.workEmail = "Work email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail))
      newErrors.workEmail = "Invalid email";
    if (!formData.focusArea) newErrors.focusArea = "Focus area is required";
    if (!formData.organizationType)
      newErrors.organizationType = "Organization type is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms";
    if (!formData.authorizationAccepted)
      newErrors.authorizationAccepted =
        "Authorization confirmation is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setSubmitError("");

      const coverages = [];

      const selectedFocusArea = focusAreaOptions.find(
        (option) => option.id === Number(formData.focusArea)
      );

      if (selectedFocusArea) {
        coverages.push({ name: selectedFocusArea.name });
      }

      if (formData.focusArea2) {
        const selectedFocusArea2 = focusAreaOptions.find(
          (option) => option.id === Number(formData.focusArea2)
        );
        if (selectedFocusArea2) {
          coverages.push({ name: selectedFocusArea2.name });
        }
      }
      // Generate dynamic IDs: [1, 2, 3, ...]
      // const coverageIds = coverages.map((_, index) => index + 1);

      mediaSignup({
        organisation_name: formData.organizationName,
        email: formData.workEmail,
        coverages,
        // coverageIds,
        organisation_type: formData.organizationType,
        country: formData.country,
        city: formData.city,
        website: formData.website,
        agree_terms: formData.termsAccepted,
        agree_request_access: formData.authorizationAccepted,
      });
    } else {
      setErrors(newErrors);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    router.push("/");
  };

  return (
    <>
      <div className="w-full max-w-3xl mt-24">
        {/* Back Link */}
        <div className="mb-8 ">
          <GoBack iconSize={18} to="/" />
        </div>

        <AuthWrapper>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Tell us about Yourself
            </h1>
            <p className="text-muted-foreground text-lg">
              We need some basic information to get started
            </p>
          </div>

          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Organization Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Organization Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Media House Name
                </label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  placeholder="Your organization name"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                    errors.organizationName
                      ? "border-destructive bg-red-50"
                      : "border-input bg-background hover:border-primary/50 focus:border-primary"
                  }`}
                  disabled={loading}
                />
                {errors.organizationName && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.organizationName}
                  </p>
                )}
              </div>

              {/* Work Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Work Email
                </label>
                <input
                  type="email"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleChange}
                  placeholder="editor@dailytrust.com"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                    errors.workEmail
                      ? "border-destructive bg-red-50"
                      : "border-input bg-background hover:border-primary/50 focus:border-primary"
                  }`}
                  disabled={loading}
                />
                {errors.workEmail && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.workEmail}
                  </p>
                )}
              </div>
            </div>

            {/* Focus Area and Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Focus Area / Coverage Type
                </label>
                <select
                  name="focusArea"
                  value={formData.focusArea}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                    errors.focusArea
                      ? "border-destructive bg-red-50"
                      : "border-input bg-background hover:border-primary/50 focus:border-primary"
                  }`}
                  disabled={loading}
                >
                  <option value="">Select</option>
                  {focusAreaOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                {errors.focusArea && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.focusArea}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Organization Type
                </label>
                <select
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                    errors.organizationType
                      ? "border-destructive bg-red-50"
                      : "border-input bg-background hover:border-primary/50 focus:border-primary"
                  }`}
                  disabled={loading}
                >
                  <option value="">Select</option>
                  {organizationTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.organizationType && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.organizationType}
                  </p>
                )}
              </div>
            </div>

            {/* Second Focus Area */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Focus Area / Coverage Type
              </label>
              <select
                name="focusArea2"
                value={formData.focusArea2}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background hover:border-primary/50 focus:border-primary transition-colors focus:outline-none disabled:opacity-50"
                disabled={loading}
              >
                <option value="">Select</option>
                {focusAreaOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                    errors.country
                      ? "border-destructive bg-red-50"
                      : "border-input bg-background hover:border-primary/50 focus:border-primary"
                  }`}
                  disabled={loading}
                >
                  <option value="">Select</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.country}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  City
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                    errors.city
                      ? "border-destructive bg-red-50"
                      : "border-input bg-background hover:border-primary/50 focus:border-primary"
                  }`}
                  disabled={loading}
                >
                  <option value="">Select</option>
                  {formData.country &&
                    cities[formData.country as keyof typeof cities]?.map(
                      (city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      )
                    )}
                </select>
                {errors.city && (
                  <p className="text-destructive text-xs mt-1">{errors.city}</p>
                )}
              </div>
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Website (Optional)
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
                className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background hover:border-primary/50 focus:border-primary transition-colors focus:outline-none disabled:opacity-50"
                disabled={loading}
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  id="terms"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 accent-primary"
                  disabled={loading}
                />
                <label htmlFor="terms" className="text-sm text-foreground">
                  I agree to NewsBridge's Terms of Use and Privacy Policy
                </label>
              </div>
              {errors.termsAccepted && (
                <p className="text-destructive text-xs">
                  {errors.termsAccepted}
                </p>
              )}

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="authorizationAccepted"
                  id="authorization"
                  checked={formData.authorizationAccepted}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 accent-primary"
                  disabled={loading}
                />
                <label
                  htmlFor="authorization"
                  className="text-sm text-foreground"
                >
                  I confirm that I am authorized to request access on behalf of
                  this media organization
                </label>
              </div>
              {errors.authorizationAccepted && (
                <p className="text-destructive text-xs">
                  {errors.authorizationAccepted}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit request"}
              </button>
            </div>
          </form>
        </AuthWrapper>
      </div>
    </>
  );
}
