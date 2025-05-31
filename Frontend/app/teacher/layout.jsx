"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { TeacherSidebar } from "@/components/teacher-sidebar"

export default function TeacherLayout({ children }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== "teacher") {
        setShouldRedirect(true)
        const timer = setTimeout(() => {
          router.push("/login")
        }, 100)
        return () => clearTimeout(timer)
      } else {
        setShouldRedirect(false)
      }
    }
  }, [user, isLoading, router])

  if (isLoading || shouldRedirect) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="spinner"></div>
      </div>
    )
  }

  if (!user || user.role !== "teacher") {
    return null
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <TeacherSidebar />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )
}
