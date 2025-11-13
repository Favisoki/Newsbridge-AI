import { CircleX } from "lucide-react";
import React from "react";

interface CustomTextareaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  maxLength?: number;
}

const CustomTextarea = ({
  name,
  value,
  onChange,
  label,
  placeholder,
  error,
  disabled = false,
  required = false,
  rows = 4,
  maxLength,
}: CustomTextareaProps) => {
  // Determine border and ring colors based on error state
  const getBorderClasses = () => {
    if (error && value) {
      return "border-red-600/50 bg-red-50 focus-within:ring-1 focus-within:ring-red-600/50 focus-within:border-red-600/50";
    }
    return "border-[#e5e7eb] focus-within:ring-1 focus-within:ring-[#3754A3]/50 focus-within:border-[#3754A3]/50";
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-base font-medium text-[#27272A]">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {maxLength && (
          <span className="text-sm text-gray-400">
            {value.length}/{maxLength}
          </span>
        )}
      </div>

      <div
        className={`
          relative rounded-2xl px-4 py-3
          border transition-all duration-300
          ${getBorderClasses()}
        `}
      >
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          rows={rows}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className="w-full border-none shadow-none font-[poppins] focus:ring-0 placeholder:text-[#ADADAD]/70 placeholder:font-normal placeholder:text-base resize-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div
          id={`${name}-error`}
          className="flex gap-2 items-center text-red-600 mt-2 animate-in fade-in slide-in-from-top-1 duration-200"
          role="alert"
        >
          <CircleX className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};

export default CustomTextarea;