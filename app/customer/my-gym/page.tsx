"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Phone, Clock, CheckCircle } from "lucide-react"

export default function MyGymPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Gym</h1>
        <p className="text-muted-foreground">FitClub Downtown - Your current membership</p>
      </div>

      {/* Membership Card */}
      <Card className="p-6 border-0 shadow-lg bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <Badge className="bg-green-500 mb-3">Active Member</Badge>
            <h2 className="text-2xl font-bold text-foreground">FitClub Downtown</h2>
            <p className="text-muted-foreground flex items-center gap-2 mt-2">
              <MapPin className="w-4 h-4" />
              123 Main Street, Downtown
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Premium Member</p>
            <p className="text-2xl font-bold text-primary">$89.99/mo</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border/30">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Membership Since</p>
            <p className="font-semibold text-foreground">Jan 15, 2024</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Renewal Date</p>
            <p className="font-semibold text-foreground">Mar 15, 2025</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Days Remaining</p>
            <p className="font-semibold text-foreground">58 days</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Visits This Month</p>
            <p className="font-semibold text-foreground">12 visits</p>
          </div>
        </div>
      </Card>

      {/* Gym Info & Amenities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Gym Information</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold text-foreground">Hours</p>
                <p className="text-sm text-muted-foreground">Mon-Fri: 5:00 AM - 11:00 PM</p>
                <p className="text-sm text-muted-foreground">Sat-Sun: 6:00 AM - 10:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold text-foreground">Contact</p>
                <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                <p className="text-sm text-muted-foreground">info@fitclub.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Users className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="font-semibold text-foreground">Membership</p>
                <p className="text-sm text-muted-foreground">Premium - Unlimited Access</p>
                <p className="text-sm text-muted-foreground">5 Guest Passes Remaining</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Amenities</h2>
          <div className="space-y-2">
            {["Weight Training", "Cardio Equipment", "Swimming Pool", "Yoga Studio", "Sauna", "Café"].map(
              (amenity, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-foreground">{amenity}</span>
                </div>
              ),
            )}
          </div>
        </Card>
      </div>

      {/* Trainers */}
      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Staff</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Sarah Johnson", role: "Head Trainer", specialty: "HIIT & Cardio" },
            { name: "Mike Chen", role: "Strength Coach", specialty: "Weightlifting" },
            { name: "Emma Wilson", role: "Yoga Instructor", specialty: "Yoga & Flexibility" },
          ].map((trainer, i) => (
            <div key={i} className="p-4 border border-border rounded-lg">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-primary">{trainer.name.charAt(0)}</span>
              </div>
              <p className="font-semibold text-foreground">{trainer.name}</p>
              <p className="text-sm text-primary font-medium">{trainer.role}</p>
              <p className="text-xs text-muted-foreground mt-1">{trainer.specialty}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button className="bg-primary hover:bg-primary/90 flex-1">Edit Preferences</Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          Manage Membership
        </Button>
      </div>
    </div>
  )
}
