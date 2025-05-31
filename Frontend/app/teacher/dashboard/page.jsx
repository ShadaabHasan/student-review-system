"use client"

import { useAuth } from "@/lib/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockFeedback } from "@/lib/auth-provider"
import { Button } from "@/components/ui/button"

// Simple pie chart component
const SimplePieChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  if (total === 0) {
    return (
      <div
        style={{
          display: "flex",
          height: "300px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "hsl(var(--muted-foreground))" }}>No feedback data available</p>
      </div>
    )
  }

  let cumulativePercentage = 0

  return (
    <div
      style={{
        display: "flex",
        height: "300px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "relative", height: "192px", width: "192px" }}>
        <svg style={{ height: "100%", width: "100%" }} viewBox="0 0 100 100">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            const startAngle = (cumulativePercentage / 100) * 360
            const endAngle = ((cumulativePercentage + percentage) / 100) * 360

            const startAngleRad = (startAngle * Math.PI) / 180
            const endAngleRad = (endAngle * Math.PI) / 180

            const largeArcFlag = percentage > 50 ? 1 : 0

            const x1 = 50 + 40 * Math.cos(startAngleRad)
            const y1 = 50 + 40 * Math.sin(startAngleRad)
            const x2 = 50 + 40 * Math.cos(endAngleRad)
            const y2 = 50 + 40 * Math.sin(endAngleRad)

            const pathData = [`M 50 50`, `L ${x1} ${y1}`, `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`, "Z"].join(" ")

            cumulativePercentage += percentage

            return <path key={index} d={pathData} fill={item.color} stroke="white" strokeWidth="1" />
          })}
        </svg>
      </div>
      <div style={{ marginLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                marginRight: "0.5rem",
                height: "0.75rem",
                width: "0.75rem",
                borderRadius: "50%",
                backgroundColor: item.color,
              }}
            ></div>
            <span style={{ fontSize: "0.875rem" }}>
              {item.name}: {item.value} ({total > 0 ? Math.round((item.value / total) * 100) : 0}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TeacherDashboard() {
  const { user } = useAuth()

  // Filter feedback for this teacher
  const teacherFeedback = mockFeedback.filter((f) => f.teacherId === user?.id)

  // Count feedback by sentiment
  const positiveFeedback = teacherFeedback.filter((f) => f.sentiment === "positive").length
  const neutralFeedback = teacherFeedback.filter((f) => f.sentiment === "neutral").length
  const negativeFeedback = teacherFeedback.filter((f) => f.sentiment === "negative").length

  // Calculate average rating
  const averageRating =
    teacherFeedback.length > 0
      ? (teacherFeedback.reduce((sum, f) => sum + f.rating, 0) / teacherFeedback.length).toFixed(1)
      : "N/A"

  // Get recent comments for each sentiment
  const getRecentComments = (sentiment, limit = 5) => {
    return teacherFeedback
      .filter((f) => f.sentiment === sentiment)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)
  }

  const recentPositive = getRecentComments("positive")
  const recentNeutral = getRecentComments("neutral")
  const recentNegative = getRecentComments("negative")

  // Generate improvement suggestions based on negative feedback
  const generateSuggestions = () => {
    if (negativeFeedback === 0) {
      return ["You're doing great! Keep up the good work."]
    }

    const suggestions = []

    // Check for common themes in negative feedback
    const negativeComments = teacherFeedback
      .filter((f) => f.sentiment === "negative")
      .map((f) => f.comment.toLowerCase())

    if (negativeComments.some((c) => c.includes("fast") || c.includes("pace") || c.includes("quick"))) {
      suggestions.push("Consider slowing down the pace of your lectures to ensure all students can follow along.")
    }

    if (negativeComments.some((c) => c.includes("explain") || c.includes("clarity") || c.includes("understand"))) {
      suggestions.push("Work on explaining complex concepts more clearly, perhaps using more visual aids or examples.")
    }

    if (negativeComments.some((c) => c.includes("example") || c.includes("practical"))) {
      suggestions.push("Include more practical examples and real-world applications in your teaching.")
    }

    if (negativeComments.some((c) => c.includes("material") || c.includes("content") || c.includes("outdated"))) {
      suggestions.push("Consider updating your course materials to reflect current industry standards and practices.")
    }

    if (suggestions.length === 0) {
      suggestions.push("Review your negative feedback comments for specific areas of improvement.")
    }

    return suggestions
  }

  const improvementSuggestions = generateSuggestions()

  return (
    <div style={{ padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>Teacher Dashboard</h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Welcome back, {user?.name}</h2>
        <p style={{ color: "hsl(var(--muted-foreground))" }}>
          This is your dashboard where you can view student feedback and suggestions for improvement.
        </p>
      </div>

      <div
        style={{
          marginBottom: "2rem",
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        <Card>
          <CardHeader style={{ paddingBottom: "0.5rem" }}>
            <CardTitle>Total Feedback</CardTitle>
            <CardDescription>Feedback received from students</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{teacherFeedback.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader style={{ paddingBottom: "0.5rem" }}>
            <CardTitle>Average Rating</CardTitle>
            <CardDescription>Your overall rating</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{averageRating}/5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader style={{ paddingBottom: "0.5rem" }}>
            <CardTitle>Positive Feedback</CardTitle>
            <CardDescription>Percentage of positive feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>
              {teacherFeedback.length > 0 ? `${Math.round((positiveFeedback / teacherFeedback.length) * 100)}%` : "N/A"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div
        style={{
          marginBottom: "2rem",
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Feedback Distribution</CardTitle>
            <CardDescription>Breakdown of student feedback by sentiment</CardDescription>
          </CardHeader>
          <CardContent>
            <SimplePieChart
              data={[
                { name: "Positive", value: positiveFeedback, color: "#10b981" },
                { name: "Neutral", value: neutralFeedback, color: "#6b7280" },
                { name: "Negative", value: negativeFeedback, color: "#ef4444" },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Improvement Suggestions</CardTitle>
            <CardDescription>Based on student feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {improvementSuggestions.map((suggestion, index) => (
                <li key={index} style={{ display: "flex", alignItems: "flex-start" }}>
                  <span
                    style={{
                      marginRight: "0.5rem",
                      display: "flex",
                      height: "1.5rem",
                      width: "1.5rem",
                      flexShrink: 0,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      backgroundColor: "hsl(var(--primary) / 0.1)",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "hsl(var(--primary))",
                    }}
                  >
                    {index + 1}
                  </span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Recent Feedback</h2>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        }}
      >
        <Card>
          <CardHeader style={{ backgroundColor: "rgb(236 253 245)", padding: "1rem" }}>
            <CardTitle style={{ display: "flex", alignItems: "center", color: "#059669" }}>
              <div
                style={{
                  marginRight: "0.5rem",
                  height: "0.75rem",
                  width: "0.75rem",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                }}
              ></div>
              Positive Feedback
            </CardTitle>
            <CardDescription>Recent positive comments from students</CardDescription>
          </CardHeader>
          <CardContent style={{ padding: 0 }}>
            {recentPositive.length > 0 ? (
              <ul style={{ borderTop: "1px solid hsl(var(--border))" }}>
                {recentPositive.map((feedback) => (
                  <li key={feedback.id} style={{ padding: "1rem", borderBottom: "1px solid hsl(var(--border))" }}>
                    <p style={{ marginBottom: "0.25rem", fontSize: "0.875rem" }}>{feedback.comment}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          borderRadius: "9999px",
                          backgroundColor: "#dcfce7",
                          padding: "0.125rem 0.625rem",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          color: "#166534",
                        }}
                      >
                        Rating: {feedback.rating}/5
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
                        {feedback.date}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                No positive feedback yet
              </p>
            )}
          </CardContent>
          <div style={{ borderTop: "1px solid hsl(var(--border))", padding: "1rem" }}>
            <Button variant="outline" style={{ width: "100%" }} disabled={recentPositive.length === 0}>
              View All Positive Feedback
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader style={{ backgroundColor: "rgb(249 250 251)", padding: "1rem" }}>
            <CardTitle style={{ display: "flex", alignItems: "center", color: "#6b7280" }}>
              <div
                style={{
                  marginRight: "0.5rem",
                  height: "0.75rem",
                  width: "0.75rem",
                  borderRadius: "50%",
                  backgroundColor: "#6b7280",
                }}
              ></div>
              Neutral Feedback
            </CardTitle>
            <CardDescription>Recent neutral comments from students</CardDescription>
          </CardHeader>
          <CardContent style={{ padding: 0 }}>
            {recentNeutral.length > 0 ? (
              <ul style={{ borderTop: "1px solid hsl(var(--border))" }}>
                {recentNeutral.map((feedback) => (
                  <li key={feedback.id} style={{ padding: "1rem", borderBottom: "1px solid hsl(var(--border))" }}>
                    <p style={{ marginBottom: "0.25rem", fontSize: "0.875rem" }}>{feedback.comment}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          borderRadius: "9999px",
                          backgroundColor: "#f3f4f6",
                          padding: "0.125rem 0.625rem",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          color: "#374151",
                        }}
                      >
                        Rating: {feedback.rating}/5
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
                        {feedback.date}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                No neutral feedback yet
              </p>
            )}
          </CardContent>
          <div style={{ borderTop: "1px solid hsl(var(--border))", padding: "1rem" }}>
            <Button variant="outline" style={{ width: "100%" }} disabled={recentNeutral.length === 0}>
              View All Neutral Feedback
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader style={{ backgroundColor: "rgb(254 242 242)", padding: "1rem" }}>
            <CardTitle style={{ display: "flex", alignItems: "center", color: "#dc2626" }}>
              <div
                style={{
                  marginRight: "0.5rem",
                  height: "0.75rem",
                  width: "0.75rem",
                  borderRadius: "50%",
                  backgroundColor: "#ef4444",
                }}
              ></div>
              Negative Feedback
            </CardTitle>
            <CardDescription>Recent negative comments from students</CardDescription>
          </CardHeader>
          <CardContent style={{ padding: 0 }}>
            {recentNegative.length > 0 ? (
              <ul style={{ borderTop: "1px solid hsl(var(--border))" }}>
                {recentNegative.map((feedback) => (
                  <li key={feedback.id} style={{ padding: "1rem", borderBottom: "1px solid hsl(var(--border))" }}>
                    <p style={{ marginBottom: "0.25rem", fontSize: "0.875rem" }}>{feedback.comment}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          borderRadius: "9999px",
                          backgroundColor: "#fee2e2",
                          padding: "0.125rem 0.625rem",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          color: "#991b1b",
                        }}
                      >
                        Rating: {feedback.rating}/5
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>
                        {feedback.date}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                No negative feedback yet
              </p>
            )}
          </CardContent>
          <div style={{ borderTop: "1px solid hsl(var(--border))", padding: "1rem" }}>
            <Button variant="outline" style={{ width: "100%" }} disabled={recentNegative.length === 0}>
              View All Negative Feedback
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
