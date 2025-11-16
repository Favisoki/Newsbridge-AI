import { CircleX, Eye, EyeOff, LucideIcon, Mail } from "lucide-react";
import React from "react";
import { Input } from "./input";

interface CustomInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "email" | "password" | "text" | "tel";
  label: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  showPassword?: boolean;
  Icon?: LucideIcon;
  inputClassName?: string;
  onTogglePassword?: () => void;
}

const CustomInput = ({
  name,
  value,
  onChange,
  type = "text",
  label,
  placeholder,
  Icon = Mail,
  error,
  inputClassName,
  disabled = false,
  required = false,
  showPassword,
  onTogglePassword,
}: CustomInputProps) => {
  const isPasswordInput = type === "password";

  // Determine border and ring colors based on error state
  const getBorderClasses = () => {
    if (error) {
      return "border-red-600/50 bg-red-50 focus-within:ring-1 focus-within:ring-red-600/50 focus-within:border-red-600/50";
    }
    return "border-[#e5e7eb] focus-within:ring-1 focus-within:ring-[#3754A3]/50 focus-within:border-[#3754A3]/50";
  };

  return (
    <div className="w-full">
      <label className="block text-base font-medium text-[#27272A] mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div
        className={`
          relative flex items-center rounded-2xl py-2 
          ${isPasswordInput ? "px-1" : "px-4"}
          border transition-all duration-300
          ${getBorderClasses()}  ${inputClassName}
        `}
      >
        {/* Email Icon */}
        {!isPasswordInput && <Icon className="size-6 text-[#39474F]/65 mr-2" />}

        {/* Input Field */}
        <Input
          name={name}
          type={isPasswordInput ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className={`w-full border-none shadow-none !ring-0 placeholder:text-[#ADADAD]/70  placeholder:font-normal placeholder:text-base ${
            isPasswordInput ? `` : `font-[poppins] placeholder:font-[poppins]`
          }`}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${label}-error` : undefined}
        />

        {/* Password Toggle Button */}
        {isPasswordInput && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer rounded p-1"
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={disabled}
          >
            {showPassword ? (
              <EyeOff strokeWidth={1.5} className="w-7 h-7 text-[#192D65]/60" />
            ) : (
              <Eye strokeWidth={1.5} className="w-7 h-7 text-[#192D65]/60" />
            )}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div
          id={`${label}-error`}
          className="flex gap-2 items-center text-red-600 mt-2 animate-in fade-in slide-in-from-top-1 duration-200"
          role="alert"
        >
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};

export default CustomInput;
