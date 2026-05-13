import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Budda&apos;s Hawaiian Bakery &amp; Grill",
  description:
    "Terms of service for Budda&apos;s Hawaiian Bakery &amp; Grill. Please read these terms carefully before using our services.",
};

export default function TermsPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-110px] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,var(--highlight)_0%,transparent_60%)] opacity-55" />
        <div className="absolute -bottom-28 right-[-140px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_62%)] opacity-40" />
      </div>

      <div className="relative mx-auto w-full max-w-md px-6 py-12">
        <nav aria-label="Back to home">
          <a
            href="/buddas"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            ← Back to Budda&apos;s
          </a>
        </nav>

        <h1 className="mt-8 text-2xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-1 text-sm text-muted-foreground">Last updated: May 13, 2026</p>

        <div className="mt-8 space-y-6 text-sm text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-foreground">Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing or using Budda&apos;s Hawaiian Bakery &amp; Grill&apos;s website and services,
              you agree to be bound by these Terms of Service. If you do not agree, please
              do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">Online Ordering</h2>
            <p className="mt-2">
              Orders placed through our website are subject to availability. We reserve the
              right to cancel or refuse any order at our discretion. Prices and menu items
              are subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">Catering Services</h2>
            <p className="mt-2">
              Catering orders require advance notice and are subject to availability.
              Cancellation policies apply — please contact us for details.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">Intellectual Property</h2>
            <p className="mt-2">
              All content on this website, including text, images, logos, and designs, is
              the property of Budda&apos;s Hawaiian Bakery &amp; Grill and may not be reproduced
              without permission.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">Limitation of Liability</h2>
            <p className="mt-2">
              Budda&apos;s Hawaiian Bakery &amp; Grill is not liable for any damages arising from
              the use of our website or services beyond the extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">Governing Law</h2>
            <p className="mt-2">
              These terms are governed by the laws of the State of Hawaii. Any disputes
              shall be resolved in the courts of Honolulu, Hawaii.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">Changes to Terms</h2>
            <p className="mt-2">
              We may update these terms from time to time. Continued use of our services
              after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">Contact Us</h2>
            <p className="mt-2">
              Questions about these terms? Contact us at{" "}
              <a href="mailto:info@buddashawaiian.com" className="text-accent hover:underline">
                info@buddashawaiian.com
              </a>
              .
            </p>
          </section>
        </div>

        <footer className="mt-12 text-center text-xs text-muted-foreground">
          <p>Budda&apos;s Hawaiian Bakery &amp; Grill · Waipahu, HI</p>
        </footer>
      </div>
    </main>
  );
}