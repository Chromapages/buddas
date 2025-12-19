import { defineType, defineField } from "sanity";

const benefitNightsPage = defineType({
    name: "benefitNightsPage",
    title: "Events & Fundraising",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Page Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "heroTitle",
            title: "Hero Title",
            type: "string",
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero Subtitle",
            type: "string",
        }),
        defineField({
            name: "heroBadge",
            title: "Hero Badge Text",
            type: "string",
            description: "e.g. \"Full Service Event Planning\"",
            initialValue: "Full Service Event Planning"
        }),
        defineField({
            name: "heroImage",
            title: "Hero Image",
            type: "image",
            options: { hotspot: true },
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
        }),
        defineField({
            name: "heroCtaLink",
            title: "Hero CTA Link",
            type: "url",
        }),
        defineField({
            name: "trustedBy",
            title: "Trusted By (Partners)",
            type: "object",
            fields: [
                defineField({
                    name: "title",
                    title: "Section Title",
                    type: "string",
                    initialValue: "Event Partners & Corporate Clients",
                }),
                defineField({
                    name: "partners",
                    title: "Partners",
                    type: "array",
                    of: [
                        defineField({
                            name: "partner",
                            title: "Partner",
                            type: "object",
                            fields: [
                                defineField({ name: "name", title: "Name", type: "string" }),
                                defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
                            ],
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: "headlinePercentage",
            title: "Headline Percentage / Offer",
            type: "string",
            description: "e.g., \"20% Giveback\"",
        }),
        defineField({
            name: "benefitsSectionTitle",
            title: "Benefits Section Title",
            type: "string",
            initialValue: "Designed for Every Occasion"
        }),
        defineField({
            name: "benefitsSectionSubtitle",
            title: "Benefits Section Subtitle",
            type: "text",
            rows: 2,
            initialValue: "We don't just provide food; we provide an atmosphere. Choose the category that best fits your upcoming event."
        }),
        defineField({
            name: "benefits",
            title: "Benefits / Perks (Why Host With Us)",
            type: "array",
            of: [
                defineField({
                    name: "benefit",
                    title: "Benefit",
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
                            type: "image",
                            options: { hotspot: true },
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: "howItWorksSectionTitle",
            title: "How It Works Section Title",
            type: "string",
            initialValue: "Everything You Need"
        }),
        defineField({
            name: "howItWorksSectionSubtitle",
            title: "How It Works Section Subtitle",
            type: "text",
            rows: 2,
            initialValue: "Comprehensive event services so you can enjoy the moment."
        }),
        defineField({
            name: "howItWorks",
            title: "How It Works",
            type: "array",
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
            name: "statsSection",
            title: "Stats / Break Section (Experience the Art of Food)",
            type: "object",
            fields: [
                defineField({
                    name: "title",
                    title: "Title",
                    type: "string",
                    initialValue: "Experience the Art of Food",
                }),
                defineField({
                    name: "description",
                    title: "Description",
                    type: "text",
                    rows: 3,
                    initialValue: "Our team of world-class chefs uses only the freshest, locally sourced ingredients to create masterpieces on every plate.",
                }),
                defineField({
                    name: "image",
                    title: "Background Image",
                    type: "image",
                    options: { hotspot: true },
                }),
                defineField({
                    name: "stat1Value",
                    title: "Stat 1 Value",
                    type: "string",
                    initialValue: "500+",
                }),
                defineField({
                    name: "stat1Label",
                    title: "Stat 1 Label",
                    type: "string",
                    initialValue: "Events Annually",
                }),
                defineField({
                    name: "stat2Value",
                    title: "Stat 2 Value",
                    type: "string",
                    initialValue: "4.9",
                }),
                defineField({
                    name: "stat2Label",
                    title: "Stat 2 Label",
                    type: "string",
                    initialValue: "/ 5 Client Satisfaction",
                }),
            ],
        }),
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
        }),
    ],
});

export default benefitNightsPage;
