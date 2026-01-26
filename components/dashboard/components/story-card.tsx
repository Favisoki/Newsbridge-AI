import ReportDetailModal from "@/components/modal-components/report-details-modal";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { formatDate, getExcerpt, getHeadline, getMediaIcon } from "@/lib/utils";
import {
  Calendar,
  MapPin,
} from "lucide-react";
import { useState } from "react";

interface StoryCardProps {
  story: {
    id: number;
    title: string | null;
    translated_text: string | null;
    text: string | null;
    category: string | null;
    language: string | null;
    created_at: string;
    location: string | null;
    video: string | null;
    audio: string | null;
    summary: string | null;
  };
}

export function StoryCard({ story }: StoryCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition relative">
      <div className="absolute top-6 right-6">
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="border-blue-600 text-blue-600 rounded-3xl hover:bg-blue-50 whitespace-nowrap bg-transparent"
        >
          View Details
        </Button>
      </div>

      <div className="flex gap-2 mb-3 items-center">
        {getMediaIcon(story)}
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-small">
          {story?.category || "General"}
        </span>
        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-small">
          Reported in {story?.language || "Unknown"}
        </span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
        <Calendar className="w-4 h-4" />
        <span>{formatDate(story?.created_at)}</span>
      </div>

      {/* Headline */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 pr-32">
        {getHeadline(story)}
      </h3>

      {/* Excerpt */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{getExcerpt(story)}</p>

      {/* Source Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-600 text-lg">👤</span>
        </div>
        <div className="text-sm">
          <p className="font-medium text-gray-900">Anonymous Citizen</p>
          <p className="text-gray-500 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {story?.location || "Nigeria"}
          </p>
        </div>
      </div>
      {isOpen && (
        <Modal
          size="xxl"
          showCloseButton
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <ReportDetailModal onClose={() => setIsOpen(false)} id={story?.id} />
        </Modal>
      )}
    </div>
  );
}
