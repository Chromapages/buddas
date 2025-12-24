import { defineField, defineType } from 'sanity'
import { Home } from 'lucide-react'

const homePage = defineType({
    name: 'homePage',
    title: 'Home Page',
    type: 'document',
    icon: Home,
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            description: 'Internal title for this page (e.g. "Home Page")',
            initialValue: 'Home Page',
            readOnly: true
        }),
        defineField({
            name: 'heroSlides',
            title: 'Hero Slides',
            type: 'array',
            of: [{ type: 'heroSlide' }],
            description: 'Main carousel items at the top of the homepage.',
            options: {
                layout: 'grid'
            }
        }),
        // Add more homepage specific global sections here if needed
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo',
            description: 'SEO settings specifically for the homepage'
        })
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: title || 'Home Page',
                subtitle: 'Main Landing Page'
            }
        }
    }
})

export default homePage;
