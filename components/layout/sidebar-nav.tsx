'use client';

import { Button } from '@/components/ui/button';
import type { UserRole } from '@/lib/auth';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Briefcase,
  Calendar,
  DollarSign,
  Dumbbell,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  ShoppingCart,
  Target,
  Users,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import type React from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: Record<UserRole, NavItem[]> = {
  gym_owner: [
    {
      label: 'Dashboard',
      href: '/gym-owner',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: 'Membership',
      href: '/gym-owner/members',
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: 'Batch Schedule',
      href: '/gym-owner/events',
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      label: 'Employees',
      href: '/gym-owner/employees',
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      label: 'Billing List',
      href: '/gym-owner/payments',
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      label: 'Report',
      href: '/gym-owner/analytics',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      label: 'Setting',
      href: '/gym-owner/settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ],
  customer: [
    {
      label: 'Dashboard',
      href: '/customer',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: 'Find Gyms',
      href: '/customer/browse-gyms',
      icon: <Search className="w-5 h-5" />,
    },
    {
      label: 'My Gym',
      href: '/customer/my-gym',
      icon: <Dumbbell className="w-5 h-5" />,
    },
    {
      label: 'Training Goals',
      href: '/customer/my-goals',
      icon: <Target className="w-5 h-5" />,
    },
    {
      label: 'Gear Shop',
      href: '/customer/marketplace',
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      label: 'Fitness Crew',
      href: '/customer/community',
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      label: 'Settings',
      href: '/customer/settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ],
  vendor: [
    {
      label: 'Dashboard',
      href: '/vendor',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: 'Gear Inventory',
      href: '/vendor/products',
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      label: 'Orders',
      href: '/vendor/orders',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      label: 'Settings',
      href: '/vendor/settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ],
  admin: [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: 'Gyms',
      href: '/admin/gyms',
      icon: <Dumbbell className="w-5 h-5" />,
    },
    {
      label: 'Users',
      href: '/admin/users',
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: 'Iron Shop',
      href: '/admin/marketplace',
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ],
};

interface SidebarNavProps {
  role: UserRole;
  onLogout: () => void;
}

export function SidebarNav({ role, onLogout }: SidebarNavProps) {
  const pathname = usePathname();
  const items = navItems[role];

  return (
    <div className="flex flex-col h-full">
      <nav className="flex-1 space-y-2 p-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
          >
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                pathname === item.href &&
                  'bg-primary text-primary-foreground hover:bg-primary',
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4 space-y-4">
        {role === 'gym_owner' && (
          <div className="bg-card/50 rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground">Upgrade to</span>
              <span className="text-xs font-bold bg-primary/20 text-primary px-1 py-0.5 rounded">
                PRO
              </span>
            </div>
            <h3 className="font-bold text-foreground">Basic</h3>
            <p className="text-xs text-muted-foreground mb-3">21 Days Left</p>
            <div className="h-1 w-full bg-secondary rounded-full overflow-hidden mb-4">
              <div className="h-full bg-primary w-2/3" />
            </div>
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xs h-8">
              Upgrade Plan
            </Button>
          </div>
        )}

        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
