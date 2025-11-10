import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
    >
      <Image src={"/images/logo.png"} width={28} height={25} alt={"Logo"} />
      <span className="text-lg font-semibold text-[#3C60AF]">NewsBridge</span>
    </Link>
  );
};

export default Logo;
