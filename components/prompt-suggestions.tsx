"use client"

import { motion } from "framer-motion"
import { CheckCircle, Sparkles, Zap, Search, BarChart, MapPin } from 'lucide-react'
import Image from "next/image"

interface PromptSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void
}

export function PromptSuggestions({ onSuggestionClick }: PromptSuggestionsProps) {
  const suggestions = [
    {
      text: "Create a keyword research tool for blog posts about sustainable living with focus on eco-friendly home products",
      category: "Keyword Research",
      icon: <Search className="h-4 w-4 text-[#1E88E5]" />,
      color: "#E3F2FD"
    },
    {
      text: "Build an SEO content optimizer for e-commerce product descriptions for handmade leather goods",
      category: "Content Optimization",
      icon: <Sparkles className="h-4 w-4 text-[#43A047]" />,
      color: "#E8F5E9"
    },
    {
      text: "Generate meta tags for a local plumbing business website serving the Seattle area",
      category: "Meta Tags",
      icon: <CheckCircle className="h-4 w-4 text-[#FB8C00]" />,
      color: "#FFF3E0"
    },
    {
      text: "Create a blog post SEO analyzer for my article about the benefits of intermittent fasting",
      category: "Blog SEO",
      icon: <BarChart className="h-4 w-4 text-[#00897B]" />,
      color: "#E0F2F1"
    },
    {
      text: "Build a local SEO tool for my Italian restaurant in Chicago that helps with Google Business Profile",
      category: "Local SEO",
      icon: <MapPin className="h-4 w-4 text-[#E64A19]" />,
      color: "#FBE9E7"
    },
  ]

  return (
    <div className="relative z-10 font-['Poppins']">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="relative z-10 w-full bg-white dark:bg-[#FFF8E1] rounded-lg border-4 border-black p-4 shadow-lg"
      >
        {/* Decorative elements */}
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#FF7043] rounded-full flex items-center justify-center border-2 border-black">
          <Zap className="h-4 w-4 text-white" />
        </div>
        
        <div className="absolute -z-10 -bottom-2 -right-2 w-full h-full bg-black rounded-lg"></div>
        
        <div className="absolute -z-20 top-[20%] right-[5%] w-[100px] h-[100px] opacity-10">
          <Image
            src="/images/orange-blob.png"
            alt="Decorative blob"
            width={100}
            height={100}
            className="w-full h-auto"
          />
        </div>
        
        <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
          <span className="inline-block px-2 py-0.5 bg-[#FFEB3B] text-gray-900 rounded-full text-xs font-medium mr-2 border-2 border-black">
            Pro Tips
          </span>
          Example prompts to get you started:
        </h4>
        
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative cursor-pointer group"
              onClick={() => onSuggestionClick(suggestion.text)}
            >
              <div className="absolute -z-10 -bottom-1 -right-1 w-full h-full bg-black rounded-md"></div>
              <div className="p-3 rounded-md border-2 border-black bg-white hover:bg-gray-50 transition-colors">
                <div className="flex items-center mb-1.5">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center mr-2 border-2 border-black"
                    style={{ backgroundColor: suggestion.color }}
                  >
                    {suggestion.icon}
                  </div>
                  <div className="text-xs font-bold text-gray-900">{suggestion.category}</div>
                </div>
                <div className="text-sm text-gray-800 group-hover:text-[#FF7043] transition-colors">
                  {suggestion.text}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t-2 border-dashed border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-600">Click any prompt to use it</div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#FFEB3B] rounded-full border border-black mr-1"></div>
              <div className="w-4 h-4 bg-[#26A69A] rounded-full border border-black mr-1"></div>
              <div className="w-4 h-4 bg-[#FF7043] rounded-full border border-black"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
