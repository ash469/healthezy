import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://healthezy.com';
    const currentDate = new Date();

    // Static pages
    const staticPages = [
        '',
        '/doctors',
        '/labs',
        '/pharmacy',
        '/hospital',
        '/shop',
        '/about',
        '/contact',
        '/blog',
        '/login',
        '/signup',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    return [...staticPages];
}
