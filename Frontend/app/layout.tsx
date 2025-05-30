import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "EduFeedback - Student Review System",
  description: "Advanced educational feedback system for improving teaching quality",
  keywords: "education, feedback, student review, teaching quality, UGC, AICTE",
  authors: [{ name: "EduFeedback Team" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-normal antialiased">
        <div id="root" className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  )
}
