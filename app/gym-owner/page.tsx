"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  TrendingUp,
  MoreVertical,
  ArrowUpRight,
  UserPlus
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis
} from "recharts"

const MEMBER_ACTIVITY_DATA = [
  { name: "08:00-10:00", value: 90, color: "#2c9d9d" }, // Teal
  { name: "10:00-14:00", value: 65, color: "#32b0b0" }, // Light Teal
  { name: "10:00-14:00", value: 30, color: "#082324" }, // Deep Teal
  { name: "10:00-14:00", value: 89, color: "#ffffff" }, // White
]

const STATUS_DATA = [
  { month: "Jan", gold: 400, silver: 240, platinum: 240 },
  { month: "Feb", gold: 300, silver: 139, platinum: 221 },
  { month: "Mar", gold: 200, silver: 980, platinum: 229 },
  { month: "Apr", gold: 278, silver: 390, platinum: 200 },
  { month: "May", gold: 189, silver: 480, platinum: 218 },
  { month: "Jun", gold: 239, silver: 380, platinum: 250 },
  { month: "Jul", gold: 349, silver: 430, platinum: 210 },
]

const TARGET_DATA = [
  { name: "Target", value: 75.55, fill: "#2c9d9d" }
]

export default function GymOwnerDashboard() {
  return (
    <div className="p-6 space-y-6 bg-background h-full overflow-y-auto">
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Left Column - Hero & KPI Cards */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          {/* Hero Section */}
          <div className="relative rounded-3xl overflow-hidden bg-card border border-border min-h-[300px] flex">
            <div className="relative z-10 p-10 flex flex-col justify-center max-w-lg">
              <p className="text-muted-foreground mb-2">January 11, 2024</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome Back, Emon</h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
                Ready to set up your club's Loyalty Card?
              </p>
              <Button className="bg-[#2c9d9d] hover:bg-[#32b0b0] text-white w-fit px-8 py-6 rounded-xl text-lg font-semibold border-none">
                Set Up
              </Button>
              <div className="flex gap-2 mt-8">
                <div className="w-8 h-1 bg-white rounded-full"></div>
                <div className="w-2 h-1 bg-white/30 rounded-full"></div>
                <div className="w-2 h-1 bg-white/30 rounded-full"></div>
                <div className="w-2 h-1 bg-white/30 rounded-full"></div>
              </div>
            </div>

            {/* Hero Image Overlay */}
            <div className="absolute top-0 right-0 h-full w-2/3">
              <div className="absolute inset-0 bg-gradient-to-r from-card via-card/50 to-transparent z-[1]" />
              <img
                src="/hero-fitness.png"
                alt="Fitness"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card border-border rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-muted-foreground font-medium">Current Members</h3>
                <Users className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-4xl font-bold text-white mb-2">5,890</p>
              <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
                <span>+3,840 (26.80%)</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 bg-card border-border rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-muted-foreground font-medium">New Members</h3>
                <UserPlus className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-4xl font-bold text-white mb-2">2,000</p>
              <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
                <span>+530 (8.38%)</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Card>

            <Card className="p-6 bg-card border-border rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-muted-foreground font-medium">Today Visitor</h3>
                <TrendingUp className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-4xl font-bold text-white mb-2">5,00</p>
              <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
                <span>+530 (8.38%)</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Card>
          </div>

          {/* Membership Status Report Chart */}
          <Card className="p-6 bg-card border-border rounded-2xl flex-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Membership Status Report</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#2c9d9d]" />
                  <span className="text-sm text-muted-foreground">Gold</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ec4899]" />
                  <span className="text-sm text-muted-foreground">Silver</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                  <span className="text-sm text-muted-foreground">Platinum</span>
                </div>
              </div>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={STATUS_DATA}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="gold" stroke="#2c9d9d" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="silver" stroke="#ec4899" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="platinum" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right Column - Activity & Targets */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {/* Member Activity */}
          <Card className="p-6 bg-card border-border rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Member Activity</h3>
              <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MEMBER_ACTIVITY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={80}
                    dataKey="value"
                    stroke="none"
                  >
                    {MEMBER_ACTIVITY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Custom Legend to match design visually */}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {MEMBER_ACTIVITY_DATA.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Membership Target */}
          <Card className="p-6 bg-card border-border rounded-2xl flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Membership Target</h3>
              <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="80%"
                    innerRadius="100%"
                    outerRadius="140%"
                    barSize={20}
                    data={TARGET_DATA}
                    startAngle={180}
                    endAngle={0}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar
                      background
                      dataKey="value"
                      cornerRadius={30}
                      fill="#2c9d9d"
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="absolute bottom-10 text-center">
                <p className="text-3xl font-bold text-white">75.55%</p>
                <div className="inline-block bg-green-500/20 text-green-500 text-xs px-2 py-0.5 rounded-full mt-1">
                  +10%
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground mb-2">It's higher than yesterday</p>
              <div className="flex justify-center gap-8">
                <div>
                  <p className="text-xs text-muted-foreground">Target</p>
                  <p className="text-white font-semibold flex items-center gap-1">
                    200 <span className="text-red-500 text-[10px]">↓</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Today</p>
                  <p className="text-white font-semibold flex items-center gap-1">
                    250 <span className="text-green-500 text-[10px]">↑</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
