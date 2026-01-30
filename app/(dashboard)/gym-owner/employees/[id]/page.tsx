'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Column, DataTable } from '@/components/ui/data-table';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ArrowLeft,
  Award,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  MoreVertical,
  Pencil,
  Phone,
  Star,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CHART_DATA = Array.from({ length: 24 }, (_, i) => ({
  date: `${i} Jan`,
  value:
    Math.floor(Math.random() * 3) +
    1 +
    (i > 5 && i < 15 ? 1 : 0) +
    (i === 6 ? 1.5 : 0),
}));

const SCHEDULE_DATA = [
  {
    day: 'Thu, 2 Jan',
    time: '08:00 AM',
    title: 'Chest Day',
    participants: 16,
    duration: '40 Minutes',
  },
  {
    day: 'Thu, 2 Jan',
    time: '08:00 AM',
    title: 'Shoulder Day',
    participants: 16,
    duration: '40 Minutes',
  },
  {
    day: 'Thu, 2 Jan',
    time: '08:00 AM',
    title: 'Core Stability',
    participants: 16,
    duration: '40 Minutes',
  },
  {
    day: 'Thu, 2 Jan',
    time: '08:00 AM',
    title: 'Full Body',
    participants: 16,
    duration: '40 Minutes',
  },
  {
    day: 'Thu, 2 Jan',
    time: '08:00 AM',
    title: 'Advance Day',
    participants: 16,
    duration: '40 Minutes',
  },
];

interface PayrollEntry {
  id: string;
  payDate: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netPay: number;
  status: 'Paid' | 'Processing' | 'Pending';
}

const PAYROLL_HISTORY: PayrollEntry[] = [
  {
    id: 'P001',
    payDate: '31 Dec 2024',
    baseSalary: 5416.67,
    bonus: 500,
    deductions: 200,
    netPay: 5716.67,
    status: 'Paid',
  },
  {
    id: 'P002',
    payDate: '30 Nov 2024',
    baseSalary: 5416.67,
    bonus: 300,
    deductions: 150,
    netPay: 5566.67,
    status: 'Paid',
  },
  {
    id: 'P003',
    payDate: '31 Oct 2024',
    baseSalary: 5416.67,
    bonus: 400,
    deductions: 200,
    netPay: 5616.67,
    status: 'Paid',
  },
  {
    id: 'P004',
    payDate: '30 Sep 2024',
    baseSalary: 5416.67,
    bonus: 200,
    deductions: 150,
    netPay: 5466.67,
    status: 'Paid',
  },
  {
    id: 'P005',
    payDate: '31 Aug 2024',
    baseSalary: 5416.67,
    bonus: 450,
    deductions: 200,
    netPay: 5666.67,
    status: 'Paid',
  },
];

export default function TrainerDetailsPage() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [trainer, setTrainer] = useState({
    name: 'Brooklyn Simmons',
    role: 'Strength Coach',
    email: 'brooklyn.s@fitclub.com',
    phone: '+1 (555) 123-4567',
    address: '4517 Washington Ave. Manchester, Kentucky 39495',
    experience: '5 yrs',
    members: '150+',
    rating: '4.9/5',
  });
  const [editData, setEditData] = useState({ ...trainer });

  const router = useRouter();

  const payrollColumns: Column<PayrollEntry>[] = [
    {
      header: 'Pay Date',
      accessorKey: 'payDate',
      className: 'text-muted-foreground',
    },
    {
      header: 'Base Salary',
      headerClassName: 'text-right',
      className: 'text-right text-muted-foreground',
      cell: (entry) => `$${entry.baseSalary.toFixed(2)}`,
    },
    {
      header: 'Bonus',
      headerClassName: 'text-right',
      className: 'text-right text-green-500 font-medium',
      cell: (entry) => `+$${entry.bonus.toFixed(2)}`,
    },
    {
      header: 'Deductions',
      headerClassName: 'text-right',
      className: 'text-right text-red-500 font-medium',
      cell: (entry) => `-$${entry.deductions.toFixed(2)}`,
    },
    {
      header: 'Net Pay',
      headerClassName: 'text-right',
      className: 'text-right font-bold text-foreground',
      cell: (entry) => `$${entry.netPay.toFixed(2)}`,
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
  ];

  const handleSave = () => {
    setTrainer(editData);
    setIsEditOpen(false);
  };

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="w-fit h-8 px-2 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Trainer Details
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <span>Trainer List</span>
              <span>{'>'}</span>
              <span className="text-foreground">Trainer Details</span>
            </div>
          </div>

          <Dialog
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-[#2c9d9d] hover:bg-[#32b0b0] text-white">
                <Pencil className="w-4 h-4 mr-2" />
                Edit Record
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25 bg-card border-border">
              <DialogHeader>
                <DialogTitle>Edit Employee Record</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="name"
                    className="text-right"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="col-span-3 bg-secondary/50 focus-visible:ring-1 focus-visible:ring-[#22c55e]"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="role"
                    className="text-right"
                  >
                    Role
                  </Label>
                  <Input
                    id="role"
                    value={editData.role}
                    onChange={(e) =>
                      setEditData({ ...editData, role: e.target.value })
                    }
                    className="col-span-3 bg-secondary/50 focus-visible:ring-1 focus-visible:ring-[#22c55e]"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="email"
                    className="text-right"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    className="col-span-3 bg-secondary/50 focus-visible:ring-1 focus-visible:ring-[#22c55e]"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="phone"
                    className="text-right"
                  >
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                    className="col-span-3 bg-secondary/50 focus-visible:ring-1 focus-visible:ring-[#22c55e]"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="address"
                    className="text-right"
                  >
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={editData.address}
                    onChange={(e) =>
                      setEditData({ ...editData, address: e.target.value })
                    }
                    className="col-span-3 bg-secondary/50 focus-visible:ring-1 focus-visible:ring-[#22c55e]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-[#22c55e] hover:bg-[#22c55e]/90 text-white border-0"
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border text-center relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-muted-foreground"
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full border-2 border-primary p-1">
                  <Avatar className="w-full h-full">
                    <AvatarImage src="https://i.pravatar.cc/300?u=brooklyn" />
                    <AvatarFallback>
                      {trainer.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground">
                {trainer.name}
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                {trainer.role}
              </p>

              <div className="grid grid-cols-3 gap-4 w-full border-t border-border pt-6">
                <div>
                  <p className="text-lg font-bold text-foreground">
                    {trainer.experience}
                  </p>
                  <p className="text-xs text-muted-foreground">Experience</p>
                </div>
                <div className="border-l border-r border-border px-2">
                  <p className="text-lg font-bold text-foreground">
                    {trainer.members}
                  </p>
                  <p className="text-xs text-muted-foreground">Member</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground flex items-center justify-center gap-1">
                    {trainer.rating}{' '}
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  </p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="tex-lg font-semibold text-foreground">Contact</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="bg-secondary/50 p-2.5 rounded-lg text-muted-foreground">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground truncate">
                    {trainer.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-secondary/50 p-2.5 rounded-lg text-muted-foreground">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium text-foreground">
                    {trainer.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-secondary/50 p-2.5 rounded-lg text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="text-sm font-medium text-foreground max-w-50">
                    {trainer.address}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="tex-lg font-semibold text-foreground">
                Certifications
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {[
                {
                  name: 'NASM - National Academy of Sports Medicine',
                  year: '2018',
                },
                { name: 'ACE - American Council on Exercise', year: '2017' },
                {
                  name: 'ISSA - International Sports Sciences Association',
                  year: '2018',
                },
              ].map((cert, i) => (
                <div
                  key={i}
                  className="flex gap-4"
                >
                  <div className="bg-secondary/50 p-2 rounded-lg text-muted-foreground h-fit">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground leading-snug">
                      {cert.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {cert.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-card border-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                Training Activity
              </h3>
              <Button
                variant="outline"
                size="sm"
                className="bg-[#2c9d9d] hover:bg-[#32b0b0] text-white border-0 text-xs"
              >
                1-12 January 2025 ▼
              </Button>
            </div>
            <div className="h-75 w-full">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient
                      id="colorValue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#22c55e"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="#22c55e"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    stroke="#333"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      borderColor: '#374151',
                      color: '#fff',
                    }}
                    cursor={{ stroke: '#2c9d9d', strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#22c55e"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Card className="md:col-span-2 p-6 bg-card border-border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-foreground">January</h3>
                <div className="flex gap-2">
                  <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-xs mb-2 text-muted-foreground">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const isSelected = [2, 9, 13, 23, 11, 19, 24].includes(day);
                  return (
                    <div
                      key={day}
                      className={`aspect-square flex items-center justify-center rounded-full text-xs
                         ${isSelected ? 'bg-[#2c9d9d] text-white' : 'text-muted-foreground hover:bg-muted'}
                       `}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="md:col-span-3 p-6 bg-card border-border flex flex-col">
              <div className="mb-6 flex justify-between items-center">
                <h3 className="font-semibold text-foreground text-lg">
                  Brooklyn's Schedule
                </h3>
                <div className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full font-medium">
                  {SCHEDULE_DATA.length} Sessions Today
                </div>
              </div>
              <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {SCHEDULE_DATA.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#0a2a2b]/40 border border-border/30 group hover:border-primary/30 hover:bg-[#0a2a2b]/60 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center justify-center min-w-20 py-1 border-r border-border/30">
                      <p className="text-xs font-bold text-primary uppercase tracking-wider">
                        {item.day.split(',')[0]}
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {item.time}
                      </p>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Users className="w-3.5 h-3.5 text-primary/70" />
                          <span>{item.participants} Participants</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-border" />
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span className="text-primary/70">⏱</span>
                          <span>{item.duration}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Details
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-card border-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                Payroll History
              </h3>
              <Button
                variant="outline"
                size="sm"
                className="bg-[#2c9d9d] hover:bg-[#32b0b0] text-white border-0"
              >
                Download All
              </Button>
            </div>
            <DataTable
              columns={payrollColumns}
              data={PAYROLL_HISTORY}
              pageSize={3}
              className="bg-secondary/10 rounded-lg overflow-hidden"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
