'use client';

import { useAuth } from '@/components/auth-context';
import GymsAPI, { type GymWithOwner as ApiGymWithOwner } from '@/lib/api/gyms';
import SubscriptionsAPI from '@/lib/api/subscriptions';
import { tokenStorage } from '@/lib/utils/token-storage';
import { Badge } from '@ui/badge';
import { Card } from '@ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Loader2, MapPin, MoreVertical, Search, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Gym {
  id: string;
  name: string;
  location: string;
  owner: string;
  members: number;
  status: 'Active' | 'Suspended' | 'Pending';
  joinDate: string;
}

// Transform API gym to frontend format
function transformGym(apiGym: ApiGymWithOwner, memberCount: number = 0): Gym {
  // Build location string from address components
  const locationParts = [
    apiGym.address,
    apiGym.city,
    apiGym.region,
    apiGym.country,
  ].filter(Boolean);
  const location = locationParts.join(', ') || 'Location not specified';

  // Map isActive to status
  // Note: We don't have "Pending" status in the API, so we'll use isActive
  const status: 'Active' | 'Suspended' | 'Pending' = apiGym.isActive
    ? 'Active'
    : 'Suspended';

  // Format join date
  const joinDate = apiGym.createdAt
    ? new Date(apiGym.createdAt).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  // Build owner name from owner info
  let ownerName = 'Unknown Owner';
  if (apiGym.owner) {
    const { firstName, lastName, username } = apiGym.owner;
    if (firstName || lastName) {
      ownerName = `${firstName || ''} ${lastName || ''}`.trim();
    } else if (username) {
      ownerName = username;
    }
  }

  return {
    id: apiGym.id,
    name: apiGym.name,
    location,
    owner: ownerName,
    members: memberCount,
    status,
    joinDate,
  };
}

export default function AdminGymsPage() {
  const { isLoading: authLoading } = useAuth();
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<
    'All' | 'Active' | 'Suspended' | 'Pending'
  >('All');

  // Fetch gyms from API with owner info and member counts
  useEffect(() => {
    const fetchGyms = async () => {
      // Wait for auth context to finish loading
      if (authLoading) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const token = tokenStorage.getAccessToken();
        if (!token) {
          setError('Not authenticated');
          setLoading(false);
          return;
        }

        // Fetch gyms with owner info
        const apiGyms = (await GymsAPI.getAllGyms(true)) as ApiGymWithOwner[];

        // Fetch member counts for each gym
        const gymsWithMembers = await Promise.all(
          apiGyms.map(async (gym) => {
            try {
              const memberships = await SubscriptionsAPI.getGymMemberships(
                gym.id,
                token,
              );
              // Count active memberships
              const activeMembers = memberships.filter(
                (m) => m.status === 'ACTIVE',
              ).length;
              return { gym, memberCount: activeMembers };
            } catch (err) {
              console.error(`Failed to fetch members for gym ${gym.id}:`, err);
              return { gym, memberCount: 0 };
            }
          }),
        );

        const transformedGyms = gymsWithMembers.map(({ gym, memberCount }) =>
          transformGym(gym, memberCount),
        );
        setGyms(transformedGyms);
      } catch (err: any) {
        console.error('Failed to fetch gyms:', err);
        setError(err.message || 'Failed to load gyms');
      } finally {
        setLoading(false);
      }
    };

    fetchGyms();
  }, [authLoading]);

  const filteredGyms = gyms.filter((gym) => {
    const matchesSearch =
      gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gym.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || gym.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSuspendGym = async (id: string) => {
    // TODO: Implement suspend/activate via API
    // For now, just update local state
    setGyms(
      gyms.map((g) =>
        g.id === id
          ? { ...g, status: g.status === 'Suspended' ? 'Active' : 'Suspended' }
          : g,
      ),
    );
    console.log('Gym status updated:', id);
  };

  const statusBadgeColor: Record<Gym['status'], string> = {
    Active: 'bg-green-100 text-green-700',
    Suspended: 'bg-red-100 text-red-700',
    Pending: 'bg-yellow-100 text-yellow-700',
  };

  if (authLoading || loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            {authLoading ? 'Loading...' : 'Loading gyms...'}
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
        <h1 className="text-3xl font-bold text-foreground">Manage Gyms</h1>
        <p className="text-muted-foreground">
          Monitor all gym accounts and activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Gyms', value: gyms.length },
          {
            label: 'Active',
            value: gyms.filter((g) => g.status === 'Active').length,
          },
          {
            label: 'Suspended',
            value: gyms.filter((g) => g.status === 'Suspended').length,
          },
          {
            label: 'Total Members',
            value: gyms.reduce((sum, g) => sum + g.members, 0),
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className="p-4 border-border/50"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold mt-2 text-foreground">
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      <Card className="p-4 border-border/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label className="text-xs text-muted-foreground mb-2 block">
              Search
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by gym name or owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Status
            </Label>
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(
                  e.target.value as 'All' | 'Active' | 'Suspended' | 'Pending',
                )
              }
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option>All</option>
              <option>Active</option>
              <option>Suspended</option>
              <option>Pending</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-border/50 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">
                Gym Name
              </th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">
                Owner
              </th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">
                Location
              </th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">
                Members
              </th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">
                Joined
              </th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">
                Status
              </th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredGyms.map((gym) => (
              <tr
                key={gym.id}
                className="border-b border-border/50 hover:bg-muted/30"
              >
                <td className="py-3 px-4">
                  <p className="font-medium text-foreground">{gym.name}</p>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{gym.owner}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">{gym.location}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-primary" />
                    <span className="font-semibold text-foreground">
                      {gym.members}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-muted-foreground text-xs">
                  {gym.joinDate}
                </td>
                <td className="py-3 px-4">
                  <Badge className={statusBadgeColor[gym.status]}>
                    {gym.status}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 hover:bg-muted rounded">
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleSuspendGym(gym.id)}
                        >
                          {gym.status === 'Suspended'
                            ? 'Reactivate'
                            : 'Suspend'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredGyms.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">
              {gyms.length === 0
                ? 'No gyms found.'
                : 'No gyms match your search criteria.'}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
