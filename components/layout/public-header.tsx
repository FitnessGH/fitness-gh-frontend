import { Button } from '@/components/ui/button';
import { BebasFont } from '@/constant';
import { cn } from '@/lib/utils';
import { Dumbbell } from 'lucide-react';

import Link from 'next/link';

export function PublicHeader() {
  return (
    <header
      className={cn(
        `sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur`,
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/20">
            <Dumbbell className="h-5 w-5 text-primary" />
          </div>
          <span className={`${BebasFont.className} text-3xl tracking-wider`}>
            FitnessGH
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/marketplace"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Marketplace
          </Link>
          <Link
            href="/apply"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Apply as Owner
          </Link>
          <Link
            href="/support"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Support
          </Link>
          <Button
            asChild
            className="bg-primary hover:bg-primary/90"
          >
            <Link href="/">Sign In</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
