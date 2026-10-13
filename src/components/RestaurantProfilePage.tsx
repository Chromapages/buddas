import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { QSRLinkPage } from "./QSRLinkPage";
import { BuddasReferencePage } from "./BuddasReferencePage";
import { JsonLd } from "./JsonLd";
import { getRestaurantProfile } from "../lib/restaurant-profiles";
import { getAbsoluteUrl } from "../lib/seo-utils";
import { buddasDesign } from "../lib/buddas-design";
import { safeWebUrl } from "../lib/url-utils";

export async function RestaurantProfilePage({ slug }: { slug: string }) {
  const profile = await getRestaurantProfile(slug);
  if (!profile) notFound();
  const preview = (await draftMode()).isEnabled;
  const canonicalUrl = getAbsoluteUrl(profile.canonicalPath);
  const socialLinks = profile.linkList.filter((link) => ["instagram", "tiktok", "facebook"].includes(link.icon ?? ""));
  const sameAs = socialLinks.map((link) => link.url);
  if (profile.slug === "buddas" && !socialLinks.some((link) => link.icon === "facebook") && safeWebUrl(buddasDesign.facebookUrl)) {
    sameAs.push(buddasDesign.facebookUrl);
  }
  return (
    <>
      {!preview && !profile.isDemo && profile.locations.length > 0 && <JsonLd canonicalUrl={canonicalUrl} data={profile.locations.map((location) => ({
        id: location.id,
        name: `${profile.brand.name} — ${location.name}`,
        image: profile.slug === "buddas" ? buddasDesign.locationImages[location.id] : profile.brand.logoUrl,
        logo: profile.brand.logoUrl,
        description: profile.slug === "buddas" ? buddasDesign.description : profile.brand.tagline,
        url: `${canonicalUrl}#${location.id}`,
        address: location.address,
        telephone: location.telephone,
        openingHoursSpecification: location.openingHoursSpecification,
        menu: location.menuUrl ?? profile.mainLinks.menuUrl,
        hasMap: location.directionsUrl,
        servesCuisine: profile.brand.servesCuisine,
        sameAs,
      }))} />}
      {profile.slug === "buddas"
        ? <BuddasReferencePage profile={profile} canonicalUrl={canonicalUrl} preview={preview} />
        : <QSRLinkPage profile={profile} canonicalUrl={canonicalUrl} preview={preview} />}
    </>
  );
}
