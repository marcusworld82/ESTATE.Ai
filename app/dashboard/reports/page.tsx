"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Share, Calendar, Search, Filter, MoreHorizontal, Eye } from "lucide-react"

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const metrics = [
    {
      title: "Completed Reports",
      value: "3",
      icon: <FileText className="h-5 w-5 sidebar-icon-green" />,
    },
    {
      title: "Total Downloads",
      value: "35",
      icon: <Download className="h-5 w-5 sidebar-icon-blue" />,
    },
    {
      title: "Shared Reports",
      value: "2",
      icon: <Share className="h-5 w-5 sidebar-icon-purple" />,
    },
    {
      title: "Scheduled",
      value: "1",
      icon: <Calendar className="h-5 w-5 sidebar-icon-orange" />,
    },
  ]

  const reports = [
    {
      name: "Q4 2024 Portfolio Performance Report",
      description: "24 properties • $12.4M value • 14.7% ROI",
      type: "Portfolio Summary",
      status: "completed",
      created: "1/14/2024",
      size: "2.4 MB",
      downloads: 12,
    },
    {
      name: "Oak Street Plaza - Investment Analysis",
      description: "$2.4M value • 12.4% ROI deals",
      type: "Deal Analysis",
      status: "completed",
      created: "1/13/2024",
      size: "1.8 MB",
      downloads: 8,
    },
    {
      name: "Maple Commons - Risk Assessment",
      description: "Comprehensive risk analysis and recommendations",
      type: "Risk Analysis",
      status: "processing",
      created: "1/12/2024",
      size: "3.1 MB",
      downloads: 0,
    },
    {
      name: "Pine Ridge Center - Market Analysis",
      description: "Market trends and competitive analysis",
      type: "Market Research",
      status: "completed",
      created: "1/11/2024",
      size: "2.7 MB",
      downloads: 15,
    },
    {
      name: "Downtown District - Feasibility Study",
      description: "Development feasibility and financial projections",
      type: "Feasibility Study",
      status: "scheduled",
      created: "1/10/2024",
      size: "4.2 MB",
      downloads: 3,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between scroll-animate">
        <div>
          <h1 className="text-3xl font-bold text-green-400">Reports</h1>
          <p className="text-gray-300">Generate and manage your real estate analytics reports</p>
        </div>
        <Button className="btn-primary hover-lift">
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card
            key={metric.title}
            className="card-gradient hover-lift hover-glow scroll-animate border-0"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300">{metric.title}</p>
                  <p className="text-2xl font-bold text-green-400">{metric.value}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">{metric.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="card-dark scroll-animate border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
            <Button variant="outline" className="btn-outline bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              All Types
            </Button>
            <Button variant="outline" className="btn-outline bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              All Status
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="card-dark hover-glow scroll-animate border-0">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-green-400">All Reports</CardTitle>
          <CardDescription className="text-gray-300">5 reports found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 pb-3 border-b border-white/10 text-sm font-medium text-gray-400">
              <div>Report</div>
              <div>Type</div>
              <div>Status</div>
              <div>Created</div>
              <div>Size</div>
              <div>Downloads</div>
              <div>Actions</div>
            </div>

            {/* Table Rows */}
            {reports.map((report, index) => (
              <div
                key={index}
                className="grid grid-cols-7 gap-4 py-4 border-b border-white/5 hover:bg-white/5 rounded-lg px-2 -mx-2 transition-colors"
              >
                <div>
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 sidebar-icon-green" />
                    <div>
                      <p className="font-medium text-white text-sm">{report.name}</p>
                      <p className="text-xs text-gray-400">{report.description}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    {report.type}
                  </Badge>
                </div>
                <div>
                  <Badge
                    className={
                      report.status === "completed"
                        ? "status-completed"
                        : report.status === "processing"
                          ? "status-processing"
                          : "bg-blue-600 hover:bg-blue-700"
                    }
                  >
                    {report.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-300">{report.created}</div>
                <div className="text-sm text-gray-300">{report.size}</div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3 text-gray-400" />
                  <span className="text-sm text-gray-300">{report.downloads}</span>
                </div>
                <div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
