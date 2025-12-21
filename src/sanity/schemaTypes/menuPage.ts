import { defineType, defineField } from "sanity";
import { ScrollText } from "lucide-react";

const menuPage = defineType({
    name: "menuPage",
    title: "Menu Page Configuration",
    type: "document",
    icon: ScrollText,
    fields: [
        defineField({
            name: "heroImage",
            title: "Hero Image",
            type: "image",
            description: "Background image for the hero section. Use 'Golden Hour' lighting. Food should fill the frame.",
            options: { hotspot: true }
        }),
        defineField({
            name: "heroTitle",
            title: "Hero Title",
            type: "string",
            initialValue: "The Buddas Menu"
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero Subtitle",
            type: "string",
            initialValue: "Steaming rice. Crisp Katsu. Real Aloha."
        }),
        defineField({
            name: "heroCta",
            title: "Hero CTA",
            type: "object",
            options: { collapsible: true },
            fields: [
                defineField({ name: "label", title: "Label", type: "string", initialValue: "Order Online" }),
                defineField({ name: "link", title: "Link", type: "url", initialValue: "https://order.buddashawaiian.com" })
            ]
        }),
        defineField({
            name: "featuredItemsTitle",
            title: "Featured Items Section Title",
            type: "string",
            initialValue: "Customer Favorites"
        }),
        defineField({
            name: "closingCta",
            title: "Closing CTA Section",
            type: "object",
            options: { collapsible: true },
            fields: [
                defineField({ name: "title", title: "Title", type: "string", initialValue: "Ready to Order?" }),
                defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
                defineField({ name: "buttonLabel", title: "Button Label", type: "string", initialValue: "Order Now" }),
                defineField({ name: "buttonLink", title: "Button Link", type: "url" }),
                defineField({ name: "phone", title: "Phone Number", type: "string", description: "Phone number for orders" })
            ]
        }),
        defineField({
            name: "allergenStatement",
            title: "Allergen Statement",
            type: "text",
            description: "General dietary accommodations message",
            rows: 3
        })
    ],
    preview: {
        select: {
            title: "heroTitle"
        },
        prepare({ title }) {
            return {
                title: title || "Menu Page Configuration"
            };
        }
    }
});

export default menuPage;
