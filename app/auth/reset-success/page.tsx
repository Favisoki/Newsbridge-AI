"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image"
import AuthWrapper from "@/components/Layouts/auth-wrapper";
import GradientButton from "@/components/ui/gradient-button";
import { useRouter } from "next/navigation";

export default function ResetSuccessPage() {
  const router = useRouter()
  return (
    <div className="w-full max-w-md">
      <AuthWrapper>
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className=" relative w-22 h-22 rounded-full flex items-center justify-center">
            <Image src={"/success-check.png"} alt="success" fill/>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-[#1E1E1E] tracking-[-1.5] mb-4 text-center">
          Password Reset Successfully
        </h1>
        <p className="text-[#00000099] font-normal tracking-[-1] text-center mb-8">
          Please log into your account
        </p>

        {/* Login Button */}
        <GradientButton btnText={"Login"} onClick={() => router.push("/auth/login")} />
      </AuthWrapper>
    </div>
  );
}
