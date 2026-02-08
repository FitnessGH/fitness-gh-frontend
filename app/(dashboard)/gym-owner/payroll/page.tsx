'use client';

import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Column, DataTable } from '@ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Input } from '@ui/input';
import { AlertCircle, Coins, MoreVertical, Plus, Search } from 'lucide-react';
import { useState } from 'react';

interface PayrollEntry {
  id: string;
  employeeName: string;
  role: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netPay: number;
  payDate: string;
  status: 'Paid' | 'Pending' | 'Processing';
}

const mockPayroll: PayrollEntry[] = [
  {
    id: 'PR001',
    employeeName: 'John Smith',
    role: 'Manager',
    baseSalary: 5416.67,
    bonus: 500,
    deductions: 1200,
    netPay: 4716.67,
    payDate: '2025-01-15',
    status: 'Paid',
  },
  {
    id: 'PR002',
    employeeName: 'Sarah Johnson',
    role: 'Personal Trainer',
    baseSalary: 3750.0,
    bonus: 250,
    deductions: 800,
    netPay: 3200,
    payDate: '2025-01-15',
    status: 'Paid',
  },
  {
    id: 'PR003',
    employeeName: 'Mike Chen',
    role: 'Receptionist',
    baseSalary: 2666.67,
    bonus: 100,
    deductions: 600,
    netPay: 2166.67,
    payDate: '2025-01-15',
    status: 'Processing',
  },
  {
    id: 'PR004',
    employeeName: 'Lisa Brown',
    role: 'Personal Trainer',
    baseSalary: 3750.0,
    bonus: 0,
    deductions: 800,
    netPay: 2950,
    payDate: '2025-01-15',
    status: 'Pending',
  },
];

export default function PayrollPage() {
  // TODO: Replace with real API data when payroll API is implemented
  // Payroll API endpoint needs to be created in the backend
  const [payroll, setPayroll] = useState<PayrollEntry[]>(mockPayroll);

  const columns: Column<PayrollEntry>[] = [
    {
      header: 'Employee',
      accessorKey: 'employeeName',
      className: 'font-medium text-foreground',
    },
    {
      header: 'Role',
      accessorKey: 'role',
      className: 'text-muted-foreground',
    },
    {
      header: 'Base Salary',
      headerClassName: 'text-right',
      className: 'text-right text-muted-foreground',
      cell: (entry) => `GH₵${entry.baseSalary.toFixed(2)}`,
    },
    {
      header: 'Bonus',
      headerClassName: 'text-right',
      className: 'text-right text-green-500 font-medium',
      cell: (entry) => `+GH₵${entry.bonus.toFixed(2)}`,
    },
    {
      header: 'Deductions',
      headerClassName: 'text-right',
      className: 'text-right text-red-500 font-medium',
      cell: (entry) => `-GH₵${entry.deductions.toFixed(2)}`,
    },
    {
      header: 'Net Pay',
      headerClassName: 'text-right',
      className: 'text-right font-bold text-foreground',
      cell: (entry) => `GH₵${entry.netPay.toFixed(2)}`,
    },
    {
      header: 'Status',
      headerClassName: 'text-center',
      cell: (entry) => (
        <div className="flex justify-center">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              entry.status === 'Paid'
                ? 'bg-green-100/10 text-green-500'
                : entry.status === 'Processing'
                  ? 'bg-blue-100/10 text-blue-500'
                  : 'bg-yellow-100/10 text-yellow-500'
            }`}
          >
            {entry.status}
          </span>
        </div>
      ),
    },
    {
      header: 'Action',
      headerClassName: 'text-center',
      cell: (entry) => (
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
                disabled={entry.status === 'Paid'}
              >
                Process Payment
              </DropdownMenuItem>
              <DropdownMenuItem>Download Slip</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const totalPayroll = payroll.reduce((sum, entry) => sum + entry.netPay, 0);
  const paidAmount = payroll
    .filter((p) => p.status === 'Paid')
    .reduce((sum, p) => sum + p.netPay, 0);
  const pendingAmount = payroll
    .filter((p) => p.status === 'Pending' || p.status === 'Processing')
    .reduce((sum, p) => sum + p.netPay, 0);

  const handleProcessPayment = (id: string) => {
    setPayroll(
      payroll.map((p) => (p.id === id ? { ...p, status: 'Paid' as const } : p)),
    );
    console.log('[v0] Payment processed for:', id);
  };

  const handleProcessAll = () => {
    setPayroll(
      payroll.map((p) =>
        p.status === 'Pending' || p.status === 'Processing'
          ? { ...p, status: 'Paid' as const }
          : p,
      ),
    );
    console.log('[v0] All pending payroll processed');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Payroll Management
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <span>Payroll</span>
          <span>{'>'}</span>
          <span className="text-foreground">Management</span>
        </div>
      </div>

      <Card className="p-4 border-yellow-500/20 bg-yellow-500/10">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-900 dark:text-yellow-100">
              Payroll API Not Yet Implemented
            </p>
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
              This page is currently using mock data. The payroll API endpoint needs to be created in the backend to enable real payroll management.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-card border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Payroll</p>
              <p className="text-2xl font-bold text-foreground mt-2">
                GH₵${totalPayroll.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#2c9d9d]/10 flex items-center justify-center">
              <Coins className="w-6 h-6 text-[#2c9d9d]" />
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Already Paid</p>
              <p className="text-2xl font-bold text-green-500 mt-2">
                GH₵${paidAmount.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <div className="w-6 h-6 text-green-500 flex items-center justify-center font-bold">
                ✓
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-yellow-500 mt-2">
                GH₵${pendingAmount.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <div className="w-6 h-6 text-yellow-500 flex items-center justify-center font-bold">
                !
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-card p-4 rounded-lg">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-0 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search here...."
                className="pl-10 bg-secondary/50 border-none w-full md:w-75 rounded-r-none focus-visible:ring-0"
              />
            </div>
            <Button className="rounded-l-none bg-secondary hover:bg-secondary/80 text-foreground border-l border-white/10">
              Search
            </Button>
          </div>
        </div>
        <Button
          className="bg-[#2c9d9d] hover:bg-[#32b0b0] text-white w-full md:w-auto"
          onClick={handleProcessAll}
          disabled={!payroll.some((p) => p.status !== 'Paid')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Process Payroll
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={payroll}
        pageSize={10}
        className="bg-card p-4 rounded-lg"
      />
    </div>
  );
}
