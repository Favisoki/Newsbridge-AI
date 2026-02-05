"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import useToast from "@/app/hooks/useToast";
import { useCreateIndependentJournalistAccount } from "@/app/api/auth/mutations";
import { PhoneCallIcon, User2, Link as LinkIcon } from "lucide-react";
import { saveSignupData } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import Modal from "@/components/ui/modal";
import RequestSuccess from "@/components/modal-components/request-success";
import AuthWrapper from "@/components/Layouts/auth-wrapper";
import GoBack from "@/components/Common/go-back";
import CustomInput from "@/components/ui/custom-input";
import CustomSelect, { SelectOption } from "@/components/ui/custom-select";
import CustomTextarea from "@/components/ui/custom-textarea";
import GradientButton from "@/components/ui/gradient-button";

const countryOptions: SelectOption[] = [
  { value: "Nigeria", label: "Nigeria" },
];

const cityOptions: SelectOption[] = [
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
  { value: "FCT", label: "FCT (Abuja)" },
  { value: "Gombe", label: "Gombe" },
  { value: "Imo", label: "Imo" },
  { value: "Jigawa", label: "Jigawa" },
  { value: "Kaduna", label: "Kaduna" },
  { value: "Kano", label: "Kano" },
  { value: "Katsina", label: "Katsina" },
  { value: "Kebbi", label: "Kebbi" },
  { value: "Kogi", label: "Kogi" },
  { value: "Kwara", label: "Kwara" },
  { value: "Lagos", label: "Lagos" },
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

export default function TellUsAboutYourself() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    role: "",
    motivation: "",
    portfolio: "",
    agreeToTerms: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { errorToastHandler } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { setSignupData } = useAuth();

  const {
    mutate: createJournalist,
    isPending,
    data: dataInfo,
  } = useCreateIndependentJournalistAccount(
    (errMsg) => {
      errorToastHandler(dataInfo?.data.detail || errMsg);
    },
    (_, data) => {
      if (data) {
        console.log(data?.data);
        saveSignupData(data?.data as Partial<unknown>);
        setSignupData(data?.data as Partial<unknown>);
        setIsModalOpen(true);
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

    createJournalist({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: formData.phone,
      country: formData.country,
      city: formData.city,
      role: formData.role,
      why_join: formData.motivation,
      portfolio: formData.portfolio,
      agree_terms: formData.agreeToTerms,
      languages: [{ name: "English" }],
      coverages: [{ name: "General" }],
    });
  };

  return (
    <div className="relative w-full max-w-5xl py-24">
      <div className="mb-8">
        <GoBack iconSize={18} to="/" />
      </div>
      <AuthWrapper>
        <h1 className="text-2xl font-semibold text-black tracking-[-1.5] my-4 text-left">
          Tell us about Yourself
        </h1>
        <p className="text-[#00000099] font-normal tracking-[-1.3] text-left mb-8">
          We need some basic information to get started
        </p>
        <div className="absolute left-1 w-[99%] mx-auto border-b border-[#F1F1F1]" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            {/* First Name - Using CustomInput */}
            <CustomInput
              name="firstName"
              Icon={User2}
              type="text"
              label="First Name"
              placeholder="John"
              value={formData?.firstName}
              onChange={handleChange}
              error={errors.firstName}
              disabled={isPending}
            />

            {/* Last Name - Using CustomInput */}
            <CustomInput
              name="lastName"
              Icon={User2}
              type="text"
              label="Last Name"
              placeholder="Doe"
              value={formData?.lastName}
              onChange={handleChange}
              error={errors.lastName}
              disabled={isPending}
            />

            {/* Email - Using CustomInput */}
            <CustomInput
              name="email"
              type="text"
              label="Email Address"
              placeholder="your.email@example.com"
              value={formData?.email}
              onChange={handleChange}
              error={errors.email}
              disabled={isPending}
            />

            {/* Phone - Using CustomInput */}
            <CustomInput
              name="phone"
              Icon={PhoneCallIcon}
              type="tel"
              label="Phone Number"
              placeholder="+234"
              value={formData?.phone}
              onChange={handleChange}
              error={errors.phone}
              disabled={isPending}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomSelect
              name="country"
              label="Country"
              placeholder="Select Country"
              value={formData.country}
              onChange={(value: string) => {
                setFormData((prev) => ({ ...prev, country: value }));
                if (errors.country) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.country;
                    return newErrors;
                  });
                }
              }}
              options={countryOptions}
              error={errors.country}
            />

            <CustomSelect
              name="city"
              label="City"
              placeholder="Select City"
              value={formData.city}
              onChange={(value: string) => {
                setFormData((prev) => ({ ...prev, city: value }));
                if (errors.city) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.city;
                    return newErrors;
                  });
                }
              }}
              options={cityOptions}
              error={errors.city}
            />
          </div>

          <CustomInput
            name="role"
            type="text"
            label="Role"
            placeholder="e.g. Reporter, Photographer, Editor"
            value={formData?.role}
            onChange={handleChange}
            error={errors.phone}
            disabled={isPending}
          />

          <CustomInput
            name="portfolio"
            type="url"
            Icon={LinkIcon}
            label="Portfolio Link (for review)"
            placeholder="https://yourportfolio.com"
            value={formData?.portfolio}
            onChange={handleChange}
            error={errors.portfolio}
            disabled={isPending}
          />
          <p className="text-xs text-[#00000066] -mt-4">
            Share a link to your portfolio or recent work. This helps us verify your experience and approve your account.
          </p>

          <CustomTextarea
            name="motivation"
            label="Why you want to join NewsBridge"
            placeholder="Tell us your motivation..."
            value={formData.motivation}
            onChange={handleChange}
            error={errors.motivation}
            rows={4}
            maxLength={500}
            disabled={isPending}
          />

          <div className="mb-9">
            <div className="flex items-center gap-2">
              <Input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300"
                disabled={isPending}
              />
              <label className="text-sm text-[#00000099] font-normal tracking-[-0.5]">
                I agree to NewsBridge's Terms of Use and Privacy Policy
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>
            )}
          </div>

          <GradientButton
            type="submit"
            disabled={isPending}
            classes="md:w-[208px]"
            btnText={isPending ? "Submitting..." : "Submit request"}
          />
        </form>
      </AuthWrapper>

      {isModalOpen && (
        <Modal
          size="xl"
          isOpen={isModalOpen}
          showCloseButton={false}
          closeOnOverlayClick={false}
          onClose={() => setIsModalOpen(false)}
        >
          <RequestSuccess name={dataInfo?.data?.first_name} />
        </Modal>
      )}
    </div>
  );
}
