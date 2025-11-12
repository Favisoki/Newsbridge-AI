"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ChevronDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoryCard } from "@/components/dashboard/story-card";
import { QuickStats } from "@/components/dashboard/quick-stats";
import { useRouter, useSearchParams } from "next/navigation";
import useToast from "../hooks/useToast";

// Mock data - replace with API call
const mockStories = [
  {
    id: "1",
    headline: "Suspicious Activity Reported Near City Park",
    excerpt:
      "Eyewitness reports of a major fire outbreak at Balogun Market. Multiple shops affected, emergency services on scene",
    category: "Flood",
    language: "Hausa",
    date: "Jan 14, 2024, 9:30 PM",
    source: "Anonymous Citizen",
    location: "Abuja, Nigeria",
    status: "New",
  },
  {
    id: "2",
    headline: "Suspicious Activity Reported Near City Park",
    excerpt:
      "Eyewitness reports of a major fire outbreak at Balogun Market. Multiple shops affected, emergency services on scene",
    category: "Flood",
    language: "Hausa",
    date: "Jan 14, 2024, 9:30 PM",
    source: "Anonymous Citizen",
    location: "Abuja, Nigeria",
    status: "In Review",
  },
  {
    id: "3",
    headline: "Suspicious Activity Reported Near City Park",
    excerpt:
      "Eyewitness reports of a major fire outbreak at Balogun Market. Multiple shops affected, emergency services on scene",
    category: "Flood",
    language: "Hausa",
    date: "Jan 14, 2024, 9:30 PM",
    source: "Anonymous Citizen",
    location: "Abuja, Nigeria",
    status: "Exported",
  },
  {
    id: "4",
    headline: "Suspicious Activity Reported Near City Park",
    excerpt:
      "Eyewitness reports of a major fire outbreak at Balogun Market. Multiple shops affected, emergency services on scene",
    category: "Flood",
    language: "Hausa",
    date: "Jan 14, 2024, 9:30 PM",
    source: "Anonymous Citizen",
    location: "Abuja, Nigeria",
    status: "New",
  },
];

export default function NewsBoard() {
  const { successToastHandler } = useToast();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const toastShownRef = useRef(false);

  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const loginMessage =
    searchParams.get("msg") === "login-success" && "Login Success";
  const onboardingMessage =
    searchParams.get("msg") === "firsttime-signup" &&
    "Welcome to your Dashboard";

  // Helper function to remove query param
  const removeQueryParam = (param: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(param);
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    router.replace(newUrl);
  };

  useEffect(() => {
    // If already shown, skip
    if (toastShownRef.current) return;

    const msg = searchParams.get("msg");
    if (!msg) return;

    let message = "";

    if (msg === "login-success") {
      message = "Login Success";
    } else if (msg === "firsttime-signup") {
      message = "Welcome to your Dashboard";
    }

    if (message) {
      successToastHandler(message);
      toastShownRef.current = true;

      // Remove query param from URL
      const params = new URLSearchParams(searchParams.toString());
      params.delete("msg");
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, []);

  const filteredStories = mockStories.filter((story) => {
    const matchesSearch =
      story.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      story.status.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);
  const paginatedStories = filteredStories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-8">
      {/* Quick Stats */}
      {/* <QuickStats /> */}

      {/* Active Reports Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Active Reports ({mockStories.length})
            </h2>
            <p className="text-gray-600 mt-1">
              Review incoming citizen journalism reports
            </p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Calendar className="w-4 h-4" />
            Today
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, reporters, location or topic"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            Filter by
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>

        {/* Recent Reports */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Reports
          </h3>
          <div className="space-y-4">
            {paginatedStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </Button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-900 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next →
          </Button>
        </div>
      </div>

      {/* WhatsApp Icon */}
      <div className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 cursor-pointer">
        <span className="text-2xl">💬</span>
      </div>
    </div>
  );
}
