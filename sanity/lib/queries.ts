import { groq } from 'next-sanity';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { LocationData, RestaurantProfile } from '../../src/lib/profile-types';
import { validateImageUrl } from '../../src/lib/image-utils';
import { safeHref, safeWebUrl } from '../../src/lib/url-utils';
import { getProfilePath, isProfileSlug } from '../../src/lib/profile-routes';
import { formatLocationHours } from '../../src/lib/location-hours';
import { urlFor } from './image';

export type LandingPageData = RestaurantProfile;
export type LandingPageQueryResult = Record<string, unknown>;
export type SanityImageAsset = SanityImageSource;
export type BrandData = RestaurantProfile['brand'];
export type MainLinksData = RestaurantProfile['mainLinks'];
export type PromoData = RestaurantProfile['promos'][number];
export type LinkItemData = RestaurantProfile['linkList'][number];

function object(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function items(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.map(object).filter(item => item.enabled !== false) : [];
}

function image(data: Record<string, unknown>, field = 'image'): string | undefined {
  const direct = validateImageUrl(data[`${field}Url`]);
  if (direct) return direct;
  const source = data[field];
  if (!source) return undefined;
  try {
    return validateImageUrl(urlFor(source as SanityImageSource).width(1200).auto('format').url());
  } catch {
    return undefined;
  }
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

function location(data: Record<string, unknown>, index: number, usedIds: Set<string>): LocationData | undefined {
  const name = text(data.name);
  const rawAddress = object(data.address);
  const streetAddress = text(rawAddress.streetAddress);
  const addressLocality = text(rawAddress.addressLocality);
  const addressRegion = text(rawAddress.addressRegion);
  const postalCode = text(rawAddress.postalCode);
  const addressCountry = text(rawAddress.addressCountry);
  if (!name || !streetAddress || !addressLocality || !addressRegion || !postalCode || !addressCountry) return undefined;
  const key = text(data._key);
  const keyId = key && /^\d[A-Za-z0-9_.:-]*$/.test(key) ? `location-${key}` : key;
  let id = [text(data.id), keyId].find((candidate): candidate is string => !!candidate && !!safeHref(`#${candidate}`) && !usedIds.has(candidate)) ?? `location-${index}`;
  while (usedIds.has(id)) id += '-branch';
  usedIds.add(id);
  let timezone = text(data.timezone);
  if (timezone) {
    try { new Intl.DateTimeFormat('en-US', { timeZone: timezone }); } catch { timezone = undefined; }
  }
  const telephone = text(data.telephone);
  const openingHoursSpecification = items(data.openingHoursSpecification).flatMap(hours => {
    const dayOfWeek = Array.isArray(hours.dayOfWeek) ? hours.dayOfWeek.filter((day): day is string => typeof day === 'string' && DAYS.includes(day)) : [];
    const opens = text(hours.opens);
    const closes = text(hours.closes);
    return dayOfWeek.length && opens && TIME.test(opens) && closes && (TIME.test(closes) || closes === '24:00') ? [{ dayOfWeek, opens, closes }] : [];
  });
  return {
    id,
    name,
    address: { streetAddress, addressLocality, addressRegion, postalCode, addressCountry },
    telephone: telephone && /^\+?[\d ().-]+$/.test(telephone) && telephone.replace(/\D/g, '').length >= 7 ? telephone.replace(/[ ().-]/g, '') : undefined,
    timezone,
    openingHoursSpecification,
    hoursFull: formatLocationHours(openingHoursSpecification, timezone) ?? text(data.hoursFull),
    directionsUrl: safeWebUrl(data.directionsUrl),
    orderUrl: safeWebUrl(data.orderUrl),
    menuUrl: safeWebUrl(data.menuUrl),
    reviewUrl: safeWebUrl(data.reviewUrl),
  };
}

export function validateLandingPage(data: unknown, requestedSlug?: string): RestaurantProfile | null {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  const result = object(data);
  if (result.enabled === false) return null;
  const brand = object(result.brand);
  const name = text(brand.name);
  const storedSlug = text(object(result.slug).current) ?? text(result.slug);
  const slug = storedSlug ?? requestedSlug ?? (name?.startsWith('Budda') ? 'buddas' : undefined);
  if (!name || !isProfileSlug(slug) || (requestedSlug && slug !== requestedSlug)) return null;
  const links = object(result.mainLinks);
  const mainLinks = { orderUrl: safeWebUrl(links.orderUrl), menuUrl: safeWebUrl(links.menuUrl), reviewUrl: safeWebUrl(links.reviewUrl) };
  const action = object(result.primaryAction);
  const actionUrl = safeHref(action.url);
  const actionLabel = text(action.label);
  const primaryAction = result.primaryAction != null
    ? action.enabled !== false && actionUrl && actionLabel ? { label: actionLabel, url: actionUrl } : null
    : mainLinks.orderUrl ? { label: 'Order online', url: mainLinks.orderUrl }
      : mainLinks.menuUrl ? { label: 'View menu', url: mainLinks.menuUrl } : undefined;
  const story = object(result.storySection);
  const storyHeadline = text(story.headline);
  const storyBody = text(story.body);
  const catering = object(result.cateringSection);
  const cateringHeadline = text(catering.headline);
  const cateringDescription = text(catering.description);
  const seo = object(result.seo);
  const footer = object(result.footer);
  const locationIds = new Set(['locations', 'location-cards', 'main-content', 'locations-heading', 'promotions', 'promotions-heading', 'qr-heading', 'qr-description']);
  return {
    slug,
    canonicalPath: getProfilePath(slug),
    theme: result.theme === 'neutral' ? 'neutral' : 'warm',
    brand: { name, tagline: text(brand.tagline), subline: text(brand.subline), logoUrl: image(brand, 'logo'), servesCuisine: Array.isArray(brand.servesCuisine) ? brand.servesCuisine.flatMap(value => { const cuisine = text(value); return cuisine ? [cuisine] : []; }) : undefined },
    mainLinks,
    primaryAction,
    promos: items(result.promos).flatMap((promo, index) => {
      const title = text(promo.title);
      return title ? [{ id: text(promo.id) ?? text(promo._key) ?? `promo-${index}`, title, subtitle: text(promo.subtitle), badge: text(promo.badge), url: safeHref(promo.url), imageUrl: image(promo) }] : [];
    }),
    linkList: items(result.linkList).flatMap((link, index) => {
      const label = text(link.label);
      const url = safeHref(link.url);
      return label && url ? [{ id: text(link.id) ?? text(link._key) ?? `link-${index}`, label, url, description: text(link.description), icon: text(link.icon), group: text(link.group), emphasize: link.emphasize === true }] : [];
    }),
    locations: items(result.locations).flatMap((item, index) => { const valid = location(item, index, locationIds); return valid ? [valid] : []; }),
    storySection: story.enabled !== false && storyHeadline && storyBody ? { headline: storyHeadline, body: storyBody, imageUrl: image(story), imageCaption: text(story.imageCaption) } : undefined,
    galleryImages: items(result.galleryImages).flatMap((item, index) => {
      const imageUrl = image(item);
      return imageUrl ? [{ id: text(item.id) ?? text(item._key) ?? `photo-${index}`, imageUrl, caption: text(item.caption) }] : [];
    }),
    testimonials: items(result.testimonials).flatMap((item, index) => {
      const name = text(item.name);
      const quote = text(item.quote);
      const sourceUrl = safeWebUrl(item.sourceUrl);
      return name && quote && sourceUrl ? [{ id: text(item.id) ?? text(item._key) ?? `review-${index}`, name, quote, sourceUrl, source: text(item.source), rating: typeof item.rating === 'number' && Number.isFinite(item.rating) && item.rating >= 1 && item.rating <= 5 ? item.rating : undefined }] : [];
    }),
    cateringSection: catering.enabled !== false && cateringHeadline && cateringDescription ? { headline: cateringHeadline, description: cateringDescription, imageUrl: image(catering), ctaLabel: text(catering.ctaLabel), ctaUrl: safeHref(catering.ctaUrl) } : undefined,
    seo: result.seo ? { title: text(seo.title), description: text(seo.description), imageUrl: image(seo) } : undefined,
    footer: result.footer ? { text: text(footer.text), privacyUrl: safeWebUrl(footer.privacyUrl), termsUrl: safeWebUrl(footer.termsUrl) } : undefined,
    isDemo: result.isDemo === true,
  };
}

export const landingPageQuery = groq`
  *[_type == "landingPage" && (slug.current == $slug || ($slug == "buddas" && !defined(slug.current) && brand.name match "Budda*"))]
  | order(defined(slug.current) desc, _updatedAt desc)[0]{
    _id, "updatedAt": _updatedAt, slug, enabled, isDemo, theme,
    brand{ name, tagline, subline, servesCuisine, logo, "logoUrl": logo.asset->url },
    mainLinks{ menuUrl, orderUrl, reviewUrl },
    primaryAction{ enabled, label, url },
    promos[]{ _key, id, enabled, title, subtitle, badge, url, image, "imageUrl": image.asset->url },
    linkList[]{ _key, id, enabled, label, url, description, icon, group, emphasize },
    locations[]{ _key, id, enabled, name, address, telephone, timezone, openingHoursSpecification, hoursFull, directionsUrl, orderUrl, menuUrl, reviewUrl },
    storySection{ enabled, headline, body, image, "imageUrl": image.asset->url, imageCaption },
    galleryImages[]{ _key, id, enabled, image, "imageUrl": image.asset->url, caption },
    testimonials[]{ _key, id, enabled, name, quote, rating, source, sourceUrl },
    cateringSection{ enabled, headline, description, image, "imageUrl": image.asset->url, ctaLabel, ctaUrl },
    seo{ title, description, image, "imageUrl": image.asset->url },
    footer{ text, privacyUrl, termsUrl }
  }
`;

export const publishedProfilesQuery = groq`
  *[_type == "landingPage" && enabled != false && isDemo != true && defined(slug.current) && !(_id in path("drafts.**"))]{
    "slug": slug.current, "updatedAt": _updatedAt
  }
`;
