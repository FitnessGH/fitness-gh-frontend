import { BebasFont, SpaceFont } from '@/constant';
import { Button } from '@ui/button';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div
      className={`${SpaceFont.className} min-h-screen bg-background text-foreground flex flex-col`}
    >
      <div className="relative overflow-hidden flex-1">
        <div className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-24 right-0 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />

        <main className="max-w-5xl mx-auto px-6 py-14">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              Terms
            </p>
            <h1 className={`${BebasFont.className} text-5xl md:text-6xl`}>
              Simple terms for serious operators.
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              These Terms of Service govern your use of FitHub. Last updated:
              January 29, 2026.
            </p>
          </div>

          <section className="mt-10 space-y-8">
            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <h2 className="text-xl font-semibold">
                Account responsibilities
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Keep account credentials secure, ensure staff follow platform
                policies, and use FitHub within applicable laws and regulations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <h2 className="text-xl font-semibold">
                  Subscriptions & billing
                </h2>
                <ul className="mt-3 text-sm text-muted-foreground space-y-2">
                  <li>Plans renew automatically unless canceled.</li>
                  <li>Invoices are issued monthly with usage details.</li>
                  <li>Payment failures may pause access.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <h2 className="text-xl font-semibold">Acceptable use</h2>
                <ul className="mt-3 text-sm text-muted-foreground space-y-2">
                  <li>No abuse, harassment, or fraudulent activity.</li>
                  <li>No reverse engineering or unauthorized access.</li>
                  <li>Respect member privacy and data rights.</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <h2 className="text-xl font-semibold">Service availability</h2>
              <p className="text-sm text-muted-foreground mt-2">
                We strive for high uptime and will notify you of planned
                maintenance whenever possible. Status updates appear in the
                dashboard.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <h2 className="text-xl font-semibold">Questions</h2>
              <p className="text-sm text-muted-foreground mt-2">
                If you have any questions about these terms, reach out and we
                will help.
              </p>
              <Button
                asChild
                className="mt-4 bg-primary hover:bg-primary/90"
              >
                <Link href="/support">Get Support</Link>
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
