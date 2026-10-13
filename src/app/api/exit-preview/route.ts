import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { getProfilePath, isProfileSlug } from "../../../lib/profile-routes";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug") ?? "buddas";
  (await draftMode()).disable();
  redirect(isProfileSlug(slug) ? getProfilePath(slug) : "/buddas");
}
