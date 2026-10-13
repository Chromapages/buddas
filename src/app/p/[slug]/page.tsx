import { notFound, permanentRedirect } from "next/navigation";
import { draftMode } from "next/headers";
import { RestaurantProfilePage } from "../../../components/RestaurantProfilePage";
import { getRestaurantProfile } from "../../../lib/restaurant-profiles";
import { getProfileMetadata } from "../../../lib/profile-metadata";
import { isProfileSlug } from "../../../lib/profile-routes";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (slug === "buddas") permanentRedirect("/buddas");
  const profile = await getRestaurantProfile(slug);
  if (!profile) notFound();
  return getProfileMetadata(profile, (await draftMode()).isEnabled);
}

export default async function ProfilePage({ params }: Props) {
  const { slug } = await params;
  if (!isProfileSlug(slug)) notFound();
  if (slug === "buddas") permanentRedirect("/buddas");
  return <RestaurantProfilePage slug={slug} />;
}
