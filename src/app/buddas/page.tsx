import { QSRLinkPage } from "@/components/QSRLinkPage";
import { BuddasStickyHeader } from "@/components/BuddasStickyHeader";
import { BuddasPageSkeleton } from "@/components/SkeletonComponents";
import { JsonLd } from "@/components/JsonLd";
import { RestaurantSchema } from "@/components/JsonLd";
import { getOgImageUrl } from "@/lib/seo-utils";
import { Metadata } from 'next';
import {
  Utensils,
  MapPin,
  Phone,
  ChefHat,
  Info,
  ExternalLink,
} from "lucide-react";
import { AppleIcon, GooglePlayIcon, TikTokIcon, InstagramIcon } from "@/components/BrandIcons";
import { Suspense } from "react";

import { isBuddaOpen } from "@/lib/time-utils";
import { client } from "../../../sanity/lib/client";
import { landingPageQuery, LandingPageQueryResult, LandingPageData, validateLandingPage } from "../../../sanity/lib/queries";
import { cookies } from "next/headers";
import { validateImageUrl } from "@/lib/image-utils";

export const metadata: Metadata = {
  title: "Budda's Hawaiian Bakery & Grill | Fresh Hawaiian Comfort Food",
  description: "Order online from Budda's Hawaiian Bakery & Grill. Guava Chiffon Cake, Kalua Pork Plates, fresh malasadas and more. Local favorites baked daily.",
  alternates: { canonical: "https://buddashawaiian.com/buddas" },
  openGraph: {
    title: "Budda's Hawaiian Bakery & Grill",
    description: "Fresh Hawaiian comfort, baked daily. Order online, view our menu, or visit us today!",
    url: "https://buddashawaiian.com/buddas",
    siteName: "Budda's Hawaiian Bakery & Grill",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: getOgImageUrl(),
        width: 1200,
        height: 630,
        alt: "Budda's Hawaiian Bakery featured items",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Budda's Hawaiian Bakery & Grill",
    description: "Fresh Hawaiian comfort, baked daily.",
    images: [getOgImageUrl()],
  },
};

function iconFromKey(key?: string) {
  switch (key) {
    case "menu":
      return <Utensils className="w-5 h-5" />;
    case "directions":
      return <MapPin className="w-5 h-5" />;
    case "phone":
      return <Phone className="w-5 h-5" />;
    case "instagram":
      return <InstagramIcon className="w-5 h-5" />;
    case "tiktok":
      return <TikTokIcon className="w-5 h-5" />;
    case "apple":
      return <AppleIcon className="w-5 h-5" />;
    case "google-play":
      return <GooglePlayIcon className="w-5 h-5" />;
    case "catering":
      return <ChefHat className="w-5 h-5" />;
    case "info":
      return <Info className="w-5 h-5" />;
    default:
      return <ExternalLink className="w-5 h-5" />;
  }
}

const fallbackData = {
  brand: {
    name: "Budda's Hawaiian Bakery",
    tagline: "Taste the Aloha in every bite.",
    subline: "Bakery & Grill - Order online",
    logoUrl: "/BUDDAHAWAIIANLOGO.svg",
    hoursText: "Today 8am-8pm",
    isOpenNow: true,
    googleMapsUrl: "#",
  },
  mainLinks: {
    menuUrl: "#",
    orderUrl: "#",
    reviewUrl: "#",
  },
  promos: [
    {
      title: "Guava Chiffon Cake",
      subtitle: "Light, fluffy, and filled with real guava nectar.",
      badge: "BEST SELLER",
      imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Kalua Pork Plate",
      subtitle: "Slow-roasted pork with cabbage, rice & mac salad.",
      badge: "LUNCH SPECIAL",
      imageUrl: "https://images.unsplash.com/photo-1542528180-a1208c5169a5?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Weekend Malasadas",
      subtitle: "Hot, sugar-coated donuts available Sat & Sun only.",
      badge: "NEW",
      imageUrl: "https://images.unsplash.com/photo-1605193910398-33a598c47f76?q=80&w=1000&auto=format&fit=crop",
    },
  ],
  linkList: [
    {
      label: "View Menu",
      url: "#",
      description: "Plate lunches, bakery items & more",
      icon: "menu",
      emphasize: false,
    },
    {
      label: "Get Our App on iPhone",
      url: "#",
      description: "Experience the best of Budda's",
      icon: "apple",
      emphasize: false,
    },
    {
      label: "Get Our App on Android",
      url: "#",
      description: "Order faster, rewards sooner",
      icon: "google-play",
      emphasize: false,
    },
    {
      label: "Order Catering",
      url: "#",
      description: "Bring Aloha to your next event",
      icon: "catering",
      emphasize: true,
    },
    {
      label: "Follow on TikTok",
      url: "#",
      description: "@buddasbakery",
      icon: "tiktok",
      emphasize: false,
    },
    {
      label: "Follow on Instagram",
      url: "#",
      description: "@buddashawaiianbakery",
      icon: "instagram",
      emphasize: false,
    },
  ],
  // New sections fallback data
  storySection: {
    headline: "Our Story",
    body: "Born from a love of Hawaiian home cooking, Budda's brings the warmth of the islands to every plate. From slow-roasted kalua pork to light, fluffy chiffon cakes, we bake and cook with aloha — the same way we always have.",
    imageUrl: "https://images.unsplash.com/photo-1551218372-a8789b81b253?q=80&w=1200&auto=format&fit=crop",
    imageCaption: "Family recipes, made fresh daily",
  },
  galleryImages: [
    { imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=600&auto=format&fit=crop", caption: "Guava Chiffon Cake" },
    { imageUrl: "https://images.unsplash.com/photo-1542528180-a1208c5169a5?q=80&w=600&auto=format&fit=crop", caption: "Kalua Pork Plate" },
    { imageUrl: "https://images.unsplash.com/photo-1605193910398-33a598c47f76?q=80&w=600&auto=format&fit=crop", caption: "Malasadas" },
    { imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=600&auto=format&fit=crop", caption: "Loco Moco" },
    { imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=600&auto=format&fit=crop", caption: "Manapua" },
    { imageUrl: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=600&auto=format&fit=crop", caption: "Poi" },
  ],
  testimonials: [
    {
      name: "Malia K.",
      quote: "Best malasadas on the island — light, fluffy, and not overly sweet. I drive 30 minutes just to get them.",
      rating: 5,
      source: "Google",
    },
    {
      name: "James T.",
      quote: "The kalua pork plate is authentic and generous. Feels like home cooking with actual love behind it.",
      rating: 5,
      source: "Yelp",
    },
    {
      name: "Sarah M.",
      quote: "Ordered the catering for my daughter's birthday. Everyone raved about the food. We'll definitely be back!",
      rating: 5,
      source: "Google",
    },
  ],
  visitSection: {
    address: "1234 Bakery Lane, Honolulu, HI 96815",
    hoursFull: "Mon–Fri: 8am–8pm\nSat–Sun: 7am–8pm",
    phone: "(808) 555-0123",
    mapImageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop",
    directionsUrl: "https://maps.google.com/?q=Budda's+Hawaiian+Bakery",
  },
  cateringSection: {
    headline: "Bring Aloha to Your Event",
    description: "From corporate gatherings to family celebrations, Budda's catering brings the authentic flavors of Hawaii to your occasion. Let us handle the food — you enjoy the company.",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop",
    ctaLabel: "Inquire About Catering",
    ctaUrl: "#",
  },
};

export const dynamic = 'force-dynamic'

async function fetchLandingPage(preview = false): Promise<LandingPageData | null> {
  try {
    const data = await client.fetch<LandingPageQueryResult | null>(
      landingPageQuery,
      {},
      { next: { revalidate: preview ? 0 : 60 } }
    );

    if (!data) {
      console.warn("fetchLandingPage: No data returned from Sanity");
      return null;
    }

    return validateLandingPage(data);
  } catch (error) {
    console.error("fetchLandingPage: Error fetching from Sanity:", error);
    return null;
  }
}

// Loading fallback for Suspense - shows branded skeleton
function BuddasLoadingFallback() {
  return <BuddasPageSkeleton />;
}

function LcpPreload({ src, alt }: { src?: string; alt: string }) {
  if (!src) return null;
  return (
    <link
      rel="preload"
      as="image"
      href={src}
      fetchPriority="high"
    />
  );
}

export default async function BuddasPage() {
  const cookieStore = await cookies()
  const preview = cookieStore.has('__prevalidate')

  const cms = await fetchLandingPage(preview);
  // Cast to extended type so new sections are type-safe
  const page = (cms ?? fallbackData) as typeof fallbackData;

  // Override isOpenNow dynamically based on actual time in Hawaii
  const isOpenNow = isBuddaOpen("08:00", "20:00");

  const promoSlides = page.promos.length ? page.promos : fallbackData.promos;
  const logoUrl = validateImageUrl(page.brand.logoUrl) ?? fallbackData.brand.logoUrl;
  const orderUrl = page.mainLinks.orderUrl ?? fallbackData.mainLinks.orderUrl;
  const reviewUrl = page.mainLinks.reviewUrl ?? fallbackData.mainLinks.reviewUrl;
  const mapsUrl = page.brand.googleMapsUrl ?? fallbackData.brand.googleMapsUrl;

  // New sections - always include from fallback (CMS may not have them yet)
  const storySection = page.storySection ?? fallbackData.storySection;
  const testimonials = page.testimonials ?? fallbackData.testimonials;
  const galleryImages = page.galleryImages ?? fallbackData.galleryImages;
  const visitSection = page.visitSection ?? fallbackData.visitSection;
  const cateringSection = page.cateringSection ?? fallbackData.cateringSection;

  // Validate all CMS image URLs at the boundary before rendering
  const validatedPromoSlides = promoSlides.map((p) => ({
    ...p,
    imageUrl: validateImageUrl(p.imageUrl),
  }));

  // Get LCP image URL (first promo slide)
  const lcpImageUrl = validatedPromoSlides[0]?.imageUrl;

  const links = (page.linkList.length ? page.linkList : fallbackData.linkList).map((l) => ({
    label: l.label,
    href: l.url,
    description: l.description,
    icon: iconFromKey(l.icon),
    emphasize: l.emphasize,
  }));

  return (
    <>
      <JsonLd
        data={{
          name: page.brand.name,
          image: logoUrl,
          url: "https://buddashawaiian.com/buddas",
          telephone: undefined,
          address: undefined,
          openingHoursSpecification: undefined,
          servesCuisine: ["Hawaiian", "American", "Bakery"],
          priceRange: "$$",
          sameAs: [
            "https://www.tiktok.com/@buddasbakery",
            "https://www.instagram.com/buddashawaiianbakery",
          ],
        } satisfies RestaurantSchema}
      />
      {preview && (
        <div style={{
          background: '#e63946',
          color: 'white',
          textAlign: 'center',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: 600,
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          Preview Mode — Draft content visible
        </div>
      )}
      {/* Preload LCP image for faster Largest Contentful Paint */}
      <LcpPreload src={lcpImageUrl} alt={validatedPromoSlides[0]?.title ?? 'Budda\'s featured item'} />

      <Suspense fallback={<BuddasLoadingFallback />}>
        <QSRLinkPage
        header={
          <BuddasStickyHeader
            brandName={page.brand.name}
            logoUrl={logoUrl}
            subline={page.brand.subline}
            orderUrl={orderUrl}
            googleMapsUrl={mapsUrl}
            hoursText={page.brand.hoursText ?? "Today 8am-8pm"}
            isOpenNow={isOpenNow}
            linksAnchorId="buddas-links"
          />
        }
        brandName={page.brand.name}
        tagline={page.brand.tagline}
        logoUrl={logoUrl}
        promoSlides={validatedPromoSlides}
        links={links}
        googleReviewUrl={reviewUrl}
        orderUrl={orderUrl}
        menuUrl={page.mainLinks.menuUrl}
        showBrandHeader={false}
        linksSectionId="buddas-links"
        storySection={storySection}
        testimonials={testimonials}
        galleryImages={galleryImages}
        visitSection={visitSection}
        cateringSection={cateringSection}
      />
      </Suspense>
    </>
  );
}