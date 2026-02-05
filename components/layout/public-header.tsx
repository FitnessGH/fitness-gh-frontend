'use client';

import { BebasFont } from '@/constant';
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@ui/sheet';
import { ChevronDown, Dumbbell, Menu, ShoppingBag, Users } from 'lucide-react';
import { useState } from 'react';

import Link from 'next/link';

const navLinks = [
  { href: '/browse-gyms', label: 'Browse Gyms' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/marketplace', label: 'Marketplace' },
];

const signupOptions = [
  {
    href: '/signup/customer',
    label: 'Join as Athlete',
    description: 'Find gyms, track progress, join classes',
    icon: Users,
  },
  {
    href: '/signup/vendor',
    label: 'Join as Vendor',
    description: 'Sell products to gyms and members',
    icon: ShoppingBag,
  },
  {
    href: '/apply',
    label: 'Apply as Owner',
    description: 'List and manage your gym on FitnessGH',
    icon: Dumbbell,
  },
];

export const PublicHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        `sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur`,
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/20 sm:h-10 sm:w-10">
            <Dumbbell className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
          </div>
          <span
            className={`${BebasFont.className} text-2xl tracking-wider sm:text-3xl`}
          >
            FitnessGH
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-primary/50 hover:bg-primary/10"
              >
                Get Started
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 border-border bg-card p-2"
            >
              {signupOptions.map((option) => (
                <DropdownMenuItem
                  key={option.href}
                  asChild
                  className="p-0 focus:bg-transparent data-highlighted:bg-transparent"
                >
                  <Link
                    href={option.href}
                    className="flex w-full cursor-pointer items-start gap-3 rounded-lg p-3 hover:bg-primary/10 focus:bg-primary/10"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <option.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {option.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            asChild
            className="bg-primary hover:bg-primary/90"
          >
            <Link href="/login">Sign In</Link>
          </Button>
        </nav>

        <Sheet
          open={open}
          onOpenChange={setOpen}
        >
          <SheetTrigger
            asChild
            className="md:hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-75 border-border bg-background p-0"
          >
            <SheetHeader className="border-b border-border px-6 py-4">
              <SheetTitle className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/20">
                  <Dumbbell className="h-4 w-4 text-primary" />
                </div>
                <span
                  className={`${BebasFont.className} text-xl tracking-wider`}
                >
                  FitnessGH
                </span>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col">
              <nav className="border-b border-border p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="border-b border-border p-4">
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Get Started
                </p>
                {signupOptions.map((option) => (
                  <Link
                    key={option.href}
                    href={option.href}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-primary/10"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <option.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {option.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="p-4">
                <p className="mb-3 px-3 text-xs text-muted-foreground">
                  Already have an account?
                </p>
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                  >
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
