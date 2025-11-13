"use client"

import { useState, useEffect } from "react"
import { superadminApi } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MoreVertical, Search, Eye, CheckCircle, XCircle, Ban } from "lucide-react"

interface User {
  id: string
  name: string
  userType: string
  email: string
  country: string
  dateSubmitted: string
  status: "pending" | "approved" | "rejected"
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [inviteEmails, setInviteEmails] = useState("")
  const [statusCounts, setStatusCounts] = useState({
    pending: 20,
    approved: 39,
    rejected: 5,
  })

  useEffect(() => {
    loadUsers()
  }, [activeTab, currentPage])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const response = await superadminApi.getAllUsers({
        status: activeTab,
        search: searchQuery,
        page: currentPage,
      })
      if (response.success && response.data) {
        setUsers(response.data.results || response.data)
      }
    } catch (error) {
      console.error("Failed to load users:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (userId: string) => {
    const response = await superadminApi.approveUser(userId)
    if (response.success) {
      loadUsers()
    }
  }

  const handleReject = async (userId: string) => {
    const response = await superadminApi.rejectUser(userId)
    if (response.success) {
      loadUsers()
    }
  }

  const handleRevokeAccess = async (userId: string) => {
    const response = await superadminApi.revokeUserAccess(userId)
    if (response.success) {
      loadUsers()
    }
  }

  const handleInviteUsers = async () => {
    const emails = inviteEmails
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean)
    const response = await superadminApi.inviteUsers(emails)
    if (response.success) {
      setInviteDialogOpen(false)
      setInviteEmails("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage access requests and user accounts</p>
        </div>
        <Button onClick={() => setInviteDialogOpen(true)} className="bg-[#5b7cfa] hover:bg-[#4a6be8]">
          Invite Users
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("all")}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "all"
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              All Users
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "pending"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Pending Request
              <Badge className="bg-blue-600 text-white hover:bg-blue-600">{statusCounts.pending}</Badge>
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={`py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "approved"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Approved
              <Badge className="bg-blue-600 text-white hover:bg-blue-600">{statusCounts.approved}</Badge>
            </button>
            <button
              onClick={() => setActiveTab("rejected")}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "rejected"
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Rejected
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users by name, or email address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="journalist">Journalists</SelectItem>
                <SelectItem value="media">Media Houses</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.userType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.country}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.dateSubmitted}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant="secondary"
                      className={
                        user.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          : user.status === "approved"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="w-4 h-4" />
                          View Details
                        </DropdownMenuItem>
                        {user.status === "pending" && (
                          <>
                            <DropdownMenuItem className="gap-2" onClick={() => handleApprove(user.id)}>
                              <CheckCircle className="w-4 h-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => handleReject(user.id)}>
                              <XCircle className="w-4 h-4" />
                              Decline
                            </DropdownMenuItem>
                          </>
                        )}
                        {user.status === "approved" && (
                          <DropdownMenuItem className="gap-2 text-red-600" onClick={() => handleRevokeAccess(user.id)}>
                            <Ban className="w-4 h-4" />
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
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
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
      </div>

      {/* Invite Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Users</DialogTitle>
            <DialogDescription>Enter email addresses separated by commas to invite multiple users.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="email1@example.com, email2@example.com"
              value={inviteEmails}
              onChange={(e) => setInviteEmails(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteUsers} className="bg-[#5b7cfa] hover:bg-[#4a6be8]">
              Send Invites
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
