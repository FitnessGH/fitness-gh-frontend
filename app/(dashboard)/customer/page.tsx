'use client';

import { useAuth } from '@/components/auth-context';
import { getDashboardPath } from '@/lib/auth';
import SubscriptionsAPI from '@/lib/api/subscriptions';
import { useMembershipStore } from '@/store';
import { Card } from '@ui/card';
import { Calendar, ShoppingBag, Target, Users, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CustomerDashboard() {
  const { user, userData, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const {
    memberships,
    activeMembership,
    isLoading: membershipsLoading,
    error: membershipsError,
    setMemberships,
    setLoading,
    setError,
  } = useMembershipStore();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      router.replace('/');
      return;
    }

    if (user.emailVerified === false) {
      router.replace('/login');
      return;
    }

    // Redirect to correct dashboard if user is not a customer
    if (user.role !== 'customer') {
      router.replace(getDashboardPath(user.role));
      return;
    }
  }, [user, isLoading, isAuthenticated, router]);

  // Fetch memberships (user data is already in auth context)
  useEffect(() => {
    const fetchMemberships = async () => {
      if (!user || user.role !== 'customer') return;

      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      if (!accessToken) {
        setMembershipsLoading(false);
        return;
      }

      try {
        setMembershipsLoading(true);
        const membershipData = await SubscriptionsAPI.getMyMemberships(accessToken);
        setMemberships(membershipData);
      } catch (error: any) {
        console.error('Failed to fetch memberships:', error);
        setMembershipsError(error.message || 'Failed to load memberships');
      } finally {
        setMembershipsLoading(false);
      }
    };

    if (user && user.role === 'customer') {
      fetchMemberships();
    }
  }, [user]);

  if (isLoading || !user || user.role !== 'customer') {
    return null;
  }

  // Get active membership
  const activeMembership = memberships.find(m => m.status === 'ACTIVE');
  const membershipStatus = activeMembership ? 'Active' : 'No Active Membership';
  const membershipExpiry = activeMembership?.endDate 
    ? new Date(activeMembership.endDate)
    : null;
  const daysUntilExpiry = membershipExpiry
    ? Math.ceil((membershipExpiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  // Format account creation date
  const accountCreated = userData?.account?.createdAt
    ? new Date(userData.account.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'N/A';
  
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user.name || 'Member'}!
        </h1>
        <p className="text-muted-foreground">
          Track your progress and stay connected
        </p>
      </div>

      <Card className="p-6 border-border/50 bg-linear-to-r from-primary/10 to-accent/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Membership Status</p>
            <p className="text-2xl font-bold text-primary mt-2">{membershipStatus}</p>
            {activeMembership && (
              <>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeMembership.plan.name}
                </p>
                {daysUntilExpiry !== null && daysUntilExpiry > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {daysUntilExpiry === 1 ? 'Expires tomorrow' : `Expires in ${daysUntilExpiry} days`}
                  </p>
                )}
                {daysUntilExpiry !== null && daysUntilExpiry <= 0 && (
                  <p className="text-sm text-red-500 mt-1">
                    Expired
                  </p>
                )}
              </>
            )}
            {!activeMembership && !membershipsLoading && (
              <p className="text-sm text-muted-foreground mt-1">
                Join a gym to get started
              </p>
            )}
          </div>
          <div className="text-5xl text-primary/20">🏋️</div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Active Memberships',
            value: membershipsLoading ? (
              <Loader2 className="h-5 w-5 animate-spin inline" />
            ) : (
              memberships.filter(m => m.status === 'ACTIVE').length.toString()
            ),
            icon: Calendar,
            color: 'bg-blue-100 text-blue-600',
          },
          {
            label: 'Total Memberships',
            value: membershipsLoading ? (
              <Loader2 className="h-5 w-5 animate-spin inline" />
            ) : (
              memberships.length.toString()
            ),
            icon: Target,
            color: 'bg-orange-100 text-orange-600',
          },
          {
            label: 'Member Since',
            value: isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin inline" />
            ) : (
              accountCreated
            ),
            icon: ShoppingBag,
            color: 'bg-green-100 text-green-600',
          },
          {
            label: 'Email Status',
            value: user.emailVerified !== false ? 'Verified' : 'Unverified',
            icon: Users,
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

      {activeMembership && (
        <Card className="p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Current Membership Details
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Plan:</span>
              <span className="font-medium">{activeMembership.plan.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Price:</span>
              <span className="font-medium">
                {activeMembership.plan.currency || 'GHS'} {activeMembership.plan.price}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Duration:</span>
              <span className="font-medium">
                {activeMembership.plan.duration} {activeMembership.plan.durationUnit.toLowerCase()}
              </span>
            </div>
            {activeMembership.plan.maxVisits && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Visits Used:</span>
                <span className="font-medium">
                  {activeMembership.visitsUsed} / {activeMembership.plan.maxVisits}
                </span>
              </div>
            )}
            {activeMembership.startDate && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Start Date:</span>
                <span className="font-medium">
                  {new Date(activeMembership.startDate).toLocaleDateString()}
                </span>
              </div>
            )}
            {activeMembership.endDate && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">End Date:</span>
                <span className="font-medium">
                  {new Date(activeMembership.endDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {[
              {
                name: 'Yoga Class',
                time: '6:00 PM - 7:00 PM',
                instructor: 'Sarah M.',
              },
              {
                name: 'Strength Training',
                time: '7:30 PM - 8:30 PM',
                instructor: 'Mike K.',
              },
              {
                name: 'Boxing Session',
                time: 'Tomorrow 10:00 AM',
                instructor: 'James L.',
              },
            ].map((event, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30 hover:border-primary/30 cursor-pointer transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{event.name}</p>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
                <button className="text-primary font-medium text-sm hover:text-primary/80">
                  Join
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Diet Tips
          </h2>
          <div className="space-y-3">
            {['Stay hydrated', 'Protein intake', 'Meal timing'].map(
              (tip, i) => (
                <div
                  key={i}
                  className="p-3 bg-accent/10 rounded-lg border border-accent/20"
                >
                  <p className="text-sm font-medium text-foreground">
                    💡 {tip}
                  </p>
                </div>
              ),
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
