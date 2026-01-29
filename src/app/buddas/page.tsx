import { QSRLinkPage } from "@/components/QSRLinkPage";
import { BuddasStickyHeader } from "@/components/BuddasStickyHeader";
import {
  Utensils,
  MapPin,
  Phone,
  ChefHat,
  Info,
  ExternalLink,
} from "lucide-react";
import { FaApple, FaGooglePlay, FaTiktok, FaInstagram } from "react-icons/fa";
import { Metadata } from 'next';

import { landingPageQuery, type LandingPageQueryResult } from "../../../sanity/lib/queries";

export const metadata: Metadata = {
  title: "Budda's Hawaiian Bakery & Grill",
  description: "Fresh Hawaiian comfort, baked daily. Order online, view our menu, or visit us today!",
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
      return <FaInstagram className="w-5 h-5" />;
    case "tiktok":
      return <FaTiktok className="w-5 h-5" />;
    case "apple":
      return <FaApple className="w-5 h-5" />;
    case "google-play":
      return <FaGooglePlay className="w-5 h-5" />;
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
};

import { isBuddaOpen } from "@/lib/time-utils";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";

async function fetchLandingPage() {
  try {
    const data = await client.fetch<LandingPageQueryResult | null>(
      landingPageQuery,
      {},
      { next: { revalidate: 60 } }
    );

    if (!data) {
      console.warn("fetchLandingPage: No data returned from Sanity");
      return null;
    }

    if (!data.brand?.name) {
      console.warn("fetchLandingPage: Brand name missing in Sanity data", data);
      return null;
    }

    const logoUrl = data.brand.logo
      ? urlFor(data.brand.logo as never).width(512).height(256).fit("max").auto("format").url()
      : undefined;

    const promos = (data.promos ?? []).map((p) => ({
      title: p.title,
      subtitle: p.subtitle,
      badge: p.badge,
      url: p.url,
      imageUrl: p.image
        ? urlFor(p.image as never).width(1200).height(700).fit("crop").auto("format").url()
        : undefined,
    }));

    // Calculate open status based on mode
    const mode = data.brand.statusMode || "auto";
    const dynamicOpenStatus = isBuddaOpen(data.brand.openingHour, data.brand.closingHour);

    let isOpenNow = dynamicOpenStatus;
    if (mode === "open") isOpenNow = true;
    if (mode === "closed") isOpenNow = false;

    return {
      brand: {
        name: data.brand.name,
        tagline: data.brand.tagline,
        subline: data.brand.subline,
        logoUrl,
        hoursText: data.brand.hoursText,
        isOpenNow,
        googleMapsUrl: data.brand.googleMapsUrl,
      },
      mainLinks: {
        menuUrl: data.mainLinks?.menuUrl,
        orderUrl: data.mainLinks?.orderUrl,
        reviewUrl: data.mainLinks?.reviewUrl,
      },
      promos,
      linkList: data.linkList ?? [],
    };
  } catch (error) {
    console.error("fetchLandingPage: Error fetching from Sanity:", error);
    return null;
  }
}

export default async function BuddasPage() {
  const cms = await fetchLandingPage();
  const page = cms ?? {
    ...fallbackData,
    brand: {
      ...fallbackData.brand,
      isOpenNow: isBuddaOpen("08:00", "20:00")
    }
  };

  const promoSlides = page.promos.length ? page.promos : fallbackData.promos;
  const logoUrl = page.brand.logoUrl ?? fallbackData.brand.logoUrl;
  const orderUrl = page.mainLinks.orderUrl ?? fallbackData.mainLinks.orderUrl;
  const reviewUrl = page.mainLinks.reviewUrl ?? fallbackData.mainLinks.reviewUrl;
  const mapsUrl = page.brand.googleMapsUrl ?? fallbackData.brand.googleMapsUrl;

  const links = (page.linkList.length ? page.linkList : fallbackData.linkList).map((l) => ({
    label: l.label,
    href: l.url,
    description: l.description,
    icon: iconFromKey(l.icon),
    emphasize: l.emphasize,
  }));

  return (
    <QSRLinkPage
      header={
        <BuddasStickyHeader
          brandName={page.brand.name}
          logoUrl={logoUrl}
          subline={page.brand.subline}
          orderUrl={orderUrl}
          googleMapsUrl={mapsUrl}
          hoursText={page.brand.hoursText}
          isOpenNow={page.brand.isOpenNow}
          linksAnchorId="buddas-links"
        />
      }
      brandName={page.brand.name}
      tagline={page.brand.tagline}
      logoUrl={logoUrl}
      promoSlides={promoSlides}
      links={links}
      googleReviewUrl={reviewUrl}
      orderUrl={orderUrl}
      menuUrl={page.mainLinks.menuUrl}
      showBrandHeader={false}
      linksSectionId="buddas-links"
    />
  );
}
