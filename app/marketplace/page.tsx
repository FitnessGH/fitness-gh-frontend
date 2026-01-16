"use client"

import { Suspense, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/marketplace/product-card"
import { ShoppingCart as ShoppingCartSheet } from "@/components/marketplace/shopping-cart"
import { Search, ShoppingCart } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

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
  {
    id: "7",
    name: "Dumbbell Set",
    vendor: "Iron Works",
    price: 89.99,
    rating: 4.7,
    reviews: 201,
    image: "🏋️",
    category: "Equipment",
  },
  {
    id: "8",
    name: "Pre-Workout Mix",
    vendor: "Elite Supplements",
    price: 34.99,
    rating: 4.6,
    reviews: 145,
    image: "💪",
    category: "Supplements",
  },
]

function MarketplaceContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const categories = ["All", "Supplements", "Equipment", "Accessories"]

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId)
    if (product) {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === productId)
        if (existing) {
          return prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
        }
        return [...prev, { id: productId, name: product.name, price: product.price, quantity: 1 }]
      })
    }
  }

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">FitHub Marketplace</h1>
              <p className="text-muted-foreground">Discover premium fitness products and supplements</p>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {cartItems.length}
                </div>
              )}
            </button>
          </div>

          {/* Search and Filters */}
          <Card className="p-4 border-border/50 shadow-md">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} onAddToCart={handleAddToCart} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Shopping Cart Sheet */}
      <ShoppingCartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
      />
    </div>
  )
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={null}>
      <MarketplaceContent />
    </Suspense>
  )
}
