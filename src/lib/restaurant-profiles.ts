import { cache } from "react";
import { draftMode } from "next/headers";
import { client } from "../../sanity/lib/client";
import { landingPageQuery, validateLandingPage } from "../../sanity/lib/queries";
import { buddasProfile } from "./buddas-profile";
import { isProfileSlug } from "./profile-routes";
import type { RestaurantProfile } from "./profile-types";

export const getRestaurantProfile = cache(async (slug: string): Promise<RestaurantProfile | null> => {
  if (!isProfileSlug(slug)) return null;
  const preview = await draftMode();
  const source = client.withConfig({
    // Next caches published reads; webhook invalidation should reach fresh CMS data.
    useCdn: false,
    perspective: preview.isEnabled ? "drafts" : "published",
    ...(preview.isEnabled ? { token: process.env.SANITY_API_READ_TOKEN } : {}),
  });
  let raw: unknown;
  try {
    raw = await source.fetch(landingPageQuery, { slug }, {
      next: { revalidate: preview.isEnabled ? 0 : 60 },
    });
  } catch (error) {
    console.error("Restaurant content fetch failed:", error instanceof Error ? error.message : "Unknown error");
    if (!preview.isEnabled && slug === "buddas") return buddasProfile;
    throw new Error("Restaurant content is temporarily unavailable.");
  }
  if (!raw) return !preview.isEnabled && slug === "buddas" ? buddasProfile : null;
  const profile = validateLandingPage(preview.isEnabled ? { ...raw as object, enabled: true } : raw, slug);
  if (!profile) return null;
  // Existing Budda's documents predate branch fields; [] deliberately removes them.
  if (slug === "buddas" && typeof raw === "object" && raw !== null && (raw as { locations?: unknown }).locations == null) {
    profile.locations = buddasProfile.locations;
  }
  if (slug === "buddas" && !profile.brand.logoUrl) profile.brand.logoUrl = buddasProfile.brand.logoUrl;
  if (slug === "buddas" && !profile.brand.servesCuisine) profile.brand.servesCuisine = buddasProfile.brand.servesCuisine;
  if (slug === "buddas" && (raw as { footer?: unknown }).footer == null) profile.footer = buddasProfile.footer;
  return profile;
});
