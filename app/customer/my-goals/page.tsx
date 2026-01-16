"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus, Target } from "lucide-react"

interface FitnessGoal {
  id: string
  title: string
  description: string
  targetDate: string
  progress: number
  status: "In Progress" | "Completed" | "On Hold"
}

const mockGoals: FitnessGoal[] = [
  {
    id: "1",
    title: "Lose 10 lbs",
    description: "Reduce weight from 200 lbs to 190 lbs",
    targetDate: "2025-06-15",
    progress: 60,
    status: "In Progress",
  },
  {
    id: "2",
    title: "Run a 5K",
    description: "Complete a 5K run without stopping",
    targetDate: "2025-04-15",
    progress: 75,
    status: "In Progress",
  },
  {
    id: "3",
    title: "Bench Press 225 lbs",
    description: "Increase bench press strength",
    targetDate: "2025-08-30",
    progress: 40,
    status: "In Progress",
  },
]

export default function MyGoalsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Fitness Goals</h1>
          <p className="text-muted-foreground">Track your personal fitness objectives</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          New Goal
        </Button>
      </div>

      {/* Goals */}
      <div className="space-y-4">
        {mockGoals.map((goal) => (
          <Card key={goal.id} className="p-6 border-border/50 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{goal.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  goal.status === "In Progress"
                    ? "bg-blue-100 text-blue-700"
                    : goal.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {goal.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <p className="text-muted-foreground">Progress</p>
                <p className="font-semibold text-foreground">{goal.progress}%</p>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </div>

            <p className="text-xs text-muted-foreground mt-3">Target date: {goal.targetDate}</p>
          </Card>
        ))}
      </div>

      {/* Diet Tips from Gym */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Diet Tips from Your Gym</h2>
        <div className="space-y-3">
          {[
            { tip: "Protein Intake", advice: "Consume 0.8-1g of protein per pound of body weight daily" },
            { tip: "Hydration", advice: "Drink at least 8-10 glasses of water throughout the day" },
            { tip: "Meal Timing", advice: "Eat a balanced meal 2-3 hours before your workout" },
            { tip: "Recovery Nutrition", advice: "Consume carbs and protein within 30 mins after workout" },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="font-semibold text-accent text-sm">{item.tip}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.advice}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
