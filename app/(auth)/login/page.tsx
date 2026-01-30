import { LoginForm } from '@/components/login-form';
import { BebasFont } from '@/constant';
import { Button } from '@ui/button';

import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute top-32 -right-30 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(50,176,176,0.18),transparent_55%)]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-primary">
            FitnessGH Access
          </div>
          <div className="space-y-4">
            <h1 className={`text-5xl md:text-6xl`}>
              Sign in to run your floor in real time.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Monitor memberships, staff, and community updates without leaving
              the front desk. Your full gym command center, ready when you are.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['92%', 'Member retention'],
              ['24/7', 'Live ops feed'],
              ['4.9★', 'Owner rating'],
            ].map(([stat, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-border bg-card/70 p-4"
              >
                <p
                  className={`${BebasFont.className} text-3xl text-foreground`}
                >
                  {stat}
                </p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="bg-primary hover:bg-primary/90"
            >
              <Link href="/apply">Apply as Owner</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-primary/40 hover:bg-primary/10"
            >
              <Link href="/marketplace">Browse Marketplace</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card/70 p-8 shadow-2xl shadow-primary/10 backdrop-blur animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
