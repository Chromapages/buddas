import { defineField, defineType } from "sanity";

export const landingPage = defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      title: "Brand",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "tagline", title: "Tagline", type: "string" }),
        defineField({
          name: "subline",
          title: "Subline",
          type: "string",
          initialValue: "Bakery & Grill - Order online",
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
          initialValue: "Today 8am-8pm",
        }),
        defineField({
          name: "openingHour",
          title: "Opening Hour (HH:mm)",
          type: "string",
          initialValue: "08:00",
          description: "24-hour format, e.g., 08:00",
        }),
        defineField({
          name: "closingHour",
          title: "Closing Hour (HH:mm)",
          type: "string",
          initialValue: "20:00",
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
        defineField({ name: "menuUrl", title: "Full Menu URL", type: "url", description: "Link to your PDF or website menu" }),
        defineField({ name: "orderUrl", title: "Order URL", type: "url" }),
        defineField({ name: "reviewUrl", title: "Google Review URL", type: "url" }),
      ],
    }),

    defineField({
      name: "promos",
      title: "Promos (Carousel)",
      type: "array",
      of: [
        {
          type: "object",
          name: "promo",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "url", title: "Link URL", type: "url", description: "Optional: Link this promo somewhere (e.g. an order page or info page)" }),
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
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "url", title: "URL", type: "url", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Description", type: "string" }),
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
  ],
  preview: {
    select: { title: "brand.name", subtitle: "brand.tagline" },
  },
});
