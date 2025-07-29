"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Calendar, BarChart3, Settings, Plus } from "lucide-react"

interface SocialPlatform {
  id: string
  name: string
  icon: React.ReactNode
  connected: boolean
  enabled: boolean
  postsScheduled: number
  engagement: number
  followers: number
}

interface ScheduledPost {
  id: string
  content: string
  platforms: string[]
  scheduledTime: string
  status: "scheduled" | "published" | "failed"
  engagement?: {
    likes: number
    comments: number
    shares: number
  }
}

const socialPlatforms: SocialPlatform[] = [
  {
    id: "facebook",
    name: "Facebook",
    icon: <Facebook className="h-5 w-5" />,
    connected: true,
    enabled: true,
    postsScheduled: 12,
    engagement: 87,
    followers: 2847,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <Instagram className="h-5 w-5" />,
    connected: true,
    enabled: true,
    postsScheduled: 8,
    engagement: 92,
    followers: 4521,
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: <Twitter className="h-5 w-5" />,
    connected: true,
    enabled: false,
    postsScheduled: 15,
    engagement: 76,
    followers: 1893,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: <Linkedin className="h-5 w-5" />,
    connected: false,
    enabled: false,
    postsScheduled: 0,
    engagement: 0,
    followers: 0,
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: <Youtube className="h-5 w-5" />,
    connected: true,
    enabled: true,
    postsScheduled: 3,
    engagement: 94,
    followers: 892,
  },
]

const scheduledPosts: ScheduledPost[] = [
  {
    id: "1",
    content: "🏠 New listing alert! Beautiful 3BR/2BA home in downtown area with modern amenities...",
    platforms: ["facebook", "instagram"],
    scheduledTime: "Today, 2:00 PM",
    status: "scheduled",
  },
  {
    id: "2",
    content: "📊 Market update: Home prices in our area increased by 5.2% this quarter...",
    platforms: ["facebook", "twitter", "linkedin"],
    scheduledTime: "Tomorrow, 9:00 AM",
    status: "scheduled",
  },
  {
    id: "3",
    content: "✨ Just closed another deal! Congratulations to the Johnson family on their new home...",
    platforms: ["instagram", "facebook"],
    scheduledTime: "Yesterday, 5:30 PM",
    status: "published",
    engagement: {
      likes: 47,
      comments: 12,
      shares: 8,
    },
  },
]

export function SocialMediaAutomation() {
  const [platforms, setPlatforms] = useState(socialPlatforms)

  const togglePlatform = (platformId: string) => {
    setPlatforms((prev) =>
      prev.map((platform) => (platform.id === platformId ? { ...platform, enabled: !platform.enabled } : platform)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "published":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getPlatformIcon = (platformId: string) => {
    const platform = socialPlatforms.find((p) => p.id === platformId)
    return platform?.icon || <div className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900/50 border-emerald-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Active Platforms</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {platforms.filter((p) => p.connected && p.enabled).length}
                </p>
              </div>
              <Settings className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-emerald-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Posts Scheduled</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {platforms.reduce((acc, p) => acc + p.postsScheduled, 0)}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-emerald-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Avg Engagement</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {Math.round(platforms.reduce((acc, p) => acc + p.engagement, 0) / platforms.length)}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-emerald-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Total Followers</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {platforms.reduce((acc, p) => acc + p.followers, 0).toLocaleString()}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Platform Management */}
        <Card className="bg-gray-900/50 border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-lg text-emerald-400">Connected Platforms</CardTitle>
            <CardDescription className="text-emerald-600">
              Manage your social media platform connections and automation settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className="flex items-center justify-between p-4 bg-black/50 border border-emerald-500/20 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">{platform.icon}</div>
                  <div>
                    <p className="font-medium text-emerald-400">{platform.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {platform.connected ? (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Connected</Badge>
                      ) : (
                        <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Not Connected</Badge>
                      )}
                      <span className="text-emerald-600 text-sm">{platform.followers.toLocaleString()} followers</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {platform.connected && (
                    <div className="text-right">
                      <p className="text-emerald-400 font-medium">{platform.engagement}%</p>
                      <p className="text-emerald-600 text-xs">engagement</p>
                    </div>
                  )}
                  <Switch
                    checked={platform.enabled && platform.connected}
                    onCheckedChange={() => togglePlatform(platform.id)}
                    disabled={!platform.connected}
                  />
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full bg-transparent border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
            >
              <Plus className="mr-2 h-4 w-4" />
              Connect New Platform
            </Button>
          </CardContent>
        </Card>

        {/* Scheduled Posts */}
        <Card className="bg-gray-900/50 border-emerald-500/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-emerald-400">Scheduled Posts</CardTitle>
                <CardDescription className="text-emerald-600">Upcoming and recent social media posts</CardDescription>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-black">
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {scheduledPosts.map((post) => (
              <div key={post.id} className="p-4 bg-black/50 border border-emerald-500/20 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-emerald-400 text-sm line-clamp-2">{post.content}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex items-center space-x-1">
                        {post.platforms.map((platformId) => (
                          <div key={platformId} className="text-emerald-400">
                            {getPlatformIcon(platformId)}
                          </div>
                        ))}
                      </div>
                      <span className="text-emerald-600 text-xs">{post.scheduledTime}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(post.status)}>
                    {post.status}
                  </Badge>
                </div>

                {post.engagement && (
                  <div className="flex items-center space-x-4 text-xs text-emerald-600">
                    <span>{post.engagement.likes} likes</span>
                    <span>{post.engagement.comments} comments</span>
                    <span>{post.engagement.shares} shares</span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
