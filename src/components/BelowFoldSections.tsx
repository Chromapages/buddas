"use client";

import * as React from "react";
import Image from "next/image";
import { Quote, Star, MapPin, Phone, Clock, ArrowUpRight, ChefHat } from "lucide-react";

import { cn } from "@/lib/cn";
import { getBlurDataURL } from "@/lib/image-utils";

export type StorySection = {
  headline?: string;
  body?: string;
  imageUrl?: string;
  imageCaption?: string;
};

export type Testimonial = {
  name: string;
  quote: string;
  rating?: number;
  source?: string;
};

export type GalleryImage = {
  imageUrl?: string;
  caption?: string;
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

type BelowFoldSectionsProps = {
  brandName: string;
  storySection?: StorySection;
  galleryImages?: GalleryImage[];
  testimonials?: Testimonial[];
  visitSection?: VisitSection;
  cateringSection?: CateringSection;
};

function BelowFoldSections({
  brandName,
  storySection,
  galleryImages,
  testimonials,
  visitSection,
  cateringSection,
}: BelowFoldSectionsProps) {
  return (
    <>
      {/* ── OUR STORY ── */}
      {storySection && (
        <section className="mt-10 aloha-reveal" style={{ animationDelay: "300ms" }}>
          <div className="rounded-[var(--radius-3xl)] bg-card ring-1 ring-border shadow-[0_20px_60px_rgba(90,58,31,0.12)] overflow-hidden">
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
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,59,51,0.45)] via-transparent to-transparent" />
                {storySection.imageCaption ? (
                  <p className="absolute bottom-3 left-4 right-4 text-xs font-medium text-white/90">{storySection.imageCaption}</p>
                ) : null}
              </div>
            )}
            <div className="px-5 py-6">
              {storySection.headline ? (
                <h2 className="text-xl font-semibold tracking-tight text-foreground">{storySection.headline}</h2>
              ) : (
                <h2 className="text-xl font-semibold tracking-tight text-foreground">Our Story</h2>
              )}
              {storySection.body ? (
                <p className="mt-3 leading-relaxed text-sm text-muted-foreground">{storySection.body}</p>
              ) : (
                <p className="mt-3 leading-relaxed text-sm text-muted-foreground">
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
        <section className="mt-8 aloha-reveal" style={{ animationDelay: "340ms" }}>
          <h2 className="text-base font-semibold tracking-tight mb-4">A taste of the islands</h2>
          <div className="grid grid-cols-3 gap-2">
            {galleryImages.slice(0, 6).map((img, i) => (
              <div key={`gallery-${i}`} className="relative aspect-square rounded-[var(--radius-2xl)] overflow-hidden bg-muted shadow-[0_8px_24px_rgba(90,58,31,0.12)]">
                {img.imageUrl && (
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
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ── */}
      {testimonials && testimonials.length > 0 && (
        <section className="mt-8 aloha-reveal" style={{ animationDelay: "380ms" }}>
          <div className="grid gap-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <div
                key={`testimonial-${i}`}
                className="rounded-[var(--radius-2xl)] bg-card ring-1 ring-border p-5 shadow-[0_12px_32px_rgba(90,58,31,0.08)]"
              >
                <Quote className="h-5 w-5 text-accent mb-2" />
                <p className="text-sm leading-relaxed font-medium text-foreground">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-3 flex items-center gap-2">
                  {t.rating ? (
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={`star-${si}`} className={cn("h-3.5 w-3.5", si < (t.rating ?? 0) ? "text-highlight fill-highlight" : "text-border")} />
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
          <h2 className="text-base font-semibold tracking-tight mb-4">Find us</h2>
          <div className="rounded-[var(--radius-2xl)] bg-card ring-1 ring-border shadow-[0_16px_48px_rgba(90,58,31,0.10)] overflow-hidden">
            {visitSection.mapImageUrl && (
              <div className="relative h-48">
                <Image
                  src={visitSection.mapImageUrl}
                  alt="Map to Budda's Hawaiian Bakery"
                  fill
                  className="object-cover"
                  sizes="(max-width: 430px) 100vw, 430px"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={getBlurDataURL(800, 400)}
                />
              </div>
            )}
            <div className="divide-y divide-border/50 px-5 py-5">
              {visitSection.address ? (
                <a href={visitSection.directionsUrl ?? "#"} target="_blank" rel="noreferrer" className="flex items-start gap-3 group py-3">
                  <MapPin className="h-5 w-5 text-accent shrink-0" />
                  <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{visitSection.address}</p>
                </a>
              ) : null}
              {visitSection.hoursFull ? (
                <div className="flex items-start gap-3 py-3">
                  <Clock className="h-5 w-5 text-accent shrink-0" />
                  <p className="text-xs text-muted-foreground mt-0.5 whitespace-pre-line">{visitSection.hoursFull}</p>
                </div>
              ) : null}
              {visitSection.phone ? (
                <a href={`tel:${visitSection.phone}`} className="flex items-start gap-3 group py-3">
                  <Phone className="h-5 w-5 text-accent shrink-0" />
                  <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{visitSection.phone}</p>
                </a>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {/* ── CATERING ── */}
      {cateringSection && (
        <section className="mt-8 aloha-reveal" style={{ animationDelay: "460ms" }}>
          <div className="relative overflow-hidden rounded-[var(--radius-3xl)] bg-accent shadow-[0_24px_64px_rgba(84,191,165,0.25)]">
            {cateringSection.imageUrl && (
              <div className="absolute inset-0">
                <Image
                  src={cateringSection.imageUrl}
                  alt={cateringSection.headline ?? "Catering"}
                  fill
                  className="object-cover opacity-25"
                  sizes="(max-width: 430px) 100vw, 430px"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={getBlurDataURL(800, 500)}
                />
              </div>
            )}
            <div className="relative px-6 py-8">
              <ChefHat className="h-8 w-8 text-accent-foreground/80 mb-3" />
              {cateringSection.headline ? (
                <h2 className="text-xl font-semibold text-white leading-tight">{cateringSection.headline}</h2>
              ) : (
                <h2 className="text-xl font-semibold text-white leading-tight">Bring Aloha to Your Event</h2>
              )}
              {cateringSection.description ? (
                <p className="mt-3 text-sm text-white/80 leading-relaxed">{cateringSection.description}</p>
              ) : (
                <p className="mt-3 text-sm text-white/80 leading-relaxed">
                  From corporate gatherings to family celebrations, Budda&apos;s catering brings the authentic
                  flavors of Hawaii to your occasion. Let us handle the food — you enjoy the company.
                </p>
              )}
              {cateringSection.ctaLabel && (
                <a
                  href={cateringSection.ctaUrl ?? "#"}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent-foreground px-4 py-3 text-sm font-bold text-accent shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:scale-[1.02] focus-visible:scale-[1.02] active:scale-[0.98] transition-transform"
                  target="_blank"
                  rel="noreferrer"
                >
                  {cateringSection.ctaLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default BelowFoldSections;