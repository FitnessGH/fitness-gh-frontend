"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Users, DollarSign, Search } from "lucide-react"
import { useState } from "react"

const MOCK_GYMS = [
  {
    id: 1,
    name: "FitClub Downtown",
    location: "123 Main Street, Downtown",
    price: "$89.99/month",
    rating: 4.8,
    reviews: 342,
    members: 1240,
    amenities: ["Weight Training", "Cardio", "Pool", "Yoga"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "PowerLift Gym",
    location: "456 Oak Avenue, Midtown",
    price: "$79.99/month",
    rating: 4.6,
    reviews: 289,
    members: 856,
    amenities: ["Weightlifting", "CrossFit", "Personal Training"],
    image: "https://images.unsplash.com/photo-1540497905703-29efb88a5602?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Yoga & Wellness Center",
    location: "789 Pine Road, Westside",
    price: "$59.99/month",
    rating: 4.9,
    reviews: 456,
    members: 645,
    amenities: ["Yoga", "Pilates", "Meditation", "Spa"],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Elite Sports Complex",
    location: "321 Elm Street, Uptown",
    price: "$119.99/month",
    rating: 4.7,
    reviews: 523,
    members: 2100,
    amenities: ["All Equipment", "Olympic Pool", "Basketball Court", "Rock Climbing"],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
  },
]

export function BrowseGymsContent() {
  const [search, setSearch] = useState("")

  const filteredGyms = MOCK_GYMS.filter(
    (gym) =>
      gym.name.toLowerCase().includes(search.toLowerCase()) ||
      gym.location.toLowerCase().includes(search.toLowerCase()),
  )

  const handleJoinGym = (gymId: number) => {
    alert(`Successfully joined gym! Membership is now active.`)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Browse Gyms</h1>
        <p className="text-muted-foreground">Find and join a gym near you</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search gyms by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Gyms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredGyms.map((gym) => (
          <Card key={gym.id} className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow">
            {/* Gym Image */}
            <div className="relative h-48 bg-muted overflow-hidden">
              <img
                src={gym.image || "/placeholder.svg"}
                alt={gym.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
              <Badge className="absolute top-4 right-4 bg-primary">
                <Star className="w-3 h-3 mr-1" />
                {gym.rating}
              </Badge>
            </div>

            {/* Gym Info */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{gym.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {gym.location}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 py-3 border-y border-border/30">
                <div className="text-center">
                  <Star className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">{gym.reviews} reviews</p>
                </div>
                <div className="text-center">
                  <Users className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">{gym.members} members</p>
                </div>
                <div className="text-center">
                  <DollarSign className="w-4 h-4 text-green-500 mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">{gym.price}</p>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <p className="text-xs font-medium text-foreground mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {gym.amenities.slice(0, 3).map((amenity, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {gym.amenities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{gym.amenities.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Join Button */}
              <Button onClick={() => handleJoinGym(gym.id)} className="w-full bg-primary hover:bg-primary/90">
                Join This Gym
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredGyms.length === 0 && (
        <Card className="p-12 text-center border-border/50">
          <p className="text-muted-foreground">No gyms found matching your search</p>
        </Card>
      )}
    </div>
  )
}
