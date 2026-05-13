"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

// Branded skeleton loaders for Budda's Hawaiian Bakery
// Uses warm Hawaiian color palette:
// --background: #fff8e8 (Buddas Cream)
// --accent: #54bfa5 (Base Teal)
// --highlight: #e9c559 (Island Gold)

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

/**
 * Skeleton base with optional shimmer animation
 */
function Skeleton({ className, shimmer = true, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-[var(--muted)]",
        shimmer && "animate-pulse",
        className
      )}
      {...props}
    />
  );
}

/**
 * Header skeleton: logo + brand name + status pill
 */
export function HeaderSkeleton() {
  return (
    <div className="relative">
      <div className="mx-auto w-full max-w-md px-4">
        {/* Expanded header skeleton */}
        <div className="mt-3 rounded-2xl bg-card/70 ring-1 ring-border shadow-sm px-4 py-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {/* Logo placeholder */}
              <Skeleton className="h-16 w-16 shrink-0" shimmer />

              <div className="min-w-0 space-y-2">
                {/* Brand name */}
                <Skeleton className="h-6 w-32" shimmer />
                {/* Subline */}
                <Skeleton className="h-4 w-40" shimmer />
              </div>
            </div>
          </div>

          {/* Status pill and directions */}
          <div className="mt-3 flex items-center gap-2">
            <Skeleton className="flex-1 h-10 rounded-xl" shimmer />
            <Skeleton className="flex-1 h-10 rounded-xl" shimmer />
          </div>
        </div>

        <div className="h-3" />
      </div>
    </div>
  );
}

/**
 * Promo carousel skeleton: 3 cards with shimmer effect
 */
export function PromoCarouselSkeleton() {
  return (
    <div className="mt-9">
      {/* Section header */}
      <div className="flex items-end justify-between">
        <Skeleton className="h-5 w-28" shimmer />
        <Skeleton className="h-4 w-12" shimmer />
      </div>

      {/* Carousel cards */}
      <div className="mt-3 flex gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="min-w-[88%] snap-center">
            <Skeleton className="h-52 rounded-3xl" shimmer />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Link button placeholders (3-4 items)
 */
export function LinksSkeleton({ count = 4 }: { count?: number } = {}) {
  return (
    <div className="mt-7 space-y-3">
      {/* Action buttons row */}
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-14 rounded-2xl" shimmer />
        <Skeleton className="h-14 rounded-2xl" shimmer />
      </div>

      {/* Link list */}
      <div className="mt-6 space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 rounded-2xl border border-accent/30 bg-card/70 px-5 py-4">
            <Skeleton className="h-10 w-10 shrink-0 rounded-xl" shimmer />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" shimmer />
              <Skeleton className="h-3 w-1/2" shimmer />
            </div>
            <Skeleton className="h-4 w-4 rounded" shimmer />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Compact header skeleton for scroll-down state
 */
export function CompactHeaderSkeleton() {
  return (
    <div className="my-2 rounded-2xl bg-card/70 ring-1 ring-border shadow-sm px-3 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2 min-w-0">
        <Skeleton className="h-12 w-12 shrink-0 rounded-xl" shimmer />
        <div className="min-w-0 space-y-2">
          <Skeleton className="h-4 w-24" shimmer />
          <Skeleton className="h-3 w-16" shimmer />
        </div>
      </div>
      <Skeleton className="h-11 w-11 rounded-xl" shimmer />
    </div>
  );
}

/**
 * Full page skeleton for Suspense fallback
 */
export function BuddasPageSkeleton() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-110px] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,var(--highlight)_0%,transparent_60%)] opacity-55" />
        <div className="absolute -bottom-28 right-[-140px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_62%)] opacity-40" />
      </div>

      {/* Header */}
      <HeaderSkeleton />

      <div className="relative mx-auto w-full max-w-md px-4 pb-12 pt-6">
        {/* Brand header section */}
        <div className="flex flex-col items-center text-center">
          <Skeleton className="h-32 w-full max-w-[280px] rounded-2xl" shimmer />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-7 w-48" shimmer />
            <Skeleton className="h-4 w-36" shimmer />
          </div>
        </div>

        {/* Promo carousel */}
        <PromoCarouselSkeleton />

        {/* Links */}
        <LinksSkeleton count={4} />

        {/* Footer */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <Skeleton className="h-px w-14" shimmer />
          <Skeleton className="h-16 w-full rounded-2xl" shimmer />
        </div>
      </div>
    </main>
  );
}