"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreVertical, Mail, Phone, Briefcase } from "lucide-react"
import Link from "next/link"

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  role: string
  hireDate: string
  salary: number
  status: "Active" | "On Leave" | "Inactive"
}

const mockEmployees: Employee[] = [
  {
    id: "E001",
    name: "John Smith",
    email: "john@fitclub.com",
    phone: "(555) 123-4567",
    role: "Manager",
    hireDate: "2023-01-15",
    salary: 65000,
    status: "Active",
  },
  {
    id: "E002",
    name: "Sarah Johnson",
    email: "sarah@fitclub.com",
    phone: "(555) 234-5678",
    role: "Personal Trainer",
    hireDate: "2023-06-20",
    salary: 45000,
    status: "Active",
  },
  {
    id: "E003",
    name: "Mike Chen",
    email: "mike@fitclub.com",
    phone: "(555) 345-6789",
    role: "Receptionist",
    hireDate: "2023-12-10",
    salary: 32000,
    status: "Active",
  },
  {
    id: "E004",
    name: "Lisa Brown",
    email: "lisa@fitclub.com",
    phone: "(555) 456-7890",
    role: "Personal Trainer",
    hireDate: "2024-03-05",
    salary: 45000,
    status: "On Leave",
  },
]

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState<string>("All")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", role: "Personal Trainer", salary: "" })

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "All" || emp.role === filterRole
    return matchesSearch && matchesRole
  })

  const uniqueRoles = Array.from(new Set(employees.map((e) => e.role)))

  const handleAddEmployee = () => {
    const newEmployee: Employee = {
      id: `E${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      hireDate: new Date().toISOString().split("T")[0],
      salary: Number.parseInt(formData.salary) || 0,
      status: "Active",
    }
    setEmployees([...employees, newEmployee])
    setFormData({ name: "", email: "", phone: "", role: "Personal Trainer", salary: "" })
    setIsModalOpen(false)
    console.log("[v0] Employee added:", newEmployee)
  }

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter((e) => e.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employees</h1>
          <p className="text-muted-foreground">Manage gym staff and assign roles</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      <Card className="p-4 border-border/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label className="text-xs text-muted-foreground mb-2 block">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Role</Label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option>All</option>
              {uniqueRoles.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-border/50 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Contact</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Role</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Hire Date</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Salary</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-3 px-4">
                  <p className="font-medium text-foreground">{emp.name}</p>
                </td>
                <td className="py-3 px-4">
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      {emp.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      {emp.phone}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3 h-3 text-primary" />
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">{emp.role}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{emp.hireDate}</td>
                <td className="py-3 px-4 font-semibold text-foreground">${emp.salary.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${emp.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : emp.status === "On Leave"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {emp.status}
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
                      <DropdownMenuItem asChild>
                        <Link href={`/gym-owner/employees/${emp.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem>Manage Roles</DropdownMenuItem>
                      <DropdownMenuItem variant="destructive" onClick={() => handleDeleteEmployee(emp.id)}>
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Add Employee Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="email@fitclub.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option>Manager</option>
                <option>Personal Trainer</option>
                <option>Group Fitness Instructor</option>
                <option>Receptionist</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Annual Salary</label>
              <Input
                type="number"
                placeholder="45000"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEmployee} className="bg-primary hover:bg-primary/90">
                Add Employee
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
