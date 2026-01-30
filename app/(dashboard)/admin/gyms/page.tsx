'use client';

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
import { MapPin, MoreVertical, Search, Users } from 'lucide-react';
import { useState } from 'react';

interface Gym {
  id: string;
  name: string;
  location: string;
  owner: string;
  members: number;
  status: 'Active' | 'Suspended' | 'Pending';
  joinDate: string;
}

const mockGyms: Gym[] = [
  {
    id: '1',
    name: 'FitClub Downtown',
    location: '123 Main St, Downtown',
    owner: 'John Fitness',
    members: 234,
    status: 'Active',
    joinDate: '2023-06-15',
  },
  {
    id: '2',
    name: 'Elite Gym Center',
    location: '456 Park Ave, Uptown',
    owner: 'Sarah Strong',
    members: 189,
    status: 'Active',
    joinDate: '2023-08-22',
  },
  {
    id: '3',
    name: 'Premium Fitness',
    location: '789 Oak Rd, Suburb',
    owner: 'Mike Trainer',
    members: 156,
    status: 'Suspended',
    joinDate: '2024-01-10',
  },
  {
    id: '4',
    name: 'CrossFit Champions',
    location: '321 Forest Ln, East Side',
    owner: 'Alex Power',
    members: 98,
    status: 'Pending',
    joinDate: '2025-01-05',
  },
];

export default function AdminGymsPage() {
  const [gyms, setGyms] = useState<Gym[]>(mockGyms);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<
    'All' | 'Active' | 'Suspended' | 'Pending'
  >('All');

  const filteredGyms = gyms.filter((gym) => {
    const matchesSearch =
      gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gym.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || gym.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSuspendGym = (id: string) => {
    setGyms(
      gyms.map((g) =>
        g.id === id
          ? { ...g, status: g.status === 'Suspended' ? 'Active' : 'Suspended' }
          : g,
      ),
    );
    console.log('[v0] Gym status updated:', id);
  };

  const statusBadgeColor: Record<Gym['status'], string> = {
    Active: 'bg-green-100 text-green-700',
    Suspended: 'bg-red-100 text-red-700',
    Pending: 'bg-yellow-100 text-yellow-700',
  };

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
      </Card>
    </div>
  );
}
