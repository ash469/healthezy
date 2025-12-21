import { Metadata } from 'next';
import { pageMetadata, siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: pageMetadata.hospital.title,
    description: pageMetadata.hospital.description,
    keywords: pageMetadata.hospital.keywords,
    alternates: {
        canonical: `${siteConfig.url}/hospital`
    },
    openGraph: {
        title: pageMetadata.hospital.title,
        description: pageMetadata.hospital.description,
        url: `${siteConfig.url}/hospital`,
        type: 'website'
    }
};

export default function HospitalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
