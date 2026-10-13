import type { RestaurantProfile } from "./profile-types";
import { restaurantLocations } from "./restaurant-locations";

// Verified contact details survive CMS outages; unpublished/sample sections stay absent.
export const buddasProfile: RestaurantProfile = {
  slug: "buddas",
  canonicalPath: "/buddas",
  theme: "warm",
  brand: {
    name: "Budda's Hawaiian Bakery & Grill",
    tagline: "Hawaiian bakery & grill in Pleasant Grove and Salt Lake City.",
    logoUrl: "/BUDDAHAWAIIANLOGO.svg",
    servesCuisine: ["Hawaiian"],
  },
  mainLinks: {
    menuUrl: "https://buddashawaiian.com/menu",
    orderUrl: "https://buddashawaiian.com/menu",
  },
  primaryAction: { label: "Order online", url: "https://buddashawaiian.com/menu" },
  promos: [],
  linkList: [],
  locations: restaurantLocations.map((location) => ({ ...location, timezone: "America/Denver" })),
  galleryImages: [],
  testimonials: [],
  footer: { privacyUrl: "/privacy", termsUrl: "/terms" },
};

export const bakeryDemoProfile: RestaurantProfile = {
  slug: "bakery-demo",
  canonicalPath: "/examples/bakery",
  theme: "neutral",
  isDemo: true,
  brand: { name: "Bakery template", tagline: "A minimal template example. Add your own bakery details in Sanity." },
  mainLinks: {},
  promos: [],
  linkList: [{ id: "complete-example", label: "Explore the complete example", url: "/buddas", group: "Explore" }],
  locations: [],
  galleryImages: [],
  testimonials: [],
};
