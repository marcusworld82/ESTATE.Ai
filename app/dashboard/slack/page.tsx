"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Hash,
  Search,
  Settings,
  Star,
  Bell,
  Plus,
  Smile,
  Paperclip,
  Send,
  MoreHorizontal,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Channel {
  id: string
  name: string
  type: "channel" | "dm"
  unread: number
  members?: number
}

interface Message {
  id: string
  user: string
  avatar?: string
  content: string
  timestamp: string
  reactions?: { emoji: string; count: number; users: string[] }[]
  replies?: number
}

export default function SlackPage() {
  const [selectedChannel, setSelectedChannel] = useState("general")
  const [messageInput, setMessageInput] = useState("")

  const channels: Channel[] = [
    { id: "general", name: "general", type: "channel", unread: 3, members: 12 },
    { id: "deals", name: "deals", type: "channel", unread: 7, members: 8 },
    { id: "ai-alerts", name: "ai-alerts", type: "channel", unread: 2, members: 15 },
    { id: "reports", name: "reports", type: "channel", unread: 0, members: 6 },
  ]

  const directMessages: Channel[] = [
    { id: "sarah-johnson", name: "Sarah Johnson", type: "dm", unread: 1 },
    { id: "mike-chen", name: "Mike Chen", type: "dm", unread: 0 },
    { id: "estate-ai-bot", name: "Estate.AI Bot", type: "dm", unread: 0 },
  ]

  const messages: Message[] = [
    {
      id: "1",
      user: "Estate.AI Bot",
      avatar: "🤖",
      content:
        "**New Analysis Complete**\n\nOak Street Plaza analysis has been completed with the following results:\n• Cap Rate: 7.5%\n• DSCR: 1.42\n• Red Flags: 0\n• AI Score: 87/100",
      timestamp: "2:34 PM",
      reactions: [
        { emoji: "✅", count: 3, users: ["Sarah", "Mike", "Alex"] },
        { emoji: "🎉", count: 1, users: ["Sarah"] },
      ],
    },
    {
      id: "2",
      user: "Mike Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      content:
        "Great work on the Oak Street analysis! The numbers look solid. Should we move forward with the investment recommendation?",
      timestamp: "2:36 PM",
      replies: 2,
    },
    {
      id: "3",
      user: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "Yes, I agree. The DSCR of 1.42 gives us good cushion. Let's schedule a call with the client tomorrow.",
      timestamp: "2:38 PM",
    },
    {
      id: "4",
      user: "Estate.AI Bot",
      avatar: "🤖",
      content:
        "📞 **Voice AI Update**\n\nCompleted 3 lead qualification calls in the last hour:\n• 2 qualified leads (budget $500K+)\n• 1 appointment scheduled\n• Average call duration: 4.2 minutes",
      timestamp: "2:45 PM",
    },
  ]

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Sending message:", messageInput)
      setMessageInput("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex">
      {/* Sidebar */}
      <div className="w-80 bg-slate-900/80 backdrop-blur-xl border-r border-slate-600/30 flex flex-col">
        {/* Workspace Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border-b border-slate-600/30 slide-in-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center glow-animation">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">Estate.AI Workspace</h2>
              <p className="text-sm text-white/70">Johnson Real Estate</p>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 slide-in-left"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            <Input
              placeholder="Search channels..."
              className="pl-10 bg-slate-800/50 border-slate-600/30 text-white placeholder-white/50 focus:border-blue-400 backdrop-blur-sm input-focus"
            />
          </div>
        </motion.div>

        {/* Channels */}
        <div className="flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-4 pb-4 slide-in-left"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Channels</h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white hover:bg-slate-700/50 btn-animated">
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="space-y-1">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all hover:scale-105 btn-animated hover-lift sidebar-item ${
                    selectedChannel === channel.id
                      ? "bg-blue-600 text-white font-medium active"
                      : "text-white hover:bg-slate-700/50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Hash className="h-4 w-4" />
                    <span>{channel.name}</span>
                  </div>
                  {channel.unread > 0 && (
                    <Badge className="h-5 text-xs bg-red-500 text-white border-none">{channel.unread}</Badge>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-4 pb-4 slide-in-left"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Direct Messages</h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white hover:bg-slate-700/50 btn-animated">
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="space-y-1">
              {directMessages.map((dm) => (
                <button
                  key={dm.id}
                  onClick={() => setSelectedChannel(dm.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all hover:scale-105 btn-animated hover-lift sidebar-item ${
                    selectedChannel === dm.id ? "bg-blue-600 text-white font-medium active" : "text-white hover:bg-slate-700/50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full glow-animation" />
                    <span>{dm.name}</span>
                  </div>
                  {dm.unread > 0 && (
                    <Badge className="h-5 text-xs bg-red-500 text-white border-none">{dm.unread}</Badge>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 border-t border-slate-600/30 slide-in-up"
        >
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-blue-500/30 glow-animation">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-blue-600 text-white font-semibold">SJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Sarah Johnson</p>
              <p className="text-xs text-blue-400 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-1 glow-animation"></span>
                Active
              </p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-slate-700/50 btn-animated">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-xl">
        {/* Channel Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border-b border-slate-600/30 slide-in-right"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Hash className="h-6 w-6 text-blue-500 glow-animation" />
              <h1 className="text-2xl font-bold text-white">
                {channels.find((c) => c.id === selectedChannel)?.name || selectedChannel}
              </h1>
              {channels.find((c) => c.id === selectedChannel)?.members && (
                <span className="text-sm text-white/70">
                  {channels.find((c) => c.id === selectedChannel)?.members} members
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700/50 transition-all btn-animated">
                <Star className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700/50 transition-all btn-animated">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700/50 transition-all btn-animated">
                <UserPlus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700/50 transition-all btn-animated">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group hover:bg-slate-800/30 p-4 rounded-lg transition-all hover-lift scale-in"
            >
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10 flex-shrink-0 border-2 border-blue-500/30">
                  {message.avatar?.startsWith("http") ? (
                    <AvatarImage src={message.avatar || "/placeholder.svg"} />
                  ) : (
                    <AvatarFallback className="bg-blue-600 text-white font-semibold">
                      {message.avatar || message.user.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-semibold text-white">{message.user}</span>
                    <span className="text-xs text-white/60">{message.timestamp}</span>
                  </div>

                  <div className="text-white text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>

                  {message.reactions && (
                    <div className="flex items-center space-x-2 mt-3">
                      {message.reactions.map((reaction, idx) => (
                        <button
                          key={idx}
                          className="flex items-center space-x-1 px-3 py-1 bg-slate-700/50 border border-slate-600/30 rounded-full text-xs hover:bg-slate-600/50 transition-all btn-animated"
                        >
                          <span>{reaction.emoji}</span>
                          <span className="text-white font-medium">{reaction.count}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {message.replies && (
                    <button className="text-xs text-blue-400 hover:text-blue-300 mt-2 font-medium btn-animated">
                      {message.replies} replies
                    </button>
                  )}
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-slate-700/50 btn-animated">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border-t border-slate-600/30 slide-in-up"
        >
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <div className="relative">
                <Input
                  placeholder={`Message #${channels.find((c) => c.id === selectedChannel)?.name || selectedChannel}`}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-slate-800/50 border-slate-600/30 text-white placeholder-white/50 pr-20 h-12 focus:border-blue-400 backdrop-blur-sm input-focus"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-slate-700/50 btn-animated">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-slate-700/50 btn-animated">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
              className="btn-primary btn-ripple hover-lift h-12 px-6"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
