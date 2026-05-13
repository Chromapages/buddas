/**
 * SEO utility helpers for building canonical URLs and OG images
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://buddashawaiian.com";

/**
 * Returns an absolute URL for a given path
 * @param path - A path string that may start with "/" or be a full URL
 */
export function getAbsoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Returns the OG image URL, using brand logo or a default fallback
 */
export function getOgImageUrl(brandLogoUrl?: string): string {
  // Prefer brand logo if it's an absolute URL, otherwise fall back to Unsplash OG image
  const logoUrl = brandLogoUrl ?? "/BUDDAHAWAIIANLOGO.svg";

  if (logoUrl.startsWith("http://") || logoUrl.startsWith("https://")) {
    return logoUrl;
  }

  // SVG logos are not ideal for OG — use a branded Unsplash fallback for social sharing
  return "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=1200&auto=format&fit=crop";
}

/**
 * Build LocalBusiness Schema.org JSON-LD object
 */
export function buildLocalBusinessJsonLd(params: {
  name?: string;
  description?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  openingHours?: string[];
  url?: string;
  telephone?: string;
  image?: string;
}) {
  const {
    name = "Budda's Hawaiian Bakery & Grill",
    description = "Fresh Hawaiian comfort, baked daily.",
    address = {
      streetAddress: "99-880 Lipeka Point",
      addressLocality: "Waipahu",
      addressRegion: "HI",
      postalCode: "96797",
      addressCountry: "US",
    },
    openingHours = ["Mo-Su 08:00-20:00"],
    url = BASE_URL,
    telephone = "(808) 671-3000",
    image = getOgImageUrl("/BUDDAHAWAIIANLOGO.svg"),
  } = params;

  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name,
    description,
    url,
    telephone,
    image,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    openingHours,
    servesCuisine: "Hawaiian",
    priceRange: "$$",
    hasMenu: {
      "@type": "Menu",
      url: `${BASE_URL}/menu`,
    },
  };
}