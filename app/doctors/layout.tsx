import { Metadata } from 'next';
import { pageMetadata, siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: pageMetadata.doctors.title,
    description: pageMetadata.doctors.description,
    keywords: pageMetadata.doctors.keywords,
    alternates: {
        canonical: `${siteConfig.url}/doctors`
    },
    openGraph: {
        title: pageMetadata.doctors.title,
        description: pageMetadata.doctors.description,
        url: `${siteConfig.url}/doctors`,
        type: 'website'
    }
};

export default function DoctorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
