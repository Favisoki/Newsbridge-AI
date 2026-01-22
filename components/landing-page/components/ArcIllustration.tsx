import React, { JSX } from 'react'

const ArcIllustration = ({activeStep, StepComponent, steps}: {activeStep: number, StepComponent: () => JSX.Element, steps: {
    marker: string;
    heading: string;
    text: string[];
    classes: string;
    textPosition: string;
}[]}) => {
  return (
    <div className="scale-100 max-[1330px]:scale-95 max-[1213px]:scale-85 max-[1055px]:scale-100 max-[845px]:scale-90  basis-[65%]">
            {/* --- Layout Container (Desktop Only) --- */}
            {/* This layout focuses on the desktop view from the image for conciseness */}
            <div className="relative w-full mt-34">
              <div className="z-10 w-full">
                {/* Dark Circle Element */}
                <div
                  className="relative w-[287px] h-[287px] sm:w-[287px] sm:h-[287px] rounded-full bg-[#5A698B] flex items-center justify-center max-[845px]:scale-90"
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
              <div className=" top-1/2 left-[32%] transform -translate-y-1/2 w-[350px] h-[450px] max-[845px]:scale-95">
                {/* The Arc */}
                <div className="absolute left-0 top-0 translate-x-60 max-[845px]:translate-x-55 -translate-y-38 max-[845px]:-translate-y-35 h-full">
                  <svg
                    width="288"
                    height="100"
                    viewBox="0 0 288 100"
                    className="overflow-visible -rotate-14 max-[845px]:-rotate-10 "
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
  )
}

export default ArcIllustration