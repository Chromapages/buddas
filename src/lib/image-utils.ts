/**
 * Generates a base64-encoded solid color SVG for use as a blur placeholder.
 * Uses a warm tan/peach color that matches the Budda's brand highlight.
 */
export function getBlurDataURL(width: number = 8, height: number = 8): string {
  // Warm tan/peach: matches --highlight / rgb(234, 190, 139)
  const warmColor = "#EABE8B";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="${warmColor}"/></svg>`;
  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

/** Domains allowed to serve images, matching next.config.ts remotePatterns */
const ALLOWED_IMAGE_DOMAINS = ["images.unsplash.com", "cdn.sanity.io"];

/**
 * Validates that an image URL comes from an allowed domain.
 * Returns the URL if valid, undefined if not.
 */
export function validateImageUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) return undefined;
    if (!ALLOWED_IMAGE_DOMAINS.some((d) => parsed.hostname.endsWith(d))) return undefined;
    return url;
  } catch {
    return undefined;
  }
}