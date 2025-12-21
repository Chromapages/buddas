import Link from "next/link";
import { Gift, ShoppingBag, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HomeCtaSectionProps {
  orderingUrl?: string;
  hasRewards?: boolean;
  highlightKey?: "order" | "rewards";
}

interface HomeCtaCard {
  key: "order" | "rewards";
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  href?: string;
  isAvailable: boolean;
  Icon: typeof Gift;
  meta?: string;
}

export const HomeCtaSection = ({
  orderingUrl,
  hasRewards = true,
  highlightKey = "order",
}: HomeCtaSectionProps) => {
  const cards: HomeCtaCard[] = [
    {
      key: "order",
      eyebrow: "Everyday cravings",
      title: "Order fresh from the grill",
      description: "Skip the line and grab plates, pastries, and more.",
      ctaLabel: "Start an order",
      href: orderingUrl || "/order",
      isAvailable: true,
      Icon: ShoppingBag,
      meta: "Ready in ~15 minutes",
    },
    {
      key: "rewards",
      eyebrow: "Loyalty pays",
      title: "Join Buddas Rewards",
      description: "Earn points every visit and unlock exclusive treats.",
      ctaLabel: hasRewards ? "Join rewards" : "Rewards coming soon",
      href: hasRewards ? "/rewards" : undefined,
      isAvailable: hasRewards,
      Icon: Gift,
      meta: "Free plate on your birthday",
    },
  ];

  return (
    <section
      className="bg-[#1C5F56] py-12 text-buddas-cream md:py-16"
      aria-labelledby="home-cta-heading"
      role="region"
    >
      <div className="container mx-auto grid items-start gap-8 px-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-buddas-gold/80">
            For cravings & loyalty
          </p>
          <h2
            id="home-cta-heading"
            className="font-display text-[2.2rem] leading-tight md:text-[2.6rem]"
          >
            Two ways to bring Aloha to the table.
          </h2>
          <p className="max-w-md text-sm text-buddas-cream/80">
            Whether you're grabbing a quick plate or stacking up rewards, start
            from the path that fits your moment.
          </p>
          <dl className="mt-3 grid gap-3 text-sm text-buddas-cream/80 sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-buddas-cream">Same-day pickup</dt>
              <dd>Order online and we'll fire it fresh before you arrive.</dd>
            </div>
            <div>
              <dt className="font-semibold text-buddas-cream">Easy to customize</dt>
              <dd>Add notes, swap sides, and save your go-to order in minutes.</dd>
            </div>
          </dl>
        </div>

        <div className="grid gap-3 md:gap-4 lg:grid-cols-2" role="list">
          {cards.map((card) => {
            const isHighlighted = highlightKey === card.key;

            return (
              <article
                key={card.key}
                role="listitem"
                tabIndex={0}
                aria-label={card.title}
                className={cn(
                  "group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm transition hover:-translate-y-[3px] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-buddas-gold md:p-5",
                  {
                    "ring-2 ring-buddas-gold": isHighlighted,
                  }
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-buddas-cream/10 text-buddas-gold shadow-sm">
                    <card.Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-buddas-cream/70">
                      {card.eyebrow}
                    </p>
                    <h3 className="font-display text-[1.35rem] text-buddas-cream">
                      {card.title}
                    </h3>
                    <p className="text-sm text-buddas-cream/80">{card.description}</p>
                    {card.meta && (
                      <p className="text-xs font-medium text-buddas-gold/80">
                        {card.meta}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  {card.isAvailable && card.href ? (
                    <Button
                      asChild
                      size="lg"
                      className={cn(
                        "w-full rounded-full text-sm font-semibold md:w-auto",
                        card.key === "order"
                          ? "bg-buddas-gold text-buddas-dark hover:bg-buddas-gold/90"
                          : "bg-buddas-cream text-buddas-brown hover:bg-buddas-cream/90"
                      )}
                      aria-label={`${card.title} – ${card.ctaLabel}`}
                    >
                      <Link href={card.href}>{card.ctaLabel}</Link>
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      className="w-full rounded-full border-white/30 bg-transparent text-sm text-buddas-cream/60 hover:bg-white/5"
                      variant="outline"
                      disabled
                      aria-disabled
                    >
                      {card.ctaLabel}
                    </Button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
