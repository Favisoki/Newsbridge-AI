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

      <div className="relative bg-background/30 max-w-5xl mx-auto px-6 pt-12 sm:pt-20 md:pt-56 text-center">
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

        <div className="sm:-translate-y-24 -translate-y-27 relative z-40 bg-background/60">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl tracking-[-2.5] md:text-6xl md:tracking-[-4] font-bold text-gray-900 mb-4 leading-tight relative z-10 ">
            Every Community Has a Story.
          </h1>

          {/* Subheadline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-[-2.5] md:tracking-[-4] font-bold text-[#3754A3] mb-8 relative z-10">
            Not Every Voice Is Heard.
          </h2>

          {/* Description */}
          <p className="text-[#00000099] text-lg tracking-[-0.7] max-w-lg mx-auto mb-12 leading-relaxed relative z-10">
            NewsBridge connects journalists with underserved African communities
            through AI-powered multilingual reporting secure, anonymous, and
            authentic.
          </p>

          {/* CTA Button */}
          <Link href={"/waitlist"}>
            <Button
              variant={"default"}
              className="bg-linear-to-b from-[#3754A3]/70 via-[#3754A3]/90 to-[#3754A3] hover:scale-105 sm:w-56 w-42 h-11 text-white sm:px-8 sm:py-7 px-4 py-6 text-base rounded-2xl inline-flex items-center gap-2 relative z-10"
              style={{
                borderImageSource:
                  "linear-gradient(180deg, #FFFFFF -20.83%, rgba(255, 255, 255, 0) 15.62%)",
                boxShadow: "0px 0px 0px 1px #8078FF",
              }}
            >
              Request Access
              <div className="outline-2 outline-white rounded-full p-0.5">
                <ArrowRight className="w-6 h-6" strokeWidth={3} />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;