// "use client"

// import { useAuth } from "@/lib/auth-provider"
// import { mockSubjects, mockFeedback, mockTeachers } from "@/lib/auth-provider"

// export default function StudentDashboard() {
//   const { user } = useAuth()

//   // Count feedback given by this student
//   const feedbackCount = mockFeedback.filter((f) => f.studentId === user?.id).length

//   // Count unique subjects the student has given feedback for
//   const uniqueSubjectsWithFeedback = new Set(
//     mockFeedback.filter((f) => f.studentId === user?.id).map((f) => f.subjectId),
//   )

//   // Get recent feedback
//   const recentFeedback = mockFeedback
//     .filter((f) => f.studentId === user?.id)
//     .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//     .slice(0, 3)

//   return (
//     <div className="p-6">
//       <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>Student Dashboard</h1>

//       <div style={{ marginBottom: "1.5rem" }}>
//         <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Welcome back, {user?.name}</h2>
//         <p className="text-muted">
//           This is your dashboard where you can view your feedback history and select subjects to provide new feedback.
//         </p>
//       </div>

//       <div
//         style={{
//           display: "grid",
//           gap: "1.5rem",
//           gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//           marginBottom: "1.5rem",
//         }}
//       >
//         <div className="card">
//           <div className="card-header">
//             <h3 className="card-title">Total Feedback</h3>
//             <p className="card-description">Feedback you've provided</p>
//           </div>
//           <div className="card-content">
//             <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{feedbackCount}</p>
//           </div>
//         </div>

//         <div className="card">
//           <div className="card-header">
//             <h3 className="card-title">Subjects Rated</h3>
//             <p className="card-description">Unique subjects with feedback</p>
//           </div>
//           <div className="card-content">
//             <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{uniqueSubjectsWithFeedback.size}</p>
//           </div>
//         </div>

//         <div className="card">
//           <div className="card-header">
//             <h3 className="card-title">Available Subjects</h3>
//             <p className="card-description">Subjects you can rate</p>
//           </div>
//           <div className="card-content">
//             <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{mockSubjects.length}</p>
//           </div>
//         </div>
//       </div>

//       <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Your Recent Feedback</h2>
//       {recentFeedback.length > 0 ? (
//         <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//           {recentFeedback.map((feedback) => {
//             const subject = mockSubjects.find((s) => s.id === feedback.subjectId)
//             const teacher = subject ? mockTeachers.find((t) => t.id === subject.teacherId) : null

//             return (
//               <div key={feedback.id} className="card">
//                 <div className="card-content">
//                   <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                     <div>
//                       <h3 style={{ fontWeight: "500" }}>{subject?.name}</h3>
//                       <p className="text-muted text-sm">Teacher: {teacher?.name}</p>
//                     </div>
//                     <div style={{ textAlign: "right" }}>
//                       <div className="badge badge-primary">Rating: {feedback.rating}/5</div>
//                       <p className="text-muted text-sm">{feedback.date}</p>
//                     </div>
//                   </div>
//                   <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>{feedback.comment}</p>
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       ) : (
//         <div className="card">
//           <div className="card-content text-center">
//             <p className="text-muted">You haven't provided any feedback yet.</p>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-provider"

export default function StudentDashboard() {
  const { user, getFeedback, getSubjects } = useAuth()
  const [feedback, setFeedback] = useState([])
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        try {
          const [feedbackData, subjectsData] = await Promise.all([getFeedback({ studentId: user.id }), getSubjects()])
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

  // Count unique subjects the student has given feedback for
  const uniqueSubjectsWithFeedback = new Set(feedback.map((f) => f.subjectId))

  // Get recent feedback
  const recentFeedback = feedback.slice(0, 3)

  return (
    <div className="p-6">
      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>Student Dashboard</h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Welcome back, {user?.name}</h2>
        <p className="text-muted">
          This is your dashboard where you can view your feedback history and select subjects to provide new feedback.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          marginBottom: "1.5rem",
        }}
      >
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Total Feedback</h3>
            <p className="card-description">Feedback you've provided</p>
          </div>
          <div className="card-content">
            <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{feedback.length}</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Subjects Rated</h3>
            <p className="card-description">Unique subjects with feedback</p>
          </div>
          <div className="card-content">
            <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{uniqueSubjectsWithFeedback.size}</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Available Subjects</h3>
            <p className="card-description">Subjects you can rate</p>
          </div>
          <div className="card-content">
            <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{subjects.length}</p>
          </div>
        </div>
      </div>

      <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Your Recent Feedback</h2>
      {recentFeedback.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {recentFeedback.map((feedbackItem) => {
            const subject = subjects.find((s) => s.id === feedbackItem.subjectId)

            return (
              <div key={feedbackItem.id} className="card">
                <div className="card-content">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <h3 style={{ fontWeight: "500" }}>{subject?.name || "Unknown Subject"}</h3>
                      <p className="text-muted text-sm">Teacher: {subject?.teacherName || "Unknown Teacher"}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="badge badge-primary">Rating: {feedbackItem.rating}/5</div>
                      <p className="text-muted text-sm">{feedbackItem.date}</p>
                    </div>
                  </div>
                  <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>{feedbackItem.comment}</p>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="card">
          <div className="card-content text-center">
            <p className="text-muted">You haven't provided any feedback yet.</p>
          </div>
        </div>
      )}
    </div>
  )
}
