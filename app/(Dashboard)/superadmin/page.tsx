"use client"

import { useState } from "react"
import { FileText, Building2, Users, Clock } from "lucide-react"

interface DashboardMetrics {
  totalReports: number
  activeMediaHouses: number
  activeJournalists: number
  pendingApprovals: number
}

export default function SuperadminDashboard() {
  console.log("[v0] Superadmin dashboard rendering")

  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalReports: 2847,
    activeMediaHouses: 1293,
    activeJournalists: 1293,
    pendingApprovals: 1293,
  })

  const metricCards = [
    {
      title: "Total Reports Received",
      value: metrics.totalReports.toLocaleString(),
      icon: FileText,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Media Houses",
      value: metrics.activeMediaHouses.toLocaleString(),
      icon: Building2,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Active Independent Journalist",
      value: metrics.activeJournalists.toLocaleString(),
      icon: Users,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Pending Approvals",
      value: metrics.pendingApprovals.toLocaleString(),
      icon: Clock,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">
          Comprehensive platform oversight and operational control for Newsbridge journalism platform
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className={`${metric.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${metric.iconColor}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activities Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
        <p className="text-gray-600 text-sm">Loading activities...</p>
      </div>
    </div>
  )
}
