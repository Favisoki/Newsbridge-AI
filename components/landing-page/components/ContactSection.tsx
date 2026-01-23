import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "../../ui/button";
import Link from "next/link";

const ContactSection = () => {
  return (
    <section
      className="relative py-20 md:py-32 bg-gray-900 text-white overflow-hidden"
      style={{
        background: "url('/contact-background.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Desktop height preserved, smaller screens auto */}
      <div className="h-[391px] max-lg:h-auto">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-linear-to-r from-gray-900 via-transparent to-gray-900" />
        </div>

        <div className="absolute bottom-0.5 left-0 w-full mx-auto px-6 max-lg:static">
          <div className="flex justify-center max-w-7xl mx-auto">
            {/* Desktop row → Tablet/Mobile stack */}
            <div className="flex gap-12 items-center max-lg:flex-col">
              
              {/* Left - Contact */}
              <div
                className="
                  bg-[#F7F9FF33]
                  tracking-[-1.5]
                  bg-opacity-60
                  backdrop-blur-xl
                  text-center
                  rounded-2xl
                  py-9
                  translate-y-31
                  translate-x-7
                  z-10
                  basis-[43%]
                  border border-gray-300/60
                  max-lg:translate-x-0
                  max-lg:translate-y-0
                  max-lg:w-full
                "
              >
                <h3 className="text-[32px] font-semibold mb-2 max-md:text-[26px]">
                  Contact us
                </h3>

                <a
                  href="mailto:info@newsbridge.com"
                  className="text-[48px] tracking-[-4] font-semibold underline max-lg:text-[36px] max-[1260px]:text-[3.2vw] max-md:text-[26px] max-md:tracking-[-2] break-all"
                  style={{
                    background:
                      "linear-gradient(90deg, #FFFFFF -29.78%, #FDCD20 88.65%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                    textDecorationColor: "#FDCD20",
                  }}
                >
                  info@newsbridgeai.com
                </a>
              </div>

              {/* Right - CTA */}
              <div className="relative basis-[52%] lg:min-w-[590px] max-lg:w-full">
                
                {/* Decorative stripes only on desktop */}
                <div className="absolute inset-0 z-0 max-lg:hidden">
                  <div className="absolute -left-[39%] bottom-0 h-40 w-[600px] bg-[#FCC527] -rotate-55" />
                  <div className="absolute -right-[39%] bottom-0 h-40 w-[600px] bg-[#FCC527] rotate-55" />
                </div>

                <div
                  className="
                    relative
                    bg-[#3754A3]
                    h-[527px]
                    rounded-b-2xl
                    rounded-t-[50px]
                    sm:p-14
                    z-10
                    text-center
                    max-lg:h-auto
                    max-md:py-10
                    max-md:px-4
                  "
                >
                  <div className="absolute w-full max-w-2xl mx-auto h-full top-0 left-0 translate-x-8 translate-y-4 -z-10">
                    <Image
                      src={"/contact-card-bg.png"}
                      alt=""
                      fill
                      className="bg-contain"
                    />
                  </div>

                  <h3 className="text-5xl font-semibold tracking-[-3] mb-6 leading-[150%] max-md:text-3xl">
                    A Future of Inclusive Journalism
                  </h3>

                  <p className="text-lg tracking-[-1.3] mb-8 leading-relaxed max-md:text-base">
                    We believe in an Africa where every citizen — regardless of
                    language, literacy, or location — can contribute to
                    trustworthy, community-driven news.
                  </p>

                  <p className="text-lg mb-8 max-md:text-base">
                    "When stories connect, societies strengthen"
                  </p>

                  <Link className="group" href={"/auth/signup"}>
                    <Button className="inline-flex items-center hover:scale-105 gap-2 bg-[#FCC527] text-black rounded-2xl px-6 py-7 font-semibold transition-all duration-300 text-base">
                      Request Access
                      <div className="rounded-full border-2 p-0.5 border-black">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;