"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { BookOpen, Home, LogOut, User, Users } from "lucide-react"
import { classNames } from "@/lib/utils"

export function StudentSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const navigation = [
    { name: "Dashboard", href: "/student/dashboard", icon: Home },
    { name: "Teachers", href: "/student/teachers", icon: Users },
    { name: "Subjects", href: "/student/subjects", icon: BookOpen },
    { name: "Profile", href: "/student/profile", icon: User },
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 style={{ fontSize: "1.125rem", fontWeight: "600" }}>Student Portal</h2>
      </div>
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={classNames("sidebar-nav-item", pathname === item.href ? "active" : "")}
            >
              <item.icon style={{ marginRight: "0.75rem", height: "1.25rem", width: "1.25rem" }} />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-name">{user?.name}</div>
            <div className="sidebar-user-email">{user?.email}</div>
          </div>
          <button
            className="btn btn-outline btn-block"
            style={{ justifyContent: "flex-start" }}
            onClick={() => logout()}
          >
            <LogOut style={{ marginRight: "0.5rem", height: "1rem", width: "1rem" }} />
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}
