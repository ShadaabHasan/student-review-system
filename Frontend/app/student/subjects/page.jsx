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
import Link from "next/link"
import { useAuth } from "@/lib/auth-provider"

export default function SubjectsPage() {
  const { user, getSubjects, getTeachers, getFeedback } = useAuth()
  const [subjects, setSubjects] = useState([])
  const [teachers, setTeachers] = useState([])
  const [feedback, setFeedback] = useState([])
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [loading, setLoading] = useState(true)
  const [years, setYears] = useState([1, 2, 3, 4]) // Default years
  const [courses, setCourses] = useState(["Science", "Arts", "Commerce", "Engineering"]) // Default courses

  useEffect(() => {
    // Set default filters to student's year and course when user data is available
    if (user && user.year && user.course) {
      setSelectedYear(user.year.toString())
      setSelectedCourse(user.course)
    }
  }, [user])

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load all subjects, teachers, and student feedback
        const [allSubjects, allTeachers, studentFeedback] = await Promise.all([
          getSubjects(),
          getTeachers(),
          user ? getFeedback({ studentId: user.id }) : [],
        ])

        setTeachers(allTeachers)
        setFeedback(studentFeedback)

        if (allSubjects.length > 0) {
          // Get unique years and courses from existing subjects
          const uniqueYears = Array.from(new Set(allSubjects.map((s) => s.year))).sort()
          const uniqueCourses = Array.from(new Set(allSubjects.map((s) => s.course)))

          if (uniqueYears.length > 0) setYears(uniqueYears)
          if (uniqueCourses.length > 0) setCourses(uniqueCourses)
        }
      } catch (error) {
        console.error("Error loading initial data:", error)
      }
    }

    loadInitialData()
  }, [getSubjects, getTeachers, getFeedback, user])

  useEffect(() => {
    const loadFilteredSubjects = async () => {
      if (!selectedYear || !selectedCourse) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const filteredSubjects = await getSubjects({
          year: Number.parseInt(selectedYear),
          course: selectedCourse,
        })
        setSubjects(filteredSubjects)
      } catch (error) {
        console.error("Error filtering subjects:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFilteredSubjects()
  }, [selectedYear, selectedCourse, getSubjects])

  // Check if student has provided feedback for a specific subject
  const hasFeedback = (subjectId) => {
    return feedback.some((f) => f.subjectId === subjectId)
  }

  // Get feedback for a specific subject
  const getFeedbackForSubject = (subjectId) => {
    return feedback.find((f) => f.subjectId === subjectId)
  }

  return (
    <div className="p-6">
      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>My Subjects & Feedback</h1>

      <div className="card mb-6">
        <div className="card-header">
          <h2 className="card-title">Filter Subjects</h2>
          <p className="card-description">
            {selectedYear === user?.year?.toString() && selectedCourse === user?.course
              ? "Viewing subjects for your year and course"
              : "Select year and course to view relevant subjects"}
          </p>
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
              <label htmlFor="year" className="form-label">
                Year
              </label>
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="form-select"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year.toString()}>
                    Year {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="course" className="form-label">
                Course
              </label>
              <select
                id="course"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="form-select"
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <div className="card-header">
          <h2 className="card-title">My Feedback Summary</h2>
          <p className="card-description">Overview of your feedback contributions</p>
        </div>
        <div className="card-content">
          <div
            style={{
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}
          >
            <div>
              <h3 className="text-lg font-semibold mb-1">Total Feedback</h3>
              <p className="text-3xl font-bold">{feedback.length}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Subjects Rated</h3>
              <p className="text-3xl font-bold">{new Set(feedback.map((f) => f.subjectId)).size}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Average Rating</h3>
              <p className="text-3xl font-bold">
                {feedback.length > 0
                  ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
                  : "N/A"}
                /5
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Available Subjects</h2>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
          <div className="spinner"></div>
        </div>
      ) : subjects.length > 0 ? (
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {subjects.map((subject) => {
            const teacher = teachers.find((t) => t.id === subject.teacherId)
            const subjectFeedback = getFeedbackForSubject(subject.id)

            return (
              <div key={subject.id} className="card">
                <div className="card-header">
                  <h3 className="card-title">{subject.name}</h3>
                  <p className="card-description">
                    Year {subject.year} - {subject.course}
                  </p>
                </div>
                <div className="card-content">
                  <p style={{ marginBottom: "1rem", fontSize: "0.875rem" }}>
                    <span style={{ fontWeight: "500" }}>Teacher:</span>{" "}
                    {teacher?.name || subject.teacherName || "Unknown Teacher"}
                  </p>

                  {hasFeedback(subject.id) ? (
                    <div style={{ marginBottom: "1rem" }}>
                      <div className="badge badge-positive mb-2">You rated this: {subjectFeedback.rating}/5</div>
                      <p className="text-sm italic">"{subjectFeedback.comment}"</p>
                      <p className="text-xs text-muted mt-1">Submitted on {subjectFeedback.date}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted mb-4">You haven't provided feedback for this subject yet.</p>
                  )}

                  <Link
                    href={`/student/subjects/${subject.id}`}
                    className={`btn ${hasFeedback(subject.id) ? "btn-outline" : "btn-primary"} btn-block`}
                  >
                    {hasFeedback(subject.id) ? "View Feedback" : "Rate Subject"}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="card">
          <div className="card-content text-center">
            <p className="text-muted">
              {selectedYear && selectedCourse
                ? "No subjects found for the selected year and course. Teachers need to add subjects for this year and course first."
                : "Please select a year and course to view subjects."}
            </p>
            {selectedYear && selectedCourse && (
              <p className="text-muted text-sm" style={{ marginTop: "0.5rem" }}>
                Ask your teachers to add their subjects through their profile page.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
