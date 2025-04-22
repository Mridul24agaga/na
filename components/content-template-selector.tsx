"use client"

import { useState } from "react"
import { Check, FileText, Target, Users, Globe, Zap, X } from 'lucide-react'

export interface ContentTemplate {
  id: string
  name: string
  description: string
  toneOfVoice: string
  targetAudience: string
  contentLength: string
  seoFocus: string
  exampleText: string
}

export interface ContentOptions {
  template: string
  toneOfVoice: string
  targetAudience: string
  contentLength: string
  seoFocus: string
  keywords: string[]
  industry: string
}

interface ContentTemplateSelectorProps {
  selectedTemplate: string
  onTemplateChange: (templateId: string) => void
  onContentOptionsChange: (options: Partial<ContentOptions>) => void
  contentOptions: ContentOptions
}

export function ContentTemplateSelector({
  selectedTemplate,
  onTemplateChange,
  onContentOptionsChange,
  contentOptions,
}: ContentTemplateSelectorProps) {
  const [activeTab, setActiveTab] = useState<"templates" | "tone" | "audience" | "seo">("templates")
  const [keyword, setKeyword] = useState("")

  // Predefined content templates
  const templates: ContentTemplate[] = [
    {
      id: "professional",
      name: "Professional & Authoritative",
      description: "Formal, expert tone with data-backed insights for business professionals",
      toneOfVoice: "formal",
      targetAudience: "business",
      contentLength: "medium",
      seoFocus: "informational",
      exampleText:
        "Our comprehensive analysis reveals that implementing structured data can increase organic click-through rates by 30% on average.",
    },
    {
      id: "conversational",
      name: "Conversational & Friendly",
      description: "Approachable, casual tone that speaks directly to the reader",
      toneOfVoice: "casual",
      targetAudience: "general",
      contentLength: "medium",
      seoFocus: "mixed",
      exampleText:
        "Hey there! Looking to boost your website's visibility? Let's talk about some simple SEO tricks that can make a huge difference.",
    },
    {
      id: "educational",
      name: "Educational & Informative",
      description: "Clear, instructional content focused on teaching concepts",
      toneOfVoice: "instructional",
      targetAudience: "learners",
      contentLength: "long",
      seoFocus: "informational",
      exampleText:
        "In this guide, we'll explore the fundamentals of keyword research, starting with understanding search intent and progressing to advanced competitive analysis techniques.",
    },
    {
      id: "persuasive",
      name: "Persuasive & Compelling",
      description: "Convincing content designed to drive action and conversions",
      toneOfVoice: "persuasive",
      targetAudience: "customers",
      contentLength: "short",
      seoFocus: "commercial",
      exampleText:
        "Don't let your competitors outrank you. Our proven SEO strategies have helped businesses like yours achieve 200% growth in organic traffic within just 3 months.",
    },
    {
      id: "technical",
      name: "Technical & Detailed",
      description: "In-depth, precise content for technical audiences and specialists",
      toneOfVoice: "technical",
      targetAudience: "experts",
      contentLength: "long",
      seoFocus: "informational",
      exampleText:
        "Our implementation utilizes advanced semantic analysis algorithms to identify latent keyword opportunities and optimize content based on TF-IDF analysis and entity recognition.",
    },
    {
      id: "creative",
      name: "Creative & Engaging",
      description: "Imaginative, story-driven content that captures attention",
      toneOfVoice: "creative",
      targetAudience: "general",
      contentLength: "medium",
      seoFocus: "brand",
      exampleText:
        "Imagine a world where your content always finds its audience. Where every word you write becomes a magnet for the right readers. That's the power of strategic SEO storytelling.",
    },
  ]

  // Tone of voice options
  const toneOptions = [
    { id: "formal", name: "Formal", description: "Professional, authoritative, and structured" },
    { id: "casual", name: "Casual", description: "Friendly, approachable, and conversational" },
    { id: "instructional", name: "Instructional", description: "Clear, step-by-step, and educational" },
    { id: "persuasive", name: "Persuasive", description: "Compelling, action-oriented, and convincing" },
    { id: "technical", name: "Technical", description: "Detailed, precise, and specialized" },
    { id: "creative", name: "Creative", description: "Imaginative, engaging, and story-driven" },
  ]

  // Target audience options
  const audienceOptions = [
    { id: "general", name: "General Audience", description: "Broad appeal for diverse readers" },
    { id: "business", name: "Business Professionals", description: "Decision-makers and corporate audience" },
    { id: "experts", name: "Industry Experts", description: "Specialists with deep domain knowledge" },
    { id: "learners", name: "Learners & Students", description: "People seeking educational content" },
    { id: "customers", name: "Potential Customers", description: "Prospects in the buying journey" },
    { id: "technical", name: "Technical Users", description: "Developers, engineers, and technical staff" },
  ]

  // Content length options
  const lengthOptions = [
    { id: "short", name: "Short & Concise", description: "Brief, to-the-point content (300-500 words)" },
    { id: "medium", name: "Medium Length", description: "Balanced content (800-1200 words)" },
    { id: "long", name: "Comprehensive", description: "In-depth, detailed content (1500+ words)" },
  ]

  // SEO focus options
  const seoFocusOptions = [
    { id: "informational", name: "Informational", description: "Educational content answering questions" },
    { id: "commercial", name: "Commercial", description: "Product or service-focused content" },
    { id: "navigational", name: "Navigational", description: "Content helping users find specific resources" },
    { id: "transactional", name: "Transactional", description: "Content focused on conversions and sales" },
    { id: "brand", name: "Brand Building", description: "Content focused on brand awareness and identity" },
    { id: "mixed", name: "Mixed Intent", description: "Content addressing multiple user intents" },
  ]

  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      onTemplateChange(templateId)
      onContentOptionsChange({
        template: templateId,
        toneOfVoice: template.toneOfVoice,
        targetAudience: template.targetAudience,
        contentLength: template.contentLength,
        seoFocus: template.seoFocus,
      })
    }
  }

  // Add keyword to the list
  const addKeyword = () => {
    if (keyword.trim() && !contentOptions.keywords.includes(keyword.trim())) {
      onContentOptionsChange({
        keywords: [...contentOptions.keywords, keyword.trim()],
      })
      setKeyword("")
    }
  }

  // Remove keyword from the list
  const removeKeyword = (keywordToRemove: string) => {
    onContentOptionsChange({
      keywords: contentOptions.keywords.filter((k) => k !== keywordToRemove),
    })
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
            activeTab === "tone" ? "text-[#FF7043] border-b-2 border-[#FF7043]" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("tone")}
        >
          Tone & Voice
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "audience"
              ? "text-[#FF7043] border-b-2 border-[#FF7043]"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("audience")}
        >
          Audience
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "seo" ? "text-[#FF7043] border-b-2 border-[#FF7043]" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("seo")}
        >
          SEO Focus
        </button>
      </div>

      {/* Templates Tab */}
      {activeTab === "templates" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  selectedTemplate === template.id
                    ? "border-[#FF7043] ring-2 ring-[#FF7043] ring-opacity-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                    <div className="mt-3 p-3 bg-gray-50 rounded text-sm italic text-gray-600 border border-gray-200">
                      "{template.exampleText}"
                    </div>
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="absolute top-3 right-3 bg-[#FF7043] text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tone & Voice Tab */}
      {activeTab === "tone" && (
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Tone of Voice</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {toneOptions.map((tone) => (
                <div
                  key={tone.id}
                  onClick={() => onContentOptionsChange({ toneOfVoice: tone.id })}
                  className={`cursor-pointer p-3 rounded-lg border-2 ${
                    contentOptions.toneOfVoice === tone.id
                      ? "border-[#FF7043] bg-[#FFF3E0]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${
                        contentOptions.toneOfVoice === tone.id ? "border-[#FF7043] bg-[#FF7043]" : "border-gray-400"
                      }`}
                    >
                      {contentOptions.toneOfVoice === tone.id && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className="font-medium text-gray-900">{tone.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-6">{tone.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-dashed border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">Content Length</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {lengthOptions.map((length) => (
                <div
                  key={length.id}
                  onClick={() => onContentOptionsChange({ contentLength: length.id })}
                  className={`cursor-pointer p-3 rounded-lg border-2 ${
                    contentOptions.contentLength === length.id
                      ? "border-[#FF7043] bg-[#FFF3E0]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${
                        contentOptions.contentLength === length.id ? "border-[#FF7043] bg-[#FF7043]" : "border-gray-400"
                      }`}
                    >
                      {contentOptions.contentLength === length.id && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className="font-medium text-gray-900">{length.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-6">{length.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Audience Tab */}
      {activeTab === "audience" && (
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Target Audience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {audienceOptions.map((audience) => (
                <div
                  key={audience.id}
                  onClick={() => onContentOptionsChange({ targetAudience: audience.id })}
                  className={`cursor-pointer p-3 rounded-lg border-2 ${
                    contentOptions.targetAudience === audience.id
                      ? "border-[#FF7043] bg-[#FFF3E0]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${
                        contentOptions.targetAudience === audience.id
                          ? "border-[#FF7043] bg-[#FF7043]"
                          : "border-gray-400"
                      }`}
                    >
                      {contentOptions.targetAudience === audience.id && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className="font-medium text-gray-900">{audience.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-6">{audience.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-dashed border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">Industry Focus</h3>
            <p className="text-sm text-gray-500 mb-3">
              Your industry selection from the Style tab: <span className="font-medium">{contentOptions.industry || "Not selected"}</span>
            </p>
            <p className="text-sm text-gray-600">
              The content will be tailored to match the specific needs and terminology of your selected industry.
            </p>
          </div>
        </div>
      )}

      {/* SEO Focus Tab */}
      {activeTab === "seo" && (
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">SEO Content Focus</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {seoFocusOptions.map((focus) => (
                <div
                  key={focus.id}
                  onClick={() => onContentOptionsChange({ seoFocus: focus.id })}
                  className={`cursor-pointer p-3 rounded-lg border-2 ${
                    contentOptions.seoFocus === focus.id
                      ? "border-[#FF7043] bg-[#FFF3E0]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${
                        contentOptions.seoFocus === focus.id ? "border-[#FF7043] bg-[#FF7043]" : "border-gray-400"
                      }`}
                    >
                      {contentOptions.seoFocus === focus.id && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className="font-medium text-gray-900">{focus.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-6">{focus.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-dashed border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">Target Keywords</h3>
            <div className="space-y-3">
              <div className="flex">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="flex-1 p-2 border-2 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#FF7043] focus:border-transparent"
                  placeholder="Enter a keyword"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addKeyword()
                    }
                  }}
                />
                <button
                  onClick={addKeyword}
                  className="px-4 py-2 bg-[#FF7043] text-white rounded-r-md hover:bg-[#F4511E] transition-colors border-2 border-[#FF7043]"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {contentOptions.keywords.map((kw, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-[#FFF3E0] px-3 py-1 rounded-full border border-[#FF7043]"
                  >
                    <span className="text-sm text-gray-800">{kw}</span>
                    <button
                      onClick={() => removeKeyword(kw)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {contentOptions.keywords.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No keywords added yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
