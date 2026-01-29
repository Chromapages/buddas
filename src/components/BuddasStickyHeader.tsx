"use client";

import * as React from "react";
import Image from "next/image";
import { MapPin, Share2, ShoppingBag } from "lucide-react";

import { cn } from "@/lib/cn";

type Props = {
  brandName: string;
  logoUrl?: string;
  subline?: string;
  orderUrl?: string;
  googleMapsUrl?: string;
  hoursText?: string;
  isOpenNow?: boolean;
  linksAnchorId?: string;
};

function normalizeHref(href?: string) {
  if (!href) return { href: "#", disabled: true };
  if (href === "#") return { href, disabled: true };
  if (href.startsWith("PASTE_")) return { href: "#", disabled: true };
  return { href, disabled: false };
}

function externalAttrs(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};
}

export function BuddasStickyHeader({
  brandName,
  logoUrl,
  subline = "Bakery & Grill - Order online",
  orderUrl,
  googleMapsUrl,
  hoursText = "Today 8am-8pm",
  isOpenNow = true,
  linksAnchorId = "buddas-links",
}: Props) {
  const [compact, setCompact] = React.useState(false);
  const [expandedH, setExpandedH] = React.useState<number | null>(null);
  const [compactH, setCompactH] = React.useState<number | null>(null);
  const expandedMeasureRef = React.useRef<HTMLDivElement | null>(null);
  const compactMeasureRef = React.useRef<HTMLDivElement | null>(null);

  const normalizedOrder = normalizeHref(orderUrl);
  const normalizedMaps = normalizeHref(googleMapsUrl);

  React.useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const measure = () => {
      const eh = expandedMeasureRef.current?.getBoundingClientRect().height;
      const ch = compactMeasureRef.current?.getBoundingClientRect().height;
      if (typeof eh === "number" && eh > 0) setExpandedH(Math.round(eh));
      if (typeof ch === "number" && ch > 0) setCompactH(Math.round(ch));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const spacerH = compact ? compactH ?? 92 : expandedH ?? 156;

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: brandName,
          text: `Check out ${brandName}: ${subline}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <div className="relative">
      <div
        aria-hidden
        className="transition-[height] duration-200"
        style={{ height: spacerH }}
      />

      <div className="fixed inset-x-0 top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="mx-auto w-full max-w-md px-4">
          {!compact ? (
            <div className="mt-3 rounded-2xl bg-card/70 ring-1 ring-border shadow-sm px-4 py-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-16 w-auto shrink-0 flex items-center justify-center p-1">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={`${brandName} logo`}
                        className="h-full w-auto object-contain"
                      />
                    ) : (
                      <span className="text-lg font-semibold text-foreground">{brandName.slice(0, 1)}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-semibold tracking-tight text-foreground leading-tight">
                      {brandName}
                    </div>
                    {subline ? (
                      <div className="text-xs font-medium text-muted-foreground truncate">
                        {subline}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="flex-1 inline-flex items-center justify-center rounded-xl bg-card/50 ring-1 ring-border px-3 py-2 text-xs font-medium text-muted-foreground whitespace-nowrap">
                  <span className={cn("mr-1.5 inline-block h-2 w-2 rounded-full", isOpenNow ? "bg-emerald-500" : "bg-red-500")} />
                  {isOpenNow ? "Open" : "Closed"} • {hoursText.replace("Today ", "")}
                </span>

                {!normalizedMaps.disabled ? (
                  <a
                    href={normalizedMaps.href}
                    className={cn(
                      "flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent/10 ring-1 ring-accent/20 px-3 py-2 text-xs font-semibold text-accent-foreground transition-transform active:scale-[0.98]",
                    )}
                    {...externalAttrs(normalizedMaps.href)}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    Directions
                  </a>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="my-2 rounded-2xl bg-card/70 ring-1 ring-border shadow-sm px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                {/* Compact Logo: Constrained by height (h-11), width auto */}
                <div className="relative h-12 w-auto shrink-0 flex items-center justify-center p-1">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={`${brandName} logo`}
                      className="h-full w-auto object-contain"
                    />
                  ) : (
                    <span className="text-base font-semibold text-foreground">{brandName.slice(0, 1)}</span>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-foreground">
                    {brandName}
                  </div>
                  <div className="text-[11px] font-medium text-muted-foreground">
                    {isOpenNow ? "Open now" : "Closed"}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className={cn(
                  "h-11 w-11 rounded-xl bg-white/70 ring-1 ring-border text-foreground/70",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  "active:scale-[0.99]"
                )}
                aria-label="Share"
              >
                <Share2 className="mx-auto h-5 w-5" />
              </button>
            </div>
          )}

          <div className="h-3" />
        </div>
      </div>

      <div className="absolute left-[-9999px] top-0 w-full max-w-md opacity-0 pointer-events-none">
        <div className="px-4">
          <div ref={expandedMeasureRef}>
            <div className="mt-3 rounded-2xl bg-card/70 ring-1 ring-border shadow-sm px-4 py-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-16 w-auto shrink-0 flex items-center justify-center">
                    <div className="h-full uppercase aspect-[2/1] bg-muted/20 rounded opacity-0"></div>
                    {/* Placeholder for spacer calculation - approximated */}
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-semibold">{brandName}</div>
                    <div className="text-xs font-medium text-muted-foreground truncate">{subline}</div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="flex-1 inline-flex items-center justify-center rounded-xl bg-card/50 px-3 py-2 text-xs font-medium">
                  Open • {hoursText.replace("Today ", "")}
                </span>

                {!normalizedMaps.disabled ? (
                  <span className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent/10 px-3 py-2 text-xs font-semibold">
                    Directions
                  </span>
                ) : null}
              </div>
            </div>
            <div className="h-3" />
          </div>

          <div ref={compactMeasureRef}>
            <div className="my-2 rounded-2xl bg-card/70 ring-1 ring-border shadow-sm px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-12 w-auto min-w-[3rem] shrink-0" />
                <div>
                  <div className="text-sm font-semibold">{brandName}</div>
                  <div className="text-[11px] font-medium">Open now</div>
                </div>
              </div>
              <div className="h-11 w-11 rounded-xl bg-white/70 ring-1 ring-border" />
            </div>
            <div className="h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
