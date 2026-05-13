/**
 * StaticPromoSection - Server Component
 * Renders the promo carousel statically without React hydration overhead.
 * This allows the LCP image to paint immediately without waiting for JS hydration.
 */

import Image from "next/image";
import { getBlurDataURL } from "@/lib/image-utils";

export type PromoSlide = {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  badge?: string;
  url?: string;
};

type StaticPromoSectionProps = {
  promoSlides: PromoSlide[];
  brandName: string;
};

export function StaticPromoSection({ promoSlides, brandName }: StaticPromoSectionProps) {
  return (
    <section className="mt-6">
      <div className="flex items-end justify-between mb-3">
        <h2 className="text-base font-semibold tracking-tight">Today&apos;s specials</h2>
        <span className="text-xs font-medium" style={{ color: '#5a3d25' }}>Swipe</span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 pr-4 pl-1 -mx-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
        {promoSlides.map((slide, i) => (
          <div key={`slide-${i}`} className="min-w-[88%] snap-center">
            <article className="w-full h-full overflow-hidden rounded-3xl bg-card ring-1 ring-border shadow-lg">
              <div className="relative h-44">
                {slide.imageUrl ? (
                  <Image
                    src={slide.imageUrl}
                    alt={slide.subtitle ? `${slide.title} — ${slide.subtitle}` : slide.title}
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
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-amber-50" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {slide.badge ? (
                  <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-black ring-1 ring-black/20">
                    {slide.badge}
                  </div>
                ) : null}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold leading-tight">{slide.title}</h3>
                {slide.subtitle ? (
                  <p className="mt-1 text-sm text-stone-600 line-clamp-2">
                    {slide.subtitle}
                  </p>
                ) : null}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}