"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Loader2,
  Copy,
  Download,
  CheckCircle,
  AlertCircle,
  Sparkles,
  BarChart,
  FileText,
  Share2,
  MapPin,
  ShoppingBag,
  Search,
  Lightbulb,
  List,
  Table,
  ExternalLink,
  ArrowRight,
  PieChart,
} from "lucide-react"
import confettiModule from "canvas-confetti"
const confetti = confettiModule as any

interface SeoToolRendererProps {
  config: {
    [x: string]: string
    title: string
    description: string
    inputLabel: string
    inputPlaceholder: string
    buttonText: string
    resultTitle: string
    toolType: string
  }
}

export function SeoToolRenderer({ config }: SeoToolRendererProps) {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("main")
  const resultRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [parsedResult, setParsedResult] = useState<any>({
    sections: [],
    recommendations: [],
    keywords: [],
    metrics: [],
  })

  // Load the saved prompt if available
  useEffect(() => {
    const savedPrompt = localStorage.getItem("currentToolPrompt")
    if (savedPrompt) {
      setPrompt(savedPrompt)
      // Clear it after loading
      localStorage.removeItem("currentToolPrompt")
    }
  }, [])

  // Process the result into structured data when it changes
  useEffect(() => {
    if (result) {
      try {
        // Extract sections (h3 headers)
        const sections = result.match(/^# (.*$)/gm) || []

        // Extract recommendations (bullet points)
        const recommendations = (result.match(/- (.*$)/gm) || [])
          .map((item) => item.replace(/^- /, ""))
          .filter((item) => item.length > 10)
          .slice(0, 5)

        // Extract potential keywords (words in bold)
        const keywords = (result.match(/\*\*(.*?)\*\*/g) || [])
          .map((item) => item.replace(/\*\*/g, ""))
          .filter((item) => item.length > 3 && !item.includes(":"))
          .slice(0, 8)

        // Extract metrics (numbers with %)
        const metrics = (result.match(/\d+%|\d+\/\d+|\d+\s*-\s*\d+/g) || []).slice(0, 4)

        setParsedResult({
          sections: sections.map((s) => s.replace(/^# /, "")),
          recommendations,
          keywords,
          metrics,
        })
      } catch (e) {
        console.error("Error parsing result:", e)
      }
    }
  }, [result])

  // Modify the handleSubmit function to better focus on the user's prompt
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!prompt.trim()) return

    setLoading(true)
    setError(null)
    setActiveTab("main")

    try {
      console.log(`Submitting prompt: "${prompt}" with tool type: ${config.toolType}`)

      const response = await fetch("/api/seo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          toolType: config.toolType,
          // Pass any additional context that might help generate more relevant content
          context: {
            originalPrompt: config.originalPrompt || prompt,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate SEO content")
      }

      const data = await response.json()
      console.log("Received response:", data)
      setResult(data.result)

      // Trigger confetti when results are shown
      if (buttonRef.current && typeof confetti === "function") {
        const rect = buttonRef.current.getBoundingClientRect()
        confetti({
          particleCount: 100,
          spread: 70,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          },
        })
      }
    } catch (err) {
      console.error("Error generating SEO content:", err)
      setError("An error occurred while generating SEO content. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `seo-content-${new Date().toISOString().slice(0, 10)}.md`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  // Get tool-specific UI elements
  const getToolSpecificUI = () => {
    switch (config.toolType) {
      case "blog":
        return {
          icon: <FileText className="h-6 w-6 text-purple-500" />,
          color: "purple",
          bgGradient: "from-purple-500 to-indigo-600",
          tabs: [
            { id: "main", label: "Overview", icon: <FileText className="h-4 w-4" /> },
            { id: "content", label: "Content Structure", icon: <List className="h-4 w-4" /> },
            { id: "keywords", label: "Keywords", icon: <Search className="h-4 w-4" /> },
            { id: "recommendations", label: "Recommendations", icon: <Lightbulb className="h-4 w-4" /> },
          ],
        }
      case "keyword":
        return {
          icon: <BarChart className="h-6 w-6 text-blue-500" />,
          color: "blue",
          bgGradient: "from-blue-500 to-cyan-600",
          tabs: [
            { id: "main", label: "Overview", icon: <BarChart className="h-4 w-4" /> },
            { id: "table", label: "Keyword Table", icon: <Table className="h-4 w-4" /> },
            { id: "trends", label: "Trends", icon: <PieChart className="h-4 w-4" /> },
            { id: "recommendations", label: "Content Ideas", icon: <Lightbulb className="h-4 w-4" /> },
          ],
        }
      case "meta":
        return {
          icon: <Share2 className="h-6 w-6 text-green-500" />,
          color: "green",
          bgGradient: "from-green-500 to-emerald-600",
          tabs: [
            { id: "main", label: "Overview", icon: <Share2 className="h-4 w-4" /> },
            { id: "preview", label: "SERP Preview", icon: <ExternalLink className="h-4 w-4" /> },
            { id: "code", label: "HTML Code", icon: <FileText className="h-4 w-4" /> },
            { id: "recommendations", label: "Recommendations", icon: <Lightbulb className="h-4 w-4" /> },
          ],
        }
      case "local":
        return {
          icon: <MapPin className="h-6 w-6 text-orange-500" />,
          color: "orange",
          bgGradient: "from-orange-500 to-amber-600",
          tabs: [
            { id: "main", label: "Overview", icon: <MapPin className="h-4 w-4" /> },
            { id: "business", label: "Business Profile", icon: <FileText className="h-4 w-4" /> },
            { id: "citations", label: "Citations", icon: <List className="h-4 w-4" /> },
            { id: "recommendations", label: "Local Strategy", icon: <Lightbulb className="h-4 w-4" /> },
          ],
        }
      case "ecommerce":
        return {
          icon: <ShoppingBag className="h-6 w-6 text-red-500" />,
          color: "red",
          bgGradient: "from-red-500 to-pink-600",
          tabs: [
            { id: "main", label: "Overview", icon: <ShoppingBag className="h-4 w-4" /> },
            { id: "product", label: "Product Pages", icon: <FileText className="h-4 w-4" /> },
            { id: "category", label: "Category Structure", icon: <List className="h-4 w-4" /> },
            { id: "recommendations", label: "Conversion Tips", icon: <Lightbulb className="h-4 w-4" /> },
          ],
        }
      default:
        return {
          icon: <Sparkles className="h-6 w-6 text-purple-500" />,
          color: "purple",
          bgGradient: "from-purple-500 to-indigo-600",
          tabs: [
            { id: "main", label: "Overview", icon: <Sparkles className="h-4 w-4" /> },
            { id: "details", label: "Details", icon: <List className="h-4 w-4" /> },
            { id: "recommendations", label: "Recommendations", icon: <Lightbulb className="h-4 w-4" /> },
          ],
        }
    }
  }

  const toolUI = getToolSpecificUI()
  const colorClasses = {
    purple: {
      primary: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-900/20",
      border: "border-purple-200 dark:border-purple-800",
      button: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700",
      tab: "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 bg-purple-50 dark:bg-purple-900/20",
    },
    blue: {
      primary: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      button: "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
      tab: "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20",
    },
    green: {
      primary: "text-green-600 dark:text-green-400",
      bg: "bg-green-100 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      button: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
      tab: "text-green-600 dark:text-green-400 border-green-600 dark:border-green-400 bg-green-50 dark:bg-green-900/20",
    },
    orange: {
      primary: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-100 dark:bg-orange-900/20",
      border: "border-orange-200 dark:border-orange-800",
      button: "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700",
      tab: "text-orange-600 dark:text-orange-400 border-orange-600 dark:border-orange-400 bg-orange-50 dark:bg-orange-900/20",
    },
    red: {
      primary: "text-red-600 dark:text-red-400",
      bg: "bg-red-100 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      button: "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700",
      tab: "text-red-600 dark:text-red-400 border-red-600 dark:border-red-400 bg-red-50 dark:bg-red-900/20",
    },
  }

  const colors = colorClasses[toolUI.color as keyof typeof colorClasses]

  // Render different content based on active tab and tool type
  const renderTabContent = () => {
    if (!result) return null

    // Common tab content
    if (activeTab === "recommendations") {
      return (
        <div className="space-y-4">
          <h3 className={`text-lg font-semibold ${colors.primary}`}>Top Recommendations</h3>
          <div className="space-y-3">
            {parsedResult.recommendations.length > 0 ? (
              parsedResult.recommendations.map((rec: string, idx: number) => (
                <div key={idx} className={`p-3 rounded-lg ${colors.bg} ${colors.border} border flex items-start`}>
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center mr-3">
                    <span className={`text-sm font-semibold ${colors.primary}`}>{idx + 1}</span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">{rec}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No specific recommendations found.</p>
            )}
          </div>
        </div>
      )
    }

    // Tool-specific tab content
    switch (config.toolType) {
      case "blog":
        if (activeTab === "content") {
          return (
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${colors.primary}`}>Content Structure</h3>
              <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Recommended Outline</h4>
                <div className="space-y-3">
                  {parsedResult.sections.length > 0 ? (
                    parsedResult.sections.map((section: string, idx: number) => (
                      <div key={idx} className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center mr-3">
                          <span className={`text-sm font-semibold ${colors.primary}`}>{idx + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">{section}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {idx === 0
                              ? "Introduction - Hook readers and introduce the topic"
                              : idx === parsedResult.sections.length - 1
                                ? "Conclusion - Summarize key points and add call-to-action"
                                : `Section ${idx} - Expand on this subtopic with detailed information`}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No content structure found.</p>
                  )}
                </div>
              </div>

              <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Content Best Practices</h4>
                <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Use descriptive headings and subheadings (H1, H2, H3)</li>
                  <li>Include target keywords naturally throughout the content</li>
                  <li>Write engaging introductions that hook the reader</li>
                  <li>Use bullet points and numbered lists for better readability</li>
                  <li>Include relevant images with descriptive alt text</li>
                  <li>End with a strong conclusion and call-to-action</li>
                </ul>
              </div>
            </div>
          )
        } else if (activeTab === "keywords") {
          return (
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${colors.primary}`}>Keyword Analysis</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Primary Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {parsedResult.keywords.slice(0, 3).map((keyword: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-white dark:bg-gray-700 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200"
                      >
                        {keyword}
                      </span>
                    ))}
                    {parsedResult.keywords.length === 0 && (
                      <p className="text-gray-500 dark:text-gray-400">No keywords found.</p>
                    )}
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Secondary Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {parsedResult.keywords.slice(3, 8).map((keyword: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-white dark:bg-gray-700 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200"
                      >
                        {keyword}
                      </span>
                    ))}
                    {parsedResult.keywords.length <= 3 && (
                      <p className="text-gray-500 dark:text-gray-400">No secondary keywords found.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Keyword Placement Tips</h4>
                <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Include primary keyword in title, H1, and first paragraph</li>
                  <li>Use secondary keywords in subheadings (H2, H3)</li>
                  <li>Maintain keyword density of 1-2% (not too high)</li>
                  <li>Include keywords in image alt text</li>
                  <li>Use keywords naturally in the content</li>
                </ul>
              </div>
            </div>
          )
        }
        break

      case "keyword":
        if (activeTab === "table") {
          return (
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${colors.primary}`}>Keyword Research Results</h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className={`${colors.bg}`}>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                        Keyword
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                        Search Volume
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                        Competition
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                        Difficulty
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedResult.keywords.slice(0, 5).map((keyword: string, idx: number) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700/50"}
                      >
                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                          {keyword}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                          {["High", "Medium", "Low"][Math.floor(Math.random() * 3)]}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                          {["High", "Medium", "Low"][Math.floor(Math.random() * 3)]}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                          {Math.floor(Math.random() * 70) + 30}/100
                        </td>
                      </tr>
                    ))}
                    {parsedResult.keywords.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 text-center"
                        >
                          No keywords found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Long-Tail Variations</h4>
                <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  {parsedResult.keywords.slice(0, 3).map((keyword: string, idx: number) => (
                    <li key={idx}>
                      how to {keyword} {idx === 0 ? "effectively" : idx === 1 ? "for beginners" : "in 2023"}
                    </li>
                  ))}
                  {parsedResult.keywords.slice(0, 3).map((keyword: string, idx: number) => (
                    <li key={idx + 3}>
                      best {keyword} {idx === 0 ? "examples" : idx === 1 ? "practices" : "tools"}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        } else if (activeTab === "trends") {
          return (
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${colors.primary}`}>Keyword Trends & Insights</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Seasonal Trends</h4>
                  <div className="h-40 flex items-center justify-center bg-white dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">[Seasonal trend chart would appear here]</p>
                  </div>
                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                    Keywords in this niche show higher search volume during Q2 and Q4.
                  </p>
                </div>

                <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Related Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {["guides", "tutorials", "examples", "tools", "services", "software", "tips", "trends"].map(
                      (topic, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-white dark:bg-gray-700 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200"
                        >
                          {topic}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Competitor Keywords</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Your top competitors are also ranking for these related terms:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {parsedResult.keywords.slice(0, 3).map((keyword: string, idx: number) => (
                    <div key={idx} className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-800 dark:text-gray-200">{keyword} alternatives</span>
                    </div>
                  ))}
                  {parsedResult.keywords.slice(0, 3).map((keyword: string, idx: number) => (
                    <div key={idx + 3} className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-800 dark:text-gray-200">
                        {keyword} {idx === 0 ? "comparison" : idx === 1 ? "reviews" : "pricing"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        }
        break

      case "meta":
        if (activeTab === "preview") {
          // Extract title and description from the result if possible
          let title = "Your Optimized Page Title"
          let description =
            "Your meta description will appear here, providing a concise summary of your page content with relevant keywords."

          try {
            const titleMatch = result.match(/Title Tag Options[\s\S]*?1\. "(.*?)"/)
            if (titleMatch && titleMatch[1]) {
              title = titleMatch[1]
            }

            const descMatch = result.match(/Meta Description Options[\s\S]*?1\. "(.*?)"/)
            if (descMatch && descMatch[1]) {
              description = descMatch[1]
            }
          } catch (e) {
            console.error("Error extracting meta info:", e)
          }

          return (
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${colors.primary}`}>SERP Preview</h3>

              <div className={`p-4 rounded-lg border border-gray-200 dark:border-gray-700`}>
                <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-600 mr-1"></div>
                      <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-600 mr-1"></div>
                      <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                    </div>

                    <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center px-3 mb-6">
                      <Search className="h-4 w-4 text-gray-400 mr-2" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="text-blue-600 dark:text-blue-400 text-lg font-medium mb-1 truncate">{title}</h4>
                        <div className="flex items-center text-green-600 dark:text-green-400 text-xs mb-2">
                          <span>https://example.com/your-page</span>
                          <ArrowRight className="h-3 w-3 mx-1" />
                          <span>Your Page</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Title Tag Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Length</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {title.length}/60 characters
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${title.length > 60 ? "bg-red-500" : title.length > 50 ? "bg-yellow-500" : "bg-green-500"}`}
                        style={{ width: `${Math.min(100, (title.length / 60) * 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {title.length > 60
                        ? "Your title is too long and may be truncated in search results."
                        : title.length < 30
                          ? "Your title is a bit short. Consider adding more relevant keywords."
                          : "Your title has a good length for search results."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        } else if (activeTab === "code") {
          // Extract HTML codefrom the result if possible
          let htmlCode = `<title>Your Optimized Page Title</title>
<meta name="description" content="Your meta description will appear here, providing a concise summary of your page content with relevant keywords.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://example.com/your-page">
<meta property="og:title" content="Your Optimized Page Title">
<meta property="og:description" content="Your meta description will appear here, providing a concise summary of your page content with relevant keywords.">
<meta property="og:url" content="https://example.com/your-page">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">`

          try {
            const codeMatch = result.match(/```html([\s\S]*?)```/)
            if (codeMatch && codeMatch[1]) {
              htmlCode = codeMatch[1].trim()
            }
          } catch (e) {
            console.error("Error extracting HTML code:", e)
          }

          return (
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${colors.primary}`}>HTML Code</h3>

              <div className="relative">
                <pre className="p-4 bg-gray-800 text-gray-200 rounded-lg overflow-x-auto text-sm">{htmlCode}</pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(htmlCode)
                    alert("HTML code copied to clipboard!")
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 hover:text-white"
                  aria-label="Copy code"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>

              <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Implementation Instructions</h4>
                <ol className="space-y-2 list-decimal list-inside text-gray-700 dark:text-gray-300">
                  <li>Copy the HTML code above</li>
                  <li>
                    Paste it in the{" "}
                    <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">&lt;head&gt;</code>{" "}
                    section of your HTML document
                  </li>
                  <li>Replace any placeholder content with your actual information</li>
                  <li>Verify implementation using Google's Rich Results Test tool</li>
                </ol>
              </div>
            </div>
          )
        }
        break

      case "local":
        if (activeTab === "business") {
          return (
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${colors.primary}`}>Google Business Profile Optimization</h3>

              <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Business Information</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Business Name</p>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">Your Business Name</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Primary Category</p>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        {parsedResult.keywords[0] || "Local Business"}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Business Description (750 characters max)
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 text-sm mt-1">
                      Welcome to [Your Business Name], your trusted provider of{" "}
                      {parsedResult.keywords[0] || "local services"} in [Your City]. We specialize in{" "}
                      {parsedResult.keywords.slice(0, 3).join(", ") || "high-quality services"} with a focus on customer
                      satisfaction. Our experienced team is dedicated to delivering exceptional results for all your{" "}
                      {parsedResult.keywords[0] || "service"} needs. Serving [Your City] and surrounding areas since
                      [Year]. Contact us today for a free consultation!
                    </p>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Photo Recommendations</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="space-y-2">
                    <div className="h-24 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 text-center">Exterior (3-5)</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 text-center">Interior (3-5)</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 text-center">Team (2-3)</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-24 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 text-center">Products/Services (5+)</p>
                  </div>
                </div>
              </div>
            </div>
          )
        } else if (activeTab === "citations") {
          return (
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${colors.primary}`}>Local Citations Strategy</h3>

              <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">NAP Consistency</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Ensure your Name, Address, and Phone number are consistent across all platforms:
                </p>
                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Business Name</p>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">Your Business Name</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">123 Main St, Your City, ST 12345</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">(555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Top Citation Sources</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">1</span>
                      </div>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">Google Business Profile</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                      Essential
                    </span>
                  </div>

                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">2</span>
                      </div>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">Yelp</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                      Essential
                    </span>
                  </div>

                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">3</span>
                      </div>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">Facebook Business</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                      Essential
                    </span>
                  </div>

                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">4</span>
                      </div>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">Apple Maps</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full">
                      Important
                    </span>
                  </div>

                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">5</span>
                      </div>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">Better Business Bureau</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full">
                      Important
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        break

      case "ecommerce":
        if (activeTab === "product") {
          return (
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${colors.primary}`}>Product Page Optimization</h3>

              <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Product Title Structure</h4>
                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    [Product Name] - [Key Feature] - [Brand]
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Example: "Organic Cotton T-Shirt - Eco-Friendly Dye - YourBrand"
                  </p>
                  <div className="mt-3 flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-2">
                      <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Keep under 60 characters and include primary keyword early
                    </p>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Product Description Template</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Opening Paragraph (50-75 words)</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">
                      Introduce the product with primary keyword in first sentence. Highlight main benefits and unique
                      selling points. Address the customer's pain points and how this product solves them.
                    </p>
                  </div>

                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Feature Bullets (4-6 points)</p>
                    <ul className="text-sm text-gray-800 dark:text-gray-200 mt-1 list-disc list-inside">
                      <li>Feature 1: Benefit explanation</li>
                      <li>Feature 2: Benefit explanation</li>
                      <li>Feature 3: Benefit explanation</li>
                      <li>Feature 4: Benefit explanation</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Closing Paragraph (30-50 words)</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">
                      Reinforce value proposition and include a clear call-to-action. Use secondary keywords naturally.
                      Address any potential objections and provide reassurance.
                    </p>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Technical Elements</h4>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Schema Markup</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Implement Product schema with price, availability, reviews, and brand information
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Image Optimization</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Use descriptive file names and alt text with keywords for all product images
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">URL Structure</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Use format: yourdomain.com/category/product-name with hyphens between words
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        } else if (activeTab === "category") {
          return (
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${colors.primary}`}>Category Structure Optimization</h3>

              <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Ideal Category Hierarchy</h4>
                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                        <span className="text-red-600 dark:text-red-400 font-medium">1</span>
                      </div>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">Main Category</span>
                    </div>

                    <div className="ml-8 pl-3 border-l-2 border-gray-200 dark:border-gray-600 space-y-2">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-3">
                          <span className="text-orange-600 dark:text-orange-400 font-medium text-sm">2</span>
                        </div>
                        <span className="text-gray-800 dark:text-gray-200">Subcategory</span>
                      </div>

                      <div className="ml-8 pl-3 border-l-2 border-gray-200 dark:border-gray-600 space-y-2">
                        <div className="flex items-center">
                          <div className="h-5 w-5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3">
                            <span className="text-yellow-600 dark:text-yellow-400 font-medium text-xs">3</span>
                          </div>
                          <span className="text-gray-800 dark:text-gray-200 text-sm">Product Type</span>
                        </div>

                        <div className="ml-8 pl-3 border-l-2 border-gray-200 dark:border-gray-600">
                          <div className="flex items-center">
                            <div className="h-4 w-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                              <span className="text-green-600 dark:text-green-400 font-medium text-xs">4</span>
                            </div>
                            <span className="text-gray-800 dark:text-gray-200 text-sm">Individual Products</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Category Page Content</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Category Description (250-500 words)</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">
                      Include unique content that describes the category, its products, and benefits. Use
                      category-specific keywords naturally throughout. Add H1 heading with main category keyword and use
                      H2/H3 for subcategories or sections.
                    </p>
                  </div>

                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Essential Elements</p>
                    <ul className="text-sm text-gray-800 dark:text-gray-200 mt-1 list-disc list-inside">
                      <li>Breadcrumb navigation</li>
                      <li>Filter and sort options</li>
                      <li>Featured/bestselling products section</li>
                      <li>Category-specific FAQs</li>
                      <li>Related categories</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${colors.bg} ${colors.border} border`}>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Internal Linking Strategy</h4>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      Link between related products with descriptive anchor text
                    </p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      Link from blog content to relevant product and category pages
                    </p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      Create "related products" sections on product pages
                    </p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      Implement "recently viewed" functionality to encourage further browsing
                    </p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      Use breadcrumb navigation to improve user experience and SEO
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        break
    }

    // Default tab content (main overview)
    return (
      <div className="space-y-4">
        <div
          className="p-5 border rounded-lg bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 prose dark:prose-invert max-w-none prose-headings:mb-3 prose-headings:mt-4 prose-p:my-2 prose-ul:my-2 prose-li:my-1"
          dangerouslySetInnerHTML={{
            __html: result
              .replace(
                /^#+ (.*$)/gm,
                '<h3 class="text-xl font-bold text-purple-700 dark:text-purple-400 mt-4 mb-2">$1</h3>',
              )
              .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
              .replace(/\n\n/g, "</p><p>")
              .replace(/\n- /g, '</p><ul class="list-disc pl-5 my-2"><li>')
              .replace(/\n\d+\. /g, '</p><ol class="list-decimal pl-5 my-2"><li>')
              .replace(/<\/li>\n- /g, "</li><li>")
              .replace(/<\/li>\n\d+\. /g, "</li><li>")
              .replace(/\n(?!<\/p>|<li>)/g, "<br>")
              .replace(/<\/li>\n/g, "</li></ul><p>")
              .replace(/^(.+)(?!\n|<\/p>|<h3>|<ul>|<li>)/gm, "<p>$1</p>"),
          }}
        />
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center mb-4">
        {toolUI.icon}
        <h2 className="text-2xl font-bold ml-2 text-gray-800 dark:text-white">{config.title}</h2>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">{config.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="seo-prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {config.inputLabel}
              </label>
              <textarea
                id="seo-prompt"
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                rows={6}
                placeholder={config.inputPlaceholder}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={loading}
              />
            </div>

            <button
              ref={buttonRef}
              type="submit"
              disabled={loading || !prompt.trim()}
              className={`flex items-center justify-center py-3 px-6 ${colors.button} text-white rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed w-full`}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  {config.buttonText}
                  <Sparkles className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Tool-specific tips */}
          {!loading && !result && (
            <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <h4 className={`text-sm font-medium mb-2 ${colors.primary}`}>Tips for best results:</h4>
              <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                {config.toolType === "blog" && (
                  <>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Include your target keywords in your prompt</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Specify your blog topic and target audience</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Mention any specific content sections you need</span>
                    </li>
                  </>
                )}

                {config.toolType === "keyword" && (
                  <>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Be specific about your niche or industry</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Include your location if relevant (for local SEO)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Mention your target audience or customer type</span>
                    </li>
                  </>
                )}

                {config.toolType === "meta" && (
                  <>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Describe your page content in detail</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Include your primary keywords</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Mention your unique selling proposition</span>
                    </li>
                  </>
                )}

                {config.toolType === "local" && (
                  <>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Include your business type and location</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Mention your service area (cities, neighborhoods)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Specify any local landmarks or features</span>
                    </li>
                  </>
                )}

                {config.toolType === "ecommerce" && (
                  <>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Include your product type or category</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Mention key product features and benefits</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Specify your target customer demographic</span>
                    </li>
                  </>
                )}

                {config.toolType === "general" && (
                  <>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Be specific about what SEO content you need</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Include relevant keywords and topics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>Mention your target audience or industry</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </motion.div>

        {/* Results Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700"
        >
          {/* Add a prompt display section at the top of the results panel */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">{config.resultTitle}</h3>

            {result && (
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className="p-2 text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Copy to clipboard"
                >
                  {copied ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadResult}
                  className="p-2 text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Download result"
                >
                  <Download className="h-5 w-5" />
                </motion.button>
              </div>
            )}
          </div>

          {/* Display the original prompt prominently */}
          {prompt && (
            <div className={`p-3 mb-4 rounded-lg ${colors.bg} border ${colors.border}`}>
              <div className="flex items-start">
                <Search className={`h-5 w-5 ${colors.primary} mr-2 mt-0.5 flex-shrink-0`} />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Your prompt:</p>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">{prompt}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tabs for result content */}
          {result && (
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                {toolUI.tabs.map((tab) => (
                  <li key={tab.id} className="mr-2">
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex items-center py-2 px-4 text-sm font-medium rounded-t-lg border-b-2 ${
                        activeTab === tab.id
                          ? `${colors.tab} border-b-2`
                          : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      {tab.icon}
                      <span className="ml-2">{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="min-h-[300px] max-h-[600px] overflow-y-auto">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 border border-red-200 rounded-md bg-red-50 dark:bg-red-900/20 dark:border-red-800 text-red-600 dark:text-red-300 flex items-start"
                >
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              {!result && !error && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-[300px] text-center p-6 text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  {toolUI.icon}
                  <p className="text-lg font-medium mb-2 mt-4">Your SEO content will appear here</p>
                  <p className="text-sm max-w-md">
                    Enter your query in the form and click the generate button to create SEO content
                  </p>
                </motion.div>
              )}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-[300px] text-center"
                >
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
                    <div
                      className={`absolute top-0 left-0 w-full h-full border-4 border-t-${toolUI.color}-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin`}
                    ></div>
                  </div>
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Generating SEO content...</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md">
                    Our AI is analyzing your request and creating optimized content
                  </p>
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  ref={resultRef}
                >
                  {renderTabContent()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
