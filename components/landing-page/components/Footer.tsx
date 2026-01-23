import Link from "next/link";
import Image from "next/image";
import Logo from "../../Common/Logo";

const Footer = () => {
  return (
    <footer className=" bg-white border-t border-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-1 gap-12 mb-12 relative">
          <div>
            {/*  Logo & Description */}
            <div className="flex items-center gap-6 mb-6 ml-6">
              <div className="w-8 flex items-center justify-center">
                <Logo textSize="text-2xl" height={40} width={40} />
              </div>
            </div>
            <p className="text-gray-600 -ml-6 leading-relaxed max-w-md">
              Connect with authentic citizen voices from underserved African
              communities through AI-powered multilingual reporting. Break
              barriers, tell untold stories, build community trust.
            </p>
          </div>

          <div>
            <ul className="space-y-2 -ml-6 flex flex-wrap gap-4 text-gray-600 text-sm">
              <li>
                <Link href="#how-it-works" className="hover:text-gray-900">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="#team" className="hover:text-gray-900">
                  Meet the Team
                </Link>
              </li>
              <li>
                <Link href="#who-its-for" className="hover:text-gray-900">
                  Who it's For
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-gray-900">
                  Core Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  User Guide
                </Link>
              </li>
            </ul>
          </div>
          <div className="absolute top-10 scale-x-110 -right-31 min-[1550px]:-translate-x-28">
            <Image
              src="/images/microphone.png"
              alt="Microphones background"
              width={500}
              height={400}
              className="object-contain scale-100 opacity-70"
            />
          </div>
        </div>

      </div>
        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 text-center text-gray-600 text-sm">
          <p>© 2025 NewsBridge. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;