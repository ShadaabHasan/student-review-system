"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { TeacherSidebar } from "@/components/teacher-sidebar"

export default function TeacherLayout({ children }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "teacher")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
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

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <TeacherSidebar />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )
}
