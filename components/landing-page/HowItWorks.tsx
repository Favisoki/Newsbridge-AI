"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, CircleArrowRight } from "lucide-react";
import Image from "next/image";
import { Step1, stepInfo } from "./StepComponents";
import Link from "next/link";

type activeType = 0 | 1 | 2;

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const textDescription = {
    0: [
      "Citizens share stories via WhatsApp, text, voice, or photos, in their local languages. NewsBridge receives and prepares them for review.",
      "AI instantly translates messages while keeping tone and cultural nuance intact. A message like “Maji ya kwashe gonakinmu” becomes “The flood destroyed our farms.",
      "Verified journalists review, organize, and follow up on reports, turning firsthand accounts into reliable stories.",
    ],
    1: [
      "Community members share stories via WhatsApp using voice messages, photos, or text in their local language.",
      "Advanced Al preserves cultural context while translating reports into journalist's preferred language.",
      "Verified jouralists access organized reports, verify sources, and collaborate with communities.",
    ],
    2: [
      "Community members share stories via WhatsApp using voice messages, photos, or text in their local language.",
      "Advanced Al preserves cultural context while translating reports into journalist's preferred language.",
      "Verified jouralists access organized reports, verify sources, and collaborate with communities.",
    ],
  };

  const steps = [
    {
      marker: "01",
      heading: "Citizens Report",
      text: textDescription[activeStep as activeType],
      classes: "top-0 -translate-y-2 -translate-x-9",
      textPosition: "-translate-y-4 translate-x-13",
    },
    {
      marker: "02",
      heading: "AI Translation",
      text: textDescription[activeStep as activeType],
      classes: "top-1/2 left-0  translate-x-24 -translate-y-12",
      textPosition: "-translate-y-4 translate-x-0",
    },
    {
      marker: "03",
      heading: "Journalist Dashboard",
      text: textDescription[activeStep as activeType],
      classes: "bottom-0 -translate-y-7 translate-x-2",
      textPosition: "translate-y-2 translate-x-10",
    },
  ];

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const StepComponent = stepInfo[activeStep as activeType];

  return (
    <section className=" bg-[#0E1B3E] flex items-cente tracking-[-1] justify-center p-4 sm:p-8 font-sans relative z-10 overflow-hidden">
      <div className="absolute h-full w-full inset-0">
        <Image
          src={"/how-it-works-bg.png"}
          alt=""
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <div className="grid grid-cols-4 items-end gap-8 max-w-7xl mx-auto">
          <Image
            src={"/ellipse.png"}
            alt=""
            width={400}
            height={400}
            className="object-contain scale-110"
          />
          <Image
            src={"/ellipse.png"}
            alt=""
            width={350}
            height={350}
            className="object-contain translate-y-3 scale-110"
          />
          <Image
            src={"/ellipse.png"}
            alt=""
            width={300}
            height={300}
            className="object-contain translate-y-5 scale-110"
          />
          <Image
            src={"/ellipse.png"}
            alt=""
            width={250}
            height={250}
            className="object-contain translate-y-6 scale-110"
          />
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-8" id="how-it-works">
        <div className="flex justify-between gap-12 h-[550px] mt-6">
          <div className="max-w-md basis-[35%] mt-14">
            <h1 className="text-[40px] font-semibold tracking-[-2.8] text-white mb-4">
              How it Works
            </h1>
            <p className="text-lg text-white font-normal tracking-[-1.3]">
              From a single voice note to a verified story here’s how NewsBridge
              connects communities and journalists in three simple steps.
            </p>
            <div className="mt-7">
              <p className="text-lg italic tracking-[-1] font-normal text-[#FFFFFF] mb-4">
                Ready to amplify unheard voices?
              </p>
              <div className="group inline-flex cursor-pointer items-center gap-2 underline tracking-[0] underline-offset-3 bg-transparent outline-none! text-[#FEE00F] rounded-lg font-semibold text-base">
                <Link className="cursor-pointer hover:scale-105 z-20 transition-all duration-300" href={'auth/signup'}>
                Request Access
                </Link>
                <CircleArrowRight className="w-5 h-5 z-20 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          </div>
          <div className="basis-[65%]">
            {/* --- Layout Container (Desktop Only) --- */}
            {/* This layout focuses on the desktop view from the image for conciseness */}
            <div className="relative w-full mt-34">
              <div className="z-10 w-full">
                {/* Dark Circle Element */}
                <div
                  className="relative w-[287px] h-[287px] sm:w-[287px] sm:h-[287px] rounded-full bg-[#5A698B] flex items-center justify-center"
                  style={{ border: "1px solid #000000" }}
                >
                  {/* Inner Card Element */}
                  <div
                    key={activeStep}
                    style={{
                      animation: "fadeInUp 1.3s ease-out",
                      animationDelay: "0.2s",
                      animationFillMode: "both",
                    }}
                  >
                    <StepComponent />
                  </div>
                </div>
              </div>

              {/* 2. The Arc and Markers */}
              <div className=" top-1/2 left-[32%] transform -translate-y-1/2 w-[350px] h-[450px]">
                {/* The Arc */}
                <div className="absolute left-0 top-0 translate-x-60 -translate-y-38 h-full">
                  <svg
                    width="288"
                    height="100"
                    viewBox="0 0 288 100"
                    className="overflow-visible -rotate-14"
                  >
                    <path
                      d="M 0 0 A 200 200 0 0 1 0 348"
                      fill="none"
                      stroke="white"
                      strokeWidth="5"
                      strokeDasharray="10,10"
                    />
                  </svg>
                  {/* Markers (Hardcoded) */}
                  {steps.map((data, index) => {
                    const isActive = index === activeStep;

                    return (
                      <div key={index} className={`absolute ${data.classes}`}>
                        {/* Marker */}
                        <div
                          className={`w-[71px] ${
                            isActive
                              ? "bg-[#FDCD20] text-white"
                              : "bg-[#FFFDEC] text-[#FCC527]"
                          } h-[71px] rounded-full flex items-center justify-center text-lg font-bold z-20`}
                        >
                          {data.marker}
                        </div>

                        {/* Text beside marker */}
                        <div
                          key={activeStep}
                          className={`absolute top-0 left-24 w-96 ${data.textPosition} transition-all duration-700 ease-out`}
                          style={{
                            animation: "fadeInUp 0.7s ease-out",
                            animationFillMode: "both",
                            animationDelay: `${index * 0.15}s`,
                          }}
                        >
                          <h1 className="text-lg font-bold tracking-[-1.3] text-white mb-2">
                            {data.heading}
                          </h1>
                          <p className="text-sm text-white font-normal tracking-[-0.6] leading-[180%]">
                            {data.text[index]}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
