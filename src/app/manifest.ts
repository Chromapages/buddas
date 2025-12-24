import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Buddas Bakery Manager',
        short_name: 'Buddas Admin',
        description: 'Mobile Content Management for Buddas Bakery & Grill',
        start_url: '/studio',
        display: 'standalone',
        background_color: '#0D2B27', // Buddas Deepest Teal
        theme_color: '#54BFA5',       // Buddas Teal
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
