"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { mockSubjects, mockFeedback, mockTeachers } from "@/lib/auth-provider"
import { Star } from "lucide-react"

export default function SubjectPage({ params }) {
  const router = useRouter()
  const { user } = useAuth()
  const [rating, setRating] = useState("3")
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
      <div style={{ padding: "1.5rem" }}>
        <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>Subject Not Found</h1>
        <p>The subject you're looking for doesn't exist.</p>
        <Button style={{ marginTop: "1rem" }} onClick={() => router.push("/student/subjects")}>
          Back to Subjects
        </Button>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Determine sentiment based on rating
    let sentiment = "neutral"
    const ratingNum = Number.parseInt(rating)
    if (ratingNum >= 4) sentiment = "positive"
    else if (ratingNum <= 2) sentiment = "negative"

    // In a real app, you would send this to your API
    setTimeout(() => {
      // Create new feedback object
      const newFeedback = {
        id: `f${Date.now()}`,
        subjectId: subject.id,
        teacherId: teacher.id,
        studentId: user?.id || "",
        rating: ratingNum,
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
    <div style={{ padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.875rem", fontWeight: "bold" }}>{subject.name}</h1>

      <div
        style={{
          marginBottom: "1.5rem",
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Subject Information</CardTitle>
            <CardDescription>Details about this subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div>
                <span style={{ fontWeight: "500" }}>Course:</span> {subject.course}
              </div>
              <div>
                <span style={{ fontWeight: "500" }}>Year:</span> {subject.year}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teacher Information</CardTitle>
            <CardDescription>About your instructor</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div>
                <span style={{ fontWeight: "500" }}>Name:</span> {teacher.name}
              </div>
              <div>
                <span style={{ fontWeight: "500" }}>Email:</span> {teacher.email}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {submitted ? (
        <Card>
          <CardHeader>
            <CardTitle>Feedback Submitted</CardTitle>
            <CardDescription>Thank you for your feedback!</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Your feedback has been recorded and will help improve the teaching quality.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/student/subjects")}>Back to Subjects</Button>
          </CardFooter>
        </Card>
      ) : existingFeedback ? (
        <Card>
          <CardHeader>
            <CardTitle>Your Previous Feedback</CardTitle>
            <CardDescription>You have already provided feedback for this subject</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/student/subjects")}>Back to Subjects</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Rate This Subject</CardTitle>
              <CardDescription>Provide your feedback about the teaching quality</CardDescription>
            </CardHeader>
            <CardContent style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Label>Rating</Label>
                <RadioGroup value={rating} onValueChange={setRating} style={{ display: "flex", gap: "1rem" }}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div
                      key={value}
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}
                    >
                      <RadioGroupItem value={value.toString()} id={`rating-${value}`} style={{ display: "none" }} />
                      <Label
                        htmlFor={`rating-${value}`}
                        style={{
                          display: "flex",
                          height: "2.5rem",
                          width: "2.5rem",
                          cursor: "pointer",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          backgroundColor:
                            Number.parseInt(rating) >= value ? "hsl(var(--primary))" : "hsl(var(--muted))",
                          color:
                            Number.parseInt(rating) >= value
                              ? "hsl(var(--primary-foreground))"
                              : "hsl(var(--muted-foreground))",
                        }}
                      >
                        <Star
                          style={{
                            height: "1.25rem",
                            width: "1.25rem",
                            fill: Number.parseInt(rating) >= value ? "currentColor" : "none",
                          }}
                        />
                      </Label>
                      <span style={{ fontSize: "0.75rem" }}>{value}</span>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  placeholder="Share your experience with this teacher..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={5}
                  required
                />
              </div>
            </CardContent>
            <CardFooter style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="button" variant="outline" onClick={() => router.push("/student/subjects")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  )
}
