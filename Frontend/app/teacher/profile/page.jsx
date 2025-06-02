"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-provider"
import { doc, updateDoc, collection, getDocs, query, where, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebaseConfig"

export default function TeacherProfile() {
  const { user, addSubject } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [subject, setSubject] = useState(user?.subject || "")
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateMessage, setUpdateMessage] = useState("")

  // For managing subjects
  const [subjects, setSubjects] = useState([])
  const [isAddingSubject, setIsAddingSubject] = useState(false)
  const [newSubjectName, setNewSubjectName] = useState("")
  const [newSubjectYear, setNewSubjectYear] = useState("1")
  const [newSubjectCourse, setNewSubjectCourse] = useState("Science")
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true)

  // Available courses
  const availableCourses = ["Science", "Arts", "Commerce", "Engineering"]
  const availableYears = [1, 2, 3, 4]

  useEffect(() => {
    if (user) {
      setName(user.name || "")
      setEmail(user.email || "")
      setSubject(user.subject || "")
      loadTeacherSubjects()
    }
  }, [user])

  const loadTeacherSubjects = async () => {
    if (!user) return

    setIsLoadingSubjects(true)
    try {
      console.log("Loading subjects for teacher:", user.id)
      const q = query(collection(db, "subjects"), where("teacherId", "==", user.id))
      const querySnapshot = await getDocs(q)
      const subjectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      console.log("Loaded subjects:", subjectsData)

      // Sort subjects by course, then by year, then by name
      subjectsData.sort((a, b) => {
        if (a.course !== b.course) return a.course.localeCompare(b.course)
        if (a.year !== b.year) return a.year - b.year
        return a.name.localeCompare(b.name)
      })
      setSubjects(subjectsData)
    } catch (error) {
      console.error("Error loading subjects:", error)
      setUpdateMessage("Failed to load subjects. Please refresh the page.")
    } finally {
      setIsLoadingSubjects(false)
    }
  }

  const handleSave = async () => {
    setIsUpdating(true)
    setUpdateMessage("")

    try {
      await updateDoc(doc(db, "users", user.id), {
        name,
        subject,
      })

      setUpdateMessage("Profile updated successfully!")
      setIsEditing(false)

      // Update local user object
      user.name = name
      user.subject = subject
    } catch (error) {
      console.error("Error updating profile:", error)
      setUpdateMessage("Failed to update profile. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCancel = () => {
    setName(user?.name || "")
    setEmail(user?.email || "")
    setSubject(user?.subject || "")
    setIsEditing(false)
    setUpdateMessage("")
  }

  const handleAddSubject = async () => {
    if (!newSubjectName.trim()) {
      setUpdateMessage("Subject name cannot be empty")
      return
    }

    if (!user || !user.id) {
      setUpdateMessage("User not found. Please refresh the page and try again.")
      return
    }

    // Check if this exact combination already exists
    const existingSubject = subjects.find(
      (s) =>
        s.name.toLowerCase() === newSubjectName.toLowerCase() &&
        s.year === Number(newSubjectYear) &&
        s.course === newSubjectCourse,
    )

    if (existingSubject) {
      setUpdateMessage("This subject already exists for the selected year and course")
      return
    }

    setIsUpdating(true)
    setUpdateMessage("")

    try {
      console.log("Adding new subject...")

      const subjectData = {
        name: newSubjectName.trim(),
        year: Number(newSubjectYear),
        course: newSubjectCourse,
        teacherId: user.id,
        teacherName: user.name,
      }

      console.log("Subject data to add:", subjectData)

      const newSubject = await addSubject(subjectData)

      console.log("Subject added successfully:", newSubject)

      setUpdateMessage("Subject added successfully!")
      setNewSubjectName("")
      setNewSubjectYear("1")
      setNewSubjectCourse("Science")
      setIsAddingSubject(false)

      // Reload subjects to show the new one
      await loadTeacherSubjects()
    } catch (error) {
      console.error("Error adding subject:", error)
      setUpdateMessage(`Failed to add subject: ${error.message}`)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteSubject = async (subjectId) => {
    if (!confirm("Are you sure you want to delete this subject? This will also delete all associated feedback.")) {
      return
    }

    setIsUpdating(true)
    setUpdateMessage("")

    try {
      console.log("Deleting subject:", subjectId)
      await deleteDoc(doc(db, "subjects", subjectId))
      console.log("Subject deleted successfully")

      setUpdateMessage("Subject deleted successfully!")
      await loadTeacherSubjects()
    } catch (error) {
      console.error("Error deleting subject:", error)
      setUpdateMessage("Failed to delete subject. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }

  // Group subjects by course for better display
  const subjectsByCourse = subjects.reduce((acc, subject) => {
    if (!acc[subject.course]) {
      acc[subject.course] = []
    }
    acc[subject.course].push(subject)
    return acc
  }, {})

  return (
    <div className="p-6">
      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>Teacher Profile</h1>

      {/* Debug Information - Remove this in production */}
      {/* process.env.NODE_ENV === "development" && (
        <div className="card" style={{ marginBottom: "1rem", backgroundColor: "#f0f0f0" }}>
          <div className="card-content">
            <p style={{ fontSize: "0.875rem" }}>
              <strong>Debug Info:</strong> User ID: {user?.id}, Name: {user?.name}
            </p>
            <p style={{ fontSize: "0.875rem" }}>Subjects count: {subjects.length}</p>
          </div>
        </div>
      ) */}

      <div className="card" style={{ maxWidth: "600px", marginBottom: "2rem" }}>
        <div className="card-header">
          <h2 className="card-title">Personal Information</h2>
          <p className="card-description">Manage your account details</p>
        </div>
        <div className="card-content">
          {isEditing ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="form-input"
                  style={{ backgroundColor: "var(--muted)" }}
                />
                <p className="text-sm text-muted" style={{ marginTop: "0.25rem" }}>
                  Email cannot be changed
                </p>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label className="form-label">Full Name</label>
                <p style={{ fontSize: "1rem", fontWeight: "500" }}>{user?.name}</p>
              </div>
              <div>
                <label className="form-label">Email</label>
                <p style={{ fontSize: "1rem", fontWeight: "500" }}>{user?.email}</p>
              </div>
              <div>
                <label className="form-label">Role</label>
                <p style={{ fontSize: "1rem", fontWeight: "500", textTransform: "capitalize" }}>{user?.role}</p>
              </div>
            </div>
          )}

          {updateMessage && (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.75rem",
                borderRadius: "0.375rem",
                backgroundColor:
                  updateMessage.includes("Failed") || updateMessage.includes("already exists") ? "#fee2e2" : "#dcfce7",
                color:
                  updateMessage.includes("Failed") || updateMessage.includes("already exists") ? "#991b1b" : "#166534",
              }}
            >
              {updateMessage}
            </div>
          )}
        </div>
        <div className="card-footer">
          {isEditing ? (
            <div style={{ display: "flex", gap: "1rem" }}>
              <button className="btn btn-primary" onClick={handleSave} disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
              <button className="btn btn-outline" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Subjects Management Section */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Subjects You Teach</h2>
          <p className="card-description">Manage the subjects you teach across different courses and years</p>
        </div>
        <div className="card-content">
          {isLoadingSubjects ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              {subjects.length > 0 ? (
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr>
                          <th
                            style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid var(--border)" }}
                          >
                            Subject Name
                          </th>
                          <th
                            style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid var(--border)" }}
                          >
                            Course
                          </th>
                          <th
                            style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid var(--border)" }}
                          >
                            Year
                          </th>
                          <th
                            style={{
                              textAlign: "right",
                              padding: "0.75rem",
                              borderBottom: "1px solid var(--border)",
                            }}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjects.map((subject) => (
                          <tr key={subject.id}>
                            <td style={{ padding: "0.75rem", borderBottom: "1px solid var(--border)" }}>
                              {subject.name}
                            </td>
                            <td style={{ padding: "0.75rem", borderBottom: "1px solid var(--border)" }}>
                              {subject.course}
                            </td>
                            <td style={{ padding: "0.75rem", borderBottom: "1px solid var(--border)" }}>
                              Year {subject.year}
                            </td>
                            <td
                              style={{
                                padding: "0.75rem",
                                borderBottom: "1px solid var(--border)",
                                textAlign: "right",
                              }}
                            >
                              <button
                                className="btn btn-outline btn-sm"
                                style={{ color: "var(--destructive)" }}
                                onClick={() => handleDeleteSubject(subject.id)}
                                disabled={isUpdating}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <p className="text-muted" style={{ textAlign: "center", padding: "1rem" }}>
                  You haven't added any subjects yet. Add subjects below to make them available to students.
                </p>
              )}

              {isAddingSubject ? (
                <div
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "1.5rem",
                    marginTop: "1rem",
                    backgroundColor: "var(--muted)",
                  }}
                >
                  <h3 style={{ marginBottom: "1rem", fontSize: "1.125rem", fontWeight: "600" }}>Add New Subject</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div className="form-group">
                      <label htmlFor="newSubjectName" className="form-label">
                        Subject Name *
                      </label>
                      <input
                        id="newSubjectName"
                        type="text"
                        value={newSubjectName}
                        onChange={(e) => setNewSubjectName(e.target.value)}
                        className="form-input"
                        placeholder="e.g., Calculus I, Physics 101, English Literature"
                        required
                      />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="form-group">
                        <label htmlFor="newSubjectCourse" className="form-label">
                          Course *
                        </label>
                        <select
                          id="newSubjectCourse"
                          value={newSubjectCourse}
                          onChange={(e) => setNewSubjectCourse(e.target.value)}
                          className="form-select"
                          required
                        >
                          {availableCourses.map((course) => (
                            <option key={course} value={course}>
                              {course}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="newSubjectYear" className="form-label">
                          Year *
                        </label>
                        <select
                          id="newSubjectYear"
                          value={newSubjectYear}
                          onChange={(e) => setNewSubjectYear(e.target.value)}
                          className="form-select"
                          required
                        >
                          {availableYears.map((year) => (
                            <option key={year} value={year.toString()}>
                              Year {year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                      <button
                        className="btn btn-outline"
                        onClick={() => {
                          setIsAddingSubject(false)
                          setNewSubjectName("")
                          setUpdateMessage("")
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={handleAddSubject}
                        disabled={isUpdating || !newSubjectName.trim()}
                      >
                        {isUpdating ? "Adding..." : "Add Subject"}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button className="btn btn-primary" onClick={() => setIsAddingSubject(true)} disabled={isUpdating}>
                  Add New Subject
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
