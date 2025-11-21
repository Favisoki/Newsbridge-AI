import HowItWorks from "@/components/landing-page/HowItWorks";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../Common/Logo";
import { DottedLine } from "../Common/Svgs";

export default function Home() {
  return (
    <div className="overflow-hidden tracking-[-1]">
      {/* Hero Section */}
      <main className="relative overflow-hidden z-10">
        <div className="absolute inset-0">
          <Image
            src="/images/background.png"
            alt="Hero background"
            fill
            className="object-fill"
            priority
          />
        </div>

        <div className="absolute left-20 top-48 w-48 h-96 scale-190 opacity-40 pointer-events-none">
          <Image
            src="/images/africa_left.png"
            alt="African map"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="absolute top-40 right-26 scale-180 w-48 h-96 opacity-40 pointer-events-none">
          <Image
            src="/images/africa_right.png"
            alt="African map"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 pt-20 md:pt-56 text-center">
          <div className="mb-0 flex justify-center relative h-64">
            <div className="absolute inset-0 flex items-center justify-center opacity-100 pointer-events-none">
              <Image
                src="/images/microphone.png"
                alt="Microphones background"
                width={500}
                height={400}
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="-translate-y-24 relative z-10 bg-background opacity-90">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl tracking-[-4] font-bold text-gray-900 mb-4 leading-tight relative z-10 ">
              Every Community Has a Story.
            </h1>

            {/* Subheadline */}
            <h2 className="text-4xl md:text-5xl tracking-[-4] font-bold text-[#3754A3] mb-8 relative z-10">
              Not Every Voice Is Heard.
            </h2>

            {/* Description */}
            <p className="text-[#00000099] text-lg tracking-[-0.7] max-w-lg mx-auto mb-12 leading-relaxed relative z-10">
              NewsBridge connects journalists with underserved African
              communities through AI-powered multilingual reporting secure,
              anonymous, and authentic.
            </p>

            {/* CTA Button */}
            <Link href={"/auth/signup"}>
              <Button
                className="bg-linear-to-b from-[#3754A3]/70 via-[#3754A3]/90 to-[#3754A3] hover:scale-105 w-56 h-11 text-white px-8 py-7 text-base rounded-2xl inline-flex items-center gap-2 relative z-10"
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
      </main>

      {/* Stories Section */}
      <section className="relative pt-20 bg-[#F7F7F7] overflow-hidden">
        <div className="absolute -right-45 min-[1800px]:-right-85 h-full w-9/11 top-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/background.svg"
            alt="Background"
            fill
            className="object-contain min-[1800px]:object-cover z-0"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-4xl tracking-[-2.8] text-center font-semibold text-[#1E1E1E] mb-4">
            The Stories that Never Get Told
          </h2>
          <div className="grid sm:flex items-start gap-12 py-20">
            {/* Left Content */}
            <div className="space-y-6 basis-[55%] tracking-[-1.5]">
              <div className="text-[#00000099] leading-loose text-lg">
                <p>
                  A health crisis unfolds in silence, not because it isn't
                  newsworthy, but because the journalist and the community don't
                  speak the same language.
                </p>
                <p>
                  A whistleblower stays quiet, afraid their story won't be heard
                  safely.
                </p>
                <p className="mt-6">Across Nigeria, this is the reality.</p>
                <p>NewsBridge changes it.</p>
                <p className="mt-6">
                  Through AI translation across Igbo, Hausa, Yoruba, and
                  English, NewsBridge creates a direct, secure bridge between
                  citizens and journalists.
                </p>
                <p>No barriers. No middlemen. No voices ignored.</p>
                <p className="mt-6 z-40!">
                  Starting in Nigeria — and expanding across Africa — we're
                  building the future of inclusive journalism.
                </p>
              </div>
            </div>

            {/* Right - Nigeria Map with Images */}
            <div className="relative h-96 flex -translate-y-11 items-center justify-center basis-[45%]">
              {/* Nigeria Map */}
              <div className="relative opacity-90">
                <Image
                  src="/images/nigeria.png"
                  width={500}
                  height={400}
                  alt="Nigerian map"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Features Section */}
      <section id="features" className="relative py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl tracking-[-2.8] font-bold text-gray-900 mb-4">
              Our Core Features
            </h2>
            <p className="text-gray-600 text-lg tracking-[-1.2] max-w-2xl mx-auto">
              Newsbridge was built to close that gap. We connect local voices to
              journalists and media houses using accessible, language-aware
              technology.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Feature 1 */}
            <div
              className="bg-white rounded-2xl p-8"
              style={{
                boxShadow: "0px 20px 40px 0px #E8EEFF",
                border: "1px solid #F1F1F1",
              }}
            >
              <div className="tracking-[-1.2]">
                <div>
                  <h1 className="text-[#1E1E1E] tracking-[-1.6] text-xl font-semibold mb-3">
                    WhatsApp Reporting
                  </h1>
                  <p className="text-[#1E1E1E99] text-lg leading-relaxed">
                    Citizens report stories directly through WhatsApp using
                    video, audio, or text, making it easy to share real-time
                    information in the language they are most comfortable with
                  </p>
                </div>

                <div className="mt-6 h-[254px] w-[351px">
                  <div className="bg-[#F6F6F6] relative inset-0 h-full w-full rounded-lg overflow-hidden">
                    <div className="absolute inset-x-0 translate-y-[30%]">
                      <Image
                        src="/Vector.png"
                        alt="Feature 1"
                        width={300}
                        height={300}
                        className="object-cover translate-x-[38%]"
                      />
                    </div>
                    <div className="absolute inset-0 translate-x-[21%] translate-y-[2%]">
                      <Image
                        src="/Frame.png"
                        alt="Feature "
                        width={300}
                        height={300}
                        className="object-cover z-30"
                      />
                    </div>
                    <div className="absolute inset-0 translate-x-[13%]">
                      <Image
                        src="/Vector-2.png"
                        alt="Feature "
                        width={48}
                        height={40}
                        className="object-cover z-30"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              className="bg-white p-5 rounded-2xl"
              style={{
                boxShadow: "0px 20px 40px 0px #E8EEFF",
                border: "1px solid #F1F1F1",
              }}
            >
              <div className="relative bg-[#F6F6F6] w-full h-[266px] rounded-2xl flex justify-center items-center">
                <div className="absolute inset-0">
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
                  className="w-[299px] flex flex-col gap-3 z-10 bg-[#FFFFFF] rounded-2xl py-[19px] px-[35px]"
                  style={{ boxShadow: "0px 20px 40px 0px #D4D4D440" }}
                >
                  <div
                    className="py-[18px] px-3 rounded-xl bg-white"
                    style={{ boxShadow: "0px 20px 40px 0px #89878740" }}
                  >
                    <h1 className="text-sm mb-2">Original (Hausa)</h1>
                    <p className="text-xs font-normal text-[#00000080]">
                      "Maji yamekuwa shida kubwa..."
                    </p>
                  </div>
                  <div
                    className="py-[18px] px-3 rounded-xl bg-white"
                    style={{ boxShadow: "0px 20px 40px 0px #89878740" }}
                  >
                    <h1 className="text-sm mb-2">Translated (English)</h1>
                    <p className="text-xs font-normal text-[#00000080]">
                      Our city is flooded
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="w-full mt-4"
                style={{ border: "1px solid #F1F1F1" }}
              ></div>
              <div className="mt-6 font-semibold w-full">
                <h1 className="text-xl tracking-[-1.6] text-[#1E1E1E] mb-2">
                  AI-Powered Analysis
                </h1>
                <p className="text-[#1E1E1E99] tracking-[-1.4] text-lg font-normal">
                  Advanced AI preserves cultural nuances while translating
                  across 47 African languages
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section
        id="who-its-for"
        className="relative w-full py-20 md:py-32 text-white bg-no-repeat bg-full"
        style={{
          background: "url('/background3.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 justify-between gap-4 mx-auto">
            <div className="text-left mb-16">
              <h2 className="text-4xl md:text-5xl tracking-[-2.6] font-semibold mb-4">
                Who it is for
              </h2>
              <p className="text-gray-200 tracking-[-1.2] text-lg max-w-2xl mx-auto">
                Newsbridge helps you get the right report from citizens
              </p>
            </div>

            {/* One Option Card */}
            {/* Independent Journalists */}
            <div
              className="rounded-3xl px-8 py-11 bg-[#111E42] max-w-sm translate-x-56"
              style={{ borderTop: "4px solid #3754A3" }}
            >
              {/* <div className="flex items-center gap-3 mb-6"></div> */}
              <ul className="space-y-3 mb-8 text-lg">
                <li className="flex items-center gap-3">
                  <span className="text-white">•</span>
                  <span>Discover real community stories</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">•</span>
                  <span>Collaborate securely with contributors</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white">•</span>
                  <span>Stay connected across regions</span>
                </li>
              </ul>
              <Link
                className="group cursor-pointer z-20 transition-all duration-300"
                href={"onboarding/independent-journalist"}
              >
                <div className="group-hover:scale-105 inline-flex items-center gap-2 tracking-[0] underline underline-offset-3 bg-transparent outline-none! text-white rounded-lg font-semibold hover:text-[#FEE00F]transition-all duration-300 text-base">
                  Request Access
                  <div className="rounded-full border-2 group-hover:translate-x-1 transition-all duration-300 p-0.5 border-white">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl tracking-[-2.8] font-bold text-gray-900 mb-4">
              Meet the team behind News Bridge
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Protecting journalists and citizen reporters is our top priority.
              Our platform meets international standards for sensitive
              reporting.
            </p>
          </div>

          {/* Team Members */}
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: "Lois Dagana",
                role: "Product Designer",
                image: "/Frame11.png",
                scale: "",
              },
              {
                name: "Gbadegesin Adeyanju",
                role: "Backend AI Engineer",
                image: "/Frame10.png",
                scale: "",
              },
              {
                name: "Isaac Adedokun",
                role: "Data Scientist & AI Engineer",
                image: "/Frame9.png",
                scale: "",
              },
              {
                name: "Davida Spaine-Solomon",
                role: "Journalist",
                image: "/Frame8.png",
                scale: "",
              },
            ].map((member) => (
              <div
                key={member.name}
                className="text-center hover:scale-[1.02] cursor-pointer transition-all duration-300 shadow-lg py-10 px-4 rounded-2xl"
              >
                <div className="relative w-full aspect-square bg-[#192c65] rounded-lg mb-4">
                  <Image
                    src={member.image}
                    alt=""
                    fill
                    className={`object-cover rounded-lg ${member.scale}`}
                  />
                </div>
                <h3 className="font-semibold tracking-[-1.2] text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 tracking-[-1.2] text-sm">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & CTA Section */}
      <section
        className="relative py-20 md:py-32 bg-gray-900 text-white overflow-hidden"
        style={{
          background: "url('/contact-background.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="h-[391px]">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-linear-to-r from-gray-900 via-transparent to-gray-900" />
          </div>

          <div className="absolute bottom-0.5 left-0 w-full mx-auto px-6">
            <div className="flex justify-center max-w-7xl mx-auto">
              <div className="flex gap-12 items-center">
                {/* Left - Contact */}
                <div className="bg-[#F7F9FF33] tracking-[-1.5] bg-opacity-60 backdrop-blur-xl text-center rounded-2xl py-9 translate-y-31 translate-x-7 z-10 basis-[43%] border border-gray-300/60">
                  <h3 className="text-[32px] text-white font-semibold mb-2">
                    Contact us
                  </h3>
                  <a
                    href="mailto:info@newsbridge.com"
                    className="text-[48px] tracking-[-4] font-semibold underline"
                    style={{
                      background:
                        "linear-gradient(90deg, #FFFFFF -29.78%, #FDCD20 88.65%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      color: "transparent",
                      textDecoration: "underline",
                      textDecorationColor: "#FDCD20",
                    }}
                  >
                    info@newsbridgeai.com
                  </a>
                </div>

                {/* Right - CTA */}
                <div className="relative basis-[52%]">
                  {/* Yellow stripes - behind the card */}
                  <div className="absolute inset-0 z-0">
                    <div className="absolute -left-[39%] bottom-0 h-40 w-[600px] bg-[#FCC527] -rotate-55" />
                    <div className="absolute -right-[39%] bottom-0 h-40 w-[600px] bg-[#FCC527] rotate-55" />
                  </div>

                  {/* Blue card - in front */}
                  <div className="relative bg-[#3754A3] h-[527px] rounded-b-2xl rounded-t-[50px] p-14 z-10 text-center">
                    <div className="absolute w-full max-w-2xl mx-auto h-full top-0 left-0 translate-x-8 translate-y-4 -z-10">
                      <Image
                        src={"/contact-card-bg.png"}
                        alt=""
                        fill
                        className="bg-contain"
                      />
                    </div>
                    <h3 className="text-5xl font-semibold tracking-[-3] text-white mb-6 leading-[150%]">
                      A Future of Inclusive Journalism
                    </h3>
                    <p className="text-lg tracking-[-1.3] font-normal mb-8 leading-relaxed">
                      We believe in an Africa where every citizen — regardless
                      of language, literacy, or location — can contribute to
                      trustworthy, community-driven news.
                    </p>
                    <p className="text-lg font-normal mb-8 ">
                      "When stories connect, societies strengthen"
                    </p>
                    <Link className="group" href={"/auth/signup"}>
                      <Button className="inline-flex items-center hover:scale-105 gap-2 bg-[#FCC527] outline-none! text-black rounded-2xl px-6 py-7 font-semibold hover:text-[#FEE00F]transition-all duration-300 text-base">
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

      {/* Footer */}
      <footer className=" bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-1 gap-12 mb-12 relative">
            <div>
              {/*  Logo & Description */}
              <div className="flex items-center gap-6 mb-6 ml-6">
                <div className="w-8 flex items-center justify-center">
                  <Logo textSize="text-2xl" height={40} width={40} />
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Connect with authentic citizen voices from underserved African
                communities through AI-powered multilingual reporting. Break
                barriers, tell untold stories, build community trust.
              </p>
            </div>

            <div>
              <ul className="space-y-2 flex gap-4 text-gray-600 text-sm">
                <li>
                  <Link href="#how-it-works" className="hover:text-gray-900">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="#team" className="hover:text-gray-900">
                    Meet the Team
                  </Link>
                </li>
                <li>
                  <Link href="#who-its-for" className="hover:text-gray-900">
                    Who it's For
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="hover:text-gray-900">
                    Core Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    User Guide
                  </Link>
                </li>
              </ul>
            </div>
            <div className="absolute top-10 scale-x-110 -right-31 min-[1550px]:-translate-x-28">
              <Image
                src="/images/microphone.png"
                alt="Microphones background"
                width={500}
                height={400}
                className="object-contain scale-100 opacity-70"
              />
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 pt-8 text-center text-gray-600 text-sm">
            <p>© 2025 NewsBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
