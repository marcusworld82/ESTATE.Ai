"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OnboardingProgressBar } from "@/components/onboarding/onboarding-progress-bar"
import { DocumentConnectorList } from "@/components/onboarding/document-connector-list"

export default function OnboardingPage() {
  const router = useRouter()
  const [connectors, setConnectors] = useState([
    {
      id: "google-drive",
      name: "Google Drive",
      status: "disconnected" as const,
      description: "Access documents from your Google Drive",
      icon: (
        <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.5 2L12 8.5L17.5 2L22 7.5L16.5 14H7.5L2 7.5L6.5 2Z" />
          <path d="M2 16.5L7.5 9H16.5L22 16.5L16.5 23H7.5L2 16.5Z" />
        </svg>
      ),
    },
    {
      id: "dropbox",
      name: "Dropbox",
      status: "disconnected" as const,
      description: "Sync files from your Dropbox account",
      icon: (
        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 2L12 6L6 10L0 6L6 2ZM18 2L24 6L18 10L12 6L18 2ZM0 14L6 10L12 14L6 18L0 14ZM12 14L18 10L24 14L18 18L12 14ZM6 20L12 16L18 20L12 24L6 20Z" />
        </svg>
      ),
    },
  ])

  const handleConnectorToggle = (id: string) => {
    setConnectors((prev) =>
      prev.map((connector) =>
        connector.id === id
          ? { ...connector, status: connector.status === "connected" ? "disconnected" : "connected" }
          : connector,
      ),
    )
  }

  const hasConnectedStorage = connectors.some((c) => c.status === "connected")

  const handleContinue = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <OnboardingProgressBar currentStep={2} totalSteps={3} />

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 slide-in-up"
        >
          <DocumentConnectorList connectors={connectors} onToggle={handleConnectorToggle} />
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-12 slide-in-up"
        >
          <Button onClick={handleContinue} disabled={!hasConnectedStorage} size="lg" className="btn-primary btn-ripple hover-lift px-8">
            Continue to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        {!hasConnectedStorage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-sm text-slate-400 mt-4"
          >
            Connect at least one storage service to continue
          </motion.p>
        )}
      </div>
    </div>
  )
}
