import HowItWorks from "@/components/landing-page/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../Common/Logo";
import HowItWorksMobile from "./components/HowItWorksMobile";
import HeroSection from "./components/HeroSection";
import StoriesSection from "./components/StoriesSection";
import FeaturesSection from "./components/FeaturesSection";
import WhoItsFor from "./components/WhoItsFor";
import TeamSection from "./components/TeamSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="overflow-hidden tracking-[-1]">
      <HeroSection />
      <StoriesSection />
      <div className="hidden min-[768px]:block">
        <HowItWorks />
      </div>
      <div className="block min-[768px]:hidden">
        <HowItWorksMobile />
      </div>
      <FeaturesSection />
      <WhoItsFor />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
