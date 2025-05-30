import React from "react"
// import "./global.css"

export const metadata = {
  title: "Student Review System",
  description: "Advanced educational feedback system for improving teaching quality",
  keywords: "education, feedback, student review, teaching quality, UGC, AICTE",
  authors: [{ name: "EduFeedback Team" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased">
        <div id="root" className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  )
}
