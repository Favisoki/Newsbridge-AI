import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const WhoItsFor = () => {
  return (
    <section
            id="who-its-for"
            className="relative w-full py-16 md:py-32 text-white bg-no-repeat bg-full"
            style={{
              background: "url('/background3.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 md:justify-between gap-4 mx-auto">
                <div className="text-left mb-16">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-[-2.6] font-semibold mb-4">
                    Who it is for
                  </h2>
                  <p className="text-gray-200 tracking-[-1.2] text-lg max-w-2xl mx-auto">
                    Newsbridge helps you get the right report from citizens
                  </p>
                </div>
    
                {/* One Option Card */}
                {/* Independent Journalists */}
                <div
                  className="rounded-3xl px-8 py-11 bg-[#111E42] w-full lg:max-w-sm md:justify-self-end"
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
  )
}

export default WhoItsFor