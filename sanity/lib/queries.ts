import { groq } from "next-sanity";

export type LandingPageQueryResult = {
  brand: {
    name: string;
    tagline?: string;
    subline?: string;
    hoursText?: string;
    openingHour?: string;
    closingHour?: string;
    statusMode?: "auto" | "open" | "closed";
    googleMapsUrl?: string;
    logo?: unknown;
  };
  mainLinks?: {
    menuUrl?: string;
    orderUrl?: string;
    reviewUrl?: string;
  };
  promos?: Array<{
    title: string;
    subtitle?: string;
    badge?: string;
    url?: string;
    image?: unknown;
  }>;
  linkList?: Array<{
    label: string;
    url: string;
    description?: string;
    icon?: string;
    emphasize?: boolean;
  }>;
};

export const landingPageQuery = groq`
  *[_type == "landingPage"][0]{
    brand{
      name,
      tagline,
      subline,
      hoursText,
      openingHour,
      closingHour,
      statusMode,
      googleMapsUrl,
      logo
    },
    mainLinks{
      menuUrl,
      orderUrl,
      reviewUrl
    },
    promos[]{
      title,
      subtitle,
      badge,
      url,
      image
    },
    linkList[]{
      label,
      url,
      description,
      icon,
      emphasize
    }
  }
`;
