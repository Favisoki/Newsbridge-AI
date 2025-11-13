"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreVertical } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock data for demonstration - replace with real API calls
const mockMetrics = {
  totalReports: 2847,
  activeMediaHouses: 1293,
  activeJournalists: 1293,
  pendingApprovals: 1293,
}

const mockRecentRequests = [
  {
    id: "1",
    name: "James Levi",
    userType: "Media House",
    email: "jameslevi@newsbridge.com",
    country: "Sierra Leone",
    dateSubmitted: "11/04/24",
    status: "Pending",
  },
  {
    id: "2",
    name: "James Levi",
    userType: "Media House",
    email: "jameslevi@newsbridge.com",
    country: "Sierra Leone",
    dateSubmitted: "11/04/24",
    status: "Pending",
  },
  {
    id: "3",
    name: "James Levi",
    userType: "Media House",
    email: "jameslevi@newsbridge.com",
    country: "Sierra Leone",
    dateSubmitted: "11/04/24",
    status: "Pending",
  },
  {
    id: "4",
    name: "James Levi",
    userType: "Media House",
    email: "jameslevi@newsbridge.com",
    country: "Sierra Leone",
    dateSubmitted: "11/04/24",
    status: "Pending",
  },
  {
    id: "5",
    name: "James Levi",
    userType: "Media House",
    email: "jameslevi@newsbridge.com",
    country: "Sierra Leone",
    dateSubmitted: "11/04/24",
    status: "Pending",
  },
  {
    id: "6",
    name: "James Levi",
    userType: "Media House",
    email: "jameslevi@newsbridge.com",
    country: "Sierra Leone",
    dateSubmitted: "11/04/24",
    status: "Pending",
  },
  {
    id: "7",
    name: "James Levi",
    userType: "Media House",
    email: "jameslevi@newsbridge.com",
    country: "Sierra Leone",
    dateSubmitted: "11/04/24",
    status: "Pending",
  },
  {
    id: "8",
    name: "James Levi",
    userType: "Media House",
    email: "jameslevi@newsbridge.com",
    country: "Sierra Leone",
    dateSubmitted: "11/04/24",
    status: "Pending",
  },
]

export default function SuperadminDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<"recent-requests" | "recent-invites">("recent-requests")

  return (
    <div className="flex-1">
      {/* Main Content */}
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Super Admin Dashboard</h2>
          <p className="text-gray-600">
            Comprehensive platform oversight and operational control for Newsbridge journalism platform
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Reports Received</p>
                <p className="text-3xl font-semibold text-gray-900">{mockMetrics.totalReports.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Media Houses</p>
                <p className="text-3xl font-semibold text-green-600">
                  {mockMetrics.activeMediaHouses.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Independent Journalist</p>
                <p className="text-3xl font-semibold text-green-600">
                  {mockMetrics.activeJournalists.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Approvals</p>
                <p className="text-3xl font-semibold text-orange-600">
                  {mockMetrics.pendingApprovals.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <Link href="/superadmin/users" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              See all
            </Link>
          </div>

          {/* Tabs */}
          <div className="px-6 pt-4 border-b border-gray-200">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab("recent-requests")}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition ${
                  activeTab === "recent-requests"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Recent Request
              </button>
              <button
                onClick={() => setActiveTab("recent-invites")}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition ${
                  activeTab === "recent-invites"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Recent Invites
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users by name, or email address"
                  className="pl-10 bg-gray-50 border-gray-200"
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    User Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Date Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockRecentRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.userType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.country}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.dateSubmitted}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 font-medium"
                      >
                        {request.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Approve</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Decline</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
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
    </div>
  )
}
