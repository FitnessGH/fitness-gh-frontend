"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Package, MapPin, Calendar } from "lucide-react"

interface Order {
  id: string
  orderNumber: string
  customer: string
  items: number
  total: number
  status: "Pending" | "Processing" | "Shipped" | "Delivered"
  orderDate: string
  dueDate: string
  destination: string
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2025-001",
    customer: "FitClub Downtown",
    items: 3,
    total: 245.98,
    status: "Pending",
    orderDate: "2025-01-14",
    dueDate: "2025-01-21",
    destination: "123 Main St, Downtown",
  },
  {
    id: "2",
    orderNumber: "ORD-2025-002",
    customer: "Elite Gym Center",
    items: 2,
    total: 129.99,
    status: "Processing",
    orderDate: "2025-01-13",
    dueDate: "2025-01-20",
    destination: "456 Park Ave, Uptown",
  },
  {
    id: "3",
    orderNumber: "ORD-2025-003",
    customer: "Sarah Johnson",
    items: 1,
    total: 29.99,
    status: "Shipped",
    orderDate: "2025-01-12",
    dueDate: "2025-01-18",
    destination: "789 Oak Rd, Suburb",
  },
  {
    id: "4",
    orderNumber: "ORD-2025-004",
    customer: "Premium Fitness",
    items: 5,
    total: 459.95,
    status: "Delivered",
    orderDate: "2025-01-10",
    dueDate: "2025-01-17",
    destination: "321 Market St, Downtown",
  },
]

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"All" | "Pending" | "Processing" | "Shipped" | "Delivered">("All")
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "All" || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const statusColors: Record<Order["status"], string> = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Pending", value: orders.filter((o) => o.status === "Pending").length, color: "bg-yellow-100" },
          {
            label: "Processing",
            value: orders.filter((o) => o.status === "Processing").length,
            color: "bg-blue-100",
          },
          {
            label: "Shipped",
            value: orders.filter((o) => o.status === "Shipped").length,
            color: "bg-purple-100",
          },
          {
            label: "Delivered",
            value: orders.filter((o) => o.status === "Delivered").length,
            color: "bg-green-100",
          },
        ].map((stat, i) => (
          <Card key={i} className={`p-4 border-0 ${stat.color}`}>
            <p className="text-sm font-medium text-foreground">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 border-border/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label className="text-xs text-muted-foreground mb-2 block">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer or order number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Status</Label>
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as "All" | "Pending" | "Processing" | "Shipped" | "Delivered")
              }
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="border-border/50 overflow-hidden">
            <button
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              className="w-full text-left p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div>
                  <p className="font-semibold text-foreground">{order.orderNumber}</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Items</p>
                  <p className="font-semibold text-foreground">{order.items}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="font-semibold text-primary">${order.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Due</p>
                  <p className="text-sm text-foreground">{order.dueDate}</p>
                </div>
                <div className="flex justify-between items-center">
                  <Badge className={statusColors[order.status]}>{order.status}</Badge>
                </div>
              </div>
            </button>

            {expandedOrder === order.id && (
              <div className="border-t border-border bg-muted/20 p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-xs text-muted-foreground">Order Items</p>
                      <p className="font-semibold text-foreground">{order.items} products</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-xs text-muted-foreground">Order Date</p>
                      <p className="font-semibold text-foreground">{order.orderDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-xs text-muted-foreground">Destination</p>
                      <p className="font-semibold text-foreground">{order.destination}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex gap-2">
                  {["Pending", "Processing", "Shipped", "Delivered"].map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={order.status === status ? "default" : "outline"}
                      className={order.status === status ? "bg-primary hover:bg-primary/90" : "bg-transparent"}
                      onClick={() => handleStatusChange(order.id, status as Order["status"])}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
