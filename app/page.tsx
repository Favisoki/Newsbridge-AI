import { Button } from "@/components/ui/button"
import { MessageSquare, Mic, ArrowRight } from "lucide-react"
import Image from "next/image"

// --- SVG Icons (to reduce imports) ---
const MessageSquareIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const MicIcon = ({ className, fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Hero Section */}
      <main className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/background.png" alt="Hero background" fill className="object-cover" priority />
        </div>

        <div className="absolute left-0 top-1/4 transform -translate-y-1/2 w-48 h-96 opacity-40 pointer-events-none">
          <Image src="/images/africa_left.png" alt="African map" fill className="object-contain" />
        </div>

        <div className="absolute right-0 top-1/4 transform -translate-y-1/2 w-48 h-96 opacity-40 pointer-events-none">
          <Image src="/images/africa_right.png" alt="African map" fill className="object-contain" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-20 md:py-32 text-center">
          <div className="mb-0 flex justify-center relative h-64">
            <div className="absolute inset-0 flex items-center justify-center opacity-100 pointer-events-none">
              <Image
                src="/images/microphone.png"
                alt="Microphones background"
                width={500}
                height={400}
                className="object-contain"
              />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight relative z-10">
            Bridging Voices & Building Trust
          </h1>

          {/* Subheadline */}
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-8 relative z-10">In African Journalism</h2>

          {/* Description */}
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12 leading-relaxed relative z-10">
            Connect with authentic citizen voices from underserved African communities through AI-powered multilingual
            reporting. Break barriers, tell untold stories, build community trust.
          </p>

          {/* CTA Button */}
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base rounded-2xl inline-flex items-center gap-2 relative z-10">
            Become a reporter
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </main>

      {/* Stories Section */}
      <section className="relative py-20 md:py-32 bg-gray-50">
        <div className="absolute opacity-20">
          <Image src="/images/background_2.png" alt="Background" className="object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">The Stories that Never Get Told</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  A health crisis unfolds in silence, not because it isn't newsworthy, but because the journalist and
                  the community don't speak the same language.
                </p>
                <p>A whistleblower stays quiet, afraid their story won't be heard safely.</p>
                <p className="font-semibold text-gray-900">Across Nigeria, this is the reality.</p>
                <p>NewsBridge changes it.</p>
                <p>
                  Through AI translation across Igbo, Hausa, Yoruba, and English, NewsBridge creates a direct, secure
                  bridge between citizens and journalists.
                </p>
                <p>No barriers. No middlemen. No voices ignored.</p>
                <p>
                  Starting in Nigeria — and expanding across Africa — we're building the future of inclusive journalism.
                </p>
              </div>
            </div>

            {/* Right - Nigeria Map with Images */}
            <div className="relative h-96 flex items-center justify-center">
              {/* Nigeria Map */}
              <div className="relative opacity-90">
                <Image src="/images/nigeria.png" alt="Nigerian map" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-7xl mx-auto py-12 lg:py-24">
        {/* --- Layout Container (Desktop Only) --- */}
        {/* This layout focuses on the desktop view from the image for conciseness */}
        <div className="relative h-[500px]">
          
          {/* 1. The Large Dark Circle Visual (Left Side) */}
          <div className="absolute top-1/2 left-[10%] -translate-y-1/2 z-10">
            {/* Dark Circle Element */}
            <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] rounded-full bg-indigo-900/80 shadow-2xl flex items-center justify-center">
              {/* Inner Card Element */}
              <div className="transform -translate-y-4 translate-x-1 sm:-translate-y-6 sm:translate-x-2">
                <div className="w-56 h-40 sm:w-64 sm:h-48 rounded-2xl shadow-xl overflow-hidden transform scale-105">
                  {/* Card Header */}
                  <div className="flex items-center p-3 bg-emerald-600 text-white">
                    <MessageSquareIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Community Reporter</span>
                  </div>
                  {/* Card Body */}
                  <div className="p-4 bg-white">
                    <div className="bg-gray-100 rounded-xl p-3 shadow-inner border border-gray-200">
                      <div className="flex items-center text-gray-900 mb-1">
                        <MicIcon className="w-4 h-4 mr-2 text-red-500" fill="currentColor" />
                        <span className="font-semibold text-sm sm:text-base">Voice message in Hausa</span>
                      </div>
                      <p className="text-xs text-gray-500 ml-6">2:34 - Reporting Flood</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. The Arc and Markers */}
          <div className="absolute top-1/2 left-[32%] transform -translate-y-1/2 w-[350px] h-[450px]">
            {/* The Arc */}
            <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full border-2 border-dashed border-gray-300 transform rotate-[-45deg] z-0"></div>
            
            {/* Markers (Hardcoded) */}
            <div className="absolute w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-xl font-extrabold text-gray-900 shadow-lg z-20 top-[30px] right-[100px]">01</div>
            <div className="absolute w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-xl font-extrabold text-gray-900 shadow-lg z-20 top-1/2 right-[10px] -translate-y-1/2">02</div>
            <div className="absolute w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-xl font-extrabold text-gray-900 shadow-lg z-20 bottom-[30px] right-[100px]">03</div>
          </div>
          
          {/* 3. The Step Descriptions (Right Side) */}
          <div className="absolute right-0 w-1/2 space-y-[100px]">
            {/* Step 1 Content */}
            <div className="pt-2">
              <div className="flex flex-col flex-1">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">Citizens Report</h2>
                <p className="text-gray-600 text-base">Citizens share stories via WhatsApp, text, voice, or photos, in their local languages. NewsBridge receives and prepares them for review.</p>
              </div>
            </div>
            {/* Step 2 Content */}
            <div className="pt-2">
              <div className="flex flex-col flex-1">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">AI Translation</h2>
                <p className="text-gray-600 text-base">AI instantly translates messages while keeping tone and cultural nuance intact. A message like "Majị ya kwashe gonakinmu" becomes "The flood destroyed our farms."</p>
              </div>
            </div>
            {/* Step 3 Content */}
            <div className="pt-2">
              <div className="flex flex-col flex-1">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">Journalist Dashboard</h2>
                <p className="text-gray-600 text-base">Verified journalists review, organize, and follow up on reports, turning firsthand accounts into reliable stories.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </section>

      {/* Team Section */}
      <section id="team" className="relative py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet the team behind News Bridge</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Protecting journalists and citizen reporters is our top priority. Our platform meets international
              standards for sensitive reporting.
            </p>
          </div>

          {/* Team Members */}
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Lois Dagana", role: "Product Designer" },
              { name: "Gbadegesin Adeyanju", role: "Backend Engineer" },
              { name: "Isaac Adedokun", role: "Data & ML Scientist" },
              { name: "Davida Spaine-Solomon", role: "Journalist" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-full aspect-square bg-slate-900 rounded-lg mb-4" />
                <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Core Features</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Newsbridge was built to close that gap. We connect local voices to journalists and media houses using
              accessible, language-aware technology.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-6 mx-auto">
                <div className="text-3xl">🎙️</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">WhatsApp and voice reporting</h3>
              <p className="text-gray-600 text-center">Organized workspace for managing reports.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-6 mx-auto">
                <div className="text-3xl">🌐</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">AI-Powered Translation</h3>
              <p className="text-gray-600 text-center">
                Advanced AI preserves cultural nuances while translating across 47 African languages.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-6 mx-auto">
                <div className="text-3xl">🎯</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Cultural Context</h3>
              <p className="text-gray-600 text-center">
                AI understands local customs, traditions, and sensitive topics to maintain story authenticity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section id="who-its-for" className="relative py-20 md:py-32 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Who it is for</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Whether you're an independent journalist or part of a major media house, Newbridge adapts to your workflow
              and amplifies your impact.
            </p>
          </div>

          {/* Two Option Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Independent Journalists */}
            <div className="border-2 border-blue-400 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  👤
                </div>
                <h3 className="text-xl font-semibold">For Independent Journalists</h3>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Discover real community stories</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Collaborate securely with contributors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Stay connected across regions</span>
                </li>
              </ul>
              <Button className="w-full bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900">
                Request Access
              </Button>
            </div>

            {/* Media Houses */}
            <div className="border-2 border-yellow-400 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-slate-900 font-bold">
                  🏢
                </div>
                <h3 className="text-xl font-semibold">For Media Houses</h3>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Discover real community stories</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Collaborate securely with contributors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Stay connected across regions</span>
                </li>
              </ul>
              <Button className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500">Request Access</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & CTA Section */}
      <section className="relative py-20 md:py-32 bg-gray-900 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Contact */}
            <div className="bg-gray-800 bg-opacity-60 backdrop-blur rounded-lg p-12">
              <h3 className="text-3xl font-bold mb-6">Contact us</h3>
              <a
                href="mailto:info@newsbridge.com"
                className="text-2xl font-semibold text-yellow-400 hover:text-yellow-300 underline"
              >
                info@newsbridge.com
              </a>
            </div>

            {/* Right - CTA */}
            <div className="bg-blue-600 rounded-lg p-12">
              <h3 className="text-3xl font-bold mb-6">A Future of Inclusive Journalism</h3>
              <p className="text-lg mb-8 leading-relaxed">
                We believe in an Africa where every citizen — regardless of language, literacy, or location — can
                contribute to trustworthy, community-driven news.
              </p>
              <p className="text-lg font-semibold mb-8 italic">"When stories connect, societies strengthen"</p>
              <Button className="bg-yellow-400 text-slate-900 hover:bg-yellow-500 px-8 py-3 rounded-lg font-semibold">
                Request Access
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Left - Logo & Description */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">NB</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">Newbridge</span>
              </div>
              <p className="text-gray-600 leading-relaxed max-w-sm">
                Connect with authentic citizen voices from underserved African communities through AI-powered
                multilingual reporting. Break barriers, tell untold stories, build community trust.
              </p>
            </div>

            {/* Right - Links */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>
                    <a href="#how-it-works" className="hover:text-gray-900">
                      How it Works
                    </a>
                  </li>
                  <li>
                    <a href="#team" className="hover:text-gray-900">
                      Meet the Team
                    </a>
                  </li>
                  <li>
                    <a href="#who-its-for" className="hover:text-gray-900">
                      Who it's For
                    </a>
                  </li>
                  <li>
                    <a href="#features" className="hover:text-gray-900">
                      Core Features
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>
                    <a href="#" className="hover:text-gray-900">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-900">
                      User Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-900">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 pt-8 text-center text-gray-600 text-sm">
            <p>© 2025 NewsBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
