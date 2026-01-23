import { DottedLine } from "@/components/Common/Svgs";
import Image from "next/image";

const FeaturesSection = () => {
  const featureTags = [
    "Geolocation tagging",
    "Cultural Context",
    "Classification based on preference",
  ];
  return (
    <section id="features" className="relative py-16 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-[-2.8] font-bold text-gray-900 mb-4">
            Our Core Features
          </h2>
          <p className="text-gray-600 text-base md:text-lg tracking-[-1.2] max-w-2xl mx-auto">
            Newsbridge was built to close that gap. We connect local voices to
            journalists and media houses using accessible, language-aware
            technology.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Feature 1 */}
          <div
            className="bg-white rounded-2xl p-6 md:p-8"
            style={{
              boxShadow: "0px 20px 40px 0px #E8EEFF",
              border: "1px solid #F1F1F1",
            }}
          >
            <div className="tracking-[-1.2]">
              <div>
                <h1 className="text-[#1E1E1E] tracking-[-1.6] text-lg md:text-xl font-semibold mb-3">
                  WhatsApp Reporting
                </h1>
                <p className="text-[#1E1E1E99] text-base md:text-lg leading-relaxed">
                  Citizens report stories directly through WhatsApp using video,
                  audio, or text, making it easy to share real-time information
                  in the language they are most comfortable with
                </p>
              </div>

              <div className="mt-6 h-[200px] md:h-[254px]">
                <div className="bg-[#F6F6F6] relative inset-0 h-full w-full rounded-lg overflow-hidden flex justify-center items-center">
                  <div className="relative">
                    <div className="">
                      <Image
                        src="/Vector.png"
                        alt="Feature 1"
                        width={300}
                        height={300}
                        className="z-20 w-[200px] md:w-[300px] h-auto"
                      />
                    </div>
                    <div className="absolute -top-8 md:-top-12 left-0">
                      <Image
                        src="/Frame.png"
                        alt="Feature"
                        width={300}
                        height={300}
                        className="w-[200px] md:w-[300px] h-auto"
                      />
                    </div>
                    <div className="absolute -top-10 md:-top-15 -left-8 md:-left-12">
                      <Image
                        src="/Vector-2.png"
                        alt="Feature"
                        width={48}
                        height={40}
                        className="w-[32px] md:w-[48px] h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div
            className="bg-white p-4 md:p-5 rounded-2xl"
            style={{
              boxShadow: "0px 20px 40px 0px #E8EEFF",
              border: "1px solid #F1F1F1",
            }}
          >
            <div className="relative bg-[#F6F6F6] w-full h-[220px] md:h-[266px] rounded-2xl flex justify-center items-center">
              <div className="absolute inset-0 hidden md:block">
                <div className="w-1/4 z-0 translate-y-18 translate-x-36 rotate-90">
                  <DottedLine />
                </div>
                <div className="w-1/4 z-0 translate-y-17 translate-x-64 rotate-90">
                  <DottedLine />
                </div>
                <div className="w-1/2 z-0 translate-y-15 translate-x-0">
                  <DottedLine />
                </div>
                <div className="w-1/2 z-0 translate-y-15 absolute right-0 top-6 translate-x-0">
                  <DottedLine />
                </div>
                <div className="w-1/2 z-0 translate-y-47 translate-x-0">
                  <DottedLine />
                </div>
                <div className="w-1/2 z-0 translate-y-47 absolute right-0 top-6 translate-x-0">
                  <DottedLine />
                </div>
              </div>
              <div
                className="w-full max-w-[299px] mx-4 flex flex-col gap-3 z-10 bg-[#FFFFFF] rounded-2xl py-[15px] md:py-[19px] px-[20px] md:px-[35px]"
                style={{ boxShadow: "0px 20px 40px 0px #D4D4D440" }}
              >
                <div
                  className="py-[14px] md:py-[18px] px-3 rounded-xl bg-white"
                  style={{ boxShadow: "0px 20px 40px 0px #89878740" }}
                >
                  <h1 className="text-sm md:text-base mb-2">Original (Hausa)</h1>
                  <p className="text-xs md:text-sm font-normal text-[#00000080]">
                    "Maji yamekuwa shida kubwa..."
                  </p>
                </div>
                <div
                  className="py-[14px] md:py-[18px] px-3 rounded-xl bg-white"
                  style={{ boxShadow: "0px 20px 40px 0px #89878740" }}
                >
                  <h1 className="text-sm md:text-base mb-2">Translated (English)</h1>
                  <p className="text-xs md:text-sm font-normal text-[#00000080]">
                    Our city is flooded
                  </p>
                </div>
              </div>
            </div>
            <div
              className="w-full mt-4"
              style={{ border: "1px solid #F1F1F1" }}
            ></div>
            <div className="mt-4 md:mt-6 font-semibold w-full">
              <h1 className="text-lg md:text-xl tracking-[-1.6] text-[#1E1E1E] mb-2">
                AI-Powered Analysis
              </h1>
              <p className="text-[#1E1E1E99] tracking-[-1.4] text-base md:text-lg font-normal">
                Automatically transcribes audio and video reports in the
                language they were originally spoken, so journalists can read
                the exact message as reported.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3 mt-4">
                {featureTags?.map((tag) => {
                  return (
                    <span
                      key={tag}
                      className="text-[#1A1799] font-normal p-2 rounded-lg bg-[#F0F0FA] text-[12px] md:text-xs whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
