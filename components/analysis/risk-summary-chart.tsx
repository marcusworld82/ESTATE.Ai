"use client"

import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface ChartData {
  date: string
  redFlags: number
}

interface RiskSummaryChartProps {
  data: ChartData[]
  isLoading?: boolean
}

export function RiskSummaryChart({ data, isLoading = false }: RiskSummaryChartProps) {
  const defaultData: ChartData[] = [
    { date: "Jan", redFlags: 12 },
    { date: "Feb", redFlags: 8 },
    { date: "Mar", redFlags: 15 },
    { date: "Apr", redFlags: 6 },
    { date: "May", redFlags: 9 },
    { date: "Jun", redFlags: 3 },
  ]

  const chartData = data.length > 0 ? data : defaultData

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-montserrat">Risk Trends</CardTitle>
          <CardDescription>Red flag detection over time</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <p className="text-gray-500">No data available</p>
            <p className="text-sm text-gray-400 mt-1">Upload documents to see risk trends</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-montserrat">Risk Trends</CardTitle>
          <CardDescription>Red flag detection over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  labelStyle={{ color: "#374151" }}
                />
                <Line
                  type="monotone"
                  dataKey="redFlags"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#ef4444", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Stats */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{Math.max(...chartData.map((d) => d.redFlags))}</div>
              <div className="text-sm text-gray-500">Peak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{Math.min(...chartData.map((d) => d.redFlags))}</div>
              <div className="text-sm text-gray-500">Lowest</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(chartData.reduce((sum, d) => sum + d.redFlags, 0) / chartData.length)}
              </div>
              <div className="text-sm text-gray-500">Average</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
