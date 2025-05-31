"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { User, LogOut, TrendingUp, MessageSquare, Lightbulb, ChevronDown, ChevronUp } from "lucide-react"

const feedbackData = [
  { name: "Positive", value: 65, color: "#22c55e" },
  { name: "Neutral", value: 20, color: "#f59e0b" },
  { name: "Negative", value: 15, color: "#ef4444" },
]

const recentComments = {
  positive: [
    {
      id: 1,
      comment: "Excellent teaching methodology and clear explanations",
      date: "2024-01-15",
      subject: "Data Structures",
    },
    { id: 2, comment: "Very engaging lectures with practical examples", date: "2024-01-14", subject: "Algorithms" },
    {
      id: 3,
      comment: "Great use of visual aids and interactive sessions",
      date: "2024-01-13",
      subject: "Data Structures",
    },
    { id: 4, comment: "Always available for doubt clarification", date: "2024-01-12", subject: "Algorithms" },
    { id: 5, comment: "Makes complex topics easy to understand", date: "2024-01-11", subject: "Data Structures" },
  ],
  neutral: [
    { id: 6, comment: "Good teaching but could use more examples", date: "2024-01-15", subject: "Data Structures" },
    { id: 7, comment: "Average pace, sometimes too fast", date: "2024-01-14", subject: "Algorithms" },
    {
      id: 8,
      comment: "Content is good but delivery could be improved",
      date: "2024-01-13",
      subject: "Data Structures",
    },
    { id: 9, comment: "Satisfactory teaching methods", date: "2024-01-12", subject: "Algorithms" },
    { id: 10, comment: "Decent explanations but room for improvement", date: "2024-01-11", subject: "Data Structures" },
  ],
  negative: [
    {
      id: 11,
      comment: "Lectures are too fast-paced and hard to follow",
      date: "2024-01-15",
      subject: "Data Structures",
    },
    { id: 12, comment: "Not enough practical examples provided", date: "2024-01-14", subject: "Algorithms" },
    { id: 13, comment: "Difficult to understand explanations", date: "2024-01-13", subject: "Data Structures" },
    { id: 14, comment: "Limited interaction with students", date: "2024-01-12", subject: "Algorithms" },
    { id: 15, comment: "Course material is not well organized", date: "2024-01-11", subject: "Data Structures" },
  ],
}

export default function TeacherDashboard() {
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [tab, setTab] = useState("positive")

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  const getSuggestions = () => [
    "Consider slowing down the pace of lectures based on student feedback",
    "Incorporate more practical examples and hands-on exercises",
    "Improve explanation clarity by using visual aids and diagrams",
    "Increase student interaction through Q&A sessions and discussions",
    "Better organize course materials and provide structured notes",
  ]

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", fontFamily: "sans-serif" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#ffffff", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "64px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TrendingUp style={{ height: "32px", width: "32px", color: "#2563eb" }} />
            <span style={{ marginLeft: "8px", fontSize: "20px", fontWeight: "600" }}>Teacher Portal</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <User style={{ height: "20px", width: "20px", color: "#6b7280" }} />
              <span style={{ fontSize: "14px", color: "#374151" }}>Dr. Smith</span>
            </div>
            <button style={{ background: "none", border: "none", cursor: "pointer" }}>
              <LogOut style={{ height: "16px", width: "16px" }} />
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 16px" }}>
        {/* Title */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#111827" }}>Feedback Analytics</h1>
          <p style={{ marginTop: "8px", color: "#6b7280" }}>Monitor student feedback and improve your teaching methods</p>
        </div>

        {/* Grid Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px", marginBottom: "32px" }}>
          {/* Feedback Chart */}
          <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "24px", border: "1px solid #e5e7eb" }}>
            <h2 style={{ fontWeight: "600" }}>Feedback Distribution</h2>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>Overall sentiment analysis of student feedback</p>
            <div style={{ height: "300px", marginTop: "24px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={feedbackData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {feedbackData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "16px" }}>
              {feedbackData.map((item) => (
                <div key={item.name} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: item.color }}></div>
                  <span style={{ fontSize: "14px", fontWeight: "500" }}>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div>
            {[
              { label: "Total Feedback", value: "127", icon: <MessageSquare style={{ color: "#2563eb", height: "32px", width: "32px" }} /> },
              { label: "Average Rating", value: "4.2/5", icon: <TrendingUp style={{ color: "#16a34a", height: "32px", width: "32px" }} /> },
              { label: "Response Rate", value: "89%", icon: <TrendingUp style={{ color: "#2563eb", height: "32px", width: "32px" }} /> },
            ].map((stat, index) => (
              <div key={index} style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", marginBottom: "16px", border: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "14px", color: "#6b7280" }}>{stat.label}</p>
                  <p style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>{stat.value}</p>
                </div>
                {stat.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Tabs: Comments */}
        <div style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb", marginBottom: "32px" }}>
          <h2 style={{ fontWeight: "600" }}>Recent Feedback Comments</h2>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>Top 5 recent comments from each category</p>
          <div style={{ display: "flex", marginTop: "16px", gap: "8px" }}>
            {["positive", "neutral", "negative"].map((cat) => (
              <button
                key={cat}
                onClick={() => setTab(cat)}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  backgroundColor: tab === cat ? "#e0f2fe" : "#f3f4f6",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontWeight: "500",
                  color: tab === cat ? "#0c4a6e" : "#374151"
                }}
              >
                {cat[0].toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ marginTop: "24px" }}>
            {(recentComments[tab] || []).slice(0, 5).map((comment) => (
              <div key={comment.id} style={{ padding: "16px", border: "1px solid #e5e7eb", borderRadius: "8px", backgroundColor: "#f9fafb", marginBottom: "12px" }}>
                <p style={{ marginBottom: "8px", color: "#1f2937" }}>"{comment.comment}"</p>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280" }}>
                  <span style={{ border: "1px solid #d1d5db", padding: "2px 6px", borderRadius: "4px" }}>{comment.subject}</span>
                  <span>{comment.date}</span>
                </div>
              </div>
            ))}

            {recentComments[tab].length > 5 && (
              <button
                onClick={() => toggleCategory(tab)}
                style={{
                  width: "100%",
                  marginTop: "8px",
                  padding: "10px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  cursor: "pointer"
                }}
              >
                {expandedCategory === tab ? (
                  <span><ChevronUp style={{ height: "16px", width: "16px", marginRight: "8px" }} /> Show Less</span>
                ) : (
                  <span><ChevronDown style={{ height: "16px", width: "16px", marginRight: "8px" }} /> Show All {recentComments[tab].length} Comments</span>
                )}
              </button>
            )}

            {expandedCategory === tab &&
              recentComments[tab].slice(5).map((comment) => (
                <div key={comment.id} style={{ padding: "16px", border: "1px solid #e5e7eb", borderRadius: "8px", backgroundColor: "#f9fafb", marginTop: "12px" }}>
                  <p style={{ marginBottom: "8px", color: "#1f2937" }}>"{comment.comment}"</p>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280" }}>
                    <span style={{ border: "1px solid #d1d5db", padding: "2px 6px", borderRadius: "4px" }}>{comment.subject}</span>
                    <span>{comment.date}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {/* AI Suggestions */}
        <div style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <h2 style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600" }}>
            <Lightbulb style={{ color: "#facc15", height: "20px", width: "20px" }} />
            AI-Powered Improvement Suggestions
          </h2>
          <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "16px" }}>
            Based on negative feedback analysis, here are personalized suggestions to enhance your teaching
          </p>
          {getSuggestions().map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", backgroundColor: "#eff6ff", padding: "16px", borderRadius: "8px", marginBottom: "12px" }}>
              <div style={{ width: "24px", height: "24px", backgroundColor: "#2563eb", color: "white", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%" }}>
                {i + 1}
              </div>
              <p style={{ margin: 0, color: "#1f2937" }}>{s}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
