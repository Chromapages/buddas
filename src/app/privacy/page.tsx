import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Budda's Hawaiian Bakery & Grill",
  description:
    "Privacy policy for Budda's Hawaiian Bakery & Grill.",
};

export default function PrivacyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-110px] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,var(--highlight)_0%,transparent_60%)] opacity-55" />
        <div className="absolute -bottom-28 right-[-140px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_62%)] opacity-40" />
      </div>

      <div className="relative mx-auto w-full max-w-md px-6 py-12">
        <nav aria-label="Back to home">
          <a
            href="/buddas"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            ← Back to Budda&apos;s
          </a>
        </nav>

        <h1 className="mt-8 text-2xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-1 text-sm text-muted-foreground">Last updated: October 12, 2026</p>

        <div className="mt-8 space-y-6 text-sm text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-foreground">Information We Collect</h2>
            <p className="mt-2">
              We collect information you provide directly, such as when you place an order,
              sign up for our mailing list, or contact us. This may include your name, email
              address, phone number, and order details.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">How We Use Your Information</h2>
            <p className="mt-2">
              We use the information we collect to process orders, communicate with you about
              our products and promotions, and improve our services. We do not sell your
              personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">Cookies & Tracking</h2>
            <p className="mt-2">
              Our website may use cookies and similar tracking technologies to enhance your
              browsing experience. You can control cookie preferences through your browser
              settings.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">Third-Party Services</h2>
            <p className="mt-2">
              We may use third-party services such as Google Analytics and social media
              platforms. These services may collect information according to their own privacy
              policies.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">Data Security</h2>
            <p className="mt-2">
              We implement reasonable security measures to protect your personal information.
              However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">Your Rights</h2>
            <p className="mt-2">
              You have the right to access, correct, or delete your personal information.
              Contact us at the email below to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">Contact Us</h2>
            <p className="mt-2">
              If you have questions about this privacy policy, please contact us at{" "}
              <a href="mailto:buddasbakery@gmail.com" className="text-accent hover:underline">
                buddasbakery@gmail.com
              </a>
              .
            </p>
          </section>
        </div>

        <footer className="mt-12 text-center text-xs text-muted-foreground">
          <p>Budda&apos;s Hawaiian Bakery &amp; Grill · Pleasant Grove & Salt Lake City, UT</p>
        </footer>
      </div>
    </main>
  );
}

