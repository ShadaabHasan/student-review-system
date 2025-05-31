"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../../components/ui/button" 
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Progress } from "../../components/ui/progress"
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
  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Progress value={strength} style={{ flex: 1, height: "0.5rem" }} />
      <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>
        {strength < 40 ? "Weak" : strength < 80 ? "Medium" : "Strong"}
      </span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.25rem", fontSize: "0.75rem" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            color: checks[i] ? "#16A34A" : "#9CA3AF",
          }}
        >
          {checks[i] ? (
            <CheckCircle style={{ width: "0.75rem", height: "0.75rem" }} />
          ) : (
            <div
              style={{
                width: "0.75rem",
                height: "0.75rem",
                borderRadius: "9999px",
                border: "1px solid #D1D5DB",
              }}
            />
          )}
          <span>
            {[
              "At least 8 characters",
              "One uppercase letter",
              "One lowercase letter",
              "One number",
              "One special character",
            ][i]}
          </span>
        </div>
      ))}
    </div>
  </div>
);}


return (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
      padding: '1rem'
    }}
  >
    <Card style={{ width: '100%', maxWidth: '28rem' }}>
      <CardHeader style={{ textAlign: 'center' }}>
        <CardTitle style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Create Account</CardTitle>
        <CardDescription>Join our educational feedback system</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="student" style={{ width: '100%' }}>
          <TabsList
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', width: '100%' }}
          >
            <TabsTrigger value="student" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <GraduationCap style={{ width: '1rem', height: '1rem' }} />
              Student
            </TabsTrigger>
            <TabsTrigger value="teacher" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users style={{ width: '1rem', height: '1rem' }} />
              Teacher
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <form onSubmit={handleStudentSignup} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

              {/* Full Name */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Label htmlFor="student-name">Full Name</Label>
                <Input
                  id="student-name"
                  placeholder="John Doe"
                  value={studentForm.name}
                  onChange={(e) => {
                    setStudentForm({ ...studentForm, name: e.target.value });
                    if (studentErrors.name) {
                      setStudentErrors({ ...studentErrors, name: null });
                    }
                  }}  
                  style={{
                    borderColor: studentErrors.name ? "red" : undefined
                  }}
                  required
                />
                {studentErrors.name && <p style={{ fontSize: "0.875rem", color: "red" }}>{studentErrors.name}</p>}
              </div>

              {/* Email */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Label htmlFor="student-email">Email</Label>
                <Input
                  id="student-email"
                  type="email"
                  placeholder="student@university.edu"
                  value={studentForm.email}
                  onChange={(e) => {
                    setStudentForm({ ...studentForm, email: e.target.value });
                    if (studentErrors.email) {
                      setStudentErrors({ ...studentErrors, email: null });
                    }
                  }}
                  style={{
                    borderColor: studentErrors.email ? "red" : undefined
                  }}
                  required
                />
                {studentErrors.email && <p style={{ fontSize: "0.875rem", color: "red" }}>{studentErrors.email}</p>}
                <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                  Use institutional email (@gmail.com, @edu, @ac.in, etc.)
                </p>
              </div>

              {/* Year & Course */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
      
                {/* Year */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <Label htmlFor="year">Year</Label>
                  <Select
                    onValueChange={(value) => {
                      setStudentForm({ ...studentForm, year: value });
                      if (studentErrors.year) {
                        setStudentErrors({ ...studentErrors, year: null });
                      }
                    }}
                  > 
                    <SelectTrigger style={{ borderColor: studentErrors.year ? "red" : undefined }}>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                  {studentErrors.year && <p style={{ fontSize: "0.875rem", color: "red" }}>{studentErrors.year}</p>}
                </div>

                {/* Course */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <Label htmlFor="course">Course</Label>
                  <Select
                    onValueChange={(value) => {
                      setStudentForm({ ...studentForm, course: value });
                      if (studentErrors.course) {
                        setStudentErrors({ ...studentErrors, course: null });
                      }
                    }}
                  >
                    <SelectTrigger style={{ borderColor: studentErrors.course ? "red" : undefined }}>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cse">Computer Science</SelectItem>
                      <SelectItem value="ece">Electronics</SelectItem>
                      <SelectItem value="me">Mechanical</SelectItem>
                      <SelectItem value="ce">Civil</SelectItem>
                    </SelectContent>
                  </Select>
                  {studentErrors.course && <p style={{ fontSize: "0.875rem", color: "red" }}>{studentErrors.course}</p>}
                </div>
              </div>

              {/* Password */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Label htmlFor="student-password">Password</Label>
                <div style={{ position: "relative" }}>
                  <Input
                    id="student-password"
                    type={showStudentPassword ? "text" : "password"}
                    value={studentForm.password}
                    onChange={(e) => {
                      setStudentForm({ ...studentForm, password: e.target.value });
                      if (studentErrors.password) {
                        setStudentErrors({ ...studentErrors, password: null });
                      }
                    }}
                    style={{
                      paddingRight: "2.5rem",
                      borderColor: studentErrors.password ? "red" : undefined
                    }}
                    required
                  />
                  <button
                    type="button"
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      right: "0.75rem",
                      display: "flex",
                      alignItems: "center"
                    }}
                    onClick={() => setShowStudentPassword(!showStudentPassword)}
                  >
                    {showStudentPassword ? (
                      <EyeOff style={{ height: "1rem", width: "1rem", color: "#9ca3af" }} />
                    ) : (
                      <Eye style={{ height: "1rem", width: "1rem", color: "#9ca3af" }} />
                    )}
                  </button>
                </div>
                {studentForm.password && <PasswordStrengthIndicator password={studentForm.password} />}
                {studentErrors.password && <p style={{ fontSize: "0.875rem", color: "red" }}>{studentErrors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Label htmlFor="student-confirm">Confirm Password</Label>
                <div style={{ position: "relative" }}>
                  <Input
                    id="student-confirm"
                    type={showStudentConfirmPassword ? "text" : "password"}
                    value={studentForm.confirmPassword}
                    onChange={(e) => {
                      setStudentForm({ ...studentForm, confirmPassword: e.target.value });
                      if (studentErrors.confirmPassword) {
                        setStudentErrors({ ...studentErrors, confirmPassword: null });
                      }
                    }}
                    style={{
                      paddingRight: "2.5rem",
                      borderColor: studentErrors.confirmPassword ? "red" : undefined
                    }}
                    required
                  />
                  <button
                    type="button"
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      right: "0.75rem",
                      display: "flex",
                      alignItems: "center"
                    }}
                    onClick={() => setShowStudentConfirmPassword(!showStudentConfirmPassword)}
                  >
                    {showStudentConfirmPassword ? (
                      <EyeOff style={{ height: "1rem", width: "1rem", color: "#9ca3af" }} />
                    ) : (
                      <Eye style={{ height: "1rem", width: "1rem", color: "#9ca3af" }} />
                    )}
                  </button>
                </div>
                {studentErrors.confirmPassword && (
                  <p style={{ fontSize: "0.875rem", color: "red" }}>{studentErrors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                style={{ width: "100%" }}
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Student Account"}
              </Button>

            </form>
          </TabsContent>


          <TabsContent value="teacher">
            <form onSubmit={handleTeacherSignup} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    
              {/* Full Name */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
                  style={{
                    borderColor: teacherErrors.name ? "red" : undefined,
                  }}
                  required
                />
                {teacherErrors.name && (
                  <p style={{ fontSize: "0.875rem", color: "red" }}>{teacherErrors.name}</p>
                )}
              </div>

              {/* Email */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
                  style={{
                    borderColor: teacherErrors.email ? "red" : undefined,
                  }}
                  required
                />
                {teacherErrors.email && (
                  <p style={{ fontSize: "0.875rem", color: "red" }}>{teacherErrors.email}</p>
                )}
                <p style={{ fontSize: "0.75rem", color: "gray" }}>
                  Use institutional email (@gmail.com, @edu, @ac.in, etc.)
                </p>
              </div>

              {/* Department */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Label htmlFor="department">Department</Label>
                <Select
                  onValueChange={(value) => {
                    setTeacherForm({ ...teacherForm, department: value })
                    if (teacherErrors.department) {
                      setTeacherErrors({ ...teacherErrors, department: null })
                    }
                  }}
                >
                  <SelectTrigger
                    style={{
                      borderColor: teacherErrors.department ? "red" : undefined,
                    }}
                  >
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cse">Computer Science</SelectItem>
                    <SelectItem value="ece">Electronics</SelectItem>
                    <SelectItem value="me">Mechanical</SelectItem>
                    <SelectItem value="ce">Civil</SelectItem>
                  </SelectContent>
                </Select>
                {teacherErrors.department && (
                  <p style={{ fontSize: "0.875rem", color: "red" }}>{teacherErrors.department}</p>
                )}
              </div>

              {/* Password */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Label htmlFor="teacher-password">Password</Label>
                <div style={{ position: "relative" }}>
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
                    style={{
                      paddingRight: "2.5rem",
                      borderColor: teacherErrors.password ? "red" : undefined,
                    }}
                    required
                  />
                  <button
                    type="button"
                    style={{
                      position: "absolute",
                      right: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowTeacherPassword(!showTeacherPassword)}
                  >
                    {showTeacherPassword ? (
                      <EyeOff style={{ height: "1rem", width: "1rem", color: "gray" }} />
                    ) : (
                      <Eye style={{ height: "1rem", width: "1rem", color: "gray" }} />
                    )}
                  </button>
                </div>
                {teacherForm.password && <PasswordStrengthIndicator password={teacherForm.password} />}
                {teacherErrors.password && (
                  <p style={{ fontSize: "0.875rem", color: "red" }}>{teacherErrors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Label htmlFor="teacher-confirm">Confirm Password</Label>
                <div style={{ position: "relative" }}>
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
                    style={{
                      paddingRight: "2.5rem",
                      borderColor: teacherErrors.confirmPassword ? "red" : undefined,
                    }}
                    required
                  />
                  <button
                    type="button"
                    style={{
                      position: "absolute",
                      right: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowTeacherConfirmPassword(!showTeacherConfirmPassword)}
                  >
                    {showTeacherConfirmPassword ? (
                      <EyeOff style={{ height: "1rem", width: "1rem", color: "gray" }} />
                    ) : (
                      <Eye style={{ height: "1rem", width: "1rem", color: "gray" }} />
                    )}
                  </button>
                </div>
                {teacherErrors.confirmPassword && (
                  <p style={{ fontSize: "0.875rem", color: "red" }}>{teacherErrors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                style={{
                  width: "100%",
                }}
              >
                {isLoading ? "Creating Account..." : "Create Teacher Account"}
              </Button>
            </form>
          </TabsContent>

        </Tabs>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  </div>
);
}
