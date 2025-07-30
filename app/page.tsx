"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, Brain, FileText, TrendingUp, Users, Zap } from "lucide-react"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)

  const features = [
    {
      icon: <Brain className="h-8 w-8 sidebar-icon-blue" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze your real estate documents and market data",
    },
    {
      icon: <BarChart3 className="h-8 w-8 sidebar-icon-green" />,
      title: "Portfolio Analytics",
      description: "Comprehensive portfolio tracking with real-time performance metrics and insights",
    },
    {
      icon: <FileText className="h-8 w-8 sidebar-icon-purple" />,
      title: "Document Intelligence",
      description: "Automated document review and red flag detection for faster due diligence",
    },
    {
      icon: <TrendingUp className="h-8 w-8 sidebar-icon-orange" />,
      title: "Market Insights",
      description: "Real-time market analysis and trend predictions to optimize your investments",
    },
    {
      icon: <Users className="h-8 w-8 sidebar-icon-pink" />,
      title: "Team Collaboration",
      description: "Seamless collaboration tools for real estate teams and stakeholders",
    },
    {
      icon: <Zap className="h-8 w-8 sidebar-icon-yellow" />,
      title: "Automation",
      description: "Automate repetitive tasks and streamline your real estate workflow",
    },
  ]

  return (
    <div className="min-h-screen font-montserrat bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center scroll-animate slide-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Estate.AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Close Deals 90% Faster with AI-Powered Real Estate Intelligence
            </p>
            <p className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto">
              Transform your real estate business with advanced AI analytics, automated document review, and intelligent
              market insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button className="btn-primary btn-ripple text-lg px-8 py-4 hover-lift" size="lg">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="btn-outline btn-animated text-lg px-8 py-4 hover-lift bg-transparent" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 scroll-animate slide-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to analyze, manage, and optimize your real estate investments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="card-gradient hover-lift hover-glow card-hover scroll-animate border-0 scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="mb-4 float-animation">{feature.icon}</div>
                  <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="card-gradient hover-glow card-hover scroll-animate border-0 slide-in-up">
            <CardContent className="text-center py-16">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Transform Your Real Estate Business?
              </h3>
              <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
                Join thousands of real estate professionals who are already using Estate.AI to close deals faster and
                make smarter investments.
              </p>
              <Link href="/signup">
                <Button className="btn-primary btn-ripple text-lg px-8 py-4 hover-lift" size="lg" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Start Your Free Trial"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
