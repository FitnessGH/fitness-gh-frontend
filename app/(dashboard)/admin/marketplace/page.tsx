'use client';

import { useAuth } from '@/components/auth-context';
import UsersAPI from '@/lib/api/users';
import { Badge } from '@ui/badge';
import { Card } from '@ui/card';
import { AlertTriangle, Coins, Loader2, ShoppingCart, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MarketplaceStats {
  activeVendors: number;
  totalTransactions: number;
  monthlyRevenue: number;
  openDisputes: number;
}

export default function AdminMarketplacePage() {
  const { isLoading: authLoading } = useAuth();
  const [stats, setStats] = useState<MarketplaceStats>({
    activeVendors: 0,
    totalTransactions: 0,
    monthlyRevenue: 0,
    openDisputes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (authLoading) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch all users to count vendors (EMPLOYEE userType)
        const users = await UsersAPI.getAllUsers();
        const activeVendors = users.filter(
          (u) => u.userType === 'EMPLOYEE' && u.isActive,
        ).length;

        // Marketplace features not yet implemented in backend
        // TODO: Create marketplace API endpoints for:
        // - Products/Orders
        // - Transactions
        // - Disputes
        // - Vendor sales data

        setStats({
          activeVendors,
          totalTransactions: 0, // TODO: Implement when marketplace API is ready
          monthlyRevenue: 0, // TODO: Implement when marketplace API is ready
          openDisputes: 0, // TODO: Implement when disputes system is ready
        });
      } catch (err: any) {
        console.error('Failed to fetch marketplace stats:', err);
        setError(err.message || 'Failed to load marketplace statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [authLoading]);

  if (authLoading || loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            {authLoading ? 'Loading...' : 'Loading marketplace data...'}
          </p>
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
        <h1 className="text-3xl font-bold text-foreground">
          Marketplace Oversight
        </h1>
        <p className="text-muted-foreground">
          Monitor marketplace activity and disputes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Active Vendors',
            value: stats.activeVendors.toLocaleString(),
            icon: ShoppingCart,
          },
          {
            label: 'Total Transactions',
            value: stats.totalTransactions > 0
              ? stats.totalTransactions.toLocaleString()
              : 'N/A',
            icon: TrendingUp,
          },
          {
            label: 'Monthly Revenue',
            value: stats.monthlyRevenue > 0
              ? `GH₵${stats.monthlyRevenue.toLocaleString()}`
              : 'N/A',
            icon: Coins,
          },
          {
            label: 'Open Disputes',
            value: stats.openDisputes > 0
              ? stats.openDisputes.toLocaleString()
              : '0',
            icon: AlertTriangle,
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              key={i}
              className="p-4 border-border/50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-2 text-foreground">
                    {stat.value}
                  </p>
                </div>
                <Icon className="w-5 h-5 text-primary" />
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          Recent Disputes
        </h2>
        <div className="space-y-3">
          {stats.openDisputes === 0 ? (
            <p className="text-muted-foreground text-sm">
              No disputes at this time. Disputes will appear here when reported.
            </p>
          ) : (
            // TODO: Fetch real disputes when disputes API is implemented
            <p className="text-muted-foreground text-sm">
              Disputes system coming soon.
            </p>
          )}
          {/* {[
            {
              id: 'DSP-001',
              vendor: 'Elite Supplements',
              issue: 'Product quality complaint',
              status: 'Open',
            },
            {
              id: 'DSP-002',
              vendor: 'Fit Gear Co',
              issue: 'Shipping delay',
              status: 'In Review',
            },
            {
              id: 'DSP-003',
              vendor: 'ProFit Gear',
              issue: 'Wrong item shipped',
              status: 'Resolved',
            },
          ].map((dispute, i) => (
            <div
              key={i}
              className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-foreground">{dispute.id}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {dispute.vendor}
                  </p>
                  <p className="text-sm text-foreground mt-2">
                    {dispute.issue}
                  </p>
                </div>
                <Badge
                  className={
                    dispute.status === 'Open'
                      ? 'bg-red-100 text-red-700'
                      : dispute.status === 'In Review'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                  }
                >
                  {dispute.status}
                </Badge>
              </div>
            </div>
          ))} */}
        </div>
      </Card>

      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          Top Vendors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.activeVendors === 0 ? (
            <p className="text-muted-foreground text-sm col-span-3">
              No active vendors yet. Vendor sales data will appear here when marketplace transactions are processed.
            </p>
          ) : (
            <p className="text-muted-foreground text-sm col-span-3">
              Vendor sales analytics coming soon. This will show top vendors by sales and orders.
            </p>
          )}
          {/* TODO: Fetch real vendor sales data when marketplace API is implemented
          {[
            { name: 'Elite Supplements', sales: 'GH₵12,450', orders: 234 },
            { name: 'Fit Gear Co', sales: 'GH₵8,920', orders: 156 },
            { name: 'HydroMax', sales: 'GH₵7,340', orders: 128 },
          ].map((vendor, i) => (
            <div
              key={i}
              className="p-4 border border-border rounded-lg"
            >
              <p className="font-semibold text-foreground">{vendor.name}</p>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between">
                  <p className="text-xs text-muted-foreground">Sales</p>
                  <p className="text-sm font-semibold text-primary">
                    {vendor.sales}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-muted-foreground">Orders</p>
                  <p className="text-sm font-semibold text-foreground">
                    {vendor.orders}
                  </p>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </Card>
    </div>
  );
}
