"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, ChevronDown, ChevronUp, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RedFlagAlertBannerProps {
  count: number
  onViewAll: () => void
}

export function RedFlagAlertBanner({ count, onViewAll }: RedFlagAlertBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const mockAlerts = [
    {
      id: "1",
      severity: "high" as const,
      title: "High Vacancy Rate",
      description: "Current vacancy rate of 35% exceeds market average by 15%",
      document: "Maple Commons - Lease Summary.pdf",
    },
    {
      id: "2",
      severity: "medium" as const,
      title: "Below Market Rent",
      description: "Average rent $18/sqft is 12% below comparable properties",
      document: "Oak Street Plaza - Financial.xlsx",
    },
    {
      id: "3",
      severity: "high" as const,
      title: "Deferred Maintenance",
      description: "Estimated $2.3M in deferred maintenance identified",
      document: "Pine Ridge - Inspection Report.pdf",
    },
  ]

  const getSeverityColor = (severity: "high" | "medium" | "low") => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  if (count === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-emerald-900">All Clear!</h3>
                <p className="text-sm text-emerald-700">No red flags detected in your recent analyses</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-red-900">
                  {count} Red Flag{count !== 1 ? "s" : ""} Detected
                </h3>
                <p className="text-sm text-red-700">Critical issues requiring immediate attention</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onViewAll}
                className="text-red-700 border-red-300 hover:bg-red-100 bg-transparent"
              >
                <Eye className="mr-2 h-4 w-4" />
                View All
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-red-700 hover:bg-red-100"
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-3"
              >
                {mockAlerts.slice(0, count).map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg p-3 border border-red-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900">{alert.title}</h4>
                          <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                        <p className="text-xs text-gray-500">Found in: {alert.document}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}
