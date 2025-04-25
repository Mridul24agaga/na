"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

type AuthModalProps = {
  isOpen: boolean
  onClose: () => void
  onLogin: (email: string, password: string) => Promise<void>
  onSignup: (email: string, password: string) => Promise<void>
}

export default function AuthModal({ isOpen, onClose, onLogin, onSignup }: AuthModalProps) {
  const [isLoginView, setIsLoginView] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isLoginView) {
        await onLogin(email, password)
      } else {
        await onSignup(email, password)
      }
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-md mx-4">
        {/* Black background for 3D effect */}
        <div className="absolute inset-0 bg-black rounded-lg transform translate-x-2 translate-y-2"></div>
        <div className="relative z-10 bg-white p-6 rounded-lg border-2 border-black">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>

          <h2 className="text-2xl font-bold text-center mb-6">
            {isLoginView ? "Log in to continue" : "Create an account"}
          </h2>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF7043] text-white font-bold py-3 px-4 rounded-md hover:bg-[#F4511E] transition-colors border-2 border-black disabled:opacity-50"
            >
              {loading ? "Loading..." : isLoginView ? "Log In" : "Sign Up"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button onClick={() => setIsLoginView(!isLoginView)} className="text-[#FF7043] hover:underline">
              {isLoginView ? "Need an account? Sign up" : "Already have an account? Log in"}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              By continuing, you agree to our{" "}
              <a href="#" className="text-[#FF7043] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#FF7043] hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
