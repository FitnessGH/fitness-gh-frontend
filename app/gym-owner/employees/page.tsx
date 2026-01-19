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
  permissions: string[]
}

const AVAILABLE_PERMISSIONS = [
  { id: "view_dashboard", label: "View Dashboard", description: "Access to the main dashboard and analytics" },
  { id: "manage_members", label: "Manage Members", description: "Add, edit, and view member profiles" },
  { id: "manage_employees", label: "Manage Employees", description: "Manage staff roles and permissions" },
  { id: "manage_schedules", label: "Manage Schedules", description: "Create and edit class schedules" },
  { id: "view_financials", label: "View Financials", description: "Access to revenue and payment reports" },
  { id: "gym_settings", label: "Gym Settings", description: "Edit gym information and settings" },
]

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
    permissions: ["view_dashboard", "manage_members", "manage_employees", "manage_schedules", "view_financials", "gym_settings"],
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
    permissions: ["view_dashboard", "manage_schedules"],
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
    permissions: ["view_dashboard", "manage_members"],
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
    permissions: ["view_dashboard", "manage_schedules"],
  },
]

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState<string>("All")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRolesModalOpen, setIsRolesModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [roleEmployee, setRoleEmployee] = useState<Employee | null>(null)
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Personal Trainer",
    salary: "",
    status: "Active" as "Active" | "On Leave" | "Inactive"
  })

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "All" || emp.role === filterRole
    return matchesSearch && matchesRole
  })

  const uniqueRoles = Array.from(new Set(employees.map((e) => e.role)))

  const handleOpenAddModal = () => {
    setEditingEmployee(null)
    setFormData({ name: "", email: "", phone: "", role: "Personal Trainer", salary: "", status: "Active" })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (emp: Employee) => {
    setEditingEmployee(emp)
    setFormData({
      name: emp.name,
      email: emp.email,
      phone: emp.phone,
      role: emp.role,
      salary: emp.salary.toString(),
      status: emp.status
    })
    setIsModalOpen(true)
  }

  const handleSubmitEmployee = () => {
    if (editingEmployee) {
      const updatedEmployees = employees.map((e) =>
        e.id === editingEmployee.id
          ? {
            ...e,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            salary: Number.parseInt(formData.salary) || 0,
            status: formData.status
          }
          : e
      )
      setEmployees(updatedEmployees)
      console.log("[v0] Employee updated:", editingEmployee.id)
    } else {
      const newEmployee: Employee = {
        id: `E${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        hireDate: new Date().toISOString().split("T")[0],
        salary: Number.parseInt(formData.salary) || 0,
        status: "Active",
        permissions: ["view_dashboard"],
      }
      setEmployees([...employees, newEmployee])
      console.log("[v0] Employee added:", newEmployee)
    }
    setIsModalOpen(false)
  }

  const handleOpenRolesModal = (emp: Employee) => {
    setRoleEmployee(emp)
    setIsRolesModalOpen(true)
  }

  const handleTogglePermission = (permissionId: string) => {
    if (!roleEmployee) return

    const hasPermission = roleEmployee.permissions.includes(permissionId)
    const newPermissions = hasPermission
      ? roleEmployee.permissions.filter((p: string) => p !== permissionId)
      : [...roleEmployee.permissions, permissionId]

    const updatedEmployee = { ...roleEmployee, permissions: newPermissions }
    setRoleEmployee(updatedEmployee)

    setEmployees(employees.map(e => e.id === roleEmployee.id ? updatedEmployee : e))
  }

  const handleConfirmDelete = (id: string) => {
    setDeleteEmployeeId(id)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteEmployee = () => {
    if (deleteEmployeeId) {
      setEmployees(employees.filter((e) => e.id !== deleteEmployeeId))
      setIsDeleteModalOpen(false)
      setDeleteEmployeeId(null)
      console.log("[v0] Employee removed:", deleteEmployeeId)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employees</h1>
          <p className="text-muted-foreground">Manage gym staff and assign roles</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={handleOpenAddModal}>
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
                      <DropdownMenuItem onClick={() => handleOpenEditModal(emp)}>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleOpenRolesModal(emp)}>Manage Roles</DropdownMenuItem>
                      <DropdownMenuItem variant="destructive" onClick={() => handleConfirmDelete(emp.id)}>
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

      {/* Add/Edit Employee Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingEmployee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
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
            <div className="grid grid-cols-2 gap-4">
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
              {editingEmployee && (
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              )}
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
              <Button onClick={handleSubmitEmployee} className="bg-primary hover:bg-primary/90">
                {editingEmployee ? "Update Employee" : "Add Employee"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage Roles Modal */}
      <Dialog open={isRolesModalOpen} onOpenChange={setIsRolesModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manage Roles & Permissions</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-4 mb-6 p-4 bg-secondary/30 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                {roleEmployee?.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-foreground">{roleEmployee?.name}</h3>
                <p className="text-sm text-muted-foreground">{roleEmployee?.role} • {roleEmployee?.status}</p>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">Permissions</Label>
              <div className="grid gap-3">
                {AVAILABLE_PERMISSIONS.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => handleTogglePermission(permission.id)}
                  >
                    <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${roleEmployee?.permissions.includes(permission.id)
                      ? "bg-primary border-primary text-white"
                      : "border-muted-foreground/30 bg-background"
                      }`}>
                      {roleEmployee?.permissions.includes(permission.id) && <Plus className="w-3 h-3 rotate-45 scale-150 transition-all" style={{ transform: 'rotate(0deg)' }} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{permission.label}</p>
                      <p className="text-xs text-muted-foreground">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsRolesModalOpen(false)}>
              Close
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsRolesModalOpen(false)}>
              Save Permissions
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to remove <span className="font-bold text-foreground">{employees.find(e => e.id === deleteEmployeeId)?.name}</span>? This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEmployee}>
              Delete Employee
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
