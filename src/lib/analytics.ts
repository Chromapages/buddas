export type EventProperties = Record<string, string | boolean | number>;
export type PromoTapProperties = { title: string; url?: string };
export type LinkClickProperties = { label: string; href: string };
export type ShareProperties = { method: "share_api" | "clipboard" };

export function trackAction(event: string, properties?: EventProperties): void {
  try {
    if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) window.dataLayer.push({ ...properties, event });
  } catch {
    // Optional analytics must never interrupt navigation.
  }
}

export function trackPromoTap({ title }: PromoTapProperties): void { trackAction("promo_tap", { title }); }
export function trackLinkClick({ label }: LinkClickProperties): void { trackAction("link_click", { label }); }
export function trackShare(properties: ShareProperties): void { trackAction("share", properties); }
export function trackOrderTap(): void { trackAction("order_tap"); }
export function trackMenuTap(): void { trackAction("menu_tap"); }
export function trackReviewTap(): void { trackAction("review_tap"); }

declare global {
  interface Window { dataLayer?: Array<Record<string, unknown>>; }
}
