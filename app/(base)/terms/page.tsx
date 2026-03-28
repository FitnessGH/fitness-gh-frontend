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
              Legal
            </p>
            <h1 className={`${BebasFont.className} text-5xl md:text-6xl`}>
              Terms of Use
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              These Terms govern your access to and use of FitnessGH. By using
              the platform, you agree to comply with the responsibilities
              outlined below based on your role. Last updated: January 29, 2026.
            </p>
          </div>

          <section className="mt-10 space-y-6">
            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <h2 className="text-xl font-semibold">
                1. Account Responsibilities
              </h2>
              <p className="text-xs text-muted-foreground mt-1 mb-3">
                Applies to all users
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>
                  You are responsible for maintaining the confidentiality of
                  your login credentials.
                </li>
                <li>
                  All activities under your account are your responsibility.
                </li>
                <li>
                  You must provide accurate and up-to-date information at all
                  times.
                </li>
                <li>
                  Sharing accounts is prohibited unless explicitly authorized.
                </li>
                <li>Any suspicious activity must be reported immediately.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card/70 p-6 space-y-6">
              <h2 className="text-xl font-semibold">
                2. Role-Based Responsibilities
              </h2>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  A. Customers (Gym Members)
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>
                    Must register with accurate personal and payment details.
                  </li>
                  <li>
                    Responsible for selecting and joining a gym before accessing
                    full dashboard features.
                  </li>
                  <li>
                    Must comply with gym policies (attendance, bookings,
                    cancellations).
                  </li>
                  <li>
                    Payments for subscriptions, classes, or services must be
                    completed on time.
                  </li>
                  <li>
                    Misuse of gym facilities or platform features may result in
                    suspension.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  B. Gym Owners
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>
                    Responsible for managing gym profiles, pricing, schedules,
                    and services.
                  </li>
                  <li>
                    Must ensure all listed information (location, trainers,
                    pricing) is accurate.
                  </li>
                  <li>
                    Responsible for handling customer relationships and service
                    delivery.
                  </li>
                  <li>
                    Must comply with local laws, safety regulations, and
                    employment standards.
                  </li>
                  <li>
                    Accountable for actions of staff operating under their gym
                    account.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  C. Employees (Staff / Trainers)
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>
                    Must use the platform only for authorized business
                    operations.
                  </li>
                  <li>
                    Responsible for managing schedules, classes, and customer
                    interactions professionally.
                  </li>
                  <li>
                    Must not misuse customer data or access unauthorized
                    information.
                  </li>
                  <li>
                    Required to follow employer (gym owner) policies and
                    platform guidelines.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  D. Vendors (Third-Party Service Providers)
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>
                    Includes equipment suppliers, wellness providers, or
                    integration partners.
                  </li>
                  <li>
                    Must ensure products/services listed are accurate and
                    delivered as promised.
                  </li>
                  <li>
                    Responsible for order fulfillment, warranties, and support.
                  </li>
                  <li>
                    Must comply with platform integration and data security
                    requirements.
                  </li>
                  <li>
                    Any fraudulent or misleading activity will result in
                    removal.
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <h2 className="text-xl font-semibold">
                  3. Subscriptions & Billing
                </h2>
                <ul className="mt-3 text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>
                    Subscriptions renew automatically unless canceled before the
                    billing cycle ends.
                  </li>
                  <li>
                    Payments are processed securely via integrated payment
                    providers.
                  </li>
                  <li>
                    Failed payments may result in restricted access to services.
                  </li>
                  <li>
                    Refunds (if applicable) are subject to gym/vendor-specific
                    policies.
                  </li>
                  <li>Pricing may vary by gym, service, or location.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <h2 className="text-xl font-semibold">
                  4. Acceptable Use Policy
                </h2>
                <p className="text-sm text-muted-foreground mt-2 mb-3">
                  All users agree{' '}
                  <strong className="text-foreground">NOT</strong> to:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Engage in fraudulent, abusive, or illegal activities.</li>
                  <li>Harass, threaten, or harm other users.</li>
                  <li>Attempt unauthorized access to systems or data.</li>
                  <li>Reverse engineer or exploit the platform.</li>
                  <li>Upload false, misleading, or harmful content.</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3">
                  Violations may lead to suspension or permanent account
                  termination.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <h2 className="text-xl font-semibold">
                  5. Data Privacy & Security
                </h2>
                <ul className="mt-3 text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>
                    User data is handled in accordance with applicable data
                    protection laws.
                  </li>
                  <li>
                    Personal data is only shared when necessary (e.g., bookings,
                    payments).
                  </li>
                  <li>
                    Users must not misuse or extract data from the platform.
                  </li>
                  <li>
                    Gym owners and employees must protect customer data
                    confidentiality.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <h2 className="text-xl font-semibold">
                  6. Service Availability
                </h2>
                <ul className="mt-3 text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>
                    FitnessGH aims for high availability but does not guarantee
                    uninterrupted service.
                  </li>
                  <li>
                    Scheduled maintenance will be communicated in advance where
                    possible.
                  </li>
                  <li>
                    Temporary downtime may occur due to technical or external
                    factors.
                  </li>
                  <li>
                    Platform features may be updated, modified, or discontinued
                    at any time.
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <h2 className="text-xl font-semibold">
                7. Platform Role as an Intermediary
              </h2>
              <ul className="mt-3 text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>
                  FitnessGH connects customers, gyms, and vendors but does not
                  directly provide gym services.
                </li>
                <li>
                  FitnessGH is not liable for the quality of gym services,
                  vendor products, or staff conduct.
                </li>
                <li>
                  Disputes should first be resolved between the involved
                  parties.
                </li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <h2 className="text-xl font-semibold">
                  8. Termination & Suspension
                </h2>
                <ul className="mt-3 text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>
                    Accounts may be suspended or terminated for violations of
                    these terms.
                  </li>
                  <li>Users may terminate their accounts at any time.</li>
                  <li>
                    Outstanding payments or obligations remain enforceable after
                    termination.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-card/70 p-6">
                <h2 className="text-xl font-semibold">
                  9. Liability Limitation
                </h2>
                <p className="text-sm text-muted-foreground mt-2 mb-2">
                  FitnessGH is not responsible for:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Injuries sustained at gyms.</li>
                  <li>Losses due to service interruptions.</li>
                  <li>Third-party actions (vendors, gyms, staff).</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3">
                  Use of the platform is at your own risk.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <h2 className="text-xl font-semibold">10. Updates to Terms</h2>
              <ul className="mt-3 text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>These Terms may be updated periodically.</li>
                <li>
                  Continued use of the platform constitutes acceptance of
                  updated terms.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <h2 className="text-xl font-semibold">11. Support & Questions</h2>
              <p className="text-sm text-muted-foreground mt-2">
                If you have any questions about these Terms, please contact
                support through the platform.
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
