import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "../../ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="mt-4 lg:min-h-screen -z-10 bg-black/3 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/background.png"
          alt="Hero background"
          fill
          className="object-cover z-0"
          priority
        />
      </div>
      <div className="absolute left-24 top-68 sm:w-52 h-96 scale-190 opacity-40 pointer-events-none">
        <Image
          src="/images/africa_left.png"
          alt="African map"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute top-54 right-24 scale-180 sm:w-56 h-96 opacity-40 pointer-events-none">
        <Image
          src="/images/africa_right.png"
          alt="African map"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="relative bg-background/30 max-w-5xl mx-auto px-6 pt-12 sm:pt-20 md:pt-48 text-center flex-grow flex flex-col justify-center mb-5">
        <div className="mb-0 flex justify-center relative h-64">
          <div className="absolute md:inset-0 top-20 min-[1580px]:pt-40 flex items-center justify-center opacity-100 pointer-events-none">
            <Image
              src="/images/microphone.png"
              alt="Microphones background"
              width={500}
              height={400}
              className="object- z-40 min-[1580px]:scale-150"
              priority
            />
          </div>
        </div>

        <div className="sm:-translate-y-12 -translate-y-16 relative z-40 bg-background/80">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl tracking-[-2.5] md:text-6xl md:tracking-[-4] font-bold text-gray-900 mb-4 leading-tight relative z-10 ">
            Every Community Has a Story.
          </h1>

          {/* Subheadline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-[-2.5] md:tracking-[-4] font-bold text-[#3754A3] mb-8 relative z-10">
            Not Every Voice Gets Heard.
          </h2>

          {/* Description */}
          <p className="text-[#00000099] text-base md:text-lg tracking-[-0.7] max-w-lg mx-auto mb-10 leading-relaxed relative z-10">
            Citizens report news on WhatsApp in any language. Our AI translates
            and delivers it to your newsroom
          </p>

          {/* CTA Buttons & Text */}
          <div className="flex flex-col items-center gap-4 relative z-10 w-full mt-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4">
              <Link href={"/auth/signup"}>
                <Button
                  variant={"default"}
                  className="bg-[#3A50A6] hover:bg-[#2C4180] hover:scale-105 transition-all text-white h-[52px] px-6 sm:px-8 text-[15px] sm:text-[17px] tracking-[-0.2px] rounded-2xl inline-flex items-center justify-center gap-3 w-full sm:w-auto"
                >
                  <span className="font-semibold">Get newsroom access</span>
                  <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center p-0.5 relative top-[1px]">
                    <ArrowRight className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                </Button>
              </Link>
              <Link href={"https://wa.me/+2348169551297"} target="_blank">
                <Button
                  variant={"secondary"}
                  className="bg-[#ECF0FC] hover:bg-[#dee5fb] hover:scale-105 transition-all text-[#3A50A6] h-[52px] px-6 sm:px-8 text-[15px] sm:text-[17px] tracking-[-0.2px] font-semibold rounded-2xl inline-flex items-center justify-center w-full sm:w-auto"
                >
                  Start reporting on WhatsApp
                </Button>
              </Link>
            </div>
            <p className="text-[#00000080] text-[13px] md:text-sm font-normal tracking-[-0.1px] mt-1">
              We're onboarding our first 20 newsrooms
            </p>
          </div>
        </div>
      </div>

      {/* Featured On Full Width Box */}
      <div className="w-full bg-white mt-auto py-6 md:py-0 md:h-[115px] px-6 sm:px-12 md:px-24 lg:px-32 relative z-40 flex items-center justify-start border-t border-gray-100">
        <div className="flex flex-col items-start justify-center gap-2 max-w-7xl mx-auto w-full">
          <p className="text-[#4D4D4D] font-medium text-[13px] tracking-tight">
            Featured on
          </p>
          <div className="relative w-[210px] h-[40px] md:h-[48px]">
            <Image
              src="/images/ai-reports-logo.png"
              alt="AI Reports Africa"
              fill
              className="object-contain object-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
