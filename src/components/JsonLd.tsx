"use client";

import Script from "next/script";

export type RestaurantSchema = {
  name: string;
  image?: string;
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
  data: RestaurantSchema;
};

export function JsonLd({ data }: Props) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: data.name,
  };

  if (data.image) schema.image = data.image;
  if (data.url) schema.url = data.url;

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
    schema.sameAs = data.sameAs;
  }

  if (data.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    };
  }

  return (
    <Script
      id="restaurant-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}