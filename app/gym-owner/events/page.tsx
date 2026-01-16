"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CalendarIcon, MapPin, Users, Plus, Edit2, Trash2, Clock } from "lucide-react"

interface GymEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  capacity: number
  attendees: number
  instructor: string
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled"
}

const mockEvents: GymEvent[] = [
  {
    id: "EV001",
    title: "HIIT Workout Challenge",
    description: "High-intensity interval training session for all fitness levels",
    date: "2025-01-18",
    time: "18:00",
    location: "Main Studio",
    capacity: 30,
    attendees: 24,
    instructor: "Sarah Johnson",
    status: "Upcoming",
  },
  {
    id: "EV002",
    title: "Yoga & Meditation",
    description: "Relaxing yoga class with meditation for stress relief",
    date: "2025-01-19",
    time: "10:00",
    location: "Yoga Studio",
    capacity: 20,
    attendees: 18,
    instructor: "Emma Davis",
    status: "Upcoming",
  },
  {
    id: "EV003",
    title: "Strength Training Workshop",
    description: "Learn proper form and techniques for weight training",
    date: "2025-01-17",
    time: "19:00",
    location: "Weight Training Area",
    capacity: 25,
    attendees: 22,
    instructor: "John Smith",
    status: "Ongoing",
  },
  {
    id: "EV004",
    title: "Zumba Dance Class",
    description: "Fun and energetic dance fitness class",
    date: "2025-01-16",
    time: "17:30",
    location: "Dance Studio",
    capacity: 35,
    attendees: 32,
    instructor: "Mike Chen",
    status: "Completed",
  },
]

export default function EventsPage() {
  const [events, setEvents] = useState<GymEvent[]>(mockEvents)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    instructor: "",
  })

  const filteredEvents = events.filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-700"
      case "Ongoing":
        return "bg-green-100 text-green-700"
      case "Completed":
        return "bg-gray-100 text-gray-700"
      case "Cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const handleCreateEvent = () => {
    const newEvent: GymEvent = {
      id: `EV${Date.now()}`,
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      capacity: Number.parseInt(formData.capacity) || 0,
      attendees: 0,
      instructor: formData.instructor,
      status: "Upcoming",
    }
    setEvents([...events, newEvent])
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      capacity: "",
      instructor: "",
    })
    setIsModalOpen(false)
    console.log("[v0] Event created:", newEvent)
  }

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pump Sessions</h1>
          <p className="text-muted-foreground">Create and manage gym events and classes</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Create Session
        </Button>
      </div>

      <Card className="p-4 border-border/50">
        <Label className="text-xs text-muted-foreground mb-2 block">Search Events</Label>
        <Input
          placeholder="Search by event name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Card>

      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="p-6 border-border/50 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent text-destructive"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium text-foreground">{event.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="font-medium text-foreground">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">{event.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Attendees</p>
                  <p className="font-medium text-foreground">
                    {event.attendees}/{event.capacity}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Instructor: <span className="font-medium text-foreground">{event.instructor}</span>
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Event Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Pump Session</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Session Title</label>
              <Input
                placeholder="e.g., HIIT Workout Challenge"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder="Describe the session..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Time</label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input
                placeholder="e.g., Main Studio"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Capacity</label>
              <Input
                type="number"
                placeholder="30"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Instructor</label>
              <Input
                placeholder="Instructor name"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateEvent} className="bg-primary hover:bg-primary/90">
                Create Session
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
