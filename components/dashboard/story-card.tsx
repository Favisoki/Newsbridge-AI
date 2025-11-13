import { Button } from "@/components/ui/button"
import { Calendar, Mic, MapPin, Video, AudioLines, FileText } from "lucide-react"

interface StoryCardProps {
  story: {
    id: number
    title: string | null
    translated_text: string | null
    text: string | null
    category: string | null
    language: string | null
    created_at: string
    location: string | null
    video: string | null
    audio: string | null
    summary: string | null
  }
}

export function StoryCard({ story }: StoryCardProps) {
  // Determine media type
  const getMediaIcon = () => {
    if (story.video) return <Video className="w-4 h-4 text-gray-600" />;
    if (story.audio) return <AudioLines className="w-4 h-4 text-gray-600" />;
    return <FileText className="w-4 h-4 text-gray-600" />;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Get headline - use title, or first part of translated_text, or fallback
  const getHeadline = () => {
    if (story.title) return story.title;
    if (story.translated_text) {
      const firstSentence = story.translated_text.split(/[.!?]/)[0];
      return firstSentence.length > 100 
        ? firstSentence.substring(0, 97) + '...'
        : firstSentence;
    }
    return "Report Submitted";
  };

  // Get excerpt
  const getExcerpt = () => {
    return story.translated_text || story.text || story.summary || "No description available";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition relative">
      <div className="absolute top-6 right-6">
        <Button
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-50 whitespace-nowrap bg-transparent"
        >
          View Details
        </Button>
      </div>

      <div className="flex gap-2 mb-3 items-center">
        {getMediaIcon()}
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
          {story.category || "General"}
        </span>
        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium">
          Reported in {story.language || "Unknown"}
        </span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
        <Calendar className="w-4 h-4" />
        <span>{formatDate(story.created_at)}</span>
      </div>

      {/* Headline */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 pr-32">
        {getHeadline()}
      </h3>

      {/* Excerpt */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {getExcerpt()}
      </p>

      {/* Source Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-600 text-lg">👤</span>
        </div>
        <div className="text-sm">
          <p className="font-medium text-gray-900">Anonymous Citizen</p>
          <p className="text-gray-500 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {story.location || "Nigeria"}
          </p>
        </div>
      </div>
    </div>
  )
}