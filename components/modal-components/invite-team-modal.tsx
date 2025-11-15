"use client";

import { useState } from "react";
import GradientButton from "../ui/gradient-button";
import CustomInput from "../ui/custom-input";
import CustomSelect from "../ui/custom-select";
import { useInviteJournalist } from "@/app/api/auth/mutations";
import useToast from "@/app/hooks/useToast";

export function InviteTeam({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { errorToastHandler, successToastHandler } = useToast();
  
  const { mutate: inviteJournalist, isPending } = useInviteJournalist(
    (errMsg) => {
      console.log(errMsg)
      errorToastHandler(errMsg || "Failed to send invite");
      onClose();
        // Reset form
        setEmail("");
        setRole("");
    },
    (_, data) => {
      if (data?.data) {
        successToastHandler("Invite sent successfully");
        onClose();
        // Reset form
        setEmail("");
        setRole("");
      }
    }
  );

  const disabled = !role || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorToastHandler("Invalid email format");
      return;
    }
    
    // Validate role
    if (!role) {
      errorToastHandler("Please select a role");
      return;
    }

    const payload = {
      journalists_email: email,
    };
    
    inviteJournalist({ data: payload });
  };

  const roleOptions = [
    { label: "Journalist", value: "journalist" },
    { label: "Reporter", value: "reporter" },
    { label: "Correspondent", value: "correspondent" },
    { label: "Editor", value: "editor" },
  ];

  return (
    <div className="tracking-[-1]">
      {/* Content */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <CustomInput
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="team-member@example.com"
          disabled={isPending}
        />
        <CustomSelect
          name="role"
          value={role}
          options={roleOptions}
          onChange={(value: string) => {
            setRole(value);
          }}
          label="Role"
          placeholder="Select role"
          disabled={isPending}
        />

        <div className="flex justify-between gap-3 py-4">
          <GradientButton
            type="submit"
            disabled={isPending || disabled}
            btnText={isPending ? "Sending..." : "Send Invite"}
          />
        </div>
      </form>
    </div>
  );
}