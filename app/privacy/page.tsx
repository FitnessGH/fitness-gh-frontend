import { Footer } from '@/components/layout/footer';
import { PublicHeader } from '@/components/layout/public-header';
import { Button } from '@/components/ui/button';
import { BebasFont, SpaceFont } from '@/constant';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div
      className={`${SpaceFont.className} min-h-screen bg-background text-foreground flex flex-col`}
    >
      <div className="relative overflow-hidden flex-1">
        <div className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-24 right-0 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />

        <PublicHeader />

        <main className="max-w-5xl mx-auto px-6 py-14">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              Privacy
            </p>
            <h1 className={`${BebasFont.className} text-5xl md:text-6xl`}>
              Your members trust you. We protect that trust.
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              This Privacy Policy explains how FitHub collects, uses, and
              protects information from gym owners, staff, and members. Last
              updated: January 29, 2026.
            </p>
          </div>

          <section className="mt-10 space-y-8">
            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <h2 className="text-xl font-semibold">Information we collect</h2>
              <p className="text-sm text-muted-foreground mt-2">
                We collect account details, gym profile information, payment
                records, and usage analytics so the platform can operate and
                improve.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <h2 className="text-xl font-semibold">How we use data</h2>
                <ul className="mt-3 text-sm text-muted-foreground space-y-2">
                  <li>
                    Operate memberships, classes, billing, and communications.
                  </li>
                  <li>
                    Personalize dashboards for owners, staff, and members.
                  </li>
                  <li>Improve performance, security, and reliability.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <h2 className="text-xl font-semibold">Data sharing</h2>
                <ul className="mt-3 text-sm text-muted-foreground space-y-2">
                  <li>Only with services required to deliver FitHub.</li>
                  <li>Never sold to third parties for advertising.</li>
                  <li>Shared when legally required.</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <h2 className="text-xl font-semibold">Security</h2>
              <p className="text-sm text-muted-foreground mt-2">
                We use encryption in transit and at rest, role-based access
                controls, and continuous monitoring to protect data integrity.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <h2 className="text-xl font-semibold">Your choices</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Gym owners can export data, update permissions, and request
                deletions. For help, contact our support team.
              </p>
              <Button
                asChild
                className="mt-4 bg-primary hover:bg-primary/90"
              >
                <Link href="/support">Contact Support</Link>
              </Button>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
