"use client";

import { useEffect, useRef, useState } from "react";
import { stepInfo } from "./StepComponents";
import { CircleArrowRight } from "lucide-react";
import { activeType } from "./HowItWorks";
import { Button } from "../../ui/button";
import Image from "next/image";

type MobileProps = {
  activeStep: number;
  StepComponent: React.ComponentType;
};

const HowItWorksMobile = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      marker: "01",
      heading: "Citizens Report",
      description:
        "Community members share stories via WhatsApp using voice messages, photos, or text in their local language.",
    },
    {
      marker: "02",
      heading: "AI Translation",
      description:
        "Advanced AI preserves cultural context while translating reports into journalist's preferred language.",
    },
    {
      marker: "03",
      heading: "Journalist Dashboard",
      description:
        "Verified journalists access organized reports, verify sources, and collaborate with communities.",
    },
  ];

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const StepComponent = stepInfo[activeStep as activeType];

  return (
    <section className="bg-[#0E1B3E] py-12 px-6 font-sans relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute h-full w-full inset-0">
        <Image
          src={"/how-it-works-bg.png"}
          alt=""
          fill
          className="object-cover z-0"
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

      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-white mb-4 tracking-tight">
            How it Works
          </h1>
          <p className="text-base text-white/90 leading-relaxed">
            From a single voice note to a verified story here's how NewsBridge
            connects communities and journalists in three simple steps.
          </p>
        </div>

        {/* Visual Component */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <StepComponent />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative transition-all duration-500 ${
                activeStep === index ? "opacity-100" : "opacity-40"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Step marker */}
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                    activeStep === index
                      ? "bg-[#FEE00F] text-[#0E1B3E] scale-110"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {step.marker}
                </div>

                {/* Step content */}
                <div className="flex-1 pt-1">
                  <h3
                    className={`font-semibold text-lg mb-2 transition-colors duration-500 ${
                      activeStep === index ? "text-[#FEE00F]" : "text-white"
                    }`}
                  >
                    {step.heading}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed transition-colors duration-500 ${
                      activeStep === index ? "text-white" : "text-white/70"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-12 bg-white/20"></div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-6 border-t border-white/10">
          <p className="text-base italic text-white/90 mb-4">
            Ready to amplify unheard voices?
          </p>
          <Button
            variant={"ghost"}
            className="inline-flex items-center gap-2 text-[#FEE00F] font-semibold text-base underline underline-offset-4 hover:scale-105 transition-transform duration-300"
          >
            Request Access
            <CircleArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeStep === index ? "bg-[#FEE00F] w-8" : "bg-white/30"
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksMobile;
