"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Bot,
  Camera,
  Video,
  Phone,
  FileText,
  MessageSquare,
  BarChart3,
  Zap,
  Settings,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react"

interface AIAgent {
  id: string
  name: string
  description: string
  category: "content" | "communication" | "analysis" | "automation"
  status: "active" | "inactive" | "processing"
  usage: number
  successRate: number
  lastUsed: string
  capabilities: string[]
  icon: React.ReactNode
}

const aiAgents: AIAgent[] = [
  {
    id: "property-showcase",
    name: "AI Property Showcase",
    description: "Automatically generates stunning property showcases with AI-enhanced images and descriptions",
    category: "content",
    status: "active",
    usage: 89,
    successRate: 94,
    lastUsed: "2 hours ago",
    capabilities: ["Image Analysis", "Virtual Staging", "Description Generation", "+2 more"],
    icon: <Camera className="h-6 w-6" />,
  },
  {
    id: "market-update-video",
    name: "Market Update Video",
    description: "Creates personalized market update videos with AI voiceover and data visualization",
    category: "content",
    status: "active",
    usage: 76,
    successRate: 91,
    lastUsed: "4 hours ago",
    capabilities: ["Video Generation", "AI Voiceover", "Market Data Integration", "+1 more"],
    icon: <Video className="h-6 w-6" />,
  },
  {
    id: "lead-qualification-voice",
    name: "Lead Qualification Voice AI",
    description: "Intelligent voice agent that qualifies leads through natural conversations",
    category: "communication",
    status: "active",
    usage: 92,
    successRate: 87,
    lastUsed: "30 minutes ago",
    capabilities: ["Natural Language Processing", "Lead Scoring", "Appointment Booking", "+1 more"],
    icon: <Phone className="h-6 w-6" />,
  },
  {
    id: "multi-platform-description",
    name: "Multi-Platform AI Property Description",
    description: "Generates SEO-optimized property descriptions for multiple platforms simultaneously",
    category: "content",
    status: "active",
    usage: 84,
    successRate: 96,
    lastUsed: "1 hour ago",
    capabilities: ["SEO Optimization", "Platform Adaptation", "Content Personalization"],
    icon: <FileText className="h-6 w-6" />,
  },
  {
    id: "client-checkin-voice",
    name: "Client Check-in Voice",
    description: "Automated client satisfaction surveys and feedback collection via voice calls",
    category: "communication",
    status: "active",
    usage: 67,
    successRate: 89,
    lastUsed: "6 hours ago",
    capabilities: ["Voice Surveys", "Sentiment Analysis", "Follow-up Scheduling"],
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    id: "document-analysis",
    name: "Document Analysis AI",
    description: "Comprehensive analysis of contracts, financial documents, and legal paperwork",
    category: "analysis",
    status: "processing",
    usage: 78,
    successRate: 93,
    lastUsed: "Processing...",
    capabilities: ["Contract Analysis", "Risk Assessment", "Compliance Checking"],
    icon: <BarChart3 className="h-6 w-6" />,
  },
  {
    id: "social-media-automation",
    name: "Social Media Automation",
    description: "Automated content creation and scheduling across multiple social platforms",
    category: "automation",
    status: "active",
    usage: 71,
    successRate: 88,
    lastUsed: "3 hours ago",
    capabilities: ["Content Creation", "Multi-Platform Posting", "Engagement Tracking"],
    icon: <Zap className="h-6 w-6" />,
  },
  {
    id: "market-analysis",
    name: "Market Analysis AI",
    description: "Comprehensive market insights and pricing recommendations using AI",
    category: "analysis",
    status: "active",
    usage: 85,
    successRate: 92,
    lastUsed: "1 hour ago",
    capabilities: ["Market Trends", "Price Predictions", "Competitive Analysis"],
    icon: <BarChart3 className="h-6 w-6" />,
  },
]

export default function AIAgentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", name: "All", count: aiAgents.length },
    { id: "content", name: "Content", count: aiAgents.filter((a) => a.category === "content").length },
    {
      id: "communication",
      name: "Communication",
      count: aiAgents.filter((a) => a.category === "communication").length,
    },
    { id: "analysis", name: "Analysis", count: aiAgents.filter((a) => a.category === "analysis").length },
    { id: "automation", name: "Automation", count: aiAgents.filter((a) => a.category === "automation").length },
  ]

  const filteredAgents =
    selectedCategory === "all" ? aiAgents : aiAgents.filter((agent) => agent.category === selectedCategory)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "processing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "inactive":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="h-3 w-3" />
      case "processing":
        return <RotateCcw className="h-3 w-3 animate-spin" />
      case "inactive":
        return <Pause className="h-3 w-3" />
      default:
        return <Pause className="h-3 w-3" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between slide-in-up"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">AI Agents</h1>
            <p className="text-white/80">Manage and monitor your AI-powered automation agents</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="btn-outline hover-lift btn-animated"
            >
              <Settings className="mr-2 h-4 w-4" />
              Agent Settings
            </Button>
            <Button className="btn-primary btn-ripple hover-lift">
              <Bot className="mr-2 h-4 w-4" />
              Deploy New Agent
            </Button>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 slide-in-left"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all hover:scale-105 btn-animated hover-lift ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-800/50 text-white hover:bg-slate-700/70 backdrop-blur-sm border border-slate-600/30"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="card-dark hover-glow card-hover text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium">Active Agents</p>
                    <p className="text-2xl font-bold text-white">
                      {aiAgents.filter((a) => a.status === "active").length}
                    </p>
                  </div>
                  <Bot className="h-8 w-8 text-blue-400 float-animation" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="card-dark hover-glow card-hover text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium">Avg Success Rate</p>
                    <p className="text-2xl font-bold text-white">
                      {Math.round(aiAgents.reduce((acc, agent) => acc + agent.successRate, 0) / aiAgents.length)}%
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-green-400 float-animation" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="card-dark hover-glow card-hover text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium">Total Usage</p>
                    <p className="text-2xl font-bold text-white">
                      {Math.round(aiAgents.reduce((acc, agent) => acc + agent.usage, 0) / aiAgents.length)}%
                    </p>
                  </div>
                  <Zap className="h-8 w-8 text-purple-400 float-animation" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="card-dark hover-glow card-hover text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium">Processing</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {aiAgents.filter((a) => a.status === "processing").length}
                    </p>
                  </div>
                  <RotateCcw className="h-8 w-8 text-yellow-400 animate-spin" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* AI Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="scale-in"
            >
              <Card className="card-dark hover-glow card-hover text-white h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30 glow-animation">{agent.icon}</div>
                      <div>
                        <CardTitle className="text-lg text-white">{agent.name}</CardTitle>
                        <Badge variant="outline" className={getStatusColor(agent.status)}>
                          {getStatusIcon(agent.status)}
                          <span className="ml-1">{agent.status}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/70 text-sm">{agent.description}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white/70 text-sm">Usage</span>
                        <span className="text-white font-medium">{agent.usage}%</span>
                      </div>
                      <Progress value={agent.usage} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white/70 text-sm">Success Rate</span>
                        <span className="text-white font-medium">{agent.successRate}%</span>
                      </div>
                      <Progress value={agent.successRate} className="h-2" />
                    </div>
                  </div>

                  <div className="text-sm text-white/70">Last used: {agent.lastUsed}</div>

                  {/* Capabilities */}
                  <div>
                    <p className="text-white text-sm font-medium mb-2">Capabilities</p>
                    <div className="flex flex-wrap gap-1">
                      {agent.capabilities.map((capability, index) => (
                        <Badge key={index} variant="outline" className="bg-slate-700/50 text-white border-slate-600/30 text-xs hover:bg-slate-600/50 transition-all">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button
                      className="flex-1 btn-primary btn-ripple hover-lift"
                      disabled={agent.status === "processing"}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Run Agent
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="btn-outline hover-lift btn-animated"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
