"use client"

import { useState } from "react"
import { Check, Sparkles, Palette, Loader2, Code, Layout, Terminal } from "lucide-react"

interface TemplateSelectorProps {
  onSelectTemplate: (template: string, customPrompt?: string) => void
  isLoading: boolean
}

export function TemplateSelector({ onSelectTemplate, isLoading }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [customPrompt, setCustomPrompt] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)

  const handleSelectTemplate = (template: string) => {
    setSelectedTemplate(template)
    setShowCustomInput(template === "custom")

    if (template !== "custom") {
      onSelectTemplate(template)
    }
  }

  const handleSubmitCustom = () => {
    if (customPrompt.trim()) {
      onSelectTemplate("custom", customPrompt)
    }
  }

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-2">Choose a UI Template</h2>
        <p className="text-gray-400">Select a pre-designed template or create a custom UI with AI</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Modern Template */}
          <div
            className={`relative cursor-pointer transform transition-all duration-200 ${
              selectedTemplate === "modern" ? "scale-105 ring-2 ring-blue-500" : "hover:scale-105"
            }`}
            onClick={() => handleSelectTemplate("modern")}
          >
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="h-40 bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                <div className="text-white font-bold text-xl">Modern</div>
              </div>
              <div className="p-4 bg-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-white">Clean & Professional</div>
                  {selectedTemplate === "modern" && (
                    <div className="bg-blue-500 text-white p-1 rounded-full">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-400">Sleek design with modern colors and clean layout</div>
              </div>
            </div>
          </div>

          {/* Playful Template */}
          <div
            className={`relative cursor-pointer transform transition-all duration-200 ${
              selectedTemplate === "playful" ? "scale-105 ring-2 ring-pink-500" : "hover:scale-105"
            }`}
            onClick={() => handleSelectTemplate("playful")}
          >
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-pink-500 transition-colors">
              <div className="h-40 bg-gradient-to-r from-pink-600 to-pink-400 flex items-center justify-center">
                <div className="text-white font-bold text-xl">Playful</div>
              </div>
              <div className="p-4 bg-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-white">Fun & Engaging</div>
                  {selectedTemplate === "playful" && (
                    <div className="bg-pink-500 text-white p-1 rounded-full">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-400">Vibrant colors with playful elements and rounded shapes</div>
              </div>
            </div>
          </div>

          {/* Custom AI Template */}
          <div
            className={`relative cursor-pointer transform transition-all duration-200 ${
              selectedTemplate === "custom" ? "scale-105 ring-2 ring-purple-500" : "hover:scale-105"
            }`}
            onClick={() => handleSelectTemplate("custom")}
          >
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors">
              <div className="h-40 bg-gradient-to-r from-purple-600 to-purple-400 flex items-center justify-center">
                <div className="text-white font-bold text-xl">Custom AI</div>
              </div>
              <div className="p-4 bg-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-white">AI-Generated</div>
                  {selectedTemplate === "custom" && (
                    <div className="bg-purple-500 text-white p-1 rounded-full">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-400">Describe your ideal UI and let AI create it for you</div>
              </div>
            </div>
          </div>
        </div>

        {showCustomInput && (
          <div className="mb-6 bg-gray-800 p-6 rounded-xl border border-gray-700">
            <label className="block text-sm font-medium mb-2 text-gray-300">Describe your ideal UI</label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="E.g., A dark theme UI with neon accents, rounded corners, and a minimalist layout..."
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              rows={4}
            />
            <div className="mt-2 text-sm text-gray-400 flex items-center">
              <Sparkles className="h-4 w-4 mr-1 text-purple-400" />
              <span>Be specific about colors, layout, and style preferences</span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 p-3 rounded-md border border-gray-700 flex items-center">
                <Palette className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-sm text-gray-300">Specify color schemes</span>
              </div>
              <div className="bg-gray-900 p-3 rounded-md border border-gray-700 flex items-center">
                <Layout className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-sm text-gray-300">Describe layout preferences</span>
              </div>
              <div className="bg-gray-900 p-3 rounded-md border border-gray-700 flex items-center">
                <Terminal className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-sm text-gray-300">Mention interactive elements</span>
              </div>
            </div>
          </div>
        )}

        {showCustomInput && (
          <div className="flex justify-end">
            <button
              onClick={handleSubmitCustom}
              disabled={!customPrompt.trim() || isLoading}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Code className="mr-2 h-5 w-5" />
                  Generate UI
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
