"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface OnboardingProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function OnboardingProgressBar({ currentStep, totalSteps }: OnboardingProgressBarProps) {
  const steps = [
    { label: "Account", description: "Create your account" },
    { label: "Connect", description: "Link your storage" },
    { label: "Dashboard", description: "Start analyzing" },
  ]

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isUpcoming = stepNumber > currentStep

          return (
            <div key={step.label} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-blue-500 text-white glow-animation"
                        : isCurrent
                          ? "bg-blue-600 text-white ring-4 ring-blue-600/20 glow-animation"
                          : "bg-slate-700 text-slate-400 border border-slate-600"
                    }
                  `}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
                </motion.div>

                {/* Step Label */}
                <div className="mt-2 text-center">
                  <div
                    className={`text-sm font-medium ${
                      isCurrent ? "text-white" : isCompleted ? "text-blue-400" : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{step.description}</div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4 mb-8">
                  <div className="relative">
                    <div className="h-0.5 bg-slate-600 w-full" />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: isCompleted ? "100%" : isCurrent ? "50%" : "0%",
                      }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="absolute top-0 h-0.5 bg-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress Percentage */}
      <div className="text-center">
        <div className="text-sm text-gray-600 mb-2">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="bg-blue-500 h-2 rounded-full"
          />
        </div>
      </div>
    </div>
  )
}
