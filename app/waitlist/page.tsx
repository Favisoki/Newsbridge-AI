"use client";

import { useState } from "react";
import Image from "next/image";
import { useJoinWaitlist } from "../api/auth/mutations";
import useToast from "../hooks/useToast";
import Logo from "@/components/Common/Logo";
import CustomInput from "@/components/ui/custom-input";
import GradientButton from "@/components/ui/gradient-button";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const { errorToastHandler } = useToast();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const { mutate: joinTheWaitlist, isPending: isLoading } = useJoinWaitlist(
    (errMsg) => {
      errorToastHandler(errMsg || "Failed to join the wait list");
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
      setEmail("");
      setTimeout(() => setMessage(null), 7000);
    },
    (_, data) => {
      if (data?.data) {
        setMessage({
          type: "success",
          text: "Thank you for joining! We'll be in touch soon.",
        });
        setEmail("");
        setTimeout(() => setMessage(null), 7000);
      }
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }
    joinTheWaitlist({ data: email });
  };

  return (
    <div className="min-h-screen top-6 bg-[#F5F7FA] tracking-[-1] bg-[url('/waitlist-bg.png')] bg-no-repeat bg-cover relative overflow-hidden">
      {/* Background Bridge Illustrations */}
      <div className="absolute left-0 bottom-0 w-full">
        <Image
          src="/waitlist-design.png"
          alt="waitlist decor design"
          width={300}
          height={200}
          className="w-full object-[100%_80px]"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo */}
        <Logo textSize="text-2xl" height={40} width={40} className="mb-8" />

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-[-4] font-semibold text-center text-[#1E1E1E] mb-6 max-w-4xl leading-[130%]">
          AI-Powered Story Sourcing for Modern Newsrooms
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-center text-[#00000099] mb-6 max-w-3xl leading-relaxed">
          NewsBridge helps journalists uncover verified stories shared by
          citizens through WhatsApp. Using AI translation and cultural context
          detection, it transforms raw reports into insights that power
          inclusive journalism across Africa.
        </p>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md mb-8">
          <div className="flex items-center gap-3">
            <CustomInput
              type={"email"}
              label=""
              placeholder="your-email@example.com"
              value={email}
              inputClassName="bg-[#EFEFEF]/70  border border-[#D4D4D4]"
              onChange={(e) => setEmail(e.target.value)}
              error={undefined}
              name={"password1"}
            />

            <GradientButton
              disabled={isLoading}
              type="submit"
              classes="w-[113px] h-[30px] py-6.5 mt-2"
              btnText={isLoading ? "Joining..." : "Join"}
              borderColor="#8078FF"
            />
          </div>

          {/* Success/Error Message */}
          {message && (
            <div
              className={`mt-4 p-3 rounded-lg text-sm text-center ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}
        </form>

        {/* Reporter Illustration */}
        <div className="w-full max-w-lg mt-18 -z-10">
          <Image
            src="/waitlist-illustration.png"
            alt="Journalist with microphones"
            width={800}
            height={700}
            className="w-full h-auto scale-160 min-[1550px]:scale-180"
            priority
          />
        </div>
      </div>
    </div>
  );
}
