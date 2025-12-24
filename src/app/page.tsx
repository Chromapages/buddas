import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import { Footer } from "@/components/Footer";
import { NewNavbar } from "@/components/NewNavbar";
import { NewHero } from "@/components/NewHero";
import { TrustedBy } from "@/components/TrustedBy";
import { PromoBanner } from "@/components/PromoBanner";

import { MenuOffersSection } from "@/components/MenuOffersSection";
import { NewCateringSection } from "@/components/NewCateringSection";

import { AppDownloadCTA } from "@/components/AppDownloadCTA";
import { NewTestimonialsSection } from "@/components/NewTestimonialsSection";
import { LocationsSection } from "@/components/LocationsSection";
import { urlFor } from "@/sanity/lib/image";

// Keep existing metadata logic for now, but we might want to update it later
interface HomePageData {
  siteSettings?: {
    title?: string;
    tagline?: string;
    logo?: any;
    primaryPhone?: string;
    primaryEmail?: string;
    defaultOrderingUrl?: string;
    mainNavigation?: any[];
    socialLinks?: any[];
  };
  homePage?: {
    heroSlides?: any[];
  };
  featuredMenuItems?: any[];
  popularItems?: any[];
  newItems?: any[];
  programs?: any[];
  locations?: any[];
  testimonials?: any[];
  cateringData?: {
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

  const heroSlides = data?.homePage?.heroSlides || [];

  // Generate logo URL from Sanity
  const logoUrl = data?.siteSettings?.logo
    ? urlFor(data.siteSettings.logo).width(200).url()
    : undefined;
  const orderUrl = data?.siteSettings?.defaultOrderingUrl;

  const bentoItems = data?.featuredMenuItems || [];
  const popularItems = data?.popularItems || [];
  const newItems = data?.newItems || [];

  return (
    <div className="min-h-screen bg-buddas-cream text-buddas-brown font-sans selection:bg-teal-500 selection:text-white">

      <main>
        <NewHero heroSlides={heroSlides} />

        <TrustedBy trustedByData={data?.trustedByData} />

        <PromoBanner promotions={data?.promotions} />

        <MenuOffersSection
          featuredItems={bentoItems}
          newItems={newItems}
        />

        <NewCateringSection cateringData={data?.cateringData} />



        {/* LocationsSection hidden per user request */}
        {/* <LocationsSection locations={locationsSafe} /> */}

        <NewTestimonialsSection testimonials={data?.testimonials} />

        <AppDownloadCTA ctaData={data?.ctaData} />
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
