"use client"

import { useState, useEffect } from "react"
import { superadminApi } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Volume2, MapPin, Calendar } from "lucide-react"

interface Report {
  id: string
  title: string
  description: string
  category: string
  language: string
  submittedBy: string
  location: string
  date: string
  hasAudio: boolean
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBy, setFilterBy] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalReports] = useState(190)

  useEffect(() => {
    loadReports()
  }, [currentPage, filterBy])

  const loadReports = async () => {
    setLoading(true)
    try {
      const response = await superadminApi.getAllReports({
        search: searchQuery,
        page: currentPage,
        filter: filterBy,
      })
      if (response.success && response.data) {
        setReports(response.data.results || response.data)
      }
    } catch (error) {
      console.error("Failed to load reports:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports ({totalReports})</h1>
          <p className="text-sm text-gray-600 mt-1">Monitor all reports received across the Newsbridge ecosystem.</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Calendar className="w-4 h-4" />
          Today
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by title, reporters, location or topic"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterBy} onValueChange={setFilterBy}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reports</SelectItem>
            <SelectItem value="flood">Flood</SelectItem>
            <SelectItem value="hausa">Hausa Language</SelectItem>
            <SelectItem value="recent">Recent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  {/* Tags and Date */}
                  <div className="flex items-center gap-3">
                    {report.hasAudio && (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Volume2 className="w-4 h-4 text-blue-600" />
                      </div>
                    )}
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">{report.category}</Badge>
                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">{report.language}</Badge>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {report.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">{report.description}</p>

                  {/* Submitter Info */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    <span className="font-medium">{report.submittedBy}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {report.location}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <Button variant="outline" size="sm" className="ml-4 bg-transparent">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" size="sm" disabled={currentPage === 1}>
          ← Previous
        </Button>
        <div className="flex gap-2">
          {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
            <Button
              key={index}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              className="w-8 h-8 p-0"
              disabled={page === "..."}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm">
          Next →
        </Button>
      </div>
    </div>
  )
}
