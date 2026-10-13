import { getAbsoluteUrl } from "../lib/seo-utils";

export type RestaurantSchema = {
  id: string;
  name: string;
  image?: string;
  logo?: string;
  description?: string;
  menu?: string;
  hasMap?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  telephone?: string;
  url?: string;
  openingHours?: string[];
  openingHoursSpecification?: {
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
  servesCuisine?: string[];
  priceRange?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  sameAs?: string[];
  geo?: {
    latitude: number;
    longitude: number;
  };
};

type Props = {
  data: RestaurantSchema[];
  canonicalUrl?: string;
};

function restaurantSchema(data: RestaurantSchema, canonicalUrl: string) {
  const schema: Record<string, unknown> = {
    "@type": "Restaurant",
    "@id": `${canonicalUrl}#${encodeURIComponent(data.id)}`,
    name: data.name,
  };

  // Omit placeholders and non-web URLs from CMS content.
  for (const key of ["image", "logo", "url", "menu", "hasMap"] as const) {
    const value = data[key]?.trim();
    if (!value || value.startsWith("#") || value.startsWith("PASTE_")) continue;
    try {
      const url = new URL(value.startsWith("/") ? new URL(value, canonicalUrl).href : value);
      if (["http:", "https:"].includes(url.protocol)) schema[key] = url.href;
    } catch {
      // Invalid optional URLs do not belong in structured data.
    }
  }
  // Schema.org uses hasMenu; Google still documents menu.
  if (schema.menu) schema.hasMenu = schema.menu;
  if (data.description) schema.description = data.description;

  if (data.address) {
    schema.address = {
      "@type": "PostalAddress",
      ...data.address,
    };
  }

  if (data.telephone) schema.telephone = data.telephone;

  if (data.openingHours && data.openingHours.length > 0) {
    schema.openingHours = data.openingHours;
  }

  if (data.openingHoursSpecification && data.openingHoursSpecification.length > 0) {
    schema.openingHoursSpecification = data.openingHoursSpecification.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    }));
  }

  if (data.servesCuisine && data.servesCuisine.length > 0) {
    schema.servesCuisine = data.servesCuisine;
  }

  if (data.priceRange) schema.priceRange = data.priceRange;

  if (data.aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: data.aggregateRating.ratingValue,
      reviewCount: data.aggregateRating.reviewCount,
    };
  }

  if (data.sameAs && data.sameAs.length > 0) {
    const sameAs = data.sameAs.filter((value) => {
      try {
        return ["http:", "https:"].includes(new URL(value).protocol);
      } catch {
        return false;
      }
    });
    if (sameAs.length) schema.sameAs = sameAs;
  }

  if (data.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    };
  }

  return schema;
}

export function JsonLd({ data, canonicalUrl = getAbsoluteUrl("/buddas") }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": data.map((restaurant) => restaurantSchema(restaurant, canonicalUrl)),
  };

  return (
    <script
      id="restaurant-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
