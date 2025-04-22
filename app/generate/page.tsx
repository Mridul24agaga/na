"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Sparkles, Loader2, Paperclip, Wand2, ArrowRight, MousePointer, Zap, CheckCircle } from "lucide-react"
import { PromptSuggestions } from "@/components/prompt-suggestions"
import { ToolHistory } from "@/components/tool-history"
import { PlanModal } from "@/components/plan-modal"
import { BuildVisualization, type ToolCustomizations } from "@/components/build-visualization"
import  SeoToolRenderer  from "@/components/seo-tool-renderer"
import { useRouter } from "next/navigation"
import { Poppins } from "next/font/google"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlanGenerating, setIsPlanGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<any[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [showBuildVisualization, setShowBuildVisualization] = useState(false)
  const [generationPlan, setGenerationPlan] = useState<any>(null)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  // Add state for preview tool
  const [showPreviewTool, setShowPreviewTool] = useState(false)
  const [previewToolConfig, setPreviewToolConfig] = useState<any>(null)
  const [previewToolCustomizations, setPreviewToolCustomizations] = useState<any>(null)

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("seoToolHistory")
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error("Failed to parse history:", e)
      }
    }
  }, [])

  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("seoToolHistory", JSON.stringify(history))
  }, [history])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const generatePlan = async () => {
    if (!prompt.trim()) return

    setIsPlanGenerating(true)
    setError(null)

    try {
      // Generate a plan based on the prompt
      const planResponse = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })

      if (!planResponse.ok) {
        throw new Error("Failed to generate plan")
      }

      const planData = await planResponse.json()

      if (planData.error) {
        throw new Error(planData.error)
      }

      // Create a plan object with features based on the tool type
      const toolConfig = planData.toolConfig
      let features = []

      switch (toolConfig.toolType) {
        case "blog":
          features = [
            "Blog content structure recommendations",
            "Keyword analysis and suggestions",
            "SEO improvement tips",
            "Readability analysis",
          ]
          break
        case "keyword":
          features = [
            "Keyword research and analysis",
            "Search volume estimates",
            "Keyword difficulty assessment",
            "Related keyword suggestions",
          ]
          break
        case "meta":
          features = ["Meta title optimization", "Meta description generation", "SERP preview", "HTML code generation"]
          break
        case "local":
          features = [
            "Local SEO recommendations",
            "Google Business Profile optimization",
            "Local citation suggestions",
            "Location-based keyword ideas",
          ]
          break
        case "ecommerce":
          features = [
            "Product page optimization",
            "Category structure recommendations",
            "E-commerce SEO best practices",
            "Product description enhancement",
          ]
          break
        default:
          features = [
            "SEO content generation",
            "Optimization recommendations",
            "Keyword suggestions",
            "Content structure guidance",
          ]
      }

      setGenerationPlan({
        title: toolConfig.title,
        description: toolConfig.description,
        features: features,
        toolType: toolConfig.toolType,
        toolConfig: toolConfig,
      })

      setShowPlanModal(true)
    } catch (err: any) {
      console.error("Error generating plan:", err)
      setError(err.message || "Failed to generate plan. Please try again.")
    } finally {
      setIsPlanGenerating(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await generatePlan()
  }

  const handleConfirmPlan = async (additionalFeatures: string[]) => {
    setIsGenerating(true)
    setSelectedFeatures(additionalFeatures)
    setShowPlanModal(false)
    setShowBuildVisualization(true)
  }

  const handleBuildComplete = (customizations: ToolCustomizations) => {
    try {
      // Create a unique ID for this tool
      const toolId = Date.now().toString()

      // Add to history with the plan and customizations
      const newHistoryItem = {
        id: toolId,
        prompt: prompt.trim(),
        date: new Date().toISOString(),
        toolConfig: generationPlan.toolConfig,
        customizations: customizations,
      }

      // Update history in localStorage
      const updatedHistory = [newHistoryItem, ...history.slice(0, 9)]
      setHistory(updatedHistory)
      localStorage.setItem("seoToolHistory", JSON.stringify(updatedHistory))

      // Store the customizations for use in the tool page
      localStorage.setItem(`tool_${toolId}_customizations`, JSON.stringify(customizations))

      // Show preview tool instead of navigating immediately
      setPreviewToolConfig(generationPlan.toolConfig)
      setPreviewToolCustomizations(customizations)
      setShowBuildVisualization(false)
      setShowPreviewTool(true)

      // Store the tool ID for later navigation
      localStorage.setItem("currentToolId", toolId)
    } catch (err: any) {
      console.error("Error generating SEO tool:", err)
      setError(err.message || "Failed to generate SEO tool. Please try again.")
      setIsGenerating(false)
      setShowBuildVisualization(false)
    }
  }

  const handleGoToTool = () => {
    const toolId = localStorage.getItem("currentToolId")
    if (toolId) {
      router.push(`/c/${toolId}`)
    }
  }

  const handleGoBackToBuilder = () => {
    setShowPreviewTool(false)
    setShowBuildVisualization(true)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion)
    setShowSuggestions(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("seoToolHistory")
  }

  const toolSuggestions = [
    {
      text: "Keyword Research Tool",
      description: "For blog posts about digital marketing",
      prompt: "Create a keyword research tool for blog posts about digital marketing",
      color: "#E3F2FD",
      icon: <SearchIcon className="h-4 w-4 text-[#1E88E5]" />,
    },
    {
      text: "Blog SEO Analyzer",
      description: "Suggests improvements for blog content",
      prompt: "Build a blog post SEO analyzer that suggests improvements",
      color: "#E8F5E9",
      icon: <Sparkles className="h-4 w-4 text-[#43A047]" />,
    },
    {
      text: "Meta Tag Generator",
      description: "For local business websites",
      prompt: "Generate a meta tag creator for local business websites",
      color: "#FFF3E0",
      icon: <CheckCircle className="h-4 w-4 text-[#FB8C00]" />,
    },
    {
      text: "Local SEO Assistant",
      description: "For restaurants with Google Business Profile",
      prompt: "Build a local SEO tool for restaurants that helps with Google Business Profile",
      color: "#E0F2F1",
      icon: <MapPinIcon className="h-4 w-4 text-[#00897B]" />,
    },
    {
      text: "E-commerce SEO Tool",
      description: "For product descriptions",
      prompt: "Create an SEO content optimizer for e-commerce product descriptions",
      color: "#FBE9E7",
      icon: <ShoppingIcon className="h-4 w-4 text-[#E64A19]" />,
    },
  ]

  return (
    <div className={`min-h-screen bg-[#FFF8E1] ${poppins.variable} font-['Poppins']`}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[800px] h-[800px] border border-dashed border-[#FFB74D]/30 rounded-full"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] border border-dashed border-[#FFB74D]/30 rounded-full"></div>
        <div className="absolute -bottom-[300px] -left-[300px] w-[600px] h-[600px] bg-[#4DB6AC]/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] bg-[#FF8A65]/20 rounded-full blur-3xl"></div>

        {/* Additional decorative shapes */}
        <div className="absolute top-[30%] right-[15%] w-[100px] h-[100px] bg-[#FFEB3B]/30 rounded-blob rotate-12"></div>
        <div className="absolute top-[60%] left-[20%] w-[150px] h-[150px] bg-[#FF7043]/20 rounded-blob -rotate-12"></div>
        <div className="absolute bottom-[20%] left-[40%] w-[80px] h-[80px] bg-[#26A69A]/30 rounded-blob rotate-45"></div>
        <div className="absolute top-[15%] left-[30%] w-[60px] h-[60px] bg-[#FFC107]/40 rounded-blob -rotate-12"></div>
        <div className="absolute bottom-[40%] right-[25%] w-[200px] h-[200px]">
          <Image
            src="/images/orange-blob.png"
            alt="Decorative blob"
            width={200}
            height={200}
            className="w-full h-auto"
          />
        </div>

        {/* Floating dots */}
        <div className="absolute top-[25%] right-[25%] w-4 h-4 bg-[#FF7043] rounded-full"></div>
        <div className="absolute top-[45%] left-[15%] w-3 h-3 bg-[#26A69A] rounded-full"></div>
        <div className="absolute bottom-[35%] right-[35%] w-5 h-5 bg-[#FFEB3B] rounded-full"></div>
        <div className="absolute top-[65%] right-[10%] w-2 h-2 bg-[#FF7043] rounded-full"></div>
      </div>

      <AnimatePresence mode="wait">
        {showPreviewTool && previewToolConfig ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen relative z-10"
          >
            <SeoToolRenderer
              config={previewToolConfig}
              customizations={previewToolCustomizations}
              onUpdateCustomizations={setPreviewToolCustomizations}
              onGoBack={handleGoBackToBuilder}
            />

            <div className="fixed bottom-6 right-6 z-50">
              <div className="relative">
                {/* Black background for 3D effect */}
                <div className="absolute inset-0 bg-black rounded-full transform translate-x-2 translate-y-2"></div>
                <button
                  onClick={handleGoToTool}
                  className="relative z-10 px-6 py-3 bg-[#FF7043] text-white rounded-full shadow-lg hover:bg-[#F4511E] transition-all flex items-center border-2 border-black font-medium"
                >
                  <span>Deploy Tool</span>
                  <Sparkles className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col relative z-10"
          >
            {/* Header */}
            <header className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900">SEOCraft</span>
                  </div>

                  <div className="hidden md:flex items-center space-x-8">
                    <a href="#features" className="text-gray-900 hover:text-gray-700 text-sm font-medium">
                      Features
                    </a>
                    <a href="#how-it-works" className="text-gray-900 hover:text-gray-700 text-sm font-medium">
                      How it works
                    </a>
                    <a href="#pricing" className="text-gray-900 hover:text-gray-700 text-sm font-medium">
                      Pricing
                    </a>
                    <button className="bg-[#FFEB3B] text-gray-900 px-4 py-2 rounded-md hover:bg-[#FDD835] transition-colors text-sm font-medium shadow-sm border-2 border-black">
                      Log In
                    </button>
                    <button className="bg-[#26A69A] text-white px-4 py-2 rounded-md hover:bg-[#00897B] transition-colors text-sm font-medium shadow-sm border-2 border-black">
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12">
              <div className="w-full max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center px-3 py-1 bg-white rounded-full mb-6 sm:mb-8 border-2 border-black">
                  <Sparkles className="h-4 w-4 text-[#FFC107] mr-1" />
                  <span className="text-xs font-semibold text-gray-800 mr-1">AI-Powered</span>
                  <span className="text-xs text-gray-600">SEO Tools</span>
                  <ArrowRight className="h-3 w-3 text-gray-400 ml-1" />
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  What SEO tool do you <br />
                  <span className="text-[#FF7043]">want to build</span> today?
                </h1>
                <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
                  Prompt, generate, and deploy custom SEO tools for your website or business in minutes.
                </p>

                <div className="w-full">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      {/* Black background for 3D effect */}
                      <div className="absolute inset-0 bg-black rounded-xl transform translate-x-3 translate-y-3"></div>
                      <div className="relative z-10 bg-white rounded-xl border-4 border-black overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-[#FF7043]">
                        <textarea
                          ref={inputRef}
                          id="seo-prompt"
                          className="w-full p-4 bg-white text-gray-900 resize-none focus:outline-none"
                          rows={4}
                          placeholder="Describe the SEO tool you want to build..."
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          onFocus={() => setShowSuggestions(true)}
                          disabled={isPlanGenerating || isGenerating}
                        />
                        <div className="flex items-center justify-between px-4 py-3 border-t-2 border-black">
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              className="p-1 rounded-full text-gray-600 hover:text-gray-900 flex items-center"
                              onClick={() => setShowSuggestions(!showSuggestions)}
                            >
                              <Wand2 className="h-5 w-5 mr-1" />
                              <span className="text-sm hidden sm:inline">Examples</span>
                            </button>
                            <button
                              type="button"
                              className="p-1 rounded-full text-gray-600 hover:text-gray-900 flex items-center"
                            >
                              <Paperclip className="h-5 w-5 mr-1" />
                              <span className="text-sm hidden sm:inline">Attach</span>
                            </button>
                          </div>
                          <button
                            type="submit"
                            disabled={isPlanGenerating || isGenerating || !prompt.trim()}
                            className="bg-[#FF7043] text-white px-6 py-2 rounded-md hover:bg-[#F4511E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border-2 border-black font-medium"
                          >
                            {isPlanGenerating ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Planning...
                              </>
                            ) : (
                              <>
                                Generate Tool
                                <Sparkles className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {showSuggestions && (
                        <div ref={suggestionsRef} className="relative mt-3">
                          <PromptSuggestions onSuggestionClick={handleSuggestionClick} />
                        </div>
                      )}
                    </div>
                  </form>

                  {error && (
                    <div className="mt-6 p-4 border-2 border-red-300 rounded-md bg-red-50 text-red-600">{error}</div>
                  )}
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-3">
                  {toolSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion.prompt)}
                      className="relative cursor-pointer transform hover:-translate-y-1 transition-transform"
                    >
                      <div className="absolute inset-0 bg-black rounded-full transform translate-x-1 translate-y-1"></div>
                      <div className="relative z-10 flex items-center px-4 py-2 bg-white hover:bg-gray-50 rounded-full text-sm text-gray-800 transition-colors border-2 border-black">
                        <div
                          className="w-5 h-5 rounded-full mr-2 flex items-center justify-center border border-black"
                          style={{ backgroundColor: suggestion.color }}
                        >
                          {suggestion.icon}
                        </div>
                        {suggestion.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {history.length > 0 && (
              <div className="w-full max-w-3xl mx-auto px-4 py-8 mb-12">
                <div className="relative">
                  {/* Black background for 3D effect */}
                  <div className="absolute inset-0 bg-black rounded-xl transform translate-x-3 translate-y-3"></div>
                  <div className="relative z-10 bg-white p-6 rounded-xl border-4 border-black">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#E3F2FD] rounded-lg flex items-center justify-center mr-3 border-2 border-black">
                          <HistoryIcon className="h-5 w-5 text-[#1E88E5]" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Recent Tools</h2>
                      </div>
                      <button
                        onClick={clearHistory}
                        className="text-sm text-red-500 hover:text-red-700 px-3 py-1 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
                      >
                        Clear History
                      </button>
                    </div>
                    <div className="space-y-3">
                      <ToolHistory history={history} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <footer className="w-full py-8 text-center border-t-2 border-black">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-center gap-6 mb-6">
                  <div className="flex items-center bg-white px-4 py-2 rounded-full border-2 border-black">
                    <Zap className="h-5 w-5 text-[#FF7043] mr-2" />
                    <span className="text-sm font-medium">AI-powered tools</span>
                  </div>
                  <div className="flex items-center bg-white px-4 py-2 rounded-full border-2 border-black">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2" />
                    <span className="text-sm font-medium">Free plan available</span>
                  </div>
                  <div className="flex items-center bg-white px-4 py-2 rounded-full border-2 border-black">
                    <MousePointer className="h-5 w-5 text-[#26A69A] mr-2" />
                    <span className="text-sm font-medium">No coding required</span>
                  </div>
                </div>
                <p className="text-gray-700">
                  AI-Powered SEO Tool Generator &copy; {new Date().getFullYear()} &middot; All rights reserved
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plan Modal */}
      <PlanModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        plan={generationPlan || { title: "", description: "", features: [], toolType: "" }}
        onConfirm={handleConfirmPlan}
        isLoading={isGenerating}
      />

      {/* Build Visualization */}
      <BuildVisualization
        isOpen={showBuildVisualization}
        toolConfig={generationPlan?.toolConfig}
        additionalFeatures={selectedFeatures}
        onComplete={handleBuildComplete}
      />
    </div>
  )
}

// Custom icons components to match the design
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
  )
}

function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  )
}

function ShoppingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
      <path d="M3 6h18"></path>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  )
}

function HistoryIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
      <path d="M3 3v5h5"></path>
      <path d="M12 7v5l4 2"></path>
    </svg>
  )
}
