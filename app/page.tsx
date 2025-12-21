import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import ServiceGrid from '@/components/home/ServiceGrid';
import PromoBanner from '@/components/home/PromoBanner';
import Features from '@/components/home/Features';
import Stats from '@/components/home/Stats';
import AppDownload from '@/components/home/AppDownload';
import NetworkSection from '@/components/home/NetworkSection';
import { pageMetadata, siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
  keywords: pageMetadata.home.keywords,
  alternates: {
    canonical: siteConfig.url
  },
  openGraph: {
    title: pageMetadata.home.title,
    description: pageMetadata.home.description,
    url: siteConfig.url,
    type: 'website'
  }
};


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ServiceGrid />
      <PromoBanner />
      <Features />
      <Stats />
      <AppDownload />
      <NetworkSection />
    </div>
  );
}

