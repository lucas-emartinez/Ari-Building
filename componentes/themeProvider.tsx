'use client'

import React, { useEffect } from "react"

// ThemeProvider always enforces the light theme for the website
interface ThemeProviderProps {
  attribute?: string
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  attribute = "class",
  children,
}) => {
  useEffect(() => {
    // Always set the theme to light
    if (attribute === "class") {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
    } else {
      document.documentElement.setAttribute(attribute, "light")
    }
  }, [attribute])

  // Just render children, no context or theme switching
  return <>{children}</>
}
