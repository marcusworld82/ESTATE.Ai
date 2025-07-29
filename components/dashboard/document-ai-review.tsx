"use client"

import { useState } from "react"
import { Brain, FileText, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface DocumentAnalysis {
  id: string
  fileName: string
  status: "analyzing" | "completed" | "flagged"
  progress: number
  riskScore: number
  redFlags: string[]
  keyMetrics: {
    capRate: number
    dscr: number
    occupancyRate: number
    roi: number
  }
  summary: string
}

export function DocumentAIReview() {
  const [analyses] = useState<DocumentAnalysis[]>([
    {
      id: "1",
      fileName: "Oak_Street_Plaza_Lease.pdf",
      status: "completed",
      progress: 100,
      riskScore: 15,
      redFlags: [],
      keyMetrics: {
        capRate: 7.5,
        dscr: 1.42,
        occupancyRate: 95,
        roi: 12.3,
      },
      summary: "Strong investment opportunity with stable cash flow and low risk profile.",
    },
    {
      id: "2",
      fileName: "Maple_Commons_Financial.pdf",
      status: "flagged",
      progress: 100,
      riskScore: 75,
      redFlags: ["High vacancy rate (35%)", "Declining rental income"],
      keyMetrics: {
        capRate: 6.8,
        dscr: 1.28,
        occupancyRate: 65,
        roi: 9.7,
      },
      summary: "Moderate risk investment requiring attention to occupancy issues.",
    },
    {
      id: "3",
      fileName: "Pine_Ridge_Center_Analysis.pdf",
      status: "analyzing",
      progress: 67,
      riskScore: 0,
      redFlags: [],
      keyMetrics: {
        capRate: 0,
        dscr: 0,
        occupancyRate: 0,
        roi: 0,
      },
      summary: "",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "flagged":
        return <AlertTriangle className="h-5 w-5 text-red-400" />
      case "analyzing":
        return <Clock className="h-5 w-5 text-blue-400" />
      default:
        return <FileText className="h-5 w-5 text-white/60" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400"
      case "flagged":
        return "bg-red-500/20 text-red-400"
      case "analyzing":
        return "bg-blue-500/20 text-blue-400"
      default:
        return "bg-white/10 text-white/60"
    }
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return "text-green-400"
    if (score < 70) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <Card className="card-gradient hover-lift scroll-animate">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-montserrat text-white">AI Document Review</CardTitle>
            <CardDescription className="text-white/70">Automated analysis of your property documents</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analyses.map((analysis, index) => (
            <div
              key={analysis.id}
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(analysis.status)}
                  <div>
                    <h4 className="font-medium text-white text-sm">{analysis.fileName}</h4>
                    <Badge className={`text-xs ${getStatusColor(analysis.status)} border-none`}>
                      {analysis.status.charAt(0).toUpperCase() + analysis.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                {analysis.status !== "analyzing" && (
                  <div className="text-right">
                    <div className="text-sm text-white/60">Risk Score</div>
                    <div className={`text-lg font-bold ${getRiskColor(analysis.riskScore)}`}>{analysis.riskScore}%</div>
                  </div>
                )}
              </div>

              {analysis.status === "analyzing" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Analyzing document...</span>
                    <span className="text-white">{analysis.progress}%</span>
                  </div>
                  <Progress value={analysis.progress} className="h-2" />
                </div>
              )}

              {analysis.status !== "analyzing" && (
                <div className="space-y-3">
                  {analysis.redFlags.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-red-400">Red Flags:</div>
                      {analysis.redFlags.map((flag, flagIndex) => (
                        <div key={flagIndex} className="text-sm text-red-300 flex items-center space-x-2">
                          <AlertTriangle className="h-3 w-3" />
                          <span>{flag}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/60">Cap Rate:</span>
                        <span className="text-white font-medium">{analysis.keyMetrics.capRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">DSCR:</span>
                        <span className="text-white font-medium">{analysis.keyMetrics.dscr}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/60">Occupancy:</span>
                        <span className="text-white font-medium">{analysis.keyMetrics.occupancyRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">ROI:</span>
                        <span className="text-white font-medium">{analysis.keyMetrics.roi}%</span>
                      </div>
                    </div>
                  </div>

                  {analysis.summary && (
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-sm text-white/80">{analysis.summary}</p>
                    </div>
                  )}

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="btn-primary flex-1">
                      View Full Report
                    </Button>
                    <Button size="sm" variant="outline" className="btn-outline bg-transparent">
                      <TrendingUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Total Documents Analyzed</span>
            <span className="text-white font-medium">247</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-white/60">Average Processing Time</span>
            <span className="text-white font-medium">2.3 minutes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
