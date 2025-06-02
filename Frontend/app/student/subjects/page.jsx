// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { mockSubjects, mockTeachers } from "@/lib/auth-provider"

// export default function SubjectsPage() {
//   const [selectedYear, setSelectedYear] = useState("1")
//   const [selectedCourse, setSelectedCourse] = useState("Science")

//   // Get unique years and courses
//   const years = Array.from(new Set(mockSubjects.map((subject) => subject.year)))
//   const courses = Array.from(new Set(mockSubjects.map((subject) => subject.course)))

//   // Filter subjects based on selection
//   const filteredSubjects = mockSubjects.filter(
//     (subject) => subject.year === Number.parseInt(selectedYear) && subject.course === selectedCourse,
//   )

//   // Group subjects by name to avoid duplicates
//   const groupedSubjects = filteredSubjects.reduce((acc, subject) => {
//     if (!acc[subject.name]) {
//       acc[subject.name] = subject
//     }
//     return acc
//   }, {})

//   const uniqueSubjects = Object.values(groupedSubjects)

//   return (
//     <div className="p-6">
//       <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>Select Subjects</h1>

//       <div className="card mb-6">
//         <div className="card-header">
//           <h2 className="card-title">Filter Subjects</h2>
//           <p className="card-description">Select your year and course to view relevant subjects</p>
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
//               <label htmlFor="year" className="form-label">
//                 Year
//               </label>
//               <select
//                 id="year"
//                 value={selectedYear}
//                 onChange={(e) => setSelectedYear(e.target.value)}
//                 className="form-select"
//               >
//                 {years.map((year) => (
//                   <option key={year} value={year.toString()}>
//                     Year {year}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="course" className="form-label">
//                 Course
//               </label>
//               <select
//                 id="course"
//                 value={selectedCourse}
//                 onChange={(e) => setSelectedCourse(e.target.value)}
//                 className="form-select"
//               >
//                 {courses.map((course) => (
//                   <option key={course} value={course}>
//                     {course}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Available Subjects</h2>

//       {uniqueSubjects.length > 0 ? (
//         <div
//           style={{
//             display: "grid",
//             gap: "1rem",
//             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//           }}
//         >
//           {uniqueSubjects.map((subject) => {
//             const teacher = mockTeachers.find((t) => t.id === subject.teacherId)

//             return (
//               <div key={subject.id} className="card">
//                 <div className="card-header">
//                   <h3 className="card-title">{subject.name}</h3>
//                   <p className="card-description">
//                     Year {subject.year} - {subject.course}
//                   </p>
//                 </div>
//                 <div className="card-content">
//                   <p style={{ marginBottom: "1rem", fontSize: "0.875rem" }}>
//                     <span style={{ fontWeight: "500" }}>Teacher:</span> {teacher?.name}
//                   </p>
//                   <Link href={`/student/subjects/${subject.id}`} className="btn btn-primary btn-block">
//                     View and Rate
//                   </Link>
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       ) : (
//         <div className="card">
//           <div className="card-content text-center">
//             <p className="text-muted">No subjects found for the selected criteria.</p>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { Star } from "lucide-react"

export default function SubjectPage({ params }) {
  const router = useRouter()
  const { user, getSubjects, getTeachers, getFeedback, addFeedback } = useAuth()
  const [subject, setSubject] = useState(null)
  const [teacher, setTeacher] = useState(null)
  const [existingFeedback, setExistingFeedback] = useState(null)
  const [rating, setRating] = useState(3)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [subjectsData, teachersData, feedbackData] = await Promise.all([
          getSubjects(),
          getTeachers(),
          getFeedback({ studentId: user?.id, subjectId: params.id }),
        ])

        const foundSubject = subjectsData.find((s) => s.id === params.id)
        const foundTeacher = foundSubject ? teachersData.find((t) => t.id === foundSubject.teacherId) : null
        const foundFeedback = feedbackData.find((f) => f.subjectId === params.id && f.studentId === user?.id)

        setSubject(foundSubject)
        setTeacher(foundTeacher)
        setExistingFeedback(foundFeedback)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      loadData()
    }
  }, [user, params.id, getSubjects, getTeachers, getFeedback])

  if (loading) {
    return (
      <div className="p-6">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!subject || !teacher) {
    return (
      <div className="p-6">
        <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>Subject Not Found</h1>
        <p>The subject you're looking for doesn't exist.</p>
        <button className="btn btn-primary mt-4" onClick={() => router.push("/student/subjects")}>
          Back to Subjects
        </button>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Determine sentiment based on rating
      let sentiment = "neutral"
      if (rating >= 4) sentiment = "positive"
      else if (rating <= 2) sentiment = "negative"

      await addFeedback({
        subjectId: subject.id,
        teacherId: teacher.id,
        studentId: user.id,
        rating: rating,
        comment,
        sentiment,
      })

      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting feedback:", error)
      alert("Failed to submit feedback. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6">
      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>{subject.name}</h1>

      <div
        style={{
          marginBottom: "1.5rem",
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Subject Information</h2>
            <p className="card-description">Details about this subject</p>
          </div>
          <div className="card-content">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div>
                <span style={{ fontWeight: "500" }}>Course:</span> {subject.course}
              </div>
              <div>
                <span style={{ fontWeight: "500" }}>Year:</span> {subject.year}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Teacher Information</h2>
            <p className="card-description">About your instructor</p>
          </div>
          <div className="card-content">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div>
                <span style={{ fontWeight: "500" }}>Name:</span> {teacher.name}
              </div>
              <div>
                <span style={{ fontWeight: "500" }}>Email:</span> {teacher.email}
              </div>
              <div>
                <span style={{ fontWeight: "500" }}>Subject:</span> {teacher.subject}
              </div>
            </div>
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Feedback Submitted</h2>
            <p className="card-description">Thank you for your feedback!</p>
          </div>
          <div className="card-content">
            <p>Your feedback has been recorded and will help improve the teaching quality.</p>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary" onClick={() => router.push("/student/subjects")}>
              Back to Subjects
            </button>
          </div>
        </div>
      ) : existingFeedback ? (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Your Previous Feedback</h2>
            <p className="card-description">You have already provided feedback for this subject</p>
          </div>
          <div className="card-content">
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <span style={{ fontWeight: "500" }}>Rating:</span> {existingFeedback.rating}/5
              </div>
              <div>
                <span style={{ fontWeight: "500" }}>Comment:</span>
                <p style={{ marginTop: "0.25rem" }}>{existingFeedback.comment}</p>
              </div>
              <div>
                <span style={{ fontWeight: "500" }}>Date:</span> {existingFeedback.date}
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary" onClick={() => router.push("/student/subjects")}>
              Back to Subjects
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="card-header">
              <h2 className="card-title">Rate This Subject</h2>
              <p className="card-description">Provide your feedback about the teaching quality</p>
            </div>
            <div className="card-content" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="form-group">
                <label className="form-label">Rating</label>
                <div className="rating-group">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="rating-item">
                      <button
                        type="button"
                        className={`rating-star ${rating >= value ? "active" : ""}`}
                        onClick={() => setRating(value)}
                      >
                        <Star style={{ height: "1.25rem", width: "1.25rem" }} />
                      </button>
                      <span className="rating-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="comment" className="form-label">
                  Comment
                </label>
                <textarea
                  id="comment"
                  placeholder="Share your experience with this teacher..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={5}
                  required
                  className="form-textarea"
                />
              </div>
            </div>
            <div className="card-footer" style={{ display: "flex", justifyContent: "space-between" }}>
              <button type="button" className="btn btn-outline" onClick={() => router.push("/student/subjects")}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
