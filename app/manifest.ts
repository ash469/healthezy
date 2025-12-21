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
        // Shortcuts temporarily removed until proper 96x96 icons are created
        // Uncomment after creating correctly sized shortcut icons
        // shortcuts: [
        //     {
        //         name: 'Book Doctor',
        //         short_name: 'Doctors',
        //         description: 'Book a doctor consultation',
        //         url: '/doctors',
        //         icons: [{ src: '/icons/doctor-96.png', sizes: '96x96' }]
        //     },
        //     {
        //         name: 'Lab Tests',
        //         short_name: 'Labs',
        //         description: 'Book diagnostic tests',
        //         url: '/labs',
        //         icons: [{ src: '/icons/lab-96.png', sizes: '96x96' }]
        //     },
        //     {
        //         name: 'Shop',
        //         short_name: 'Shop',
        //         description: 'Buy health products',
        //         url: '/shop',
        //         icons: [{ src: '/icons/shop-96.png', sizes: '96x96' }]
        //     }
        // ]
    };
}
