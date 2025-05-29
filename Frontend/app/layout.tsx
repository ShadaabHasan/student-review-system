import type React from "react"
// import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Student Review System",
  description: "Automated educational feedback system for improving teaching quality",
  keywords: "education, feedback, student review, teaching quality, UGC, AICTE",
  authors: [{ name: "EduFeedback Team" }],
  viewport: "width=device-width, initial-scale=1",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased">
        <div className="relative min-h-screen bg-background">{children}</div>
      </body>
    </html>
  )
}
