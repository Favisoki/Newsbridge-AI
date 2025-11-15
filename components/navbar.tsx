"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "./Common/Logo";

export function Navbar() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    // Helper: updates hash from current URL
    const updateHash = () => {
      const hash = window.location.hash;
      setActiveHash(hash);
    };

    // Update on load
    updateHash();

    // Handle scroll-based detection too
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          current = "#" + section.id;
        }
      });
      if (current && current !== activeHash) {
        setActiveHash(current);
      }
    };

    // Event listeners
    window.addEventListener("hashchange", updateHash);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, activeHash]);

  const navItems = [
    { href: "/#features", label: "Features" },
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#who-its-for", label: "Who it’s For" },
    { href: "/#team", label: "The Team" },
    { href: "/#guide", label: "User Guide" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      const hash = href.substring(1);
      return pathname === "/" && activeHash === hash;
    }
    return pathname === href;
  };

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 px-6 max-w-7xl mx-auto bg-transparent tracking-[-1]">
      <div className="">
        <div className="bg-white rounded-3xl border border-[#E1E1E1] shadow-[0px_20px_40px_0px_#C3C3C340]">
          <div className="px-8 py-4 flex items-center justify-between">
            {/* Logo */}
            <Logo textSize="tracking-[-0.5] text-xl" />

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-normal hover:text-[#3C60AF] transition-colors duration-300 ${
                    isActive(item.href)
                      ? "text-[#3C60AF]!  border-[#3C60AF]! pb-1"
                      : "text-[#1E1E1E] hover:text-[#1E1E1E]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center font-medium gap-3 text-base">
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="text-[#3754A3] border-none rounded-2xl hover:scale-105 bg-[#E8EEFF] h-14 w-36"
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button
                  className="bg-linear-to-b from-[#3754A3]/70 via-[#3754A3]/90 to-[#3754A3] text-white h-14 w-36 hover:scale-105 rounded-2xl"
                  style={{
                    borderImageSource:
                      "linear-gradient(180deg, #FFFFFF -20.83%, rgba(255, 255, 255, 0) 15.62%)",
                    boxShadow: "0px 0px 0px 1px #8078FF",
                  }}
                >
                  Request Access
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
