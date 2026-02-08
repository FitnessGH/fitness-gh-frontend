import { cn } from '@/lib/utils';

import Link from 'next/link';

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn('border-t border-border bg-card/40 px-4 py-10 sm:px-6', className)}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row md:text-left">
        <p>&copy; {new Date().getFullYear()} FitnessGH. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:justify-end">
          <Link
            href="/marketplace"
            className="transition-colors hover:text-foreground"
          >
            Marketplace
          </Link>
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-foreground"
          >
            Terms
          </Link>
          <Link
            href="/support"
            className="transition-colors hover:text-foreground"
          >
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
