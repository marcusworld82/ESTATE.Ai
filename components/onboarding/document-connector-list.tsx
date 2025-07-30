"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface Connector {
  id: string
  name: string
  status: "connected" | "disconnected"
  description: string
  icon: React.ReactNode
}

interface DocumentConnectorListProps {
  connectors: Connector[]
  onToggle: (id: string) => void
}

export function DocumentConnectorList({ connectors, onToggle }: DocumentConnectorListProps) {
  const [loadingConnectors, setLoadingConnectors] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  const handleToggle = async (connector: Connector) => {
    setLoadingConnectors((prev) => new Set(prev).add(connector.id))

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      onToggle(connector.id)

      toast({
        title: connector.status === "connected" ? "Disconnected" : "Connected",
        description: `${connector.name} has been ${connector.status === "connected" ? "disconnected" : "connected"} successfully.`,
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: `Failed to ${connector.status === "connected" ? "disconnect" : "connect"} ${connector.name}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setLoadingConnectors((prev) => {
        const newSet = new Set(prev)
        newSet.delete(connector.id)
        return newSet
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-8 slide-in-up">
        <h2 className="text-2xl font-montserrat font-bold mb-2 text-white">Connect Your Storage</h2>
        <p className="text-slate-300">Link your cloud storage to automatically analyze documents</p>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {connectors.map((connector, index) => {
          const isLoading = loadingConnectors.has(connector.id)
          const isConnected = connector.status === "connected"

          return (
            <motion.div
              key={connector.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="scale-in"
            >
              <Card
                className={`transition-all duration-300 hover:shadow-md ${
                  isConnected ? "ring-2 ring-blue-500 bg-slate-700/50" : "bg-slate-800/50"
                } backdrop-blur-xl border-slate-600/30 card-hover`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          isConnected ? "bg-blue-500/20 border border-blue-500/30 glow-animation" : "bg-slate-700/50 border border-slate-600/30"
                        } transition-all`}
                      >
                        {connector.icon}
                      </div>

                      <div>
                        <h3 className="text-lg font-montserrat font-semibold text-white">{connector.name}</h3>
                        <p className="text-sm text-slate-300">{connector.description}</p>

                        {/* Status Indicator */}
                        <div className="flex items-center mt-2">
                          {isConnected ? (
                            <>
                              <Check className="h-4 w-4 text-blue-400 mr-1" />
                              <span className="text-sm text-blue-400 font-medium">Connected</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-4 w-4 text-slate-400 mr-1" />
                              <span className="text-sm text-slate-400">Not connected</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleToggle(connector)}
                      disabled={isLoading}
                      variant={isConnected ? "outline" : "default"}
                      className={isConnected ? "btn-outline hover-lift btn-animated" : "btn-primary btn-ripple hover-lift"}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {isConnected ? "Disconnecting..." : "Connecting..."}
                        </>
                      ) : isConnected ? (
                        "Disconnect"
                      ) : (
                        "Connect"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Help Text */}
      <div className="text-center mt-8">
        <p className="text-sm text-slate-400">
          Your documents are processed securely and never stored permanently.{" "}
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
            Learn more about our security
          </a>
        </p>
      </div>
    </div>
  )
}
