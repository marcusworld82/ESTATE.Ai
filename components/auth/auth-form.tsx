"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthFormProps {
  mode: "signup" | "login"
  onSubmit: (credentials: { email: string; password: string; name?: string }) => void
}

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (mode === "signup" && !formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (mode === "signup" && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Auth error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-md mx-auto shadow-lg bg-slate-800/80 backdrop-blur-xl border-slate-600/30 card-hover">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-montserrat font-bold text-white">
            {mode === "signup" ? "Create Account" : "Welcome Back"}
          </CardTitle>
          <CardDescription className="text-slate-300">
            {mode === "signup" ? "Start closing deals 90% faster today" : "Sign in to your Estate.AI dashboard"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name" className="block text-sm font-medium text-white">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`border border-gray-300 rounded p-2 focus:ring-emerald-500 ${
                    errors.name ? "border-red-500" : ""
                  } bg-slate-700/50 border-slate-600/30 text-white placeholder-slate-400 focus:border-blue-400 input-focus`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm font-medium text-white">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`border border-gray-300 rounded p-2 focus:ring-emerald-500 ${
                  errors.email ? "border-red-500" : ""
                } bg-slate-700/50 border-slate-600/30 text-white placeholder-slate-400 focus:border-blue-400 input-focus`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`border border-gray-300 rounded p-2 pr-10 focus:ring-emerald-500 ${
                    errors.password ? "border-red-500" : ""
                  } bg-slate-700/50 border-slate-600/30 text-white placeholder-slate-400 focus:border-blue-400 input-focus`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 btn-animated"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full btn-primary btn-ripple hover-lift">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "signup" ? "Creating Account..." : "Signing In..."}
                </>
              ) : mode === "signup" ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
