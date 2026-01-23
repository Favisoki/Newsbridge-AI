"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Common/Logo";
import Image from "next/image";
import GradientButton from "@/components/ui/gradient-button";
import GoBack from "@/components/Common/go-back";

const signUpDetails: {
  Icon: string;
  title: string;
  bulletins: string[];
  borderColor: string;
  variant?: "default" | "primary" | "secondary";
  href: string
}[] = [
  {
    Icon: "/Frame5.png",
    title: "For Independent Journalists",
    bulletins: [
      "Discover real community stories",
      "Collaborate securely with contributors",
      "Stay connected across regions",
    ],
    borderColor: "#3754A3",
    variant: "primary",
    href: "/onboarding/independent-journalist"
  },
  /* {
    Icon: "/Frame4.png",
    title: "For Media Houses",
    bulletins: [
      "Discover real community stories",
      "Collaborate securely with contributors",
      "Stay connected across regions",
    ],
    borderColor: "#FCC527",
    variant: "secondary",
    href: "/onboarding/media-house"
  },
  */
];

export default function SignupPage() {
  return (
    <div className="w-full max-w-4xl sm:mt-0 mt-12">
      {/* Back Link */}
      <div className="flex items-center flex-col gap-6">
        <GoBack />
        <Logo textSize="sm:text-3xl text-2xl" height={40} width={40} />
      </div>

      <div className="bg-transparent pt-4 px-6">
        <p className="text-xl text-[#00000099]/90 tracking-[-1] max-w-xl mx-auto leading-[150%] font-normal mb-2 text-center">
          Where journalists and media houses connect to verify, translate, and
          share real-time stories across Africa.
        </p>
      </div>

      <div className="max-w-[880px] mx-auto">
        <div className="flex justify-center pt-8">
          <div className="w-full md:w-1/2">
          {/* Card */}
          {signUpDetails.map((data) => {
            return (
              <div
                key={data.title}
                className=" rounded-3xl p-8 tracking-[-1] leading-[180%] transition-colors bg-[#FFFFFF]"
                style={{ boxShadow: "0px 7px 23px 0px #C3C3C340" }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="relative w-16 h-16 rounded-full flex items-center justify-center text-white font-bold">
                    <Image
                      src={data.Icon}
                      fill
                      alt=""
                      className="object-cover scale-75"
                    />
                  </div>
                  <h2 className="text-[22px] tracking-[-1.7] font-semibold text-black">
                    {data.title}
                  </h2>
                </div>
                <ul className="space-y-3 mb-8 text-[#545454]/90 text-lg">
                  {data?.bulletins?.map((info) => {
                    return (
                      <li key={info} className="flex items-center gap-2">
                        <span className="text-[#545454]">•</span>
                        <span>{info}</span>
                      </li>
                    );
                  })}
                </ul>
                <Link href={data.href}>
                  <GradientButton
                    btnText="Get Started"
                    variant={data?.variant}
                    borderColor={data.borderColor}
                  />
                </Link>
              </div>
            );
          })}
          </div>
        </div>

        {/* Login Link */}
        <p className="text-center hover:text-[#2148A2] tracking-[-1] underline font-semibold text-[#3754A3] text-base mt-8">
          <Link href="/auth/login">Already have an account? Log in</Link>
        </p>
      </div>
    </div>
  );
}
