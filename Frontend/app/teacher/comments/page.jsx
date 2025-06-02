// "use client"

// import { useState } from "react"
// import { useAuth } from "@/lib/auth-provider"
// import { mockFeedback, mockSubjects } from "@/lib/auth-provider"

// export default function Comments() {
//   const { user } = useAuth()
//   const [filter, setFilter] = useState("all")
//   const [searchTerm, setSearchTerm] = useState("")

//   // Filter feedback for this teacher
//   const teacherFeedback = mockFeedback.filter((f) => f.teacherId === user?.id)

//   // Apply filters
//   const filteredFeedback = teacherFeedback
//     .filter((feedback) => {
//       if (filter === "all") return true
//       return feedback.sentiment === filter
//     })
//     .filter((feedback) => {
//       if (!searchTerm) return true
//       return feedback.comment.toLowerCase().includes(searchTerm.toLowerCase())
//     })
//     .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

//   return (
//     <div className="p-6">
//       <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>Student Comments</h1>

//       <div className="card mb-6">
//         <div className="card-header">
//           <h2 className="card-title">Filter Comments</h2>
//           <p className="card-description">Search and filter student feedback</p>
//         </div>
//         <div className="card-content">
//           <div
//             style={{
//               display: "grid",
//               gap: "1rem",
//               gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//             }}
//           >
//             <div className="form-group">
//               <label htmlFor="filter" className="form-label">
//                 Sentiment
//               </label>
//               <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="form-select">
//                 <option value="all">All Comments</option>
//                 <option value="positive">Positive</option>
//                 <option value="neutral">Neutral</option>
//                 <option value="negative">Negative</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="search" className="form-label">
//                 Search Comments
//               </label>
//               <input
//                 id="search"
//                 type="text"
//                 placeholder="Search in comments..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="form-input"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="card">
//         <div className="card-header">
//           <h3 className="card-title">Comments ({filteredFeedback.length})</h3>
//           <p className="card-description">Student feedback and comments</p>
//         </div>
//         <div className="card-content" style={{ padding: 0 }}>
//           {filteredFeedback.length > 0 ? (
//             <div style={{ maxHeight: "600px", overflowY: "auto" }}>
//               {filteredFeedback.map((feedback) => {
//                 const subject = mockSubjects.find((s) => s.id === feedback.subjectId)
//                 return (
//                   <div
//                     key={feedback.id}
//                     style={{
//                       padding: "1.5rem",
//                       borderBottom: "1px solid var(--border)",
//                       backgroundColor:
//                         feedback.sentiment === "positive"
//                           ? "#f0fdf4"
//                           : feedback.sentiment === "negative"
//                             ? "#fef2f2"
//                             : "transparent",
//                     }}
//                   >
//                     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
//                       <div>
//                         <h4 style={{ fontWeight: "600", marginBottom: "0.25rem" }}>{subject?.name}</h4>
//                         <p className="text-muted text-sm">
//                           Year {subject?.year} - {subject?.course}
//                         </p>
//                       </div>
//                       <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//                         <span
//                           className={`badge ${
//                             feedback.sentiment === "positive"
//                               ? "badge-positive"
//                               : feedback.sentiment === "neutral"
//                                 ? "badge-neutral"
//                                 : "badge-negative"
//                           }`}
//                         >
//                           {feedback.rating}/5
//                         </span>
//                         <span className="text-muted text-sm">{feedback.date}</span>
//                       </div>
//                     </div>
//                     <blockquote
//                       style={{
//                         borderLeft: `4px solid ${
//                           feedback.sentiment === "positive"
//                             ? "#10b981"
//                             : feedback.sentiment === "neutral"
//                               ? "#6b7280"
//                               : "#ef4444"
//                         }`,
//                         paddingLeft: "1rem",
//                         fontStyle: "italic",
//                         color: "var(--foreground)",
//                       }}
//                     >
//                       "{feedback.comment}"
//                     </blockquote>
//                   </div>
//                 )
//               })}
//             </div>
//           ) : (
//             <div className="p-6 text-center">
//               <p className="text-muted">No comments found matching your criteria.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-provider"

export default function Comments() {
  const { user, getFeedback, getSubjects } = useAuth()
  const [feedback, setFeedback] = useState([])
  const [subjects, setSubjects] = useState([])
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        try {
          const [feedbackData, subjectsData] = await Promise.all([
            getFeedback({ teacherId: user.id }),
            getSubjects({ teacherId: user.id }),
          ])
          setFeedback(feedbackData)
          setSubjects(subjectsData)
        } catch (error) {
          console.error("Error loading data:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    loadData()
  }, [user, getFeedback, getSubjects])

  if (loading) {
    return (
      <div className="p-6">
        <div className="spinner"></div>
      </div>
    )
  }

  // Apply filters
  const filteredFeedback = feedback
    .filter((feedbackItem) => {
      if (filter === "all") return true
      return feedbackItem.sentiment === filter
    })
    .filter((feedbackItem) => {
      if (!searchTerm) return true
      return feedbackItem.comment.toLowerCase().includes(searchTerm.toLowerCase())
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="p-6">
      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>Student Comments</h1>

      <div className="card mb-6">
        <div className="card-header">
          <h2 className="card-title">Filter Comments</h2>
          <p className="card-description">Search and filter student feedback</p>
        </div>
        <div className="card-content">
          <div
            style={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}
          >
            <div className="form-group">
              <label htmlFor="filter" className="form-label">
                Sentiment
              </label>
              <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="form-select">
                <option value="all">All Comments</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="search" className="form-label">
                Search Comments
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search in comments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Comments ({filteredFeedback.length})</h3>
          <p className="card-description">Student feedback and comments</p>
        </div>
        <div className="card-content" style={{ padding: 0 }}>
          {filteredFeedback.length > 0 ? (
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              {filteredFeedback.map((feedbackItem) => {
                const subject = subjects.find((s) => s.id === feedbackItem.subjectId)
                return (
                  <div
                    key={feedbackItem.id}
                    style={{
                      padding: "1.5rem",
                      borderBottom: "1px solid var(--border)",
                      backgroundColor:
                        feedbackItem.sentiment === "positive"
                          ? "#f0fdf4"
                          : feedbackItem.sentiment === "negative"
                            ? "#fef2f2"
                            : "transparent",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <div>
                        <h4 style={{ fontWeight: "600", marginBottom: "0.25rem" }}>{subject?.name}</h4>
                        <p className="text-muted text-sm">
                          Year {subject?.year} - {subject?.course}
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span
                          className={`badge ${
                            feedbackItem.sentiment === "positive"
                              ? "badge-positive"
                              : feedbackItem.sentiment === "neutral"
                                ? "badge-neutral"
                                : "badge-negative"
                          }`}
                        >
                          {feedbackItem.rating}/5
                        </span>
                        <span className="text-muted text-sm">{feedbackItem.date}</span>
                      </div>
                    </div>
                    <blockquote
                      style={{
                        borderLeft: `4px solid ${
                          feedbackItem.sentiment === "positive"
                            ? "#10b981"
                            : feedbackItem.sentiment === "neutral"
                              ? "#6b7280"
                              : "#ef4444"
                        }`,
                        paddingLeft: "1rem",
                        fontStyle: "italic",
                        color: "var(--foreground)",
                      }}
                    >
                      "{feedbackItem.comment}"
                    </blockquote>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-muted">No comments found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
