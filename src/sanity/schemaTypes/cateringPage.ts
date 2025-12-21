import { defineType, defineField } from "sanity";
import { ChefHat } from "lucide-react";

const cateringPage = defineType({
    name: "cateringPage",
    title: "Catering Page",
    icon: ChefHat,
    type: "document",
    groups: [
        { name: "content", title: "Page Content", default: true },
        { name: "teaser", title: "Homepage Teaser" },
        { name: "menu", title: "Menu & Services" },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        defineField({
            name: "title",
            title: "Internal Title",
            type: "string",
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "heroTitle",
            title: "Hero Title",
            type: "string",
            description: "Use the 'Aloha Filter': Warm, Honest, Efficient. (e.g., 'Feed the Whole Crew').",
            group: "content",
            validation: (Rule) => Rule.max(60).warning("Keep titles punchy for impact."),
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero Subtitle",
            type: "string",
            description: "Elaborate on the benefit. (e.g., 'Office lunches, private parties...').",
            group: "content",
            validation: (Rule) => Rule.max(120),
        }),
        defineField({
            name: "heroImage",
            title: "Hero Image",
            type: "image",
            description: "Must use 'Golden Hour' lighting. Generosity crop (fill the frame). No cold/blue tones.",
            options: { hotspot: true },
            group: "content",
            fields: [
                defineField({
                    name: "alt",
                    title: "Alt Text",
                    type: "string",
                }),
            ],
        }),
        defineField({
            name: "heroCtaLabel",
            title: "Hero CTA Label",
            type: "string",
            group: "content",
        }),
        defineField({
            name: "heroCtaLink",
            title: "Hero CTA Link",
            type: "url",
            group: "content",
        }),
        defineField({
            name: "menuPdf",
            title: "Downloadable Menu PDF",
            type: "file",
            group: "content",
            options: { accept: ".pdf" }
        }),
        defineField({
            name: "introduction",
            title: "Introduction Text",
            type: "text",
            rows: 3,
            group: "content",
            description: "A welcoming message introducing the catering services.",
        }),
        defineField({
            name: "testimonial",
            title: "Featured Testimonial",
            type: "object",
            group: "content",
            fields: [
                defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
                defineField({ name: "authorName", title: "Author Name", type: "string" }),
                defineField({ name: "authorTitle", title: "Author Title", type: "string" }),
                defineField({ name: "authorImage", title: "Author Image", type: "image", options: { hotspot: true } }),
                defineField({
                    name: "backgroundImage",
                    title: "Background Image",
                    type: "image",
                    options: { hotspot: true },
                    description: "Darker, atmospheric image works best."
                }),
            ],
        }),
        defineField({
            name: "trustedBy",
            title: "Trusted By (Catering Partners)",
            type: "object",
            group: "content",
            description: "Showcase companies that have used your catering services.",
            fields: [
                defineField({
                    name: "title",
                    title: "Section Title",
                    type: "string",
                    initialValue: "Trusted by Leading Companies",
                }),
                defineField({
                    name: "partners",
                    title: "Partners",
                    type: "array",
                    of: [
                        {
                            type: "object",
                            name: "partner",
                            title: "Partner",
                            fields: [
                                defineField({ name: "name", title: "Company Name", type: "string", validation: (Rule) => Rule.required() }),
                                defineField({ name: "url", title: "Website URL", type: "url" }),
                                defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true }, description: "SVG or WebP preferred. Max 30KB." }),
                            ],
                        },
                    ],
                }),
            ],
        }),

        // --- HOMEPAGE TEASER CONFIG (MOVED TO TOP LEVEL TO RESTORE DATA) ---
        // Call to Action Badges
        defineField({
            name: "teaserBadge",
            title: "Catering Badge",
            type: "string",
            group: "teaser",
            initialValue: "The Office Hero",
            validation: (Rule) => Rule.max(20).warning("Keep badges short."),
        }),
        defineField({
            name: "eventsBadge",
            title: "Events Badge",
            type: "string",
            group: "teaser",
            initialValue: "Private Parties",
            validation: (Rule) => Rule.max(20).warning("Keep badges short."),
        }),
        defineField({
            name: "communityBadge",
            title: "Community Badge",
            type: "string",
            group: "teaser",
            initialValue: "Benefit Nights",
            validation: (Rule) => Rule.max(20).warning("Keep badges short."),
        }),

        // CATERING CARD
        defineField({
            name: "cateringTitle",
            title: "Catering Card Title",
            type: "string",
            group: "teaser",
            initialValue: "Feed the Whole Crew",
        }),
        defineField({
            name: "cateringDescription",
            title: "Catering Card Description",
            type: "text",
            group: "teaser",
            rows: 2,
            initialValue: "From office lunches to wedding receptions, bring the aloha spirit to your next gathering.",
        }),
        defineField({
            name: "cateringImage",
            title: "Catering Card Image",
            type: "image",
            group: "teaser",
            options: { hotspot: true },
        }),
        defineField({
            name: "cateringCtaLabel",
            title: "Catering CTA Label",
            type: "string",
            group: "teaser",
            initialValue: "View Catering",
        }),
        defineField({
            name: "cateringCtaLink",
            title: "Catering CTA Link",
            type: "url",
            group: "teaser",
        }),

        // EVENTS CARD
        defineField({
            name: "eventsTitle",
            title: "Events Card Title",
            type: "string",
            group: "teaser",
            initialValue: "Celebrate with Us",
        }),
        defineField({
            name: "eventsDescription",
            title: "Events Card Description",
            type: "text",
            group: "teaser",
            rows: 2,
            initialValue: "Reserve our dining area or outdoor patio for your special occasion.",
        }),
        defineField({
            name: "eventsImage",
            title: "Events Card Image",
            type: "image",
            group: "teaser",
            options: { hotspot: true },
        }),
        defineField({
            name: "eventsCtaLabel",
            title: "Events CTA Label",
            type: "string",
            group: "teaser",
            initialValue: "Book an Event",
        }),
        defineField({
            name: "eventsCtaLink",
            title: "Events CTA Link",
            type: "url",
            group: "teaser",
        }),

        // COMMUNITY CARD
        defineField({
            name: "communityTitle",
            title: "Community Card Title",
            type: "string",
            group: "teaser",
            initialValue: "Fundraising & Community",
        }),
        defineField({
            name: "communityDescription",
            title: "Community Card Description",
            type: "text",
            group: "teaser",
            rows: 2,
            initialValue: "Partner with us for benefit nights, school fundraisers, and community events.",
        }),
        defineField({
            name: "communityImage",
            title: "Community Card Image",
            type: "image",
            group: "teaser",
            options: { hotspot: true },
        }),
        defineField({
            name: "communityCtaLabel",
            title: "Community CTA Label",
            type: "string",
            group: "teaser",
            initialValue: "Learn More",
        }),
        defineField({
            name: "communityCtaLink",
            title: "Community CTA Link",
            type: "url",
            group: "teaser",
        }),

        // --- MENU SECTION ---
        defineField({
            name: "valueProposition",
            title: "Value Proposition (Why Choose Us)",
            type: "array",
            group: "content",
            of: [
                defineField({
                    name: "feature",
                    type: "object",
                    fields: [
                        defineField({ name: "title", title: "Title", type: "string" }),
                        defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
                        defineField({
                            name: "icon",
                            title: "Icon",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Fresh Daily", value: "fresh" },
                                    { title: "Authentic", value: "authentic" },
                                    { title: "Flexible", value: "flexible" },
                                    { title: "Dietary Friendly", value: "dietary" }
                                ]
                            }
                        })
                    ]
                })
            ]
        }),
        defineField({
            name: "serviceTypes",
            title: "Service Types",
            type: "array",
            group: "menu",
            of: [
                defineField({
                    name: "serviceType",
                    title: "Service Type",
                    type: "object",
                    fields: [
                        defineField({
                            name: "title",
                            title: "Title",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: "description",
                            title: "Description",
                            type: "text",
                            rows: 2,
                        }),
                        defineField({
                            name: "icon",
                            title: "Icon",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Briefcase (Corporate)", value: "briefcase" },
                                    { title: "Heart (Wedding)", value: "heart" },
                                    { title: "Party Popper (Social)", value: "party" },
                                    { title: "Chef Hat (Private)", value: "chef" }
                                ]
                            }
                        }),
                        defineField({
                            name: "image",
                            title: "Image",
                            type: "image",
                            options: { hotspot: true },
                        }),
                        defineField({
                            name: "ctaLink",
                            title: "CTA Link (e.g. /contact)",
                            type: "url",
                            validation: (Rule) => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel', '/'] }),
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: "menuHighlights",
            title: "Menu Highlights / Packages",
            type: "array",
            group: "menu",
            of: [
                defineField({
                    name: "item",
                    title: "Item",
                    type: "object",
                    fields: [
                        defineField({
                            name: "name",
                            title: "Name",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: "description",
                            title: "Description",
                            type: "text",
                            rows: 2,
                        }),
                        defineField({
                            name: "price",
                            title: "Price / Price Range",
                            type: "string",
                        }),
                        defineField({
                            name: "image",
                            title: "Image",
                            type: "image",
                            options: { hotspot: true },
                        }),
                        defineField({
                            name: "guestCount",
                            title: "Guest Count Label",
                            type: "string",
                            initialValue: "10-20 ppl",
                            description: "E.g., '10-20 ppl' or 'Min 15 people'",
                        }),
                        defineField({
                            name: "features",
                            title: "Package Features",
                            type: "array",
                            of: [{ type: "string" }],
                            description: "List 3-4 key features like 'Premium Ingredients', 'Customizable', etc.",
                        }),
                        defineField({
                            name: "isBestseller",
                            title: "Is Bestseller?",
                            type: "boolean",
                            initialValue: false
                        }),
                        defineField({
                            name: "dietaryTags",
                            title: "Dietary Tags",
                            type: "array",
                            of: [{ type: "string" }],
                            options: {
                                list: [
                                    { title: "Vegetarian", value: "Vegetarian" },
                                    { title: "Gluten-Free", value: "GF" },
                                    { title: "Vegan", value: "Vegan" },
                                    { title: "Dairy-Free", value: "DF" },
                                    { title: "Nut-Free", value: "NF" },
                                    { title: "Spicy", value: "Spicy" }
                                ]
                            }
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: "testimonials",
            title: "Testimonials",
            type: "array",
            group: "content",
            of: [
                defineField({
                    name: "testimonial",
                    type: "object",
                    fields: [
                        defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
                        defineField({ name: "authorName", title: "Author Name", type: "string" }),
                        defineField({ name: "authorTitle", title: "Author Title/Role", type: "string" }),
                        defineField({ name: "authorImage", title: "Author Image", type: "image", options: { hotspot: true } }),
                        defineField({
                            name: "eventType",
                            title: "Event Type",
                            type: "string",
                            options: { list: ["Corporate", "Wedding", "Private Party", "Community"] }
                        })
                    ]
                })
            ]
        }),
        defineField({
            name: "howItWorks",
            title: "How It Works",
            type: "array",
            group: "menu",
            of: [
                defineField({
                    name: "step",
                    title: "Step",
                    type: "object",
                    fields: [
                        defineField({
                            name: "title",
                            title: "Title",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: "description",
                            title: "Description",
                            type: "text",
                            rows: 2,
                        }),
                        defineField({
                            name: "icon",
                            title: "Icon",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Clipboard (Quote)", value: "clipboard" },
                                    { title: "Calendar (Plan)", value: "calendar" },
                                    { title: "Chef Hat (Cook)", value: "chef" },
                                    { title: "Package (Deliver)", value: "package" }
                                ]
                            }
                        }),
                        defineField({
                            name: "customIcon",
                            title: "Custom Icon (Image)",
                            type: "image",
                            options: { hotspot: true },
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: "faq",
            title: "FAQ",
            type: "array",
            group: "menu",
            of: [
                defineField({
                    name: "faqItem",
                    title: "FAQ Item",
                    type: "object",
                    fields: [
                        defineField({
                            name: "question",
                            title: "Question",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: "answer",
                            title: "Answer",
                            type: "text",
                            rows: 3,
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: "closingCta",
            title: "Closing CTA",
            type: "object",
            group: "content",
            fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
                defineField({ name: "buttonLabel", title: "Button Label", type: "string" }),
                defineField({ name: "buttonLink", title: "Button Link", type: "url" }),
            ]
        }),
        defineField({
            name: "gallery",
            title: "Catering Gallery",
            type: "array",
            group: "content",
            of: [
                defineField({
                    name: "image",
                    type: "image",
                    title: "Image",
                    options: { hotspot: true },
                    fields: [
                        defineField({ name: "alt", title: "Alt Text", type: "string" }),
                        defineField({ name: "caption", title: "Caption", type: "string" })
                    ]
                })
            ]
        }),
        defineField({
            name: "pricingSection",
            title: "Pricing Section",
            type: "object",
            group: "menu",
            fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
                defineField({ name: "minimumNote", title: "Minimum Order Note", type: "string" }),
                defineField({
                    name: "packages",
                    title: "Packages",
                    type: "array",
                    of: [{
                        type: "object",
                        fields: [
                            defineField({ name: "name", title: "Name", type: "string" }),
                            defineField({ name: "price", title: "Price", type: "string" }),
                            defineField({ name: "description", title: "Description", type: "string" }),
                            defineField({ name: "features", title: "Features", type: "array", of: [{ type: "string" }] })
                        ]
                    }]
                }),
            ]
        }),
        defineField({
            name: "quoteFormConfig",
            title: "Quote Form Configuration",
            type: "object",
            group: "content",
            fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "subtitle", title: "Subtitle", type: "text" }),
            ]
        }),
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
            group: "seo",
        }),
    ],
});

export default cateringPage;
