"use client"

import { motion } from "framer-motion"
import { Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

interface ToolHistoryProps {
  history: any[]
  onItemClick?: (item: any) => void
}

export function ToolHistory({ history, onItemClick }: ToolHistoryProps) {
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
  }

  // Truncate prompt if too long
  const truncatePrompt = (prompt: string, maxLength = 60) => {
    if (prompt.length <= maxLength) return prompt
    return prompt.substring(0, maxLength) + "..."
  }

  return (
    <div className="space-y-3">
      {history.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="cursor-pointer group"
        >
          {onItemClick ? (
            // If onItemClick is provided, use it (for backward compatibility)
            <div
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              onClick={() => onItemClick(item)}
            >
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                  {truncatePrompt(item.prompt)}
                </div>
                <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDate(item.date)}
                  <span className="mx-2">•</span>
                  <span className="capitalize">{item.toolConfig.toolType} Tool</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
            </div>
          ) : (
            // Otherwise, use Link to navigate to the tool page
            <Link href={`/c/${item.id}`}>
              <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                    {truncatePrompt(item.prompt)}
                  </div>
                  <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(item.date)}
                    <span className="mx-2">•</span>
                    <span className="capitalize">{item.toolConfig.toolType} Tool</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
              </div>
            </Link>
          )}
        </motion.div>
      ))}
    </div>
  )
}
