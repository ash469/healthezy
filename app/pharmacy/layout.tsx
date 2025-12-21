import { Metadata } from 'next';
import { pageMetadata, siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: pageMetadata.pharmacy.title,
    description: pageMetadata.pharmacy.description,
    keywords: pageMetadata.pharmacy.keywords,
    alternates: {
        canonical: `${siteConfig.url}/pharmacy`
    },
    openGraph: {
        title: pageMetadata.pharmacy.title,
        description: pageMetadata.pharmacy.description,
        url: `${siteConfig.url}/pharmacy`,
        type: 'website'
    }
};

export default function PharmacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
