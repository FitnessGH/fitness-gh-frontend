'use client';

import { BebasFont } from '@/constant';
import { cn } from '@/lib/utils';
import { Button } from '@ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@ui/sheet';
import { Dumbbell, Menu } from 'lucide-react';
import { useState } from 'react';

import Link from 'next/link';

const navLinks = [
  { href: '/browse-gyms', label: 'Browse Gyms' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/apply', label: 'Apply as Owner' },
];

export function PublicHeader() {
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
            className="w-70 border-border bg-background p-0"
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
            <nav className="flex flex-col p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/50 py-4 text-base font-medium text-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-3">
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
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-primary/50 hover:bg-primary/10"
                >
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                  >
                    Create Account
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
