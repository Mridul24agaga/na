"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Eye, EyeOff, Github, X } from 'lucide-react'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
    console.log({ email, password, name, agreedToTerms })
  }

  return (
    <div className={`min-h-screen bg-[#FFF8E1] flex flex-col ${poppins.variable} font-['Poppins']`}>
      {/* Header */}
      <header className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            FormCraft
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-black bg-white hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4 text-gray-900" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] border border-dashed border-[#FFB74D]/30 rounded-full"></div>
          <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] border border-dashed border-[#FFB74D]/30 rounded-full"></div>

          <div className="absolute -top-[50px] -right-[50px] w-[300px] h-[300px] bg-[#FF8A65]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-[150px] -left-[150px] w-[400px] h-[400px] bg-[#26A69A]/20 rounded-full blur-3xl"></div>

          <div className="absolute top-[20%] right-[15%] w-[100px] h-[100px] bg-[#FFEB3B]/30 rounded-blob rotate-12"></div>
          <div className="absolute bottom-[15%] left-[10%] w-[150px] h-[150px]">
            <Image
              src="/images/orange-blob.png"
              alt="Decorative blob"
              width={150}
              height={150}
              className="w-full h-auto opacity-20"
            />
          </div>

          {/* Floating dots */}
          <div className="absolute top-[15%] right-[35%] w-4 h-4 bg-[#FF7043] rounded-full"></div>
          <div className="absolute top-[65%] left-[25%] w-3 h-3 bg-[#26A69A] rounded-full"></div>
          <div className="absolute bottom-[25%] right-[15%] w-5 h-5 bg-[#FFEB3B] rounded-full"></div>
        </div>

        <div className="w-full max-w-md relative">
          {/* Black background for 3D effect */}
          <div className="absolute inset-0 bg-black rounded-xl transform translate-x-6 translate-y-6"></div>

          <div className="bg-white p-8 rounded-xl border-4 border-black relative z-10">
            {/* Form Title */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
              <p className="text-gray-600">Fill in the details below to get started</p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#26A69A] focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#26A69A] focus:border-transparent"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#26A69A] focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start mt-4">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 border-gray-300 rounded text-[#26A69A] focus:ring-[#26A69A]"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-[#FF7043] hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#FF7043] hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 relative">
                {/* Black background for 3D effect */}
                <div className="absolute inset-0 bg-black rounded-md transform translate-x-2 translate-y-2"></div>
                <button
                  type="submit"
                  className="relative z-10 w-full bg-[#FFEB3B] text-gray-900 font-medium py-3 px-4 rounded-md hover:bg-[#FDD835] transition-colors border-2 border-black flex items-center justify-center"
                >
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>

              {/* Social Signup */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-black rounded-md transform translate-x-1 translate-y-1"></div>
                    <button
                      type="button"
                      className="relative z-10 w-full flex justify-center items-center py-2.5 px-4 border-2 border-black rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <svg className="h-5 w-5 mr-2" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 bg-black rounded-md transform translate-x-1 translate-y-1"></div>
                    <button
                      type="button"
                      className="relative z-10 w-full flex justify-center items-center py-2.5 px-4 border-2 border-black rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <Github className="h-5 w-5 mr-2" />
                      GitHub
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-[#FF7043] font-medium hover:underline">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="flex items-center px-3 py-1 rounded-full border-2 border-black bg-white">
              <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2" />
              <span className="text-xs font-medium text-gray-700">Secure signup</span>
            </div>
            <div className="flex items-center px-3 py-1 rounded-full border-2 border-black bg-white">
              <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2" />
              <span className="text-xs font-medium text-gray-700">Free forever plan</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">© 2023 FormCraft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
