'use client';

import { useAuth } from '@/components/auth-context';
import { Header } from '@/components/layout/header';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { BebasFont } from '@/constant';
import { Dumbbell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace('/');
      return;
    }

    if (user?.emailVerified === false) {
      router.replace('/login');
      return;
    }

    // Allow all authenticated and verified users to access their dashboards
    // Role-based routing is handled by individual dashboard pages if needed
  }, [isAuthenticated, user, router, isLoading]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    setMobileMenuOpen(false);
    logout();
  };

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

      <Sheet
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
      >
        <SheetContent
          side="left"
          className="w-70 p-0 bg-[#082324] border-sidebar-border"
        >
          <SheetHeader className="p-4 border-b border-sidebar-border">
            <SheetTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/20">
                <Dumbbell className="h-4 w-4 text-primary" />
              </div>
              <span className={`${BebasFont.className} text-xl tracking-wider`}>
                FitnessGH
              </span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto">
            <SidebarNav
              role={user.role}
              onLogout={handleLogout}
              onNavigate={() => setMobileMenuOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          user={user}
          onMenuClick={() => {
            if (window.innerWidth < 768) {
              setMobileMenuOpen(true);
            } else {
              setSidebarOpen(!sidebarOpen);
            }
          }}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
