"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, DollarSign, Search, ChevronLeft, ChevronRight, Download, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"

interface PayrollEntry {
  id: string
  employeeName: string
  role: string
  baseSalary: number
  bonus: number
  deductions: number
  netPay: number
  payDate: string
  status: "Paid" | "Pending" | "Processing"
}

const mockPayroll: PayrollEntry[] = [
  {
    id: "PR001",
    employeeName: "John Smith",
    role: "Manager",
    baseSalary: 5416.67,
    bonus: 500,
    deductions: 1200,
    netPay: 4716.67,
    payDate: "2025-01-15",
    status: "Paid",
  },
  {
    id: "PR002",
    employeeName: "Sarah Johnson",
    role: "Personal Trainer",
    baseSalary: 3750,
    bonus: 250,
    deductions: 800,
    netPay: 3200,
    payDate: "2025-01-15",
    status: "Paid",
  },
  {
    id: "PR003",
    employeeName: "Mike Chen",
    role: "Receptionist",
    baseSalary: 2666.67,
    bonus: 100,
    deductions: 600,
    netPay: 2166.67,
    payDate: "2025-01-15",
    status: "Processing",
  },
  {
    id: "PR004",
    employeeName: "Lisa Brown",
    role: "Personal Trainer",
    baseSalary: 3750,
    bonus: 0,
    deductions: 800,
    netPay: 2950,
    payDate: "2025-01-15",
    status: "Pending",
  },
]

export default function PayrollPage() {
  const [payroll, setPayroll] = useState<PayrollEntry[]>(mockPayroll)

  const totalPayroll = payroll.reduce((sum, entry) => sum + entry.netPay, 0)
  const paidAmount = payroll.filter((p) => p.status === "Paid").reduce((sum, p) => sum + p.netPay, 0)
  const pendingAmount = payroll
    .filter((p) => p.status === "Pending" || p.status === "Processing")
    .reduce((sum, p) => sum + p.netPay, 0)

  const handleProcessPayment = (id: string) => {
    setPayroll(payroll.map((p) => (p.id === id ? { ...p, status: "Paid" as const } : p)))
    console.log("[v0] Payment processed for:", id)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Payroll Management</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <span>Payroll</span>
          <span>{">"}</span>
          <span className="text-foreground">Management</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-card border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Payroll</p>
              <p className="text-2xl font-bold text-foreground mt-2">${totalPayroll.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#2c9d9d]/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#2c9d9d]" />
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Already Paid</p>
              <p className="text-2xl font-bold text-green-500 mt-2">${paidAmount.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <div className="w-6 h-6 text-green-500 flex items-center justify-center font-bold">✓</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-yellow-500 mt-2">${pendingAmount.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <div className="w-6 h-6 text-yellow-500 flex items-center justify-center font-bold">!</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-card p-4 rounded-lg">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-0 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search here...."
                className="pl-10 bg-secondary/50 border-none w-full md:w-[300px] rounded-r-none focus-visible:ring-0"
              />
            </div>
            <Button className="rounded-l-none bg-secondary hover:bg-secondary/80 text-foreground border-l border-white/10">Search</Button>
          </div>
        </div>
        <Button className="bg-[#2c9d9d] hover:bg-[#32b0b0] text-white w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Process Payroll
        </Button>
      </div>

      {/* Payroll Table */}
      <div className="bg-card rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1f2937] text-gray-400">
              <tr>
                <th className="py-4 px-6 font-medium">Employee</th>
                <th className="py-4 px-6 font-medium">Role</th>
                <th className="py-4 px-6 font-medium text-right">Base Salary</th>
                <th className="py-4 px-6 font-medium text-right">Bonus</th>
                <th className="py-4 px-6 font-medium text-right">Deductions</th>
                <th className="py-4 px-6 font-medium text-right">Net Pay</th>
                <th className="py-4 px-6 font-medium text-center">Status</th>
                <th className="py-4 px-6 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {payroll.map((entry) => (
                <tr key={entry.id} className="hover:bg-muted/10 transition-colors">
                  <td className="py-4 px-6 font-medium text-foreground">{entry.employeeName}</td>
                  <td className="py-4 px-6 text-muted-foreground">{entry.role}</td>
                  <td className="py-4 px-6 text-right text-muted-foreground">${entry.baseSalary.toFixed(2)}</td>
                  <td className="py-4 px-6 text-right text-green-500 font-medium">+${entry.bonus.toFixed(2)}</td>
                  <td className="py-4 px-6 text-right text-red-500 font-medium">-${entry.deductions.toFixed(2)}</td>
                  <td className="py-4 px-6 text-right font-bold text-foreground">${entry.netPay.toFixed(2)}</td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${entry.status === "Paid"
                        ? "bg-green-100/10 text-green-500"
                        : entry.status === "Processing"
                          ? "bg-blue-100/10 text-blue-500"
                          : "bg-yellow-100/10 text-yellow-500"
                        }`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1.5 hover:bg-muted/10 rounded transition-colors">
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleProcessPayment(entry.id)}
                            disabled={entry.status === "Paid"}
                          >
                            Process Payment
                          </DropdownMenuItem>
                          <DropdownMenuItem>Download Slip</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border/20">
          <p className="text-sm text-muted-foreground">Showing 1-{payroll.length} from {payroll.length}</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 disabled:opacity-50 border-border/20 bg-transparent text-muted-foreground hover:bg-muted/10" disabled>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button size="icon" className="h-8 w-8 bg-[#2c9d9d] hover:bg-[#32b0b0] text-white border-0">1</Button>
            <Button variant="outline" size="icon" className="h-8 w-8 border-border/20 bg-transparent text-muted-foreground hover:bg-muted/10" disabled>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
