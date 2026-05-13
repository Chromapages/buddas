"use client";

import * as React from "react";
import { useCallback } from "react";
import Image from "next/image";
import { ArrowRight, BookOpen, ExternalLink, ShoppingBag, Star, MapPin, Phone, Clock, ChefHat, Quote, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/cn";
import { getBlurDataURL } from "@/lib/image-utils";
import {
  trackLinkClick,
  trackMenuTap,
  trackOrderTap,
  trackPromoTap,
  trackReviewTap,
} from "@/lib/analytics";

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

export type Testimonial = {
  name: string;
  quote: string;
  rating?: number;
  source?: string;
};

export type GalleryImage = {
  imageUrl: string;
  caption?: string;
};

export type StorySection = {
  headline?: string;
  body?: string;
  imageUrl?: string;
  imageCaption?: string;
};

export type VisitSection = {
  address?: string;
  hoursFull?: string;
  phone?: string;
  mapImageUrl?: string;
  directionsUrl?: string;
};

export type CateringSection = {
  headline?: string;
  description?: string;
  imageUrl?: string;
  ctaLabel?: string;
  ctaUrl?: string;
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
  // New sections
  storySection?: StorySection;
  testimonials?: Testimonial[];
  galleryImages?: GalleryImage[];
  visitSection?: VisitSection;
  cateringSection?: CateringSection;
  // Loading state
  isLoading?: boolean;
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
    // New sections
    storySection,
    testimonials,
    galleryImages,
    visitSection,
    cateringSection,
  } = props;

  const ALLOWED_PROTOCOLS = ["http:", "https:", "mailto:", "tel:"];

  const normalizeHref = (href?: string) => {
    if (!href) return { href: "#", disabled: true };
    if (href === "#") return { href, disabled: true };
    if (href.startsWith("PASTE_")) return { href: "#", disabled: true };

    const trimmed = href.trim().toLowerCase();
    if (
      trimmed.startsWith("javascript:") ||
      trimmed.startsWith("data:") ||
      trimmed.startsWith("vbscript:")
    ) {
      return { href: "#", disabled: true };
    }

    try {
      const url = new URL(href);
      if (!ALLOWED_PROTOCOLS.includes(url.protocol)) {
        return { href: "#", disabled: true };
      }
      return { href, disabled: false };
    } catch {
      return { href: "#", disabled: true };
    }
  };

  const externalAttrs = (href: string) => {
    try {
      const url = new URL(href);
      if (url.protocol === "http:" || url.protocol === "https:") {
        return { target: "_blank", rel: "noreferrer" };
      }
    } catch {
      // invalid URL
    }
    return {};
  };

  const normalizedReview = normalizeHref(googleReviewUrl);
  const normalizedMenu = normalizeHref(menuUrl);
  const normalizedOrder = normalizeHref(orderUrl);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  const handlePromoTap = useCallback((title: string, url?: string) => {
    trackPromoTap({ title, url });
  }, []);

  const handleLinkClick = useCallback((label: string, href: string) => {
    trackLinkClick({ label, href });
  }, []);

  const handleMenuTap = useCallback(() => {
    trackMenuTap();
  }, []);

  const handleReviewTap = useCallback(() => {
    trackReviewTap();
  }, []);

  const handleOrderTap = useCallback(() => {
    trackOrderTap();
  }, []);

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
      
      {header}

      <div
        className={cn(
          "relative mx-auto w-full max-w-md px-4 pb-12",
          header ? "pt-6" : "pt-8"
        )}
      >
        {showBrandHeader ? (
          <header className="flex flex-col items-center text-center aloha-reveal">
            <div className="relative mb-8 mt-4 h-28 w-full max-w-[280px]">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={`${brandName} logo`}
                  fill
                  className="object-contain"
                  priority
                  placeholder="blur"
                  blurDataURL={getBlurDataURL(280, 112)}
                />
              ) : null}
            </div>
            <h1
              className="text-[40px] font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: 0 }}
            >
              {brandName}
            </h1>
            {tagline ? (
              <p
                className="mt-2 text-[17px] font-normal"
                style={{ color: 'var(--color-ink-muted-80)', letterSpacing: '-0.374px' }}
              >
                {tagline}
              </p>
            ) : null}
          </header>
        ) : null}

        <section
          className={cn("aloha-reveal", showBrandHeader ? "mt-12" : "mt-2")}
          style={{ animationDelay: "80ms" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
        >
          <div className="flex items-end justify-between">
            <h2 className="text-base font-semibold tracking-tight">Today&apos;s specials</h2>
            <span className="text-xs font-medium" style={{ color: '#5a3d25' }}>Swipe</span>
          </div>

          <div
            ref={scrollRef}
            className="mt-3 flex gap-4 overflow-x-auto pb-4 pr-4 pl-1 -mx-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
          >
            {!promoSlides || promoSlides.length === 0 ? (
              <div className="min-w-[88%] snap-center">
                <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-[var(--radius-3xl)] px-6 py-8 text-center" style={{ backgroundColor: 'var(--color-canvas-parchment)' }}>
                  <p className="text-base font-medium" style={{ color: 'var(--color-ink-muted-80)' }}>
                    No specials today — check back soon!
                  </p>
                </div>
              </div>
            ) : (
              promoSlides.map((s, i) => {
                const content = (
                  <article
                    className="w-full h-full overflow-hidden rounded-[var(--radius-3xl)] hover:shadow-[var(--shadow-product)] focus-within:shadow-[var(--shadow-product)] active:scale-[0.99] transition-all duration-200 ease-out cursor-pointer"
                    style={{ backgroundColor: 'var(--color-canvas-parchment)' }}
                  >
                    <div className="relative h-44">
                      {s.imageUrl ? (
                        <Image
                          src={s.imageUrl}
                          alt={s.subtitle ? `${s.title} — ${s.subtitle}` : s.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 430px) 88vw, 430px"
                          priority={i === 0}
                          loading={i === 0 ? "eager" : "lazy"}
                          fetchPriority={i === 0 ? "high" : "low"}
                          placeholder="blur"
                          blurDataURL={getBlurDataURL(400, 220)}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--highlight)_0%,transparent_60%)]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_oklab,var(--foreground)_18%,transparent)] via-transparent to-transparent" />

                      {s.badge ? (
                        <div className="absolute left-4 top-4 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
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
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full h-full"
                        onClick={() => handlePromoTap(s.title, s.url)}
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section className="mt-12 aloha-reveal" style={{ animationDelay: "140ms" }}>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={normalizedMenu.href}
              aria-disabled={normalizedMenu.disabled || undefined}
              onClick={normalizedMenu.disabled ? undefined : handleMenuTap}
              className={cn(
                "flex items-center justify-center gap-2 rounded-full px-4 py-4 text-sm font-semibold transition-all duration-200 ease-out cursor-pointer",
                normalizedMenu.disabled
                  ? "bg-muted text-muted-foreground pointer-events-none"
                  : "active:scale-[0.95]"
              )}
              style={normalizedMenu.disabled ? {} : { backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
              {...externalAttrs(normalizedMenu.href)}
            >
              <BookOpen className="h-5 w-5" />
              Full Menu
            </a>

            <a
              href={normalizedReview.href}
              aria-disabled={normalizedReview.disabled || undefined}
              onClick={normalizedReview.disabled ? undefined : handleReviewTap}
              className={cn(
                "flex items-center justify-center gap-2 rounded-full px-4 py-4 text-sm font-semibold transition-all duration-200 ease-out cursor-pointer",
                normalizedReview.disabled
                  ? "bg-muted text-muted-foreground pointer-events-none"
                  : "active:scale-[0.95]"
              )}
              style={normalizedReview.disabled ? {} : { backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
              {...externalAttrs(normalizedReview.href)}
            >
              <Star className="h-5 w-5" />
              Review
            </a>
          </div>

          {normalizedOrder.disabled || normalizedReview.disabled ? (
            <p className="mt-2 text-xs font-medium" style={{ color: '#5a3d25' }}>
              Add your real links in `src/app/buddas/page.tsx`.
            </p>
          ) : null}
        </section>

        <nav aria-label="Quick links" className="mt-12 space-y-3 aloha-reveal" style={{ animationDelay: "200ms" }}>
          {!links || links.length === 0 ? (
            <div className="rounded-[var(--radius-3xl)] px-6 py-8 text-center" style={{ backgroundColor: 'var(--color-canvas)' }}>
              <p className="text-base font-medium" style={{ color: 'var(--color-ink-muted-80)' }}>
                More coming soon — Mahalo for your patience!
              </p>
            </div>
          ) : (
            links.map((l, idx) => {
              const normalized = normalizeHref(l.href);

              return (
                <a
                  key={`${l.label}-${idx}`}
                  href={normalized.href}
                  aria-disabled={normalized.disabled || undefined}
                  onClick={normalized.disabled ? undefined : () => handleLinkClick(l.label, l.href)}
                  className={cn(
                    "group flex items-center gap-4 rounded-full px-5 py-4 cursor-pointer",
                    normalized.disabled
                      ? "opacity-60 pointer-events-none"
                      : "active:scale-[0.95] transition-all duration-200 ease-out"
                  )}
                  style={{
                    backgroundColor: l.emphasize ? 'var(--color-primary)' : 'var(--color-surface-pearl)',
                    color: l.emphasize ? 'var(--color-on-primary)' : 'var(--color-primary)'
                  }}
                  {...externalAttrs(normalized.href)}
                >
                  {l.icon ? (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: l.emphasize ? 'rgba(255,255,255,0.2)' : 'rgba(0,102,204,0.1)', color: l.emphasize ? 'var(--color-on-primary)' : 'var(--color-primary)' }}>
                      {l.icon}
                    </div>
                  ) : null}

                  <div className="min-w-0 flex-1">
                    <div className="text-base font-semibold leading-tight">
                      {l.label}
                    </div>
                    {l.description ? (
                      <div className="mt-0.5 text-xs opacity-80">
                        {l.description}
                      </div>
                    ) : null}
                  </div>

                  <ArrowRight className="h-4 w-4 opacity-60" />
                </a>
              );
            })
          )}
        </nav>

        {/* ── OUR STORY ── */}
        {storySection && (
          <section className="mt-10 aloha-reveal" style={{ animationDelay: "300ms" }}>
            <div className="rounded-[var(--radius-3xl)] overflow-hidden" style={{ backgroundColor: 'var(--color-surface-tile-1)' }}>
              {storySection.imageUrl && (
                <div className="relative h-56">
                  <Image
                    src={storySection.imageUrl}
                    alt={storySection.headline ?? brandName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 430px) 100vw, 430px"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL(800, 448)}
                    style={{ boxShadow: 'var(--shadow-product)' }}
                  />
                  {storySection.imageCaption ? (
                    <p className="absolute bottom-3 left-4 right-4 text-xs font-medium text-white/90">{storySection.imageCaption}</p>
                  ) : null}
                </div>
              )}
              <div className="px-5 py-6">
                {storySection.headline ? (
                  <h2 className="text-xl font-semibold tracking-tight text-white">{storySection.headline}</h2>
                ) : (
                  <h2 className="text-xl font-semibold tracking-tight text-white">Our Story</h2>
                )}
                {storySection.body ? (
                  <p className="mt-3 leading-relaxed text-sm text-white/80">{storySection.body}</p>
                ) : (
                  <p className="mt-3 leading-relaxed text-sm text-white/80">
                    Born from a love of Hawaiian home cooking, Budda&apos;s brings the warmth of the islands to every
                    plate. From slow-roasted kalua pork to light, fluffy chiffon cakes, we bake and cook with
                    aloha — the same way we always have.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── GALLERY ── */}
        {galleryImages && galleryImages.length > 0 && (
          <section className="mt-8 aloha-reveal" style={{ animationDelay: "340ms", backgroundColor: 'var(--color-canvas)' }}>
            <h2 className="text-base font-semibold tracking-tight mb-4">A taste of the islands</h2>
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.slice(0, 6).map((img, i) => (
                <div key={`gallery-${i}`} className="relative aspect-square rounded-[var(--radius-sm)] overflow-hidden" style={{ backgroundColor: 'var(--color-surface-pearl)' }}>
                  <Image
                    src={img.imageUrl}
                    alt={img.caption ?? `${brandName} gallery`}
                    fill
                    className="object-cover hover:scale-[1.04] focus-within:scale-[1.04] active:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 430px) 33vw, 120px"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL(300, 300)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── TESTIMONIALS ── */}
        {testimonials && testimonials.length > 0 && (
          <section className="mt-8 aloha-reveal" style={{ animationDelay: "380ms", backgroundColor: 'var(--color-canvas-parchment)' }}>
            <div className="grid gap-3">
              {testimonials.slice(0, 3).map((t, i) => (
                <div
                  key={`testimonial-${i}`}
                  className="rounded-[var(--radius-3xl)] p-5"
                  style={{ backgroundColor: 'var(--color-canvas)' }}
                >
                  <Quote className="h-5 w-5 mb-2" style={{ color: 'var(--color-primary)' }} />
                  <p className="text-sm leading-relaxed font-medium text-foreground">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-3 flex items-center gap-2">
                    {t.rating ? (
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star key={`star-${si}`} className="h-3.5 w-3.5" style={{ color: si < (t.rating ?? 0) ? 'var(--color-primary)' : 'var(--color-hairline)', fill: si < (t.rating ?? 0) ? 'var(--color-primary)' : 'var(--color-hairline)' }} />
                        ))}
                      </div>
                    ) : null}
                    <span className="text-xs font-semibold text-muted-foreground">{t.name}</span>
                    {t.source ? <span className="text-xs text-muted-foreground/60">via {t.source}</span> : null}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── VISIT US ── */}
        {visitSection && (
          <section className="mt-8 aloha-reveal" style={{ animationDelay: "420ms" }}>
            <div className="rounded-[var(--radius-3xl)] overflow-hidden" style={{ backgroundColor: 'var(--color-canvas)' }}>
              {visitSection.mapImageUrl && (
                <div className="relative h-40">
                  <Image
                    src={visitSection.mapImageUrl}
                    alt="Location map"
                    fill
                    className="object-cover"
                    sizes="(max-width: 430px) 100vw, 430px"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL(800, 320)}
                  />
                </div>
              )}
              <div className="px-5 py-5">
                <h2 className="text-base font-semibold tracking-tight mb-4">Visit Us</h2>
                <div className="space-y-3">
                  {visitSection.address ? (
                    <a href={visitSection.directionsUrl ?? "#"} target="_blank" rel="noreferrer" className="flex items-start gap-3 group">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: 'var(--color-surface-chip-translucent)', color: 'var(--color-primary)' }}>
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold group-hover:text-[var(--color-primary)] transition-colors" style={{ color: 'var(--color-primary)' }}>{visitSection.address}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted-80)' }}>Tap for directions</p>
                      </div>
                    </a>
                  ) : null}
                  {visitSection.hoursFull ? (
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: 'var(--color-surface-chip-translucent)', color: 'var(--color-primary)' }}>
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Hours</p>
                        <p className="text-xs mt-0.5 whitespace-pre-line" style={{ color: 'var(--color-ink-muted-80)' }}>{visitSection.hoursFull}</p>
                      </div>
                    </div>
                  ) : null}
                  {visitSection.phone ? (
                    <a href={`tel:${visitSection.phone}`} className="flex items-start gap-3 group">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: 'var(--color-surface-chip-translucent)', color: 'var(--color-primary)' }}>
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold group-hover:text-[var(--color-primary)] transition-colors" style={{ color: 'var(--color-primary)' }}>{visitSection.phone}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-muted-80)' }}>Call us directly</p>
                      </div>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── CATERING ── */}
        {cateringSection && (
          <section className="mt-8 aloha-reveal" style={{ animationDelay: "460ms" }}>
            <div className="rounded-[var(--radius-3xl)] overflow-hidden" style={{ backgroundColor: 'var(--color-surface-tile-1)' }}>
              {cateringSection.imageUrl && (
                <div className="relative h-48">
                  <Image
                    src={cateringSection.imageUrl}
                    alt="Catering"
                    fill
                    className="object-cover"
                    sizes="(max-width: 430px) 100vw, 430px"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL(800, 384)}
                    style={{ boxShadow: 'var(--shadow-product)' }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end px-5 pb-5">
                    <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 w-fit" style={{ backgroundColor: 'var(--color-primary)' }}>
                      <ChefHat className="h-3.5 w-3.5 text-white" />
                      <span className="text-[11px] font-semibold tracking-wide text-white">Catering</span>
                    </div>
                    {cateringSection.headline ? (
                      <h2 className="text-xl font-semibold text-white leading-tight">{cateringSection.headline}</h2>
                    ) : (
                      <h2 className="text-xl font-semibold text-white leading-tight">Bring Aloha to Your Event</h2>
                    )}
                  </div>
                </div>
              )}
              <div className="px-5 py-5">
                {cateringSection.description ? (
                  <p className="text-sm text-white/80 leading-relaxed">{cateringSection.description}</p>
                ) : (
                  <p className="text-sm text-white/80 leading-relaxed">
                    From corporate gatherings to family celebrations, Budda&apos;s catering brings the authentic
                    flavors of Hawaii to your occasion. Let us handle the food — you enjoy the company.
                  </p>
                )}
                {cateringSection.ctaLabel && (
                  <a
                    href={cateringSection.ctaUrl ?? "#"}
                    className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white active:scale-[0.95] transition-transform"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                    {...externalAttrs(cateringSection.ctaUrl ?? "#")}
                  >
                    {cateringSection.ctaLabel}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        <footer className="mt-10 flex flex-col items-center gap-4 text-center aloha-reveal" style={{ animationDelay: "500ms", backgroundColor: 'var(--color-canvas-parchment)' }}>
          <div className="h-px w-14" style={{ backgroundColor: 'var(--color-hairline)' }} />
          <div className="w-full rounded-[var(--radius-2xl)] px-4 py-4" style={{ backgroundColor: 'var(--color-surface-tile-1)' }}>
            <p className="text-xs font-semibold tracking-wide text-white">Local favorites. Baked fresh daily.</p>
            <p className="mt-1 text-[11px] text-white/80">Mahalo for supporting a family spot.</p>
          </div>
          <div className="flex gap-4 text-xs" style={{ color: 'var(--color-ink-muted-80)', lineHeight: 2.41 }}>
            <a href="/privacy" className="transition-colors">Privacy Policy</a>
            <span aria-hidden>·</span>
            <a href="/terms" className="transition-colors">Terms of Service</a>
          </div>
          {/* Spacer for sticky bottom button */}
          <div className="h-20 sm:hidden" />
        </footer>
      </div>

      {/* Sticky Bottom CTA for Mobile */}
      {!normalizedOrder.disabled && (
        <div className="fixed bottom-4 inset-x-0 z-40 px-4 pointer-events-none">
          <div className="mx-auto max-w-[400px] w-full pointer-events-auto">
            <a
              href={normalizedOrder.href}
              onClick={handleOrderTap}
              className="flex items-center justify-center gap-2 rounded-full py-4 text-[17px] font-normal text-white transition-transform active:scale-[0.95]"
              style={{
                backgroundColor: 'var(--color-primary)',
                fontFamily: "var(--font-body)",
                letterSpacing: '-0.374px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
              }}
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
