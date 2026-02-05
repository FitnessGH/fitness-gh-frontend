import { BebasFont } from '@/constant';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import {
  ArrowRight,
  BarChart3,
  Check,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react';
import type { Metadata } from 'next';

import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FitnessGH Pricing',
  description: 'Simple, flexible pricing for gyms of every size.',
};

const plans = [
  {
    name: 'Free Trial',
    price: 'GH₵0',
    period: '1 month',
    description:
      'Try the platform risk-free. Run real classes, not just demos.',
    highlight: false,
    cta: 'Start Free Trial',
    badge: null,
    features: [
      'Up to 50 active members',
      'Scheduling + class waitlists',
      '1 free trial per gym',
      'Full platform access',
      '30 days only',
    ],
    note: 'No billing features • Auto-expires after 30 days',
  },
  {
    name: 'Basic',
    price: 'GH₵100',
    period: '/month',
    description:
      'For small gyms and single-location studios getting organized.',
    highlight: false,
    cta: 'Get Started',
    badge: null,
    features: [
      'Up to 100 active members',
      'Scheduling + class waitlists',
      'Branded member app',
      'Automated billing + receipts',
      'Marketplace storefront',
    ],
    note: 'Single location • Single admin/coach role',
  },
  {
    name: 'Premium',
    price: 'GH₵250',
    period: '/month',
    description: 'For growing gyms focused on revenue and retention.',
    highlight: true,
    cta: 'Upgrade to Premium',
    badge: 'Most Popular',
    features: [
      'Up to 500 active members',
      'Everything in Basic, plus:',
      'Multi-coach permissions',
      'Advanced analytics suite',
      'Retention & churn alerts',
      'Priority support',
    ],
    note: 'Single location',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For chains, franchises, and fitness brands.',
    highlight: false,
    cta: 'Talk to Sales',
    badge: null,
    features: [
      'Multiple gym locations',
      'Custom roles + SSO',
      'Revenue forecasting',
      'Dedicated success lead',
      'Custom data exports',
    ],
    note: 'Contract-based pricing',
  },
];

const highlights = [
  {
    icon: Users,
    title: 'Member-first onboarding',
    description: 'Import your roster, waivers, and billing in a single flow.',
  },
  {
    icon: Zap,
    title: 'Faster class fills',
    description: 'Auto waitlist and reminders keep your sessions at capacity.',
  },
  {
    icon: BarChart3,
    title: 'Revenue clarity',
    description: 'Track MRR, attendance, and retention without spreadsheets.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure by design',
    description: 'Role-based access and audit trails included on every tier.',
  },
];

const faqs = [
  {
    question: 'How does the free trial work?',
    answer:
      'You get 1 month free with up to 50 active members. Run real classes, not just demos. One trial per gym, auto-expires after 30 days.',
  },
  {
    question: 'Do you charge per class or per member?',
    answer:
      'Pricing is based on active members in your database. You can run unlimited classes.',
  },
  {
    question: 'Can I switch plans later?',
    answer:
      'Yes. Upgrade or downgrade at any time. Changes take effect on your next billing cycle.',
  },
  {
    question: 'Why is it so affordable?',
    answer:
      'Our Basic plan costs less than what you charge 1 member per month. Easy to justify, impossible to outgrow.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden">
        <div className="absolute -top-40 -right-30 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(50,176,176,0.18),transparent_55%)]" />

        <section className="px-6 pt-28 pb-16">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <Badge className="w-fit border border-primary/30 bg-primary/10 text-primary">
                Pricing built for real floors
              </Badge>
              <h1 className={`text-5xl md:text-6xl`}>
                Plans that scale from your first 50 members to your 5th
                location.
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Choose a plan that matches your gym today, then grow without
                switching platforms. Every tier includes onboarding, automation,
                and community tools.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button className="bg-primary hover:bg-primary/90 px-8">
                  Start 14-day Trial
                </Button>
                <Button
                  variant="outline"
                  className="border-primary/40 hover:bg-primary/10 px-8"
                  asChild
                >
                  <Link href="/apply">
                    Apply as Owner <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card/70 p-8 backdrop-blur animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span>Monthly totals</span>
                <span className="text-primary">No setup fees</span>
              </div>
              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">
                    Basic
                  </p>
                  <div className="flex items-end gap-2 mt-3">
                    <p className={`${BebasFont.className} text-4xl`}>GH₵100</p>
                    <span className="text-sm text-muted-foreground">
                      / month
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    For gyms with up to 100 active members.
                  </p>
                </div>
                <div className="grid gap-3 text-sm text-muted-foreground">
                  {[
                    'Scheduling + class waitlists',
                    'Branded member app',
                    'Automated billing + receipts',
                    'Marketplace storefront',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground border-t border-border/50 pt-3">
                  Costs less than 1 member/month
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="px-6 py-14 border-y border-border bg-secondary/10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">
                What's included
              </p>
              <h2 className={`${BebasFont.className} text-4xl`}>
                Built-in ops support
              </h2>
            </div>
            <p className="text-muted-foreground max-w-xl">
              Every plan includes scheduling, payments, and community so your
              members never feel the seams between systems.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-card/70 p-6 transition hover:-translate-y-1 hover:border-primary/50"
                >
                  <Icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              Choose a plan
            </p>
            <h2 className={`${BebasFont.className} text-5xl`}>
              Straightforward pricing. No surprises.
            </h2>
            <p className="text-muted-foreground">
              Start with a free 1-month trial. All paid plans include member
              apps, class scheduling, and community tools. Costs less than 1
              member/month.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative h-full rounded-3xl border p-6 transition ${
                  plan.highlight
                    ? 'border-primary/70 bg-primary/10 shadow-2xl shadow-primary/10'
                    : 'border-border bg-card/70'
                }`}
              >
                {plan.badge && (
                  <Badge className="absolute -top-4 left-6 bg-primary text-primary-foreground">
                    {plan.badge}
                  </Badge>
                )}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                      {plan.name}
                    </p>
                    <div className="flex items-end gap-1 mt-3">
                      <p className={`${BebasFont.className} text-3xl`}>
                        {plan.price}
                      </p>
                      {plan.period && (
                        <span className="text-sm text-muted-foreground">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {plan.description}
                    </p>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-2"
                      >
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  {plan.note && (
                    <p className="text-xs text-muted-foreground/70 border-t border-border pt-3 mt-3">
                      {plan.note}
                    </p>
                  )}
                </div>
                <Button
                  className={`mt-6 w-full ${
                    plan.highlight
                      ? 'bg-primary hover:bg-primary/90'
                      : 'bg-secondary/50 hover:bg-secondary/70 text-foreground'
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="rounded-3xl border border-primary/30 bg-linear-to-br from-primary/15 via-secondary/5 to-transparent p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              Add-ons
            </p>
            <h2 className={`${BebasFont.className} text-4xl mt-3`}>
              Layer on performance services.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Add marketing, branded hardware, or custom reporting when you’re
              ready. Your core platform stays the same.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ['CRM + campaigns', 'Automated win-back flows'],
                ['Lead capture', 'Landing pages + ads tracking'],
                ['Wearable sync', 'Member performance dashboards'],
                ['Custom integrations', 'POS + door access'],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-background/70 p-4"
                >
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card/70 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              FAQ
            </p>
            <h3 className={`${BebasFont.className} text-3xl mt-3`}>
              Answers before you ask
            </h3>
            <div className="mt-6 space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-border bg-background/60 p-4"
                >
                  <p className="text-sm font-semibold">{faq.question}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl rounded-4xl border border-primary/30 bg-linear-to-r from-primary/20 via-secondary/10 to-primary/10 p-10 md:p-14">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">
                Ready to compare?
              </p>
              <h2
                className={`${BebasFont.className} text-4xl md:text-5xl mt-3`}
              >
                Let’s map the plan that fits your floor.
              </h2>
              <p className="text-muted-foreground mt-4">
                Tell us your class volume, member count, and location goals.
                We’ll build the right rollout and pricing.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Schedule a Strategy Call
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/40 hover:bg-primary/10"
                asChild
              >
                <Link href="/apply">Apply as Owner</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
