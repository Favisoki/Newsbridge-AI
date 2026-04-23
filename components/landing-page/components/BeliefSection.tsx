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
    <section className="relative w-full bg-white -mt-20 sm:-mt-24 md:-mt-32 lg:-mt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Overlapping Card */}
        <div 
          className="relative mx-auto rounded-t-2xl sm:rounded-t-3xl overflow-hidden bg-white shadow-2xl"
          style={{
            width: "100%",
            maxWidth: "1230px",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          {/* Background SVG */}
          <div className="absolute inset-0 opacity-100 pointer-events-none">
            <Image
              src="/background.svg"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-16">
            {/* Main text */}
            <div className="mb-8 sm:mb-12 md:mb-16">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight tracking-tight mb-6 text-balance">
                We{" "}
                <span
                  className="px-1 sm:px-2"
                  style={{ backgroundColor: "#FCC527" }}
                >
                  believe
                </span>{" "}
                the next wave of African journalism will not come from newsrooms
                expanding outward. It will come from citizens reaching inward,
                sending what they see, in their own words, in their own language,
                through digital innovation.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                Every day without this infrastructure, stories disappear.
                Communities stay invisible. And misinformation wins by default
              </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.value}
                  className="bg-white rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-8 sm:py-10"
                  style={{ boxShadow: "0px 4px 24px 0px rgba(0,0,0,0.06)" }}
                >
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeliefSection;
