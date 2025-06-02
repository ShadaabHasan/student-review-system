"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-provider"

export default function TeachersPage() {
  const { user, getSubjects, getTeachers, getFeedback } = useAuth()
  const [teachersWithSubjects, setTeachersWithSubjects] = useState([])
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [loading, setLoading] = useState(true)
  const [years, setYears] = useState([1, 2, 3, 4]) // Default years
  const [courses, setCourses] = useState(["Science", "Arts", "Commerce", "Engineering"]) // Default courses
  const [studentFeedback, setStudentFeedback] = useState([])

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
        // Load all subjects to get available years and courses
        const allSubjects = await getSubjects()

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
  }, [getSubjects])

  useEffect(() => {
    const loadFilteredData = async () => {
      if (!selectedYear || !selectedCourse) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const [allSubjects, allTeachers, feedback] = await Promise.all([
          getSubjects(),
          getTeachers(),
          getFeedback({ studentId: user?.id }),
        ])

        setStudentFeedback(feedback)

        // Filter subjects by selected year and course
        const filteredSubjects = allSubjects.filter(
          (subject) => subject.year === Number.parseInt(selectedYear) && subject.course === selectedCourse,
        )

        // Group subjects by teacher
        const teacherSubjectsMap = new Map()

        filteredSubjects.forEach((subject) => {
          const teacher = allTeachers.find((t) => t.id === subject.teacherId)
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

        // Convert map to array and sort by teacher name
        const teachersWithSubjectsArray = Array.from(teacherSubjectsMap.values()).sort((a, b) =>
          a.teacher.name.localeCompare(b.teacher.name),
        )

        setTeachersWithSubjects(teachersWithSubjectsArray)
      } catch (error) {
        console.error("Error loading filtered data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFilteredData()
  }, [selectedYear, selectedCourse, getSubjects, getTeachers, getFeedback, user])

  // Check if student has provided feedback for a specific subject
  const hasFeedback = (subjectId) => {
    return studentFeedback.some((f) => f.subjectId === subjectId)
  }

  return (
    <div className="p-6">
      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>Teachers</h1>

      <div className="card mb-6">
        <div className="card-header">
          <h2 className="card-title">Filter Teachers</h2>
          <p className="card-description">
            {selectedYear === user?.year?.toString() && selectedCourse === user?.course
              ? "Viewing teachers for your year and course"
              : "Select year and course to view relevant teachers"}
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

      <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Available Teachers</h2>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
          <div className="spinner"></div>
        </div>
      ) : teachersWithSubjects.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {teachersWithSubjects.map(({ teacher, subjects }) => (
            <div key={teacher.id} className="card">
              <div className="card-header">
                <h3 className="card-title">{teacher.name}</h3>
                <p className="card-description">
                  {teacher.subject} • {subjects.length} subject{subjects.length !== 1 ? "s" : ""} for Year{" "}
                  {selectedYear} - {selectedCourse}
                </p>
              </div>
              <div className="card-content">
                <div style={{ marginBottom: "1rem" }}>
                  <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                    <strong>Email:</strong> {teacher.email}
                  </p>
                </div>

                <h4 style={{ marginBottom: "0.75rem", fontSize: "1rem", fontWeight: "600" }}>Subjects:</h4>
                <div
                  style={{
                    display: "grid",
                    gap: "0.75rem",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  }}
                >
                  {subjects.map((subject) => (
                    <div
                      key={subject.id}
                      style={{
                        padding: "0.75rem",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius)",
                        backgroundColor: "var(--muted)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <h5 style={{ fontWeight: "500", marginBottom: "0.25rem" }}>{subject.name}</h5>
                          <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                            Year {subject.year} - {subject.course}
                          </p>
                        </div>
                        <div
                          style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}
                        >
                          {hasFeedback(subject.id) ? (
                            <span className="badge badge-positive" style={{ fontSize: "0.75rem" }}>
                              Feedback Given
                            </span>
                          ) : (
                            <Link
                              href={`/student/subjects/${subject.id}`}
                              className="btn btn-primary btn-sm"
                              style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}
                            >
                              Rate Subject
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="card-content text-center">
            <p className="text-muted">
              {selectedYear && selectedCourse
                ? "No teachers found for the selected year and course. Teachers need to add subjects for this year and course first."
                : "Please select a year and course to view teachers."}
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
