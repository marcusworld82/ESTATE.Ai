"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SocialLoginButtonsProps {
  providers: Array<"google" | "dropbox">
  onAuth: (provider: string) => void
}

export function SocialLoginButtons({ providers, onAuth }: SocialLoginButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAuth = async (provider: string) => {
    setLoadingProvider(provider)
    setError(null)

    try {
      await onAuth(provider)
    } catch (err) {
      setError(`Failed to connect with ${provider}. Please try again.`)
    } finally {
      setLoadingProvider(null)
    }
  }

  const getProviderConfig = (provider: string) => {
    switch (provider) {
      case "google":
        return {
          name: "Google",
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          ),
          bgColor: "bg-white hover:bg-gray-50",
          textColor: "text-gray-700",
          borderColor: "border-gray-300",
        }
      case "dropbox":
        return {
          name: "Dropbox",
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 2L12 6L6 10L0 6L6 2ZM18 2L24 6L18 10L12 6L18 2ZM0 14L6 10L12 14L6 18L0 14ZM12 14L18 10L24 14L18 18L12 14ZM6 20L12 16L18 20L12 24L6 20Z" />
            </svg>
          ),
          bgColor: "bg-blue-600 hover:bg-blue-700",
          textColor: "text-white",
          borderColor: "border-blue-600",
        }
      default:
        return {
          name: provider,
          icon: null,
          bgColor: "bg-gray-100 hover:bg-gray-200",
          textColor: "text-gray-700",
          borderColor: "border-gray-300",
        }
    }
  }

  return (
    <div className="space-y-3">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600"
        >
          {error}
        </motion.div>
      )}

      {providers.map((provider, index) => {
        const config = getProviderConfig(provider)
        const isLoading = loadingProvider === provider

        return (
          <motion.div
            key={provider}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => handleAuth(provider)}
              disabled={isLoading || loadingProvider !== null}
              className={`w-full ${config.bgColor} ${config.textColor} border ${config.borderColor} transition-colors`}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                config.icon && <span className="mr-2">{config.icon}</span>
              )}
              {isLoading ? "Connecting..." : `Continue with ${config.name}`}
            </Button>
          </motion.div>
        )
      })}
    </div>
  )
}
