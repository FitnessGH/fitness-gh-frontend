'use client';

import { Button } from '@/components/ui/button';
import { Column, DataTable } from '@/components/ui/data-table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Briefcase,
  DollarSign,
  Eye,
  Mail,
  MoreVertical,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash,
} from 'lucide-react';
import { useState } from 'react';

import Link from 'next/link';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  hireDate: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Inactive';
  permissions: string[];
}

const AVAILABLE_PERMISSIONS = [
  {
    id: 'view_dashboard',
    label: 'View Dashboard',
    description: 'Access to the main dashboard and analytics',
  },
  {
    id: 'manage_members',
    label: 'Manage Members',
    description: 'Add, edit, and view member profiles',
  },
  {
    id: 'manage_employees',
    label: 'Manage Employees',
    description: 'Manage staff roles and permissions',
  },
  {
    id: 'manage_schedules',
    label: 'Manage Schedules',
    description: 'Create and edit class schedules',
  },
  {
    id: 'view_financials',
    label: 'View Financials',
    description: 'Access to revenue and payment reports',
  },
  {
    id: 'gym_settings',
    label: 'Gym Settings',
    description: 'Edit gym information and settings',
  },
];

const mockEmployees: Employee[] = [
  {
    id: 'E001',
    name: 'John Smith',
    email: 'john@fitclub.com',
    phone: '(555) 123-4567',
    role: 'Manager',
    hireDate: '2023-01-15',
    salary: 65000,
    status: 'Active',
    permissions: [
      'view_dashboard',
      'manage_members',
      'manage_employees',
      'manage_schedules',
      'view_financials',
      'gym_settings',
    ],
  },
  {
    id: 'E002',
    name: 'Sarah Johnson',
    email: 'sarah@fitclub.com',
    phone: '(555) 234-5678',
    role: 'Personal Trainer',
    hireDate: '2023-06-20',
    salary: 45000,
    status: 'Active',
    permissions: ['view_dashboard', 'manage_schedules'],
  },
  {
    id: 'E003',
    name: 'Mike Chen',
    email: 'mike@fitclub.com',
    phone: '(555) 345-6789',
    role: 'Receptionist',
    hireDate: '2023-12-10',
    salary: 32000,
    status: 'Active',
    permissions: ['view_dashboard', 'manage_members'],
  },
  {
    id: 'E004',
    name: 'Lisa Brown',
    email: 'lisa@fitclub.com',
    phone: '(555) 456-7890',
    role: 'Personal Trainer',
    hireDate: '2024-03-05',
    salary: 45000,
    status: 'On Leave',
    permissions: ['view_dashboard', 'manage_schedules'],
  },
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRolesModalOpen, setIsRolesModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [roleEmployee, setRoleEmployee] = useState<Employee | null>(null);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Personal Trainer',
    salary: '',
    status: 'Active' as 'Active' | 'On Leave' | 'Inactive',
  });

  const columns: Column<Employee>[] = [
    {
      header: 'Name',
      cell: (emp) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center text-secondary-foreground font-bold text-xs">
            {emp.name.slice(0, 2).toUpperCase()}
          </div>
          <p className="font-medium text-foreground">{emp.name}</p>
        </div>
      ),
    },
    {
      header: 'Contact',
      cell: (emp) => (
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
      ),
    },
    {
      header: 'Role',
      cell: (emp) => (
        <div className="flex items-center gap-2">
          <Briefcase className="w-3 h-3 text-[#2c9d9d]" />
          <span className="text-muted-foreground">{emp.role}</span>
        </div>
      ),
    },
    {
      header: 'Hire Date',
      accessorKey: 'hireDate',
      className: 'text-muted-foreground',
    },
    {
      header: 'Salary',
      headerClassName: 'text-right',
      className: 'text-right font-semibold text-foreground',
      cell: (emp) => `$${emp.salary.toLocaleString()}`,
    },
    {
      header: 'Status',
      headerClassName: 'text-center',
      className: 'text-center',
      cell: (emp) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            emp.status === 'Active'
              ? 'bg-green-100/10 text-green-500'
              : emp.status === 'On Leave'
                ? 'bg-yellow-100/10 text-yellow-500'
                : 'bg-gray-100/10 text-gray-500'
          }`}
        >
          {emp.status}
        </span>
      ),
    },
    {
      header: 'Action',
      headerClassName: 'text-center',
      cell: (emp) => (
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 hover:bg-muted/10 rounded transition-colors focus:outline-none">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40"
            >
              <DropdownMenuItem asChild>
                <Link
                  href={`/gym-owner/employees/${emp.id}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-green-500" />
                  <span>View Details</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleOpenEditModal(emp)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Pencil className="w-4 h-4 text-yellow-500" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleOpenRolesModal(emp)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-purple-500" />
                <span>Manage Roles</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/gym-owner/payroll"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <DollarSign className="w-4 h-4 text-[#2c9d9d]" />
                  <span>View Payroll</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleConfirmDelete(emp.id)}
                className="flex items-center gap-2 cursor-pointer text-red-500 focus:text-red-500"
              >
                <Trash className="w-4 h-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || emp.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const uniqueRoles = Array.from(new Set(employees.map((e) => e.role)));

  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Personal Trainer',
      salary: '',
      status: 'Active',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (emp: Employee) => {
    setEditingEmployee(emp);
    setFormData({
      name: emp.name,
      email: emp.email,
      phone: emp.phone,
      role: emp.role,
      salary: emp.salary.toString(),
      status: emp.status,
    });
    setIsModalOpen(true);
  };

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
              status: formData.status,
            }
          : e,
      );
      setEmployees(updatedEmployees);
      console.log('[v0] Employee updated:', editingEmployee.id);
    } else {
      const newEmployee: Employee = {
        id: `E${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        hireDate: new Date().toISOString().split('T')[0],
        salary: Number.parseInt(formData.salary) || 0,
        status: 'Active',
        permissions: ['view_dashboard'],
      };
      setEmployees([...employees, newEmployee]);
      console.log('[v0] Employee added:', newEmployee);
    }
    setIsModalOpen(false);
  };

  const handleOpenRolesModal = (emp: Employee) => {
    setRoleEmployee(emp);
    setIsRolesModalOpen(true);
  };

  const handleTogglePermission = (permissionId: string) => {
    if (!roleEmployee) return;

    const hasPermission = roleEmployee.permissions.includes(permissionId);
    const newPermissions = hasPermission
      ? roleEmployee.permissions.filter((p: string) => p !== permissionId)
      : [...roleEmployee.permissions, permissionId];

    const updatedEmployee = { ...roleEmployee, permissions: newPermissions };
    setRoleEmployee(updatedEmployee);

    setEmployees(
      employees.map((e) => (e.id === roleEmployee.id ? updatedEmployee : e)),
    );
  };

  const handleConfirmDelete = (id: string) => {
    setDeleteEmployeeId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteEmployee = () => {
    if (deleteEmployeeId) {
      setEmployees(employees.filter((e) => e.id !== deleteEmployeeId));
      setIsDeleteModalOpen(false);
      setDeleteEmployeeId(null);
      console.log('[v0] Employee removed:', deleteEmployeeId);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Employees</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <span>Employee</span>
          <span>{'>'}</span>
          <span className="text-foreground">Employee List</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-card p-4 rounded-lg">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-0 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search here...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary/50 border-none w-full md:w-75 rounded-r-none focus-visible:ring-0"
              />
            </div>
            <Button className="rounded-l-none bg-secondary hover:bg-secondary/80 text-foreground border-l border-white/10">
              Search
            </Button>
          </div>
          <div className="w-full md:w-auto">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full h-10 px-3 py-2 bg-secondary/50 border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2c9d9d]"
            >
              <option>All</option>
              {uniqueRoles.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>
        <Button
          className="bg-[#2c9d9d] hover:bg-[#32b0b0] text-white w-full md:w-auto"
          onClick={handleOpenAddModal}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredEmployees}
        pageSize={10}
        className="bg-card p-4 rounded-lg"
      />

      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="email@fitclub.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as any,
                      })
                    }
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
                onChange={(e) =>
                  setFormData({ ...formData, salary: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitEmployee}
                className="bg-primary hover:bg-primary/90"
              >
                {editingEmployee ? 'Update Employee' : 'Add Employee'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isRolesModalOpen}
        onOpenChange={setIsRolesModalOpen}
      >
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>Manage Roles & Permissions</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-4 mb-6 p-4 bg-secondary/30 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                {roleEmployee?.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-foreground">
                  {roleEmployee?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {roleEmployee?.role} • {roleEmployee?.status}
                </p>
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
                    <div
                      className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        roleEmployee?.permissions.includes(permission.id)
                          ? 'bg-primary border-primary text-white'
                          : 'border-muted-foreground/30 bg-background'
                      }`}
                    >
                      {roleEmployee?.permissions.includes(permission.id) && (
                        <Plus
                          className="w-3 h-3 rotate-45 scale-150 transition-all"
                          style={{ transform: 'rotate(0deg)' }}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {permission.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsRolesModalOpen(false)}
            >
              Close
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => setIsRolesModalOpen(false)}
            >
              Save Permissions
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      >
        <DialogContent className="sm:max-w-100">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to remove{' '}
              <span className="font-bold text-foreground">
                {employees.find((e) => e.id === deleteEmployeeId)?.name}
              </span>
              ? This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteEmployee}
            >
              Delete Employee
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
