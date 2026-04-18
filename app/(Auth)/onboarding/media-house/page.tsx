"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useToast from "@/app/hooks/useToast";
import { useMediaSignup } from "@/app/api/auth/mutations";
import { saveSignupData } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import AuthWrapper from "@/components/Layouts/auth-wrapper";
import GoBack from "@/components/Common/go-back";
import CustomInput from "@/components/ui/custom-input";
import CustomSelect, { SelectOption } from "@/components/ui/custom-select";
import CustomTextarea from "@/components/ui/custom-textarea";
import GradientButton from "@/components/ui/gradient-button";
import Modal from "@/components/ui/modal";
import RequestSuccess from "@/components/modal-components/request-success";
import { Input } from "@/components/ui/input";
import {
  Building2,
  Mail,
  Globe,
  Briefcase,
  LayoutGrid,
} from "lucide-react";

const countryOptions: SelectOption[] = [
  { value: "Nigeria", label: "Nigeria" },
];

const stateOptions: SelectOption[] = [
  { value: "FCT", label: "FCT (Abuja)" },
  { value: "Lagos", label: "Lagos" },
  { value: "Abia", label: "Abia" },
  { value: "Adamawa", label: "Adamawa" },
  { value: "Akwa Ibom", label: "Akwa Ibom" },
  { value: "Anambra", label: "Anambra" },
  { value: "Bauchi", label: "Bauchi" },
  { value: "Bayelsa", label: "Bayelsa" },
  { value: "Benue", label: "Benue" },
  { value: "Borno", label: "Borno" },
  { value: "Cross River", label: "Cross River" },
  { value: "Delta", label: "Delta" },
  { value: "Ebonyi", label: "Ebonyi" },
  { value: "Edo", label: "Edo" },
  { value: "Ekiti", label: "Ekiti" },
  { value: "Enugu", label: "Enugu" },
  { value: "Gombe", label: "Gombe" },
  { value: "Imo", label: "Imo" },
  { value: "Jigawa", label: "Jigawa" },
  { value: "Kaduna", label: "Kaduna" },
  { value: "Kano", label: "Kano" },
  { value: "Katsina", label: "Katsina" },
  { value: "Kebbi", label: "Kebbi" },
  { value: "Kogi", label: "Kogi" },
  { value: "Kwara", label: "Kwara" },
  { value: "Nasarawa", label: "Nasarawa" },
  { value: "Niger", label: "Niger" },
  { value: "Ogun", label: "Ogun" },
  { value: "Ondo", label: "Ondo" },
  { value: "Osun", label: "Osun" },
  { value: "Oyo", label: "Oyo" },
  { value: "Plateau", label: "Plateau" },
  { value: "Rivers", label: "Rivers" },
  { value: "Sokoto", label: "Sokoto" },
  { value: "Taraba", label: "Taraba" },
  { value: "Yobe", label: "Yobe" },
  { value: "Zamfara", label: "Zamfara" },
];

const focusAreaOptions: SelectOption[] = [
  { value: "Investigative Journalism", label: "Investigative Journalism" },
  { value: "Breaking News", label: "Breaking News" },
  { value: "Community Reports", label: "Community Reports" },
  { value: "Feature Stories", label: "Feature Stories" },
  { value: "Opinion/Analysis", label: "Opinion/Analysis" },
];

const organizationTypeOptions: SelectOption[] = [
  { value: "Traditional Media House", label: "Traditional Media House" },
  { value: "Online News Platform", label: "Online News Platform" },
  { value: "Broadcast Station", label: "Broadcast Station" },
  { value: "Independent Publisher", label: "Independent Publisher" },
  { value: "News Aggregator", label: "News Aggregator" },
];

export default function MediaHouseOnboarding() {
  const { setSignupData } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    workEmail: "",
    focusArea: "",
    organizationType: "",
    focusArea2: "",
    country: "Nigeria",
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
        saveSignupData(data?.data as Partial<unknown>);
        setSignupData(data?.data as Partial<unknown>);
        setIsModalOpen(true);
      }
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.organizationName.trim())
      newErrors.organizationName = "Organization name is required";
    if (!formData.workEmail.trim())
      newErrors.workEmail = "Work email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail))
      newErrors.workEmail = "Invalid email format";
    if (!formData.focusArea)
      newErrors.focusArea = "Focus area is required";
    if (!formData.organizationType)
      newErrors.organizationType = "Organization type is required";
    if (!formData.city)
      newErrors.city = "State is required";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms";
    if (!formData.authorizationAccepted)
      newErrors.authorizationAccepted = "Authorization confirmation is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const coverages: { name: string }[] = [];
    if (formData.focusArea) coverages.push({ name: formData.focusArea });
    if (formData.focusArea2) coverages.push({ name: formData.focusArea2 });

    mediaSignup({
      organisation_name: formData.organizationName,
      email: formData.workEmail,
      coverages,
      organisation_type: formData.organizationType,
      country: formData.country,
      city: formData.city,
      website: formData.website,
      agree_terms: formData.termsAccepted,
      agree_request_access: formData.authorizationAccepted,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <RequestSuccess onClose={handleCloseModal} />
      </Modal>

      <div className="w-full max-w-3xl mt-24">
        <div className="mb-8">
          <GoBack iconSize={18} to="/" />
        </div>

        <AuthWrapper>
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#1B1B1B] tracking-[-1.3] text-left">
            Tell us about your Organisation
          </h1>
          <p className="text-[#00000099] font-normal tracking-[-1.3] text-left mb-8">
            We need some basic information to get started
          </p>
          <div className="absolute left-1 w-[99%] mx-auto border-b border-[#F1F1F1]" />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
              {/* Organization Name */}
              <CustomInput
                name="organizationName"
                Icon={Building2}
                type="text"
                label="Media House Name"
                placeholder="Your organization name"
                value={formData.organizationName}
                onChange={handleChange}
                error={errors.organizationName}
                disabled={loading}
              />

              {/* Work Email */}
              <CustomInput
                name="workEmail"
                Icon={Mail}
                type="email"
                label="Work Email"
                placeholder="editor@dailytrust.com"
                value={formData.workEmail}
                onChange={handleChange}
                error={errors.workEmail}
                disabled={loading}
              />

              {/* Focus Area */}
              <CustomSelect
                name="focusArea"
                label="Focus Area / Coverage Type"
                placeholder="Select focus area"
                value={formData.focusArea}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, focusArea: value }));
                  if (errors.focusArea)
                    setErrors((prev) => { const n = { ...prev }; delete n.focusArea; return n; });
                }}
                options={focusAreaOptions}
                error={errors.focusArea}
                disabled={loading}
              />

              {/* Organization Type */}
              <CustomSelect
                name="organizationType"
                label="Organization Type"
                placeholder="Select type"
                value={formData.organizationType}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, organizationType: value }));
                  if (errors.organizationType)
                    setErrors((prev) => { const n = { ...prev }; delete n.organizationType; return n; });
                }}
                options={organizationTypeOptions}
                error={errors.organizationType}
                disabled={loading}
              />
            </div>

            {/* Second Focus Area */}
            <CustomSelect
              name="focusArea2"
              label="Secondary Focus Area (Optional)"
              placeholder="Select secondary focus area"
              value={formData.focusArea2}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, focusArea2: value }))
              }
              options={focusAreaOptions}
              disabled={loading}
            />

            {/* Country + State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomSelect
                name="country"
                label="Country"
                placeholder="Select Country"
                value={formData.country}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, country: value }))
                }
                options={countryOptions}
                disabled={true}
              />

              <CustomSelect
                name="city"
                label="State"
                placeholder="Search State"
                value={formData.city}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, city: value }));
                  if (errors.city)
                    setErrors((prev) => { const n = { ...prev }; delete n.city; return n; });
                }}
                options={stateOptions}
                error={errors.city}
                searchable={true}
                disabled={loading}
              />
            </div>

            {/* Website */}
            <CustomInput
              name="website"
              Icon={Globe}
              type="text"
              label="Website (Optional)"
              placeholder="https://yourwebsite.com"
              value={formData.website}
              onChange={handleChange}
              disabled={loading}
            />

            {/* Checkboxes */}
            <div className="space-y-4 mb-9">
              <div>
                <div className="flex items-center gap-2">
                  <Input
                    type="checkbox"
                    name="termsAccepted"
                    id="terms"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300"
                    disabled={loading}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-[#00000099] font-normal tracking-[-0.5]"
                  >
                    I agree to NewsBridge&apos;s Terms of Use and Privacy Policy
                  </label>
                </div>
                {errors.termsAccepted && (
                  <p className="text-red-500 text-xs mt-1">{errors.termsAccepted}</p>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Input
                    type="checkbox"
                    name="authorizationAccepted"
                    id="authorization"
                    checked={formData.authorizationAccepted}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300"
                    disabled={loading}
                  />
                  <label
                    htmlFor="authorization"
                    className="text-sm text-[#00000099] font-normal tracking-[-0.5]"
                  >
                    I confirm that I am authorized to request access on behalf of
                    this media organization
                  </label>
                </div>
                {errors.authorizationAccepted && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.authorizationAccepted}
                  </p>
                )}
              </div>
            </div>

            <GradientButton
              type="submit"
              disabled={loading}
              btnText={loading ? "Submitting..." : "Submit request"}
              variant="primary"
            />
          </form>
        </AuthWrapper>
      </div>
    </>
  );
}
