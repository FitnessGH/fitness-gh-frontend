import { Button } from '@/components/ui/button';
import { Headset, LifeBuoy, Mail, MessageSquare } from 'lucide-react';
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

export default function SupportPage() {
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
                <Headset className="w-5 h-5 text-primary" />
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

        <main className="max-w-6xl mx-auto px-6 py-14">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              Support
            </p>
            <h1 className={`${bebas.className} text-5xl md:text-6xl`}>
              Real humans, real help.
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Get answers fast, from onboarding to billing. We are here every
              day to keep your gym running smoothly.
            </p>
          </div>

          <section className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquare,
                title: 'Live chat',
                description: 'Get on-demand help from a product specialist.',
                action: 'Start chat',
              },
              {
                icon: Mail,
                title: 'Email support',
                description:
                  'Reach us at support@fithub.com for detailed issues.',
                action: 'Send email',
              },
              {
                icon: LifeBuoy,
                title: 'Guides & FAQs',
                description:
                  'Browse setup guides, billing answers, and rollout tips.',
                action: 'Visit help center',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card/70 p-6 flex flex-col gap-4"
                >
                  <Icon className="w-8 h-8 text-primary" />
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-primary/40 hover:bg-primary/10"
                  >
                    {item.action}
                  </Button>
                </div>
              );
            })}
          </section>

          <section className="mt-12 rounded-3xl border border-border bg-card/60 p-8">
            <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary">
                  Onboarding
                </p>
                <h2 className={`${bebas.className} text-4xl md:text-5xl mt-3`}>
                  Need a guided rollout?
                </h2>
                <p className="text-muted-foreground mt-4">
                  Book a setup session to migrate members, configure class
                  templates, and train staff in one week.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <Button className="bg-primary hover:bg-primary/90">
                  Book onboarding
                </Button>
                <Button
                  variant="outline"
                  className="border-primary/40 hover:bg-primary/10"
                >
                  View rollout checklist
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
