'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Column, DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { DollarSign, Download, Eye, Search } from 'lucide-react';
import { useState } from 'react';

interface Payment {
  id: string;
  memberName: string;
  amount: number;
  plan: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  receiptId: string;
}

const mockPayments: Payment[] = [
  {
    id: 'P001',
    memberName: 'Alex Chen',
    amount: 99.99,
    plan: 'Premium',
    date: '2025-01-15',
    status: 'Completed',
    receiptId: 'RCP-2025-001',
  },
  {
    id: 'P002',
    memberName: 'Maria Garcia',
    amount: 59.99,
    plan: 'Standard',
    date: '2025-01-14',
    status: 'Completed',
    receiptId: 'RCP-2025-002',
  },
  {
    id: 'P003',
    memberName: 'James Wilson',
    amount: 29.99,
    plan: 'Basic',
    date: '2025-01-14',
    status: 'Pending',
    receiptId: 'RCP-2025-003',
  },
  {
    id: 'P004',
    memberName: 'Sarah Lee',
    amount: 99.99,
    plan: 'Premium',
    date: '2025-01-13',
    status: 'Completed',
    receiptId: 'RCP-2025-004',
  },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const columns: Column<Payment>[] = [
    {
      header: 'Member',
      accessorKey: 'memberName',
      className: 'font-medium text-foreground',
    },
    {
      header: 'Plan',
      accessorKey: 'plan',
      className: 'text-muted-foreground',
    },
    {
      header: 'Amount',
      cell: (payment) => (
        <span className="text-foreground font-semibold">
          ${payment.amount.toFixed(2)}
        </span>
      ),
    },
    {
      header: 'Date',
      accessorKey: 'date',
      className: 'text-muted-foreground',
    },
    {
      header: 'Receipt ID',
      cell: (payment) => (
        <span className="text-[#2c9d9d] font-medium">{payment.receiptId}</span>
      ),
    },
    {
      header: 'Status',
      cell: (payment) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            payment.status === 'Completed'
              ? 'bg-green-100/10 text-green-500'
              : payment.status === 'Pending'
                ? 'bg-yellow-100/10 text-yellow-500'
                : 'bg-red-100/10 text-red-500'
          }`}
        >
          {payment.status}
        </span>
      ),
    },
    {
      header: 'Action',
      headerClassName: 'text-center',
      cell: () => (
        <div className="flex items-center justify-center gap-2">
          <button className="p-1.5 text-green-500 border border-green-500/20 rounded hover:bg-green-500/10 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-[#2c9d9d] border border-[#2c9d9d]/20 rounded hover:bg-[#2c9d9d]/10 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.memberName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'All' || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = payments
    .filter((p) => p.status === 'Completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter((p) => p.status === 'Pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Payments & Invoices
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <span>Payments</span>
          <span>{'>'}</span>
          <span className="text-foreground">History</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-card border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground mt-2">
                ${totalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Payments</p>
              <p className="text-2xl font-bold text-foreground mt-2">
                ${pendingAmount.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <div className="w-6 h-6 text-yellow-500 flex items-center justify-center font-bold font-serif">
                $
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Payments</p>
              <p className="text-2xl font-bold text-foreground mt-2">
                {payments.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#2c9d9d]/10 flex items-center justify-center">
              <Download className="w-6 h-6 text-[#2c9d9d]" />
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full h-10 px-3 py-2 bg-secondary/50 border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2c9d9d]"
            >
              <option>All</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>
        </div>
        <Button className="bg-[#2c9d9d] hover:bg-[#32b0b0] text-white w-full md:w-auto">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredPayments}
        pageSize={10}
        className="bg-card p-4 rounded-lg"
      />
    </div>
  );
}
