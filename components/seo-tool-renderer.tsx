"use client"
import { useState, useEffect } from "react"
import type { ReactNode } from "react"
import {
  ArrowLeft,
  Settings,
  Share2,
  Download,
  CheckCircle,
  Loader2,
  Palette,
  FileText,
  X,
  XCircle,
  FileTextIcon,
  Globe,
  ShoppingBag,
  Sparkles,
  Search,
} from "lucide-react"

interface SeoToolRendererProps {
  config: any
  customizations: any
  onUpdateCustomizations: (customizations: any) => void
  onGoBack: () => void
}

export default function SEOToolRenderer({
  config,
  customizations,
  onUpdateCustomizations,
  onGoBack,
}: SeoToolRendererProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [processComplete, setProcessComplete] = useState(false)
  const [processedData, setProcessedData] = useState<any>(null)
  const [userInput, setUserInput] = useState("")
  const [showCustomizePanel, setShowCustomizePanel] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fields, setFields] = useState<Record<string, string>>({})
  const [copiedText, setCopiedText] = useState<string | null>(null)

  // Apply branding styles
  useEffect(() => {
    try {
      if (customizations?.branding) {
        console.log("Applying branding styles:", customizations.branding)

        document.documentElement.style.setProperty("--primary-color", customizations.branding.primaryColor)
        document.documentElement.style.setProperty("--secondary-color", customizations.branding.secondaryColor)
        document.documentElement.style.setProperty("--accent-color", customizations.branding.accentColor)

        // Apply font family if specified
        if (customizations.branding.fontFamily) {
          document.documentElement.style.setProperty("--font-family", customizations.branding.fontFamily)
        }

        // Apply border radius if specified
        if (customizations.branding.borderRadius) {
          document.documentElement.style.setProperty(
            "--border-radius",
            customizations.branding.borderRadius === "rounded-none"
              ? "0"
              : customizations.branding.borderRadius === "rounded-sm"
                ? "0.125rem"
                : customizations.branding.borderRadius === "rounded-md"
                  ? "0.375rem"
                  : customizations.branding.borderRadius === "rounded-lg"
                    ? "0.5rem"
                    : customizations.branding.borderRadius === "rounded-xl"
                      ? "0.75rem"
                      : customizations.branding.borderRadius === "rounded-full"
                        ? "9999px"
                        : "0.375rem",
          )
        }
      }

      return () => {
        // Clean up
        document.documentElement.style.removeProperty("--primary-color")
        document.documentElement.style.removeProperty("--secondary-color")
        document.documentElement.style.removeProperty("--accent-color")
        document.documentElement.style.removeProperty("--font-family")
        document.documentElement.style.removeProperty("--border-radius")
      }
    } catch (err) {
      console.error("Error applying styles:", err)
      setError("Failed to apply custom styles. Using default styling.")
    }
  }, [customizations?.branding])

  // Initialize fields from config
  useEffect(() => {
    if (config?.fields) {
      const initialFields: Record<string, string> = {}
      config.fields.forEach((field: any) => {
        initialFields[field.name] = ""
      })
      setFields(initialFields)
    }
  }, [config])

  const handleFieldChange = (name: string, value: string) => {
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const handleProcess = async () => {
    if (!userInput.trim() && Object.values(fields).every((v) => !v.trim())) return

    setIsProcessing(true)
    setError(null)

    try {
      // Prepare the input data
      const inputData = Object.keys(fields).length > 0 ? fields : { content: userInput }

      console.log("Processing input:", inputData)
      console.log("Tool type:", config.toolType)

      // Call the API route to process the data
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toolType: config.toolType,
          input: inputData,
          toolConfig: config, // Pass the entire tool configuration for context
        }),
      })

      console.log("API response status:", response.status)

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText} (${response.status})`)
      }

      const result = await response.json()
      console.log("API response data:", result)

      if (result.error) {
        throw new Error(result.error)
      }

      // Check if we have actual data
      if (!result.data) {
        throw new Error("No data returned from the API. Please check the server logs.")
      }

      setProcessedData(result.data)
      setProcessComplete(true)
    } catch (err: any) {
      console.error("Error processing:", err)
      setError(err.message || "Failed to process. Please try again.")

      // Show a more detailed error message to help with debugging
      setProcessedData({
        error: true,
        message: err.message,
        details: "This is a fallback response because the API request failed. Check the console for more details.",
      })
      setProcessComplete(true)
    } finally {
      setIsProcessing(false)
    }
  }

  // Get the appropriate icon for the tool type
  const ToolIcon = ({ toolType }: { toolType: string }): ReactNode => {
    switch (toolType) {
      case "blog":
        return <FileTextIcon />
      case "keyword":
        return <Search />
      case "meta":
        return <FileText />
      case "local":
        return <Globe />
      case "ecommerce":
        return <ShoppingBag />
      default:
        return <Sparkles />
    }
  }

  // Get template-specific styles
  const getTemplateStyles = () => {
    const template = customizations?.uiTemplate || "modern"

    switch (template) {
      case "playful":
        return {
          bgColor: "bg-white", // Changed from gradient to white
          cardStyle: "rounded-xl border-4 border-black shadow-lg",
          buttonStyle:
            "rounded-full px-6 py-3 font-bold text-white shadow-lg transform hover:scale-105 transition-transform",
          inputStyle: "rounded-xl border-3 border-gray-300 focus:border-pink-400 focus:ring-pink-400",
          decorations: true,
          iconSize: "h-6 w-6",
          headerStyle: "bg-white border-b-2 border-black text-black", // Changed to white bg with black text
          textColor: "text-black",
          resultCardStyle: "bg-white rounded-xl border-4 border-black shadow-lg",
          resultItemStyle: "bg-gray-50 rounded-lg border-2 border-gray-200",
        }
      case "custom":
        return {
          bgColor: "bg-white", // Changed from gradient to white
          cardStyle: "rounded-lg border-2 border-gray-300 shadow-xl",
          buttonStyle: "rounded-md px-5 py-2 font-medium text-white shadow-md hover:shadow-lg transition-shadow",
          inputStyle: "rounded-md border-2 border-gray-300 focus:border-indigo-400 focus:ring-indigo-400",
          decorations: true,
          iconSize: "h-5 w-5",
          headerStyle: "bg-white border-b border-gray-200 text-black", // Changed to white bg with black text
          textColor: "text-black",
          resultCardStyle: "bg-white rounded-lg border-2 border-gray-300 shadow-xl",
          resultItemStyle: "bg-gray-50 rounded-lg border border-gray-200",
        }
      case "modern":
      default:
        return {
          bgColor: "bg-white", // Changed from amber to white
          cardStyle: "rounded-xl border-4 border-black",
          buttonStyle: "rounded-md px-4 py-2 font-medium text-white",
          inputStyle: "rounded-md border-2 border-gray-300 focus:ring-2 focus:border-transparent",
          decorations: true,
          iconSize: "h-5 w-5",
          headerStyle: "bg-white border-b-2 border-black",
          textColor: "text-black",
          resultCardStyle: "bg-white rounded-xl border-4 border-black",
          resultItemStyle: "bg-gray-50 rounded-md border-2 border-gray-200",
        }
    }
  }

  const templateStyles = getTemplateStyles()

  // Update the main component to use the new styles
  return (
    <div
      className={`min-h-screen ${templateStyles.bgColor}`}
      style={{ fontFamily: customizations?.branding?.fontFamily || "Inter, sans-serif" }}
    >
      {/* Decorative elements - only show for templates that use them */}
      {templateStyles.decorations && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {customizations?.uiTemplate === "playful" ? (
            // Playful template decorations - lighter colors
            <>
              <div className="absolute top-[5%] left-[10%] w-32 h-32 bg-gray-100 rounded-full opacity-20"></div>
              <div className="absolute bottom-[15%] right-[5%] w-40 h-40 bg-gray-100 rounded-full opacity-20"></div>
              <div className="absolute top-[30%] right-[15%] w-24 h-24 bg-gray-100 rounded-full opacity-20"></div>
              <div className="absolute bottom-[30%] left-[20%] w-36 h-36 bg-gray-100 rounded-full opacity-20"></div>
              <div className="absolute top-[60%] left-[40%] w-48 h-48 bg-gray-100 rounded-full opacity-10"></div>
            </>
          ) : customizations?.uiTemplate === "custom" ? (
            // Custom template decorations - lighter colors
            <>
              <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] border border-dashed border-gray-200 rounded-full"></div>
              <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] border border-dashed border-gray-200 rounded-full"></div>
              <div className="absolute top-[25%] right-[15%] w-8 h-8 bg-gray-200 rounded-md rotate-45 opacity-20"></div>
              <div className="absolute bottom-[35%] left-[25%] w-10 h-10 bg-gray-200 rounded-md rotate-12 opacity-20"></div>
              <div className="absolute top-[60%] right-[30%] w-6 h-6 bg-gray-200 rounded-md rotate-45 opacity-20"></div>
            </>
          ) : (
            // Modern template decorations - lighter colors
            <>
              <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] border border-dashed border-gray-200 rounded-full"></div>
              <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] border border-dashed border-gray-200 rounded-full"></div>
            </>
          )}
        </div>
      )}

      {/* Header */}
      <header className={`relative z-10 p-4 ${templateStyles.headerStyle}`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={onGoBack} className="p-1 mr-4 hover:bg-gray-100 rounded-full">
              <ArrowLeft className={templateStyles.iconSize} />
            </button>
            <h1
              className="font-bold text-xl text-black"
              style={{
                color: customizations?.branding?.primaryColor || "#3B82F6",
              }}
            >
              {customizations?.branding?.brandName ? `${customizations.branding.brandName} - ` : ""}
              {config?.title || "SEO Tool"}
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowCustomizePanel(!showCustomizePanel)}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Settings"
            >
              <Settings className={templateStyles.iconSize} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Share">
              <Share2 className={templateStyles.iconSize} />
            </button>
            <div className="relative">
              {customizations?.uiTemplate === "modern" && (
                <div className="absolute inset-0 bg-black rounded-md transform translate-x-1 translate-y-1"></div>
              )}
              <button
                className={`relative z-10 flex items-center px-3 py-1.5 border-2 ${
                  customizations?.uiTemplate === "modern" ? "border-black" : "border-gray-300"
                } ${customizations?.branding?.borderRadius || "rounded-md"} text-sm`}
                style={{
                  backgroundColor: customizations?.branding?.accentColor || "#DBEAFE",
                  color: customizations?.branding?.primaryColor || "#3B82F6",
                }}
              >
                <Download className="h-4 w-4 mr-1" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto p-4 md:p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-md text-red-600 flex items-start">
            <XCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="relative">
            {/* Black background for 3D effect - only for modern template */}
            {customizations?.uiTemplate === "modern" && (
              <div className="absolute inset-0 bg-black rounded-xl transform translate-x-3 translate-y-3"></div>
            )}
            <div className={`relative z-10 p-6 ${templateStyles.cardStyle} bg-white`}>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div
                    className={`w-10 h-10 ${
                      customizations?.uiTemplate === "playful"
                        ? "rounded-full"
                        : customizations?.uiTemplate === "custom"
                          ? "rounded-lg"
                          : "rounded-lg"
                    } flex items-center justify-center mr-3 ${
                      customizations?.uiTemplate === "modern" ? "border-2 border-black" : "border border-gray-300"
                    }`}
                    style={{ backgroundColor: customizations?.branding?.accentColor || "#DBEAFE" }}
                  >
                    <ToolIcon toolType={config?.toolType || "blog"} />
                  </div>
                  <h2
                    className="text-2xl font-bold text-black"
                    style={{
                      color: customizations?.branding?.primaryColor || "#3B82F6",
                    }}
                  >
                    {config?.title || "SEO Tool"}
                  </h2>
                </div>
                <p className="text-gray-700">{config?.description || "Analyze and optimize your content for SEO"}</p>
              </div>

              <div className="space-y-4">
                {config?.fields && config.fields.length > 0 ? (
                  // Render multiple input fields if specified in the config
                  <div className="space-y-4">
                    {config.fields.map((field: any, index: number) => (
                      <div key={index}>
                        <label
                          htmlFor={`field-${field.name}`}
                          className="block text-sm font-medium mb-1 text-black"
                          style={{
                            color: customizations?.branding?.primaryColor || "#3B82F6",
                          }}
                        >
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        {field.type === "textarea" ? (
                          <textarea
                            id={`field-${field.name}`}
                            rows={3}
                            value={fields[field.name] || ""}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            placeholder={field.placeholder || ""}
                            className={`w-full p-3 ${templateStyles.inputStyle} text-black`}
                            required={field.required}
                          />
                        ) : field.type === "select" ? (
                          <select
                            id={`field-${field.name}`}
                            value={fields[field.name] || ""}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            className={`w-full p-3 ${templateStyles.inputStyle} text-black`}
                            required={field.required}
                          >
                            <option value="">Select an option</option>
                            {field.options?.map((option: any, i: number) => (
                              <option key={i} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={`field-${field.name}`}
                            type={field.type || "text"}
                            value={fields[field.name] || ""}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            placeholder={field.placeholder || ""}
                            className={`w-full p-3 ${templateStyles.inputStyle} text-black`}
                            required={field.required}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  // Render a single input field if no fields are specified
                  <div>
                    <label
                      htmlFor="seo-input"
                      className="block text-sm font-medium mb-1 text-black"
                      style={{
                        color: customizations?.branding?.primaryColor || "#3B82F6",
                      }}
                    >
                      {config?.inputLabel || "Enter your content"}
                    </label>
                    <textarea
                      id="seo-input"
                      rows={6}
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder={config?.inputPlaceholder || "Paste your content here..."}
                      className={`w-full p-3 ${templateStyles.inputStyle} text-black`}
                    ></textarea>
                  </div>
                )}

                <div className="flex justify-end">
                  <div className="relative">
                    {customizations?.uiTemplate === "modern" && (
                      <div className="absolute inset-0 bg-black rounded-md transform translate-x-1 translate-y-1"></div>
                    )}
                    <button
                      onClick={handleProcess}
                      disabled={isProcessing || (!userInput.trim() && Object.values(fields).every((v) => !v.trim()))}
                      className={`relative z-10 ${templateStyles.buttonStyle} disabled:opacity-50 disabled:cursor-not-allowed flex items-center ${
                        customizations?.uiTemplate === "modern" ? "border-2 border-black" : ""
                      }`}
                      style={{
                        backgroundColor: customizations?.branding?.primaryColor || "#3B82F6",
                        color: "white",
                      }}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          {config?.buttonText || "Analyze"}
                          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {processComplete && processedData && (
          <div className="mb-8">
            <div className="relative">
              {/* Black background for 3D effect - only for modern template */}
              {customizations?.uiTemplate === "modern" && (
                <div className="absolute inset-0 bg-black rounded-xl transform translate-x-3 translate-y-3"></div>
              )}
              <div className={`relative z-10 p-6 ${templateStyles.cardStyle} bg-white`}>
                <div className="flex items-center mb-6">
                  <div
                    className={`w-10 h-10 ${
                      customizations?.uiTemplate === "playful"
                        ? "rounded-full"
                        : customizations?.uiTemplate === "custom"
                          ? "rounded-lg"
                          : "rounded-lg"
                    } flex items-center justify-center mr-3 ${
                      customizations?.uiTemplate === "modern" ? "border-2 border-black" : "border border-gray-300"
                    }`}
                    style={{ backgroundColor: customizations?.branding?.accentColor || "#DBEAFE" }}
                  >
                    <CheckCircle
                      className="h-5 w-5"
                      style={{ color: customizations?.branding?.primaryColor || "#3B82F6" }}
                    />
                  </div>
                  <h2
                    className="text-2xl font-bold text-black"
                    style={{
                      color: customizations?.branding?.primaryColor || "#3B82F6",
                    }}
                  >
                    {config?.resultTitle || "SEO Analysis"}
                  </h2>
                </div>

                <div className="space-y-6">
                  {renderSeoResults(
                    config?.toolType || "general",
                    processedData,
                    customizations,
                    handleCopyText,
                    copiedText,
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Customize Panel */}
      {showCustomizePanel && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCustomizePanel(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-lg text-black">Customize Tool</h3>
              <button onClick={() => setShowCustomizePanel(false)} className="p-1 rounded-full hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              <div>
                <div className="flex items-center mb-3">
                  <Palette className="h-5 w-5 mr-2 text-gray-500" />
                  <h4 className="font-medium text-black">Style & Branding</h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                    <input
                      type="text"
                      value={customizations?.branding?.brandName || ""}
                      onChange={(e) =>
                        onUpdateCustomizations({
                          ...customizations,
                          branding: {
                            ...customizations?.branding,
                            brandName: e.target.value,
                          },
                        })
                      }
                      className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-black"
                      placeholder="Enter your brand name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                    <div className="flex">
                      <div
                        className="w-10 h-10 rounded-l-md border-y-2 border-l-2 border-gray-300"
                        style={{ backgroundColor: customizations?.branding?.primaryColor || "#3B82F6" }}
                      ></div>
                      <input
                        type="text"
                        value={customizations?.branding?.primaryColor || "#3B82F6"}
                        onChange={(e) =>
                          onUpdateCustomizations({
                            ...customizations,
                            branding: {
                              ...customizations?.branding,
                              primaryColor: e.target.value,
                            },
                          })
                        }
                        className="flex-1 p-2 border-y-2 border-r-2 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
                    <div className="flex">
                      <div
                        className="w-10 h-10 rounded-l-md border-y-2 border-l-2 border-gray-300"
                        style={{ backgroundColor: customizations?.branding?.accentColor || "#DBEAFE" }}
                      ></div>
                      <input
                        type="text"
                        value={customizations?.branding?.accentColor || "#DBEAFE"}
                        onChange={(e) =>
                          onUpdateCustomizations({
                            ...customizations,
                            branding: {
                              ...customizations?.branding,
                              accentColor: e.target.value,
                            },
                          })
                        }
                        className="flex-1 p-2 border-y-2 border-r-2 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Font Style</label>
                    <select
                      value={customizations?.branding?.fontFamily || "Inter, sans-serif"}
                      onChange={(e) =>
                        onUpdateCustomizations({
                          ...customizations,
                          branding: {
                            ...customizations?.branding,
                            fontFamily: e.target.value,
                          },
                        })
                      }
                      className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-black"
                    >
                      <option value="Inter, sans-serif">Modern (Inter)</option>
                      <option value="Poppins, sans-serif">Geometric (Poppins)</option>
                      <option value="Roboto, sans-serif">Clean (Roboto)</option>
                      <option value="Playfair Display, serif">Elegant (Playfair)</option>
                      <option value="Space Grotesk, monospace">Tech (Space Grotesk)</option>
                      <option value="DM Serif Display, serif">Classic (DM Serif)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
                    <select
                      value={customizations?.branding?.borderRadius || "rounded-md"}
                      onChange={(e) =>
                        onUpdateCustomizations({
                          ...customizations,
                          branding: {
                            ...customizations?.branding,
                            borderRadius: e.target.value,
                          },
                        })
                      }
                      className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-black"
                    >
                      <option value="rounded-none">Square</option>
                      <option value="rounded-sm">Slightly Rounded</option>
                      <option value="rounded-md">Medium Rounded</option>
                      <option value="rounded-lg">Large Rounded</option>
                      <option value="rounded-xl">Extra Large Rounded</option>
                      <option value="rounded-full">Fully Rounded</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <FileText className="h-5 w-5 mr-2 text-gray-500" />
                  <h4 className="font-medium text-black">Content & Tone</h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tone of Voice</label>
                    <select
                      value={customizations?.content?.toneOfVoice || "formal"}
                      onChange={(e) =>
                        onUpdateCustomizations({
                          ...customizations,
                          content: {
                            ...customizations?.content,
                            toneOfVoice: e.target.value,
                          },
                        })
                      }
                      className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent text-black"
                    >
                      <option value="formal">Formal & Professional</option>
                      <option value="casual">Casual & Friendly</option>
                      <option value="technical">Technical & Detailed</option>
                      <option value="creative">Creative & Engaging</option>
                      <option value="instructional">Educational & Informative</option>
                      <option value="persuasive">Persuasive & Compelling</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-dashed border-gray-200">
                <button
                  onClick={() => setShowCustomizePanel(false)}
                  className="w-full py-2 bg-[#FF7043] text-white rounded-md hover:bg-[#F4511E] transition-colors"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Function to render values with proper typing
function renderValue(value: any, styles: any, primaryColor: string): ReactNode {
  if (typeof value === "string") {
    return <span className="text-black">{value}</span>
  }

  if (typeof value === "number") {
    // For numbers that look like percentages or scores, render a small circular progress indicator
    if (value >= 0 && value <= 100) {
      return (
        <div className="flex items-center">
          <div className="relative w-8 h-8 mr-2">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={primaryColor}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - value / 100)}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-black">{value}</span>
            </div>
          </div>
          <span className="font-medium text-black">{value}</span>
        </div>
      )
    }

    return <span className="font-medium text-black">{value}</span>
  }

  if (Array.isArray(value)) {
    return (
      <div className="flex flex-wrap gap-2 mt-1">
        {value.map((item, i) => {
          if (typeof item === "string") {
            return (
              <span
                key={i}
                className={`${styles.tag} bg-white border border-gray-300`}
                style={{
                  color: primaryColor,
                }}
              >
                {item}
              </span>
            )
          }
          return (
            <span key={i} className="text-black">
              {JSON.stringify(item)}
            </span>
          )
        })}
      </div>
    )
  }

  if (typeof value === "object" && value !== null) {
    return <span className="text-black">{JSON.stringify(value)}</span>
  }

  return <span className="text-black">{String(value)}</span>
}

// Business idea renderer function
function renderBusinessIdeaResults(data: any, primaryColor: string): ReactNode {
  // Check if this looks like business idea data
  if (
    typeof data === "object" &&
    data.demographics &&
    data.psychographics &&
    data.mainCompetitors &&
    data.primaryStreams
  ) {
    return (
      <div className="space-y-8">
        {/* Business Idea Overview */}
        <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-black mb-4">Business Idea</h2>
          <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold text-black mb-2" style={{ color: primaryColor }}>
              {data.businessName || "AI-Driven Personal Finance Assistant"}
            </h3>
            <p className="text-black mb-4">{data.businessDescription || data.description}</p>

            {/* Visual tag cloud for key features */}
            <div className="flex flex-wrap gap-2 mt-4">
              {(data.keyFeatures || ["AI-powered", "Personal Finance", "Mobile App", "Budget Planning"]).map(
                (feature: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${primaryColor}15`,
                      color: primaryColor,
                      border: `1px solid ${primaryColor}30`,
                    }}
                  >
                    {feature}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Target Market */}
        <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-black mb-4">Target Market</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Demographics */}
            <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-black mb-3" style={{ color: primaryColor }}>
                Demographics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-black font-medium">Age Range:</span>
                  <span className="text-black">{data.demographics.age}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black font-medium">Income Level:</span>
                  <span className="text-black">{data.demographics.incomeLevel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black font-medium">Tech Savvy:</span>
                  <span className="text-black">{data.demographics.techSavvy ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>

            {/* Psychographics */}
            <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-black mb-3" style={{ color: primaryColor }}>
                Psychographics
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-black font-medium">Values:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.psychographics.values.map((value: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-white rounded-md text-sm border border-gray-200 text-black">
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-black font-medium">Lifestyle:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.psychographics.lifestyle.map((item: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-white rounded-md text-sm border border-gray-200 text-black">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Trends */}
        <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-black mb-4">Market Trends</h2>
          <div className="space-y-4">
            {[data.trend1 || data, data.trend2].filter(Boolean).map((trend: any, i: number) => (
              <div key={i} className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: `${primaryColor}20` }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={primaryColor}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-black font-medium mb-2">{trend.trend}</p>
                    <div className="inline-block px-3 py-1 bg-white rounded-full text-sm font-bold border border-gray-200 text-black">
                      {trend.percentage}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitive Analysis */}
        <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-black mb-4">Competitive Analysis</h2>
          <div className="space-y-6">
            {data.mainCompetitors.map((competitor: any, i: number) => (
              <div key={i} className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-black mb-3">{competitor.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-black mb-2" style={{ color: primaryColor }}>
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {competitor.strengths.map((strength: string, j: number) => (
                        <li key={j} className="flex items-start">
                          <svg
                            className="w-5 h-5 mr-2 text-green-500 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-black">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-black mb-2" style={{ color: primaryColor }}>
                      Weaknesses
                    </h4>
                    <ul className="space-y-2">
                      {competitor.weaknesses.map((weakness: string, j: number) => (
                        <li key={j} className="flex items-start">
                          <svg
                            className="w-5 h-5 mr-2 text-red-500 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <span className="text-black">{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {/* Unique Selling Proposition */}
            <div className="p-5 bg-white rounded-lg border-2" style={{ borderColor: primaryColor }}>
              <h3 className="text-lg font-bold text-black mb-2" style={{ color: primaryColor }}>
                Unique Selling Proposition
              </h3>
              <p className="text-black">{data.uniqueSellingProposition}</p>
            </div>
          </div>
        </div>

        {/* Revenue Model */}
        <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-black mb-4">Revenue Model</h2>
          <div className="space-y-6">
            {/* Revenue Streams */}
            <div>
              <h3 className="text-lg font-bold text-black mb-3" style={{ color: primaryColor }}>
                Revenue Streams
              </h3>
              <div className="space-y-4">
                {data.primaryStreams.map((stream: any, i: number) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-black mb-1">{stream.type}</h4>
                    <p className="text-black text-sm">{stream.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projected Growth */}
            <div>
              <h3 className="text-lg font-bold text-black mb-3" style={{ color: primaryColor }}>
                Projected Growth
              </h3>
              <div className="relative pt-5">
                {/* Bar chart for projected growth */}
                <div className="flex items-end h-64 space-x-6 mb-2">
                  {Object.entries(data.projectedGrowth).map(([year, amount], i) => {
                    // Calculate height percentage based on the highest value
                    const values = Object.values(data.projectedGrowth) as string[]
                    const maxValue = Math.max(...values.map((v) => Number.parseInt(v.replace(/[^0-9]/g, ""))))
                    const currentValue = Number.parseInt((amount as string).replace(/[^0-9]/g, ""))
                    const heightPercentage = (currentValue / maxValue) * 100

                    return (
                      <div key={i} className="flex flex-col items-center flex-1">
                        <div className="w-full relative">
                          <div
                            className="w-full rounded-t-lg transition-all duration-1000 ease-out"
                            style={{
                              height: `${heightPercentage}%`,
                              backgroundColor: primaryColor,
                              opacity: 0.7 + i * 0.1,
                            }}
                          ></div>
                          
                        </div>
                        <div className="mt-2 text-sm font-medium text-black">{year.replace("year", "Year ")}</div>
                      </div>
                    )
                  })}
                </div>

                {/* X-axis */}
                <div className="h-px w-full bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-black mb-4">Next Steps</h2>
          <div className="space-y-4">
            {(
              data.nextSteps || [
                "Conduct a market survey to validate demand.",
                "Develop a minimum viable product (MVP) to test core features.",
                "Launch a targeted marketing campaign on social media platforms.",
              ]
            ).map((step: string, i: number) => (
              <div key={i} className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white font-bold"
                  style={{ backgroundColor: primaryColor }}
                >
                  {i + 1}
                </div>
                <p className="text-black pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}

// SEO results renderer function
function renderSeoResults(
  toolType: string,
  data: any,
  customizations: any,
  handleCopyText: (text: string) => void,
  copiedText: string | null,
): ReactNode {
  const primaryColor = customizations?.branding?.primaryColor || "#3B82F6"

  // Fix the renderScoreGauge function by adding proper return type
  const renderScoreGauge = (score: number, label: string): ReactNode => {
    return (
      <div>
        <p className="text-black">
          {label}: {score}
        </p>
      </div>
    )
  }

  const resultStyles = {
    sectionTitle: "text-xl font-bold text-black mb-3",
    checkIcon: "h-5 w-5 mr-2 flex-shrink-0",
    tag: "px-3 py-1 rounded-full text-sm font-medium",
    progressBar: "h-2 bg-gray-200 rounded-full",
  }

  const formatSectionTitle = (title: string) => {
    // Split the title into words, capitalize the first letter of each word, and join them back together
    return title
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  // Fix the renderChecklist function by adding proper return type
  const renderChecklist = (items: string[]): ReactNode => {
    return (
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-200">
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" style={{ color: primaryColor }} />
            <span className="text-black">{item}</span>
          </li>
        ))}
      </ul>
    )
  }

  // Fix the renderRadarChart function by adding proper return type
  const renderRadarChart = (metrics: Record<string, number>): ReactNode => {
    return (
      <div>
        <p className="text-black">Radar Chart</p>
      </div>
    )
  }

  // Fix the renderBarChart function by adding proper return type
  const renderBarChart = (metrics: Record<string, number>): ReactNode => {
    return (
      <div>
        <p className="text-black">Bar Chart</p>
      </div>
    )
  }

  // Fix the renderPieChart function by adding proper return type
  const renderPieChart = (metrics: Record<string, number>): ReactNode => {
    return (
      <div>
        <p className="text-black">Pie Chart</p>
      </div>
    )
  }

  // Fix the renderHeatmap function by adding proper return type
  const renderHeatmap = (metrics: Record<string, number>, maxValue: number): ReactNode => {
    return (
      <div>
        <p className="text-black">Heatmap</p>
      </div>
    )
  }

  // Check for business idea data first
  const businessIdeaResults = renderBusinessIdeaResults(data, primaryColor)
  if (businessIdeaResults) {
    return businessIdeaResults
  }

  // Continue with the original renderer for other data types
  return (
    <div className="space-y-6">
      {/* Dynamically render any scores or metrics at the top */}
      {(data.score !== undefined || data.rating !== undefined || data.overallScore !== undefined) && (
        <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
          {renderScoreGauge(
            data.score !== undefined ? data.score : data.rating !== undefined ? data.rating : data.overallScore,
            data.scoreLabel || data.ratingLabel || "Overall Score",
          )}
        </div>
      )}

      {/* Dynamically render any sections in the data */}
      {Object.entries(data).map(([key, value]) => {
        // Skip rendering certain fields that are handled specially
        if (["score", "rating", "overallScore", "scoreLabel", "ratingLabel", "error", "message"].includes(key)) {
          return null
        }

        // Handle arrays
        if (Array.isArray(value)) {
          return (
            <div key={key} className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
              <h3 className={resultStyles.sectionTitle}>{formatSectionTitle(key)}</h3>

              {/* If it looks like a checklist, render it as such */}
              {value.every((item) => typeof item === "string") && renderChecklist(value)}

              {/* Otherwise render as normal list */}
              {!value.every((item) => typeof item === "string") && (
                <div className="space-y-3">
                  {value.map((item, i) => {
                    if (typeof item === "string") {
                      // Render string items with checkmarks
                      return (
                        <div key={i} className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <CheckCircle className={resultStyles.checkIcon} style={{ color: primaryColor }} />
                          <span className="text-black">{item}</span>
                        </div>
                      )
                    } else if (typeof item === "object" && item !== null) {
                      // Render object items as cards
                      return (
                        <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          {Object.entries(item).map(([itemKey, itemValue]) => (
                            <div key={itemKey} className="mb-2">
                              <span className="font-medium text-black">{formatSectionTitle(itemKey)}:</span>{" "}
                              {renderValue(itemValue, resultStyles, primaryColor)}
                            </div>
                          ))}
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              )}
            </div>
          )
        }

        // Handle objects that look like they contain metrics/scores
        if (
          typeof value === "object" &&
          value !== null &&
          Object.values(value).every((v) => typeof v === "number") &&
          Object.keys(value).length >= 3 &&
          Object.keys(value).length <= 8
        ) {
          return (
            <div key={key} className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
              <h3 className={resultStyles.sectionTitle}>{formatSectionTitle(key)}</h3>

              {/* Render radar chart for 3-8 metrics */}
              {renderRadarChart(value as Record<string, number>)}

              {/* Also render as bar chart for clarity */}
              {renderBarChart(value as Record<string, number>)}
            </div>
          )
        }

        // Handle objects that look like distribution data (good for pie charts)
        if (
          typeof value === "object" &&
          value !== null &&
          Object.values(value).every((v) => typeof v === "number") &&
          Object.keys(value).length >= 2 &&
          Object.keys(value).length <= 6
        ) {
          return (
            <div key={key} className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
              <h3 className={resultStyles.sectionTitle}>{formatSectionTitle(key)}</h3>

              {/* Render pie chart */}
              {renderPieChart(value as Record<string, number>)}

              {/* Also render as bar chart for clarity */}
              {renderBarChart(value as Record<string, number>)}
            </div>
          )
        }

        // Handle objects that look like keyword density or heatmap data
        if (
          typeof value === "object" &&
          value !== null &&
          Object.values(value).every((v) => typeof v === "number") &&
          Object.keys(value).length > 8
        ) {
          const maxValue = Math.max(...Object.values(value as Record<string, number>))

          return (
            <div key={key} className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
              <h3 className={resultStyles.sectionTitle}>{formatSectionTitle(key)}</h3>

              {/* Render heatmap */}
              {renderHeatmap(value as Record<string, number>, maxValue)}
            </div>
          )
        }

        // Handle regular objects
        if (typeof value === "object" && value !== null) {
          return (
            <div key={key} className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
              <h3 className={resultStyles.sectionTitle}>{formatSectionTitle(key)}</h3>
              <div className="space-y-4">
                {Object.entries(value).map(([subKey, subValue]) => {
                  if (typeof subValue === "object" && subValue !== null && !Array.isArray(subValue)) {
                    // Handle nested objects (like analysis sections with scores)
                    return (
                      <div key={subKey} className="mb-5 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="font-medium mb-3 text-black">{formatSectionTitle(subKey)}</div>
                        {Object.entries(subValue).map(([nestedKey, nestedValue]) => {
                          if (nestedKey === "score" || nestedKey === "rating") {
                            return (
                              <div key={nestedKey} className="space-y-2 mb-3">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-700">{formatSectionTitle(subKey)}</span>
                                </div>
                                <div className={resultStyles.progressBar}>
                                  <div
                                    className="h-full rounded-full"
                                    style={{ width: `${nestedValue}%`, backgroundColor: primaryColor }}
                                  ></div>
                                </div>
                              </div>
                            )
                          }
                          return (
                            <div key={nestedKey} className="ml-4 mb-2">
                              <span className="text-sm text-black">
                                {renderValue(nestedValue, resultStyles, primaryColor)}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    )
                  }

                  // Handle arrays within objects
                  if (Array.isArray(subValue)) {
                    return (
                      <div key={subKey} className="mb-5">
                        <div className="font-medium mb-3 text-black">{formatSectionTitle(subKey)}</div>
                        <div className="space-y-3">
                          {subValue.map((item, i) => {
                            if (typeof item === "string") {
                              return (
                                <div
                                  key={i}
                                  className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-200"
                                >
                                  <CheckCircle className={resultStyles.checkIcon} style={{ color: primaryColor }} />
                                  <span className="text-black">{item}</span>
                                </div>
                              )
                            } else if (typeof item === "object" && item !== null) {
                              return (
                                <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                  {Object.entries(item).map(([itemKey, itemValue]) => (
                                    <div key={itemKey} className="mb-2">
                                      <span className="font-medium text-black">{formatSectionTitle(itemKey)}:</span>{" "}
                                      {renderValue(itemValue, resultStyles, primaryColor)}
                                    </div>
                                  ))}
                                </div>
                              )
                            }
                            return null
                          })}
                        </div>
                      </div>
                    )
                  }

                  // Handle simple key-value pairs
                  return (
                    <div key={subKey} className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="font-medium text-black">{formatSectionTitle(subKey)}:</span>{" "}
                      {renderValue(subValue, resultStyles, primaryColor)}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }

        // Handle primitive values
        return (
          <div key={key} className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
            <h3 className="font-medium text-lg mb-3 text-black">{formatSectionTitle(key)}</h3>
            <div className="text-black">{renderValue(value, resultStyles, primaryColor)}</div>
          </div>
        )
      })}
    </div>
  )
}
