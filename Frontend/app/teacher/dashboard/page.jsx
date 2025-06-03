"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-provider"
import Link from "next/link"

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
        <p className="text-muted">No feedback data available</p>
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
            <span className="text-sm">
              {item.name}: {item.value} ({total > 0 ? Math.round((item.value / total) * 100) : 0}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TeacherDashboard() {
  const { user, getFeedback, getSubjects } = useAuth()
  const [feedback, setFeedback] = useState([])
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFeedback = async () => {
      if (user) {
        try {
          const [feedbackData, subjectsData] = await Promise.all([
            getFeedback({ teacherId: user.id }),
            getSubjects({ teacherId: user.id }),
          ])
          setFeedback(feedbackData)
          setSubjects(subjectsData)
        } catch (error) {
          console.error("Error loading feedback:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    loadFeedback()
  }, [user, getFeedback, getSubjects])

  if (loading) {
    return (
      <div className="p-6">
        <div className="spinner"></div>
      </div>
    )
  }

  // Count feedback by sentiment
  const positiveFeedback = feedback.filter((f) => f.sentiment === "positive").length
  const neutralFeedback = feedback.filter((f) => f.sentiment === "neutral").length
  const negativeFeedback = feedback.filter((f) => f.sentiment === "negative").length

  // Calculate average rating
  const averageRating =
    feedback.length > 0 ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1) : "N/A"

  // Get recent comments for each sentiment
  const getRecentComments = (sentiment, limit = 5) => {
    return feedback
      .filter((f) => f.sentiment === sentiment)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit)
  }

  const recentPositive = getRecentComments("positive")
  const recentNeutral = getRecentComments("neutral")
  const recentNegative = getRecentComments("negative")

  // Generate improvement suggestions based on negative feedback
  // const generateSuggestions = () => {
  //   if (negativeFeedback === 0) {
  //     return ["You're doing great! Keep up the good work."]
  //   }

  //   const suggestions = []

  //   // Check for common themes in negative feedback
  //   const negativeComments = feedback.filter((f) => f.sentiment === "negative").map((f) => f.comment.toLowerCase())

  //   if (negativeComments.some((c) => c.includes("fast") || c.includes("pace") || c.includes("quick"))) {
  //     suggestions.push("Consider slowing down the pace of your lectures to ensure all students can follow along.")
  //   }

  //   if (negativeComments.some((c) => c.includes("explain") || c.includes("clarity") || c.includes("understand"))) {
  //     suggestions.push("Work on explaining complex concepts more clearly, perhaps using more visual aids or examples.")
  //   }

  //   if (negativeComments.some((c) => c.includes("example") || c.includes("practical"))) {
  //     suggestions.push("Include more practical examples and real-world applications in your teaching.")
  //   }

  //   if (negativeComments.some((c) => c.includes("material") || c.includes("content") || c.includes("outdated"))) {
  //     suggestions.push("Consider updating your course materials to reflect current industry standards and practices.")
  //   }

  //   if (suggestions.length === 0) {
  //     suggestions.push("Review your negative feedback comments for specific areas of improvement.")
  //   }

  //   return suggestions
  // }

  // const improvementSuggestions = generateSuggestions()

   const SuggestionsList = ({teacherId}) => {
    const [suggestions, setSuggestions] = useState([])
    useEffect(() => {
      const fetchSuggestions = async () => {
        try {
          const response = await fetch(`http://localhost:5000/suggest_improvements/${teacherId}`)
          const data = await response.json()
          setSuggestions(data)
        } catch (error) {
          console.error("Error fetching suggestions:", error)
        }
      }

      fetchSuggestions()
    }, [teacherId])
  }

  // Group feedback by subject
  const feedbackBySubject = {}
  feedback.forEach((item) => {
    if (!feedbackBySubject[item.subjectId]) {
      const subject = subjects.find((s) => s.id === item.subjectId)
      feedbackBySubject[item.subjectId] = {
        subject: subject || { name: "Unknown Subject", year: "?", course: "?" },
        feedback: [],
      }
    }
    feedbackBySubject[item.subjectId].feedback.push(item)
  })

  return (
    <div className="p-6">
      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>Teacher Dashboard</h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Welcome back, {user?.name}</h2>
        <p className="text-muted">
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
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Total Feedback</h3>
            <p className="card-description">Feedback received from students</p>
          </div>
          <div className="card-content">
            <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{feedback.length}</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Average Rating</h3>
            <p className="card-description">Your overall rating</p>
          </div>
          <div className="card-content">
            <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{averageRating}/5</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Positive Feedback</h3>
            <p className="card-description">Percentage of positive feedback</p>
          </div>
          <div className="card-content">
            <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>
              {feedback.length > 0 ? `${Math.round((positiveFeedback / feedback.length) * 100)}%` : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          marginBottom: "2rem",
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        }}
      >
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Feedback Distribution</h3>
            <p className="card-description">Breakdown of student feedback by sentiment</p>
          </div>
          <div className="card-content">
            <SimplePieChart
              data={[
                { name: "Positive", value: positiveFeedback, color: "#10b981" },
                { name: "Neutral", value: neutralFeedback, color: "#6b7280" },
                { name: "Negative", value: negativeFeedback, color: "#ef4444" },
              ]}
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Improvement Suggestions</h3>
            <p className="card-description">Based on student feedback</p>
          </div>
          <div className="card-content">
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {suggestions.map((item, index) => (
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
                      backgroundColor: "rgba(30, 41, 59, 0.1)",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "var(--primary)",
                    }}
                  >
                    {index + 1}
                  </span>
                  <span>{item.suggesstion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Feedback by Subject</h2>

      {Object.keys(feedbackBySubject).length > 0 ? (
        <div style={{ marginBottom: "2rem" }}>
          {Object.values(feedbackBySubject).map(({ subject, feedback }) => {
            const avgRating = (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
            const positiveCount = feedback.filter((f) => f.sentiment === "positive").length
            const positivePercent = Math.round((positiveCount / feedback.length) * 100)

            return (
              <div key={subject.id} className="card mb-4">
                <div className="card-header">
                  <h3 className="card-title">{subject.name}</h3>
                  <p className="card-description">
                    Year {subject.year} - {subject.course} • {feedback.length} feedback entries
                  </p>
                </div>
                <div className="card-content">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <p className="text-sm text-muted">Average Rating</p>
                      <p className="text-xl font-semibold">{avgRating}/5</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted">Positive Feedback</p>
                      <p className="text-xl font-semibold">{positivePercent}%</p>
                    </div>
                  </div>

                  <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem" }}>Recent Comments</h4>
                  {feedback.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: "0.75rem",
                        marginBottom: "0.5rem",
                        backgroundColor: "var(--muted)",
                        borderRadius: "var(--radius)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                        <div
                          className={`badge ${
                            item.sentiment === "positive"
                              ? "badge-positive"
                              : item.sentiment === "neutral"
                                ? "badge-neutral"
                                : "badge-negative"
                          }`}
                        >
                          Rating: {item.rating}/5
                        </div>
                        <span className="text-muted text-sm">{item.date}</span>
                      </div>
                      <p style={{ fontSize: "0.875rem" }}>{item.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="card">
          <div className="card-content text-center">
            <p className="text-muted">No feedback received yet for any of your subjects.</p>
          </div>
        </div>
      )}

      <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Recent Feedback</h2>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        }}
      >
        <div className="card">
          <div className="card-header" style={{ backgroundColor: "#f0fdf4" }}>
            <h3 className="card-title" style={{ display: "flex", alignItems: "center", color: "#059669" }}>
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
            </h3>
            <p className="card-description">Recent positive comments from students</p>
          </div>
          <div className="card-content" style={{ padding: 0 }}>
            {recentPositive.length > 0 ? (
              <ul>
                {recentPositive.map((feedbackItem) => {
                  const subject = subjects.find((s) => s.id === feedbackItem.subjectId)
                  return (
                    <li key={feedbackItem.id} style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>
                      <div style={{ marginBottom: "0.25rem", display: "flex", justifyContent: "space-between" }}>
                        <span className="font-medium">{subject?.name || "Unknown Subject"}</span>
                        <span className="text-sm text-muted">
                          Year {subject?.year} - {subject?.course}
                        </span>
                      </div>
                      <p style={{ marginBottom: "0.25rem", fontSize: "0.875rem" }}>{feedbackItem.comment}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div className="badge badge-positive">Rating: {feedbackItem.rating}/5</div>
                        <span className="text-muted text-sm">{feedbackItem.date}</span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="p-4 text-center text-muted text-sm">No positive feedback yet</p>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header" style={{ backgroundColor: "#f9fafb" }}>
            <h3 className="card-title" style={{ display: "flex", alignItems: "center", color: "#6b7280" }}>
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
            </h3>
            <p className="card-description">Recent neutral comments from students</p>
          </div>
          <div className="card-content" style={{ padding: 0 }}>
            {recentNeutral.length > 0 ? (
              <ul>
                {recentNeutral.map((feedbackItem) => {
                  const subject = subjects.find((s) => s.id === feedbackItem.subjectId)
                  return (
                    <li key={feedbackItem.id} style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>
                      <div style={{ marginBottom: "0.25rem", display: "flex", justifyContent: "space-between" }}>
                        <span className="font-medium">{subject?.name || "Unknown Subject"}</span>
                        <span className="text-sm text-muted">
                          Year {subject?.year} - {subject?.course}
                        </span>
                      </div>
                      <p style={{ marginBottom: "0.25rem", fontSize: "0.875rem" }}>{feedbackItem.comment}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div className="badge badge-neutral">Rating: {feedbackItem.rating}/5</div>
                        <span className="text-muted text-sm">{feedbackItem.date}</span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="p-4 text-center text-muted text-sm">No neutral feedback yet</p>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header" style={{ backgroundColor: "#fef2f2" }}>
            <h3 className="card-title" style={{ display: "flex", alignItems: "center", color: "#dc2626" }}>
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
            </h3>
            <p className="card-description">Recent negative comments from students</p>
          </div>
          <div className="card-content" style={{ padding: 0 }}>
            {recentNegative.length > 0 ? (
              <ul>
                {recentNegative.map((feedbackItem) => {
                  const subject = subjects.find((s) => s.id === feedbackItem.subjectId)
                  return (
                    <li key={feedbackItem.id} style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>
                      <div style={{ marginBottom: "0.25rem", display: "flex", justifyContent: "space-between" }}>
                        <span className="font-medium">{subject?.name || "Unknown Subject"}</span>
                        <span className="text-sm text-muted">
                          Year {subject?.year} - {subject?.course}
                        </span>
                      </div>
                      <p style={{ marginBottom: "0.25rem", fontSize: "0.875rem" }}>{feedbackItem.comment}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div className="badge badge-negative">Rating: {feedbackItem.rating}/5</div>
                        <span className="text-muted text-sm">{feedbackItem.date}</span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="p-4 text-center text-muted text-sm">No negative feedback yet</p>
            )}
          </div>
        </div>
      </div>

      {feedback.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link href="/teacher/feedback" className="btn btn-primary">
            View Detailed Feedback Analysis
          </Link>
        </div>
      )}
    </div>
  )
}
