import { groq } from "next-sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { urlFor } from "./image";

/**
 * Sanity image asset type for logo and promo images
 */
export type SanityImageAsset = SanityImageSource & {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

/**
 * Brand information from CMS
 */
export interface BrandData {
  name: string;
  tagline?: string;
  subline?: string;
  hoursText?: string;
  openingHour?: string;
  closingHour?: string;
  statusMode?: "auto" | "open" | "closed";
  googleMapsUrl?: string;
  logo?: SanityImageAsset;
}

/**
 * Main navigation links
 */
export interface MainLinksData {
  menuUrl?: string;
  orderUrl?: string;
  reviewUrl?: string;
}

/**
 * Promo card data
 */
export interface PromoData {
  title: string;
  subtitle?: string;
  badge?: string;
  url?: string;
  image?: SanityImageAsset;
}

/**
 * Link list item data
 */
export interface LinkItemData {
  label: string;
  url: string;
  description?: string;
  icon?: string;
  emphasize?: boolean;
}

/**
 * Raw query result from Sanity - uses specific types, not unknown
 */
export interface LandingPageQueryResult {
  brand: BrandData;
  mainLinks?: MainLinksData;
  promos?: Array<PromoData>;
  linkList?: Array<LinkItemData>;
}

/**
 * Validated landing page data ready for rendering
 */
export interface LandingPageData {
  brand: {
    name: string;
    tagline?: string;
    subline?: string;
    logoUrl?: string;
    hoursText?: string;
    isOpenNow: boolean;
    googleMapsUrl?: string;
  };
  mainLinks: {
    menuUrl?: string;
    orderUrl?: string;
    reviewUrl?: string;
  };
  promos: Array<{
    title: string;
    subtitle?: string;
    badge?: string;
    url?: string;
    imageUrl?: string;
  }>;
  linkList: Array<LinkItemData>;
  // New sections - schema/GROQ may not include these yet
  storySection?: {
    headline?: string;
    body?: string;
    imageUrl?: string;
    imageCaption?: string;
  };
  testimonials?: Array<{
    name: string;
    quote: string;
    rating?: number;
    source?: string;
  }>;
  galleryImages?: Array<{
    imageUrl: string;
    caption?: string;
  }>;
  visitSection?: {
    address?: string;
    hoursFull?: string;
    phone?: string;
    mapImageUrl?: string;
    directionsUrl?: string;
  };
  cateringSection?: {
    headline?: string;
    description?: string;
    imageUrl?: string;
    ctaLabel?: string;
    ctaUrl?: string;
  };
}

/**
 * Validates and type-checks raw CMS data
 * Returns null if validation fails, otherwise returns typed LandingPageData
 */
export function validateLandingPage(data: unknown): LandingPageData | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const result = data as LandingPageQueryResult;

  // Required: brand must exist with a name
  if (!result.brand || typeof result.brand.name !== "string" || !result.brand.name.trim()) {
    return null;
  }

  // Validate promos array if present
  const promos = Array.isArray(result.promos)
    ? result.promos.map((p) => ({
        title: typeof p.title === "string" ? p.title : "",
        subtitle: typeof p.subtitle === "string" ? p.subtitle : undefined,
        badge: typeof p.badge === "string" ? p.badge : undefined,
        url: typeof p.url === "string" ? p.url : undefined,
        imageUrl: p.image ? urlFor(p.image).width(1200).height(700).fit("crop").auto("format").url() : undefined,
      }))
    : [];

  // Validate linkList array if present
  const linkList = Array.isArray(result.linkList)
    ? result.linkList
        .filter((l): l is LinkItemData =>
          typeof l === "object" &&
          l !== null &&
          typeof l.label === "string" &&
          typeof l.url === "string"
        )
        .map((l) => ({
          label: l.label,
          url: l.url,
          description: typeof l.description === "string" ? l.description : undefined,
          icon: typeof l.icon === "string" ? l.icon : undefined,
          emphasize: typeof l.emphasize === "boolean" ? l.emphasize : false,
        }))
    : [];

  return {
    brand: {
      name: result.brand.name,
      tagline: typeof result.brand.tagline === "string" ? result.brand.tagline : undefined,
      subline: typeof result.brand.subline === "string" ? result.brand.subline : undefined,
      logoUrl: result.brand.logo ? urlFor(result.brand.logo).width(512).height(256).fit("max").auto("format").url() : undefined,
      hoursText: typeof result.brand.hoursText === "string" ? result.brand.hoursText : undefined,
      isOpenNow: false, // Will be calculated by caller
      googleMapsUrl: typeof result.brand.googleMapsUrl === "string" ? result.brand.googleMapsUrl : undefined,
    },
    mainLinks: {
      menuUrl: typeof result.mainLinks?.menuUrl === "string" ? result.mainLinks.menuUrl : undefined,
      orderUrl: typeof result.mainLinks?.orderUrl === "string" ? result.mainLinks.orderUrl : undefined,
      reviewUrl: typeof result.mainLinks?.reviewUrl === "string" ? result.mainLinks.reviewUrl : undefined,
    },
    promos,
    linkList,
    // New sections not yet in CMS schema - pass through undefined
  };
}

export const landingPageQuery = groq`
  *[_type == "landingPage"][0]{
    brand{
      name,
      tagline,
      subline,
      hoursText,
      openingHour,
      closingHour,
      statusMode,
      googleMapsUrl,
      logo
    },
    mainLinks{
      menuUrl,
      orderUrl,
      reviewUrl
    },
    promos[]{
      title,
      subtitle,
      badge,
      url,
      image
    },
    linkList[]{
      label,
      url,
      description,
      icon,
      emphasize
    }
  }
`;
