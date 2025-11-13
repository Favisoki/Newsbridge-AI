"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreVertical, Eye, Check, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

type UserStatus = "all" | "pending" | "approved" | "rejected"

const mockUsers = {
  pending: Array(20).fill({
    name: "James Levi",
    userType: "Media House",
    email: "jameslevi@newsbridge.com",
    country: "Sierra Leone",
    dateSubmitted: "11/04/24",
    status: "Pending",
  }),
  approved: Array(39).fill({
    name: "James Levi",
    userType: "Media House",
    email: "jameslevi@newsbridge.com",
    country: "Sierra Leone",
    dateSubmitted: "11/04/24",
    status: "Approved",
  }),
  rejected: Array(5).fill({
    name: "James Levi",
    userType: "Media House",
    email: "jameslevi@newsbridge.com",
    country: "Sierra Leone",
    dateSubmitted: "11/04/24",
    status: "Rejected",
  }),
}

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState<UserStatus>("pending")
  const [searchQuery, setSearchQuery] = useState("")

  const getUsers = () => {
    if (activeTab === "all") {
      return [...mockUsers.pending, ...mockUsers.approved, ...mockUsers.rejected]
    }
    return mockUsers[activeTab] || []
  }

  const getCount = (status: UserStatus) => {
    if (status === "all") return mockUsers.pending.length + mockUsers.approved.length + mockUsers.rejected.length
    return mockUsers[status]?.length || 0
  }

  return (
    <div className="flex-1">
      {/* Main Content */}
      <div className="p-8">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">User Management</h2>
                <p className="text-gray-600">Manage access requests and user accounts</p>
              </div>
              <Button className="bg-[#6B7FE8] hover:bg-[#5a6fd4]">Invite Users</Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("all")}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition ${
                  activeTab === "all"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                All Users
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
                  activeTab === "pending"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Pending Request
                <Badge variant="secondary" className="bg-[#6B7FE8] text-white hover:bg-[#6B7FE8] rounded-full px-2">
                  {getCount("pending")}
                </Badge>
              </button>
              <button
                onClick={() => setActiveTab("approved")}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
                  activeTab === "approved"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Approved
                <Badge variant="secondary" className="bg-[#6B7FE8] text-white hover:bg-[#6B7FE8] rounded-full px-2">
                  {getCount("approved")}
                </Badge>
              </button>
              <button
                onClick={() => setActiveTab("rejected")}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition ${
                  activeTab === "rejected"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Rejected
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
                {getUsers().map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.userType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.country}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.dateSubmitted}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant="secondary"
                        className={`font-medium ${
                          user.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : user.status === "Approved"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                        }`}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="w-4 h-4" />
                            View Details
                          </DropdownMenuItem>
                          {user.status === "Pending" && (
                            <>
                              <DropdownMenuItem className="gap-2">
                                <Check className="w-4 h-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 text-red-600">
                                <X className="w-4 h-4" />
                                Decline
                              </DropdownMenuItem>
                            </>
                          )}
                          {user.status === "Approved" && (
                            <DropdownMenuItem className="gap-2 text-red-600">
                              <X className="w-4 h-4" />
                              Revoke Access
                            </DropdownMenuItem>
                          )}
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
