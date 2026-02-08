'use client';

import { useAuth } from '@/components/auth-context';
import UsersAPI, { type UserWithAccount } from '@/lib/api/users';
import { mapBackendUserTypeToRole } from '@/lib/auth';
import { tokenStorage } from '@/lib/utils/token-storage';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { AlertCircle, Loader2, Search, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Gym Owner' | 'Member' | 'Vendor';
  status: 'Active' | 'Suspended';
  joinDate: string;
  gym?: string;
}

// Transform API user to frontend format
function transformUser(apiUser: UserWithAccount): User {
  const profile = apiUser.profile;
  
  // Ensure name is always a string
  let name = 'Unknown User';
  if (profile) {
    const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
    name = fullName || profile.username || apiUser.email || 'Unknown User';
  } else {
    name = apiUser.email || 'Unknown User';
  }

  // Map backend userType to frontend role
  // Note: SUPER_ADMIN and ADMIN are filtered out before this function is called
  const backendRole = mapBackendUserTypeToRole(apiUser.userType);
  const role =
    backendRole === 'gym_owner'
      ? 'Gym Owner'
      : backendRole === 'customer'
        ? 'Member'
        : backendRole === 'vendor'
          ? 'Vendor'
          : 'Member'; // Fallback to Member if unknown (shouldn't happen)

  const status = apiUser.isActive ? 'Active' : 'Suspended';
  
  // Ensure joinDate is always a string
  let joinDate = new Date().toISOString().split('T')[0];
  if (apiUser.profile?.createdAt) {
    try {
      joinDate = new Date(apiUser.profile.createdAt).toISOString().split('T')[0];
    } catch (e) {
      console.error('Error parsing profile createdAt:', e);
    }
  } else if (apiUser.createdAt) {
    try {
      joinDate = new Date(apiUser.createdAt).toISOString().split('T')[0];
    } catch (e) {
      console.error('Error parsing account createdAt:', e);
    }
  }

  return {
    id: apiUser.id,
    name: name || 'Unknown User',
    email: apiUser.email || '',
    role,
    status,
    joinDate,
    gym: undefined, // Can be added later if needed
  };
}

export default function AdminUsersPage() {
  const { userData, isLoading: authLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<
    'All' | 'Gym Owner' | 'Member' | 'Vendor'
  >('All');

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      // Wait for auth context to finish loading
      if (authLoading) {
        return;
      }

      // Try to get token from storage directly (more reliable than userData)
      const token = tokenStorage.getAccessToken() || userData?.tokens?.accessToken;
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // API will automatically get token from storage if not provided
        const apiUsers = await UsersAPI.getAllUsers();
        // Filter out SUPER_ADMIN users - they should not be displayed
        const filteredApiUsers = apiUsers.filter(
          (user) => user.userType !== 'SUPER_ADMIN' && user.userType !== 'ADMIN'
        );
        const transformedUsers = filteredApiUsers.map(transformUser);
        setUsers(transformedUsers);
      } catch (err: any) {
        console.error('Failed to fetch users:', err);
        setError(err.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userData, authLoading]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleSuspendUser = async (id: string) => {
    // TODO: Implement suspend/activate via API
    // For now, just update local state
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' }
          : u,
      ),
    );
  };

  if (authLoading || loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            {authLoading ? 'Loading...' : 'Loading users...'}
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

  const roleColors: Record<User['role'], string> = {
    'Gym Owner': 'bg-blue-100 text-blue-700',
    Member: 'bg-green-100 text-green-700',
    Vendor: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manage Users</h1>
        <p className="text-muted-foreground">
          Monitor user accounts and permissions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: users.length, icon: Shield },
          {
            label: 'Active Users',
            value: users.filter((u) => u.status === 'Active').length,
            icon: Shield,
          },
          {
            label: 'Suspended',
            value: users.filter((u) => u.status === 'Suspended').length,
            icon: AlertCircle,
          },
          {
            label: 'Members',
            value: users.filter((u) => u.role === 'Member').length,
            icon: Shield,
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

      <Card className="p-4 border-border/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label className="text-xs text-muted-foreground mb-2 block">
              Search
            </Label>
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
            <Label className="text-xs text-muted-foreground mb-2 block">
              Role
            </Label>
            <select
              value={filterRole}
              onChange={(e) =>
                setFilterRole(
                  e.target.value as
                    | 'All'
                    | 'Gym Owner'
                    | 'Member'
                    | 'Vendor',
                )
              }
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option>All</option>
              <option>Gym Owner</option>
              <option>Member</option>
              <option>Vendor</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-border/50 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">
                Name
              </th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">
                Email
              </th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">
                Role
              </th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">
                Gym
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
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-border/50 hover:bg-muted/30"
              >
                <td className="py-3 px-4">
                  <p className="font-medium text-foreground">{user.name}</p>
                </td>
                <td className="py-3 px-4 text-muted-foreground text-xs">
                  {user.email}
                </td>
                <td className="py-3 px-4">
                  <Badge className={roleColors[user.role]}>{user.role}</Badge>
                </td>
                <td className="py-3 px-4 text-muted-foreground text-xs">
                  {user.gym || '-'}
                </td>
                <td className="py-3 px-4 text-muted-foreground text-xs">
                  {user.joinDate}
                </td>
                <td className="py-3 px-4">
                  <Badge
                    className={
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent"
                      onClick={() => handleSuspendUser(user.id)}
                    >
                      {user.status === 'Active' ? 'Suspend' : 'Activate'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">
              {users.length === 0
                ? 'No users found.'
                : 'No users match your search criteria.'}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
