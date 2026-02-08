'use client';

import { useAuth } from '@/components/auth-context';
import GymsAPI from '@/lib/api/gyms';
import PaymentsAPI, { type Payment as APIPayment } from '@/lib/api/payments';
import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Column, DataTable } from '@ui/data-table';
import { Input } from '@ui/input';
import { Coins, Download, Eye, Loader2, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Payment {
  id: string;
  memberName: string;
  amount: number;
  plan: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  receiptId: string;
}

// Transform API payment to frontend format
function transformPayment(apiPayment: APIPayment): Payment {
  const profile = apiPayment.profile;
  const memberName = profile
    ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || profile.username
    : 'Unknown Member';

  const planName = apiPayment.membership?.plan?.name || 'Unknown Plan';
  const date = apiPayment.paidAt
    ? new Date(apiPayment.paidAt).toISOString().split('T')[0]
    : new Date(apiPayment.createdAt).toISOString().split('T')[0];

  const status =
    apiPayment.status === 'COMPLETED'
      ? 'Completed'
      : apiPayment.status === 'PENDING'
        ? 'Pending'
        : 'Failed';

  return {
    id: apiPayment.id,
    memberName,
    amount: apiPayment.amount,
    plan: planName,
    date,
    status,
    receiptId: apiPayment.reference,
  };
}

export default function PaymentsPage() {
  const { userData } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGymId, setSelectedGymId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Fetch gyms and payments
  useEffect(() => {
    const fetchData = async () => {
      if (!userData?.tokens?.accessToken) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Get user's gyms
        const gymsData = await GymsAPI.getMyGyms(userData.tokens?.accessToken);
        const allGyms = [...gymsData.owned, ...gymsData.employed];

        if (allGyms.length === 0) {
          setError('No gyms found. Please create a gym first.');
          setLoading(false);
          return;
        }

        // Use first gym by default
        const gymId = allGyms[0].id;
        setSelectedGymId(gymId);

        // Fetch payments for the gym
        const apiPayments = await PaymentsAPI.getGymPayments(
          gymId,
          userData.tokens?.accessToken,
        );

        // Transform payments
        const transformedPayments = apiPayments.map(transformPayment);
        setPayments(transformedPayments);
      } catch (err: any) {
        console.error('Failed to fetch payments:', err);
        setError(err.message || 'Failed to load payments');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData]);

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
          GH₵{payment.amount.toFixed(2)}
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

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading payments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-destructive font-medium">Error</p>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
        </div>
      </div>
    );
  }

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
                GH₵{totalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <Coins className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Payments</p>
              <p className="text-2xl font-bold text-foreground mt-2">
                GH₵{pendingAmount.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <div className="text-yellow-500 font-bold text-sm">GH₵</div>
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

      {filteredPayments.length === 0 ? (
        <div className="bg-card p-8 rounded-lg text-center">
          <p className="text-muted-foreground">
            {payments.length === 0
              ? 'No payments found. Payment history will appear here once members make payments.'
              : 'No payments match your search criteria.'}
          </p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredPayments}
          pageSize={10}
          className="bg-card p-4 rounded-lg"
        />
      )}
    </div>
  );
}
