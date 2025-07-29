"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

interface ScheduleButtonProps {
  templateId: string
  onSchedule: (date: string) => void
  disabled?: boolean
}

export function ScheduleButton({ templateId, onSchedule, disabled = false }: ScheduleButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [isScheduling, setIsScheduling] = useState(false)
  const [scheduleType, setScheduleType] = useState<"now" | "later">("now")
  const { toast } = useToast()

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ]

  const handleSchedule = async () => {
    setIsScheduling(true)

    try {
      let scheduledDateTime: string

      if (scheduleType === "now") {
        scheduledDateTime = new Date().toISOString()
      } else {
        if (!selectedDate || !selectedTime) {
          toast({
            title: "Missing Information",
            description: "Please select both date and time for scheduling.",
            variant: "destructive",
          })
          setIsScheduling(false)
          return
        }

        const [hours, minutes] = selectedTime.split(":").map(Number)
        const scheduledDate = new Date(selectedDate)
        scheduledDate.setHours(hours, minutes, 0, 0)

        if (scheduledDate <= new Date()) {
          toast({
            title: "Invalid Date",
            description: "Please select a future date and time.",
            variant: "destructive",
          })
          setIsScheduling(false)
          return
        }

        scheduledDateTime = scheduledDate.toISOString()
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      onSchedule(scheduledDateTime)

      toast({
        title: scheduleType === "now" ? "Content Posted!" : "Content Scheduled!",
        description:
          scheduleType === "now"
            ? "Your content has been posted to all selected platforms."
            : `Your content will be posted on ${format(new Date(scheduledDateTime), "PPP 'at' p")}.`,
      })

      setIsOpen(false)
      setSelectedDate(undefined)
      setSelectedTime("")
      setScheduleType("now")
    } catch (error) {
      toast({
        title: "Scheduling Failed",
        description: "There was an error scheduling your content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsScheduling(false)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button disabled={disabled || isScheduling} className="btn-primary">
          {isScheduling ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule & Post
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80" align="end">
        <Card className="border-none shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-montserrat">Schedule Content</CardTitle>
            <CardDescription>Choose when to post your content</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Schedule Type Selection */}
            <div className="space-y-3">
              <Label>When to post</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={scheduleType === "now" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setScheduleType("now")}
                  className={scheduleType === "now" ? "btn-primary" : "bg-transparent"}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Post Now
                </Button>
                <Button
                  variant={scheduleType === "later" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setScheduleType("later")}
                  className={scheduleType === "later" ? "btn-primary" : "bg-transparent"}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
              </div>
            </div>

            {/* Date and Time Selection */}
            {scheduleType === "later" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                {/* Date Selection */}
                <div className="space-y-2">
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <Calendar className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Selection */}
                <div className="space-y-2">
                  <Label>Select Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Optimal Time Suggestion */}
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Optimal Time</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Based on your audience, 2:00 PM typically gets 23% more engagement.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Platform Preview */}
            <div className="space-y-2">
              <Label>Posting to platforms</Label>
              <div className="flex flex-wrap gap-2">
                {["Instagram", "Facebook", "LinkedIn"].map((platform) => (
                  <div key={platform} className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs font-medium">
                    {platform}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-transparent"
                disabled={isScheduling}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSchedule}
                disabled={isScheduling || (scheduleType === "later" && (!selectedDate || !selectedTime))}
                className="flex-1 btn-primary"
              >
                {isScheduling ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {scheduleType === "now" ? "Posting..." : "Scheduling..."}
                  </>
                ) : scheduleType === "now" ? (
                  "Post Now"
                ) : (
                  "Schedule Post"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
