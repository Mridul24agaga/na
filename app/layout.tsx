import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI-Powered SEO Tool Generator",
  description:
    "Create customized SEO tools powered by AI to optimize your content, research keywords, generate meta tags, and more.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js" />
      </head>
      <body>{children}</body>
    </html>
  )
}
