// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-provider"

// export default function LoginPage() {
//   const router = useRouter()
//   const { login } = useAuth()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [role, setRole] = useState("student")
//   const [error, setError] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError("")
//     setIsLoading(true)

//     try {
//       await login(email, password, role)

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
//       setError("Invalid email or password")
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
//           <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Login</h1>
//           <p className="text-muted">Enter your credentials to access your account</p>
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
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                 <label htmlFor="password" className="form-label">
//                   Password
//                 </label>
//                 <Link href="/forgot-password" style={{ fontSize: "0.75rem", color: "var(--primary)" }}>
//                   Forgot password?
//                 </Link>
//               </div>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="form-input"
//               />
//             </div>

//             {error && <p style={{ fontSize: "0.875rem", fontWeight: "500", color: "var(--destructive)" }}>{error}</p>}
//           </div>
//           <div className="card-footer" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//             <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
//               {isLoading ? "Logging in..." : "Login"}
//             </button>
//             <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
//               Don&apos;t have an account?{" "}
//               <Link href="/signup" style={{ color: "var(--primary)" }}>
//                 Sign up
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
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const userData = await login(email, password)

      // Redirect based on role
      if (userData.role === "student") {
        router.push("/student/dashboard")
      } else {
        router.push("/teacher/dashboard")
      }
    } catch (err) {
      setError(err.message || "Invalid email or password")
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
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Login</h1>
          <p className="text-muted">Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-content" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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

            {error && <p style={{ fontSize: "0.875rem", fontWeight: "500", color: "var(--destructive)" }}>{error}</p>}
          </div>
          <div className="card-footer" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
              Don&apos;t have an account?{" "}
              <Link href="/signup" style={{ color: "var(--primary)" }}>
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
