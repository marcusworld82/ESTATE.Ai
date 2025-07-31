import type React from "react"
import type { Metadata } from "next"
import { useEffect } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Add scroll animation observer for all pages
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
    <html lang="en">
      <body className={`${inter.className} ${montserrat.variable}`}>{children}</body>
    </html>
  )
}
"use client"
