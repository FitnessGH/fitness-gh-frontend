"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/login-form"
import { useAuth } from "@/components/auth-context"
import { getDashboardPath } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Dumbbell, Zap, BarChart3, Users, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const [showLogin, setShowLogin] = React.useState(false)

  React.useEffect(() => {
    if (isAuthenticated && user) {
      router.replace(getDashboardPath(user.role))
    }
  }, [isAuthenticated, user, router])

  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">FitHub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/apply"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Apply as Owner
            </Link>
            <Button
              onClick={() => setShowLogin(true)}
              className="bg-primary hover:bg-primary/90"
            >
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 px-6 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Build Your Fitness <span className="text-primary">Empire</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Complete gym management platform. Members, trainers, payments, events, and community all in one powerful
                dashboard.
              </p>
            </div>
            <Button
              onClick={() => setShowLogin(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
            >
              Get Started
            </Button>
          </div>

          {/* Hero Image */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-card to-secondary/20 rounded-2xl p-8 border border-border">
                <div className="space-y-4">
                  <div className="h-48 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Dumbbell className="w-24 h-24 text-primary/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-primary">5,890</p>
                      <p className="text-xs text-muted-foreground">Athletes</p>
                    </div>
                    <div className="bg-secondary/10 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">2,000</p>
                      <p className="text-xs text-muted-foreground">New This Month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20 bg-secondary/5 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">Everything you need to run a successful gym</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Member Management",
                description: "Track athletes, manage memberships, handle renewals, and maintain engagement",
              },
              {
                icon: TrendingUp,
                title: "Real-time Analytics",
                description: "Monitor revenue, membership trends, attendance patterns, and business growth",
              },
              {
                icon: Zap,
                title: "Event Management",
                description: "Create classes, schedule workouts, manage capacity, and engage members",
              },
              {
                icon: BarChart3,
                title: "Financial Control",
                description: "Process payments, manage payroll, issue receipts, and track expenses",
              },
              {
                icon: Shield,
                title: "Team Management",
                description: "Hire trainers, assign roles, manage schedules, and track performance",
              },
              {
                icon: Dumbbell,
                title: "Marketplace",
                description: "Sell products, partner with vendors, and create additional revenue streams",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                >
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Gym?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join hundreds of gym owners who are using FitHub to streamline operations and grow their business.
          </p>
          <Button onClick={() => setShowLogin(true)} size="lg" className="bg-primary hover:bg-primary/90">
            Start Your Free Trial
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-12 bg-card/50">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2026 FitHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
