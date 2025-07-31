"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { TopBar } from "@/components/dashboard/top-bar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [notifications] = useState([
    {
      id: "1",
      title: "Analysis Complete",
      message: "Your document analysis for Oak Street Plaza is ready.",
      time: "2m ago",
      read: false,
    },
    {
      id: "2",
      title: "Red Flag Detected",
      message: "High vacancy rate found in Maple Commons lease.",
      time: "1h ago",
      read: false,
    },
    {
      id: "3",
      title: "Report Generated",
      message: "Investment summary for Pine Ridge Center is available.",
      time: "3h ago",
      read: true,
    },
  ])

  const handleSearch = (query: string) => {
    console.log("Search query:", query)
  }

  const handleProfileClick = () => {
    console.log("Profile clicked")
  }

  // Add scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".scroll-animate")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="h-screen flex">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onSearch={handleSearch} notifications={notifications} onProfileClick={handleProfileClick} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
