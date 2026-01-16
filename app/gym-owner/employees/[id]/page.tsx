"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Mail,
    Phone,
    MapPin,
    Award,
    Star,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    Users
} from "lucide-react"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts"

const ACTIVITY_DATA = [
    { time: "1 Hour", value: 30 },
    { time: "2 Hour", value: 45 },
    { time: "3 Hour", value: 35 },
    { time: "4 Hour", value: 50 },
    { time: "5 Hour", value: 70 },
    { time: "6 Hour", value: 65 }, // Peak
    { time: "7 Hour", value: 55 },
    { time: "8 Hour", value: 40 },
    { time: "9 Hour", value: 35 },
    { time: "10 Hour", value: 50 },
    { time: "11 Hour", value: 55 },
    { time: "12 Hour", value: 54 },
]
// Generating smoother curve data
const CHART_DATA = Array.from({ length: 24 }, (_, i) => ({
    date: `${i} Jan`,
    value: Math.floor(Math.random() * 3) + 1 + (i > 5 && i < 15 ? 1 : 0) + (i === 6 ? 1.5 : 0) // Fake peak
}))

const SCHEDULE_DATA = [
    { day: "Thu, 2 Jan", time: "08:00 AM", title: "Chest Day", participants: 16, duration: "40 Minutes" },
    { day: "Thu, 2 Jan", time: "08:00 AM", title: "Shoulder Day", participants: 16, duration: "40 Minutes" },
    { day: "Thu, 2 Jan", time: "08:00 AM", title: "Core Stability", participants: 16, duration: "40 Minutes" },
    { day: "Thu, 2 Jan", time: "08:00 AM", title: "Full Body", participants: 16, duration: "40 Minutes" },
    { day: "Thu, 2 Jan", time: "08:00 AM", title: "Advance Day", participants: 16, duration: "40 Minutes" },
]

export default function TrainerDetailsPage() {
    return (
        <div className="p-6 space-y-6 h-full overflow-y-auto">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">Trainer Details</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>Trainer List</span>
                    <span>{">"}</span>
                    <span className="text-foreground">Trainer Details</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Profile & Contact */}
                <div className="space-y-6">
                    {/* Profile Card */}
                    <Card className="p-6 bg-card border-border text-center relative">
                        <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-muted-foreground">
                            <MoreVertical className="w-5 h-5" />
                        </Button>
                        <div className="flex flex-col items-center">
                            <div className="relative mb-4">
                                <div className="w-24 h-24 rounded-full border-2 border-primary p-1">
                                    <Avatar className="w-full h-full">
                                        <AvatarImage src="https://i.pravatar.cc/300?u=brooklyn" />
                                        <AvatarFallback>BS</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-foreground">Brooklyn Simmons</h2>
                            <p className="text-muted-foreground text-sm mb-6">Strength Coach</p>

                            <div className="grid grid-cols-3 gap-4 w-full border-t border-border pt-6">
                                <div>
                                    <p className="text-lg font-bold text-foreground">5 yrs</p>
                                    <p className="text-xs text-muted-foreground">Experience</p>
                                </div>
                                <div className="border-l border-r border-border px-2">
                                    <p className="text-lg font-bold text-foreground">150+</p>
                                    <p className="text-xs text-muted-foreground">Member</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-foreground flex items-center justify-center gap-1">
                                        4.9/5 <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                    </p>
                                    <p className="text-xs text-muted-foreground">Rating</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Contact Card */}
                    <Card className="p-6 bg-card border-border relative">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="tex-lg font-semibold text-foreground">Contact</h3>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="bg-secondary/50 p-2.5 rounded-lg text-muted-foreground">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Email</p>
                                    <p className="text-sm font-medium text-foreground">www.yourmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-secondary/50 p-2.5 rounded-lg text-muted-foreground">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Phone</p>
                                    <p className="text-sm font-medium text-foreground">+01234567890</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-secondary/50 p-2.5 rounded-lg text-muted-foreground">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Address</p>
                                    <p className="text-sm font-medium text-foreground">4517 Washington Ave.</p>
                                    <p className="text-sm font-medium text-foreground">Manchester, Kentucky 39495</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Certifications Card */}
                    <Card className="p-6 bg-card border-border relative">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="tex-lg font-semibold text-foreground">Certifications</h3>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "NASM - National Academy of Sports Medicine", year: "2018" },
                                { name: "ACE - American Council on Exercise", year: "2017" },
                                { name: "ISSA - International Sports Sciences Association", year: "2018" },
                            ].map((cert, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="bg-secondary/50 p-2 rounded-lg text-muted-foreground h-fit">
                                        <Award className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground leading-snug">{cert.name}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{cert.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column - Activity & Schedule */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Training Activity Chart */}
                    <Card className="p-6 bg-card border-border">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-foreground">Training Activity</h3>
                            <Button variant="outline" size="sm" className="bg-[#2c9d9d] hover:bg-[#32b0b0] text-white border-0 text-xs">
                                1-12 January 2025 ▼
                            </Button>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={CHART_DATA}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#333" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                                        cursor={{ stroke: '#2c9d9d', strokeWidth: 2 }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {/* Calendar */}
                        <Card className="md:col-span-2 p-6 bg-card border-border">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-foreground">January</h3>
                                <div className="flex gap-2">
                                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-2 text-center text-xs mb-2 text-muted-foreground">
                                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                            </div>
                            <div className="grid grid-cols-7 gap-2 text-center text-sm">
                                {/* Simplified Calendar Grid for Demo */}
                                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                                    const isSelected = [2, 9, 13, 23, 11, 19, 24].includes(day);
                                    const isToday = day === 2; // Example highlight
                                    return (
                                        <div
                                            key={day}
                                            className={`aspect-square flex items-center justify-center rounded-full text-xs
                         ${isSelected ? 'bg-[#2c9d9d] text-white' : 'text-muted-foreground hover:bg-muted'}
                       `}
                                        >
                                            {day}
                                        </div>
                                    )
                                })}
                            </div>
                        </Card>

                        {/* Schedule List */}
                        <Card className="md:col-span-3 p-6 bg-card border-border">
                            <div className="mb-6">
                                <h3 className="font-semibold text-foreground">Brooklyn's Schedule</h3>
                            </div>
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                                {SCHEDULE_DATA.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between group">
                                        <div>
                                            <p className="text-xs text-muted-foreground">{item.day}</p>
                                            <p className="text-xs text-muted-foreground">{item.time}</p>
                                        </div>
                                        <div className="flex-1 px-6">
                                            <p className="text-sm font-medium text-foreground">{item.title}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                                                <span className="w-3 h-3"><Users className="w-full h-full" /></span> {item.participants} Participants
                                            </p>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                                                <span className="w-3 h-3">⏱</span> {item.duration}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
