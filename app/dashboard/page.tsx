"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building,
  Users,
  Phone,
  FileText,
  AlertTriangle,
  Plus,
  Eye,
} from "lucide-react"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const metrics = [
    {
      title: "Total Portfolio Value",
      value: "$12.8M",
      change: "+8.2%",
      trend: "up",
      icon: <DollarSign className="h-6 w-6 sidebar-icon-green" />,
    },
    {
      title: "Active Deals",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: <Building className="h-6 w-6 sidebar-icon-blue" />,
    },
    {
      title: "Avg. Cap Rate",
      value: "7.4%",
      change: "+0.3%",
      trend: "up",
      icon: <TrendingUp className="h-6 w-6 sidebar-icon-purple" />,
    },
    {
      title: "Voice AI Calls",
      value: "247",
      change: "+15%",
      trend: "up",
      icon: <Phone className="h-6 w-6 sidebar-icon-orange" />,
    },
    {
      title: "Success Rate",
      value: "84%",
      change: "+3%",
      trend: "up",
      icon: <Users className="h-6 w-6 sidebar-icon-pink" />,
    },
    {
      title: "Appointments Booked",
      value: "38",
      change: "+8%",
      trend: "up",
      icon: <FileText className="h-6 w-6 sidebar-icon-yellow" />,
    },
  ]

  const recentDeals = [
    {
      name: "Oak Street Plaza Office Building",
      status: "Analysis Complete",
      capRate: "7.5%",
      dscr: "1.42",
      value: "$2.4M",
      roi: "12.3%",
      redFlags: 0,
    },
    {
      name: "Maple Commons Retail Center",
      status: "Under Review",
      capRate: "6.8%",
      dscr: "1.28",
      value: "$1.8M",
      roi: "9.7%",
      redFlags: 2,
    },
    {
      name: "Pine Ridge Center Mixed Use",
      status: "Report Ready",
      capRate: "8.1%",
      dscr: "1.55",
      value: "$3.2M",
      roi: "15.2%",
      redFlags: 1,
    },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white loading-pulse">Loading...</h1>
            <p className="text-gray-300 loading-pulse">Preparing your dashboard...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="card-gradient border-0 loading-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-white/10 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between scroll-animate">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, Sarah</h1>
          <p className="text-gray-300">Here's what's happening with your deals today.</p>
        </div>
        <Button className="btn-primary hover-lift">
          <Plus className="h-4 w-4 mr-2" />
          New Analysis
        </Button>
      </div>

      {/* Red Flag Alert */}
      <Card className="red-flag-alert scroll-animate">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div>
                <h3 className="font-semibold text-red-400">3 Red Flags Detected</h3>
                <p className="text-sm text-red-300">Critical issues requiring immediate attention</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-red-400 border-red-400 hover:bg-red-400/10 bg-transparent"
            >
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                    )}
                    <span
                      className={`text-sm font-medium ${metric.trend === "up" ? "text-green-400" : "text-red-400"}`}
                    >
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">{metric.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Deals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Document Review */}
        <Card className="card-dark hover-glow scroll-animate border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <FileText className="h-5 w-5 sidebar-icon-green mr-2" />
                  AI Document Review
                </CardTitle>
                <CardDescription className="text-gray-300">
                  AI-powered analysis of your real estate documents
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-green-400 border-green-400 hover:bg-green-400/10 bg-transparent"
              >
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4 mb-6">
              <Button className="bg-green-600 hover:bg-green-700 text-white">Overview</Button>
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Findings
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Documents
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/20">
                <div className="text-2xl font-bold text-green-400">2</div>
                <div className="text-sm text-green-300">Completed</div>
              </div>
              <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/20">
                <div className="text-2xl font-bold text-yellow-400">1</div>
                <div className="text-sm text-yellow-300">Processing</div>
              </div>
              <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-400">91%</div>
                <div className="text-sm text-blue-300">Avg Confidence</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 sidebar-icon-green" />
                  <div>
                    <p className="font-medium text-white">Oak Street Plaza</p>
                    <p className="text-sm text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <Badge className="status-completed">94%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 sidebar-icon-yellow" />
                  <div>
                    <p className="font-medium text-white">Maple Commons</p>
                    <p className="text-sm text-gray-400">Processing...</p>
                  </div>
                </div>
                <Badge className="status-processing">Processing</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Deals */}
        <Card className="card-dark hover-glow scroll-animate border-0">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">Recent Deals</CardTitle>
            <CardDescription className="text-gray-300">Your latest property analyses and their status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDeals.map((deal, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg hover-lift">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">{deal.name}</h4>
                  <Badge
                    className={
                      deal.status === "Analysis Complete"
                        ? "status-completed"
                        : deal.status === "Under Review"
                          ? "status-processing"
                          : "status-completed"
                    }
                  >
                    {deal.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-6 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Cap Rate</p>
                    <p className="text-green-400 font-medium">{deal.capRate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">DSCR</p>
                    <p className="text-blue-400 font-medium">{deal.dscr}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Value</p>
                    <p className="text-purple-400 font-medium">{deal.value}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">ROI</p>
                    <p className="text-green-400 font-medium">{deal.roi}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Red Flags</p>
                    <p className={`font-medium ${deal.redFlags > 0 ? "text-red-400" : "text-green-400"}`}>
                      {deal.redFlags}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Upload Documents */}
      <Card className="card-dark hover-glow scroll-animate border-0">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Upload Documents</CardTitle>
          <CardDescription className="text-gray-300">Drag and drop your files here, or click to browse</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-green-500/50 rounded-lg p-12 text-center hover:border-green-500 transition-colors">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Upload Documents</h3>
            <p className="text-gray-400 mb-4">Drag and drop your files here, or click to browse</p>
            <Button className="btn-primary">Choose Files</Button>
            <p className="text-sm text-gray-500 mt-4">Supports PDF, DOC, DOCX, XLS, XLSX files up to 10MB</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
