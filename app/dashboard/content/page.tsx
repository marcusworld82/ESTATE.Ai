"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  Settings,
  Plus,
  Search,
  Star,
  TrendingUp,
  Clock,
  ImageIcon,
  Play,
  Mic,
  Phone,
  Volume2,
  PhoneCall,
} from "lucide-react"

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState("templates")
  const [activeFilter, setActiveFilter] = useState("all")

  const templates = [
    {
      id: 1,
      title: "AI Property Showcase",
      category: "Social Media",
      status: "ready",
      rating: 4.8,
      uses: 1247,
      lastUsed: "2 hours ago",
      features: ["Image Enhancement", "Virtual Staging", "Description Generation", "+1 more"],
      icon: <ImageIcon className="h-6 w-6" />,
      description: "Image Analysis, Enhancement +2 more",
    },
    {
      id: 2,
      title: "Market Update Video",
      category: "Marketing",
      status: "ready",
      rating: 4.6,
      uses: 892,
      lastUsed: "4 hours ago",
      features: ["Video Generation", "AI Voiceover", "Market Data Integration"],
      icon: <Play className="h-6 w-6" />,
      description: "Video Generation, Voiceover +1 more",
    },
    {
      id: 3,
      title: "Lead Qualification Voice AI",
      category: "Voice AI",
      status: "ready",
      rating: 4.9,
      uses: 2156,
      lastUsed: "30 minutes ago",
      features: ["Natural Language Processing", "Lead Scoring", "Appointment Booking"],
      icon: <Mic className="h-6 w-6" />,
      description: "Call Routing, Lead Qualification +1 more",
    },
  ]

  const filters = [
    { id: "all", label: "All Templates", count: 6 },
    { id: "social", label: "Social Media", count: 1 },
    { id: "marketing", label: "Marketing", count: 3 },
    { id: "voice", label: "Voice AI", count: 1 },
    { id: "automation", label: "Automation", count: 1 },
  ]

  // Voice AI Data
  const voiceAgents = [
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
  ]

  const recentCalls = [
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
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
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
        return "bg-green-500/20 text-green-400 border-green-500/30"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">AI Content & Automation</h1>
            <p className="text-white/80">Create, automate, and optimize your marketing content with AI</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold transition-all hover:scale-105">
              <Plus className="mr-2 h-4 w-4" />
              New Content
            </Button>
          </div>
        </motion.div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/20 backdrop-blur-xl border border-white/20 p-2 mb-8">
            <TabsTrigger
              value="templates"
              className="text-white data-[state=active]:bg-green-500 data-[state=active]:text-black font-medium transition-all"
            >
              AI Templates
            </TabsTrigger>
            <TabsTrigger
              value="social"
              className="text-white data-[state=active]:bg-green-500 data-[state=active]:text-black font-medium transition-all"
            >
              Social Automation
            </TabsTrigger>
            <TabsTrigger
              value="voice"
              className="text-white data-[state=active]:bg-green-500 data-[state=active]:text-black font-medium transition-all"
            >
              Voice AI
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-8">
            {/* Search and Filters */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <Input
                  placeholder="Search templates..."
                  className="pl-12 bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-green-400 focus:ring-green-400/20 h-12 backdrop-blur-sm"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={activeFilter === filter.id ? "default" : "outline"}
                    onClick={() => setActiveFilter(filter.id)}
                    className={
                      activeFilter === filter.id
                        ? "bg-green-500 text-black hover:bg-green-600 transition-all"
                        : "bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all"
                    }
                  >
                    {filter.label} ({filter.count})
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Templates Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-black/20 backdrop-blur-xl border border-white/20 text-white hover:bg-black/30 transition-all h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">{template.icon}</div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{template.status}</Badge>
                      </div>
                      <CardTitle className="text-xl text-white mb-2">{template.title}</CardTitle>
                      <CardDescription className="text-white/70">{template.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">{template.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4 text-green-400" />
                          <span className="text-white">{template.uses.toLocaleString()} uses</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-blue-400" />
                          <span className="text-white/70">{template.lastUsed}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-white">Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {template.features.map((feature, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="bg-white/10 text-white border-white/20 text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold transition-all hover:scale-105">
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-black/20 backdrop-blur-xl border border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Social Media Automation</CardTitle>
                  <CardDescription className="text-white/70">
                    Automate your social media presence with AI-powered content creation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-xl text-white mb-2">Coming Soon</h3>
                    <p className="text-white/70">Social media automation features are in development</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="voice" className="space-y-8">
            {/* Voice AI Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-black/20 backdrop-blur-xl border border-white/20 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/70 text-sm font-medium">Active Agents</p>
                        <p className="text-2xl font-bold text-white">3</p>
                      </div>
                      <Mic className="h-8 w-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-black/20 backdrop-blur-xl border border-white/20 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/70 text-sm font-medium">Calls Today</p>
                        <p className="text-2xl font-bold text-white">46</p>
                      </div>
                      <Phone className="h-8 w-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-black/20 backdrop-blur-xl border border-white/20 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/70 text-sm font-medium">Success Rate</p>
                        <p className="text-2xl font-bold text-white">84%</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="bg-black/20 backdrop-blur-xl border border-white/20 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/70 text-sm font-medium">Avg Duration</p>
                        <p className="text-2xl font-bold text-white">4.0m</p>
                      </div>
                      <Clock className="h-8 w-8 text-orange-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Voice Agents */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="bg-black/20 backdrop-blur-xl border border-white/20 text-white">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Voice AI Agents</CardTitle>
                    <CardDescription className="text-white/70">
                      Manage your automated voice agents and their performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {voiceAgents.map((agent) => (
                      <div
                        key={agent.id}
                        className="flex items-center justify-between p-4 bg-white/10 border border-white/20 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-500/20 rounded-lg">
                            <Volume2 className="h-5 w-5 text-green-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{agent.name}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className={getStatusColor(agent.status)}>
                                {agent.status}
                              </Badge>
                              <span className="text-white/70 text-sm capitalize">{agent.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-white font-medium">{agent.callsToday}</p>
                            <p className="text-white/70 text-xs">calls today</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">{agent.successRate}%</p>
                            <p className="text-white/70 text-xs">success</p>
                          </div>
                          <Switch checked={agent.enabled} className="data-[state=checked]:bg-green-500" />
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Configure Agents
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Calls */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Card className="bg-black/20 backdrop-blur-xl border border-white/20 text-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg text-white">Recent Calls</CardTitle>
                        <CardDescription className="text-white/70">
                          Latest voice AI interactions and outcomes
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all"
                      >
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentCalls.map((call) => (
                      <div key={call.id} className="p-4 bg-white/10 border border-white/20 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="p-1 bg-green-500/20 rounded">
                              {call.type === "inbound" ? (
                                <PhoneCall className="h-4 w-4 text-green-400" />
                              ) : (
                                <Phone className="h-4 w-4 text-blue-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-white">{call.contact}</p>
                              <p className="text-white/70 text-sm">{call.timestamp}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className={getOutcomeColor(call.outcome)}>
                              {call.outcome.replace("-", " ")}
                            </Badge>
                            <p className="text-white/70 text-sm mt-1">{call.duration}</p>
                          </div>
                        </div>
                        <p className="text-white/70 text-sm">{call.notes}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
