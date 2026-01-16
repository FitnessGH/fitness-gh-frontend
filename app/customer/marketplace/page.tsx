"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Star, Search } from "lucide-react"
import { useState } from "react"

interface Product {
  id: string
  name: string
  vendor: string
  price: number
  rating: number
  reviews: number
  image: string
  category: string
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Whey Protein Powder",
    vendor: "Elite Supplements",
    price: 29.99,
    rating: 4.8,
    reviews: 234,
    image: "🥤",
    category: "Supplements",
  },
  {
    id: "2",
    name: "Yoga Mat",
    vendor: "Fit Gear Co",
    price: 34.99,
    rating: 4.6,
    reviews: 156,
    image: "🧘",
    category: "Equipment",
  },
  {
    id: "3",
    name: "Sports Water Bottle",
    vendor: "HydroMax",
    price: 24.99,
    rating: 4.7,
    reviews: 289,
    image: "💧",
    category: "Accessories",
  },
  {
    id: "4",
    name: "Resistance Bands Set",
    vendor: "Fit Gear Co",
    price: 44.99,
    rating: 4.9,
    reviews: 178,
    image: "🎯",
    category: "Equipment",
  },
  {
    id: "5",
    name: "BCAA Energy Drink",
    vendor: "Elite Supplements",
    price: 19.99,
    rating: 4.5,
    reviews: 112,
    image: "🥗",
    category: "Supplements",
  },
  {
    id: "6",
    name: "Gym Towel Set",
    vendor: "ProFit Gear",
    price: 39.99,
    rating: 4.4,
    reviews: 98,
    image: "🧴",
    category: "Accessories",
  },
]

export default function CustomerMarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState<string[]>([])

  const categories = ["All", "Supplements", "Equipment", "Accessories"]

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = (productId: string) => {
    setCart([...cart, productId])
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
          <p className="text-muted-foreground">Shop fitness products and supplements</p>
        </div>
        <div className="relative">
          <ShoppingCart className="w-5 h-5 text-primary absolute right-3 top-3" />
          {cart.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {cart.length}
            </div>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 border-border/50">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="border-border/50 overflow-hidden hover:border-primary/50 transition-colors">
            <div className="p-4 pb-3 bg-muted/30">
              <div className="text-4xl text-center">{product.image}</div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <p className="font-semibold text-foreground text-sm">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.vendor}</p>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => handleAddToCart(product.id)}
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
