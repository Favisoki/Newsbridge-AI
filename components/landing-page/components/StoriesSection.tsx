import Image from "next/image"


const StoriesSection = () => {
  return (
    <section className="relative pt-10 sm:pt-14 lg:pt-20 bg-[#F7F7F7] overflow-hidden">
        <div className="absolute -right-45 min-[1800px]:-right-85 min-h-[1500px] w-9/11 -top-30 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/background.svg"
            alt="Background"
            fill
            className="object-fill"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-[-2.8] text-center font-semibold text-[#1E1E1E] mb-4">
            The Stories that Never Get Told
          </h2>
          <div className="grid sm:flex items-start gap-12 py-2 sm:py-10 md:py-20">
            {/* Left Content */}
            <div className="space-y-6 basis-[55%] tracking-[-1.5]">
              <div className="text-[#00000099] leading-loose text-lg sm:w-[600px]">
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
  )
}

export default StoriesSection
