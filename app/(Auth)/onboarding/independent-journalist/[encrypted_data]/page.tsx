"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useToast from "@/app/hooks/useToast";
import { useMediaJournalistSignup } from "@/app/api/auth/mutations";
import { saveSignupData } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { useParams, useRouter } from "next/navigation";

export default function TellUsAboutYourselfNow() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    role: "",
    motivation: "",
    agreeToTerms: false,
  });

  const { errorToastHandler } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { setSignupData } = useAuth();
  const params = useParams();
  const router = useRouter();
  const encrypted_data = params?.encrypted_data as string;

  const {
    mutate: createMediaHouseJournalist,
    isPending,
    data: dataInfo,
  } = useMediaJournalistSignup(
    (errMsg) => {
      errorToastHandler(dataInfo?.data.detail || errMsg);
    },
    (_, data) => {
      if (data) {
        console.log(data?.data);
        saveSignupData(data?.data as Partial<unknown>);
        setSignupData(data?.data as Partial<unknown>);
        router.push("/onboarding/create-password");
      }
    }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (!formData.city) {
      newErrors.city = "City is required";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must accept the terms";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear any previous errors
    setErrors({});

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: formData.phone,
      country: formData.country,
      city: formData.city,
      role: formData.role,
      why_join: formData.motivation,
      agree_terms: formData.agreeToTerms,
      languages: [{ name: "English" }],
      coverages: [{ name: "General" }],
    };

    createMediaHouseJournalist({ data: payload, encrypted_data });
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-center mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image src={"/images/logo.png"} width={28} height={25} alt={"Logo"} />
          <span className="text-lg font-semibold text-[#3C60AF]">
            NewsBridge
          </span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 text-sm mb-8 inline-flex items-center gap-1"
        >
          ← Back Home
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tell us about Yourself
        </h1>
        <p className="text-gray-600 mb-8">
          We need some basic information to get started
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
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                  errors.firstName
                    ? "border-red-500 bg-red-50"
                    : "border-input bg-background hover:border-primary/50 focus:border-primary"
                }`}
                disabled={isPending}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <Input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                  errors.lastName
                    ? "border-red-500 bg-red-50"
                    : "border-input bg-background hover:border-primary/50 focus:border-primary"
                }`}
                disabled={isPending}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
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
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                  errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-input bg-background hover:border-primary/50 focus:border-primary"
                }`}
                disabled={isPending}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone number
              </label>
              <Input
                type="tel"
                name="phone"
                placeholder="+234"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                  errors.phone
                    ? "border-red-500 bg-red-50"
                    : "border-input bg-background hover:border-primary/50 focus:border-primary"
                }`}
                disabled={isPending}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
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
                className={`w-full px-4 py-2 border-2 rounded-lg transition-colors focus:outline-none ${
                  errors.country
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                }`}
                disabled={isPending}
              >
                <option value="">Select Country</option>
                <option value="Nigeria">Nigeria</option>
              </select>
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-4 py-2 border-2 rounded-lg transition-colors focus:outline-none ${
                  errors.city
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                }`}
                disabled={isPending}
              >
                <option value="">Select</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Accra">Accra</option>
              </select>
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <Input
              type="text"
              name="role"
              placeholder="e.g. Reporter, Photographer, Editor"
              value={formData.role}
              onChange={handleChange}
              className="w-full"
              disabled={isPending}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Why you want to join NewsBridge
            </label>
            <textarea
              name="motivation"
              placeholder="Enter Reason"
              value={formData.motivation}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isPending}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300"
                disabled={isPending}
              />
              <label className="text-sm text-gray-600">
                I agree to NewsBridge's Terms of Use and Privacy Policy
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Submitting..." : "Submit request"}
          </Button>
        </form>
      </div>

      <div className="text-center mt-6 text-sm text-gray-600">
        <span>Need help? </span>
        <a href="#" className="text-blue-600 hover:text-blue-700">
          Contact support
        </a>
      </div>
    </div>
  );
}
