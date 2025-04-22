"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { SeoToolRenderer } from "@/components/seo-tool-renderer"
import { Loader2 } from "lucide-react"

export default function ToolPage() {
  const params = useParams()
  const [toolConfig, setToolConfig] = useState<any>(null)
  const [customizations, setCustomizations] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTool = async () => {
      try {
        const id = params.id

        if (!id) {
          throw new Error("Tool ID not found")
        }

        // Load tool configuration and customizations from localStorage
        const savedCustomizations = localStorage.getItem(`tool_${id}_customizations`)

        if (!savedCustomizations) {
          throw new Error("Tool configuration not found")
        }

        // Find the tool in history
        const historyString = localStorage.getItem("seoToolHistory")

        if (!historyString) {
          throw new Error("Tool history not found")
        }

        const history = JSON.parse(historyString)
        const tool = history.find((item: any) => item.id === id)

        if (!tool) {
          throw new Error("Tool not found in history")
        }

        // Parse the customizations and log for debugging
        const parsedCustomizations = JSON.parse(savedCustomizations)
        console.log("Loaded tool customizations:", parsedCustomizations)

        // Ensure the customizations have the expected structure
        if (!parsedCustomizations.branding) {
          parsedCustomizations.branding = {
            primaryColor: "#3B82F6",
            secondaryColor: "#60A5FA",
            accentColor: "#DBEAFE",
            fontFamily: "Inter, sans-serif",
            borderRadius: "rounded-md",
            brandName: tool.toolConfig?.title || "SEO Tool",
          }
        }

        if (!parsedCustomizations.content) {
          parsedCustomizations.content = {
            toneOfVoice: "formal",
          }
        }

        // Ensure uiTemplate is set
        if (!parsedCustomizations.uiTemplate) {
          parsedCustomizations.uiTemplate = "modern"
        }

        setToolConfig(tool.toolConfig)
        setCustomizations(parsedCustomizations)
      } catch (err: any) {
        console.error("Error loading tool:", err)
        setError(err.message || "Failed to load tool")
      } finally {
        setIsLoading(false)
      }
    }

    loadTool()
  }, [params.id])

  const handleUpdateCustomizations = (newCustomizations: any) => {
    setCustomizations(newCustomizations)
    localStorage.setItem(`tool_${params.id}_customizations`, JSON.stringify(newCustomizations))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-500" />
          <p className="text-gray-600">Loading SEO tool...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg border-2 border-red-300">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <a
            href="/"
            className="block w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white text-center rounded-md transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <SeoToolRenderer
      config={toolConfig}
      customizations={customizations}
      onUpdateCustomizations={handleUpdateCustomizations}
      onGoBack={() => (window.location.href = "/")}
    />
  )
}
