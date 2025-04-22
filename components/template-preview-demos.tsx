"use client"

import { FileText, Search, Share2, Sparkles } from "lucide-react"
import type { BrandingOptions } from "./style-template-selector"

// Modern Template Preview
export function ModernTemplatePreview({ branding }: { branding: BrandingOptions }) {
  return (
    <div className="w-full h-full overflow-hidden bg-white rounded-md shadow-md flex flex-col">
      <div className="p-3 border-b" style={{ backgroundColor: branding.accentColor }}>
        <h3 className="text-sm font-medium" style={{ color: branding.primaryColor }}>
          Modern Template
        </h3>
      </div>
      <div className="p-3 flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`w-6 h-6 ${branding.borderRadius} flex items-center justify-center`}
            style={{ backgroundColor: branding.primaryColor }}
          >
            <Search className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-medium">Search Analysis</span>
        </div>
        <div className="space-y-2">
          <div className="w-full h-2 rounded-full bg-gray-100">
            <div className="h-full rounded-full" style={{ width: "70%", backgroundColor: branding.primaryColor }}></div>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-100">
            <div
              className="h-full rounded-full"
              style={{ width: "45%", backgroundColor: branding.secondaryColor }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Playful Template Preview
export function PlayfulTemplatePreview({ branding }: { branding: BrandingOptions }) {
  return (
    <div
      className="w-full h-full overflow-hidden bg-white rounded-lg border-2 flex flex-col"
      style={{ borderColor: branding.primaryColor }}
    >
      <div className="p-3 flex justify-between items-center" style={{ backgroundColor: branding.accentColor }}>
        <h3 className="text-sm font-bold" style={{ color: branding.primaryColor }}>
          Playful Template
        </h3>
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: i === 1 ? branding.primaryColor : branding.secondaryColor }}
            ></div>
          ))}
        </div>
      </div>
      <div className="p-3 flex-1">
        <div className="flex flex-wrap gap-2 mb-2">
          {["SEO", "Content", "Keywords"].map((tag, i) => (
            <span
              key={i}
              className="text-[8px] px-2 py-1 rounded-full"
              style={{
                backgroundColor:
                  i === 0 ? branding.primaryColor : i === 1 ? branding.secondaryColor : branding.accentColor,
                color: i === 2 ? branding.primaryColor : "white",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          className="w-full h-8 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
          style={{ backgroundColor: branding.primaryColor }}
        >
          Analyze Now!
        </div>
      </div>
    </div>
  )
}

// Corporate Template Preview
export function CorporateTemplatePreview({ branding }: { branding: BrandingOptions }) {
  return (
    <div className="w-full h-full overflow-hidden bg-white flex flex-col">
      <div className="p-2 border-b flex items-center gap-2" style={{ borderColor: branding.accentColor }}>
        <div className="w-4 h-4 flex items-center justify-center" style={{ backgroundColor: branding.primaryColor }}>
          <FileText className="w-2 h-2 text-white" />
        </div>
        <h3 className="text-[10px] font-medium" style={{ color: branding.primaryColor }}>
          Corporate Template
        </h3>
      </div>
      <div className="p-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="h-1 w-full" style={{ backgroundColor: branding.accentColor }}></div>
          <div className="h-1 w-3/4" style={{ backgroundColor: branding.accentColor }}></div>
          <div className="h-1 w-1/2" style={{ backgroundColor: branding.accentColor }}></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-[8px]" style={{ color: branding.secondaryColor }}>
            Professional
          </div>
          <div className="text-[8px] px-2 py-1" style={{ backgroundColor: branding.primaryColor, color: "white" }}>
            View Report
          </div>
        </div>
      </div>
    </div>
  )
}

// Elegant Template Preview
export function ElegantTemplatePreview({ branding }: { branding: BrandingOptions }) {
  return (
    <div className="w-full h-full overflow-hidden bg-white/70 backdrop-blur-md border border-white/20 shadow-sm rounded-lg flex flex-col">
      <div className="p-3 border-b border-gray-100 flex justify-center">
        <h3 className="text-sm font-serif italic" style={{ color: branding.primaryColor }}>
          Elegant Template
        </h3>
      </div>
      <div className="p-3 flex-1 flex flex-col items-center justify-center">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
          style={{ backgroundColor: branding.accentColor }}
        >
          <Share2 className="w-5 h-5" style={{ color: branding.primaryColor }} />
        </div>
        <div className="w-full h-1 mb-1" style={{ backgroundColor: branding.secondaryColor }}></div>
        <div className="w-2/3 h-1" style={{ backgroundColor: branding.secondaryColor }}></div>
      </div>
    </div>
  )
}

// Tech Template Preview
export function TechTemplatePreview({ branding }: { branding: BrandingOptions }) {
  return (
    <div className="w-full h-full overflow-hidden bg-gray-900 flex flex-col">
      <div className="p-2 border-b border-gray-700 flex items-center justify-between">
        <h3 className="text-[10px] font-mono" style={{ color: branding.primaryColor }}>
          &lt;Tech_Template/&gt;
        </h3>
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-sm"
              style={{ backgroundColor: i === 1 ? branding.primaryColor : branding.secondaryColor }}
            ></div>
          ))}
        </div>
      </div>
      <div className="p-2 flex-1">
        <div className="space-y-1 mb-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2" style={{ backgroundColor: branding.primaryColor }}></div>
            <div className="text-[8px] text-gray-400 font-mono">system.analysis</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2" style={{ backgroundColor: branding.secondaryColor }}></div>
            <div className="text-[8px] text-gray-400 font-mono">data.processing</div>
          </div>
        </div>
        <div
          className="w-full text-center text-[8px] py-1 font-mono"
          style={{ backgroundColor: branding.primaryColor, color: "white" }}
        >
          EXECUTE
        </div>
      </div>
    </div>
  )
}

// Vintage Template Preview
export function VintageTemplatePreview({ branding }: { branding: BrandingOptions }) {
  return (
    <div className="w-full h-full overflow-hidden bg-[#FFFDF8] border border-gray-200 shadow-sm flex flex-col">
      <div className="p-2 flex justify-center items-center" style={{ backgroundColor: branding.accentColor }}>
        <h3 className="text-[10px] font-serif font-bold" style={{ color: branding.primaryColor }}>
          Vintage Template
        </h3>
      </div>
      <div className="p-2 flex-1 flex flex-col justify-center items-center">
        <div
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2"
          style={{ borderColor: branding.primaryColor }}
        >
          <Sparkles className="w-4 h-4" style={{ color: branding.primaryColor }} />
        </div>
        <div
          className="text-[8px] px-3 py-1 font-serif font-bold border-b-2"
          style={{ borderColor: branding.secondaryColor, color: branding.primaryColor }}
        >
          Discover More
        </div>
      </div>
    </div>
  )
}

// Add a new PlainTemplatePreview component
export function PlainTemplatePreview({ branding }: { branding: BrandingOptions }) {
  return (
    <div className="w-full h-full overflow-hidden bg-white border border-gray-200 rounded-md flex flex-col">
      <div className="p-3 border-b border-gray-200 flex items-center">
        <h3 className="text-sm font-medium" style={{ color: branding.primaryColor }}>
          Plain Template
        </h3>
      </div>
      <div className="p-3 flex-1">
        <div className="space-y-2">
          <div className="w-full h-2 bg-gray-100 rounded-md"></div>
          <div className="w-3/4 h-2 bg-gray-100 rounded-md"></div>
          <div className="w-1/2 h-2 bg-gray-100 rounded-md"></div>
        </div>
        <div
          className="mt-4 text-xs text-center p-1 border border-gray-200 rounded-md"
          style={{ color: branding.primaryColor }}
        >
          Simple & Clean
        </div>
      </div>
    </div>
  )
}

// Update the renderTemplatePreview function to include the new template
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
    case "plain":
      return <PlainTemplatePreview branding={templateBranding} />
    default:
      return <ModernTemplatePreview branding={templateBranding} />
  }
}
