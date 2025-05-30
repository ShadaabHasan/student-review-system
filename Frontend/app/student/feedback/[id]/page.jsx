"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Textarea } from "../../../components/ui/textarea"
import { Label } from "../../../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import { ArrowLeft, Star } from "lucide-react"
import Link from "next/link"

const mockSubject = {
  id: 1,
  name: "Programming Fundamentals",
  teacher: "Dr. Smith",
  code: "CS101",
}

export default function FeedbackPage() {
  const params = useParams()
  const router = useRouter()
  const [rating, setRating] = useState("")
  const [feedback, setFeedback] = useState("")
  const [teachingMethod, setTeachingMethod] = useState("")
  const [clarity, setClarity] = useState("")
  const [engagement, setEngagement] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock submission
    alert("Feedback submitted successfully!")
    router.push("/student/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/student/dashboard">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Provide Feedback</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subject Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              {mockSubject.name}
            </CardTitle>
            <CardDescription>
              {mockSubject.code} • Instructor: {mockSubject.teacher}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Overall Rating */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Rating</CardTitle>
                <CardDescription>Rate your overall experience with this subject</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={rating} onValueChange={setRating}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excellent" id="excellent" />
                    <Label htmlFor="excellent">Excellent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="good" />
                    <Label htmlFor="good">Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="average" id="average" />
                    <Label htmlFor="average">Average</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poor" id="poor" />
                    <Label htmlFor="poor">Poor</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Teaching Method */}
            <Card>
              <CardHeader>
                <CardTitle>Teaching Method</CardTitle>
                <CardDescription>How would you rate the teaching methodology?</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={teachingMethod} onValueChange={setTeachingMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very-effective" id="very-effective" />
                    <Label htmlFor="very-effective">Very Effective</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="effective" id="effective" />
                    <Label htmlFor="effective">Effective</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="neutral" id="neutral" />
                    <Label htmlFor="neutral">Neutral</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ineffective" id="ineffective" />
                    <Label htmlFor="ineffective">Ineffective</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Clarity */}
            <Card>
              <CardHeader>
                <CardTitle>Clarity of Explanation</CardTitle>
                <CardDescription>How clear are the instructor's explanations?</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={clarity} onValueChange={setClarity}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very-clear" id="very-clear" />
                    <Label htmlFor="very-clear">Very Clear</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="clear" id="clear" />
                    <Label htmlFor="clear">Clear</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="somewhat-clear" id="somewhat-clear" />
                    <Label htmlFor="somewhat-clear">Somewhat Clear</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unclear" id="unclear" />
                    <Label htmlFor="unclear">Unclear</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Engagement */}
            <Card>
              <CardHeader>
                <CardTitle>Student Engagement</CardTitle>
                <CardDescription>How well does the instructor engage students?</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={engagement} onValueChange={setEngagement}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="highly-engaging" id="highly-engaging" />
                    <Label htmlFor="highly-engaging">Highly Engaging</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="engaging" id="engaging" />
                    <Label htmlFor="engaging">Engaging</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderately-engaging" id="moderately-engaging" />
                    <Label htmlFor="moderately-engaging">Moderately Engaging</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not-engaging" id="not-engaging" />
                    <Label htmlFor="not-engaging">Not Engaging</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Written Feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Comments</CardTitle>
                <CardDescription>Please provide any additional feedback or suggestions</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Share your thoughts about the teaching quality, course content, or any suggestions for improvement..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[120px]"
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Submit Feedback
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
