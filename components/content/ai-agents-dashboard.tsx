"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bot, Video, Phone, FileText, MessageSquare, Camera, TrendingUp, Play, Settings, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AIAgent {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  status: "active" | "inactive" | "processing"
  category: "content" | "communication" | "analysis" | "automation"
  metrics: {
    usage: number
    success_rate: number
    last_used: string
  }
  capabilities: string[]
}

export function AIAgentsDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const aiAgents: AIAgent[] = [
    {
      id: "property-showcase",
      name: "AI Property Showcase",
      description: "Automatically generates stunning property showcases with AI-enhanced images and descriptions",
      icon: <Camera className="h-5 w-5" />,
      status: "active",
      category: "content",
      metrics: {
        usage: 89,
        success_rate: 94,
        last_used: "2 hours ago",
      },
      capabilities: ["Image Analysis", "Virtual Staging", "Description Generation", "Social Media Ready"],
    },
    {
      id: "market-update-video",
      name: "Market Update Video",
      description: "Creates personalized market update videos with AI voiceover and data visualization",
      icon: <Video className="h-5 w-5" />,
      status: "active",
      category: "content",
      metrics: {
        usage: 76,
        success_rate: 91,
        last_used: "4 hours ago",
      },
      capabilities: ["Video Generation", "AI Voiceover", "Market Data Integration", "Brand Customization"],
    },
    {
      id: "lead-qualification",
      name: "Lead Qualification Voice AI",
      description: "Intelligent voice agent that qualifies leads through natural conversations",
      icon: <Phone className="h-5 w-5" />,
      status: "active",
      category: "communication",
      metrics: {
        usage: 92,
        success_rate: 87,
        last_used: "30 minutes ago",
      },
      capabilities: ["Natural Language Processing", "Lead Scoring", "Appointment Booking", "CRM Integration"],
    },
    {
      id: "property-description",
      name: "Multi-Platform AI Property Description",
      description: "Generates optimized property descriptions for MLS, social media, and marketing materials",
      icon: <FileText className="h-5 w-5" />,
      status: "active",
      category: "content",
      metrics: {
        usage: 85,
        success_rate: 96,
        last_used: "1 hour ago",
      },
      capabilities: ["SEO Optimization", "Platform Adaptation", "Tone Customization", "Multi-Language Support"],
    },
    {
      id: "client-checkin",
      name: "Client Check-in Voice",
      description: "Automated voice agent for client check-ins and satisfaction surveys",
      icon: <MessageSquare className="h-5 w-5" />,
      status: "active",
      category: "communication",
      metrics: {
        usage: 67,
        success_rate: 89,
        last_used: "3 hours ago",
      },
      capabilities: ["Sentiment Analysis", "Feedback Collection", "Follow-up Scheduling", "Satisfaction Tracking"],
    },
    {
      id: "document-analysis",
      name: "Document Analysis AI",
      description: "Analyzes contracts, leases, and financial documents for risks and opportunities",
      icon: <Bot className="h-5 w-5" />,
      status: "processing",
      category: "analysis",
      metrics: {
        usage: 78,
        success_rate: 93,
        last_used: "45 minutes ago",
      },
      capabilities: ["Risk Assessment", "Contract Review", "Financial Analysis", "Compliance Checking"],
    },
    {
      id: "social-automation",
      name: "Social Media Automation",
      description: "Automatically creates and schedules social media content across platforms",
      icon: <Zap className="h-5 w-5" />,
      status: "active",
      category: "automation",
      metrics: {
        usage: 82,
        success_rate: 88,
        last_used: "1 hour ago",
      },
      capabilities: ["Content Creation", "Multi-Platform Posting", "Engagement Tracking", "Hashtag Optimization"],
    },
    {
      id: "market-analysis",
      name: "Market Analysis AI",
      description: "Provides comprehensive market insights and pricing recommendations",
      icon: <TrendingUp className="h-5 w-5" />,
      status: "active",
      category: "analysis",
      metrics: {
        usage: 71,
        success_rate: 95,
        last_used: "2 hours ago",
      },
      capabilities: ["Comparative Market Analysis", "Price Predictions", "Market Trends", "Investment Insights"],
    },
  ]

  const filteredAgents =
    selectedCategory === "all" ? aiAgents : aiAgents.filter((agent) => agent.category === selectedCategory)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "processing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "inactive":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const categoryStats = {
    all: aiAgents.length,
    content: aiAgents.filter((a) => a.category === "content").length,
    communication: aiAgents.filter((a) => a.category === "communication").length,
    analysis: aiAgents.filter((a) => a.category === "analysis").length,
    automation: aiAgents.filter((a) => a.category === "automation").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-montserrat font-bold text-emerald-400">AI Agents</h2>
          <p className="text-emerald-600 mt-1">Manage and monitor your AI-powered automation agents</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="bg-transparent border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
          >
            <Settings className="mr-2 h-4 w-4" />
            Agent Settings
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-black">
            <Bot className="mr-2 h-4 w-4" />
            Deploy New Agent
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-900/50 border border-emerald-500/20">
          <TabsTrigger value="all" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-black">
            All ({categoryStats.all})
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-black">
            Content ({categoryStats.content})
          </TabsTrigger>
          <TabsTrigger
            value="communication"
            className="data-[state=active]:bg-emerald-600 data-[state=active]:text-black"
          >
            Communication ({categoryStats.communication})
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-black">
            Analysis ({categoryStats.analysis})
          </TabsTrigger>
          <TabsTrigger value="automation" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-black">
            Automation ({categoryStats.automation})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/50 border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">{agent.icon}</div>
                        <div>
                          <CardTitle className="text-lg font-montserrat text-emerald-400">{agent.name}</CardTitle>
                          <Badge variant="outline" className={getStatusColor(agent.status)}>
                            {agent.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-emerald-600">{agent.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-400">{agent.metrics.usage}%</div>
                        <div className="text-xs text-emerald-600">Usage</div>
                        <Progress value={agent.metrics.usage} className="h-1 mt-1" />
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-400">{agent.metrics.success_rate}%</div>
                        <div className="text-xs text-emerald-600">Success Rate</div>
                        <Progress value={agent.metrics.success_rate} className="h-1 mt-1" />
                      </div>
                    </div>

                    {/* Last Used */}
                    <div className="text-center">
                      <div className="text-sm text-emerald-600">Last used: {agent.metrics.last_used}</div>
                    </div>

                    {/* Capabilities */}
                    <div>
                      <div className="text-sm font-medium text-emerald-400 mb-2">Capabilities</div>
                      <div className="flex flex-wrap gap-1">
                        {agent.capabilities.slice(0, 3).map((capability, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          >
                            {capability}
                          </Badge>
                        ))}
                        {agent.capabilities.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-gray-500/10 text-gray-400 border-gray-500/30">
                            +{agent.capabilities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-black"
                        disabled={agent.status === "inactive"}
                      >
                        <Play className="mr-1 h-3 w-3" />
                        {agent.status === "processing" ? "Processing..." : "Run Agent"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                      >
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Overall Stats */}
      <Card className="bg-gray-900/50 border-emerald-500/20">
        <CardHeader>
          <CardTitle className="text-lg font-montserrat text-emerald-400">AI Agent Performance</CardTitle>
          <CardDescription className="text-emerald-600">
            Overall system performance and usage statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">
                {aiAgents.filter((a) => a.status === "active").length}
              </div>
              <div className="text-emerald-600">Active Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">
                {Math.round(aiAgents.reduce((acc, agent) => acc + agent.metrics.usage, 0) / aiAgents.length)}%
              </div>
              <div className="text-emerald-600">Avg Usage</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">
                {Math.round(aiAgents.reduce((acc, agent) => acc + agent.metrics.success_rate, 0) / aiAgents.length)}%
              </div>
              <div className="text-emerald-600">Avg Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">24/7</div>
              <div className="text-emerald-600">Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
