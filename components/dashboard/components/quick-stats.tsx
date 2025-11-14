export function QuickStats() {
  const stats = [
    { label: "Today", value: "24", color: "bg-blue-50 border-blue-200" },
    { label: "This Week", value: "142", color: "bg-purple-50 border-purple-200" },
    { label: "Top Region", value: "Abuja", color: "bg-green-50 border-green-200" },
    { label: "Top Language", value: "Hausa", color: "bg-amber-50 border-amber-200" },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className={`border ${stat.color} rounded-lg p-4`}>
          <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
