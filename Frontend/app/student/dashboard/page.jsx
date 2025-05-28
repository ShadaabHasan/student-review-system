"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BookOpen, User, LogOut, Star } from "lucide-react"
import Link from "next/link"

const mockSubjects = {
  "1-cse": [
    { id: 1, name: "Programming Fundamentals", teacher: "Dr. Smith", code: "CS101" },
    { id: 2, name: "Mathematics I", teacher: "Prof. Johnson", code: "MATH101" },
    { id: 3, name: "Physics", teacher: "Dr. Brown", code: "PHY101" },
  ],
  "2-cse": [
    { id: 4, name: "Data Structures", teacher: "Dr. Wilson", code: "CS201" },
    { id: 5, name: "Database Systems", teacher: "Prof. Davis", code: "CS202" },
    { id: 6, name: "Computer Networks", teacher: "Dr. Miller", code: "CS203" },
  ],
}

export default function StudentDashboard() {
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("")

  const subjects = mockSubjects[`${selectedYear}-${selectedCourse}`] || []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Student Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700">John Doe</span>
              </div>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Select your year and course to view subjects and provide feedback</p>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Academic Year</CardTitle>
              <CardDescription>Select your current academic year</CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course</CardTitle>
              <CardDescription>Select your course of study</CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cse">Computer Science Engineering</SelectItem>
                  <SelectItem value="ece">Electronics & Communication</SelectItem>
                  <SelectItem value="me">Mechanical Engineering</SelectItem>
                  <SelectItem value="ce">Civil Engineering</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Subjects List */}
        {subjects.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Subjects</CardTitle>
              <CardDescription>Click on a subject to provide feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((subject) => (
                  <Link key={subject.id} href={`/student/feedback/${subject.id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{subject.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{subject.teacher}</p>
                            <Badge variant="secondary">{subject.code}</Badge>
                          </div>
                          <Star className="h-5 w-5 text-yellow-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedYear && selectedCourse && subjects.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No subjects found for the selected year and course.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
