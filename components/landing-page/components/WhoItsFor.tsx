import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const WhoItsFor = () => {
  return (
    <section
            id="who-its-for"
            className="relative w-full pt-16 md:pt-32 pb-40 md:pb-56 text-white bg-no-repeat bg-full"
            style={{
              background: "url('/background3.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-6 mx-auto items-center">

                {/* Left: Heading */}
                <div className="text-left">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-[-2.6] font-semibold mb-4">
                    Who it is for
                  </h2>
                  <p className="text-gray-300 tracking-[-1.2] text-base max-w-xs">
                    NewsBridge serves everyone in the chain from the citizen who sees it happen to the newsroom that tells the world.
                  </p>
                </div>

                {/* Card: For Media Houses */}
                <div
                  className="rounded-3xl px-8 py-11 bg-[#111E42] w-full h-full"
                  style={{ borderTop: "4px solid #FCC527" }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#FCC527]/20 flex items-center justify-center flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z" fill="#FCC527"/>
                        <rect x="9" y="15" width="6" height="6" fill="#FCC527" opacity="0.6"/>
                      </svg>
                    </div>
                    <span className="font-semibold text-lg text-white">For Media Houses</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-base text-gray-200">
                    <li className="flex items-start gap-3">
                      <span className="text-[#FCC527] mt-1">•</span>
                      <span>Access reports from communities your team can&apos;t physically reach</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#FCC527] mt-1">•</span>
                      <span>Every report is translated, structured, and ready for editorial review</span>
                    </li>
                  </ul>
                  <Link
                    className="group cursor-pointer z-20 transition-all duration-300"
                    href={"/onboarding/media-house"}
                  >
                    <div className="group-hover:scale-105 inline-flex items-center gap-2 tracking-[0] bg-transparent outline-none! text-[#FCC527] rounded-lg font-semibold transition-all duration-300 text-base">
                      Get early access
                      <div className="rounded-full border-2 group-hover:translate-x-1 transition-all duration-300 p-0.5 border-[#FCC527]">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Card: For Independent Journalists */}
                <div
                  className="rounded-3xl px-8 py-11 bg-[#111E42] w-full h-full"
                  style={{ borderTop: "4px solid #3754A3" }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#3754A3]/30 flex items-center justify-center flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="8" r="4" fill="#7B9FE8"/>
                        <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20" stroke="#7B9FE8" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="font-semibold text-lg text-white">For Independent Journalists</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-base text-gray-200">
                    <li className="flex items-start gap-3">
                      <span className="text-[#7B9FE8] mt-1">•</span>
                      <span>Discover real community stories</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#7B9FE8] mt-1">•</span>
                      <span>Stay connected across regions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#7B9FE8] mt-1">•</span>
                      <span>Source stories directly from communities, not from social media</span>
                    </li>
                  </ul>
                  <Link
                    className="group cursor-pointer z-20 transition-all duration-300"
                    href={"/onboarding/independent-journalist"}
                  >
                    <div className="group-hover:scale-105 inline-flex items-center gap-2 tracking-[0] bg-transparent outline-none! text-white rounded-lg font-semibold transition-all duration-300 text-base">
                      Join the waitlist
                      <div className="rounded-full border-2 group-hover:translate-x-1 transition-all duration-300 p-0.5 border-white">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </div>

              </div>
            </div>
          </section>
  )
}

export default WhoItsFor
