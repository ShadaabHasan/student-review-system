// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { useRouter, useSearchParams } from "next/navigation"
// import { useAuth } from "@/lib/auth-provider"

// export default function SignupPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const { signup } = useAuth()

//   const defaultRole = searchParams.get("role") || "student"

//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [role, setRole] = useState(defaultRole)
//   const [error, setError] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError("")

//     if (password !== confirmPassword) {
//       setError("Passwords do not match")
//       return
//     }

//     setIsLoading(true)

//     try {
//       await signup(name, email, password, role)

//       // Small delay to ensure user state is set
//       setTimeout(() => {
//         // Redirect based on role
//         if (role === "student") {
//           router.push("/student/dashboard")
//         } else {
//           router.push("/teacher/dashboard")
//         }
//       }, 100)
//     } catch (err) {
//       setError("Failed to create account")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div
//       style={{
//         display: "flex",
//         minHeight: "100vh",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "var(--muted)",
//         padding: "1rem",
//       }}
//     >
//       <div className="card" style={{ width: "100%", maxWidth: "28rem" }}>
//         <div className="card-header" style={{ textAlign: "center" }}>
//           <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Create an account</h1>
//           <p className="text-muted">Enter your information to create an account</p>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="card-content" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//             <div className="form-group">
//               <label className="form-label">I am a</label>
//               <div className="radio-group">
//                 <div className="radio-item">
//                   <input
//                     type="radio"
//                     id="student"
//                     name="role"
//                     value="student"
//                     checked={role === "student"}
//                     onChange={() => setRole("student")}
//                     className="radio-input"
//                   />
//                   <label htmlFor="student">Student</label>
//                 </div>
//                 <div className="radio-item">
//                   <input
//                     type="radio"
//                     id="teacher"
//                     name="role"
//                     value="teacher"
//                     checked={role === "teacher"}
//                     onChange={() => setRole("teacher")}
//                     className="radio-input"
//                   />
//                   <label htmlFor="teacher">Teacher</label>
//                 </div>
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="name" className="form-label">
//                 Full Name
//               </label>
//               <input
//                 id="name"
//                 placeholder="John Doe"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="email" className="form-label">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="name@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="form-input"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="confirmPassword" className="form-label">
//                 Confirm Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 className="form-input"
//               />
//             </div>

//             {error && <p style={{ fontSize: "0.875rem", fontWeight: "500", color: "var(--destructive)" }}>{error}</p>}
//           </div>
//           <div className="card-footer" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//             <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
//               {isLoading ? "Creating account..." : "Create account"}
//             </button>
//             <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
//               Already have an account?{" "}
//               <Link href="/login" style={{ color: "var(--primary)" }}>
//                 Login
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }



"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signup } = useAuth()

  const defaultRole = searchParams.get("role") || "student"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState(defaultRole)
  const [subject, setSubject] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [year, setYear] = useState("")
  const [course, setCourse] = useState("")
  const [teacherYear, setTeacherYear] = useState("1")
  const [teacherCourse, setTeacherCourse] = useState("Science")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (role === "teacher" && !subject.trim()) {
      setError("Please enter your subject")
      return
    }

    if (role === "student" && (!year || !course)) {
      setError("Please select your year and course")
      return
    }

    if (role === "teacher" && (!teacherYear || !teacherCourse)) {
      setError("Please select the year and course you teach")
      return
    }

    setIsLoading(true)

    try {
      const userData = await signup(
        name,
        email,
        password,
        role,
        role === "teacher"
          ? {
              name: subject,
              year: Number.parseInt(teacherYear),
              course: teacherCourse,
            }
          : null,
        role === "student" ? { year: Number.parseInt(year), course } : null,
      )

      // Redirect based on role
      if (userData.role === "student") {
        router.push("/student/dashboard")
      } else {
        router.push("/teacher/dashboard")
      }
    } catch (err) {
      setError(err.message || "Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--muted)",
        padding: "1rem",
      }}
    >
      <div className="card" style={{ width: "100%", maxWidth: "28rem" }}>
        <div className="card-header" style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Create an account</h1>
          <p className="text-muted">Enter your information to create an account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-content" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">I am a</label>
              <div className="radio-group">
                <div className="radio-item">
                  <input
                    type="radio"
                    id="student"
                    name="role"
                    value="student"
                    checked={role === "student"}
                    onChange={() => setRole("student")}
                    className="radio-input"
                  />
                  <label htmlFor="student">Student</label>
                </div>
                <div className="radio-item">
                  <input
                    type="radio"
                    id="teacher"
                    name="role"
                    value="teacher"
                    checked={role === "teacher"}
                    onChange={() => setRole("teacher")}
                    className="radio-input"
                  />
                  <label htmlFor="teacher">Teacher</label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>

            {role === "student" && (
              <>
                <div className="form-group">
                  <label htmlFor="year" className="form-label">
                    Year
                  </label>
                  <select
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                    className="form-select"
                  >
                    <option value="">Select Year</option>
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="course" className="form-label">
                    Course
                  </label>
                  <select
                    id="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    required
                    className="form-select"
                  >
                    <option value="">Select Course</option>
                    <option value="Science">Science</option>
                    <option value="Arts">Arts</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Engineering">Engineering</option>
                  </select>
                </div>
              </>
            )}

            {role === "teacher" && (
              <>
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    id="subject"
                    placeholder="e.g., Mathematics, Physics, Chemistry"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="teacherYear" className="form-label">
                    Year You Teach
                  </label>
                  <select
                    id="teacherYear"
                    value={teacherYear}
                    onChange={(e) => setTeacherYear(e.target.value)}
                    required
                    className="form-select"
                  >
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="teacherCourse" className="form-label">
                    Course You Teach
                  </label>
                  <select
                    id="teacherCourse"
                    value={teacherCourse}
                    onChange={(e) => setTeacherCourse(e.target.value)}
                    required
                    className="form-select"
                  >
                    <option value="Science">Science</option>
                    <option value="Arts">Arts</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Engineering">Engineering</option>
                  </select>
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>

            {error && <p style={{ fontSize: "0.875rem", fontWeight: "500", color: "var(--destructive)" }}>{error}</p>}
          </div>
          <div className="card-footer" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </button>
            <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "var(--primary)" }}>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
