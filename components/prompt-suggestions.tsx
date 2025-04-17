"use client"

import { motion } from "framer-motion"

interface PromptSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void
}

export function PromptSuggestions({ onSuggestionClick }: PromptSuggestionsProps) {
  const suggestions = [
    {
      text: "Create a keyword research tool for blog posts about sustainable living with focus on eco-friendly home products",
      category: "Keyword Research",
    },
    {
      text: "Build an SEO content optimizer for e-commerce product descriptions for handmade leather goods",
      category: "Content Optimization",
    },
    {
      text: "Generate meta tags for a local plumbing business website serving the Seattle area",
      category: "Meta Tags",
    },
    {
      text: "Create a blog post SEO analyzer for my article about the benefits of intermittent fasting",
      category: "Blog SEO",
    },
    {
      text: "Build a local SEO tool for my Italian restaurant in Chicago that helps with Google Business Profile",
      category: "Local SEO",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3"
    >
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Example prompts:</h4>
      <div className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="cursor-pointer group"
            onClick={() => onSuggestionClick(suggestion.text)}
          >
            <div className="p-2 rounded-md hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors">
              <div className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-1">{suggestion.category}</div>
              <div className="text-sm text-gray-800 dark:text-gray-200 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                {suggestion.text}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
