// Email validation - accepts gmail.com and common educational/institutional domains
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address"
  }

  const allowedDomains = [
    "gmail.com",
    "edu",
    "ac.in",
    "university.edu",
    "college.edu",
    "institute.edu",
    "school.edu",
    "iit.ac.in",
    "nit.ac.in",
    "iiit.ac.in",
  ]

  const domain = email.split("@")[1]
  const isValidDomain = allowedDomains.some(
    (allowedDomain) => domain === allowedDomain || domain.endsWith("." + allowedDomain),
  )

  if (!isValidDomain) {
    return "Please use a valid institutional email (@gmail.com, @edu, @ac.in, etc.)"
  }

  return null
}

// Password validation - 8+ chars, uppercase, lowercase, number, special char
export const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long"
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter"
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter"
  }

  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number"
  }

  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return "Password must contain at least one special character"
  }

  return null
}

// Mock database for demonstration
const mockDatabase = {
  students: [
    { email: "john.doe@gmail.com", password: "Student123!" },
    { email: "jane.smith@university.edu", password: "MyPass456@" },
    { email: "student@college.edu", password: "SecurePass789#" },
  ],
  teachers: [
    { email: "dr.smith@university.edu", password: "Teacher123!" },
    { email: "prof.johnson@college.edu", password: "MyTeach456@" },
    { email: "teacher@gmail.com", password: "EduPass789#" },
  ],
}

// Check if user exists in database
export const authenticateUser = (email, password, userType) => {
  const users = mockDatabase[userType === "student" ? "students" : "teachers"]
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return "Invalid email or password"
  }

  return null
}

// Check if email already exists during signup
export const checkEmailExists = (email, userType) => {
  const users = mockDatabase[userType === "student" ? "students" : "teachers"]
  const exists = users.find((u) => u.email === email)

  if (exists) {
    return "An account with this email already exists"
  }

  return null
}
