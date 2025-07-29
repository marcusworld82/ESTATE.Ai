"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, TrendingUp, AlertTriangle } from "lucide-react"

interface Deal {
  id: string
  name: string
  type: string
  status: "Analysis Complete" | "Under Review" | "Report Ready"
  capRate: number
  dscr: number
  value: string
  roi: number
  redFlags: number
}

const deals: Deal[] = [
  {
    id: "1",
    name: "Oak Street Plaza",
    type: "Office Building",
    status: "Analysis Complete",
    capRate: 7.5,
    dscr: 1.42,
    value: "$2.4M",
    roi: 12.3,
    redFlags: 0,
  },
  {
    id: "2",
    name: "Maple Commons",
    type: "Retail Center",
    status: "Under Review",
    capRate: 6.8,
    dscr: 1.28,
    value: "$1.8M",
    roi: 9.7,
    redFlags: 2,
  },
  {
    id: "3",
    name: "Pine Ridge Center",
    type: "Mixed Use",
    status: "Report Ready",
    capRate: 8.1,
    dscr: 1.55,
    value: "$3.2M",
    roi: 15.2,
    redFlags: 1,
  },
]

export function RecentDeals() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Analysis Complete":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Under Review":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Report Ready":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <Card className="card-gradient hover-lift scroll-animate">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Building className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-montserrat text-white">Recent Deals</CardTitle>
            <CardDescription className="text-white/70">Your latest property analyses and their status</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deals.map((deal, index) => (
            <div
              key={deal.id}
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-white text-lg">{deal.name}</h4>
                  <p className="text-white/60 text-sm">{deal.type}</p>
                </div>
                <Badge className={`${getStatusColor(deal.status)} border-none text-xs`}>{deal.status}</Badge>
              </div>

              <div className="grid grid-cols-6 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-white/60 text-xs mb-1">Cap Rate</div>
                  <div className="text-white font-semibold">{deal.capRate}%</div>
                </div>
                <div className="text-center">
                  <div className="text-white/60 text-xs mb-1">DSCR</div>
                  <div className="text-white font-semibold">{deal.dscr}</div>
                </div>
                <div className="text-center">
                  <div className="text-white/60 text-xs mb-1">Value</div>
                  <div className="text-green-400 font-semibold">{deal.value}</div>
                </div>
                <div className="text-center">
                  <div className="text-white/60 text-xs mb-1">ROI</div>
                  <div className="text-green-400 font-semibold">{deal.roi}%</div>
                </div>
                <div className="text-center">
                  <div className="text-white/60 text-xs mb-1">Red Flags</div>
                  <div className={`font-semibold ${deal.redFlags > 0 ? "text-red-400" : "text-green-400"}`}>
                    {deal.redFlags}
                  </div>
                </div>
                <div className="flex justify-center">
                  {deal.redFlags > 0 ? (
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
