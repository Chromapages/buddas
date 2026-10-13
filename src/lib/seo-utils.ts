/**
 * SEO utility helpers for building canonical URLs and OG images
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://buddashawaiian.com";

/**
 * Returns an absolute URL for a given path
 * @param path - A path string that may start with "/" or be a full URL
 */
export function getAbsoluteUrl(path: string): string {
  return new URL(path, `${BASE_URL.replace(/\/$/, "")}/`).href;
}


