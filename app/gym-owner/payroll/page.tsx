"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, DollarSign } from "lucide-react"

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payroll Management</h1>
          <p className="text-muted-foreground">Manage employee salaries, bonuses, and deductions</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Process Payroll</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Payroll</p>
              <p className="text-2xl font-bold text-foreground mt-2">${totalPayroll.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-primary opacity-20" />
          </div>
        </Card>
        <Card className="p-4 border-border/50">
          <div>
            <p className="text-sm text-muted-foreground">Already Paid</p>
            <p className="text-2xl font-bold text-green-600 mt-2">${paidAmount.toFixed(2)}</p>
          </div>
        </Card>
        <Card className="p-4 border-border/50">
          <div>
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-600 mt-2">${pendingAmount.toFixed(2)}</p>
          </div>
        </Card>
      </div>

      <Card className="p-6 border-border/50 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Payroll Summary</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Employee</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Role</th>
              <th className="text-right py-3 px-4 font-semibold text-foreground">Base Salary</th>
              <th className="text-right py-3 px-4 font-semibold text-foreground">Bonus</th>
              <th className="text-right py-3 px-4 font-semibold text-foreground">Deductions</th>
              <th className="text-right py-3 px-4 font-semibold text-foreground">Net Pay</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payroll.map((entry) => (
              <tr key={entry.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-3 px-4">
                  <p className="font-medium text-foreground">{entry.employeeName}</p>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{entry.role}</td>
                <td className="py-3 px-4 text-right">${entry.baseSalary.toFixed(2)}</td>
                <td className="py-3 px-4 text-right text-green-600 font-semibold">+${entry.bonus.toFixed(2)}</td>
                <td className="py-3 px-4 text-right text-red-600 font-semibold">-${entry.deductions.toFixed(2)}</td>
                <td className="py-3 px-4 text-right font-bold text-foreground">${entry.netPay.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      entry.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : entry.status === "Processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {entry.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-muted rounded">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
