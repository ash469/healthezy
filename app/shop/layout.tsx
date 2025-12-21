import { Metadata } from 'next';
import { pageMetadata, siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: pageMetadata.shop.title,
    description: pageMetadata.shop.description,
    keywords: pageMetadata.shop.keywords,
    alternates: {
        canonical: `${siteConfig.url}/shop`
    },
    openGraph: {
        title: pageMetadata.shop.title,
        description: pageMetadata.shop.description,
        url: `${siteConfig.url}/shop`,
        type: 'website'
    }
};

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
