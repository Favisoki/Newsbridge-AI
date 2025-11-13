"use client"

import { Suspense } from "react";
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation";
import GradientButton from "@/components/ui/gradient-button";
import AuthWrapper from "@/components/Layouts/auth-wrapper";

function PasswordCreatedContent() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const userType = searchParams.get("type");
  const routeLink =
    userType === "mediaHouse"
      ? "/onboarding/setup-mediahouse-profile"
      : "/onboarding/journalist-profile";

  return (
    <div className="min-h-screen w-full max-w-lg place-content-center place- p-4">
      <AuthWrapper>
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className=" relative w-22 h-22 rounded-full flex items-center justify-center">
            <Image src={"/success-check.png"} alt="success" fill/>
          </div>
        </div>

         <h1 className="text-2xl font-semibold text-[#1E1E1E] tracking-[-2] mb-4 text-center">
         Password Created Successfully
        </h1>
        <p className="text-[#00000099] font-normal tracking-[-1.2] text-center mb-8">
          Let's continue setting up your account
        </p>

        {/* Login Button */}
        <div className="flex justify-center">
        <GradientButton btnText={"Continue"} onClick={() => router.push(routeLink)} classes="w-[189px]" />
        </div>
        </AuthWrapper>
    </div>
  );
}

export default function PasswordCreated() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
      <PasswordCreatedContent />
    </Suspense>
  );
}