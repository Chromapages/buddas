export interface LocationData {
  id: string;
  name: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone?: string;
  timezone?: string;
  openingHoursSpecification: Array<{ dayOfWeek: string[]; opens: string; closes: string }>;
  hoursFull?: string;
  directionsUrl?: string;
  orderUrl?: string;
  menuUrl?: string;
  reviewUrl?: string;
}

export interface RestaurantProfile {
  slug: string;
  canonicalPath: string;
  theme: 'warm' | 'neutral';
  brand: { name: string; tagline?: string; subline?: string; logoUrl?: string; servesCuisine?: string[] };
  mainLinks: { orderUrl?: string; menuUrl?: string; reviewUrl?: string };
  primaryAction?: { label: string; url: string } | null;
  promos: Array<{ id: string; title: string; subtitle?: string; badge?: string; url?: string; imageUrl?: string }>;
  linkList: Array<{ id: string; label: string; url: string; description?: string; icon?: string; group?: string; emphasize?: boolean }>;
  locations: LocationData[];
  storySection?: { headline: string; body: string; imageUrl?: string; imageCaption?: string };
  galleryImages: Array<{ id: string; imageUrl: string; caption?: string }>;
  testimonials: Array<{ id: string; name: string; quote: string; rating?: number; source?: string; sourceUrl: string }>;
  cateringSection?: { headline: string; description: string; imageUrl?: string; ctaLabel?: string; ctaUrl?: string };
  seo?: { title?: string; description?: string; imageUrl?: string };
  footer?: { text?: string; privacyUrl?: string; termsUrl?: string };
  isDemo?: boolean;
}
