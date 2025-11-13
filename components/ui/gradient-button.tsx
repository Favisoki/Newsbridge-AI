import { ButtonHTMLAttributes } from "react";
import { Button } from "./button";
import { LucideIcon } from "lucide-react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: LucideIcon;
  btnText: string;
  borderColor?: string;
  isIconPresent?: boolean
  classes?: string;
  variant?: "default" | "primary" | "secondary";
}

const variantStyles = {
  default: "bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800",
  primary: "bg-linear-to-b from-[#3754A3]/70 via-[#3754A3]/85 to-[#3754A3]",
  secondary: "bg-linear-to-b from-[#FCC527]/50 via-[#FCC527]/70 to-[#FCC527] text-black border",
};

const GradientButton = ({
  Icon,
  isIconPresent,
  variant = "primary",
  btnText,
  classes,
  borderColor = "#324a8b",
  ...props
}: GradientButtonProps
) => {
  return (
    <Button
      {...props}
      className={`hover:scale-[1.02] w-full text-white px-8 py-[30px] text-base rounded-2xl inline-flex items-center transition-all duration-300 gap-2 relative ${variantStyles[variant]} ${classes}`}
      style={{
        borderImageSource:
          "linear-gradient(180deg, #FFFFFF -20.83%, rgba(255, 255, 255, 0) 15.62%)",
        boxShadow: `0px 0px 0px 1px ${borderColor}`,
      }}
    >
      {btnText}
      {isIconPresent && Icon && (
        <div className="outline-2 outline-white rounded-full p-0.5">
          <Icon className="w-6 h-6" strokeWidth={3} />
        </div>
      )}
    </Button>
  );
};

export default GradientButton;
