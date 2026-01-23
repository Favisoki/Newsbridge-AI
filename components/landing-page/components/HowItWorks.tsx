"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, CircleArrowRight } from "lucide-react";
import Image from "next/image";
import { Step1, stepInfo } from "./StepComponents";
import Link from "next/link";
import ArcIllustration from "./ArcIllustration";
import MobileIllustration from "./HowItWorksMobile";
import HowItWorksMobile from "./HowItWorksMobile";

export type activeType = 0 | 1 | 2;

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
      classes:
        "top-1/2 left-0  translate-x-24 -translate-y-12 max-[845px]:translate-x-20 max-[845px]:-translate-y-17",
      textPosition: "-translate-y-4 translate-x-0",
    },
    {
      marker: "03",
      heading: "Journalist Dashboard",
      text: textDescription[activeStep as activeType],
      classes:
        "bottom-0 -translate-y-7 translate-x-2 max-[845px]:-translate-x-4 max-[845px]:-translate-y-9",
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
    <section className=" bg-[#0E1B3E] flex items-cente tracking-[-1] justify-center font-sans relative z-10 overflow-hidden">
      <div className="absolute h-full w-full inset-0">
        <Image
          src={"/how-it-works-bg.png"}
          alt=""
          fill
          className="object-contain z-0"
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
      <div
        className="w-full max-w-7xl mx-auto h-[1000px] min-[1055px]:h-auto px-8 py-9"
        id="how-it-works"
      >
        <div className="flex flex-col min-[1055px]:flex-row justify-between gap-12 h-[550px] mt-6">
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
                <Link
                  className="cursor-pointer hover:scale-105 z-20 transition-all duration-300"
                  href={"auth/signup"}
                >
                  Request Access
                </Link>
                <CircleArrowRight className="w-5 h-5 z-20 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          </div>
          <div className="-translate-x-[120%] max-[1213px]:-translate-x-[90%] max-[1055px]:translate-x-0 max-[845px]:-translate-x-[3%] max-[719px]:-translate-x-[9%]">
            <ArcIllustration
              activeStep={activeStep}
              StepComponent={StepComponent}
              steps={steps}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;