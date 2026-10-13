"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackAction } from "@/lib/analytics";
import { safeHref } from "@/lib/url-utils";

export function TrackedLink({ action, profileSlug, linkId, locationId, placement, track = true, href, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & {
  action: string; profileSlug: string; linkId: string; locationId?: string; placement: string; track?: boolean;
}) {
  const destination = safeHref(href);
  if (!destination) return null;
  return <a {...props} href={destination} onClick={(event) => {
    if (track) trackAction(action, { profile: profileSlug, link_id: linkId, location: locationId || "", placement });
    onClick?.(event);
  }} />;
}
