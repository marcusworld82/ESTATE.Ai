"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Eye, FileText } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const riskData = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 8 },
  { month: "Mar", value: 15 },
  { month: "Apr", value: 6 },
  { month: "May", value: 9 },
  { month: "Jun", value: 3 },
]

export default function AnalysisPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="scroll-animate">
        <h1 className="text-3xl font-bold text-white mb-2">Risk Analysis</h1>
        <p className="text-gray-300">Comprehensive risk assessment and red flag detection</p>
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

      {/* Risk Trends Chart */}
      <Card className="card-dark hover-glow scroll-animate border-0">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Risk Trends</CardTitle>
          <CardDescription className="text-gray-300">Red flag detection over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-1">15</div>
              <div className="text-sm text-gray-400">Peak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">3</div>
              <div className="text-sm text-gray-400">Lowest</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">9</div>
              <div className="text-sm text-gray-400">Average</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Analysis Table */}
      <Card className="card-dark hover-glow scroll-animate border-0">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Document Analysis</CardTitle>
          <CardDescription className="text-gray-300">Recent document reviews and risk assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Oak Street Plaza - Financial Statements",
                type: "Financial Analysis",
                status: "Completed",
                riskLevel: "Low",
                redFlags: 0,
                confidence: 94,
              },
              {
                name: "Maple Commons - Lease Agreement",
                type: "Legal Document",
                status: "Under Review",
                riskLevel: "Medium",
                redFlags: 2,
                confidence: 87,
              },
              {
                name: "Pine Ridge Center - Property Inspection",
                type: "Inspection Report",
                status: "Completed",
                riskLevel: "Low",
                redFlags: 1,
                confidence: 91,
              },
            ].map((doc, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg hover-lift">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 sidebar-icon-blue" />
                    <div>
                      <h4 className="font-medium text-white">{doc.name}</h4>
                      <p className="text-sm text-gray-400">{doc.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={doc.status === "Completed" ? "status-completed" : "status-processing"}>
                      {doc.status}
                    </Badge>
                    <Badge variant={doc.riskLevel === "Low" ? "default" : "destructive"}>{doc.riskLevel} Risk</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Red Flags</p>
                    <p className={`font-medium ${doc.redFlags > 0 ? "text-red-400" : "text-green-400"}`}>
                      {doc.redFlags}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Confidence</p>
                    <p className="text-blue-400 font-medium">{doc.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Actions</p>
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 p-0 h-auto">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
