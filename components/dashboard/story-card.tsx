import { Button } from "@/components/ui/button"
import { Calendar, Mic, MapPin } from "lucide-react"

interface StoryCardProps {
  story: {
    id: string
    headline: string
    excerpt: string
    category: string
    language: string
    date: string
    source: string
    location: string
    status: string
  }
}

export function StoryCard({ story }: StoryCardProps) {
  const statusColors: Record<string, string> = {
    New: "bg-blue-100 text-blue-800",
    "In Review": "bg-amber-100 text-amber-800",
    Exported: "bg-green-100 text-green-800",
  }

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
        <Mic className="w-4 h-4 text-gray-600" />
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
          {story.category}
        </span>
        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium">
          Reported in {story.language}
        </span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
        <Calendar className="w-4 h-4" />
        <span>{story.date}</span>
      </div>

      {/* Headline */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 pr-32">{story.headline}</h3>

      {/* Excerpt */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{story.excerpt}</p>

      {/* Source Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-600 text-lg">👤</span>
        </div>
        <div className="text-sm">
          <p className="font-medium text-gray-900">{story.source}</p>
          <p className="text-gray-500 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {story.location}
          </p>
        </div>
      </div>
    </div>
  )
}
