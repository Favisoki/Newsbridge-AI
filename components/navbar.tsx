"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "./Common/Logo";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { href: "/#who-its-for", label: "Who it's For" },
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
    <nav className="fixed top-14 left-0 right-0 z-50 px-4 sm:px-6 max-w-7xl mx-auto bg-transparent tracking-[-1]">
      <div className="">
        <div className="bg-white rounded-3xl border border-[#E1E1E1] shadow-[0px_20px_40px_0px_#C3C3C340]">
          <div className="px-8 min-[1087px]:py-4 py-5 flex items-center justify-between">
            {/* Logo */}
            <Logo textSize="tracking-[-0.5] text-xl" />

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center xl:gap-8 gap-3 ">
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
            <div className="hidden lg:flex items-center font-medium gap-3 text-base">
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

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-[#1E1E1E] hover:text-[#3C60AF] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <div className="lg:hidden fixed inset-x-0 top-0 bottom-0 z-50 bg-white overflow-y-auto">
              <div className="px-6 py-6 flex flex-col h-full">
                {/* Header with Logo and Close Button */}
                <div className="flex items-center justify-between mb-8">
                  <Logo textSize="tracking-[-0.5] text-xl" />
                  <button
                    className="text-[#1E1E1E] hover:text-[#3C60AF] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-2 flex-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`py-4 px-4 rounded-lg font-medium text-lg transition-colors duration-300 ${
                        isActive(item.href)
                          ? "text-[#3C60AF] bg-[#E8EEFF]"
                          : "text-[#1E1E1E] hover:text-[#3C60AF] hover:bg-[#F5F5F5]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col gap-3 pt-6 border-t border-[#E1E1E1] mt-auto">
                  <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full text-[#3754A3] border-none rounded-2xl bg-[#E8EEFF] h-14 text-base font-medium"
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      className="w-full bg-linear-to-b from-[#3754A3]/70 via-[#3754A3]/90 to-[#3754A3] text-white h-14 rounded-2xl text-base font-medium"
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
          </>
        )}
      </div>
    </nav>
  );
}
