"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import type { AuthUser, UserRole } from "@/lib/auth"
import { validateCredentials } from "@/lib/auth"

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  switchRole: (role: UserRole) => void
  updateUser: (updates: Partial<AuthUser>) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const authUser = validateCredentials(email, password)
      if (!authUser) {
        throw new Error("Invalid credentials")
      }

      setUser(authUser)
      // Store in sessionStorage for demo purposes
      sessionStorage.setItem("user", JSON.stringify(authUser))
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    sessionStorage.removeItem("user")
  }, [])

  const switchRole = useCallback(
    (role: UserRole) => {
      if (user) {
        const updatedUser = { ...user, role }
        setUser(updatedUser)
        sessionStorage.setItem("user", JSON.stringify(updatedUser))
      }
    },
    [user],
  )

  const updateUser = useCallback(
    (updates: Partial<AuthUser>) => {
      if (user) {
        const updatedUser = { ...user, ...updates }
        setUser(updatedUser)
        sessionStorage.setItem("user", JSON.stringify(updatedUser))
      }
    },
    [user],
  )

  // Initialize from sessionStorage on mount
  React.useEffect(() => {
    const stored = sessionStorage.getItem("user")
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (e) {
        sessionStorage.removeItem("user")
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout, switchRole, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
