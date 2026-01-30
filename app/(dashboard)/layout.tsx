'use client';

import { useAuth } from '@/components/auth-context';
import { Header } from '@/components/layout/header';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace('/');
      return;
    }

    if (user?.role !== 'gym_owner') {
      router.replace('/');
      return;
    }
  }, [isAuthenticated, user, router, isLoading]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } border-r border-border bg-sidebar transition-all duration-300 hidden md:flex flex-col`}
      >
        <div className="p-4 border-b border-sidebar-border flex items-center justify-center h-16">
          <h1 className="text-xl font-bold text-sidebar-primary">FitnessGH</h1>
        </div>
        <SidebarNav
          role={user.role}
          onLogout={logout}
        />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          user={user}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
