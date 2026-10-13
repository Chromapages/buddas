/**
 * Generates a base64-encoded solid color SVG for use as a blur placeholder.
 * Uses a warm tan/peach color that matches the Budda's brand highlight.
 */
export function getBlurDataURL(width: number = 8, height: number = 8): string {
  // Warm tan/peach: matches --highlight / rgb(234, 190, 139)
  const warmColor = "#EABE8B";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="${warmColor}"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** Domains allowed to serve images, matching next.config.ts remotePatterns */
const ALLOWED_IMAGE_DOMAINS = ["images.unsplash.com", "cdn.sanity.io"];

/**
 * Validates that an image URL comes from an allowed domain.
 * Returns the URL if valid, undefined if not.
 */
export function validateImageUrl(url?: unknown): string | undefined {
  if (typeof url !== "string" || !url || /[\\\u0000-\u001f\u007f]|%(?:0[0-9a-f]|1[0-9a-f]|7f|5c)/i.test(url)) return undefined;
  if (url.startsWith("/")) {
    try {
      const decoded = decodeURIComponent(url);
      return !decoded.startsWith("//") && !/[\\\u0000-\u001f\u007f]/.test(decoded) ? url : undefined;
    } catch {
      return undefined;
    }
  }
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password || parsed.port) return undefined;
    if (!ALLOWED_IMAGE_DOMAINS.includes(parsed.hostname)) return undefined;
    return url;
  } catch {
    return undefined;
  }
}
