import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Healthezy - Your Trusted Healthcare Platform',
        short_name: 'Healthezy',
        description: 'Connect with doctors, book lab tests, find pharmacies, and shop for health products',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0e5c63',
        orientation: 'portrait',
        icons: [
            {
                src: '/web-app-manifest-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/web-app-manifest-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/web-app-manifest-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/web-app-manifest-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            }
        ],
        categories: ['health', 'medical', 'lifestyle']
    };
}
