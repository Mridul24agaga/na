"use client"

import { motion } from "framer-motion"

interface LoadingAnimationProps {
  text?: string
}

export function LoadingAnimation({ text = "Loading..." }: LoadingAnimationProps) {
  return (
    <div className="flex items-center">
      <div className="relative h-5 w-5 mr-3">
        <motion.div
          className="absolute top-0 left-0 h-full w-full rounded-full border-2 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
      <span>{text}</span>
    </div>
  )
}
