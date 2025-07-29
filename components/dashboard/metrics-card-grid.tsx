"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface Metric {
  label: string
  value: string | number
  trend: number
  icon?: React.ReactNode
  format: "currency" | "number" | "percentage"
}

interface MetricsCardGridProps {
  metrics?: Metric[]
}

const defaultMetrics: Metric[] = [
  {
    label: "Total Portfolio Value",
    value: "$12.8M",
    trend: 8.2,
    format: "currency",
  },
  {
    label: "Active Deals",
    value: 24,
    trend: 12,
    format: "number",
  },
  {
    label: "Avg. Cap Rate",
    value: 7.4,
    trend: 0.3,
    format: "percentage",
  },
  {
    label: "Voice AI Calls",
    value: 247,
    trend: 15,
    format: "number",
  },
]

export function MetricsCardGrid({ metrics = defaultMetrics }: MetricsCardGridProps) {
  const formatValue = (value: string | number, format: string) => {
    if (typeof value === "string") return value

    switch (format) {
      case "currency":
        return `$${(value / 1000000).toFixed(1)}M`
      case "percentage":
        return `${value}%`
      default:
        return value.toString()
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="card-gradient hover-lift scroll-animate"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-white/70 text-sm font-medium">{metric.label}</p>
                <p className="text-2xl font-bold text-white">{formatValue(metric.value, metric.format)}</p>
                <div className="flex items-center space-x-1">
                  {metric.trend > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                  <span className={`text-sm font-medium ${metric.trend > 0 ? "text-green-400" : "text-red-400"}`}>
                    {metric.trend > 0 ? "+" : ""}
                    {metric.trend}%
                  </span>
                </div>
              </div>
              {metric.icon && <div className="text-white/60">{metric.icon}</div>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
