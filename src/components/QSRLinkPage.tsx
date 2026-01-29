"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, BookOpen, ExternalLink, ShoppingBag, Star } from "lucide-react";

import { cn } from "@/lib/cn";

// Mobile-first “Linktree-style” landing page for a QSR.
// Designed to be used as a standalone page component in Next.js.

export type PromoSlide = {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  badge?: string;
  url?: string;
};

export type LinkItem = {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  emphasize?: boolean;
};

export function QSRLinkPage(props: {
  brandName: string;
  tagline?: string;
  logoUrl?: string;
  promoSlides: PromoSlide[];
  links: LinkItem[];
  googleReviewUrl: string;
  orderUrl?: string;
  menuUrl?: string;
  header?: React.ReactNode;
  showBrandHeader?: boolean;
  linksSectionId?: string;
}) {
  const {
    brandName,
    tagline,
    logoUrl,
    promoSlides,
    links,
    googleReviewUrl,
    orderUrl,
    menuUrl,
    header,
    showBrandHeader = true,
    linksSectionId = "buddas-links",
  } = props;

  const normalizeHref = (href?: string) => {
    if (!href) return { href: "#", disabled: true };
    if (href === "#") return { href, disabled: true };
    if (href.startsWith("PASTE_")) return { href: "#", disabled: true };
    return { href, disabled: false };
  };

  const externalAttrs = (href: string) =>
    href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};

  const normalizedReview = normalizeHref(googleReviewUrl);
  const normalizedMenu = normalizeHref(menuUrl);
  const normalizedOrder = normalizeHref(orderUrl);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (isPaused || promoSlides.length <= 1) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      const slideWidth = el.offsetWidth * 0.88 + 16; // 88% width + 16px gap
      const maxScroll = el.scrollWidth - el.offsetWidth;

      let nextScroll = el.scrollLeft + slideWidth;
      if (nextScroll >= maxScroll + 10) {
        nextScroll = 0; // Loop back to start
      }

      el.scrollTo({
        left: nextScroll,
        behavior: "smooth"
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, promoSlides.length]);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-110px] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,var(--highlight)_0%,transparent_60%)] opacity-55" />
        <div className="absolute -bottom-28 right-[-140px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_62%)] opacity-40" />
      </div>

      {header}

      <div
        className={cn(
          "relative mx-auto w-full max-w-md px-4 pb-12",
          header ? "pt-6" : "pt-8"
        )}
      >
        {showBrandHeader ? (
          <header className="flex flex-col items-center text-center aloha-reveal">
            <div className="relative mb-10 mt-4 h-32 w-full max-w-[280px] sm:max-w-[320px]">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={`${brandName} logo`}
                  fill
                  className="object-contain"
                  priority
                />
              ) : null}
            </div>

            <h1 className="text-2xl font-semibold tracking-tight">{brandName}</h1>
            {tagline ? (
              <p className="mt-1 text-sm font-medium text-muted-foreground">{tagline}</p>
            ) : null}
          </header>
        ) : null}

        <section
          className={cn("aloha-reveal", showBrandHeader ? "mt-9" : "mt-2")}
          style={{ animationDelay: "80ms" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
        >
          <div className="flex items-end justify-between">
            <h2 className="text-base font-semibold tracking-tight">Today&apos;s specials</h2>
            <span className="text-xs font-medium text-muted-foreground">Swipe</span>
          </div>

          <div
            ref={scrollRef}
            className="mt-3 flex gap-4 overflow-x-auto pb-4 pr-4 pl-1 -mx-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
          >
            {promoSlides.map((s, i) => {
              const content = (
                <article
                  className="w-full h-full overflow-hidden rounded-3xl bg-card ring-1 ring-border shadow-[0_18px_50px_rgba(90,58,31,0.12)] active:scale-[0.99] transition-transform"
                >
                  <div className="relative h-44">
                    {s.imageUrl ? (
                      <Image
                        src={s.imageUrl}
                        alt={s.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 430px) 88vw, 430px"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--highlight)_0%,transparent_60%)]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_oklab,var(--foreground)_18%,transparent)] via-transparent to-transparent" />

                    {s.badge ? (
                      <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-highlight px-2.5 py-1 text-[11px] font-semibold tracking-wide text-foreground ring-1 ring-border">
                        {s.badge}
                      </div>
                    ) : null}
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold leading-tight">{s.title}</h3>
                    {s.subtitle ? (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {s.subtitle}
                      </p>
                    ) : null}
                  </div>
                </article>
              );

              return (
                <div key={`${s.title}-${i}`} className="min-w-[88%] snap-center">
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noreferrer" className="block w-full h-full">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-7 aloha-reveal" style={{ animationDelay: "140ms" }}>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={normalizedMenu.href}
              aria-disabled={normalizedMenu.disabled || undefined}
              className={cn(
                "group flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-semibold ring-1 ring-border shadow-[0_10px_24px_rgba(90,58,31,0.10)] transition-transform",
                normalizedMenu.disabled
                  ? "bg-muted text-muted-foreground pointer-events-none"
                  : "bg-card text-foreground active:scale-[0.99]"
              )}
              {...externalAttrs(normalizedMenu.href)}
            >
              <BookOpen className="h-5 w-5 text-accent" />
              Full Menu
              {!normalizedMenu.disabled ? <ExternalLink className="h-4 w-4 opacity-50" /> : null}
            </a>

            <a
              href={normalizedReview.href}
              aria-disabled={normalizedReview.disabled || undefined}
              className={cn(
                "group flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-semibold ring-1 ring-border shadow-[0_10px_24px_rgba(90,58,31,0.10)] transition-transform",
                normalizedReview.disabled
                  ? "bg-muted text-muted-foreground pointer-events-none"
                  : "bg-card text-foreground active:scale-[0.99]"
              )}
              {...externalAttrs(normalizedReview.href)}
            >
              <Star className="h-5 w-5 text-accent" />
              Review
              {!normalizedReview.disabled ? <ExternalLink className="h-4 w-4 opacity-50" /> : null}
            </a>
          </div>

          {normalizedOrder.disabled || normalizedReview.disabled ? (
            <p className="mt-2 text-xs font-medium text-muted-foreground">
              Add your real links in `src/app/buddas/page.tsx`.
            </p>
          ) : null}
        </section>

        <section
          id={linksSectionId}
          className="mt-6 space-y-3 aloha-reveal"
          style={{ animationDelay: "200ms" }}
        >
          {links.map((l, idx) => {
            const normalized = normalizeHref(l.href);

            return (
              <a
                key={`${l.label}-${idx}`}
                href={normalized.href}
                aria-disabled={normalized.disabled || undefined}
                className={cn(
                  "group flex items-center gap-4 rounded-2xl border border-accent bg-card/70 px-5 py-4 shadow-[0_10px_24px_rgba(90,58,31,0.08)] transition-transform",
                  normalized.disabled
                    ? "opacity-60 pointer-events-none"
                    : "active:scale-[0.99]"
                )}
                {...externalAttrs(normalized.href)}
              >
                {l.icon ? (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-accent">
                    {l.icon}
                  </div>
                ) : null}

                <div className="min-w-0 flex-1">
                  <div className="text-base font-semibold leading-tight text-accent">
                    {l.label}
                  </div>
                  {l.description ? (
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {l.description}
                    </div>
                  ) : null}
                </div>

                <ArrowRight className="h-4 w-4 text-accent opacity-60" />
              </a>
            );
          })}
        </section>

        <footer className="mt-10 flex flex-col items-center gap-4 text-center aloha-reveal" style={{ animationDelay: "260ms" }}>
          <div className="h-px w-14 bg-border" />
          <div className="w-full rounded-2xl bg-footer px-4 py-4 text-background shadow-[0_14px_34px_rgba(14,59,51,0.22)]">
            <p className="text-xs font-semibold tracking-wide">Local favorites. Baked fresh daily.</p>
            <p className="mt-1 text-[11px] opacity-80">Mahalo for supporting a family spot.</p>
          </div>
          {/* Spacer for sticky bottom button */}
          <div className="h-20 sm:hidden" />
        </footer>
      </div>

      {/* Sticky Bottom CTA for Mobile */}
      {!normalizedOrder.disabled && (
        <div className="fixed bottom-0 inset-x-0 z-40 p-4 sm:hidden pointer-events-none">
          <div className="mx-auto max-w-md w-full pointer-events-auto">
            <a
              href={normalizedOrder.href}
              className="flex items-center justify-center gap-2 rounded-2xl bg-accent text-accent-foreground px-4 py-4 text-base font-bold shadow-[0_8px_32px_rgba(84,191,165,0.4)] ring-1 ring-accent/30 backdrop-blur-md active:scale-[0.98] transition-all"
              {...externalAttrs(normalizedOrder.href)}
            >
              <ShoppingBag className="h-5 w-5" />
              Order Now
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
