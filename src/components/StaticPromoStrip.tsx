"use client";

import * as React from "react";
import { useCallback, useState, useRef, useEffect } from "react";

type PromoSlide = {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  badge?: string;
  url?: string;
};

// StaticPromoStrip renders the promo section as pure HTML
// This allows LCP to happen before any React hydration
export function StaticPromoStrip({
  promoSlides,
  brandName,
  onPromoClick,
}: {
  promoSlides: PromoSlide[];
  brandName: string;
  onPromoClick?: (title: string, url?: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || promoSlides.length <= 1) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      const slideWidth = el.offsetWidth * 0.88 + 16;
      const maxScroll = el.scrollWidth - el.offsetWidth;

      let nextScroll = el.scrollLeft + slideWidth;
      if (nextScroll >= maxScroll + 10) {
        nextScroll = 0;
      }

      el.scrollTo({ left: nextScroll, behavior: "smooth" });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, promoSlides.length]);

  return (
    <section
      className="mt-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
    >
      <div className="flex items-end justify-between mb-3">
        <h2 className="text-base font-semibold tracking-tight">Today&apos;s specials</h2>
        <span className="text-xs font-medium" style={{ color: '#5a3d25' }}>Swipe</span>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 pr-4 pl-1 -mx-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
      >
        {promoSlides.map((s, i) => (
          <div key={`slide-${i}`} className="min-w-[88%] snap-center">
            <article
              className="w-full h-full overflow-hidden rounded-3xl active:scale-[0.99] transition-all duration-200 ease-out cursor-pointer"
              style={{ backgroundColor: 'var(--color-canvas-parchment)' }}
              onClick={() => onPromoClick?.(s.title, s.url)}
            >
              <div className="relative h-44">
                {s.imageUrl ? (
                  <img
                    src={s.imageUrl}
                    alt={s.subtitle ? `${s.title} — ${s.subtitle}` : s.title}
                    className="object-cover w-full h-full"
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "low"}
                    decoding="async"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {s.badge && (
                  <div className="absolute left-4 top-4 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white"
                    style={{ backgroundColor: 'var(--color-primary)' }}>
                    {s.badge}
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold leading-tight">{s.title}</h3>
                {s.subtitle && (
                  <p className="mt-1 text-sm text-stone-600 line-clamp-2">{s.subtitle}</p>
                )}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}