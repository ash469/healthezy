import { Metadata } from 'next';
import { pageMetadata, siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: pageMetadata.labs.title,
    description: pageMetadata.labs.description,
    keywords: pageMetadata.labs.keywords,
    alternates: {
        canonical: `${siteConfig.url}/labs`
    },
    openGraph: {
        title: pageMetadata.labs.title,
        description: pageMetadata.labs.description,
        url: `${siteConfig.url}/labs`,
        type: 'website'
    }
};

export default function LabsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
