"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Zap, ImageIcon, FileText, Mic, Settings, Play, Star, Clock, TrendingUp } from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  category: "social" | "marketing" | "voice" | "automation"
  status: "ready" | "premium" | "new"
  rating: number
  uses: number
  lastUsed?: string
  features: string[]
  icon: React.ReactNode
}

const templates: Template[] = [
  {
    id: "property-showcase",
    name: "AI Property Showcase",
    description: "Image Analysis, Enhancement +2 more",
    category: "marketing",
    status: "ready",
    rating: 4.8,
    uses: 1247,
    lastUsed: "2 hours ago",
    features: ["Image Enhancement", "Virtual Staging", "Description Generation", "SEO Optimization"],
    icon: <ImageIcon className="h-6 w-6" />,
  },
  {
    id: "market-update-video",
    name: "Market Update Video",
    description: "Video Generation, Voiceover +1 more",
    category: "marketing",
    status: "ready",
    rating: 4.6,
    uses: 892,
    lastUsed: "4 hours ago",
    features: ["Video Generation", "AI Voiceover", "Market Data Integration"],
    icon: <Play className="h-6 w-6" />,
  },
  {
    id: "lead-qualification",
    name: "Lead Qualification Voice AI",
    description: "Call Routing, Lead Qualification +1 more",
    category: "voice",
    status: "ready",
    rating: 4.9,
    uses: 2156,
    lastUsed: "30 minutes ago",
    features: ["Natural Language Processing", "Lead Scoring", "Appointment Booking"],
    icon: <Mic className="h-6 w-6" />,
  },
  {
    id: "social-media-posts",
    name: "Social Media Posts",
    description: "Multi-platform content creation and scheduling",
    category: "social",
    status: "ready",
    rating: 4.7,
    uses: 1834,
    lastUsed: "1 hour ago",
    features: ["Content Creation", "Multi-Platform Posting", "Engagement Tracking"],
    icon: <Zap className="h-6 w-6" />,
  },
  {
    id: "email-campaigns",
    name: "Email Campaigns",
    description: "Automated email marketing with AI personalization",
    category: "marketing",
    status: "premium",
    rating: 4.5,
    uses: 967,
    features: ["Email Templates", "Personalization", "A/B Testing", "Analytics"],
    icon: <FileText className="h-6 w-6" />,
  },
  {
    id: "client-follow-up",
    name: "Client Follow-up Automation",
    description: "Automated client communication and follow-up sequences",
    category: "automation",
    status: "new",
    rating: 4.3,
    uses: 234,
    features: ["Automated Sequences", "Personalized Messages", "Response Tracking"],
    icon: <Settings className="h-6 w-6" />,
  },
]

export function ContentTemplateSelector() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", name: "All Templates", count: templates.length },
    { id: "social", name: "Social Media", count: templates.filter((t) => t.category === "social").length },
    { id: "marketing", name: "Marketing", count: templates.filter((t) => t.category === "marketing").length },
    { id: "voice", name: "Voice AI", count: templates.filter((t) => t.category === "voice").length },
    { id: "automation", name: "Automation", count: templates.filter((t) => t.category === "automation").length },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">ready</Badge>
      case "premium":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">premium</Badge>
      case "new":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">new</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-600" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-900/50 border-emerald-500/20 text-emerald-400 placeholder:text-emerald-600"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-2 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? "bg-emerald-600 text-black"
                : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="bg-gray-900/50 border-emerald-500/20 hover:border-emerald-500/40 transition-colors"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">{template.icon}</div>
                  <div>
                    <CardTitle className="text-lg text-emerald-400">{template.name}</CardTitle>
                    {getStatusBadge(template.status)}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-emerald-600">{template.description}</CardDescription>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-emerald-400">{template.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-600">{template.uses.toLocaleString()} uses</span>
                </div>
                {template.lastUsed && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-600">{template.lastUsed}</span>
                  </div>
                )}
              </div>

              {/* Features */}
              <div>
                <p className="text-emerald-400 text-sm font-medium mb-2">Features</p>
                <div className="flex flex-wrap gap-1">
                  {template.features.slice(0, 3).map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs"
                    >
                      {feature}
                    </Badge>
                  ))}
                  {template.features.length > 3 && (
                    <Badge
                      variant="outline"
                      className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs"
                    >
                      +{template.features.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-black">Use Template</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-emerald-600 mb-2">
            <Search className="h-12 w-12 mx-auto opacity-50" />
          </div>
          <p className="text-emerald-400 font-medium">No templates found</p>
          <p className="text-emerald-600 text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
