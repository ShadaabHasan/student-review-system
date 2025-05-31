"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-provider"

export default function StudentProfile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")

  const handleSave = () => {
    // In a real app, you would update the user data via API
    console.log("Saving profile:", { name, email })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setName(user?.name || "")
    setEmail(user?.email || "")
    setIsEditing(false)
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
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
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
        </div>
        <div className="card-footer">
          {isEditing ? (
            <div style={{ display: "flex", gap: "1rem" }}>
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
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
