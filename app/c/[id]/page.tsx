"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { SeoToolRenderer } from "@/components/seo-tool-renderer"
import { Loader2, ArrowLeft, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function ToolPage() {
  const params = useParams()
  const router = useRouter()
  const [toolConfig, setToolConfig] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [prompt, setPrompt] = useState<string | null>(null)

  useEffect(() => {
    const id = params.id as string
    if (!id) {
      setError("Invalid tool ID")
      setLoading(false)
      return
    }

    // Retrieve tool configuration from localStorage
    try {
      const savedHistory = localStorage.getItem("seoToolHistory")
      if (savedHistory) {
        const history = JSON.parse(savedHistory)
        const tool = history.find((item: any) => item.id === id)

        if (tool) {
          setToolConfig(tool.toolConfig)
          // Also store the current prompt for this tool
          localStorage.setItem("currentToolPrompt", tool.prompt)
          setPrompt(tool.prompt)
        } else {
          setError("Tool not found")
        }
      } else {
        setError("No tools found")
      }
    } catch (e) {
      console.error("Failed to load tool:", e)
      setError("Failed to load tool configuration")
    } finally {
      setLoading(false)
    }
  }, [params.id])

  const shareUrl = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 dark:text-purple-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">Loading SEO Tool...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <div className="text-red-500 dark:text-red-400 text-5xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Tool Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Generator
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={shareUrl}
            className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-300 transition-colors"
          >
            {copied ? (
              <>
                <span className="text-green-600 dark:text-green-400">URL Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 mr-2" />
                Share Tool
              </>
            )}
          </motion.button>
        </div>
      </header>

      <main className="container mx-auto p-6 flex-1">
        {prompt && (
          <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Original Prompt:</h3>
            <p className="text-gray-600 dark:text-gray-400">{prompt}</p>
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
        >
          {toolConfig && <SeoToolRenderer config={toolConfig} />}
        </motion.div>
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center text-sm">
          <p>AI-Powered SEO Tool Generator &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}
