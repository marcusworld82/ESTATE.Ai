"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit3, Eye, Download, Share2, Heart, MessageCircle, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScheduleButton } from "./schedule-button"

interface TemplatePreviewCardProps {
  id: string
  image: string
  caption: string
  platform?: string
  hashtags?: string[]
  onCaptionChange?: (caption: string) => void
  onSchedule?: (date: string) => void
}

export function TemplatePreviewCard({
  id,
  image,
  caption,
  platform = "instagram",
  hashtags = [],
  onCaptionChange,
  onSchedule,
}: TemplatePreviewCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedCaption, setEditedCaption] = useState(caption)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleSaveCaption = () => {
    onCaptionChange?.(editedCaption)
    setIsEditing(false)
  }

  const handleSchedule = (date: string) => {
    onSchedule?.(date)
  }

  const mockEngagement = {
    likes: 1247,
    comments: 89,
    shares: 23,
  }

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Header - Platform Style */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <div>
              <div className="font-semibold text-sm">estate.ai</div>
              <div className="text-xs text-gray-500">Sponsored</div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Image */}
        <div className="relative">
          <img src={image || "/placeholder.svg"} alt="Property preview" className="w-full h-80 object-cover" />

          {/* Platform Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-black/70 text-white border-none">
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Engagement Bar */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`p-0 h-auto ${isLiked ? "text-red-500" : "text-gray-700"}`}
            >
              <Heart className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm" className="p-0 h-auto text-gray-700">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="sm" className="p-0 h-auto text-gray-700">
              <Share2 className="h-6 w-6" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSaved(!isSaved)}
            className={`p-0 h-auto ${isSaved ? "text-black" : "text-gray-700"}`}
          >
            <Bookmark className={`h-6 w-6 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Engagement Stats */}
        <div className="px-4 py-2">
          <div className="text-sm font-semibold">{mockEngagement.likes.toLocaleString()} likes</div>
        </div>

        {/* Caption */}
        <div className="px-4 pb-2">
          {isEditing ? (
            <div className="space-y-3">
              <Textarea
                value={editedCaption}
                onChange={(e) => setEditedCaption(e.target.value)}
                className="min-h-[100px] text-sm resize-none border-gray-200 focus:ring-emerald-500"
                placeholder="Write your caption..."
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleSaveCaption} className="btn-primary">
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditedCaption(caption)
                    setIsEditing(false)
                  }}
                  className="bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-semibold">estate.ai</span> <span className="text-gray-700">{caption}</span>
              </div>

              {hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {hashtags.map((hashtag, index) => (
                    <span key={index} className="text-blue-600 text-sm">
                      #{hashtag}
                    </span>
                  ))}
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="p-0 h-auto text-gray-500 hover:text-gray-700"
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Edit caption
              </Button>
            </div>
          )}
        </div>

        {/* Comments Preview */}
        <div className="px-4 pb-4">
          <div className="text-sm text-gray-500 mb-2">View all {mockEngagement.comments} comments</div>
          <div className="space-y-1 text-sm">
            <div>
              <span className="font-semibold">sarah_realtor</span>{" "}
              <span className="text-gray-700">Gorgeous property! 😍</span>
            </div>
            <div>
              <span className="font-semibold">mike_investor</span>{" "}
              <span className="text-gray-700">What's the cap rate?</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t bg-gray-50 space-y-3">
          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1 bg-white">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" className="flex-1 bg-white">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </div>

          <ScheduleButton templateId={id} onSchedule={handleSchedule} disabled={isEditing} />
        </div>
      </motion.div>
    </div>
  )
}
