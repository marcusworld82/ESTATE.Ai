"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  FileText,
  Home,
  MessageSquare,
  Settings,
  TrendingUp,
  Users,
  Brain,
  Phone,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home, color: "text-blue-400" },
  { name: "Analysis", href: "/dashboard/analysis", icon: BarChart3, color: "text-green-400" },
  { name: "Reports", href: "/dashboard/reports", icon: FileText, color: "text-purple-400" },
  { name: "AI Agents", href: "/dashboard/ai-agents", icon: Brain, color: "text-orange-400" },
  { name: "Voice AI", href: "/dashboard/voice", icon: Phone, color: "text-pink-400" },
  { name: "Content", href: "/dashboard/content", icon: MessageSquare, color: "text-yellow-400" },
  { name: "Slack", href: "/dashboard/slack", icon: Users, color: "text-red-400" },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, color: "text-gray-400" },
]

export function SidebarNav() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-black/20 backdrop-blur-xl border-r border-white/10 transition-all duration-300 relative",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Collapse Toggle Button */}
      <Button
        onClick={() => setIsCollapsed(!isCollapsed)}
        variant="ghost"
        size="sm"
        className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
      >
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && <span className="text-xl font-bold text-white">Estate.AI</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                isActive ? "bg-white/20 text-white shadow-lg" : "text-gray-300 hover:bg-white/10 hover:text-white",
                isCollapsed && "justify-center",
              )}
            >
              <item.icon className={cn("h-5 w-5", item.color, "group-hover:scale-110 transition-transform")} />
              {!isCollapsed && <span className="font-medium">{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/10 space-y-3">
        {/* Add Button */}
        <Button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white border-0 rounded-xl h-12 font-semibold transition-all hover:scale-105">
          <Plus className="h-5 w-5 mr-2" />
          {!isCollapsed && "New Analysis"}
        </Button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 cursor-pointer hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-pink-500/30 transition-all">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
              S
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Sarah Chen</p>
              <p className="text-xs text-purple-200 truncate">Premium Plan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
