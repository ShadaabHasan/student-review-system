"use client"

import { useState } from "react"
import Link from "next/link"
import { mockSubjects, mockTeachers } from "@/lib/auth-provider"

export default function SubjectsPage() {
  const [selectedYear, setSelectedYear] = useState("1")
  const [selectedCourse, setSelectedCourse] = useState("Science")

  // Get unique years and courses
  const years = Array.from(new Set(mockSubjects.map((subject) => subject.year)))
  const courses = Array.from(new Set(mockSubjects.map((subject) => subject.course)))

  // Filter subjects based on selection
  const filteredSubjects = mockSubjects.filter(
    (subject) => subject.year === Number.parseInt(selectedYear) && subject.course === selectedCourse,
  )

  // Group subjects by name to avoid duplicates
  const groupedSubjects = filteredSubjects.reduce((acc, subject) => {
    if (!acc[subject.name]) {
      acc[subject.name] = subject
    }
    return acc
  }, {})

  const uniqueSubjects = Object.values(groupedSubjects)

  return (
    <div className="p-6">
      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>Select Subjects</h1>

      <div className="card mb-6">
        <div className="card-header">
          <h2 className="card-title">Filter Subjects</h2>
          <p className="card-description">Select your year and course to view relevant subjects</p>
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

      <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Available Subjects</h2>

      {uniqueSubjects.length > 0 ? (
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {uniqueSubjects.map((subject) => {
            const teacher = mockTeachers.find((t) => t.id === subject.teacherId)

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
                    <span style={{ fontWeight: "500" }}>Teacher:</span> {teacher?.name}
                  </p>
                  <Link href={`/student/subjects/${subject.id}`} className="btn btn-primary btn-block">
                    View and Rate
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="card">
          <div className="card-content text-center">
            <p className="text-muted">No subjects found for the selected criteria.</p>
          </div>
        </div>
      )}
    </div>
  )
}
