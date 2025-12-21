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

    // You can add dynamic routes here
    // For example, individual doctor pages, blog posts, etc.
    // const doctors = await getDoctors();
    // const doctorPages = doctors.map((doctor) => ({
    //   url: `${baseUrl}/doctors/${doctor.id}`,
    //   lastModified: doctor.updatedAt,
    //   changeFrequency: 'monthly',
    //   priority: 0.6,
    // }));

    return [...staticPages];
}
