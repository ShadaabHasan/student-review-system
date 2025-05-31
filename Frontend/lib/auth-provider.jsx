"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Mock data for demonstration
const mockStudents = [
  { id: "s1", name: "John Doe", email: "john@example.com", password: "password", role: "student" },
  { id: "s2", name: "Jane Smith", email: "jane@example.com", password: "password", role: "student" },
]

const mockTeachers = [
  {
    id: "t1",
    name: "Prof. Robert Brown",
    email: "robert@example.com",
    password: "password",
    role: "teacher",
    subject: "Mathematics",
  },
  {
    id: "t2",
    name: "Dr. Emily White",
    email: "emily@example.com",
    password: "password",
    role: "teacher",
    subject: "Physics",
  },
  {
    id: "t3",
    name: "Prof. Michael Green",
    email: "michael@example.com",
    password: "password",
    role: "teacher",
    subject: "Chemistry",
  },
  {
    id: "t4",
    name: "Dr. Sarah Johnson",
    email: "sarah@example.com",
    password: "password",
    role: "teacher",
    subject: "Biology",
  },
  {
    id: "t5",
    name: "Prof. David Lee",
    email: "david@example.com",
    password: "password",
    role: "teacher",
    subject: "Computer Science",
  },
]

// Mock subjects data
export const mockSubjects = [
  { id: "sub1", name: "Mathematics", teacherId: "t1", year: 1, course: "Science" },
  { id: "sub2", name: "Physics", teacherId: "t2", year: 1, course: "Science" },
  { id: "sub3", name: "Chemistry", teacherId: "t3", year: 1, course: "Science" },
  { id: "sub4", name: "Biology", teacherId: "t4", year: 1, course: "Science" },
  { id: "sub5", name: "Computer Science", teacherId: "t5", year: 1, course: "Science" },
  { id: "sub6", name: "Mathematics", teacherId: "t1", year: 2, course: "Science" },
  { id: "sub7", name: "Physics", teacherId: "t2", year: 2, course: "Science" },
  { id: "sub8", name: "Chemistry", teacherId: "t3", year: 2, course: "Science" },
  { id: "sub9", name: "Biology", teacherId: "t4", year: 2, course: "Science" },
  { id: "sub10", name: "Computer Science", teacherId: "t5", year: 2, course: "Science" },
  { id: "sub11", name: "Mathematics", teacherId: "t1", year: 1, course: "Engineering" },
  { id: "sub12", name: "Physics", teacherId: "t2", year: 1, course: "Engineering" },
  { id: "sub13", name: "Computer Science", teacherId: "t5", year: 1, course: "Engineering" },
]

// Mock feedback data
export const mockFeedback = [
  {
    id: "f1",
    subjectId: "sub1",
    teacherId: "t1",
    studentId: "s1",
    rating: 4,
    comment: "Great teaching style, very clear explanations",
    sentiment: "positive",
    date: "2023-05-15",
  },
  {
    id: "f2",
    subjectId: "sub1",
    teacherId: "t1",
    studentId: "s2",
    rating: 5,
    comment: "Excellent at breaking down complex concepts",
    sentiment: "positive",
    date: "2023-05-16",
  },
  {
    id: "f3",
    subjectId: "sub1",
    teacherId: "t1",
    studentId: "s1",
    rating: 3,
    comment: "Good teaching but could use more examples",
    sentiment: "neutral",
    date: "2023-05-17",
  },
  {
    id: "f4",
    subjectId: "sub2",
    teacherId: "t2",
    studentId: "s2",
    rating: 2,
    comment: "Lectures are too fast-paced to follow",
    sentiment: "negative",
    date: "2023-05-18",
  },
  {
    id: "f5",
    subjectId: "sub2",
    teacherId: "t2",
    studentId: "s1",
    rating: 1,
    comment: "Difficult to understand, needs to improve clarity",
    sentiment: "negative",
    date: "2023-05-19",
  },
  {
    id: "f6",
    subjectId: "sub3",
    teacherId: "t3",
    studentId: "s2",
    rating: 4,
    comment: "Very knowledgeable and passionate about the subject",
    sentiment: "positive",
    date: "2023-05-20",
  },
  {
    id: "f7",
    subjectId: "sub3",
    teacherId: "t3",
    studentId: "s1",
    rating: 3,
    comment: "Decent teaching but assignments are too difficult",
    sentiment: "neutral",
    date: "2023-05-21",
  },
  {
    id: "f8",
    subjectId: "sub4",
    teacherId: "t4",
    studentId: "s2",
    rating: 5,
    comment: "Best teacher I've had, makes learning enjoyable",
    sentiment: "positive",
    date: "2023-05-22",
  },
  {
    id: "f9",
    subjectId: "sub4",
    teacherId: "t4",
    studentId: "s1",
    rating: 4,
    comment: "Very helpful and always available for questions",
    sentiment: "positive",
    date: "2023-05-23",
  },
  {
    id: "f10",
    subjectId: "sub5",
    teacherId: "t5",
    studentId: "s2",
    rating: 2,
    comment: "Content is outdated and not relevant to current industry standards",
    sentiment: "negative",
    date: "2023-05-24",
  },
  {
    id: "f11",
    subjectId: "sub5",
    teacherId: "t5",
    studentId: "s1",
    rating: 3,
    comment: "Average teaching, could incorporate more practical examples",
    sentiment: "neutral",
    date: "2023-05-25",
  },
  {
    id: "f12",
    subjectId: "sub1",
    teacherId: "t1",
    studentId: "s2",
    rating: 5,
    comment: "Exceptional at explaining difficult concepts",
    sentiment: "positive",
    date: "2023-05-26",
  },
  {
    id: "f13",
    subjectId: "sub2",
    teacherId: "t2",
    studentId: "s1",
    rating: 1,
    comment: "Too much material covered too quickly",
    sentiment: "negative",
    date: "2023-05-27",
  },
  {
    id: "f14",
    subjectId: "sub3",
    teacherId: "t3",
    studentId: "s2",
    rating: 4,
    comment: "Engaging lectures with good real-world applications",
    sentiment: "positive",
    date: "2023-05-28",
  },
  {
    id: "f15",
    subjectId: "sub4",
    teacherId: "t4",
    studentId: "s1",
    rating: 5,
    comment: "Incredibly supportive and makes complex topics accessible",
    sentiment: "positive",
    date: "2023-05-29",
  },
]

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password, role) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let foundUser = null

        if (role === "student") {
          foundUser = mockStudents.find((student) => student.email === email && student.password === password)
        } else {
          foundUser = mockTeachers.find((teacher) => teacher.email === email && teacher.password === password)
        }

        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser
          setUser(userWithoutPassword)
          localStorage.setItem("user", JSON.stringify(userWithoutPassword))
          resolve()
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }

  const signup = async (name, email, password, role) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const userExists = [...mockStudents, ...mockTeachers].some((user) => user.email === email)

        if (userExists) {
          reject(new Error("User already exists"))
          return
        }

        // Create new user
        const newUser = {
          id: `${role[0]}${Date.now()}`,
          name,
          email,
          password,
          role,
        }

        // In a real app, you would save this to a database
        if (role === "student") {
          mockStudents.push(newUser)
        } else {
          mockTeachers.push(newUser)
        }

        const { password: _, ...userWithoutPassword } = newUser
        setUser(userWithoutPassword)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        resolve()
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Export mock data for use in other components
export { mockStudents, mockTeachers }
