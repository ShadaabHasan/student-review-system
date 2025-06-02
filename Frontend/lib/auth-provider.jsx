// "use client"

// import { createContext, useContext, useState, useEffect } from "react"

// // Mock data for demonstration
// const mockStudents = [
//   { id: "s1", name: "John Doe", email: "john@example.com", password: "password", role: "student" },
//   { id: "s2", name: "Jane Smith", email: "jane@example.com", password: "password", role: "student" },
// ]

// const mockTeachers = [
//   {
//     id: "t1",
//     name: "Prof. Robert Brown",
//     email: "robert@example.com",
//     password: "password",
//     role: "teacher",
//     subject: "Mathematics",
//   },
//   {
//     id: "t2",
//     name: "Dr. Emily White",
//     email: "emily@example.com",
//     password: "password",
//     role: "teacher",
//     subject: "Physics",
//   },
//   {
//     id: "t3",
//     name: "Prof. Michael Green",
//     email: "michael@example.com",
//     password: "password",
//     role: "teacher",
//     subject: "Chemistry",
//   },
//   {
//     id: "t4",
//     name: "Dr. Sarah Johnson",
//     email: "sarah@example.com",
//     password: "password",
//     role: "teacher",
//     subject: "Biology",
//   },
//   {
//     id: "t5",
//     name: "Prof. David Lee",
//     email: "david@example.com",
//     password: "password",
//     role: "teacher",
//     subject: "Computer Science",
//   },
// ]

// // Mock subjects data
// export const mockSubjects = [
//   { id: "sub1", name: "Mathematics", teacherId: "t1", year: 1, course: "Science" },
//   { id: "sub2", name: "Physics", teacherId: "t2", year: 1, course: "Science" },
//   { id: "sub3", name: "Chemistry", teacherId: "t3", year: 1, course: "Science" },
//   { id: "sub4", name: "Biology", teacherId: "t4", year: 1, course: "Science" },
//   { id: "sub5", name: "Computer Science", teacherId: "t5", year: 1, course: "Science" },
//   { id: "sub6", name: "Mathematics", teacherId: "t1", year: 2, course: "Science" },
//   { id: "sub7", name: "Physics", teacherId: "t2", year: 2, course: "Science" },
//   { id: "sub8", name: "Chemistry", teacherId: "t3", year: 2, course: "Science" },
//   { id: "sub9", name: "Biology", teacherId: "t4", year: 2, course: "Science" },
//   { id: "sub10", name: "Computer Science", teacherId: "t5", year: 2, course: "Science" },
//   { id: "sub11", name: "Mathematics", teacherId: "t1", year: 1, course: "Engineering" },
//   { id: "sub12", name: "Physics", teacherId: "t2", year: 1, course: "Engineering" },
//   { id: "sub13", name: "Computer Science", teacherId: "t5", year: 1, course: "Engineering" },
// ]

// // Mock feedback data
// export const mockFeedback = [
//   {
//     id: "f1",
//     subjectId: "sub1",
//     teacherId: "t1",
//     studentId: "s1",
//     rating: 4,
//     comment: "Great teaching style, very clear explanations",
//     sentiment: "positive",
//     date: "2023-05-15",
//   },
//   {
//     id: "f2",
//     subjectId: "sub1",
//     teacherId: "t1",
//     studentId: "s2",
//     rating: 5,
//     comment: "Excellent at breaking down complex concepts",
//     sentiment: "positive",
//     date: "2023-05-16",
//   },
//   {
//     id: "f3",
//     subjectId: "sub1",
//     teacherId: "t1",
//     studentId: "s1",
//     rating: 3,
//     comment: "Good teaching but could use more examples",
//     sentiment: "neutral",
//     date: "2023-05-17",
//   },
//   {
//     id: "f4",
//     subjectId: "sub2",
//     teacherId: "t2",
//     studentId: "s2",
//     rating: 2,
//     comment: "Lectures are too fast-paced to follow",
//     sentiment: "negative",
//     date: "2023-05-18",
//   },
//   {
//     id: "f5",
//     subjectId: "sub2",
//     teacherId: "t2",
//     studentId: "s1",
//     rating: 1,
//     comment: "Difficult to understand, needs to improve clarity",
//     sentiment: "negative",
//     date: "2023-05-19",
//   },
//   {
//     id: "f6",
//     subjectId: "sub3",
//     teacherId: "t3",
//     studentId: "s2",
//     rating: 4,
//     comment: "Very knowledgeable and passionate about the subject",
//     sentiment: "positive",
//     date: "2023-05-20",
//   },
//   {
//     id: "f7",
//     subjectId: "sub3",
//     teacherId: "t3",
//     studentId: "s1",
//     rating: 3,
//     comment: "Decent teaching but assignments are too difficult",
//     sentiment: "neutral",
//     date: "2023-05-21",
//   },
//   {
//     id: "f8",
//     subjectId: "sub4",
//     teacherId: "t4",
//     studentId: "s2",
//     rating: 5,
//     comment: "Best teacher I've had, makes learning enjoyable",
//     sentiment: "positive",
//     date: "2023-05-22",
//   },
//   {
//     id: "f9",
//     subjectId: "sub4",
//     teacherId: "t4",
//     studentId: "s1",
//     rating: 4,
//     comment: "Very helpful and always available for questions",
//     sentiment: "positive",
//     date: "2023-05-23",
//   },
//   {
//     id: "f10",
//     subjectId: "sub5",
//     teacherId: "t5",
//     studentId: "s2",
//     rating: 2,
//     comment: "Content is outdated and not relevant to current industry standards",
//     sentiment: "negative",
//     date: "2023-05-24",
//   },
//   {
//     id: "f11",
//     subjectId: "sub5",
//     teacherId: "t5",
//     studentId: "s1",
//     rating: 3,
//     comment: "Average teaching, could incorporate more practical examples",
//     sentiment: "neutral",
//     date: "2023-05-25",
//   },
//   {
//     id: "f12",
//     subjectId: "sub1",
//     teacherId: "t1",
//     studentId: "s2",
//     rating: 5,
//     comment: "Exceptional at explaining difficult concepts",
//     sentiment: "positive",
//     date: "2023-05-26",
//   },
//   {
//     id: "f13",
//     subjectId: "sub2",
//     teacherId: "t2",
//     studentId: "s1",
//     rating: 1,
//     comment: "Too much material covered too quickly",
//     sentiment: "negative",
//     date: "2023-05-27",
//   },
//   {
//     id: "f14",
//     subjectId: "sub3",
//     teacherId: "t3",
//     studentId: "s2",
//     rating: 4,
//     comment: "Engaging lectures with good real-world applications",
//     sentiment: "positive",
//     date: "2023-05-28",
//   },
//   {
//     id: "f15",
//     subjectId: "sub4",
//     teacherId: "t4",
//     studentId: "s1",
//     rating: 5,
//     comment: "Incredibly supportive and makes complex topics accessible",
//     sentiment: "positive",
//     date: "2023-05-29",
//   },
// ]

// const AuthContext = createContext(undefined)

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     // Check for saved user in localStorage
//     const savedUser = localStorage.getItem("user")
//     if (savedUser) {
//       setUser(JSON.parse(savedUser))
//     }
//     setIsLoading(false)
//   }, [])

//   const login = async (email, password, role) => {
//     // Simulate API call
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         let foundUser = null

//         if (role === "student") {
//           foundUser = mockStudents.find((student) => student.email === email && student.password === password)
//         } else {
//           foundUser = mockTeachers.find((teacher) => teacher.email === email && teacher.password === password)
//         }

//         if (foundUser) {
//           const { password: _, ...userWithoutPassword } = foundUser
//           setUser(userWithoutPassword)
//           localStorage.setItem("user", JSON.stringify(userWithoutPassword))
//           // Ensure state is updated before resolving
//           setTimeout(() => resolve(), 50)
//         } else {
//           reject(new Error("Invalid credentials"))
//         }
//       }, 1000)
//     })
//   }

//   const signup = async (name, email, password, role) => {
//     // Simulate API call
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         // Check if user already exists
//         const userExists = [...mockStudents, ...mockTeachers].some((user) => user.email === email)

//         if (userExists) {
//           reject(new Error("User already exists"))
//           return
//         }

//         // Create new user
//         const newUser = {
//           id: `${role[0]}${Date.now()}`,
//           name,
//           email,
//           password,
//           role,
//         }

//         // In a real app, you would save this to a database
//         if (role === "student") {
//           mockStudents.push(newUser)
//         } else {
//           mockTeachers.push(newUser)
//         }

//         const { password: _, ...userWithoutPassword } = newUser
//         setUser(userWithoutPassword)
//         localStorage.setItem("user", JSON.stringify(userWithoutPassword))
//         // Ensure state is updated before resolving
//         setTimeout(() => resolve(), 50)
//       }, 1000)
//     })
//   }

//   const logout = () => {
//     setUser(null)
//     localStorage.removeItem("user")
//   }

//   return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }

// // Export mock data for use in other components
// export { mockStudents, mockTeachers }



"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { doc, setDoc, getDoc, collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore"
import { auth, db } from "./firebaseConfig"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
          if (userDoc.exists()) {
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              ...userDoc.data(),
            })
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))

      if (userDoc.exists()) {
        const userData = {
          id: userCredential.user.uid,
          email: userCredential.user.email,
          ...userDoc.data(),
        }
        setUser(userData)
        return userData
      } else {
        throw new Error("User data not found")
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const signup = async (name, email, password, role, subjectInfo = null, studentInfo = null) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Create user document in Firestore
      const userData = {
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      }

      // Add student info if applicable
      if (role === "student" && studentInfo) {
        userData.year = studentInfo.year
        userData.course = studentInfo.course
      }

      await setDoc(doc(db, "users", userCredential.user.uid), userData)

      // If teacher, create their first subject
      if (role === "teacher" && subjectInfo) {
        await addDoc(collection(db, "subjects"), {
          name: subjectInfo.name,
          year: subjectInfo.year,
          course: subjectInfo.course,
          teacherId: userCredential.user.uid,
          teacherName: name,
          createdAt: new Date().toISOString(),
        })
      }

      const newUser = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        ...userData,
      }

      setUser(newUser)
      return newUser
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  // Enhanced addSubject function with better error handling and validation
  const addSubject = async (subjectData) => {
    try {
      // Validate required fields
      if (!subjectData.name || !subjectData.teacherId || !subjectData.teacherName) {
        throw new Error("Missing required fields: name, teacherId, or teacherName")
      }

      if (!subjectData.year || !subjectData.course) {
        throw new Error("Missing required fields: year or course")
      }

      // Ensure teacherId matches current user
      if (subjectData.teacherId !== auth.currentUser?.uid) {
        throw new Error("Unauthorized: teacherId does not match current user")
      }

      const docRef = await addDoc(collection(db, "subjects"), {
        name: subjectData.name,
        year: Number(subjectData.year),
        course: subjectData.course,
        teacherId: subjectData.teacherId,
        teacherName: subjectData.teacherName,
        createdAt: new Date().toISOString(),
      })

      return {
        id: docRef.id,
        ...subjectData,
        year: Number(subjectData.year),
        createdAt: new Date().toISOString(),
      }
    } catch (error) {
      console.error("Error adding subject to Firebase:", error)

      // Provide more specific error messages
      if (error.code === "permission-denied") {
        throw new Error("Permission denied. Please check your Firestore security rules.")
      } else if (error.code === "unauthenticated") {
        throw new Error("You must be logged in to add subjects.")
      } else {
        throw new Error(`Failed to add subject: ${error.message}`)
      }
    }
  }

  const getSubjects = async (filters = {}) => {
    try {
      let q = collection(db, "subjects")

      if (filters.teacherId) {
        q = query(q, where("teacherId", "==", filters.teacherId))
      }
      if (filters.year) {
        q = query(q, where("year", "==", filters.year))
      }
      if (filters.course) {
        q = query(q, where("course", "==", filters.course))
      }

      const querySnapshot = await getDocs(q)
      const subjects = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      return subjects
    } catch (error) {
      console.error("Error getting subjects:", error)
      return []
    }
  }

  const addFeedback = async (feedbackData) => {
    try {
      const docRef = await addDoc(collection(db, "feedback"), {
        ...feedbackData,
        createdAt: new Date().toISOString(),
        date: new Date().toISOString().split("T")[0],
      })
      return docRef.id
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const getFeedback = async (filters = {}) => {
    try {
      let q = collection(db, "feedback")

      if (filters.teacherId) {
        q = query(q, where("teacherId", "==", filters.teacherId))
      }
      if (filters.studentId) {
        q = query(q, where("studentId", "==", filters.studentId))
      }
      if (filters.subjectId) {
        q = query(q, where("subjectId", "==", filters.subjectId))
      }

      q = query(q, orderBy("createdAt", "desc"))

      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error("Error getting feedback:", error)
      return []
    }
  }

  const getTeachers = async () => {
    try {
      const q = query(collection(db, "users"), where("role", "==", "teacher"))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error("Error getting teachers:", error)
      return []
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isLoading,
        addSubject,
        getSubjects,
        addFeedback,
        getFeedback,
        getTeachers,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
