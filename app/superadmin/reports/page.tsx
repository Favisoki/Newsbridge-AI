"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Volume2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const mockReports = Array(9).fill({
  id: "1",
  title: "Suspicious Activity Reported Near City Park",
  description:
    "Eyewitness reports of a major fire outbreak at Balogun Market. Multiple shops affected, emergency services on scene",
  location: "Abuja, Nigeria",
  date: "Jan 14, 2024, 9:30 PM",
  category: "Flood",
  language: "Reported in Hausa",
  reporter: "Anonymous Citizen",
})

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex-1">
      {/* Main Content */}
      <div className="p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                Reports <span className="text-gray-500">(190)</span>
              </h2>
              <p className="text-gray-600">Monitor all reports received across the Newsbridge ecosystem.</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Calendar className="w-4 h-4" />
              Today
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by title, reporters, location or topic"
                  className="pl-10 bg-white border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              Filter by
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {mockReports.map((report, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-6 h-6 text-blue-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 font-medium px-3 py-1">
                      {report.category}
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 font-medium px-3 py-1">
                      {report.language}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {report.date}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-gray-600 mb-4">{report.description}</p>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-6 h-6 rounded-full bg-gray-200" />
                    <span className="font-medium">{report.reporter}</span>
                    <svg
                      className="w-4 h-4 mx-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {report.location}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="flex-shrink-0 bg-transparent">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </Button>
          <div className="flex gap-2">
            {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
              <Button
                key={index}
                variant={page === 1 ? "default" : "outline"}
                size="sm"
                className={page === 1 ? "bg-blue-600" : ""}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            Next
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}
