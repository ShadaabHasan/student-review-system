"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="btn btn-outline btn-sm"
      style={{ padding: "0.5rem", borderRadius: "50%" }}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  )
}
