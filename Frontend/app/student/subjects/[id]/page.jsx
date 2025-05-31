"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { mockSubjects, mockFeedback, mockTeachers } from "@/lib/auth-provider"
import { Star } from "lucide-react"

export default function SubjectPage({ params }) {
  const router = useRouter()
  const { user } = useAuth()
  const [rating, setRating] = useState(3)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Find the subject
  const subject = mockSubjects.find((s) => s.id === params.id)

  // Find the teacher
  const teacher = subject ? mockTeachers.find((t) => t.id === subject.teacherId) : null

  // Find existing feedback from this student for this subject
  const existingFeedback = mockFeedback.find((f) => f.subjectId === params.id && f.studentId === user?.id)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Determine sentiment based on rating
    let sentiment = "neutral"
    if (rating >= 4) sentiment = "positive"
    else if (rating <= 2) sentiment = "negative"

    // In a real app, you would send this to your API
    setTimeout(() => {
      // Create new feedback object
      const newFeedback = {
        id: `f${Date.now()}`,
        subjectId: subject.id,
        teacherId: teacher.id,
        studentId: user?.id || "",
        rating: rating,
        comment,
        sentiment,
        date: new Date().toISOString().split("T")[0],
      }

      // Add to mock data (in a real app, this would be saved to a database)
      mockFeedback.push(newFeedback)

      setIsSubmitting(false)
      setSubmitted(true)
    }, 1000)
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
