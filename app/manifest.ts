import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Healthezy - Your Trusted Healthcare Platform',
        short_name: 'Healthezy',
        description: 'Connect with doctors, book lab tests, find pharmacies, and shop for health products',
        start_url: '/',
        id: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0e5c63',
        orientation: 'portrait-primary',

        // Icons
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

        // Screenshots for app store listings
        screenshots: [
            {
                src: '/screenshot-mobile.png',
                sizes: '375x812',
                type: 'image/png',
                form_factor: 'narrow',
                label: 'Healthezy Homepage - Mobile View'
            },
            {
                src: '/screenshot-desktop.png',
                sizes: '1920x1080',
                type: 'image/png',
                form_factor: 'wide',
                label: 'Healthezy Homepage - Desktop View'
            }
        ],

        // App shortcuts
        shortcuts: [
            {
                name: 'Book Doctor',
                short_name: 'Doctor',
                description: 'Book an appointment with a doctor',
                url: '/doctors',
                icons: [
                    {
                        src: '/web-app-manifest-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    }
                ]
            },
            {
                name: 'Lab Tests',
                short_name: 'Labs',
                description: 'Browse and book lab tests',
                url: '/labs',
                icons: [
                    {
                        src: '/web-app-manifest-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    }
                ]
            },
            {
                name: 'Find Pharmacy',
                short_name: 'Pharmacy',
                description: 'Find nearby pharmacies',
                url: '/pharmacy',
                icons: [
                    {
                        src: '/web-app-manifest-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    }
                ]
            },
            {
                name: 'Shop Products',
                short_name: 'Shop',
                description: 'Browse health products',
                url: '/e-commerce',
                icons: [
                    {
                        src: '/web-app-manifest-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    }
                ]
            }
        ],

        // File handlers for opening medical documents
        file_handlers: [
            {
                action: '/upload',
                accept: {
                    'application/pdf': ['.pdf'],
                    'image/png': ['.png'],
                    'image/jpeg': ['.jpg', '.jpeg']
                }
            }
        ],

        // Launch handler
        launch_handler: {
            client_mode: ['navigate-existing', 'auto']
        },

        // Protocol handlers for deep linking
        protocol_handlers: [
            {
                protocol: 'web+healthezy',
                url: '/?action=%s'
            }
        ],

        // Share target for sharing health records
        share_target: {
            action: '/share',
            method: 'POST',
            enctype: 'multipart/form-data',
            params: {
                title: 'title',
                text: 'text',
                url: 'url',
                files: [
                    {
                        name: 'medical_files',
                        accept: ['image/*', 'application/pdf']
                    }
                ]
            }
        },

        // Display override for different display modes
        display_override: ['window-controls-overlay', 'standalone', 'browser'],

        // Categories
        categories: ['health', 'medical', 'lifestyle'],
    };
}
