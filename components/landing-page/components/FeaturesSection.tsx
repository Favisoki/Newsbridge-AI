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
          <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-[-2.0px] font-bold text-gray-900 mb-4">
            How Newsbridge turns signals into stories
          </h2>
          <p className="text-gray-600 text-base md:text-lg tracking-[-0.5px] max-w-3xl mx-auto">
            Newsbridge was built to close that gap. We connect local voices to
            journalists and media houses using accessible, language-aware
            technology.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Feature 1 */}
          <div
            className="bg-white rounded-2xl p-6 md:p-8 flex flex-col"
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
                <p className="text-[#1E1E1E99] text-base md:text-[17px] leading-relaxed">
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
            className="bg-white p-4 md:p-6 rounded-2xl flex flex-col justify-between"
            style={{
              boxShadow: "0px 20px 40px 0px #E8EEFF",
              border: "1px solid #F1F1F1",
            }}
          >
            <div className="relative bg-[#F6F6F6] w-full min-h-[220px] md:min-h-[254px] rounded-2xl flex justify-center items-center overflow-hidden">
              <div className="absolute inset-0 hidden xl:block">
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
                className="w-full max-w-[280px] mx-4 flex flex-col gap-3 z-10 bg-[#FFFFFF] rounded-2xl py-[15px] px-[20px]"
                style={{ boxShadow: "0px 20px 40px 0px #D4D4D440" }}
              >
                <div
                  className="py-[12px] px-3 rounded-xl bg-white"
                  style={{ boxShadow: "0px 10px 20px 0px #E8EEFF" }}
                >
                  <h1 className="text-[13px] md:text-[14px] mb-1 font-semibold">Original (Hausa)</h1>
                  <p className="text-[12px] font-normal text-[#00000080]">
                    "Maji yamekuwa shida kubwa..."
                  </p>
                </div>
                <div
                  className="py-[12px] px-3 rounded-xl bg-white"
                  style={{ boxShadow: "0px 10px 20px 0px #E8EEFF" }}
                >
                  <h1 className="text-[13px] md:text-[14px] mb-1 font-semibold">Translated (English)</h1>
                  <p className="text-[12px] font-normal text-[#00000080]">
                    Our city is flooded
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 md:mt-8 flex flex-col justify-end">
              <div
                className="w-full mb-6"
                style={{ border: "1px solid #F1F1F1" }}
              ></div>
              <div className="font-semibold w-full">
                <h1 className="text-lg md:text-xl tracking-[-1.6] text-[#1E1E1E] mb-2">
                  AI-Powered Analysis
                </h1>
                <p className="text-[#1E1E1E99] tracking-[-1.4] text-[15px] md:text-[17px] leading-relaxed font-normal">
                  Automatically transcribes audio and video reports in the
                  language they were originally spoken, so journalists can read
                  the exact message as reported.
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3 mt-4">
                  {featureTags?.map((tag) => {
                    return (
                      <span
                        key={tag}
                        className="text-[#1A1799] font-medium px-3 py-1.5 rounded-lg bg-[#F0F0FA] text-[11px] md:text-[12px]"
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3 (New) */}
          <div
            className="bg-white rounded-2xl p-6 md:p-8 flex flex-col"
            style={{
              boxShadow: "0px 20px 40px 0px #E8EEFF",
              border: "1px solid #F1F1F1",
            }}
          >
            <div className="tracking-[-1.2]">
              <h1 className="text-[#1E1E1E] tracking-[-1.6] text-lg md:text-xl font-semibold mb-3">
                AI Story Generation
              </h1>
              <p className="text-[#1E1E1E99] text-[15px] md:text-[17px] leading-relaxed">
                Every citizen report becomes a structured, translated story draft, ready for journalists to review, refine, and publish.
              </p>
            </div>

            <div className="mt-8 md:mt-10 h-full flex flex-col">
              <div className="bg-[#F6F6F6] rounded-2xl h-full p-4 relative flex flex-col">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8E8E8]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#1E1E1E]">
                    <path d="M12 2L14.6406 9.35941L22 12L14.6406 14.6406L12 22L9.35941 14.6406L2 12L9.35941 9.35941L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-bold text-[14px] text-[#1E1E1E]">AI Generated Story</span>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] flex flex-col gap-5 flex-grow">
                  <p className="text-[#00000099] text-[13px] md:text-[14px] leading-relaxed tracking-[-0.2px]">
                    Incoming reports are automatically analyzed and structured into a coherent narrative, transforming scattered inputs into a clearer, more usable form. Early indicators highlight a situation that may require attention, with relevant details organized to support faster verification and more confident editorial action.
                  </p>
                  <div className="bg-[#F0F2FF] text-[#2C4180] px-3 py-2 rounded-lg text-[13px] font-semibold w-max flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM18.2812 9.04688L10.7812 16.5469C10.4531 16.875 9.9375 16.875 9.60938 16.5469L5.71875 12.6562C5.39062 12.3281 5.39062 11.8125 5.71875 11.4844C6.04688 11.1562 6.5625 11.1562 6.89062 11.4844L10.1953 14.7891L17.1094 7.875C17.4375 7.54688 17.9531 7.54688 18.2812 7.875C18.6094 8.20312 18.6094 8.71875 18.2812 9.04688Z" />
                      <circle cx="12" cy="12" r="10" fill="white"/>
                      <path d="M16.5 8.5L10.5 14.5L7.5 11.5" stroke="#2C4180" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Ready for editorial use
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
