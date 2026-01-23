import Image from "next/image";


const TeamSection = () => {
  return (
    <section id="team" className="relative py-16 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl md:tracking-[-2.8] tracking-[-2.6] font-bold text-gray-900 mb-4">
                  Meet the team behind News Bridge
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Protecting journalists and citizen reporters is our top priority.
                  Our platform meets international standards for sensitive
                  reporting.
                </p>
              </div>
    
              {/* Team Members */}
              <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
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
                        src={member.image || "/placeholder.svg"}
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
  )
}

export default TeamSection;