"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Phone, Mic, PhoneCall, Clock, TrendingUp, Settings, Volume2 } from "lucide-react"

interface VoiceAgent {
  id: string
  name: string
  type: "inbound" | "outbound" | "follow-up"
  status: "active" | "inactive" | "busy"
  callsToday: number
  successRate: number
  avgDuration: number
  enabled: boolean
}

interface CallRecord {
  id: string
  type: "inbound" | "outbound"
  contact: string
  duration: string
  outcome: "qualified" | "appointment" | "callback" | "not-interested"
  timestamp: string
  notes: string
}

const voiceAgents: VoiceAgent[] = [
  {
    id: "lead-qualifier",
    name: "Lead Qualification Agent",
    type: "inbound",
    status: "active",
    callsToday: 23,
    successRate: 87,
    avgDuration: 4.2,
    enabled: true,
  },
  {
    id: "follow-up",
    name: "Follow-up Agent",
    type: "outbound",
    status: "active",
    callsToday: 15,
    successRate: 72,
    avgDuration: 3.8,
    enabled: true,
  },
  {
    id: "appointment-setter",
    name: "Appointment Setter",
    type: "outbound",
    status: "busy",
    callsToday: 8,
    successRate: 94,
    avgDuration: 5.1,
    enabled: true,
  },
  {
    id: "client-survey",
    name: "Client Survey Agent",
    type: "follow-up",
    status: "inactive",
    callsToday: 0,
    successRate: 89,
    avgDuration: 2.7,
    enabled: false,
  },
]

const recentCalls: CallRecord[] = [
  {
    id: "1",
    type: "inbound",
    contact: "Sarah Johnson",
    duration: "4:32",
    outcome: "qualified",
    timestamp: "10 minutes ago",
    notes: "Interested in downtown properties, budget $400-500K",
  },
  {
    id: "2",
    type: "outbound",
    contact: "Mike Chen",
    duration: "3:15",
    outcome: "appointment",
    timestamp: "25 minutes ago",
    notes: "Scheduled viewing for Oak Street Plaza tomorrow 2 PM",
  },
  {
    id: "3",
    type: "inbound",
    contact: "Lisa Rodriguez",
    duration: "2:48",
    outcome: "callback",
    timestamp: "1 hour ago",
    notes: "Requested callback after 6 PM to discuss investment options",
  },
  {
    id: "4",
    type: "outbound",
    contact: "David Kim",
    duration: "1:23",
    outcome: "not-interested",
    timestamp: "2 hours ago",
    notes: "Not currently looking, added to long-term nurture list",
  },
]

export function VoiceAIDashboard() {
  const [agents, setAgents] = useState(voiceAgents)

  const toggleAgent = (agentId: string) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId
          ? { ...agent, enabled: !agent.enabled, status: !agent.enabled ? "active" : "inactive" }
          : agent,
      ),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "busy":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "inactive":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case "qualified":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "appointment":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "callback":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "not-interested":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const totalCallsToday = agents.reduce((acc, agent) => acc + agent.callsToday, 0)
  const avgSuccessRate = Math.round(agents.reduce((acc, agent) => acc + agent.successRate, 0) / agents.length)
  const activeAgents = agents.filter((agent) => agent.status === "active").length

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900/50 border-emerald-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Active Agents</p>
                <p className="text-2xl font-bold text-emerald-400">{activeAgents}</p>
              </div>
              <Mic className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-emerald-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Calls Today</p>
                <p className="text-2xl font-bold text-emerald-400">{totalCallsToday}</p>
              </div>
              <Phone className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-emerald-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Success Rate</p>
                <p className="text-2xl font-bold text-emerald-400">{avgSuccessRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-emerald-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Avg Duration</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {(agents.reduce((acc, agent) => acc + agent.avgDuration, 0) / agents.length).toFixed(1)}m
                </p>
              </div>
              <Clock className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Voice Agents */}
        <Card className="bg-gray-900/50 border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-lg text-emerald-400">Voice AI Agents</CardTitle>
            <CardDescription className="text-emerald-600">
              Manage your automated voice agents and their performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center justify-between p-4 bg-black/50 border border-emerald-500/20 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <Volume2 className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-400">{agent.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                      <span className="text-emerald-600 text-sm capitalize">{agent.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-emerald-400 font-medium">{agent.callsToday}</p>
                    <p className="text-emerald-600 text-xs">calls today</p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-medium">{agent.successRate}%</p>
                    <p className="text-emerald-600 text-xs">success</p>
                  </div>
                  <Switch checked={agent.enabled} onCheckedChange={() => toggleAgent(agent.id)} />
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full bg-transparent border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
            >
              <Settings className="mr-2 h-4 w-4" />
              Configure Agents
            </Button>
          </CardContent>
        </Card>

        {/* Recent Calls */}
        <Card className="bg-gray-900/50 border-emerald-500/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-emerald-400">Recent Calls</CardTitle>
                <CardDescription className="text-emerald-600">
                  Latest voice AI interactions and outcomes
                </CardDescription>
              </div>
              <Button
                variant="outline"
                className="bg-transparent border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentCalls.map((call) => (
              <div key={call.id} className="p-4 bg-black/50 border border-emerald-500/20 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-1 bg-emerald-500/20 rounded">
                      {call.type === "inbound" ? (
                        <PhoneCall className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Phone className="h-4 w-4 text-blue-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-emerald-400">{call.contact}</p>
                      <p className="text-emerald-600 text-sm">{call.timestamp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className={getOutcomeColor(call.outcome)}>
                      {call.outcome.replace("-", " ")}
                    </Badge>
                    <p className="text-emerald-600 text-sm mt-1">{call.duration}</p>
                  </div>
                </div>
                <p className="text-emerald-600 text-sm">{call.notes}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
