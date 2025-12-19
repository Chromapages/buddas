import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import { Footer } from "@/components/Footer";
import { NewNavbar } from "@/components/NewNavbar";
import { NewHero } from "@/components/NewHero";

import { MenuOffersSection } from "@/components/MenuOffersSection";
import { NewCateringSection } from "@/components/NewCateringSection";
import { NewAboutSection } from "@/components/NewAboutSection";
import { AppDownloadCTA } from "@/components/AppDownloadCTA";
import { NewTestimonialsSection } from "@/components/NewTestimonialsSection";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { urlFor } from "@/sanity/lib/image";

// Keep existing metadata logic for now, but we might want to update it later
interface HomePageData {
  siteSettings?: {
    title?: string;
    tagline?: string;
    logo?: any;
    heroSlides?: any[];
    primaryPhone?: string;
    primaryEmail?: string;
    defaultOrderingUrl?: string;
    mainNavigation?: any[];
    socialLinks?: any[];
  };
  featuredMenuItems?: any[];
  popularItems?: any[];
  newItems?: any[];
  programs?: any[];
  locations?: any[];
  testimonials?: any[];
  cateringData?: {
    // Homepage Teaser Fields ONLY
    teaserBadge?: string;
    eventsBadge?: string;
    communityBadge?: string;

    cateringTitle?: string;
    cateringDescription?: string;
    cateringImage?: string;
    cateringCtaLabel?: string;
    cateringCtaLink?: string;

    eventsTitle?: string;
    eventsDescription?: string;
    eventsImage?: string;
    eventsCtaLabel?: string;
    eventsCtaLink?: string;

    communityTitle?: string;
    communityDescription?: string;
    communityImage?: string;
    communityCtaLabel?: string;
    communityCtaLink?: string;
  };
  aboutData?: {
    teaserTitle?: string;
    teaserSnippet?: string;
    teaserBackgroundImage?: string;
    stats?: { value: string; label: string }[];
    storyTitle?: string;
    storyContent?: any[];
  };
  promotions?: any[];
  trustedByData?: any;
  ctaData?: {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
    primaryCta?: { label?: string; url?: string };
    secondaryCta?: { label?: string; url?: string };
  };
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await client.fetch<HomePageData>(HOME_PAGE_QUERY);
    const siteSettings = data?.siteSettings ?? {};

    const title = siteSettings.title ?? "Buddas Hawaiian Bakery & Grill";
    const description = siteSettings.tagline ?? "Bring Aloha to the Table.";

    return {
      title,
      description,
      alternates: { canonical: "/" },
    };
  } catch (error) {
    return {
      title: "Buddas Hawaiian Bakery & Grill",
      description: "Bring Aloha to the Table.",
    };
  }
}

export const revalidate = 60;

export default async function Home() {
  let data: HomePageData | null = null;

  try {
    data = await client.fetch<HomePageData>(HOME_PAGE_QUERY);
  } catch (error) {
    console.error("Failed to load home page data", error);
  }

  const locationsSafe = Array.isArray(data?.locations) ? data?.locations : [];
  // Use first location for contact info
  const primaryLocation = locationsSafe[0];

  const heroSlides = data?.siteSettings?.heroSlides || [];

  // Generate logo URL from Sanity
  const logoUrl = data?.siteSettings?.logo
    ? urlFor(data.siteSettings.logo).width(200).url()
    : undefined;
  const orderUrl = data?.siteSettings?.defaultOrderingUrl;

  // Helper to safely get image URL - use direct asset.url since query expands asset->
  const getImageUrl = (image: any): string | undefined => {
    // Direct URL from expanded asset
    if (image?.asset?.url) {
      return image.asset.url;
    }
    return undefined;
  };

  // Map helper for consistent item structure
  const mapMenuItem = (item: any) => ({
    id: item._id,
    name: item.name,
    description: item.description,
    price: item.price,
    image: getImageUrl(item.image),
    isBestSeller: item.isSignature,
  });

  const bentoItems = (data?.featuredMenuItems || []).map(mapMenuItem);
  const popularItems = (data?.popularItems || []).map(mapMenuItem);
  const newItems = (data?.newItems || []).map(mapMenuItem);

  return (
    <div className="min-h-screen bg-buddas-cream text-buddas-brown font-sans selection:bg-teal-500 selection:text-white">

      <main>
        <AnimatedSection>
          <NewHero heroSlides={heroSlides} />
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <MenuOffersSection
            featuredItems={bentoItems}
            popularItems={popularItems}
            newItems={newItems}
            promotions={data?.promotions}
            trustedByData={data?.trustedByData}
          />
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <NewCateringSection cateringData={data?.cateringData} />
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <NewAboutSection aboutData={data?.aboutData} />
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <NewTestimonialsSection testimonials={data?.testimonials} />
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <AppDownloadCTA ctaData={data?.ctaData} />
        </AnimatedSection>
      </main>

      <Footer
        logoUrl={logoUrl}
        navigation={data?.siteSettings?.mainNavigation?.map((item: any) => ({
          label: item.label,
          url: item.url
        }))}
        socialLinks={data?.siteSettings?.socialLinks}
        primaryPhone={data?.siteSettings?.primaryPhone}
        primaryEmail={data?.siteSettings?.primaryEmail}
      />
    </div >
  );
}
