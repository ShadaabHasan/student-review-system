"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, Users, Eye, EyeOff, CheckCircle } from "lucide-react"
import { validateEmail, validatePassword, checkEmailExists } from "../../utils/validation"

export default function SignupPage() {
  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    year: "",
    course: "",
  })
  const [teacherForm, setTeacherForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    subjects: "",
  })
  const [studentErrors, setStudentErrors] = useState({})
  const [teacherErrors, setTeacherErrors] = useState({})
  const [showStudentPassword, setShowStudentPassword] = useState(false)
  const [showTeacherPassword, setShowTeacherPassword] = useState(false)
  const [showStudentConfirmPassword, setShowStudentConfirmPassword] = useState(false)
  const [showTeacherConfirmPassword, setShowTeacherConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getPasswordStrength = (password) => {
    let strength = 0
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    ]

    strength = checks.filter(Boolean).length
    return { strength: (strength / 5) * 100, checks }
  }

  const validateForm = (form, userType) => {
    const errors = {}

    // Name validation
    if (!form.name.trim()) {
      errors.name = "Name is required"
    } else if (form.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters long"
    }

    // Email validation
    const emailError = validateEmail(form.email)
    if (emailError) {
      errors.email = emailError
    } else {
      // Check if email already exists
      const existsError = checkEmailExists(form.email, userType)
      if (existsError) {
        errors.email = existsError
      }
    }

    // Password validation
    const passwordError = validatePassword(form.password)
    if (passwordError) {
      errors.password = passwordError
    }

    // Confirm password validation
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    // Role-specific validation
    if (userType === "student") {
      if (!form.year) {
        errors.year = "Please select your year"
      }
      if (!form.course) {
        errors.course = "Please select your course"
      }
    } else {
      if (!form.department) {
        errors.department = "Please select your department"
      }
    }

    return errors
  }

  const handleStudentSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const errors = validateForm(studentForm, "student")
    setStudentErrors(errors)

    if (Object.keys(errors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        alert("Account created successfully! Please login.")
        window.location.href = "/login"
      }, 2000)
      return
    }

    setIsLoading(false)
  }

  const handleTeacherSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const errors = validateForm(teacherForm, "teacher")
    setTeacherErrors(errors)

    if (Object.keys(errors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        alert("Account created successfully! Please login.")
        window.location.href = "/login"
      }, 2000)
      return
    }

    setIsLoading(false)
  }

  const PasswordStrengthIndicator = ({ password }) => {
    const { strength, checks } = getPasswordStrength(password)

    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Progress value={strength} className="flex-1 h-2" />
          <span className="text-xs text-gray-500">{strength < 40 ? "Weak" : strength < 80 ? "Medium" : "Strong"}</span>
        </div>
        <div className="grid grid-cols-1 gap-1 text-xs">
          <div className={`flex items-center space-x-1 ${checks[0] ? "text-green-600" : "text-gray-400"}`}>
            {checks[0] ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <div className="w-3 h-3 rounded-full border border-gray-300" />
            )}
            <span>At least 8 characters</span>
          </div>
          <div className={`flex items-center space-x-1 ${checks[1] ? "text-green-600" : "text-gray-400"}`}>
            {checks[1] ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <div className="w-3 h-3 rounded-full border border-gray-300" />
            )}
            <span>One uppercase letter</span>
          </div>
          <div className={`flex items-center space-x-1 ${checks[2] ? "text-green-600" : "text-gray-400"}`}>
            {checks[2] ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <div className="w-3 h-3 rounded-full border border-gray-300" />
            )}
            <span>One lowercase letter</span>
          </div>
          <div className={`flex items-center space-x-1 ${checks[3] ? "text-green-600" : "text-gray-400"}`}>
            {checks[3] ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <div className="w-3 h-3 rounded-full border border-gray-300" />
            )}
            <span>One number</span>
          </div>
          <div className={`flex items-center space-x-1 ${checks[4] ? "text-green-600" : "text-gray-400"}`}>
            {checks[4] ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <div className="w-3 h-3 rounded-full border border-gray-300" />
            )}
            <span>One special character</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Join our educational feedback system</CardDescription>
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
              <form onSubmit={handleStudentSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-name">Full Name</Label>
                  <Input
                    id="student-name"
                    placeholder="John Doe"
                    value={studentForm.name}
                    onChange={(e) => {
                      setStudentForm({ ...studentForm, name: e.target.value })
                      if (studentErrors.name) {
                        setStudentErrors({ ...studentErrors, name: null })
                      }
                    }}
                    className={studentErrors.name ? "border-red-500" : ""}
                    required
                  />
                  {studentErrors.name && <p className="text-sm text-red-500">{studentErrors.name}</p>}
                </div>

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
                  <p className="text-xs text-gray-500">Use institutional email (@gmail.com, @edu, @ac.in, etc.)</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Select
                      onValueChange={(value) => {
                        setStudentForm({ ...studentForm, year: value })
                        if (studentErrors.year) {
                          setStudentErrors({ ...studentErrors, year: null })
                        }
                      }}
                    >
                      <SelectTrigger className={studentErrors.year ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                    {studentErrors.year && <p className="text-sm text-red-500">{studentErrors.year}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Select
                      onValueChange={(value) => {
                        setStudentForm({ ...studentForm, course: value })
                        if (studentErrors.course) {
                          setStudentErrors({ ...studentErrors, course: null })
                        }
                      }}
                    >
                      <SelectTrigger className={studentErrors.course ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cse">Computer Science</SelectItem>
                        <SelectItem value="ece">Electronics</SelectItem>
                        <SelectItem value="me">Mechanical</SelectItem>
                        <SelectItem value="ce">Civil</SelectItem>
                      </SelectContent>
                    </Select>
                    {studentErrors.course && <p className="text-sm text-red-500">{studentErrors.course}</p>}
                  </div>
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
                  {studentForm.password && <PasswordStrengthIndicator password={studentForm.password} />}
                  {studentErrors.password && <p className="text-sm text-red-500">{studentErrors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student-confirm">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="student-confirm"
                      type={showStudentConfirmPassword ? "text" : "password"}
                      value={studentForm.confirmPassword}
                      onChange={(e) => {
                        setStudentForm({ ...studentForm, confirmPassword: e.target.value })
                        if (studentErrors.confirmPassword) {
                          setStudentErrors({ ...studentErrors, confirmPassword: null })
                        }
                      }}
                      className={studentErrors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowStudentConfirmPassword(!showStudentConfirmPassword)}
                    >
                      {showStudentConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {studentErrors.confirmPassword && (
                    <p className="text-sm text-red-500">{studentErrors.confirmPassword}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Student Account"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="teacher">
              <form onSubmit={handleTeacherSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teacher-name">Full Name</Label>
                  <Input
                    id="teacher-name"
                    placeholder="Dr. Jane Smith"
                    value={teacherForm.name}
                    onChange={(e) => {
                      setTeacherForm({ ...teacherForm, name: e.target.value })
                      if (teacherErrors.name) {
                        setTeacherErrors({ ...teacherErrors, name: null })
                      }
                    }}
                    className={teacherErrors.name ? "border-red-500" : ""}
                    required
                  />
                  {teacherErrors.name && <p className="text-sm text-red-500">{teacherErrors.name}</p>}
                </div>

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
                  <p className="text-xs text-gray-500">Use institutional email (@gmail.com, @edu, @ac.in, etc.)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    onValueChange={(value) => {
                      setTeacherForm({ ...teacherForm, department: value })
                      if (teacherErrors.department) {
                        setTeacherErrors({ ...teacherErrors, department: null })
                      }
                    }}
                  >
                    <SelectTrigger className={teacherErrors.department ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cse">Computer Science</SelectItem>
                      <SelectItem value="ece">Electronics</SelectItem>
                      <SelectItem value="me">Mechanical</SelectItem>
                      <SelectItem value="ce">Civil</SelectItem>
                    </SelectContent>
                  </Select>
                  {teacherErrors.department && <p className="text-sm text-red-500">{teacherErrors.department}</p>}
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
                  {teacherForm.password && <PasswordStrengthIndicator password={teacherForm.password} />}
                  {teacherErrors.password && <p className="text-sm text-red-500">{teacherErrors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teacher-confirm">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="teacher-confirm"
                      type={showTeacherConfirmPassword ? "text" : "password"}
                      value={teacherForm.confirmPassword}
                      onChange={(e) => {
                        setTeacherForm({ ...teacherForm, confirmPassword: e.target.value })
                        if (teacherErrors.confirmPassword) {
                          setTeacherErrors({ ...teacherErrors, confirmPassword: null })
                        }
                      }}
                      className={teacherErrors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowTeacherConfirmPassword(!showTeacherConfirmPassword)}
                    >
                      {showTeacherConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {teacherErrors.confirmPassword && (
                    <p className="text-sm text-red-500">{teacherErrors.confirmPassword}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Teacher Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
