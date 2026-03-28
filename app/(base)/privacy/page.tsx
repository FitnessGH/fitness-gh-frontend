import { BebasFont, SpaceFont } from '@/constant';
import { Button } from '@ui/button';

import Link from 'next/link';

export default function PrivacyPage() {
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
              Legal
            </p>
            <h1 className={`${BebasFont.className} text-5xl md:text-6xl`}>
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              This Privacy Policy explains how FitnessGH collects, uses,
              protects, and shares information across all user roles on the
              platform. Last updated: January 29, 2026.
            </p>
          </div>

          <section className="mt-10 space-y-6">
            <div className="rounded-2xl border border-border bg-card/70 p-6 space-y-5">
              <h2 className="text-xl font-semibold">Information We Collect</h2>
              <p className="text-sm text-muted-foreground">
                We collect the following categories of data:
              </p>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  A. Account Information
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Name, email, phone number</li>
                  <li>Login credentials (encrypted)</li>
                  <li>Role (customer, gym owner, staff, vendor)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  B. Gym & Profile Data
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Gym details (location, services, pricing)</li>
                  <li>Staff profiles and schedules</li>
                  <li>Membership and booking data</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  C. Payment & Billing Data
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Transaction history</li>
                  <li>Subscription details</li>
                  <li>
                    Payment status (processed via secure third-party providers)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  D. Usage & Device Data
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>App activity (pages visited, features used)</li>
                  <li>Device type, browser, IP address</li>
                  <li>Logs for performance and debugging</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/70 p-6 space-y-5">
              <h2 className="text-xl font-semibold">How We Use Data</h2>
              <p className="text-sm text-muted-foreground">
                We use collected data to:
              </p>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Core Platform Operations
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Manage memberships, bookings, and class schedules</li>
                  <li>Process payments and subscriptions</li>
                  <li>
                    Enable communication between users (e.g., gym &harr;
                    customer)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Personalization
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Customize dashboards by role</li>
                  <li>Recommend gyms, classes, or services</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Platform Improvement
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Monitor performance and fix bugs</li>
                  <li>Analyze usage trends</li>
                  <li>Enhance security and fraud detection</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/70 p-6 space-y-5">
              <h2 className="text-xl font-semibold">Data Sharing</h2>
              <p className="text-sm text-muted-foreground">
                We only share data under the following conditions:
              </p>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Service Providers
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Payment processors</li>
                  <li>Cloud hosting and infrastructure providers</li>
                  <li>Communication tools (e.g., notifications)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Within the Platform
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>
                    Customers &harr; Gym Owners (e.g., bookings, attendance)
                  </li>
                  <li>Gym Owners &harr; Employees (operational data access)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Legal Requirements
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>When required by law or regulatory authorities</li>
                </ul>
              </div>

              <div className="rounded-xl bg-primary/10 border border-primary/20 px-4 py-3">
                <p className="text-sm font-semibold text-foreground">
                  We do <span className="text-red-400">NOT</span> sell personal
                  data to third parties for advertising.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <h2 className="text-xl font-semibold">Data Security</h2>
                <p className="text-sm text-muted-foreground mt-2 mb-3">
                  We take security seriously and implement:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Encryption in transit (HTTPS) and at rest</li>
                  <li>Role-Based Access Control (RBAC)</li>
                  <li>Secure authentication and session management</li>
                  <li>Continuous monitoring and threat detection</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3">
                  However, no system is 100% secure, and users share data at
                  their own risk.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card/70 p-6 space-y-4">
                <h2 className="text-xl font-semibold">Your Rights & Choices</h2>
                <p className="text-sm text-muted-foreground">
                  Depending on your role, you can:
                </p>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    All Users
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Access and update personal information</li>
                    <li>Request account deletion</li>
                    <li>Opt out of non-essential communications</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    Gym Owners
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Export customer and business data</li>
                    <li>Manage staff permissions</li>
                    <li>Request bulk data deletion</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    Customers
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Control gym memberships</li>
                    <li>Manage subscriptions and payment methods</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    Employees
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Access only data relevant to assigned roles</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <h2 className="text-xl font-semibold">Data Retention</h2>
                <ul className="mt-3 text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>
                    Data is retained only as long as necessary for service
                    delivery and legal/financial compliance.
                  </li>
                  <li>
                    Deleted accounts may have limited data retained for
                    audit/legal purposes.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <h2 className="text-xl font-semibold">Cookies & Tracking</h2>
                <ul className="mt-3 text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Used for session management and analytics</li>
                  <li>Helps improve user experience</li>
                  <li>Users can control cookies via browser settings</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <h2 className="text-xl font-semibold">
                  Third-Party Integrations
                </h2>
                <ul className="mt-3 text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>
                    FitnessGH may integrate with external services (e.g.,
                    payment gateways).
                  </li>
                  <li>These providers have their own privacy policies.</li>
                  <li>
                    FitnessGH is not responsible for third-party practices.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <h2 className="text-xl font-semibold">
                  Children&apos;s Privacy
                </h2>
                <ul className="mt-3 text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>
                    FitnessGH is not intended for users below the legal age
                    (under 13/16 depending on jurisdiction).
                  </li>
                  <li>We do not knowingly collect data from minors.</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <h2 className="text-xl font-semibold">Policy Updates</h2>
                <ul className="mt-3 text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>This Privacy Policy may be updated periodically.</li>
                  <li>Users will be notified of significant changes.</li>
                  <li>Continued use implies acceptance.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <h2 className="text-xl font-semibold">Contact & Support</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  If you have any questions about this Privacy Policy, please
                  contact our support team through the platform.
                </p>
                <Button
                  asChild
                  className="mt-4 bg-primary hover:bg-primary/90"
                >
                  <Link href="/support">Contact Support</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
