"use client"

import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function TopBar() {
  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-600/30 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="md:hidden text-white hover:bg-slate-700/50 btn-animated">
          <Menu className="h-5 w-5" />
        </Button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search properties, deals, documents..."
            className="pl-10 w-64 md:w-96 bg-slate-800/50 border-slate-600/30 text-white placeholder:text-gray-400 focus:border-blue-500 input-focus"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="relative text-white hover:bg-slate-700/50 btn-animated">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            3
          </Badge>
        </Button>
      </div>
    </header>
  )
}
