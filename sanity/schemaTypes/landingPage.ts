import { defineField, defineType } from "sanity";
import { safeHref, safeWebUrl } from "../../src/lib/url-utils";
import { isProfileSlug } from "../../src/lib/profile-routes";

export const landingPage = defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  fields: [
    defineField({
      name: "slug", title: "Profile URL slug", type: "slug",
      options: { source: "brand.name", maxLength: 96 },
      validation: (r) => r.required().custom((value) => !value || isProfileSlug(value.current) ? true : "Use lowercase letters, numbers and single hyphens."),
      description: "Unique public URL. Budda's retains /buddas; other profiles use /p/your-slug. Keep it stable after sharing.",
    }),
    defineField({ name: "enabled", title: "Publicly available", type: "boolean", initialValue: true }),
    defineField({ name: "isDemo", title: "Demo content", type: "boolean", initialValue: false, description: "Demo profiles are excluded from public indexing and the sitemap." }),
    defineField({ name: "theme", title: "Theme", type: "string", initialValue: "warm", options: { list: [{ title: "Warm", value: "warm" }, { title: "Neutral", value: "neutral" }] } }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "tagline", title: "Tagline", type: "string" }),
        defineField({ name: "servesCuisine", title: "Cuisines served", type: "array", of: [{ type: "string" }], description: "Actual cuisines for this business, e.g. Hawaiian or Bakery. Used in structured data." }),
        defineField({
          name: "subline",
          title: "Subline",
          type: "string",
          description: "Shown under the brand name in the sticky header.",
        }),
        defineField({
          name: "logo",
          title: "Logo",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "hoursText",
          title: "Hours Text",
          type: "string",
          description: "Legacy field. Use location-specific hours below for the template.",
        }),
        defineField({
          name: "openingHour",
          title: "Opening Hour (HH:mm)",
          type: "string",
          description: "24-hour format, e.g., 08:00",
        }),
        defineField({
          name: "closingHour",
          title: "Closing Hour (HH:mm)",
          type: "string",
          description: "24-hour format, e.g., 20:00",
        }),
        defineField({
          name: "statusMode",
          title: "Status Mode",
          type: "string",
          initialValue: "auto",
          options: {
            list: [
              { title: "Automatic (Time-based)", value: "auto" },
              { title: "Manual: Open", value: "open" },
              { title: "Manual: Closed", value: "closed" },
            ],
          },
          description: "Select 'Automatic' to use the opening/closing hours. Use 'Manual' to override.",
        }),
        defineField({
          name: "googleMapsUrl",
          title: "Google Maps URL",
          type: "url",
        }),
      ],
      validation: (r) => r.required(),
    }),

    defineField({
      name: "mainLinks",
      title: "Main Links",
      type: "object",
      fields: [
        defineField({ name: "menuUrl", title: "Full Menu URL", type: "url", description: "Link to your PDF or website menu", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https"] }).custom((value) => !value || safeWebUrl(value) ? true : "Use a valid web destination.") }),
        defineField({ name: "orderUrl", title: "Order URL", type: "url", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https"] }).custom((value) => !value || safeWebUrl(value) ? true : "Use a valid web destination.") }),
        defineField({ name: "reviewUrl", title: "Review URL", type: "url", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https"] }).custom((value) => !value || safeWebUrl(value) ? true : "Use a valid web destination.") }),
      ],
    }),

    defineField({
      name: "primaryAction", title: "Primary action", type: "object",
      description: "Defaults to ordering, then menu, when absent. Disable to intentionally hide the primary action.",
      fields: [
        defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
        defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
        defineField({ name: "url", title: "Destination", type: "url", validation: (r) => r.required().uri({ allowRelative: true, scheme: ["http", "https", "tel", "mailto"] }).custom((value) => !value || safeHref(value) ? true : "Use a valid web, section, phone or email destination.") }),
      ],
    }),

    defineField({
      name: "promos",
      title: "Specials",
      type: "array",
      of: [
        {
          type: "object",
          name: "promo",
          fields: [
            defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "url", title: "Link URL", type: "url", description: "Optional: Link this promo somewhere (e.g. an order page or info page)", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https", "tel", "mailto"] }).custom((value) => !value || safeHref(value) ? true : "Use a valid destination.") }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "badge", media: "image" },
          },
        },
      ],
    }),

    defineField({
      name: "linkList",
      title: "Links (Buttons)",
      type: "array",
      of: [
        {
          type: "object",
          name: "linkItem",
          fields: [
            defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "url", title: "URL", type: "url", validation: (r) => r.required().uri({ allowRelative: true, scheme: ["http", "https", "tel", "mailto"] }).custom((value) => !value || safeHref(value) ? true : "Use a valid web, section, phone or email destination.") }),
            defineField({ name: "description", title: "Description", type: "string" }),
            defineField({ name: "group", title: "Group heading", type: "string", description: "Optional, e.g. Follow us or Rewards. Array order controls display order." }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Select an icon name that maps to the UI.",
              options: {
                list: [
                  { title: "Menu", value: "menu" },
                  { title: "Directions", value: "directions" },
                  { title: "Phone", value: "phone" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "Catering", value: "catering" },
                  { title: "Apple", value: "apple" },
                  { title: "Google Play", value: "google-play" },
                  { title: "Info", value: "info" },
                ],
              },
            }),
            defineField({ name: "emphasize", title: "Emphasize", type: "boolean", initialValue: false }),
          ],
          preview: {
            select: { title: "label", subtitle: "description" },
          },
        },
      ],
    }),
    defineField({
      name: "locations", title: "Locations", type: "array",
      description: "Each branch owns its address, hours and destinations. An empty list intentionally hides locations.",
      of: [{ type: "object", name: "restaurantLocation", fields: [
        defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
        defineField({ name: "name", title: "Branch name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "address", title: "Address", type: "object", validation: (r) => r.required(), fields: [
          defineField({ name: "streetAddress", title: "Street address", type: "string", validation: (r) => r.required() }),
          defineField({ name: "addressLocality", title: "City", type: "string", validation: (r) => r.required() }),
          defineField({ name: "addressRegion", title: "State / region", type: "string", validation: (r) => r.required() }),
          defineField({ name: "postalCode", title: "Postal code", type: "string", validation: (r) => r.required() }),
          defineField({ name: "addressCountry", title: "Country code", type: "string", validation: (r) => r.required(), description: "Two-letter country code, e.g. US." }),
        ] }),
        defineField({ name: "telephone", title: "Phone", type: "string", description: "Include country code, e.g. +18015551234." }),
        defineField({ name: "timezone", title: "Time zone", type: "string", description: "IANA identifier, e.g. America/Denver.", validation: (r) => r.custom((value) => { if (!value) return true; try { new Intl.DateTimeFormat('en-US', { timeZone: value }); return true; } catch { return "Enter a valid IANA time zone."; } }) }),
        defineField({ name: "hoursFull", title: "Displayed hours", type: "text", rows: 3, description: "Fallback only when no valid weekly hours are supplied. Weekly rows generate the visible hours and structured data together." }),
        defineField({ name: "openingHoursSpecification", title: "Weekly hours", type: "array", of: [{ type: "object", name: "weeklyHours", fields: [
          defineField({ name: "dayOfWeek", title: "Days", type: "array", of: [{ type: "string" }], options: { list: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] }, validation: (r) => r.required().min(1) }),
          defineField({ name: "opens", title: "Opens (HH:mm)", type: "string", validation: (r) => r.required().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/) }),
          defineField({ name: "closes", title: "Closes (HH:mm)", type: "string", validation: (r) => r.required().regex(/^(?:(?:[01]\d|2[0-3]):[0-5]\d|24:00)$/) }),
        ] }] }),
        defineField({ name: "directionsUrl", title: "Directions URL", type: "url", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https"] }).custom((value) => !value || safeWebUrl(value) ? true : "Use a valid web destination.") }),
        defineField({ name: "orderUrl", title: "Branch ordering URL", type: "url", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https"] }).custom((value) => !value || safeWebUrl(value) ? true : "Use a valid web destination.") }),
        defineField({ name: "menuUrl", title: "Branch menu URL", type: "url", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https"] }).custom((value) => !value || safeWebUrl(value) ? true : "Use a valid web destination.") }),
        defineField({ name: "reviewUrl", title: "Branch review URL", type: "url", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https"] }).custom((value) => !value || safeWebUrl(value) ? true : "Use a valid web destination.") }),
      ], preview: { select: { title: "name", subtitle: "address.addressLocality" } } }],
    }),
    defineField({
      name: "storySection", title: "Story (optional)", type: "object", fields: [
        defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "body", title: "Story", type: "text" }),
        defineField({ name: "image", title: "Real business photo", type: "image", options: { hotspot: true } }),
        defineField({ name: "imageCaption", title: "Photo caption", type: "string" }),
      ],
    }),
    defineField({
      name: "galleryImages", title: "Gallery (optional)", type: "array", of: [{ type: "object", name: "galleryPhoto", fields: [
        defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
        defineField({ name: "image", title: "Real business photo", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
        defineField({ name: "caption", title: "Photo description", type: "string" }),
      ], preview: { select: { title: "caption", media: "image" } } }],
    }),
    defineField({
      name: "testimonials", title: "Verified testimonials (optional)", type: "array",
      description: "Use only real quotes with a link to their source and permission where required. Never enter sample reviews.",
      of: [{ type: "object", name: "verifiedTestimonial", fields: [
        defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
        defineField({ name: "name", title: "Reviewer name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "quote", title: "Exact quote", type: "text", validation: (r) => r.required() }),
        defineField({ name: "rating", title: "Actual rating (optional)", type: "number", validation: (r) => r.min(1).max(5) }),
        defineField({ name: "source", title: "Source name", type: "string" }),
        defineField({ name: "sourceUrl", title: "Source link", type: "url", validation: (r) => r.required().custom((value) => !value || safeWebUrl(value) ? true : "Use a valid link to the original review.") }),
      ], preview: { select: { title: "name", subtitle: "quote" } } }],
    }),
    defineField({
      name: "cateringSection", title: "Catering (optional)", type: "object", fields: [
        defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text" }),
        defineField({ name: "image", title: "Real catering photo", type: "image", options: { hotspot: true } }),
        defineField({ name: "ctaLabel", title: "Action label", type: "string" }),
        defineField({ name: "ctaUrl", title: "Action destination", type: "url", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https", "tel", "mailto"] }).custom((value) => !value || safeHref(value) ? true : "Use a valid web, phone or email destination.") }),
      ],
    }),
    defineField({ name: "seo", title: "Search and sharing", type: "object", fields: [
      defineField({ name: "title", title: "Page title", type: "string" }),
      defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
      defineField({ name: "image", title: "Sharing image", type: "image", options: { hotspot: true } }),
    ] }),
    defineField({ name: "footer", title: "Footer (optional)", type: "object", fields: [
      defineField({ name: "text", title: "Footer text", type: "string" }),
      defineField({ name: "privacyUrl", title: "Privacy policy URL", type: "url", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https"] }) }),
      defineField({ name: "termsUrl", title: "Terms URL", type: "url", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https"] }) }),
    ] }),
  ],
  preview: {
    select: { title: "brand.name", subtitle: "brand.tagline" },
  },
});
