import type React from "react"
import { formatDistanceToNow } from "date-fns"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

type HistoryItem = {
  id: string
  prompt: string
  date: string
  toolConfig: {
    title: string
    toolType: string
  }
}

interface ToolHistoryProps {
  history: HistoryItem[]
}

export function ToolHistory({ history }: ToolHistoryProps) {
  const getToolTypeIcon = (toolType: string) => {
    const iconClasses = "h-4 w-4"

    switch (toolType) {
      case "keyword":
        return <KeywordIcon className={iconClasses} />
      case "blog":
        return <BlogIcon className={iconClasses} />
      case "meta":
        return <MetaIcon className={iconClasses} />
      case "local":
        return <LocalIcon className={iconClasses} />
      case "ecommerce":
        return <EcommerceIcon className={iconClasses} />
      default:
        return <GenericIcon className={iconClasses} />
    }
  }

  const getToolTypeColor = (toolType: string) => {
    switch (toolType) {
      case "keyword":
        return "#E3F2FD"
      case "blog":
        return "#E8F5E9"
      case "meta":
        return "#FFF3E0"
      case "local":
        return "#E0F2F1"
      case "ecommerce":
        return "#FBE9E7"
      default:
        return "#F5F5F5"
    }
  }

  return (
    <div className="space-y-3">
      {history.map((item) => (
        <div key={item.id} className="relative">
          <div className="absolute inset-0 bg-black rounded-lg transform translate-x-1 translate-y-1"></div>
          <div className="relative z-10 bg-white p-4 rounded-lg border-2 border-black hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-0.5 border-2 border-black flex-shrink-0"
                  style={{ backgroundColor: getToolTypeColor(item.toolConfig.toolType) }}
                >
                  {getToolTypeIcon(item.toolConfig.toolType)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.toolConfig.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-1 mt-1">{item.prompt}</p>
                </div>
              </div>
              <Link
                href={`/c/${item.id}`}
                className="ml-4 flex-shrink-0 flex items-center px-3 py-1 bg-[#FFEB3B] text-gray-900 rounded-md hover:bg-[#FDD835] transition-colors text-sm border-2 border-black"
              >
                Open
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </div>
            <div className="flex justify-between mt-3 pt-2 border-t border-dashed border-gray-200">
              <span className="text-xs text-gray-500">Created {formatDistanceToNow(new Date(item.date))} ago</span>
              <span className="text-xs font-medium capitalize">{item.toolConfig.toolType} Tool</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Custom icons
function KeywordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
  )
}

function BlogIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
    </svg>
  )
}

function MetaIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
      <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
      <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  )
}

function LocalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  )
}

function EcommerceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
      <path d="M3 6h18"></path>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  )
}

function GenericIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
      <line x1="16" y1="8" x2="2" y2="22"></line>
      <line x1="17.5" y1="15" x2="9" y2="15"></line>
    </svg>
  )
}
