"use client";

import EmptyState from "@/components/Common/empty-state";
import { InviteTeam } from "@/components/modal-components/invite-team-modal";
import { Button } from "@/components/ui/button";
import GradientButton from "@/components/ui/gradient-button";
import Modal from "@/components/ui/modal";
import { ChevronDown, MoreVertical, Search } from "lucide-react";
import { useState } from "react";

export default function TeamActivityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const teamActivities: any[] = [];

  const filteredMembers = teamActivities?.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Activity</h1>
            <p className="text-gray-600 mt-1">Manage your newsroom team</p>
          </div>
          <GradientButton
            onClick={() => setIsInviteOpen(true)}
            btnText={"Invite Team Members"}
            classes="w-[208px] rounded-lg"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-50 px-8 py-6">
        {/* Search and Filter */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, reporters, location or topic"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
            />
          </div>
          <Button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
            Filter by
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>

        {/* Team Members Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Team Member
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Language Reported
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Coverage Area
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedMembers.length > 0 ? (
                  paginatedMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">
                            {member.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {member.email}
                          </span>
                          <span className="text-sm text-gray-500">
                            {member.phone}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {member.location.split(",")[1]}
                          </span>
                          <span className="text-sm text-gray-500">
                            {member.location.split(",")[0]}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">{member.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">
                          {member.languages.join(", ")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {member.coverageAreas.map(
                            (area: string, idx: number) => (
                              <span key={idx} className="text-gray-700">
                                {area}
                              </span>
                            )
                          )}
                          <span className="text-sm text-primary font-medium cursor-pointer hover:underline">
                            +3
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12">
                      <div className="flex justify-center items-center">
                        <EmptyState
                          feedback="You haven't invited any team members to your media house."
                          action="Invite Team Members"
                          onClick={() => setIsInviteOpen(true)}
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition ${
                        currentPage === page
                          ? "bg-primary text-white"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
                if (page === 2 || page === totalPages - 1) {
                  return (
                    <span key={page} className="px-2 text-gray-500">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {isInviteOpen && (
        <Modal
          isHeader
          title="Invite Team Members"
          description="Invite your newsroom colleague to join your workspace"
          size="xl"
          isOpen={isInviteOpen}
          onClose={() => setIsInviteOpen(false)}
        >
          <InviteTeam onClose={() => setIsInviteOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
