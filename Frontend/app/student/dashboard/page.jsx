"use client"

import { useAuth } from "@/lib/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockSubjects, mockFeedback, mockTeachers } from "@/lib/auth-provider"

export default function StudentDashboard() {
  const { user } = useAuth()

  // Count feedback given by this student
  const feedbackCount = mockFeedback.filter((f) => f.studentId === user?.id).length

  // Count unique subjects the student has given feedback for
  const uniqueSubjectsWithFeedback = new Set(
    mockFeedback.filter((f) => f.studentId === user?.id).map((f) => f.subjectId),
  )

  // Get recent feedback
  const recentFeedback = mockFeedback
    .filter((f) => f.studentId === user?.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return (
    <div style={{ padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>Student Dashboard</h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Welcome back, {user?.name}</h2>
        <p style={{ color: "hsl(var(--muted-foreground))" }}>
          This is your dashboard where you can view your feedback history and select subjects to provide new feedback.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        <Card>
          <CardHeader style={{ paddingBottom: "0.5rem" }}>
            <CardTitle>Total Feedback</CardTitle>
            <CardDescription>Feedback you've provided</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{feedbackCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader style={{ paddingBottom: "0.5rem" }}>
            <CardTitle>Subjects Rated</CardTitle>
            <CardDescription>Unique subjects with feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{uniqueSubjectsWithFeedback.size}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader style={{ paddingBottom: "0.5rem" }}>
            <CardTitle>Available Subjects</CardTitle>
            <CardDescription>Subjects you can rate</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{mockSubjects.length}</p>
          </CardContent>
        </Card>
      </div>

      <h2 style={{ marginBottom: "1rem", marginTop: "2rem", fontSize: "1.25rem", fontWeight: "600" }}>
        Your Recent Feedback
      </h2>
      {recentFeedback.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {recentFeedback.map((feedback) => {
            const subject = mockSubjects.find((s) => s.id === feedback.subjectId)
            const teacher = subject ? mockTeachers.find((t) => t.id === subject.teacherId) : null

            return (
              <Card key={feedback.id}>
                <CardContent style={{ padding: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <h3 style={{ fontWeight: "500" }}>{subject?.name}</h3>
                      <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
                        Teacher: {teacher?.name}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          borderRadius: "9999px",
                          backgroundColor: "hsl(var(--primary) / 0.1)",
                          padding: "0.125rem 0.625rem",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "hsl(var(--primary))",
                        }}
                      >
                        Rating: {feedback.rating}/5
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>{feedback.date}</p>
                    </div>
                  </div>
                  <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>{feedback.comment}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent style={{ padding: "1rem", textAlign: "center" }}>
            <p style={{ color: "hsl(var(--muted-foreground))" }}>You haven't provided any feedback yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
