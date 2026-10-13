import type { Metadata } from "next";
import type { RestaurantProfile } from "./profile-types";
import { getAbsoluteUrl } from "./seo-utils";

export function getProfileMetadata(profile: RestaurantProfile, preview = false): Metadata {
  const title = profile.seo?.title ?? profile.brand.name;
  const description = profile.seo?.description ?? profile.brand.tagline ?? profile.brand.subline;
  const url = getAbsoluteUrl(profile.canonicalPath);
  const image = profile.seo?.imageUrl ?? profile.promos.find((promo) => promo.imageUrl)?.imageUrl;
  const images = image ? [{ url: getAbsoluteUrl(image), alt: profile.brand.name }] : undefined;
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: profile.brand.name, type: "website", images },
    twitter: { card: images ? "summary_large_image" : "summary", title, description, images },
    ...(profile.brand.logoUrl ? { icons: { icon: getAbsoluteUrl(profile.brand.logoUrl) } } : {}),
    robots: profile.isDemo || preview ? { index: false, follow: false } : { index: true, follow: true },
  };
}
