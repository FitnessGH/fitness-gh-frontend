'use client';

import { useAuth } from '@/components/auth-context';
import { Footer } from '@/components/layout/footer';
import { PublicHeader } from '@/components/layout/public-header';
import { LoginForm } from '@/components/login-form';
import { BebasFont, SpaceFont } from '@/constant';
import { getDashboardPath } from '@/lib/auth';
import { Button } from '@ui/button';
import {
  BarChart3,
  Dumbbell,
  Play,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);

  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace(getDashboardPath(user.role));
    }
  }, [isAuthenticated, user, router]);

  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${SpaceFont.className} min-h-screen bg-background text-foreground`}
    >
      <div className="relative overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(50,176,176,0.18),_transparent_55%)]" />

        <PublicHeader
          signInSlot={
            <Button
              onClick={() => setShowLogin(true)}
              className="bg-primary hover:bg-primary/90"
            >
              Sign In
            </Button>
          }
        />

        <section className="pt-32 px-6 pb-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary">
                Operator-first gym OS
              </div>
              <div className="space-y-6">
                <h1
                  className={`${BebasFont.className} text-6xl md:text-7xl leading-[0.95]`}
                >
                  Turn every session into a story your members share.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                  Run memberships, classes, staff, payments, and community in
                  one place. FitnessGH gives you real-time control without
                  slowing the floor.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  onClick={() => setShowLogin(true)}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-base px-8 py-6"
                >
                  Start Free Trial
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/40 text-foreground hover:bg-primary/10 px-8 py-6"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Demo
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-4 text-sm text-muted-foreground">
                <div>
                  <div
                    className={`${BebasFont.className} text-3xl text-foreground`}
                  >
                    92%
                  </div>
                  Member retention
                </div>
                <div>
                  <div
                    className={`${BebasFont.className} text-3xl text-foreground`}
                  >
                    24/7
                  </div>
                  Staff ops view
                </div>
                <div>
                  <div
                    className={`${BebasFont.className} text-3xl text-foreground`}
                  >
                    4.9★
                  </div>
                  Owner rating
                </div>
              </div>
            </div>

            <div className="relative animate-in fade-in slide-in-from-bottom-10 duration-700 delay-150">
              <div className="absolute -inset-6 rounded-[32px] border border-primary/30 bg-primary/10 blur-2xl" />
              <div className="relative rounded-[28px] border border-border bg-card/80 p-6 backdrop-blur">
                <div className="flex items-center justify-between mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <span>Live session</span>
                  <span className="text-primary">Now playing</span>
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-primary/20">
                  <video
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source
                      src="/videos/gym.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="rounded-xl border border-border bg-background/50 p-4">
                    <p
                      className={`${BebasFont.className} text-3xl text-primary`}
                    >
                      5,890
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Active athletes
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-background/50 p-4">
                    <p
                      className={`${BebasFont.className} text-3xl text-foreground`}
                    >
                      +2,000
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Joined this month
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="px-6 py-16 border-y border-border bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">
                What you get
              </p>
              <h2 className={`${BebasFont.className} text-4xl md:text-5xl`}>
                Built for busy floors
              </h2>
            </div>
            <p className="text-muted-foreground max-w-xl">
              From onboarding to revenue, FitnessGH keeps every system in sync
              so your coaches can focus on people.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'Member Management',
                description:
                  'Track athletes, manage memberships, handle renewals, and maintain engagement.',
              },
              {
                icon: TrendingUp,
                title: 'Real-time Analytics',
                description:
                  'Monitor revenue, attendance patterns, and growth across all locations.',
              },
              {
                icon: Zap,
                title: 'Class Orchestration',
                description:
                  'Schedule sessions, manage capacity, and keep waitlists moving.',
              },
              {
                icon: BarChart3,
                title: 'Revenue Control',
                description:
                  'Collect payments, issue receipts, and understand cash flow instantly.',
              },
              {
                icon: Shield,
                title: 'Team Operations',
                description:
                  'Hire trainers, assign roles, and keep shift coverage on point.',
              },
              {
                icon: Dumbbell,
                title: 'Marketplace',
                description:
                  'Sell gear, partner with vendors, and open new revenue streams.',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-2xl border border-border bg-card/70 p-6 transition-all hover:-translate-y-1 hover:border-primary/50"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="w-8 h-8 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mt-4">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              Workflow
            </p>
            <h2 className={`${BebasFont.className} text-4xl md:text-5xl`}>
              Launch in days, not months
            </h2>
            <p className="text-muted-foreground">
              Move your data, schedules, and payments without interrupting your
              classes. The rollout plan is built into FitnessGH.
            </p>
            <div className="grid gap-4">
              {[
                'Import members and memberships with guided mapping.',
                'Set class templates, capacity rules, and pricing.',
                'Invite staff, assign roles, and go live in a week.',
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 rounded-xl border border-border p-4"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card/60 p-8">
            <div className="space-y-6">
              <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">
                  Coach view
                </p>
                <p className={`${BebasFont.className} text-3xl`}>
                  Today: 14 classes, 3 waitlists
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Auto-reminders keep attendance high without manual follow-ups.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border p-4">
                  <p className="text-xs text-muted-foreground">Revenue lift</p>
                  <p className={`${BebasFont.className} text-3xl text-primary`}>
                    +18%
                  </p>
                </div>
                <div className="rounded-2xl border border-border p-4">
                  <p className="text-xs text-muted-foreground">Avg. check-in</p>
                  <p
                    className={`${BebasFont.className} text-3xl text-foreground`}
                  >
                    12s
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowLogin(true)}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Book a Platform Tour
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto rounded-[32px] border border-primary/30 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/10 p-10 md:p-14">
          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">
                Ready to grow
              </p>
              <h2
                className={`${BebasFont.className} text-4xl md:text-5xl mt-3`}
              >
                Give your members a reason to show up tomorrow.
              </h2>
              <p className="text-muted-foreground mt-4">
                FitnessGH combines scheduling, community, and revenue tools in
                one platform so your gym runs like a brand.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => setShowLogin(true)}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Start Your Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/40 hover:bg-primary/10"
              >
                Compare Plans
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
