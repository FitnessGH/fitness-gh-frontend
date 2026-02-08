'use client';

import { useAuth } from '@/components/auth-context';
import GymsAPI from '@/lib/api/gyms';
import UsersAPI from '@/lib/api/users';
import { Card } from '@ui/card';
import { AlertCircle, Building2, Loader2, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DashboardStats {
  totalGyms: number;
  totalUsers: number;
  suspendedAccounts: number;
  marketplaceTransactions: number;
}

export default function AdminDashboard() {
  const { isLoading: authLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalGyms: 0,
    totalUsers: 0,
    suspendedAccounts: 0,
    marketplaceTransactions: 0,
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

        // Fetch all gyms
        const gyms = await GymsAPI.getAllGyms();
        const totalGyms = gyms.length;

        // Fetch all users
        const users = await UsersAPI.getAllUsers();
        const totalUsers = users.length;
        const suspendedAccounts = users.filter((u) => !u.isActive).length;

        // Marketplace transactions - for now, we'll set to 0
        // TODO: Create an admin endpoint to get all payments/transactions
        const marketplaceTransactions = 0;

        setStats({
          totalGyms,
          totalUsers,
          suspendedAccounts,
          marketplaceTransactions,
        });
      } catch (err: any) {
        console.error('Failed to fetch dashboard stats:', err);
        setError(err.message || 'Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [authLoading]);

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  if (authLoading || loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            {authLoading ? 'Loading...' : 'Loading dashboard...'}
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
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          System-wide oversight and monitoring
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Gyms',
            value: stats.totalGyms.toLocaleString(),
            icon: Building2,
            color: 'bg-blue-100 text-blue-600',
          },
          {
            label: 'Total Users',
            value: stats.totalUsers.toLocaleString(),
            icon: Users,
            color: 'bg-green-100 text-green-600',
          },
          {
            label: 'Suspended Accounts',
            value: stats.suspendedAccounts.toLocaleString(),
            icon: AlertCircle,
            color: 'bg-red-100 text-red-600',
          },
          {
            label: 'Marketplace Transactions',
            value: stats.marketplaceTransactions > 0
              ? stats.marketplaceTransactions.toLocaleString()
              : 'N/A',
            icon: TrendingUp,
            color: 'bg-purple-100 text-purple-600',
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              key={i}
              className="p-4 border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-2 text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Recent System Activity
          </h2>
          <div className="space-y-4">
            {stats.totalGyms === 0 && stats.totalUsers === 0 ? (
              <p className="text-muted-foreground text-sm">
                No activity to display yet. Activity will appear here as users and gyms are registered.
              </p>
            ) : (
              [
                {
                  action: 'System Statistics',
                  details: `${stats.totalGyms} gyms and ${stats.totalUsers} users registered`,
                  time: 'Just now',
                },
                ...(stats.suspendedAccounts > 0
                  ? [
                      {
                        action: 'Suspended Accounts',
                        details: `${stats.suspendedAccounts} account(s) currently suspended`,
                        time: 'Just now',
                      },
                    ]
                  : []),
              ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {activity.action}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.details}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Admin Actions
          </h2>
          <div className="space-y-2">
            {[
              'Review Disputes',
              'Suspend User',
              'View Logs',
              'System Settings',
            ].map((action, i) => (
              <button
                key={i}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-primary/10 text-primary font-medium transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
