"use client"

import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { CheckCircle, Loader2, Settings, Sparkles, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PlanModalProps {
  isOpen: boolean
  onClose: () => void
  plan: {
    title: string
    description: string
    features: string[]
    toolType: string
  }
  onConfirm: (additionalFeatures: string[]) => void
  isLoading: boolean
}

export function PlanModal({ isOpen, onClose, plan, onConfirm, isLoading }: PlanModalProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const handleFeatureToggle = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature))
    } else {
      setSelectedFeatures([...selectedFeatures, feature])
    }
  }

  const handleConfirm = () => {
    onConfirm(selectedFeatures)
  }

  const additionalFeatures = [
    "Google Search Console integration",
    "Export to PDF/CSV",
    "Competitor analysis",
    "Scheduled reports",
    "Multi-language support",
    "Custom branding",
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl relative"
            >
              {/* Black background for 3D effect */}
              <div className="absolute inset-0 bg-black rounded-xl transform translate-x-4 translate-y-4"></div>

              <Dialog.Panel className="relative z-10 bg-white p-6 rounded-xl border-4 border-black shadow-xl">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={onClose}
                    className="p-1 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <Dialog.Title className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                  <div className="w-10 h-10 bg-[#FFEB3B] rounded-full flex items-center justify-center mr-3 border-2 border-black">
                    <Sparkles className="h-5 w-5 text-gray-900" />
                  </div>
                  Generation Plan
                </Dialog.Title>

                <p className="text-gray-600 mb-6">
                  We've analyzed your request and created a plan for your SEO tool. Review and customize before
                  building.
                </p>

                <div className="space-y-6">
                  <div className="p-4 bg-[#F0F4F8] rounded-lg border-2 border-black">
                    <h3 className="font-bold text-gray-900 mb-1">{plan.title}</h3>
                    <p className="text-gray-700 text-sm">{plan.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Core Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start p-3 bg-white border-2 border-black rounded-md">
                          <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-800 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Additional Features (Optional)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {additionalFeatures.map((feature, index) => (
                        <div
                          key={index}
                          className={`flex items-start p-3 rounded-md border-2 cursor-pointer transition-colors ${
                            selectedFeatures.includes(feature)
                              ? "bg-[#E3F2FD] border-[#1E88E5]"
                              : "bg-white border-gray-300 hover:border-gray-400"
                          }`}
                          onClick={() => handleFeatureToggle(feature)}
                        >
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 mr-2 ${
                              selectedFeatures.includes(feature) ? "bg-[#1E88E5] border-[#1E88E5]" : "border-gray-400"
                            }`}
                          >
                            {selectedFeatures.includes(feature) && <CheckCircle className="h-4 w-4 text-white" />}
                          </div>
                          <span className="text-gray-800 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-dashed border-gray-300">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 border-2 border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>

                    <div className="relative">
                      <div className="absolute inset-0 bg-black rounded-md transform translate-x-1 translate-y-1"></div>
                      <button
                        onClick={handleConfirm}
                        disabled={isLoading}
                        className="relative z-10 px-6 py-2 bg-[#26A69A] text-white rounded-md hover:bg-[#00897B] transition-colors border-2 border-black flex items-center"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Building...
                          </>
                        ) : (
                          <>
                            <Settings className="mr-2 h-4 w-4" />
                            Build Tool
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
