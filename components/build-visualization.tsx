"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Dialog } from "@headlessui/react"
import { Loader2, CheckCircle, XCircle, Code, Layers, Palette, Sparkles, Terminal, Zap } from 'lucide-react'
import { TemplateSelector } from "./template-selector"
import { motion } from "framer-motion"

export interface ToolCustomizations {
  branding: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    fontFamily: string
    borderRadius: string
    brandName: string
  }
  content: {
    toneOfVoice: string
  }
  uiTemplate: string
  customPrompt?: string
}

interface BuildVisualizationProps {
  isOpen: boolean
  toolConfig: any
  additionalFeatures: string[]
  onComplete: (customizations: ToolCustomizations) => void
}

export function BuildVisualization({ isOpen, toolConfig, additionalFeatures, onComplete }: BuildVisualizationProps) {
  const [progress, setProgress] = useState(0)
  const [isBuilding, setIsBuilding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [buildSteps, setBuildSteps] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [showTemplateSelector, setShowTemplateSelector] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [customPrompt, setCustomPrompt] = useState<string | null>(null)
  const [isGeneratingCustomUI, setIsGeneratingCustomUI] = useState(false)
  const [generatedCode, setGeneratedCode] = useState<string[]>([])
  const [showCodePreview, setShowCodePreview] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])
  const terminalRef = useRef<HTMLDivElement>(null)
  const [uiPreviewData, setUiPreviewData] = useState<any>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setShowTemplateSelector(true)
      setSelectedTemplate(null)
      setCustomPrompt(null)
      setIsBuilding(false)
      setProgress(0)
      setCurrentStep(0)
      setBuildSteps([])
      setGeneratedCode([])
      setTerminalOutput([])
      setUiPreviewData(null)
    }
  }, [isOpen])

  useEffect(() => {
    // Update progress based on current step
    if (buildSteps.length > 0) {
      setProgress((currentStep / buildSteps.length) * 100)
    }
  }, [currentStep, buildSteps])

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalOutput])

  const addTerminalOutput = (message: string) => {
    setTerminalOutput((prev) => [...prev, message])
  }

  const addCodeSnippet = (code: string) => {
    setGeneratedCode((prev) => [...prev, code])
  }

  const generatePreviewImage = (template: string, toolType: string, customPrompt?: string) => {
    // Generate different placeholder images based on template and tool type
    let imageQuery = ""

    if (template === "custom" && customPrompt) {
      // Use the custom prompt to generate a more specific image
      imageQuery = `UI design for ${toolType} tool: ${customPrompt.substring(0, 50)}`
    } else if (template === "modern") {
      imageQuery = `Modern professional UI design for ${toolType} tool with blue color scheme`
    } else if (template === "playful") {
      imageQuery = `Playful vibrant UI design for ${toolType} tool with pink color scheme`
    }

    // Use placeholder.svg to generate an image
    return `/placeholder.svg?height=300&width=500&query=${encodeURIComponent(imageQuery)}`
  }

  const handleSelectTemplate = async (template: string, prompt?: string) => {
    setSelectedTemplate(template)

    if (template === "custom" && prompt) {
      setCustomPrompt(prompt)
      setIsGeneratingCustomUI(true)
      setShowTemplateSelector(false)

      addTerminalOutput(`> Analyzing prompt: "${prompt.substring(0, 50)}${prompt.length > 50 ? "..." : ""}"`)
      await new Promise((resolve) => setTimeout(resolve, 800))
      addTerminalOutput("> Generating custom UI based on prompt...")
      await new Promise((resolve) => setTimeout(resolve, 1200))

      try {
        // Call API to generate custom UI based on prompt
        const response = await fetch("/api/generate-ui", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt, toolType: toolConfig?.toolType || "general" }),
        })

        if (!response.ok) {
          throw new Error(`Failed to generate custom UI: ${response.statusText}`)
        }

        const result = await response.json()

        // Log the API response for debugging
        console.log("API response for custom UI:", result)

        addTerminalOutput("> Custom UI design generated successfully")
        addTerminalOutput(`> Theme: ${result.customizations?.theme?.name || "Custom Theme"}`)
        addTerminalOutput(`> Primary color: ${result.customizations?.branding?.primaryColor || "#8B5CF6"}`)

        // Generate preview image for custom template
        const customPreviewImg = generatePreviewImage("custom", toolConfig?.toolType || "general", prompt)
        setPreviewImage(customPreviewImg)

        // Add a new terminal output line for the image
        addTerminalOutput("> Generating UI preview image...")

        // Generate some fake code snippets
        addCodeSnippet(`// Generated theme configuration
const theme = {
  primaryColor: "${result.customizations?.branding?.primaryColor || "#8B5CF6"}",
  secondaryColor: "${result.customizations?.branding?.secondaryColor || "#A78BFA"}",
  accentColor: "${result.customizations?.branding?.accentColor || "#EDE9FE"}",
  fontFamily: "${result.customizations?.branding?.fontFamily || "Space Grotesk, monospace"}",
  borderRadius: "${result.customizations?.branding?.borderRadius || "rounded-lg"}"
};`)

        // Set UI preview data
        setUiPreviewData({
          primaryColor: result.customizations?.branding?.primaryColor || "#8B5CF6",
          secondaryColor: result.customizations?.branding?.secondaryColor || "#A78BFA",
          accentColor: result.customizations?.branding?.accentColor || "#EDE9FE",
          fontFamily: result.customizations?.branding?.fontFamily || "Space Grotesk, monospace",
          borderRadius: result.customizations?.branding?.borderRadius || "rounded-lg",
          themeName: result.customizations?.theme?.name || "Custom Theme",
        })

        // Start building with custom UI
        setIsGeneratingCustomUI(false)

        // Ensure the customizations object has the expected structure
        const processedCustomizations = {
          branding: {
            primaryColor: result.customizations?.branding?.primaryColor || "#8B5CF6",
            secondaryColor: result.customizations?.branding?.secondaryColor || "#A78BFA",
            accentColor: result.customizations?.branding?.accentColor || "#EDE9FE",
            fontFamily: result.customizations?.branding?.fontFamily || "Space Grotesk, monospace",
            borderRadius: result.customizations?.branding?.borderRadius || "rounded-lg",
            brandName: result.customizations?.branding?.brandName || `${toolConfig?.title || "Custom"} Tool`,
          },
          theme: result.customizations?.theme || {
            name: "Custom Theme",
            description: "A custom theme generated based on your description"
          }
        }

        startBuilding(template, prompt, processedCustomizations)
      } catch (err: any) {
        console.error("Error generating custom UI:", err)
        setError(err.message || "Failed to generate custom UI. Please try again.")
        setIsGeneratingCustomUI(false)
        addTerminalOutput(`> Error: ${err.message || "Failed to generate custom UI"}`)

        // Fallback to default custom theme
        startBuilding(template, prompt)
      }
    } else {
      // Start building with selected template
      setShowTemplateSelector(false)

      // Set UI preview data for predefined templates
      if (template === "modern") {
        const previewImg = generatePreviewImage("modern", toolConfig?.toolType || "general")
        setPreviewImage(previewImg)
        setUiPreviewData({
          primaryColor: "#3B82F6",
          secondaryColor: "#60A5FA",
          accentColor: "#DBEAFE",
          fontFamily: "Inter, sans-serif",
          borderRadius: "rounded-md",
          themeName: "Modern Professional",
        })
      } else if (template === "playful") {
        const previewImg = generatePreviewImage("playful", toolConfig?.toolType || "general")
        setPreviewImage(previewImg)
        setUiPreviewData({
          primaryColor: "#EC4899",
          secondaryColor: "#F472B6",
          accentColor: "#FCE7F3",
          fontFamily: "Poppins, sans-serif",
          borderRadius: "rounded-xl",
          themeName: "Playful Vibrant",
        })
      }

      startBuilding(template)
    }
  }

  // Enhance the startBuilding function to make it more responsive to the template and prompt
  const startBuilding = async (template: string, prompt?: string, customizations?: any) => {
    setIsBuilding(true)
    setError(null)

    try {
      // Generate build steps based on tool config, template, and additional features
      const steps = ["Initializing project"]

      // Add template-specific step
      if (template === "custom") {
        steps.push("Analyzing custom UI requirements from prompt")
        steps.push("Generating AI-designed interface based on specifications")
        steps.push("Optimizing custom components for tool functionality")
        steps.push("Implementing advanced UI interactions")
      } else {
        steps.push(`Applying ${template} template`)
        steps.push("Configuring template components")
        steps.push("Optimizing template for tool type")
      }

      // Add steps for each additional feature
      additionalFeatures.forEach((feature) => {
        steps.push(`Adding feature: ${feature}`)
      })

      // Add tool-specific steps based on toolConfig
      if (toolConfig?.toolType) {
        steps.push(`Optimizing UI for ${toolConfig.toolType} functionality`)
        steps.push(`Implementing specialized ${toolConfig.toolType} components`)
      }

      // Add final steps
      steps.push("Optimizing performance")
      steps.push("Implementing responsive design")
      steps.push("Finalizing UI components")
      steps.push("Preparing deployment")

      setBuildSteps(steps)

      // Add initial terminal output
      addTerminalOutput(`> Starting build process for ${toolConfig?.title || "Universal Tool"}`)
      addTerminalOutput(
        `> Template: ${template === "custom" ? "Custom AI-Generated" : template === "modern" ? "Modern Professional" : "Playful Vibrant"}`,
      )

      if (prompt) {
        addTerminalOutput(`> Custom UI prompt: "${prompt.substring(0, 50)}${prompt.length > 50 ? "..." : ""}"`)
      }

      // Process each step with a delay to simulate building
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i)

        // Add terminal output for current step
        addTerminalOutput(`> ${steps[i]}...`)

        // Add more detailed code snippets based on the step and tool type
        if (i === 1) {
          if (template === "custom") {
            addCodeSnippet(`// Applying custom UI theme based on prompt analysis
import { createTheme } from '@/lib/theme';

// Custom theme generated from prompt: "${prompt?.substring(0, 30)}${prompt && prompt.length > 30 ? "..." : ""}"
export const customTheme = createTheme({
  primary: "${customizations?.branding?.primaryColor || "#8B5CF6"}",
  accent: "${customizations?.branding?.accentColor || "#EDE9FE"}",
  font: "${customizations?.branding?.fontFamily || "Space Grotesk, monospace"}",
  radius: "${customizations?.branding?.borderRadius || "rounded-lg"}",
  // Advanced properties derived from prompt analysis
  elevation: "layered",
  animation: "subtle",
  density: "comfortable"
});`)
          } else {
            addCodeSnippet(`// Applying ${template} template with optimizations for ${toolConfig?.toolType || "universal"} tool
import { ${template}Theme } from '@/themes';

// Customize theme for specific tool type
export const theme = {
  ...${template}Theme,
  components: {
    ...${template}Theme.components,
    // Tool-specific component overrides
    results: {
      variant: "${toolConfig?.toolType || "standard"}",
      density: "high",
      animations: true
    }
  }
};`)
          }
        }

        // Add tool-specific code if we're at that step
        if (steps[i].includes("specialized") && toolConfig?.toolType) {
          addCodeSnippet(`// Specialized components for ${toolConfig.toolType} tool
import { createToolComponents } from '@/lib/components';

export const ${toolConfig.toolType}Components = createToolComponents({
  toolType: "${toolConfig.toolType}",
  features: ${JSON.stringify(additionalFeatures)},
  layout: "${template === 'custom' ? 'custom' : template}",
  // Advanced configuration
  dataVisualization: true,
  interactiveElements: true,
  responsiveLayouts: ["mobile", "tablet", "desktop"]
});`)
        }

        // Add feature-specific code
        if (i >= 3 && i < 3 + additionalFeatures.length) {
          const featureIndex = i - 3
          if (featureIndex < additionalFeatures.length) {
            const feature = additionalFeatures[featureIndex]
            const featureSlug = feature.replace(/\s+/g, "")
            addCodeSnippet(`// Adding feature: ${feature}
import { ${featureSlug}Component } from '@/components/features';

export function setup${featureSlug}() {
  // Feature configuration
  return {
    enabled: true,
    config: {
      // Feature-specific settings
      priority: "high",
      position: "${featureIndex % 2 === 0 ? 'primary' : 'secondary'}",
      dataSource: "api",
      refreshInterval: 30000,
      visualization: "${featureIndex % 3 === 0 ? 'chart' : featureIndex % 3 === 1 ? 'table' : 'cards'}"
    }
  };
}`)
          }
        }

        // Wait between steps to simulate processing
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Add completion message for step
        addTerminalOutput(`> ${steps[i]} completed`)
      }

      // Generate customizations based on the tool type and selected template
      const finalCustomizations: ToolCustomizations = generateCustomizations(
        toolConfig?.toolType || "general",
        template,
        prompt,
        customizations,
      )

      // Complete the build process
      setIsBuilding(false)
      addTerminalOutput("> Build completed successfully!")
      addTerminalOutput(`> Tool "${toolConfig?.title || "Universal Tool"}" is ready for deployment`)
      addTerminalOutput("> All components optimized for maximum performance and usability")

      // Wait a moment before completing
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Call the completion handler with the customizations
      onComplete(finalCustomizations)
    } catch (err: any) {
      console.error("Error in build process:", err)
      setError(err.message || "Failed to build tool. Please try again.")
      setIsBuilding(false)
      addTerminalOutput(`> Error: ${err.message || "Failed to build tool"}`)
    }
  }

  // Generate customizations based on tool type and template
  const generateCustomizations = (
    toolType: string,
    template: string,
    prompt?: string,
    customUIData?: any,
  ): ToolCustomizations => {
    // Default customizations
    const baseCustomizations: ToolCustomizations = {
      branding: {
        primaryColor: "#3B82F6",
        secondaryColor: "#60A5FA",
        accentColor: "#DBEAFE",
        fontFamily: "Inter, sans-serif",
        borderRadius: "rounded-md",
        brandName: toolConfig?.title || "SEOCraft",
      },
      content: {
        toneOfVoice: "formal",
      },
      uiTemplate: template,
    }

    if (prompt) {
      baseCustomizations.customPrompt = prompt
    }

    // If we have custom UI data from the API, use it
    if (customUIData && template === "custom") {
      if (customUIData.branding) {
        baseCustomizations.branding = {
          ...baseCustomizations.branding,
          ...customUIData.branding,
        }
      }

      // Ensure the uiTemplate is still set to "custom"
      baseCustomizations.uiTemplate = "custom"

      // Log the customizations for debugging
      console.log("Applied custom UI customizations:", baseCustomizations)

      return baseCustomizations
    }

    // Apply template-specific customizations
    if (template === "modern") {
      baseCustomizations.branding.primaryColor = "#3B82F6"
      baseCustomizations.branding.secondaryColor = "#60A5FA"
      baseCustomizations.branding.accentColor = "#DBEAFE"
      baseCustomizations.branding.fontFamily = "Inter, sans-serif"
      baseCustomizations.branding.borderRadius = "rounded-md"
    } else if (template === "playful") {
      baseCustomizations.branding.primaryColor = "#EC4899"
      baseCustomizations.branding.secondaryColor = "#F472B6"
      baseCustomizations.branding.accentColor = "#FCE7F3"
      baseCustomizations.branding.fontFamily = "Poppins, sans-serif"
      baseCustomizations.branding.borderRadius = "rounded-xl"
    } else if (template === "custom") {
      // Custom template uses AI-generated values from the API
      // These are fallback values in case the API call fails
      baseCustomizations.branding.primaryColor = "#8B5CF6"
      baseCustomizations.branding.secondaryColor = "#A78BFA"
      baseCustomizations.branding.accentColor = "#EDE9FE"
      baseCustomizations.branding.fontFamily = "Space Grotesk, monospace"
      baseCustomizations.branding.borderRadius = "rounded-lg"
    }

    // Further customize based on tool type
    switch (toolType) {
      case "blog":
        if (template === "modern") {
          baseCustomizations.branding.primaryColor = "#10B981"
          baseCustomizations.branding.secondaryColor = "#34D399"
          baseCustomizations.branding.accentColor = "#ECFDF5"
        }
        break
      case "keyword":
        if (template === "modern") {
          baseCustomizations.branding.primaryColor = "#3B82F6"
          baseCustomizations.branding.secondaryColor = "#60A5FA"
          baseCustomizations.branding.accentColor = "#DBEAFE"
        }
        break
      case "meta":
        if (template === "modern") {
          baseCustomizations.branding.primaryColor = "#8B5CF6"
          baseCustomizations.branding.secondaryColor = "#A78BFA"
          baseCustomizations.branding.accentColor = "#EDE9FE"
        }
        break
      case "local":
        if (template === "modern") {
          baseCustomizations.branding.primaryColor = "#F59E0B"
          baseCustomizations.branding.secondaryColor = "#FBBF24"
          baseCustomizations.branding.accentColor = "#FEF3C7"
        }
        break
      case "ecommerce":
        if (template === "modern") {
          baseCustomizations.branding.primaryColor = "#EC4899"
          baseCustomizations.branding.secondaryColor = "#F472B6"
          baseCustomizations.branding.accentColor = "#FCE7F3"
        }
        break
    }

    // Log the customizations for debugging
    console.log("Applied template customizations:", baseCustomizations)

    return baseCustomizations
  }

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      {/* The backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-5xl">
          {showTemplateSelector ? (
            <TemplateSelector onSelectTemplate={handleSelectTemplate} isLoading={isGeneratingCustomUI} />
          ) : (
            <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <Dialog.Title className="text-2xl font-bold text-white">
                  {isGeneratingCustomUI ? "Generating Custom UI" : "Building Your SEO Tool"}
                </Dialog.Title>
                <div className="text-gray-400 mt-1">
                  {selectedTemplate === "custom"
                    ? "Creating a custom UI based on your description"
                    : `Applying the ${selectedTemplate} template`}
                </div>
              </div>

              {error && (
                <div className="mx-6 mt-4 p-4 bg-red-900/30 border border-red-700 rounded-md text-red-200 flex items-start">
                  <XCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-red-400" />
                  <div>
                    <p className="font-medium text-red-300">Error</p>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                {/* Left column: Terminal and code preview */}
                <div className="space-y-4">
                  {/* Terminal output */}
                  <div className="bg-black rounded-lg border border-gray-800 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
                      <div className="flex items-center">
                        <Terminal className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-300">Terminal</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div
                      ref={terminalRef}
                      className="p-4 h-64 overflow-y-auto font-mono text-sm text-green-400 bg-black"
                    >
                      {terminalOutput.map((line, index) => (
                        <div key={index} className="mb-1">
                          {line}
                        </div>
                      ))}
                      {isBuilding && (
                        <div className="flex items-center">
                          <span className="mr-2"></span>
                          <Loader2 className="h-4 w-4 animate-spin text-green-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Code preview */}
                  <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                      <div className="flex items-center">
                        <Code className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-300">Generated Code</span>
                      </div>
                      <button
                        onClick={() => setShowCodePreview(!showCodePreview)}
                        className="text-xs text-gray-400 hover:text-white transition-colors"
                      >
                        {showCodePreview ? "Hide" : "Show"}
                      </button>
                    </div>
                    {showCodePreview && (
                      <div className="p-4 h-64 overflow-y-auto font-mono text-sm text-blue-300 bg-gray-950">
                        {generatedCode.length > 0 ? (
                          generatedCode.map((code, index) => (
                            <pre key={index} className="mb-4 whitespace-pre-wrap">
                              {code}
                            </pre>
                          ))
                        ) : (
                          <div className="text-gray-500 italic">No code generated yet</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right column: Progress and UI preview */}
                <div className="space-y-4">
                  {/* Progress */}
                  <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                    <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                      <Zap className="h-4 w-4 text-yellow-400 mr-2" />
                      <span className="text-sm font-medium text-gray-300">Build Progress</span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-400">Progress</span>
                        <span className="text-sm text-gray-500">{progress.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-2.5 rounded-full"
                          style={{
                            backgroundColor:
                              selectedTemplate === "playful"
                                ? "#EC4899"
                                : selectedTemplate === "custom"
                                  ? "#8B5CF6"
                                  : "#3B82F6",
                          }}
                        ></motion.div>
                      </div>

                      <div className="mt-4 space-y-2">
                        {buildSteps.map((step, index) => (
                          <div
                            key={index}
                            className={`flex items-center p-2 rounded-md ${
                              index <= currentStep ? "bg-gray-800" : "bg-gray-900 opacity-50"
                            }`}
                          >
                            {index < currentStep ? (
                              <CheckCircle
                                className="h-4 w-4 mr-2 flex-shrink-0"
                                style={{
                                  color:
                                    selectedTemplate === "playful"
                                      ? "#EC4899"
                                      : selectedTemplate === "custom"
                                        ? "#8B5CF6"
                                        : "#3B82F6",
                                }}
                              />
                            ) : index === currentStep ? (
                              <Loader2 className="h-4 w-4 mr-2 flex-shrink-0 animate-spin text-yellow-400" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border border-gray-600 mr-2 flex-shrink-0" />
                            )}
                            <span className={`text-sm ${index <= currentStep ? "text-gray-300" : "text-gray-500"}`}>
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* UI Preview */}
                  <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                    <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                      <Palette className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-sm font-medium text-gray-300">UI Preview</span>
                    </div>
                    <div className="p-4">
                      {uiPreviewData ? (
                        <div className="space-y-4">
                          {/* Preview Image */}
                          {previewImage && (
                            <div className="relative w-full h-40 overflow-hidden rounded-md border border-gray-700">
                              <Image
                                src={previewImage || "/placeholder.svg"}
                                alt={`UI preview for ${uiPreviewData.themeName}`}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-30"></div>
                            </div>
                          )}

                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-400 mb-1">Theme</div>
                            <div className="text-white font-medium">{uiPreviewData.themeName}</div>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div className="space-y-1">
                              <div className="text-xs text-gray-500">Primary</div>
                              <div
                                className="h-8 rounded-md border border-gray-700"
                                style={{ backgroundColor: uiPreviewData.primaryColor }}
                              ></div>
                              <div className="text-xs text-gray-400">{uiPreviewData.primaryColor}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs text-gray-500">Secondary</div>
                              <div
                                className="h-8 rounded-md border border-gray-700"
                                style={{ backgroundColor: uiPreviewData.secondaryColor }}
                              ></div>
                              <div className="text-xs text-gray-400">{uiPreviewData.secondaryColor}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs text-gray-500">Accent</div>
                              <div
                                className="h-8 rounded-md border border-gray-700"
                                style={{ backgroundColor: uiPreviewData.accentColor }}
                              ></div>
                              <div className="text-xs text-gray-400">{uiPreviewData.accentColor}</div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="text-xs text-gray-500">Font Family</div>
                            <div className="text-white p-2 bg-gray-800 rounded-md border border-gray-700">
                              {uiPreviewData.fontFamily}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="text-xs text-gray-500">UI Components Preview</div>
                            <div className="p-3 bg-gray-800 rounded-md border border-gray-700">
                              <div className="flex space-x-2 mb-2">
                                <div
                                  className="px-3 py-1 text-xs text-white rounded-md"
                                  style={{
                                    backgroundColor: uiPreviewData.primaryColor,
                                    borderRadius:
                                      uiPreviewData.borderRadius === "rounded-full"
                                        ? "9999px"
                                        : uiPreviewData.borderRadius === "rounded-xl"
                                          ? "0.75rem"
                                          : uiPreviewData.borderRadius === "rounded-lg"
                                            ? "0.5rem"
                                            : "0.375rem",
                                  }}
                                >
                                  Button
                                </div>
                                <div
                                  className="px-3 py-1 text-xs rounded-md"
                                  style={{
                                    backgroundColor: uiPreviewData.accentColor,
                                    color: uiPreviewData.primaryColor,
                                    borderRadius:
                                      uiPreviewData.borderRadius === "rounded-full"
                                        ? "9999px"
                                        : uiPreviewData.borderRadius === "rounded-xl"
                                          ? "0.75rem"
                                          : uiPreviewData.borderRadius === "rounded-lg"
                                            ? "0.5rem"
                                            : "0.375rem",
                                  }}
                                >
                                  Tag
                                </div>
                              </div>
                              <div className="h-4 w-full mb-2 rounded-full bg-gray-700 overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: "65%",
                                    backgroundColor: uiPreviewData.primaryColor,
                                  }}
                                ></div>
                              </div>
                              <div
                                className="h-8 w-full rounded-md"
                                style={{
                                  backgroundColor: uiPreviewData.accentColor,
                                  borderRadius:
                                    uiPreviewData.borderRadius === "rounded-full"
                                      ? "9999px"
                                      : uiPreviewData.borderRadius === "rounded-xl"
                                        ? "0.75rem"
                                        : uiPreviewData.borderRadius === "rounded-lg"
                                          ? "0.5rem"
                                          : "0.375rem",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-48 text-gray-500">
                          <div className="text-center">
                            <Layers className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                            <p>UI preview will appear here</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer with completion status */}
              <div className="p-4 border-t border-gray-800 bg-gray-900 flex justify-between items-center">
                <div className="text-gray-400 text-sm">
                  {isBuilding ? (
                    <span className="flex items-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Building in progress...
                    </span>
                  ) : error ? (
                    <span className="flex items-center text-red-400">
                      <XCircle className="h-4 w-4 mr-2" />
                      Build failed
                    </span>
                  ) : progress === 100 ? (
                    <span className="flex items-center text-green-400">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Build completed successfully
                    </span>
                  ) : (
                    <span>Ready to build</span>
                  )}
                </div>
                {!isBuilding && progress === 100 && !error && (
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center transition-colors">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Deploy Tool
                  </button>
                )}
              </div>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}