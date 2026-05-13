/**
 * Analytics event tracking for Budda's Hawaiian Bakery.
 *
 * Uses requestIdleCallback to defer initialization until after LCP,
 * preventing analytics from blocking the critical rendering path.
 */

export type EventProperties = Record<string, string | boolean | number>;

export type PromoTapProperties = {
  title: string;
  url?: string;
};

export type LinkClickProperties = {
  label: string;
  href: string;
};

export type ShareProperties = {
  method: "share_api" | "clipboard";
};

// ---------------------------------------------------------------------------
// Core tracking function - deferred initialization
// ---------------------------------------------------------------------------

let analyticsReady = false;

function ensureAnalytics() {
  if (analyticsReady || typeof window === "undefined") return;
  // Defer analytics initialization until after LCP
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      analyticsReady = true;
    }, { timeout: 1000 });
  } else {
    // Fallback for Safari
    setTimeout(() => { analyticsReady = true; }, 200);
  }
}

function pushEvent(name: string, properties?: EventProperties): void {
  if (typeof window !== "undefined") {
    ensureAnalytics();
    if (window.dataLayer) {
      window.dataLayer.push({ event: name, ...properties });
    }
  }
}

// ---------------------------------------------------------------------------
// Typed tracking helpers
// ---------------------------------------------------------------------------

/**
 * Track when a user taps a promo card.
 */
export function trackPromoTap({ title, url }: PromoTapProperties): void {
  pushEvent("promo_tap", { title, url: url ?? "" });
}

/**
 * Track when a user clicks any link button.
 */
export function trackLinkClick({ label, href }: LinkClickProperties): void {
  pushEvent("link_click", { label, href });
}

/**
 * Track share button usage.
 */
export function trackShare({ method }: ShareProperties): void {
  pushEvent("share", { method });
}

/**
 * Track Order Now CTA tap.
 */
export function trackOrderTap(): void {
  pushEvent("order_tap");
}

/**
 * Track Full Menu button tap.
 */
export function trackMenuTap(): void {
  pushEvent("menu_tap");
}

/**
 * Track Google Review button tap.
 */
export function trackReviewTap(): void {
  pushEvent("review_tap");
}

// ---------------------------------------------------------------------------
// Type declarations for window.dataLayer (GTM)
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}