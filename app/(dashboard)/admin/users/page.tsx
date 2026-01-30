'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Search, Shield } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Gym Owner' | 'Member' | 'Vendor' | 'Admin';
  status: 'Active' | 'Suspended';
  joinDate: string;
  gym?: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Fitness',
    email: 'john@fitclub.com',
    role: 'Gym Owner',
    status: 'Active',
    joinDate: '2023-06-15',
    gym: 'FitClub Downtown',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@email.com',
    role: 'Member',
    status: 'Active',
    joinDate: '2024-01-15',
    gym: 'FitClub Downtown',
  },
  {
    id: '3',
    name: 'Mike Supplements',
    email: 'mike@elite.com',
    role: 'Vendor',
    status: 'Active',
    joinDate: '2023-09-20',
  },
  {
    id: '4',
    name: 'Lisa Chen',
    email: 'lisa@fitclub.com',
    role: 'Member',
    status: 'Suspended',
    joinDate: '2023-12-01',
    gym: 'Elite Gym Center',
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<
    'All' | 'Gym Owner' | 'Member' | 'Vendor' | 'Admin'
  >('All');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleSuspendUser = (id: string) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' }
          : u,
      ),
    );
  };

  const roleColors: Record<User['role'], string> = {
    'Gym Owner': 'bg-blue-100 text-blue-700',
    Member: 'bg-green-100 text-green-700',
    Vendor: 'bg-purple-100 text-purple-700',
    Admin: 'bg-red-100 text-red-700',
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
                    | 'Vendor'
                    | 'Admin',
                )
              }
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option>All</option>
              <option>Gym Owner</option>
              <option>Member</option>
              <option>Vendor</option>
              <option>Admin</option>
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
      </Card>
    </div>
  );
}
