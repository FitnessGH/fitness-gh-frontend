"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Download, Eye, DollarSign } from "lucide-react"

interface Payment {
  id: string
  memberName: string
  amount: number
  plan: string
  date: string
  status: "Completed" | "Pending" | "Failed"
  receiptId: string
}

const mockPayments: Payment[] = [
  {
    id: "P001",
    memberName: "Alex Chen",
    amount: 99.99,
    plan: "Premium",
    date: "2025-01-15",
    status: "Completed",
    receiptId: "RCP-2025-001",
  },
  {
    id: "P002",
    memberName: "Maria Garcia",
    amount: 59.99,
    plan: "Standard",
    date: "2025-01-14",
    status: "Completed",
    receiptId: "RCP-2025-002",
  },
  {
    id: "P003",
    memberName: "James Wilson",
    amount: 29.99,
    plan: "Basic",
    date: "2025-01-14",
    status: "Pending",
    receiptId: "RCP-2025-003",
  },
  {
    id: "P004",
    memberName: "Sarah Lee",
    amount: 99.99,
    plan: "Premium",
    date: "2025-01-13",
    status: "Completed",
    receiptId: "RCP-2025-004",
  },
]

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("All")

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.memberName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "All" || payment.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalRevenue = payments.filter((p) => p.status === "Completed").reduce((sum, p) => sum + p.amount, 0)

  const pendingAmount = payments.filter((p) => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Payments & Invoices</h1>
        <p className="text-muted-foreground">Track membership payments and generate receipts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground mt-2">${totalRevenue.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600 opacity-20" />
          </div>
        </Card>
        <Card className="p-4 border-border/50">
          <div>
            <p className="text-sm text-muted-foreground">Pending Payments</p>
            <p className="text-2xl font-bold text-foreground mt-2">${pendingAmount.toFixed(2)}</p>
          </div>
        </Card>
        <Card className="p-4 border-border/50">
          <div>
            <p className="text-sm text-muted-foreground">Total Payments</p>
            <p className="text-2xl font-bold text-foreground mt-2">{payments.length}</p>
          </div>
        </Card>
      </div>

      <Card className="p-4 border-border/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label className="text-xs text-muted-foreground mb-2 block">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by member name..."
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
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option>All</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-border/50 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Member</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Plan</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Receipt ID</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-3 px-4">
                  <p className="font-medium text-foreground">{payment.memberName}</p>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{payment.plan}</td>
                <td className="py-3 px-4">
                  <p className="font-semibold text-foreground">${payment.amount.toFixed(2)}</p>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{payment.date}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                    {payment.receiptId}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      payment.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : payment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2 justify-center">
                    <button className="p-1 hover:bg-muted rounded">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-1 hover:bg-muted rounded">
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
