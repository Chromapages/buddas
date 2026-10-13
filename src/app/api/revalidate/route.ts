import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../../sanity/lib/client";
import { getProfilePath, isProfileSlug } from "../../../lib/profile-routes";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || !secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid or missing secret" }, { status: 401 });
  }
  let body: Record<string, unknown> = {};
  if (request.headers.get("content-type")?.includes("application/json")) {
    try {
      const value: unknown = await request.json();
      if (value && typeof value === "object" && !Array.isArray(value)) body = value as Record<string, unknown>;
      else return NextResponse.json({ error: "Invalid webhook body" }, { status: 400 });
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
  }
  const bodySlug = body.slug && typeof body.slug === "object" && !Array.isArray(body.slug)
    ? (body.slug as Record<string, unknown>).current : body.slug;
  if (body.slug != null && bodySlug == null) return NextResponse.json({ error: "Invalid profile slug" }, { status: 400 });
  let slug: unknown = request.nextUrl.searchParams.get("slug") ?? bodySlug;
  try {
    if (!slug && typeof body._id === "string") {
      const document = await client.withConfig({ useCdn: false, perspective: "published" }).fetch(
        '*[_type == "landingPage" && _id == $id][0]{"slug": slug.current}', { id: body._id.replace(/^drafts\./, "") },
      );
      slug = document?.slug;
      if (!slug) return NextResponse.json({ error: "Unknown profile" }, { status: 404 });
    }
    slug ??= "buddas";
  } catch {
    return NextResponse.json({ error: "Content service unavailable" }, { status: 503 });
  }
  if (!isProfileSlug(slug)) return NextResponse.json({ error: "Invalid profile slug" }, { status: 400 });
  // An authenticated removal event still needs to evict a deleted profile.
  const path = getProfilePath(slug);
  revalidatePath(path);
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ revalidated: true, path });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } });
}
