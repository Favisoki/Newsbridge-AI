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
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: "Active Media Houses",
      value: metrics.activeMediaHouses.toLocaleString(),
      icon: Building2,
      bgColor: "bg-chart-3/10",
      iconColor: "text-chart-3",
    },
    {
      title: "Active Independent Journalist",
      value: metrics.activeJournalists.toLocaleString(),
      icon: Users,
      bgColor: "bg-chart-3/10",
      iconColor: "text-chart-3",
    },
    {
      title: "Pending Approvals",
      value: metrics.pendingApprovals.toLocaleString(),
      icon: Clock,
      bgColor: "bg-chart-4/10",
      iconColor: "text-chart-4",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header - text-gray-900 to text-foreground, text-gray-600 to text-muted-foreground */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Super Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Comprehensive platform oversight and operational control for Newsbridge journalism platform
        </p>
      </div>

      {/* Metrics Grid - Using semantic tokens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="bg-card rounded-lg border border-border shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                </div>
                <div className={`${metric.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${metric.iconColor}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activities - Using semantic tokens */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activities</h2>
        <p className="text-muted-foreground text-sm">Loading activities...</p>
      </div>
    </div>
  )
}
