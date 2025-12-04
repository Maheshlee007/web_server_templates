
import { Moon, Sun } from "lucide-react"
import { useState } from "react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    // Add your theme toggle logic here
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle inline-flex items-center justify-center w-9 h-9 rounded-xl border border-border-primary bg-surface-primary hover:bg-surface-secondary transition-all duration-200 group"
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-text-primary group-hover:text-warning-500 group-hover:rotate-45 transition-all duration-300" />
      ) : (
        <Moon className="h-4 w-4 text-text-primary group-hover:text-primary-500 group-hover:-rotate-12 transition-all duration-300" />
      )}
    </button>
  )
}

export default ThemeToggle