import Link from "next/link";
import Image from "next/image";

const Logo = ({className, height = 25, width = 28, textSize = "text-lg"}: {className?: string, textSize?: string, height?: number, width?: number}) => {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 transition-opacity ${className}`}
    >
      <Image src={"/images/logo.png"} width={width} height={height} alt={"Logo"} />
      <span className={` font-semibold text-[#2148A2] tracking-[-2] ${textSize}`}>NewsBridge</span>
    </Link>
  );
};

export default Logo;
