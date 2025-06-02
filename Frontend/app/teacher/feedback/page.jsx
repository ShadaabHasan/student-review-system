// "use client"

// import { useState } from "react"
// import { useAuth } from "@/lib/auth-provider"
// import { mockFeedback, mockSubjects } from "@/lib/auth-provider"

// export default function FeedbackAnalysis() {
//   const { user } = useAuth()
//   const [selectedSubject, setSelectedSubject] = useState("all")

//   // Filter feedback for this teacher
//   const teacherFeedback = mockFeedback.filter((f) => f.teacherId === user?.id)

//   // Get unique subjects taught by this teacher
//   const teacherSubjects = mockSubjects.filter((s) => s.teacherId === user?.id)

//   // Filter feedback by selected subject
//   const filteredFeedback =
//     selectedSubject === "all" ? teacherFeedback : teacherFeedback.filter((f) => f.subjectId === selectedSubject)

//   // Group feedback by rating
//   const ratingCounts = [1, 2, 3, 4, 5].map((rating) => ({
//     rating,
//     count: filteredFeedback.filter((f) => f.rating === rating).length,
//   }))

//   const maxCount = Math.max(...ratingCounts.map((r) => r.count))

//   return (
//     <div className="p-6">
//       <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>Feedback Analysis</h1>

//       <div className="card mb-6">
//         <div className="card-header">
//           <h2 className="card-title">Filter by Subject</h2>
//           <p className="card-description">Select a subject to view specific feedback</p>
//         </div>
//         <div className="card-content">
//           <div className="form-group">
//             <label htmlFor="subject" className="form-label">
//               Subject
//             </label>
//             <select
//               id="subject"
//               value={selectedSubject}
//               onChange={(e) => setSelectedSubject(e.target.value)}
//               className="form-select"
//             >
//               <option value="all">All Subjects</option>
//               {teacherSubjects.map((subject) => (
//                 <option key={subject.id} value={subject.id}>
//                   {subject.name} (Year {subject.year} - {subject.course})
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       <div
//         style={{
//           display: "grid",
//           gap: "1.5rem",
//           gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
//         }}
//       >
//         <div className="card">
//           <div className="card-header">
//             <h3 className="card-title">Rating Distribution</h3>
//             <p className="card-description">How students rate your teaching</p>
//           </div>
//           <div className="card-content">
//             <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//               {ratingCounts.map(({ rating, count }) => (
//                 <div key={rating} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//                   <span style={{ minWidth: "60px", fontSize: "0.875rem", fontWeight: "500" }}>
//                     {rating} Star{rating !== 1 ? "s" : ""}
//                   </span>
//                   <div
//                     style={{
//                       flex: 1,
//                       height: "20px",
//                       backgroundColor: "var(--muted)",
//                       borderRadius: "4px",
//                       overflow: "hidden",
//                     }}
//                   >
//                     <div
//                       style={{
//                         height: "100%",
//                         width: maxCount > 0 ? `${(count / maxCount) * 100}%` : "0%",
//                         backgroundColor: rating >= 4 ? "#10b981" : rating >= 3 ? "#6b7280" : "#ef4444",
//                         transition: "width 0.3s ease",
//                       }}
//                     ></div>
//                   </div>
//                   <span style={{ minWidth: "30px", fontSize: "0.875rem", textAlign: "right" }}>{count}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="card">
//           <div className="card-header">
//             <h3 className="card-title">Feedback Summary</h3>
//             <p className="card-description">Key statistics</p>
//           </div>
//           <div className="card-content">
//             <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>Total Feedback:</span>
//                 <span style={{ fontWeight: "600" }}>{filteredFeedback.length}</span>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>Average Rating:</span>
//                 <span style={{ fontWeight: "600" }}>
//                   {filteredFeedback.length > 0
//                     ? (filteredFeedback.reduce((sum, f) => sum + f.rating, 0) / filteredFeedback.length).toFixed(1)
//                     : "N/A"}
//                   /5
//                 </span>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>Positive Feedback:</span>
//                 <span style={{ fontWeight: "600", color: "#10b981" }}>
//                   {filteredFeedback.filter((f) => f.sentiment === "positive").length}
//                 </span>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>Neutral Feedback:</span>
//                 <span style={{ fontWeight: "600", color: "#6b7280" }}>
//                   {filteredFeedback.filter((f) => f.sentiment === "neutral").length}
//                 </span>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>Negative Feedback:</span>
//                 <span style={{ fontWeight: "600", color: "#ef4444" }}>
//                   {filteredFeedback.filter((f) => f.sentiment === "negative").length}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="card mt-6">
//         <div className="card-header">
//           <h3 className="card-title">All Feedback Comments</h3>
//           <p className="card-description">
//             {selectedSubject === "all" ? "All feedback" : "Filtered feedback"} sorted by date
//           </p>
//         </div>
//         <div className="card-content" style={{ padding: 0 }}>
//           {filteredFeedback.length > 0 ? (
//             <div style={{ maxHeight: "400px", overflowY: "auto" }}>
//               {filteredFeedback
//                 .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//                 .map((feedback) => {
//                   const subject = mockSubjects.find((s) => s.id === feedback.subjectId)
//                   return (
//                     <div key={feedback.id} style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>
//                       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
//                         <div>
//                           <span className="text-sm font-medium">{subject?.name}</span>
//                           <span className="text-muted text-sm ml-2">
//                             Year {subject?.year} - {subject?.course}
//                           </span>
//                         </div>
//                         <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//                           <span
//                             className={`badge ${
//                               feedback.sentiment === "positive"
//                                 ? "badge-positive"
//                                 : feedback.sentiment === "neutral"
//                                   ? "badge-neutral"
//                                   : "badge-negative"
//                             }`}
//                           >
//                             {feedback.rating}/5
//                           </span>
//                           <span className="text-muted text-sm">{feedback.date}</span>
//                         </div>
//                       </div>
//                       <p className="text-sm">{feedback.comment}</p>
//                     </div>
//                   )
//                 })}
//             </div>
//           ) : (
//             <div className="p-6 text-center">
//               <p className="text-muted">No feedback available for the selected criteria.</p>
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

export default function FeedbackAnalysis() {
  const { user, getFeedback, getSubjects } = useAuth()
  const [feedback, setFeedback] = useState([])
  const [subjects, setSubjects] = useState([])
  const [selectedSubject, setSelectedSubject] = useState("all")
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

  // Filter feedback by selected subject
  const filteredFeedback =
    selectedSubject === "all" ? feedback : feedback.filter((f) => f.subjectId === selectedSubject)

  // Group feedback by rating
  const ratingCounts = [1, 2, 3, 4, 5].map((rating) => ({
    rating,
    count: filteredFeedback.filter((f) => f.rating === rating).length,
  }))

  const maxCount = Math.max(...ratingCounts.map((r) => r.count))

  return (
    <div className="p-6">
      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>Feedback Analysis</h1>

      <div className="card mb-6">
        <div className="card-header">
          <h2 className="card-title">Filter by Subject</h2>
          <p className="card-description">Select a subject to view specific feedback</p>
        </div>
        <div className="card-content">
          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <select
              id="subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="form-select"
            >
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} (Year {subject.year} - {subject.course})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        }}
      >
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Rating Distribution</h3>
            <p className="card-description">How students rate your teaching</p>
          </div>
          <div className="card-content">
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {ratingCounts.map(({ rating, count }) => (
                <div key={rating} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ minWidth: "60px", fontSize: "0.875rem", fontWeight: "500" }}>
                    {rating} Star{rating !== 1 ? "s" : ""}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: "20px",
                      backgroundColor: "var(--muted)",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: maxCount > 0 ? `${(count / maxCount) * 100}%` : "0%",
                        backgroundColor: rating >= 4 ? "#10b981" : rating >= 3 ? "#6b7280" : "#ef4444",
                        transition: "width 0.3s ease",
                      }}
                    ></div>
                  </div>
                  <span style={{ minWidth: "30px", fontSize: "0.875rem", textAlign: "right" }}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Feedback Summary</h3>
            <p className="card-description">Key statistics</p>
          </div>
          <div className="card-content">
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Total Feedback:</span>
                <span style={{ fontWeight: "600" }}>{filteredFeedback.length}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Average Rating:</span>
                <span style={{ fontWeight: "600" }}>
                  {filteredFeedback.length > 0
                    ? (filteredFeedback.reduce((sum, f) => sum + f.rating, 0) / filteredFeedback.length).toFixed(1)
                    : "N/A"}
                  /5
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Positive Feedback:</span>
                <span style={{ fontWeight: "600", color: "#10b981" }}>
                  {filteredFeedback.filter((f) => f.sentiment === "positive").length}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Neutral Feedback:</span>
                <span style={{ fontWeight: "600", color: "#6b7280" }}>
                  {filteredFeedback.filter((f) => f.sentiment === "neutral").length}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Negative Feedback:</span>
                <span style={{ fontWeight: "600", color: "#ef4444" }}>
                  {filteredFeedback.filter((f) => f.sentiment === "negative").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-6">
        <div className="card-header">
          <h3 className="card-title">All Feedback Comments</h3>
          <p className="card-description">
            {selectedSubject === "all" ? "All feedback" : "Filtered feedback"} sorted by date
          </p>
        </div>
        <div className="card-content" style={{ padding: 0 }}>
          {filteredFeedback.length > 0 ? (
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {filteredFeedback
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((feedbackItem) => {
                  const subject = subjects.find((s) => s.id === feedbackItem.subjectId)
                  return (
                    <div key={feedbackItem.id} style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <div>
                          <span className="text-sm font-medium">{subject?.name}</span>
                          <span className="text-muted text-sm ml-2">
                            Year {subject?.year} - {subject?.course}
                          </span>
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
                      <p className="text-sm">{feedbackItem.comment}</p>
                    </div>
                  )
                })}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-muted">No feedback available for the selected criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
