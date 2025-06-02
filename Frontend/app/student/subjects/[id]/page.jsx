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

  const loadData = async () => {
    try {
      console.log("Loading data for subject:", params.id)
      const [subjectsData, teachersData, feedbackData] = await Promise.all([
        getSubjects(),
        getTeachers(),
        getFeedback({ studentId: user?.id, subjectId: params.id }),
      ])

      console.log("Subjects data:", subjectsData)
      console.log("Teachers data:", teachersData)
      console.log("Feedback data:", feedbackData)

      const foundSubject = subjectsData.find((s) => s.id === params.id)
      const foundTeacher = foundSubject ? teachersData.find((t) => t.id === foundSubject.teacherId) : null
      const foundFeedback = feedbackData.find((f) => f.subjectId === params.id && f.studentId === user?.id)

      console.log("Found subject:", foundSubject)
      console.log("Found teacher:", foundTeacher)
      console.log("Found feedback:", foundFeedback)

      setSubject(foundSubject)
      setTeacher(foundTeacher)
      setExistingFeedback(foundFeedback)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user, params.id])

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
        <button className="btn btn-primary mt-4" onClick={() => router.push("/student/teachers")}>
          Back to Teachers
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

      const feedbackData = {
        subjectId: subject.id,
        teacherId: teacher.id,
        studentId: user.id,
        rating: rating,
        comment,
        sentiment,
      }

      console.log("Submitting feedback:", feedbackData)

      const newFeedback = await addFeedback(feedbackData)

      console.log("Feedback submitted successfully:", newFeedback)

      setSubmitted(true)

      // Reload data to show the new feedback
      await loadData()
    } catch (error) {
      console.error("Error submitting feedback:", error)
      alert(`Failed to submit feedback: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6">
      <div style={{ marginBottom: "1.5rem" }}>
        <button className="btn btn-outline btn-sm" onClick={() => router.push("/student/teachers")}>
          ← Back to Teachers
        </button>
      </div>

      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>
        {subject.name} - {teacher.name}
      </h1>

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
                <span style={{ fontWeight: "500" }}>Subject:</span> {subject.name}
              </div>
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
                <span style={{ fontWeight: "500" }}>Main Subject:</span> {teacher.subject}
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
            <button className="btn btn-primary" onClick={() => router.push("/student/teachers")}>
              Back to Teachers
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
            <button className="btn btn-primary" onClick={() => router.push("/student/teachers")}>
              Back to Teachers
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="card-header">
              <h2 className="card-title">Rate This Subject</h2>
              <p className="card-description">
                Provide your feedback about {teacher.name}'s teaching of {subject.name}
              </p>
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
                  placeholder={`Share your experience with ${teacher.name}'s teaching of ${subject.name}...`}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={5}
                  required
                  className="form-textarea"
                />
              </div>
            </div>
            <div className="card-footer" style={{ display: "flex", justifyContent: "space-between" }}>
              <button type="button" className="btn btn-outline" onClick={() => router.push("/student/teachers")}>
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
