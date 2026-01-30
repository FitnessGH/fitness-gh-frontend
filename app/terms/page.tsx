import { Button } from '@/components/ui/button';
import { ScrollText } from 'lucide-react';
import { Bebas_Neue, Space_Grotesk } from 'next/font/google';
import Link from 'next/link';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function TermsPage() {
  return (
    <div
      className={`${space.className} min-h-screen bg-background text-foreground`}
    >
      <div className="relative overflow-hidden">
        <div className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-24 right-0 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />

        <header className="border-b border-border bg-background/70 backdrop-blur">
          <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <ScrollText className="w-5 h-5 text-primary" />
              </div>
              <span className={`${bebas.className} text-3xl tracking-wider`}>
                FitHub
              </span>
            </Link>
            <Button
              asChild
              variant="outline"
              className="border-primary/40 hover:bg-primary/10"
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-14">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              Terms
            </p>
            <h1 className={`${bebas.className} text-5xl md:text-6xl`}>
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
