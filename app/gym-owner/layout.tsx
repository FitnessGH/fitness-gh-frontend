"use client"

import React, { useState } from "react"
import { useAuth } from "@/components/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { Header } from "@/components/layout/header"
import { SidebarNav } from "@/components/layout/sidebar-nav"

export default function GymOwnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, logout, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  React.useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      router.replace("/")
      return
    }

    if (user?.role === "gym_owner") {
      if (!user.approvalStatus && pathname !== "/gym-owner/onboarding") {
        router.push("/gym-owner/onboarding")
      } else if (user.approvalStatus === "pending" && pathname !== "/gym-owner/approval-pending") {
        router.push("/gym-owner/approval-pending")
      } else if (user.approvalStatus === "approved" && (pathname === "/gym-owner/onboarding" || pathname === "/gym-owner/approval-pending")) {
        router.push("/gym-owner")
      }
    }
  }, [isAuthenticated, user, router, pathname, isLoading])

  if (!user) {
    return null
  }

  const isOnboardingOrPending = pathname === "/gym-owner/onboarding" || pathname === "/gym-owner/approval-pending"

  if (isOnboardingOrPending) {
    return <main className="min-h-screen bg-background">{children}</main>
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"
          } border-r border-border bg-sidebar transition-all duration-300 hidden md:flex flex-col`}
      >
        <div className="p-4 border-b border-sidebar-border flex items-center justify-center h-16">
          <h1 className="text-xl font-bold text-sidebar-primary">FitHub</h1>
        </div>
        <SidebarNav role={user.role} onLogout={logout} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
