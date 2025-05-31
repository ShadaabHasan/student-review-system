"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { Loader2 } from "lucide-react"
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
        <Loader2
          style={{ height: "2rem", width: "2rem", animation: "spin 1s linear infinite", color: "hsl(var(--primary))" }}
        />
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
