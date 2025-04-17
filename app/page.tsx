"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Sparkles,
  Loader2,
  ChevronDown,
  ChevronUp,
  BarChart,
  FileText,
  Share2,
  MapPin,
  ShoppingBag,
} from "lucide-react"
import { PromptSuggestions } from "@/components/prompt-suggestions"
import { ToolHistory } from "@/components/tool-history"
import { useRouter } from "next/navigation"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<any[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!prompt.trim()) return

    setIsGenerating(true)
    setError(null)

    try {
      // First, generate the tool configuration based on the prompt
      const configResponse = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })

      if (!configResponse.ok) {
        throw new Error("Failed to generate SEO tool configuration")
      }

      const configData = await configResponse.json()

      if (configData.error) {
        throw new Error(configData.error)
      }

      // Create a unique ID for this tool
      const toolId = Date.now().toString()

      // Add to history
      const newHistoryItem = {
        id: toolId,
        prompt: prompt.trim(),
        date: new Date().toISOString(),
        toolConfig: configData.toolConfig,
      }

      // Update history in localStorage
      const updatedHistory = [newHistoryItem, ...history.slice(0, 9)]
      setHistory(updatedHistory)
      localStorage.setItem("seoToolHistory", JSON.stringify(updatedHistory))

      // Navigate to the dedicated tool page
      router.push(`/c/${toolId}`)
    } catch (err: any) {
      console.error("Error generating SEO tool:", err)
      setError(err.message || "Failed to generate SEO tool. Please try again.")
      setIsGenerating(false)
    }
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

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold flex items-center">
            <Sparkles className="mr-2 h-6 w-6" />
            AI-Powered SEO Tool Generator
          </h1>
          <p className="mt-2 text-purple-100 max-w-2xl">
            Describe the SEO tool you need, and our AI will generate it for you. Create keyword research tools, content
            optimizers, meta tag generators, and more!
          </p>
        </div>
      </header>

      <div className="container mx-auto p-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden sticky top-6">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Tool History</h2>

                {history.length > 0 ? (
                  <>
                    <div className="mb-4">
                      <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="flex items-center justify-between w-full p-2 bg-purple-50 dark:bg-purple-900/20 rounded-md text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                      >
                        <span className="font-medium">Recent Tools</span>
                        {showHistory ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>

                    <AnimatePresence>
                      {showHistory && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="max-h-[400px] overflow-y-auto pr-2 -mr-2">
                            <ToolHistory history={history} />
                          </div>

                          {history.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                              <button
                                onClick={clearHistory}
                                className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                              >
                                Clear History
                              </button>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Your generated tools will appear here.</p>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Generate Your SEO Tool</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Describe the SEO tool you need, and our AI will create it for you. Be specific about what you want the
                  tool to do.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <div className="flex items-center border-b border-gray-300 dark:border-gray-600 pb-2 mb-2">
                      <Search className="h-5 w-5 text-gray-400 mr-2" />
                      <label htmlFor="seo-prompt" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Describe your SEO tool
                      </label>
                    </div>

                    <textarea
                      ref={inputRef}
                      id="seo-prompt"
                      className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      rows={3}
                      placeholder="E.g., Create a keyword research tool for blog posts about sustainable living"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      disabled={isGenerating}
                    />

                    {showSuggestions && (
                      <div ref={suggestionsRef} className="relative">
                        <PromptSuggestions onSuggestionClick={handleSuggestionClick} />
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isGenerating || !prompt.trim()}
                    className="flex items-center justify-center py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating SEO Tool...
                      </>
                    ) : (
                      <>
                        Generate SEO Tool
                        <Sparkles className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>

                {error && (
                  <div className="mt-4 p-4 border border-red-200 rounded-md bg-red-50 dark:bg-red-900/20 dark:border-red-800 text-red-600 dark:text-red-300">
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Featured Tools Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Featured SEO Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Keyword Research Tool",
                      description: "Discover relevant keywords for your specific content",
                      icon: "BarChart",
                      color: "blue",
                      prompt: "Create a keyword research tool for blog posts about digital marketing",
                    },
                    {
                      title: "Blog SEO Optimizer",
                      description: "Optimize your blog content with tailored recommendations",
                      icon: "FileText",
                      color: "purple",
                      prompt: "Build a blog post SEO analyzer that suggests improvements",
                    },
                    {
                      title: "Meta Tag Generator",
                      description: "Create optimized meta tags based on your exact content",
                      icon: "Share2",
                      color: "green",
                      prompt: "Generate a meta tag creator for local business websites",
                    },
                    {
                      title: "Local SEO Assistant",
                      description: "Improve your local search presence with location-specific tips",
                      icon: "MapPin",
                      color: "orange",
                      prompt: "Build a local SEO tool for restaurants that helps with Google Business Profile",
                    },
                    {
                      title: "E-commerce SEO Tool",
                      description: "Optimize product pages with product-specific recommendations",
                      icon: "ShoppingBag",
                      color: "red",
                      prompt: "Create an SEO content optimizer for e-commerce product descriptions",
                    },
                    {
                      title: "Custom SEO Tool",
                      description: "Create your own specialized SEO tool with specific requirements",
                      icon: "Sparkles",
                      color: "purple",
                      prompt: "",
                    },
                  ].map((tool, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className={`p-4 rounded-lg border border-${tool.color}-200 dark:border-${tool.color}-800 bg-${tool.color}-50 dark:bg-${tool.color}-900/20 cursor-pointer`}
                      onClick={() => {
                        if (tool.prompt) {
                          setPrompt(tool.prompt)
                          if (inputRef.current) {
                            inputRef.current.focus()
                          }
                        }
                      }}
                    >
                      <div
                        className={`h-10 w-10 rounded-full bg-${tool.color}-100 dark:bg-${tool.color}-900/30 flex items-center justify-center mb-3`}
                      >
                        <span className={`text-${tool.color}-600 dark:text-${tool.color}-400`}>
                          {tool.icon === "BarChart" && <BarChart className="h-5 w-5" />}
                          {tool.icon === "FileText" && <FileText className="h-5 w-5" />}
                          {tool.icon === "Share2" && <Share2 className="h-5 w-5" />}
                          {tool.icon === "MapPin" && <MapPin className="h-5 w-5" />}
                          {tool.icon === "ShoppingBag" && <ShoppingBag className="h-5 w-5" />}
                          {tool.icon === "Sparkles" && <Sparkles className="h-5 w-5" />}
                        </span>
                      </div>
                      <h3 className={`text-lg font-medium text-${tool.color}-700 dark:text-${tool.color}-300 mb-1`}>
                        {tool.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white p-6 mt-8">
        <div className="container mx-auto text-center">
          <p>AI-Powered SEO Tool Generator &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </main>
  )
}
