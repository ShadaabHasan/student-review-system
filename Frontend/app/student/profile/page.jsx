"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-provider"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebaseConfig"

export default function StudentProfile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [year, setYear] = useState(user?.year || "")
  const [course, setCourse] = useState(user?.course || "")
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateMessage, setUpdateMessage] = useState("")

  useEffect(() => {
    if (user) {
      setName(user.name || "")
      setEmail(user.email || "")
      setYear(user.year || "")
      setCourse(user.course || "")
    }
  }, [user])

  const handleSave = async () => {
    setIsUpdating(true)
    setUpdateMessage("")

    try {
      // Update user document in Firestore
      await updateDoc(doc(db, "users", user.id), {
        name,
        year: Number(year),
        course,
      })

      setUpdateMessage("Profile updated successfully!")
      setIsEditing(false)

      // Update local user object
      user.name = name
      user.year = Number(year)
      user.course = course
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
    setYear(user?.year || "")
    setCourse(user?.course || "")
    setIsEditing(false)
    setUpdateMessage("")
  }

  return (
    <div className="p-6">
      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>Student Profile</h1>

      <div className="card" style={{ maxWidth: "600px" }}>
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
              <div className="form-group">
                <label htmlFor="year" className="form-label">
                  Year
                </label>
                <select id="year" value={year} onChange={(e) => setYear(e.target.value)} className="form-select">
                  <option value="1">Year 1</option>
                  <option value="2">Year 2</option>
                  <option value="3">Year 3</option>
                  <option value="4">Year 4</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="course" className="form-label">
                  Course
                </label>
                <select id="course" value={course} onChange={(e) => setCourse(e.target.value)} className="form-select">
                  <option value="Science">Science</option>
                  <option value="Arts">Arts</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Engineering">Engineering</option>
                </select>
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
                <label className="form-label">Year</label>
                <p style={{ fontSize: "1rem", fontWeight: "500" }}>Year {user?.year}</p>
              </div>
              <div>
                <label className="form-label">Course</label>
                <p style={{ fontSize: "1rem", fontWeight: "500" }}>{user?.course}</p>
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
                backgroundColor: updateMessage.includes("Failed") ? "#fee2e2" : "#dcfce7",
                color: updateMessage.includes("Failed") ? "#991b1b" : "#166534",
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
    </div>
  )
}
