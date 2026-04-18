import Image from "next/image";

const stats = [
  {
    value: "51M +",
    description:
      "WhatsApp users in Nigeria. The largest communication channel in the country and the front door to NewsBridge.",
  },
  {
    value: "1,031",
    description:
      "Registered media houses in Nigeria. Most can't afford reporters in rural communities.",
  },
  {
    value: "500+",
    description:
      "Languages spoken across Nigeria. Most have little to no representation in national news coverage.",
  },
];

const BeliefSection = () => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-[#F7F7F7] overflow-hidden">
      {/* Same background SVG as StoriesSection */}
      <div className="absolute -right-45 min-[1800px]:-right-85 min-h-[1500px] w-9/11 -top-30 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/background.svg"
          alt="Background"
          fill
          className="object-fill"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main text */}
        <div className="mb-14 max-w-5xl">
          <p className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] leading-tight tracking-[-2px]">
            We{" "}
            <span
              className="relative inline-block px-1"
              style={{ backgroundColor: "#FCC527" }}
            >
              believe
            </span>{" "}
            the next wave of African journalism will not come from newsrooms
            expanding outward. It will come from citizens reaching inward,
            sending what they see, in their own words, in their own language,
            through digital innovation.
          </p>
          <p className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] leading-tight tracking-[-2px] mt-4">
            Every day without this infrastructure, stories disappear.
            Communities stay invisible. And misinformation wins by default
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="bg-white rounded-3xl px-8 py-10 flex flex-col items-center text-center"
              style={{ boxShadow: "0px 4px 24px 0px rgba(0,0,0,0.06)" }}
            >
              <p className="text-3xl sm:text-4xl font-bold text-[#9B9B9B] mb-4">
                {stat.value}
              </p>
              <p className="text-[#9B9B9B] text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeliefSection;
