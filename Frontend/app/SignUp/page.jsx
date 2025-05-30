// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Button } from "../../components/ui/button" 
// import { Input } from "../../components/ui/input"
// import { Label } from "../../components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
// import { Progress } from "../../components/ui/progress"
// import { GraduationCap, Users, Eye, EyeOff, CheckCircle } from "lucide-react"
// import { validateEmail, validatePassword, checkEmailExists } from "../../utils/validation"

// export default function SignupPage() {
//   const [studentForm, setStudentForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     year: "",
//     course: "",
//   })
//   const [teacherForm, setTeacherForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     department: "",
//     subjects: "",
//   })
//   const [studentErrors, setStudentErrors] = useState({})
//   const [teacherErrors, setTeacherErrors] = useState({})
//   const [showStudentPassword, setShowStudentPassword] = useState(false)
//   const [showTeacherPassword, setShowTeacherPassword] = useState(false)
//   const [showStudentConfirmPassword, setShowStudentConfirmPassword] = useState(false)
//   const [showTeacherConfirmPassword, setShowTeacherConfirmPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)

//   const getPasswordStrength = (password) => {
//     let strength = 0
//     const checks = [
//       password.length >= 8,
//       /[A-Z]/.test(password),
//       /[a-z]/.test(password),
//       /[0-9]/.test(password),
//       /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
//     ]

//     strength = checks.filter(Boolean).length
//     return { strength: (strength / 5) * 100, checks }
//   }

//   const validateForm = (form, userType) => {
//     const errors = {}

//     // Name validation
//     if (!form.name.trim()) {
//       errors.name = "Name is required"
//     } else if (form.name.trim().length < 2) {
//       errors.name = "Name must be at least 2 characters long"
//     }

//     // Email validation
//     const emailError = validateEmail(form.email)
//     if (emailError) {
//       errors.email = emailError
//     } else {
//       // Check if email already exists
//       const existsError = checkEmailExists(form.email, userType)
//       if (existsError) {
//         errors.email = existsError
//       }
//     }

//     // Password validation
//     const passwordError = validatePassword(form.password)
//     if (passwordError) {
//       errors.password = passwordError
//     }

//     // Confirm password validation
//     if (form.password !== form.confirmPassword) {
//       errors.confirmPassword = "Passwords do not match"
//     }

//     // Role-specific validation
//     if (userType === "student") {
//       if (!form.year) {
//         errors.year = "Please select your year"
//       }
//       if (!form.course) {
//         errors.course = "Please select your course"
//       }
//     } else {
//       if (!form.department) {
//         errors.department = "Please select your department"
//       }
//     }

//     return errors
//   }

//   const handleStudentSignup = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     const errors = validateForm(studentForm, "student")
//     setStudentErrors(errors)

//     if (Object.keys(errors).length === 0) {
//       // Simulate API call
//       setTimeout(() => {
//         alert("Account created successfully! Please login.")
//         window.location.href = "/login"
//       }, 2000)
//       return
//     }

//     setIsLoading(false)
//   }

//   const handleTeacherSignup = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     const errors = validateForm(teacherForm, "teacher")
//     setTeacherErrors(errors)

//     if (Object.keys(errors).length === 0) {
//       // Simulate API call
//       setTimeout(() => {
//         alert("Account created successfully! Please login.")
//         window.location.href = "/login"
//       }, 2000)
//       return
//     }

//     setIsLoading(false)
//   }

//   const PasswordStrengthIndicator = ({ password }) => {
//     const { strength, checks } = getPasswordStrength(password)

//     return (
//       <div className="space-y-2">
//         <div className="flex items-center space-x-2">
//           <Progress value={strength} className="flex-1 h-2" />
//           <span className="text-xs text-gray-500">{strength < 40 ? "Weak" : strength < 80 ? "Medium" : "Strong"}</span>
//         </div>
//         <div className="grid grid-cols-1 gap-1 text-xs">
//           <div className={`flex items-center space-x-1 ${checks[0] ? "text-green-600" : "text-gray-400"}`}>
//             {checks[0] ? (
//               <CheckCircle className="w-3 h-3" />
//             ) : (
//               <div className="w-3 h-3 rounded-full border border-gray-300" />
//             )}
//             <span>At least 8 characters</span>
//           </div>
//           <div className={`flex items-center space-x-1 ${checks[1] ? "text-green-600" : "text-gray-400"}`}>
//             {checks[1] ? (
//               <CheckCircle className="w-3 h-3" />
//             ) : (
//               <div className="w-3 h-3 rounded-full border border-gray-300" />
//             )}
//             <span>One uppercase letter</span>
//           </div>
//           <div className={`flex items-center space-x-1 ${checks[2] ? "text-green-600" : "text-gray-400"}`}>
//             {checks[2] ? (
//               <CheckCircle className="w-3 h-3" />
//             ) : (
//               <div className="w-3 h-3 rounded-full border border-gray-300" />
//             )}
//             <span>One lowercase letter</span>
//           </div>
//           <div className={`flex items-center space-x-1 ${checks[3] ? "text-green-600" : "text-gray-400"}`}>
//             {checks[3] ? (
//               <CheckCircle className="w-3 h-3" />
//             ) : (
//               <div className="w-3 h-3 rounded-full border border-gray-300" />
//             )}
//             <span>One number</span>
//           </div>
//           <div className={`flex items-center space-x-1 ${checks[4] ? "text-green-600" : "text-gray-400"}`}>
//             {checks[4] ? (
//               <CheckCircle className="w-3 h-3" />
//             ) : (
//               <div className="w-3 h-3 rounded-full border border-gray-300" />
//             )}
//             <span>One special character</span>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
//           <CardDescription>Join our educational feedback system</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Tabs defaultValue="student" className="w-full">
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="student" className="flex items-center gap-2">
//                 <GraduationCap className="w-4 h-4" />
//                 Student
//               </TabsTrigger>
//               <TabsTrigger value="teacher" className="flex items-center gap-2">
//                 <Users className="w-4 h-4" />
//                 Teacher
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="student">
//               <form onSubmit={handleStudentSignup} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="student-name">Full Name</Label>
//                   <Input
//                     id="student-name"
//                     placeholder="John Doe"
//                     value={studentForm.name}
//                     onChange={(e) => {
//                       setStudentForm({ ...studentForm, name: e.target.value })
//                       if (studentErrors.name) {
//                         setStudentErrors({ ...studentErrors, name: null })
//                       }
//                     }}
//                     className={studentErrors.name ? "border-red-500" : ""}
//                     required
//                   />
//                   {studentErrors.name && <p className="text-sm text-red-500">{studentErrors.name}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="student-email">Email</Label>
//                   <Input
//                     id="student-email"
//                     type="email"
//                     placeholder="student@university.edu"
//                     value={studentForm.email}
//                     onChange={(e) => {
//                       setStudentForm({ ...studentForm, email: e.target.value })
//                       if (studentErrors.email) {
//                         setStudentErrors({ ...studentErrors, email: null })
//                       }
//                     }}
//                     className={studentErrors.email ? "border-red-500" : ""}
//                     required
//                   />
//                   {studentErrors.email && <p className="text-sm text-red-500">{studentErrors.email}</p>}
//                   <p className="text-xs text-gray-500">Use institutional email (@gmail.com, @edu, @ac.in, etc.)</p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="year">Year</Label>
//                     <Select
//                       onValueChange={(value) => {
//                         setStudentForm({ ...studentForm, year: value })
//                         if (studentErrors.year) {
//                           setStudentErrors({ ...studentErrors, year: null })
//                         }
//                       }}
//                     >
//                       <SelectTrigger className={studentErrors.year ? "border-red-500" : ""}>
//                         <SelectValue placeholder="Select year" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="1">1st Year</SelectItem>
//                         <SelectItem value="2">2nd Year</SelectItem>
//                         <SelectItem value="3">3rd Year</SelectItem>
//                         <SelectItem value="4">4th Year</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     {studentErrors.year && <p className="text-sm text-red-500">{studentErrors.year}</p>}
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="course">Course</Label>
//                     <Select
//                       onValueChange={(value) => {
//                         setStudentForm({ ...studentForm, course: value })
//                         if (studentErrors.course) {
//                           setStudentErrors({ ...studentErrors, course: null })
//                         }
//                       }}
//                     >
//                       <SelectTrigger className={studentErrors.course ? "border-red-500" : ""}>
//                         <SelectValue placeholder="Select course" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="cse">Computer Science</SelectItem>
//                         <SelectItem value="ece">Electronics</SelectItem>
//                         <SelectItem value="me">Mechanical</SelectItem>
//                         <SelectItem value="ce">Civil</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     {studentErrors.course && <p className="text-sm text-red-500">{studentErrors.course}</p>}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="student-password">Password</Label>
//                   <div className="relative">
//                     <Input
//                       id="student-password"
//                       type={showStudentPassword ? "text" : "password"}
//                       value={studentForm.password}
//                       onChange={(e) => {
//                         setStudentForm({ ...studentForm, password: e.target.value })
//                         if (studentErrors.password) {
//                           setStudentErrors({ ...studentErrors, password: null })
//                         }
//                       }}
//                       className={studentErrors.password ? "border-red-500 pr-10" : "pr-10"}
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       onClick={() => setShowStudentPassword(!showStudentPassword)}
//                     >
//                       {showStudentPassword ? (
//                         <EyeOff className="h-4 w-4 text-gray-400" />
//                       ) : (
//                         <Eye className="h-4 w-4 text-gray-400" />
//                       )}
//                     </button>
//                   </div>
//                   {studentForm.password && <PasswordStrengthIndicator password={studentForm.password} />}
//                   {studentErrors.password && <p className="text-sm text-red-500">{studentErrors.password}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="student-confirm">Confirm Password</Label>
//                   <div className="relative">
//                     <Input
//                       id="student-confirm"
//                       type={showStudentConfirmPassword ? "text" : "password"}
//                       value={studentForm.confirmPassword}
//                       onChange={(e) => {
//                         setStudentForm({ ...studentForm, confirmPassword: e.target.value })
//                         if (studentErrors.confirmPassword) {
//                           setStudentErrors({ ...studentErrors, confirmPassword: null })
//                         }
//                       }}
//                       className={studentErrors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       onClick={() => setShowStudentConfirmPassword(!showStudentConfirmPassword)}
//                     >
//                       {showStudentConfirmPassword ? (
//                         <EyeOff className="h-4 w-4 text-gray-400" />
//                       ) : (
//                         <Eye className="h-4 w-4 text-gray-400" />
//                       )}
//                     </button>
//                   </div>
//                   {studentErrors.confirmPassword && (
//                     <p className="text-sm text-red-500">{studentErrors.confirmPassword}</p>
//                   )}
//                 </div>

//                 <Button type="submit" className="w-full" disabled={isLoading}>
//                   {isLoading ? "Creating Account..." : "Create Student Account"}
//                 </Button>
//               </form>
//             </TabsContent>

//             <TabsContent value="teacher">
//               <form onSubmit={handleTeacherSignup} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="teacher-name">Full Name</Label>
//                   <Input
//                     id="teacher-name"
//                     placeholder="Dr. Jane Smith"
//                     value={teacherForm.name}
//                     onChange={(e) => {
//                       setTeacherForm({ ...teacherForm, name: e.target.value })
//                       if (teacherErrors.name) {
//                         setTeacherErrors({ ...teacherErrors, name: null })
//                       }
//                     }}
//                     className={teacherErrors.name ? "border-red-500" : ""}
//                     required
//                   />
//                   {teacherErrors.name && <p className="text-sm text-red-500">{teacherErrors.name}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="teacher-email">Email</Label>
//                   <Input
//                     id="teacher-email"
//                     type="email"
//                     placeholder="teacher@university.edu"
//                     value={teacherForm.email}
//                     onChange={(e) => {
//                       setTeacherForm({ ...teacherForm, email: e.target.value })
//                       if (teacherErrors.email) {
//                         setTeacherErrors({ ...teacherErrors, email: null })
//                       }
//                     }}
//                     className={teacherErrors.email ? "border-red-500" : ""}
//                     required
//                   />
//                   {teacherErrors.email && <p className="text-sm text-red-500">{teacherErrors.email}</p>}
//                   <p className="text-xs text-gray-500">Use institutional email (@gmail.com, @edu, @ac.in, etc.)</p>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="department">Department</Label>
//                   <Select
//                     onValueChange={(value) => {
//                       setTeacherForm({ ...teacherForm, department: value })
//                       if (teacherErrors.department) {
//                         setTeacherErrors({ ...teacherErrors, department: null })
//                       }
//                     }}
//                   >
//                     <SelectTrigger className={teacherErrors.department ? "border-red-500" : ""}>
//                       <SelectValue placeholder="Select department" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="cse">Computer Science</SelectItem>
//                       <SelectItem value="ece">Electronics</SelectItem>
//                       <SelectItem value="me">Mechanical</SelectItem>
//                       <SelectItem value="ce">Civil</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   {teacherErrors.department && <p className="text-sm text-red-500">{teacherErrors.department}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="teacher-password">Password</Label>
//                   <div className="relative">
//                     <Input
//                       id="teacher-password"
//                       type={showTeacherPassword ? "text" : "password"}
//                       value={teacherForm.password}
//                       onChange={(e) => {
//                         setTeacherForm({ ...teacherForm, password: e.target.value })
//                         if (teacherErrors.password) {
//                           setTeacherErrors({ ...teacherErrors, password: null })
//                         }
//                       }}
//                       className={teacherErrors.password ? "border-red-500 pr-10" : "pr-10"}
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       onClick={() => setShowTeacherPassword(!showTeacherPassword)}
//                     >
//                       {showTeacherPassword ? (
//                         <EyeOff className="h-4 w-4 text-gray-400" />
//                       ) : (
//                         <Eye className="h-4 w-4 text-gray-400" />
//                       )}
//                     </button>
//                   </div>
//                   {teacherForm.password && <PasswordStrengthIndicator password={teacherForm.password} />}
//                   {teacherErrors.password && <p className="text-sm text-red-500">{teacherErrors.password}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="teacher-confirm">Confirm Password</Label>
//                   <div className="relative">
//                     <Input
//                       id="teacher-confirm"
//                       type={showTeacherConfirmPassword ? "text" : "password"}
//                       value={teacherForm.confirmPassword}
//                       onChange={(e) => {
//                         setTeacherForm({ ...teacherForm, confirmPassword: e.target.value })
//                         if (teacherErrors.confirmPassword) {
//                           setTeacherErrors({ ...teacherErrors, confirmPassword: null })
//                         }
//                       }}
//                       className={teacherErrors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       onClick={() => setShowTeacherConfirmPassword(!showTeacherConfirmPassword)}
//                     >
//                       {showTeacherConfirmPassword ? (
//                         <EyeOff className="h-4 w-4 text-gray-400" />
//                       ) : (
//                         <Eye className="h-4 w-4 text-gray-400" />
//                       )}
//                     </button>
//                   </div>
//                   {teacherErrors.confirmPassword && (
//                     <p className="text-sm text-red-500">{teacherErrors.confirmPassword}</p>
//                   )}
//                 </div>

//                 <Button type="submit" className="w-full" disabled={isLoading}>
//                   {isLoading ? "Creating Account..." : "Create Teacher Account"}
//                 </Button>
//               </form>
//             </TabsContent>
//           </Tabs>

//           <div className="mt-6 text-center text-sm">
//             Already have an account?{" "}
//             <Link href="/login" className="text-blue-600 hover:underline">
//               Sign in
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


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
  // (all your state and handlers unchanged)

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #bfdbfe 0%, #6366f1 100%)",
    padding: "1rem",
  }

  const cardStyle = {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
  }

  const cardHeaderStyle = {
    textAlign: "center",
    padding: "1.5rem 1rem",
    borderBottom: "1px solid #e5e7eb",
  }

  const cardTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "700",
    margin: 0,
    marginBottom: 4,
  }

  const cardDescriptionStyle = {
    fontSize: "0.875rem",
    color: "#6b7280",
  }

  const tabsListStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    borderBottom: "1px solid #e5e7eb",
  }

  const tabsTriggerStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "0.75rem 1rem",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "1rem",
    backgroundColor: "transparent",
    border: "none",
  }

  const tabsContentStyle = {
    padding: "1rem",
  }

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  }

  const inputWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  }

  const labelStyle = {
    fontWeight: "500",
    fontSize: "0.875rem",
    marginBottom: 4,
  }

  const inputStyle = (error) => ({
    padding: "0.5rem 0.75rem",
    fontSize: "1rem",
    borderRadius: 4,
    border: error ? "1.5px solid #ef4444" : "1.5px solid #d1d5db",
    outline: "none",
  })

  const errorTextStyle = {
    fontSize: "0.75rem",
    color: "#ef4444",
  }

  const smallTextStyle = {
    fontSize: "0.75rem",
    color: "#6b7280",
  }

  const passwordWrapperStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
  }

  const passwordToggleButtonStyle = {
    position: "absolute",
    right: 8,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
  }

  const gridTwoColumnsStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  }

  const progressContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
  }

  const progressTextStyle = {
    fontSize: "0.75rem",
    color: "#6b7280",
    minWidth: 40,
    textAlign: "right",
  }

  const checkItemStyle = (valid) => ({
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: "0.75rem",
    color: valid ? "#16a34a" : "#9ca3af",
  })

  const checkIconStyle = {
    width: 12,
    height: 12,
  }

  const submitButtonStyle = {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#4f46e5",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  }

  const submitButtonDisabledStyle = {
    ...submitButtonStyle,
    backgroundColor: "#a5b4fc",
    cursor: "not-allowed",
  }

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

  // PasswordStrengthIndicator component adapted for inline styles
  const PasswordStrengthIndicator = ({ password }) => {
    const { strength, checks } = getPasswordStrength(password)

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={progressContainerStyle}>
          <Progress value={strength} style={{ flex: 1, height: 8 }} />
          <span style={progressTextStyle}>
            {strength < 40 ? "Weak" : strength < 80 ? "Medium" : "Strong"}
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 2 }}>
          <div style={checkItemStyle(checks[0])}>
            {checks[0] ? (
              <CheckCircle style={checkIconStyle} />
            ) : (
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  border: "1px solid #d1d5db",
                }}
              />
            )}
            <span>At least 8 characters</span>
          </div>
          <div style={checkItemStyle(checks[1])}>
            {checks[1] ? (
              <CheckCircle style={checkIconStyle} />
            ) : (
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  border: "1px solid #d1d5db",
                }}
              />
            )}
            <span>One uppercase letter</span>
          </div>
          <div style={checkItemStyle(checks[2])}>
            {checks[2] ? (
              <CheckCircle style={checkIconStyle} />
            ) : (
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  border: "1px solid #d1d5db",
                }}
              />
            )}
            <span>One lowercase letter</span>
          </div>
          <div style={checkItemStyle(checks[3])}>
            {checks[3] ? (
              <CheckCircle style={checkIconStyle} />
            ) : (
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  border: "1px solid #d1d5db",
                }}
              />
            )}
            <span>One number</span>
          </div>
          <div style={checkItemStyle(checks[4])}>
            {checks[4] ? (
              <CheckCircle style={checkIconStyle} />
            ) : (
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  border: "1px solid #d1d5db",
                }}
              />
            )}
            <span>One special character</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <Card style={cardStyle}>
        <CardHeader style={cardHeaderStyle}>
          <CardTitle style={cardTitleStyle}>Create Account</CardTitle>
          <CardDescription style={cardDescriptionStyle}>
            Join our educational feedback system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" style={{ width: "100%" }}>
            <TabsList style={tabsListStyle}>
              <TabsTrigger value="student" style={tabsTriggerStyle}>
                <GraduationCap style={{ width: 16, height: 16 }} />
                Student
              </TabsTrigger>
              <TabsTrigger value="teacher" style={tabsTriggerStyle}>
                <Users style={{ width: 16, height: 16 }} />
                Teacher
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student" style={tabsContentStyle}>
              <form onSubmit={handleStudentSignup} style={formStyle} noValidate>
                <div style={inputWrapperStyle}>
                  <Label htmlFor="student-name" style={labelStyle}>Full Name</Label>
                  <Input
                    id="student-name"
                    type="text"
                    value={studentForm.name}
                    onChange={(e) => {
                      setStudentForm({ ...studentForm, name: e.target.value })
                      if (studentErrors.name) {
                        setStudentErrors({ ...studentErrors, name: null })
                      }
                    }}
                    style={inputStyle(!!studentErrors.name)}
                    required
                  />
                  {studentErrors.name && <p style={errorTextStyle}>{studentErrors.name}</p>}
                </div>

                <div style={inputWrapperStyle}>
                  <Label htmlFor="student-email" style={labelStyle}>Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    value={studentForm.email}
                    onChange={(e) => {
                      setStudentForm({ ...studentForm, email: e.target.value })
                      if (studentErrors.email) {
                        setStudentErrors({ ...studentErrors, email: null })
                      }
                    }}
                    style={inputStyle(!!studentErrors.email)}
                    required
                  />
                  {studentErrors.email && <p style={errorTextStyle}>{studentErrors.email}</p>}
                </div>

                <div style={inputWrapperStyle}>
                  <Label htmlFor="student-roll" style={labelStyle}>Roll Number</Label>
                  <Input
                    id="student-roll"
                    type="text"
                    value={studentForm.rollNumber}
                    onChange={(e) => {
                      setStudentForm({ ...studentForm, rollNumber: e.target.value })
                      if (studentErrors.rollNumber) {
                        setStudentErrors({ ...studentErrors, rollNumber: null })
                      }
                    }}
                    style={inputStyle(!!studentErrors.rollNumber)}
                    required
                  />
                  {studentErrors.rollNumber && <p style={errorTextStyle}>{studentErrors.rollNumber}</p>}
                </div>

                <div style={inputWrapperStyle}>
                  <Label htmlFor="student-branch" style={labelStyle}>Branch</Label>
                  <Select
                    value={studentForm.branch}
                    onValueChange={(value) => {
                      setStudentForm({ ...studentForm, branch: value })
                      if (studentErrors.branch) {
                        setStudentErrors({ ...studentErrors, branch: null })
                      }
                    }}
                  >
                    <SelectTrigger id="student-branch" style={{ padding: "0.5rem 0.75rem", borderRadius: 4, border: studentErrors.branch ? "1.5px solid #ef4444" : "1.5px solid #d1d5db" }}>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="ece">Electronics</SelectItem>
                      <SelectItem value="me">Mechanical</SelectItem>
                      <SelectItem value="ce">Civil</SelectItem>
                    </SelectContent>
                  </Select>
                  {studentErrors.branch && <p style={errorTextStyle}>{studentErrors.branch}</p>}
                </div>

                <div style={inputWrapperStyle}>
                  <Label htmlFor="student-password" style={labelStyle}>Password</Label>
                  <div style={passwordWrapperStyle}>
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
                      style={inputStyle(!!studentErrors.password)}
                      required
                    />
                    <button
                      type="button"
                      style={passwordToggleButtonStyle}
                      onClick={() => setShowStudentPassword(!showStudentPassword)}
                      tabIndex={-1}
                    >
                      {showStudentPassword ? <EyeOff style={{ width: 16, height: 16, color: "#9ca3af" }} /> : <Eye style={{ width: 16, height: 16, color: "#9ca3af" }} />}
                    </button>
                  </div>
                  {studentForm.password && <PasswordStrengthIndicator password={studentForm.password} />}
                  {studentErrors.password && <p style={errorTextStyle}>{studentErrors.password}</p>}
                </div>

                <div style={inputWrapperStyle}>
                  <Label htmlFor="student-confirm" style={labelStyle}>Confirm Password</Label>
                  <div style={passwordWrapperStyle}>
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
                      style={inputStyle(!!studentErrors.confirmPassword)}
                      required
                    />
                    <button
                      type="button"
                      style={passwordToggleButtonStyle}
                      onClick={() => setShowStudentConfirmPassword(!showStudentConfirmPassword)}
                      tabIndex={-1}
                    >
                      {showStudentConfirmPassword ? <EyeOff style={{ width: 16, height: 16, color: "#9ca3af" }} /> : <Eye style={{ width: 16, height: 16, color: "#9ca3af" }} />}
                    </button>
                  </div>
                  {studentErrors.confirmPassword && <p style={errorTextStyle}>{studentErrors.confirmPassword}</p>}
                </div>

                <Button type="submit" style={isLoading ? submitButtonDisabledStyle : submitButtonStyle} disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Student Account"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="teacher" style={tabsContentStyle}>
              <form onSubmit={handleTeacherSignup} style={formStyle} noValidate>
                <div style={inputWrapperStyle}>
                  <Label htmlFor="teacher-name" style={labelStyle}>Full Name</Label>
                  <Input
                    id="teacher-name"
                    type="text"
                    value={teacherForm.name}
                    onChange={(e) => {
                      setTeacherForm({ ...teacherForm, name: e.target.value })
                      if (teacherErrors.name) {
                        setTeacherErrors({ ...teacherErrors, name: null })
                      }
                    }}
                    style={inputStyle(!!teacherErrors.name)}
                    required
                  />
                  {teacherErrors.name && <p style={errorTextStyle}>{teacherErrors.name}</p>}
                </div>

                <div style={inputWrapperStyle}>
                  <Label htmlFor="teacher-email" style={labelStyle}>Email</Label>
                  <Input
                    id="teacher-email"
                    type="email"
                    value={teacherForm.email}
                    onChange={(e) => {
                      setTeacherForm({ ...teacherForm, email: e.target.value })
                      if (teacherErrors.email) {
                        setTeacherErrors({ ...teacherErrors, email: null })
                      }
                    }}
                    style={inputStyle(!!teacherErrors.email)}
                    required
                  />
                  {teacherErrors.email && <p style={errorTextStyle}>{teacherErrors.email}</p>}
                </div>

                <div style={inputWrapperStyle}>
                  <Label htmlFor="teacher-department" style={labelStyle}>Department</Label>
                  <Select
                    value={teacherForm.department}
                    onValueChange={(value) => {
                      setTeacherForm({ ...teacherForm, department: value })
                      if (teacherErrors.department) {
                        setTeacherErrors({ ...teacherErrors, department: null })
                      }
                    }}
                  >
                    <SelectTrigger id="teacher-department" style={{ padding: "0.5rem 0.75rem", borderRadius: 4, border: teacherErrors.department ? "1.5px solid #ef4444" : "1.5px solid #d1d5db" }}>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="ece">Electronics</SelectItem>
                      <SelectItem value="me">Mechanical</SelectItem>
                      <SelectItem value="ce">Civil</SelectItem>
                    </SelectContent>
                  </Select>
                  {teacherErrors.department && <p style={errorTextStyle}>{teacherErrors.department}</p>}
                </div>

                <div style={inputWrapperStyle}>
                  <Label htmlFor="teacher-password" style={labelStyle}>Password</Label>
                  <div style={passwordWrapperStyle}>
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
                      style={inputStyle(!!teacherErrors.password)}
                      required
                    />
                    <button
                      type="button"
                      style={passwordToggleButtonStyle}
                      onClick={() => setShowTeacherPassword(!showTeacherPassword)}
                      tabIndex={-1}
                    >
                      {showTeacherPassword ? <EyeOff style={{ width: 16, height: 16, color: "#9ca3af" }} /> : <Eye style={{ width: 16, height: 16, color: "#9ca3af" }} />}
                    </button>
                  </div>
                  {teacherForm.password && <PasswordStrengthIndicator password={teacherForm.password} />}
                  {teacherErrors.password && <p style={errorTextStyle}>{teacherErrors.password}</p>}
                </div>

                <div style={inputWrapperStyle}>
                  <Label htmlFor="teacher-confirm" style={labelStyle}>Confirm Password</Label>
                  <div style={passwordWrapperStyle}>
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
                      style={inputStyle(!!teacherErrors.confirmPassword)}
                      required
                    />
                    <button
                      type="button"
                      style={passwordToggleButtonStyle}
                      onClick={() => setShowTeacherConfirmPassword(!showTeacherConfirmPassword)}
                      tabIndex={-1}
                    >
                      {showTeacherConfirmPassword ? <EyeOff style={{ width: 16, height: 16, color: "#9ca3af" }} /> : <Eye style={{ width: 16, height: 16, color: "#9ca3af" }} />}
                    </button>
                  </div>
                  {teacherErrors.confirmPassword && <p style={errorTextStyle}>{teacherErrors.confirmPassword}</p>}
                </div>

                <Button type="submit" style={isLoading ? submitButtonDisabledStyle : submitButtonStyle} disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Teacher Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p style={{ textAlign: "center", marginTop: 16, fontSize: 14 }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#2563eb", textDecoration: "underline" }}>
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
