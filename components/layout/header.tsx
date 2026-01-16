"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import type { AuthUser } from "@/lib/auth"
import { Bell, Menu, Search, Sparkles, ChevronDown } from "lucide-react"

interface HeaderProps {
  user: AuthUser
  onMenuClick?: () => void
}

export function Header({ user, onMenuClick }: HeaderProps) {
  return (
    <header className="bg-card py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden text-muted-foreground">
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
        <Button variant="ghost" size="icon" className="text-orange-400 hover:text-orange-500 hover:bg-orange-400/10">
          <Sparkles className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-card" />
        </Button>

        <div className="flex items-center gap-3 pl-4">
          <Avatar className="h-10 w-10 border-2 border-border">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-foreground leading-none">{user.name}</p>
            <p className="text-xs text-muted-foreground mt-1">Super Admin</p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
        </div>
      </div>
    </header>
  )
}
