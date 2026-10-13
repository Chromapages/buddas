import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { client } from "../../../../sanity/lib/client";
import { landingPageQuery, validateLandingPage } from "../../../../sanity/lib/queries";
import { getProfilePath, isProfileSlug } from "../../../lib/profile-routes";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!process.env.SANITY_PREVIEW_SECRET || !secret || secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response("Invalid preview secret", { status: 401 });
  }
  const value = request.nextUrl.searchParams.get("slug") ?? "buddas";
  const slug = value === "/buddas" ? "buddas" : value;
  if (!isProfileSlug(slug)) return new Response("Invalid profile", { status: 400 });
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token) return new Response("Draft preview is not configured", { status: 503 });
  try {
    const raw = await client.withConfig({ useCdn: false, perspective: "drafts", token }).fetch(landingPageQuery, { slug });
    if (!raw || !validateLandingPage({ ...raw, enabled: true }, slug)) return new Response("Profile not found", { status: 404 });
  } catch {
    return new Response("Draft preview is temporarily unavailable", { status: 503 });
  }
  (await draftMode()).enable();
  redirect(getProfilePath(slug));
}
