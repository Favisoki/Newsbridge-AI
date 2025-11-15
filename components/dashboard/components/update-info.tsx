"use client";

import { useUpdateUser } from "@/app/api/auth/mutations";
import useToast from "@/app/hooks/useToast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomInput from "@/components/ui/custom-input";
import GradientButton from "@/components/ui/gradient-button";
import { useAuth } from "@/context/auth-context";
import { PhoneCallIcon, User2, Mail } from "lucide-react";
import { useState, useEffect } from "react";

const UpdateInfo = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    phone: "",
  });
  const { errorToastHandler, successToastHandler } = useToast();

  const { mutate: updateUser, isPending } = useUpdateUser(
    (errMsg) => errorToastHandler(errMsg || "Failed to update user"),
    (_, data) => {
      successToastHandler("User update success");
    }
  );

  // Populate form with user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
        email: user.email || "",
        role: user.role || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

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

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate full name
    if (!formData.fullName || formData.fullName.trim().length === 0) {
      newErrors.fullName = "Full name is required";
    }

    // Validate phone (optional but should be valid if provided)
    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Split full name into first and last name
    const nameParts = formData.fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const payload = {
      id: user?.id || 0,
      email: formData.email,
      first_name: firstName,
      last_name: lastName,
      role: formData.role,
      phone: formData.phone,
      user_type: user?.user_type || "journalist",
    };

    updateUser({ data: payload, id: user?.id });
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Personal information</CardTitle>
        <CardDescription>Update your information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              name="fullName"
              Icon={User2}
              type="text"
              label="Full Name"
              placeholder="John Doe"
              value={formData?.fullName}
              onChange={handleChange}
              error={errors.fullName}
              disabled={isPending}
            />

            <CustomInput
              name="email"
              Icon={Mail}
              type="email"
              label="Email Address"
              placeholder="your.email@example.com"
              value={formData?.email}
              onChange={handleChange}
              error={errors.email}
              disabled={isPending}
            />

            <CustomInput
              name="role"
              Icon={User2}
              type="text"
              label="Role"
              placeholder="Reporter"
              value={formData?.role}
              onChange={handleChange}
              error={errors.role}
              disabled={isPending}
            />

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

            <div className="col-span-1 md:col-span-2">
              <GradientButton
                btnText={isPending ? "Saving..." : "Save Changes"}
                classes="mt-4 w-full md:w-[166px]"
                disabled={isPending}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateInfo;
