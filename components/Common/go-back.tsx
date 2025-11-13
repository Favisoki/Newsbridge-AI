import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const GoBack = ({
  className,
  to = "/",
  iconSize = 14,
  btnText = "Back Home",
}: {
  className?: string;
  to?: string;
  iconSize?: number;
  btnText?: string;
}) => {
  return (
    <div className="flex items-center flex-col gap-6">
      <Link
        href={to}
        className={`group text-[#3754A3] text-base font-semibold hover:text-[#2148A2] tracking-[-1] flex items-center gap-2 underline underline-offset-3 ${className}`}
      >
        <ArrowLeft
          size={iconSize}
          strokeWidth={3}
          className="group-hover:scale-120  transition-transform duration-300"
        />
        {btnText}
      </Link>
      {/* Logo */}
    </div>
  );
};

export default GoBack;
