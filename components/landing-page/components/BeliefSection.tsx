import Image from "next/image";

const BeliefSection = () => {
  return (
    <section className="relative w-full bg-white px-4 md:px-6 pt-0 pb-16 md:pb-24">
      {/* Container limiting max width, pulling it up over WhoItsFor */}
      <div className="max-w-[1230px] mx-auto relative z-20 -mt-16 md:-mt-32 pt-16 pb-12 rounded-[16px] shadow-[0px_4px_30px_rgba(0,0,0,0.08)] bg-white overflow-hidden">
        {/* Background Image inside the card */}
        <div className="absolute top-0 right-0 w-full h-full opacity-60 pointer-events-none">
          <Image
            src="/background.svg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 md:px-16 lg:px-24">
          <div className="text-xl md:text-2xl lg:text-[28px] text-[#1E1E1E] leading-relaxed tracking-[-0.02em]">
            We believe the next wave of African journalism will not come from
            newsrooms expanding outward. It will come from citizens reaching
            inward, sending what they see, in their own words, in their own
            language, through digital innovation.
            <br />
            <br />
            Every day without this infrastructure, stories disappear. Communities
            stay invisible. And misinformation wins by default
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 md:mt-16">
            <div className="bg-white rounded-[16px] p-8 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] text-center transition-transform hover:-translate-y-1">
              <h3 className="text-3xl md:text-4xl font-bold text-[#5A5A5A] mb-4">51M +</h3>
              <p className="text-[#848484] text-sm md:text-base leading-relaxed">
                WhatsApp users in Nigeria. The largest communication channel in
                the country and the front door to NewsBridge.
              </p>
            </div>

            <div className="bg-white rounded-[16px] p-8 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] text-center transition-transform hover:-translate-y-1">
              <h3 className="text-3xl md:text-4xl font-bold text-[#5A5A5A] mb-4">1,031</h3>
              <p className="text-[#848484] text-sm md:text-base leading-relaxed">
                Registered media houses in Nigeria. Most can't afford reporters
                in rural communities.
              </p>
            </div>

            <div className="bg-white rounded-[16px] p-8 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] text-center transition-transform hover:-translate-y-1">
              <h3 className="text-3xl md:text-4xl font-bold text-[#5A5A5A] mb-4">500+</h3>
              <p className="text-[#848484] text-sm md:text-base leading-relaxed">
                Languages spoken across Nigeria. Most have little to no
                representation in national news coverage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeliefSection;
