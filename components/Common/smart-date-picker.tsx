"use client";

import { useRef, useState } from "react";
import { format } from "date-fns";
import { Calendar, X } from "lucide-react";
import { Button } from "../ui/button";

export default function SmartDatePicker() {
  const [date, setDate] = useState<Date | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const formatDisplayDate = (d: Date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (a: Date, b: Date) =>
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear();

    if (isSameDay(d, today)) return "Today";
    if (isSameDay(d, yesterday)) return "Yesterday";
    return format(d, "dd MMM yyyy");
  };

  const toInputDateValue = (d: Date) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleOpenPicker = () => {
    if (inputRef.current && typeof inputRef.current.showPicker === "function") {
      inputRef.current.showPicker();
    } else {
      inputRef.current?.focus();
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDate(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="relative inline-flex items-center gap-2">
      {/* Trigger */}
      <button
        type="button"
        className={`px-4 py-2 border cursor-pointer rounded-md bg-white shadow-sm w-48 text-left flex items-center justify-between ${
          date ? "text-gray-700" : "text-gray-400"
        }`}
        onClick={handleOpenPicker}
      >
        <span className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>{date ? formatDisplayDate(date) : "Select date"}</span>
        </span>
      </button>

      {/* Clear button (ONLY shown when date exists) */}
      {date && (
        <Button
          type="button"
          onClick={handleClear}
          aria-label="Clear date"
          className="inline-flex items-center justify-center p-2 rounded-md border border-red-700/50 bg-white hover:bg-gray-50"
        >
          <X className="w-4 h-4 text-red-700/50" />
        </Button>
      )}

      {/* Hidden native input */}
      <input
        ref={inputRef}
        type="date"
        value={date ? toInputDateValue(date) : ""}
        onChange={(e) => {
          if (e.target.value) setDate(new Date(e.target.value));
          else setDate(null);
        }}
        className="absolute opacity-0 pointer-events-none"
      />
    </div>
  );
}
