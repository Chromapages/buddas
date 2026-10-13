import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { RestaurantProfilePage } from "../../components/RestaurantProfilePage";
import { getRestaurantProfile } from "../../lib/restaurant-profiles";
import { getProfileMetadata } from "../../lib/profile-metadata";

export async function generateMetadata() {
  const profile = await getRestaurantProfile("buddas");
  if (!profile) notFound();
  return getProfileMetadata(profile, (await draftMode()).isEnabled);
}

export default function BuddasPage() {
  return <RestaurantProfilePage slug="buddas" />;
}
