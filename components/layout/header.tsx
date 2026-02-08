'use client';

import type { AuthUser } from '@/lib/auth';
import { getRoleDisplay } from '@/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Button } from '@ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Input } from '@ui/input';
import { Bell, ChevronDown, LogOut, Menu, Search, Settings, Sparkles, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  user: AuthUser;
  onMenuClick?: () => void;
  onLogout?: () => void;
}

export function Header({ user, onMenuClick, onLogout }: HeaderProps) {
  const router = useRouter();
  const roleDisplay = getRoleDisplay(user.role);

  const handleSettings = () => {
    const dashboardPath = user.role === 'customer' ? '/customer' : 
                         user.role === 'gym_owner' ? '/gym-owner' :
                         user.role === 'vendor' ? '/vendor' : '/admin';
    router.push(`${dashboardPath}/settings`);
  };

  const handleProfile = () => {
    const dashboardPath = user.role === 'customer' ? '/customer' : 
                         user.role === 'gym_owner' ? '/gym-owner' :
                         user.role === 'vendor' ? '/vendor' : '/admin';
    router.push(`${dashboardPath}/settings`);
  };

  return (
    <header className="bg-card py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="text-muted-foreground hover:text-foreground"
        >
          <Menu className="w-6 h-6" />
        </Button>
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Find something here..."
            className="pl-10 bg-secondary/50 border-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-orange-400 hover:text-orange-500 hover:bg-orange-400/10"
        >
          <Sparkles className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-card" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 pl-4 hover:opacity-80 transition-opacity cursor-pointer">
              <Avatar className="h-10 w-10 border-2 border-border">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-foreground leading-none">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{roleDisplay}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfile}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettings}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
