import { Check, ChevronDown, CircleX, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  error?: string;
  disabled?: boolean;
  required?: boolean;
  searchable?: boolean;
}

const CustomSelect = ({
  name,
  value,
  onChange,
  label,
  placeholder = "Select",
  options,
  error,
  disabled = false,
  required = false,
  searchable = false,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Get selected option label
  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption?.label || placeholder;

  // Filter options based on search term
  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  };

  // Handle option selection
  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Determine border and ring colors based on error state
  const getBorderClasses = () => {
    if (error) {
      return "border-red-600/50 bg-red-50 focus-within:ring-1 focus-within:ring-red-600/50 focus-within:border-red-600/50";
    }
    return "border-[#e5e7eb] focus-within:ring-1 focus-within:ring-[#3754A3]/50 focus-within:border-[#3754A3]/50";
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      <label className="block text-base font-medium text-[#27272A] mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Dropdown Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label}
          className={`
            w-full px-4 py-3 rounded-2xl
            border transition-all duration-300
            font-[poppins] text-base text-left
            flex items-center tracking-[-1] justify-between
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${getBorderClasses()}
            ${!value ? "text-[#ADADAD]/70" : "text-[#27272A]"}
            ${disabled ? "" : "cursor-pointer hover:border-[#3754A3]/30"}
          `}
        >
          <span className="truncate">{displayText}</span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && !disabled && (
          <div
            role="listbox"
            className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {searchable && (
              <div className="sticky top-0 px-4 py-2 bg-white border-b border-gray-100">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-gray-50 text-sm outline-none text-gray-700"
                  />
                </div>
              </div>
            )}
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                {searchTerm ? "No matching options" : "No options available"}
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      handleSelect(option.value);
                      setSearchTerm("");
                    }}
                    className={`
                      w-full px-4 py-3 text-left text-base
                      flex items-center justify-between
                      transition-colors duration-150
                      ${
                        isSelected
                          ? "bg-[#3754A3]/10 text-[#3754A3] font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }
                      first:rounded-t-2xl last:rounded-b-2xl
                    `}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && (
                      <Check className="w-5 h-5 text-[#3754A3] flex-shrink-0 ml-2" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div
          id={`${name}-error`}
          className="flex gap-2 items-center text-red-600 mt-2 animate-in fade-in slide-in-from-top-1 duration-200"
          role="alert"
        >
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
