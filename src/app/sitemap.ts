import type { MetadataRoute } from "next";
import { client } from "../../sanity/lib/client";
import { landingPageQuery, publishedProfilesQuery } from "../../sanity/lib/queries";
import { getAbsoluteUrl } from "../lib/seo-utils";
import { getProfilePath, isProfileSlug } from "../lib/profile-routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let profiles: Array<{ slug: string; updatedAt?: string }> = [];
  try {
    const source = client.withConfig({ perspective: "published", useCdn: false });
    const result: unknown = await source.fetch(publishedProfilesQuery, {}, { next: { revalidate: 60 } });
    if (Array.isArray(result)) profiles = result.filter((entry) => entry && isProfileSlug(entry.slug));
    if (!profiles.some((profile) => profile.slug === "buddas")) {
      const legacy = await source.fetch(landingPageQuery, { slug: "buddas" }, { next: { revalidate: 60 } });
      if (!legacy || (legacy.enabled !== false && legacy.isDemo !== true)) profiles.push({ slug: "buddas", updatedAt: legacy?.updatedAt });
    }
  } catch {
    profiles = [{ slug: "buddas" }];
  }
  const entries: MetadataRoute.Sitemap = [...new Map(profiles.map((profile) => [profile.slug, profile])).values()].map((profile) => ({
    url: getAbsoluteUrl(getProfilePath(profile.slug)),
    ...(profile.updatedAt && !Number.isNaN(Date.parse(profile.updatedAt)) ? { lastModified: new Date(profile.updatedAt) } : {}),
    changeFrequency: "weekly", priority: 1,
  }));
  return [...entries, ...["/privacy", "/terms"].map((path) => ({ url: getAbsoluteUrl(path), changeFrequency: "yearly" as const, priority: 0.3 }))];
}
