// sanity/schemaTypes/menuItem.ts
import { defineType, defineField } from "sanity";
import { UtensilsCrossed } from "lucide-react";

const menuItem = defineType({
    name: "menuItem",
    title: "Menu Item",
    icon: UtensilsCrossed,
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required().max(60).warning("Keep titles concise for menu boards."),
        }),
        defineField({
            name: "isSignature",
            title: "Signature Item?",
            type: "boolean",
            description: "Mark as a signature/popular item for a 'Gold Badge'.",
            initialValue: false,
        }),
        defineField({
            name: "isFeatured",
            title: "Featured Item?",
            type: "boolean",
            description: "Show in the Featured Items section at the top of the menu.",
            initialValue: false,
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "reference",
            to: [{ type: "menuCategory" }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            description: "Use the 'Aloha Filter': Warm, Honest, Efficient. (e.g., 'Char-grilled' instead of 'Grilled').",
            validation: (Rule) => Rule.max(200).warning("Descriptions should be easily scannable."),
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            description: "Enter price as a number (e.g., 11.99).",
            validation: (Rule) => Rule.min(0),
        }),
        defineField({
            name: "priceNote",
            title: "Price Note (Optional)",
            type: "string",
            description: 'For special cases like "Market price" or combo notes.',
        }),
        defineField({
            name: "comboPrice",
            title: "Combo Price (Optional)",
            type: "number",
            description: "Price for the combo option (e.g., 14.99).",
        }),
        defineField({
            name: "comboPriceNote",
            title: "Combo Price Note (Optional)",
            type: "string",
            description: 'Details about the combo (e.g., "Includes fries and drink").',
        }),
        defineField({
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "tags",
                list: [
                    { title: "Signature (Gold Badge)", value: "signature" },
                    { title: "Popular (Teal Badge)", value: "popular" },
                    { title: "Spicy", value: "spicy" },
                    { title: "Keiki-friendly", value: "keikiFriendly" },
                    { title: "Vegetarian", value: "vegetarian" },
                    { title: "Gluten-friendly", value: "glutenFriendly" },
                    { title: "New Arrival", value: "new" },
                ],
            },
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            description: "Must use 'Golden Hour' lighting. Generosity crop (fill the frame). No cold/blue tones.",
            options: { hotspot: true },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alt Text",
                    type: "string",
                    validation: (Rule) =>
                        Rule.required().error("Alt text is required for menu item images."),
                }),
            ],
        }),

        defineField({
            name: "prepTime",
            title: "Prep Time (Minutes)",
            type: "string",
            description: "Estimated prep time (e.g., '10-15', '20+').",
            initialValue: "15-20",
        }),
        defineField({
            name: "calories",
            title: "Calories",
            type: "number",
            description: "Caloric content of the item.",
        }),
        defineField({
            name: "allergens",
            title: "Allergens",
            type: "array",
            of: [{ type: "string" }],
            options: {
                list: [
                    { title: "Dairy", value: "dairy" },
                    { title: "Egg", value: "egg" },
                    { title: "Gluten", value: "gluten" },
                    { title: "Peanut", value: "peanut" },
                    { title: "Seafood", value: "seafood" },
                    { title: "Sesame", value: "sesame" },
                    { title: "Soy", value: "soy" },
                    { title: "Tree Nut", value: "treeNut" },
                    { title: "Wheat", value: "wheat" },
                ],
            },
        }),
        defineField({
            name: "ingredients",
            title: "Ingredients",
            type: "text",
            rows: 3,
            description: "List of main ingredients.",
        }),
    ],
});

export default menuItem;
