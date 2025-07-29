"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { AuthForm } from "@/components/auth/auth-form"
import { SocialLoginButtons } from "@/components/auth/social-login-buttons"

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = async (credentials: { email: string; password: string }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you'd make an API call here
    console.log("Login attempt:", credentials)

    // Redirect to dashboard
    router.push("/dashboard")
  }

  const handleSocialAuth = async (provider: string) => {
    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Social auth with:", provider)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="text-2xl font-montserrat font-bold">Estate.AI</span>
          </Link>
        </div>

        {/* Auth Form */}
        <AuthForm mode="login" onSubmit={handleLogin} />

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <SocialLoginButtons providers={["google", "dropbox"]} onAuth={handleSocialAuth} />

        {/* Signup Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium text-emerald-600 hover:text-emerald-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
