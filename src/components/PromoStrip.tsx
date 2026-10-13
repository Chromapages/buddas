"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { safeHref } from "@/lib/url-utils";

export function PromoStrip({ children, count, title = "Featured", seeAllUrl, compact = false, kind = "promotion", headerLink }: {
  children: ReactNode; count: number; title?: ReactNode; seeAllUrl?: string; compact?: boolean;
  kind?: "promotion" | "location"; headerLink?: ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const isLocations = kind === "location";
  const trackId = isLocations ? "location-cards" : "promotions";
  const headingId = isLocations ? "locations-heading" : "promotions-heading";
  const itemLabel = isLocations ? "Location" : "Promotion";
  function goTo(index: number) {
    const element = scrollRef.current;
    const slide = element?.children[index] as HTMLElement | undefined;
    if (!element || !slide) return;
    element.scrollBy({ left: slide.getBoundingClientRect().left - element.getBoundingClientRect().left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  function scroll(direction: number) {
    if (compact) { goTo(Math.max(0, Math.min(count - 1, active + direction))); return; }
    const element = scrollRef.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth * 0.9, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  const previousControl = <button type="button" onClick={() => scroll(-1)} aria-label={`Previous ${kind}`} aria-controls={trackId}><ChevronLeft aria-hidden="true" size={20} /></button>;
  const nextControl = <button type="button" onClick={() => scroll(1)} aria-label={`Next ${kind}`} aria-controls={trackId}><ChevronRight aria-hidden="true" size={20} /></button>;
  const controls = count > 1 && <div className="promo-controls">{previousControl}{nextControl}</div>;
  return <section id={isLocations ? "locations" : undefined} className={`profile-section${isLocations ? " reference-locations-carousel" : compact ? " reference-promotions" : ""}`} aria-labelledby={headingId}>
    <div className={`promo-heading${isLocations ? " reference-section-heading" : ""}`}><h2 id={headingId}>{title}</h2>{headerLink ?? (safeHref(seeAllUrl) && <a href={safeHref(seeAllUrl)} className="reference-section-link">See all specials<ArrowRight size={15} aria-hidden="true" /></a>)}{!compact && controls}</div>
    <div id={trackId} className={`promo-strip${isLocations ? " reference-locations" : ""}${count === 1 ? " single-promo" : ""}`} ref={scrollRef} onScroll={compact ? () => {
      const element = scrollRef.current;
      if (!element) return;
      const left = element.getBoundingClientRect().left;
      let nearest = 0;
      let distance = Infinity;
      Array.from(element.children).forEach((slide, index) => {
        const next = Math.abs(slide.getBoundingClientRect().left - left);
        if (next < distance) { nearest = index; distance = next; }
      });
      setActive(nearest);
    } : undefined} tabIndex={count > 1 ? 0 : undefined} role="region" aria-label={isLocations ? "Restaurant locations" : "Featured promotions"}>{children}</div>
    {compact && count > 1 && <div className="reference-promo-navigation">{previousControl}<div className="reference-promo-dots" style={{ "--promo-dot-count": count } as CSSProperties}>{Array.from({ length: count }, (_, index) => <button key={index} type="button" aria-label={`Show ${kind} ${index + 1}`} aria-current={active === index ? "true" : undefined} aria-controls={trackId} onClick={() => goTo(index)} style={{ "--promo-dot-index": index } as CSSProperties}><span /></button>)}</div>{nextControl}<span className="sr-only" aria-live="polite">{itemLabel} {active + 1} of {count}</span></div>}
  </section>;
}
