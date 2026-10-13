export function isProfileSlug(value: unknown): value is string {
  return typeof value === "string" && value.length <= 96 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

export function getProfilePath(slug: string): string {
  if (!isProfileSlug(slug)) throw new Error("Invalid restaurant profile slug");
  return slug === "buddas" ? "/buddas" : `/p/${slug}`;
}
