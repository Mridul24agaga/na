"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import {
  ModernTemplatePreview,
  PlayfulTemplatePreview,
  CorporateTemplatePreview,
  ElegantTemplatePreview,
  TechTemplatePreview,
  VintageTemplatePreview,
} from "./template-preview-demos"

export interface StyleTemplate {
  id: string
  name: string
  description: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  borderRadius: string
  buttonStyle: string
  cardStyle: string
}

export interface BrandingOptions {
  template: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  borderRadius: string
  buttonStyle: string
  cardStyle: string
  logoUrl?: string
  brandName: string
  industry: string
}

interface StyleTemplateSelectorProps {
  selectedTemplate: string
  onTemplateChange: (templateId: string) => void
  onBrandingChange: (branding: Partial<BrandingOptions>) => void
  branding: BrandingOptions
}

export function StyleTemplateSelector({
  selectedTemplate,
  onTemplateChange,
  onBrandingChange,
  branding,
}: StyleTemplateSelectorProps) {
  const [activeTab, setActiveTab] = useState<"templates" | "colors" | "typography" | "layout">("templates")

  // Predefined style templates
  const templates: StyleTemplate[] = [
    {
      id: "modern",
      name: "Modern & Clean",
      description: "Sleek, minimalist design with clean lines and ample white space",
      primaryColor: "#3B82F6",
      secondaryColor: "#1E40AF",
      accentColor: "#DBEAFE",
      fontFamily: "Inter, sans-serif",
      borderRadius: "rounded-md",
      buttonStyle: "solid",
      cardStyle: "shadow",
    },
    {
      id: "playful",
      name: "Playful & Vibrant",
      description: "Fun, colorful design with rounded elements and playful typography",
      primaryColor: "#EC4899",
      secondaryColor: "#BE185D",
      accentColor: "#FCE7F3",
      fontFamily: "Poppins, sans-serif",
      borderRadius: "rounded-full",
      buttonStyle: "gradient",
      cardStyle: "border",
    },
    {
      id: "corporate",
      name: "Corporate & Professional",
      description: "Serious, business-focused design with structured layout",
      primaryColor: "#1F2937",
      secondaryColor: "#111827",
      accentColor: "#F3F4F6",
      fontFamily: "Roboto, sans-serif",
      borderRadius: "rounded-sm",
      buttonStyle: "outline",
      cardStyle: "flat",
    },
    {
      id: "elegant",
      name: "Elegant & Sophisticated",
      description: "Refined design with subtle animations and premium feel",
      primaryColor: "#7C3AED",
      secondaryColor: "#5B21B6",
      accentColor: "#EDE9FE",
      fontFamily: "Playfair Display, serif",
      borderRadius: "rounded-lg",
      buttonStyle: "ghost",
      cardStyle: "glass",
    },
    {
      id: "tech",
      name: "Tech & Futuristic",
      description: "Modern tech-inspired design with sharp angles and dark mode",
      primaryColor: "#10B981",
      secondaryColor: "#059669",
      accentColor: "#D1FAE5",
      fontFamily: "Space Grotesk, monospace",
      borderRadius: "rounded-none",
      buttonStyle: "neon",
      cardStyle: "dark",
    },
    {
      id: "vintage",
      name: "Vintage & Retro",
      description: "Nostalgic design with retro colors and classic typography",
      primaryColor: "#F59E0B",
      secondaryColor: "#D97706",
      accentColor: "#FEF3C7",
      fontFamily: "DM Serif Display, serif",
      borderRadius: "rounded-md",
      buttonStyle: "classic",
      cardStyle: "paper",
    },
    {
      id: "plain",
      name: "Plain & Simple",
      description: "Clean, minimal design with light borders and no shadows",
      primaryColor: "#4B5563",
      secondaryColor: "#6B7280",
      accentColor: "#F9FAFB",
      fontFamily: "Inter, sans-serif",
      borderRadius: "rounded-md",
      buttonStyle: "solid",
      cardStyle: "plain",
    },
  ]

  // Industry options
  const industries = [
    "E-commerce",
    "Technology",
    "Healthcare",
    "Education",
    "Finance",
    "Real Estate",
    "Travel",
    "Food & Beverage",
    "Fashion",
    "Marketing",
    "Media",
    "Non-profit",
  ]

  // Find the currently selected template
  const currentTemplate = templates.find((t) => t.id === selectedTemplate) || templates[0]

  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      onTemplateChange(templateId)
      onBrandingChange({
        template: templateId,
        primaryColor: template.primaryColor,
        secondaryColor: template.secondaryColor,
        accentColor: template.accentColor,
        fontFamily: template.fontFamily,
        borderRadius: template.borderRadius,
        buttonStyle: template.buttonStyle,
        cardStyle: template.cardStyle,
      })
    }
  }

  // Render the appropriate template preview component
  const renderTemplatePreview = (templateId: string, templateBranding: BrandingOptions) => {
    switch (templateId) {
      case "modern":
        return <ModernTemplatePreview branding={templateBranding} />
      case "playful":
        return <PlayfulTemplatePreview branding={templateBranding} />
      case "corporate":
        return <CorporateTemplatePreview branding={templateBranding} />
      case "elegant":
        return <ElegantTemplatePreview branding={templateBranding} />
      case "tech":
        return <TechTemplatePreview branding={templateBranding} />
      case "vintage":
        return <VintageTemplatePreview branding={templateBranding} />
      default:
        return <ModernTemplatePreview branding={templateBranding} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "templates"
              ? "text-[#FF7043] border-b-2 border-[#FF7043]"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("templates")}
        >
          Templates
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "colors" ? "text-[#FF7043] border-b-2 border-[#FF7043]" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("colors")}
        >
          Colors
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "typography"
              ? "text-[#FF7043] border-b-2 border-[#FF7043]"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("typography")}
        >
          Typography
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "layout" ? "text-[#FF7043] border-b-2 border-[#FF7043]" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("layout")}
        >
          Layout
        </button>
      </div>

      {/* Templates Tab */}
      {activeTab === "templates" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => {
              // Create a temporary branding object for the preview
              const previewBranding = {
                ...branding,
                primaryColor: template.primaryColor,
                secondaryColor: template.secondaryColor,
                accentColor: template.accentColor,
                fontFamily: template.fontFamily,
                borderRadius: template.borderRadius,
                buttonStyle: template.buttonStyle,
                cardStyle: template.cardStyle,
                template: template.id,
              }

              return (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedTemplate === template.id
                      ? "border-[#FF7043] ring-2 ring-[#FF7043] ring-opacity-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="aspect-video relative p-2">
                    {/* Interactive UI Demo instead of static image */}
                    <div className="w-full h-full">{renderTemplatePreview(template.id, previewBranding)}</div>

                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 right-2 bg-[#FF7043] text-white rounded-full p-1 z-10">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900">{template.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1">
                    <div className="h-full w-1/3" style={{ backgroundColor: template.primaryColor }}></div>
                    <div
                      className="h-full w-1/3 absolute left-1/3"
                      style={{ backgroundColor: template.secondaryColor }}
                    ></div>
                    <div
                      className="h-full w-1/3 absolute left-2/3"
                      style={{ backgroundColor: template.accentColor }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="pt-4 border-t border-dashed border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">Brand Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  id="brandName"
                  value={branding.brandName}
                  onChange={(e) => onBrandingChange({ brandName: e.target.value })}
                  className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent"
                  placeholder="Your brand name"
                />
              </div>
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  id="industry"
                  value={branding.industry}
                  onChange={(e) => onBrandingChange({ industry: e.target.value })}
                  className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent"
                >
                  <option value="">Select an industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Logo URL (optional)
                </label>
                <input
                  type="text"
                  id="logoUrl"
                  value={branding.logoUrl || ""}
                  onChange={(e) => onBrandingChange({ logoUrl: e.target.value })}
                  className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent"
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Colors Tab */}
      {activeTab === "colors" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                Primary Color
              </label>
              <div className="flex">
                <div
                  className="w-10 h-10 rounded-l-md border-y-2 border-l-2 border-gray-300"
                  style={{ backgroundColor: branding.primaryColor }}
                ></div>
                <input
                  type="text"
                  id="primaryColor"
                  value={branding.primaryColor}
                  onChange={(e) => onBrandingChange({ primaryColor: e.target.value })}
                  className="flex-1 p-2 border-y-2 border-r-2 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                Secondary Color
              </label>
              <div className="flex">
                <div
                  className="w-10 h-10 rounded-l-md border-y-2 border-l-2 border-gray-300"
                  style={{ backgroundColor: branding.secondaryColor }}
                ></div>
                <input
                  type="text"
                  id="secondaryColor"
                  value={branding.secondaryColor}
                  onChange={(e) => onBrandingChange({ secondaryColor: e.target.value })}
                  className="flex-1 p-2 border-y-2 border-r-2 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700 mb-1">
                Accent Color
              </label>
              <div className="flex">
                <div
                  className="w-10 h-10 rounded-l-md border-y-2 border-l-2 border-gray-300"
                  style={{ backgroundColor: branding.accentColor }}
                ></div>
                <input
                  type="text"
                  id="accentColor"
                  value={branding.accentColor}
                  onChange={(e) => onBrandingChange({ accentColor: e.target.value })}
                  className="flex-1 p-2 border-y-2 border-r-2 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-dashed border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">Color Preview</h3>
            <div className="p-4 border-2 border-gray-200 rounded-lg">
              <div className="space-y-4">
                <div
                  className="h-12 rounded-md flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  Primary Button
                </div>
                <div
                  className="h-12 rounded-md flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: branding.secondaryColor }}
                >
                  Secondary Button
                </div>
                <div
                  className="h-12 rounded-md flex items-center justify-center font-medium border-2"
                  style={{
                    backgroundColor: branding.accentColor,
                    borderColor: branding.primaryColor,
                    color: branding.primaryColor,
                  }}
                >
                  Accent Element
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Typography Tab */}
      {activeTab === "typography" && (
        <div className="space-y-6">
          <div>
            <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700 mb-1">
              Font Family
            </label>
            <select
              id="fontFamily"
              value={branding.fontFamily}
              onChange={(e) => onBrandingChange({ fontFamily: e.target.value })}
              className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent"
            >
              <option value="Inter, sans-serif">Inter (Modern Sans-Serif)</option>
              <option value="Poppins, sans-serif">Poppins (Geometric Sans-Serif)</option>
              <option value="Roboto, sans-serif">Roboto (Clean Sans-Serif)</option>
              <option value="Playfair Display, serif">Playfair Display (Elegant Serif)</option>
              <option value="Space Grotesk, monospace">Space Grotesk (Modern Monospace)</option>
              <option value="DM Serif Display, serif">DM Serif Display (Classic Serif)</option>
            </select>
          </div>

          <div className="pt-4 border-t border-dashed border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">Typography Preview</h3>
            <div
              className="p-4 border-2 border-gray-200 rounded-lg space-y-4"
              style={{ fontFamily: branding.fontFamily }}
            >
              <h1 className="text-3xl font-bold" style={{ color: branding.primaryColor }}>
                Heading 1 - Main Title
              </h1>
              <h2 className="text-2xl font-bold" style={{ color: branding.secondaryColor }}>
                Heading 2 - Section Title
              </h2>
              <h3 className="text-xl font-medium" style={{ color: branding.secondaryColor }}>
                Heading 3 - Subsection Title
              </h3>
              <p className="text-base">
                This is a paragraph of text that demonstrates how body copy will appear in your SEO tool. The font
                family and styling will match your selected preferences to ensure brand consistency.
              </p>
              <div className="flex space-x-4">
                <button className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: branding.primaryColor }}>
                  Primary Button
                </button>
                <button
                  className="px-4 py-2 rounded-md border-2"
                  style={{ borderColor: branding.primaryColor, color: branding.primaryColor }}
                >
                  Secondary Button
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Layout Tab */}
      {activeTab === "layout" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="borderRadius" className="block text-sm font-medium text-gray-700 mb-1">
                Border Radius
              </label>
              <select
                id="borderRadius"
                value={branding.borderRadius}
                onChange={(e) => onBrandingChange({ borderRadius: e.target.value })}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent"
              >
                <option value="rounded-none">Square (No Radius)</option>
                <option value="rounded-sm">Small Radius</option>
                <option value="rounded-md">Medium Radius</option>
                <option value="rounded-lg">Large Radius</option>
                <option value="rounded-xl">Extra Large Radius</option>
                <option value="rounded-full">Fully Rounded</option>
              </select>
            </div>
            <div>
              <label htmlFor="buttonStyle" className="block text-sm font-medium text-gray-700 mb-1">
                Button Style
              </label>
              <select
                id="buttonStyle"
                value={branding.buttonStyle}
                onChange={(e) => onBrandingChange({ buttonStyle: e.target.value })}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent"
              >
                <option value="solid">Solid</option>
                <option value="outline">Outline</option>
                <option value="ghost">Ghost</option>
                <option value="gradient">Gradient</option>
                <option value="neon">Neon</option>
                <option value="classic">Classic</option>
              </select>
            </div>
            <div>
              <label htmlFor="cardStyle" className="block text-sm font-medium text-gray-700 mb-1">
                Card Style
              </label>
              <select
                id="cardStyle"
                value={branding.cardStyle}
                onChange={(e) => onBrandingChange({ cardStyle: e.target.value })}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent"
              >
                <option value="shadow">Shadow</option>
                <option value="border">Border</option>
                <option value="flat">Flat</option>
                <option value="glass">Glass/Frosted</option>
                <option value="dark">Dark Mode</option>
                <option value="paper">Paper Texture</option>
                <option value="plain">Plain</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-dashed border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">Layout Preview</h3>
            <div className="p-4 border-2 border-gray-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Button Preview */}
                <div
                  className={`p-4 ${getCardStyleClass(branding.cardStyle)} ${branding.borderRadius}`}
                  style={{
                    borderColor: branding.cardStyle === "border" ? branding.primaryColor : undefined,
                    backgroundColor: branding.cardStyle === "dark" ? "#1F2937" : undefined,
                    color: branding.cardStyle === "dark" ? "white" : undefined,
                  }}
                >
                  <h3
                    className="font-medium mb-2"
                    style={{
                      color: branding.cardStyle === "dark" ? "white" : branding.primaryColor,
                    }}
                  >
                    Button Styles
                  </h3>
                  <div className="space-y-2">
                    <button
                      className={`w-full py-2 ${branding.borderRadius} ${getButtonStyleClass(
                        branding.buttonStyle,
                        branding.primaryColor,
                        branding.secondaryColor,
                      )}`}
                    >
                      Primary Button
                    </button>
                    <button
                      className={`w-full py-2 ${branding.borderRadius} ${getButtonStyleClass(
                        "outline",
                        branding.primaryColor,
                        branding.secondaryColor,
                      )}`}
                    >
                      Secondary Button
                    </button>
                  </div>
                </div>

                {/* Card Preview */}
                <div
                  className={`p-4 ${getCardStyleClass(branding.cardStyle)} ${branding.borderRadius}`}
                  style={{
                    borderColor: branding.cardStyle === "border" ? branding.primaryColor : undefined,
                    backgroundColor: branding.cardStyle === "dark" ? "#1F2937" : undefined,
                    color: branding.cardStyle === "dark" ? "white" : undefined,
                  }}
                >
                  <h3
                    className="font-medium mb-2"
                    style={{
                      color: branding.cardStyle === "dark" ? "white" : branding.primaryColor,
                    }}
                  >
                    Card Example
                  </h3>
                  <p className="text-sm mb-3">This shows how content cards will appear in your SEO tool.</p>
                  <div
                    className={`h-2 w-full ${branding.borderRadius}`}
                    style={{ backgroundColor: branding.accentColor }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function to get button style classes
function getButtonStyleClass(style: string, primaryColor: string, secondaryColor: string): string {
  switch (style) {
    case "solid":
      return `bg-[${primaryColor}] text-white border-2 border-transparent`
    case "outline":
      return `bg-transparent border-2 border-[${primaryColor}] text-[${primaryColor}]`
    case "ghost":
      return `bg-transparent hover:bg-[${primaryColor}]/10 text-[${primaryColor}]`
    case "gradient":
      return `bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}] text-white border-0`
    case "neon":
      return `bg-[${primaryColor}] text-white border-2 border-transparent shadow-[0_0_10px_rgba(0,0,0,0.3)]`
    case "classic":
      return `bg-[${primaryColor}] text-white border-b-4 border-[${secondaryColor}]`
    default:
      return `bg-[${primaryColor}] text-white`
  }
}

// Helper function to get card style classes
function getCardStyleClass(style: string): string {
  switch (style) {
    case "shadow":
      return "bg-white shadow-md border border-gray-100"
    case "border":
      return "bg-white border-2"
    case "flat":
      return "bg-gray-50"
    case "glass":
      return "bg-white/70 backdrop-blur-md border border-white/20 shadow-sm"
    case "dark":
      return "shadow-md"
    case "paper":
      return "bg-[#FFFDF8] border border-gray-200 shadow-sm"
    case "plain":
      return "bg-white border border-gray-200"
    default:
      return "bg-white shadow-md"
  }
}
