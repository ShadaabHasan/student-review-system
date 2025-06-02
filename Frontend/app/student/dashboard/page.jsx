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
import Link from "next/link"

export default function StudentDashboard() {
  const { user, getFeedback, getSubjects, getTeachers } = useAuth()
  const [feedback, setFeedback] = useState([])
  const [teachersWithSubjects, setTeachersWithSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [feedbackStats, setFeedbackStats] = useState({
    total: 0,
    uniqueSubjects: 0,
    averageRating: 0,
    positive: 0,
    neutral: 0,
    negative: 0,
  })

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        try {
          // Get subjects filtered by student's year and course
          const [subjectsData, teachersData, feedbackData] = await Promise.all([
            getSubjects({
              year: user.year,
              course: user.course,
            }),
            getTeachers(),
            getFeedback({ studentId: user.id }),
          ])

          // Group subjects by teacher
          const teacherSubjectsMap = new Map()

          subjectsData.forEach((subject) => {
            const teacher = teachersData.find((t) => t.id === subject.teacherId)
            if (teacher) {
              if (!teacherSubjectsMap.has(teacher.id)) {
                teacherSubjectsMap.set(teacher.id, {
                  teacher: teacher,
                  subjects: [],
                })
              }
              teacherSubjectsMap.get(teacher.id).subjects.push(subject)
            }
          })

          const teachersWithSubjectsArray = Array.from(teacherSubjectsMap.values()).sort((a, b) =>
            a.teacher.name.localeCompare(b.teacher.name),
          )

          setTeachersWithSubjects(teachersWithSubjectsArray)
          setFeedback(feedbackData)

          // Calculate feedback statistics
          const uniqueSubjectsCount = new Set(feedbackData.map((f) => f.subjectId)).size
          const avgRating =
            feedbackData.length > 0 ? feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length : 0
          const positiveCount = feedbackData.filter((f) => f.sentiment === "positive").length
          const neutralCount = feedbackData.filter((f) => f.sentiment === "neutral").length
          const negativeCount = feedbackData.filter((f) => f.sentiment === "negative").length

          setFeedbackStats({
            total: feedbackData.length,
            uniqueSubjects: uniqueSubjectsCount,
            averageRating: avgRating.toFixed(1),
            positive: positiveCount,
            neutral: neutralCount,
            negative: negativeCount,
          })
        } catch (error) {
          console.error("Error loading data:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    loadData()
  }, [user, getFeedback, getSubjects, getTeachers])

  if (loading) {
    return (
      <div className="p-6">
        <div className="spinner"></div>
      </div>
    )
  }

  // Count unique subjects the student has given feedback for
  const uniqueSubjectsWithFeedback = new Set(feedback.map((f) => f.subjectId))
  const totalSubjects = teachersWithSubjects.reduce((total, { subjects }) => total + subjects.length, 0)

  // Get recent feedback
  const recentFeedback = feedback.slice(0, 3)

  return (
    <div className="p-6">
      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>Student Dashboard</h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Welcome back, {user?.name}</h2>
        <p className="text-muted">
          This is your dashboard where you can view your feedback history and select teachers/subjects to provide new
          feedback.
        </p>
        <p style={{ marginTop: "0.5rem", fontWeight: "500" }}>
          Year {user?.year} - {user?.course}
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
            <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{feedbackStats.total}</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Subjects Rated</h3>
            <p className="card-description">Unique subjects with feedback</p>
          </div>
          <div className="card-content">
            <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{feedbackStats.uniqueSubjects}</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Average Rating</h3>
            <p className="card-description">Your average rating given</p>
          </div>
          <div className="card-content">
            <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>
              {feedbackStats.total > 0 ? `${feedbackStats.averageRating}/5` : "N/A"}
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Available Subjects</h3>
            <p className="card-description">Total subjects you can rate</p>
          </div>
          <div className="card-content">
            <p style={{ fontSize: "1.875rem", fontWeight: "bold" }}>{totalSubjects}</p>
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <div className="card-header">
          <h3 className="card-title">Feedback Distribution</h3>
          <p className="card-description">Breakdown of your feedback by sentiment</p>
        </div>
        <div className="card-content">
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.25rem",
                }}
              >
                <span className="text-sm font-medium">Positive Feedback</span>
                <span className="text-sm font-medium text-green-600">
                  {feedbackStats.positive} (
                  {feedbackStats.total > 0 ? Math.round((feedbackStats.positive / feedbackStats.total) * 100) : 0}%)
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "var(--muted)",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${feedbackStats.total > 0 ? (feedbackStats.positive / feedbackStats.total) * 100 : 0}%`,
                    backgroundColor: "#10b981",
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.25rem",
                }}
              >
                <span className="text-sm font-medium">Neutral Feedback</span>
                <span className="text-sm font-medium text-gray-600">
                  {feedbackStats.neutral} (
                  {feedbackStats.total > 0 ? Math.round((feedbackStats.neutral / feedbackStats.total) * 100) : 0}%)
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "var(--muted)",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${feedbackStats.total > 0 ? (feedbackStats.neutral / feedbackStats.total) * 100 : 0}%`,
                    backgroundColor: "#6b7280",
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.25rem",
                }}
              >
                <span className="text-sm font-medium">Negative Feedback</span>
                <span className="text-sm font-medium text-red-600">
                  {feedbackStats.negative} (
                  {feedbackStats.total > 0 ? Math.round((feedbackStats.negative / feedbackStats.total) * 100) : 0}%)
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "var(--muted)",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${feedbackStats.total > 0 ? (feedbackStats.negative / feedbackStats.total) * 100 : 0}%`,
                    backgroundColor: "#ef4444",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Your Teachers</h2>
      {teachersWithSubjects.length > 0 ? (
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            marginBottom: "2rem",
          }}
        >
          {teachersWithSubjects.slice(0, 3).map(({ teacher, subjects }) => (
            <div key={teacher.id} className="card">
              <div className="card-header">
                <h3 className="card-title">{teacher.name}</h3>
                <p className="card-description">
                  {subjects.length} subject{subjects.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="card-content">
                <div style={{ marginBottom: "1rem" }}>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem" }}>Subjects:</h4>
                  <ul style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                    {subjects.slice(0, 3).map((subject) => (
                      <li
                        key={subject.id}
                        style={{ marginBottom: "0.25rem", display: "flex", justifyContent: "space-between" }}
                      >
                        <span>
                          • {subject.name} (Year {subject.year} - {subject.course})
                        </span>
                        {feedback.some((f) => f.subjectId === subject.id) && (
                          <span className="badge badge-positive" style={{ fontSize: "0.65rem" }}>
                            Rated
                          </span>
                        )}
                      </li>
                    ))}
                    {subjects.length > 3 && <li style={{ fontStyle: "italic" }}>... and {subjects.length - 3} more</li>}
                  </ul>
                </div>
                <Link href="/student/teachers" className="btn btn-primary btn-block">
                  View All Subjects
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ marginBottom: "2rem" }}>
          <div className="card-content text-center">
            <p className="text-muted">No teachers available for your year and course.</p>
          </div>
        </div>
      )}

      {teachersWithSubjects.length > 3 && (
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/student/teachers" className="btn btn-outline">
            View All Teachers
          </Link>
        </div>
      )}

      <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Your Recent Feedback</h2>
      {recentFeedback.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {recentFeedback.map((feedbackItem) => {
            // Find the subject and teacher for this feedback
            let subject = null
            let teacher = null

            for (const { teacher: t, subjects } of teachersWithSubjects) {
              const foundSubject = subjects.find((s) => s.id === feedbackItem.subjectId)
              if (foundSubject) {
                subject = foundSubject
                teacher = t
                break
              }
            }

            return (
              <div key={feedbackItem.id} className="card">
                <div className="card-content">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <h3 style={{ fontWeight: "500" }}>{subject?.name || "Unknown Subject"}</h3>
                      <p className="text-muted text-sm">
                        Teacher: {teacher?.name || "Unknown Teacher"} • Year {subject?.year} - {subject?.course}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        className={`badge ${
                          feedbackItem.sentiment === "positive"
                            ? "badge-positive"
                            : feedbackItem.sentiment === "neutral"
                              ? "badge-neutral"
                              : "badge-negative"
                        }`}
                      >
                        Rating: {feedbackItem.rating}/5
                      </div>
                      <p className="text-muted text-sm">{feedbackItem.date}</p>
                    </div>
                  </div>
                  <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>{feedbackItem.comment}</p>
                </div>
              </div>
            )
          })}

          {feedback.length > 3 && (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <Link href="/student/subjects" className="btn btn-outline">
                View All Feedback
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="card">
          <div className="card-content text-center">
            <p className="text-muted">You haven't provided any feedback yet.</p>
            <Link href="/student/teachers" className="btn btn-primary mt-4">
              Provide Feedback
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
