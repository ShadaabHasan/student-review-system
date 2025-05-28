"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Alert, AlertDescription } from "../components/ui/alert"
import { GraduationCap, Users, Eye, EyeOff, AlertCircle } from "lucide-react"
import { validateEmail, authenticateUser } from "../../utils/validation"

export default function LoginPage() {
  const [studentForm, setStudentForm] = useState({ email: "", password: "" })
  const [teacherForm, setTeacherForm] = useState({ email: "", password: "" })
  const [studentErrors, setStudentErrors] = useState({})
  const [teacherErrors, setTeacherErrors] = useState({})
  const [showStudentPassword, setShowStudentPassword] = useState(false)
  const [showTeacherPassword, setShowTeacherPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (form, userType) => {
    const errors = {}

    // Email validation
    const emailError = validateEmail(form.email)
    if (emailError) {
      errors.email = emailError
    }

    // Password validation
    if (!form.password) {
      errors.password = "Password is required"
    }

    return errors
  }

  const handleStudentLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate form
    const errors = validateForm(studentForm, "student")
    setStudentErrors(errors)

    if (Object.keys(errors).length === 0) {
      // Check authentication
      const authError = authenticateUser(studentForm.email, studentForm.password, "student")
      if (authError) {
        setStudentErrors({ auth: authError })
      } else {
        // Simulate API call delay
        setTimeout(() => {
          window.location.href = "/student/dashboard"
        }, 1000)
        return
      }
    }

    setIsLoading(false)
  }

  const handleTeacherLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate form
    const errors = validateForm(teacherForm, "teacher")
    setTeacherErrors(errors)

    if (Object.keys(errors).length === 0) {
      // Check authentication
      const authError = authenticateUser(teacherForm.email, teacherForm.password, "teacher")
      if (authError) {
        setTeacherErrors({ auth: authError })
      } else {
        // Simulate API call delay
        setTimeout(() => {
          window.location.href = "/teacher/dashboard"
        }, 1000)
        return
      }
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Student
              </TabsTrigger>
              <TabsTrigger value="teacher" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Teacher
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <form onSubmit={handleStudentLogin} className="space-y-4">
                {studentErrors.auth && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{studentErrors.auth}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="student@university.edu"
                    value={studentForm.email}
                    onChange={(e) => {
                      setStudentForm({ ...studentForm, email: e.target.value })
                      if (studentErrors.email) {
                        setStudentErrors({ ...studentErrors, email: null })
                      }
                    }}
                    className={studentErrors.email ? "border-red-500" : ""}
                    required
                  />
                  {studentErrors.email && <p className="text-sm text-red-500">{studentErrors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="student-password"
                      type={showStudentPassword ? "text" : "password"}
                      value={studentForm.password}
                      onChange={(e) => {
                        setStudentForm({ ...studentForm, password: e.target.value })
                        if (studentErrors.password) {
                          setStudentErrors({ ...studentErrors, password: null })
                        }
                      }}
                      className={studentErrors.password ? "border-red-500 pr-10" : "pr-10"}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowStudentPassword(!showStudentPassword)}
                    >
                      {showStudentPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {studentErrors.password && <p className="text-sm text-red-500">{studentErrors.password}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In as Student"}
                </Button>
              </form>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 font-medium">Demo Credentials:</p>
                <p className="text-xs text-blue-600">Email: john.doe@gmail.com</p>
                <p className="text-xs text-blue-600">Password: Student123!</p>
              </div>
            </TabsContent>

            <TabsContent value="teacher">
              <form onSubmit={handleTeacherLogin} className="space-y-4">
                {teacherErrors.auth && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{teacherErrors.auth}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="teacher-email">Email</Label>
                  <Input
                    id="teacher-email"
                    type="email"
                    placeholder="teacher@university.edu"
                    value={teacherForm.email}
                    onChange={(e) => {
                      setTeacherForm({ ...teacherForm, email: e.target.value })
                      if (teacherErrors.email) {
                        setTeacherErrors({ ...teacherErrors, email: null })
                      }
                    }}
                    className={teacherErrors.email ? "border-red-500" : ""}
                    required
                  />
                  {teacherErrors.email && <p className="text-sm text-red-500">{teacherErrors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teacher-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="teacher-password"
                      type={showTeacherPassword ? "text" : "password"}
                      value={teacherForm.password}
                      onChange={(e) => {
                        setTeacherForm({ ...teacherForm, password: e.target.value })
                        if (teacherErrors.password) {
                          setTeacherErrors({ ...teacherErrors, password: null })
                        }
                      }}
                      className={teacherErrors.password ? "border-red-500 pr-10" : "pr-10"}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowTeacherPassword(!showTeacherPassword)}
                    >
                      {showTeacherPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {teacherErrors.password && <p className="text-sm text-red-500">{teacherErrors.password}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In as Teacher"}
                </Button>
              </form>

              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-700 font-medium">Demo Credentials:</p>
                <p className="text-xs text-green-600">Email: dr.smith@university.edu</p>
                <p className="text-xs text-green-600">Password: Teacher123!</p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
