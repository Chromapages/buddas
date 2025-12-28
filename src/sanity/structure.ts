import type { StructureResolver } from 'sanity/structure'
import {
    Settings,
    MapPin,
    UtensilsCrossed,
    List,
    FileText,
    Info,
    ChefHat,
    Gift,
    Moon,
    Link as LinkIcon,
    Megaphone,
    MessageSquareQuote,
    Award,

} from 'lucide-react'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title('Buddas Manager')
        .items([


            // --- Global Configuration ---
            S.listItem()
                .title('Site Settings')
                .icon(Settings)
                .child(
                    S.document()
                        .schemaType('siteSettings')
                        .documentId('siteSettings')
                        .title('Site Settings')
                ),
            S.documentTypeListItem('location')
                .title('Locations')
                .icon(MapPin),

            S.divider(),

            // --- Menu Management ---
            S.documentTypeListItem('menuItem')
                .title('Menu Items')
                .icon(UtensilsCrossed),
            S.documentTypeListItem('menuCategory')
                .title('Categories')
                .icon(List),

            S.divider(),

            // --- Page Content (Singletons) ---
            S.listItem()
                .title('Pages')
                .icon(FileText)
                .child(
                    S.list()
                        .title('Page Content')
                        .items([
                            S.listItem()
                                .title('About Us')
                                .icon(Info)
                                .child(
                                    S.document()
                                        .schemaType('aboutPage')
                                        .documentId('aboutPage')
                                        .title('About Us')
                                ),
                            S.listItem()
                                .title('Catering & Events')
                                .icon(ChefHat)
                                .child(
                                    S.document()
                                        .schemaType('cateringPage')
                                        .documentId('cateringPage')
                                        .title('Catering & Events')
                                ),
                            S.listItem()
                                .title('Rewards Program')
                                .icon(Gift)
                                .child(
                                    S.document()
                                        .schemaType('rewardsPage')
                                        .documentId('rewardsPage')
                                        .title('Rewards Program')
                                ),
                            S.listItem()
                                .title('Benefit Nights')
                                .icon(Moon)
                                .child(
                                    S.document()
                                        .schemaType('benefitNightsPage')
                                        .documentId('benefitNightsPage')
                                        .title('Benefit Nights')
                                ),
                            S.listItem()
                                .title('Buddalinks')
                                .icon(LinkIcon)
                                .child(
                                    S.document()
                                        .schemaType('buddalinksPage')
                                        .documentId('buddalinksPage')
                                        .title('Buddalinks Bio')
                                ),
                        ])
                ),

            S.divider(),

            // --- Marketing & Growth ---
            S.documentTypeListItem('promotion')
                .title('Promotions')
                .icon(Megaphone),
            S.documentTypeListItem('testimonial')
                .title('Testimonials')
                .icon(MessageSquareQuote),
            S.documentTypeListItem('program')
                .title('Loyalty Programs')
                .icon(Award),

            S.divider(),

            // --- System / All Docs (Hidden in production usually, but good for dev) ---
            // Filtering out the singletons to avoid duplication is clearer
            ...S.documentTypeListItems().filter(
                (listItem) =>
                    ![
                        'siteSettings',
                        'location',
                        'menuItem',
                        'menuCategory',
                        'aboutPage',
                        'cateringPage',
                        'rewardsPage',
                        'benefitNightsPage',
                        'buddalinksPage',
                        'promotion',
                        'testimonial',
                        'program',

                        'heroSlide', // If it's an object, it won't be here anyway, but good to check
                        'seo'
                    ].includes(listItem.getId() as string)
            ),
        ])
