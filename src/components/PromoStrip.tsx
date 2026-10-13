"use client";

import { useRef, useState, type ReactNode } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { safeHref } from "@/lib/url-utils";

export function PromoStrip({ children, count, title = "Featured", seeAllUrl, compact = false }: {
  children: ReactNode; count: number; title?: string; seeAllUrl?: string; compact?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
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
  const controls = count > 1 && <div className="promo-controls">
      <button type="button" onClick={() => scroll(-1)} aria-label="Previous promotion" aria-controls="promotions"><ChevronLeft aria-hidden="true" size={20} /></button>
      <button type="button" onClick={() => scroll(1)} aria-label="Next promotion" aria-controls="promotions"><ChevronRight aria-hidden="true" size={20} /></button>
    </div>;
  return <section className={`profile-section${compact ? " reference-promotions" : ""}`} aria-labelledby="promotions-heading">
    <div className="promo-heading"><h2 id="promotions-heading">{title}</h2>{safeHref(seeAllUrl) && <a href={safeHref(seeAllUrl)} className="reference-section-link">See all specials<ArrowRight size={15} aria-hidden="true" /></a>}{!compact && controls}</div>
    <div id="promotions" className={`promo-strip${count === 1 ? " single-promo" : ""}`} ref={scrollRef} onScroll={compact ? () => {
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
    } : undefined} tabIndex={count > 1 ? 0 : undefined} role="region" aria-label="Featured promotions">{children}</div>
    {compact && count > 1 && <div className="reference-promo-navigation">{controls}<div className="reference-promo-dots">{Array.from({ length: count }, (_, index) => <button key={index} type="button" aria-label={`Show promotion ${index + 1}`} aria-current={active === index ? "true" : undefined} aria-controls="promotions" onClick={() => goTo(index)}><span /></button>)}</div><span className="sr-only" aria-live="polite">Promotion {active + 1} of {count}</span></div>}
  </section>;
}
