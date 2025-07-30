"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { AuthForm } from "@/components/auth/auth-form"
import { SocialLoginButtons } from "@/components/auth/social-login-buttons"

export default function SignupPage() {
  const router = useRouter()

  const handleSignup = async (credentials: { email: string; password: string; name?: string }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you'd make an API call here
    console.log("Signup attempt:", credentials)

    // Redirect to onboarding
    router.push("/onboarding")
  }

  const handleSocialAuth = async (provider: string) => {
    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Social auth with:", provider)
    router.push("/onboarding")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center slide-in-up">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center glow-animation">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="text-2xl font-montserrat font-bold text-white">Estate.AI</span>
          </Link>
        </div>

        {/* Auth Form */}
        <AuthForm mode="signup" onSubmit={handleSignup} />

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-800 text-slate-300">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <SocialLoginButtons providers={["google", "dropbox"]} onAuth={handleSocialAuth} />

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-slate-300">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
