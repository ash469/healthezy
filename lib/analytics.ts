// Google Analytics Integration
// Uncomment and use after adding your GA_ID to environment variables

/*
// lib/analytics.ts

// Google Analytics 4
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID as string, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Common event tracking helpers
export const trackBooking = (type: 'doctor' | 'lab' | 'pharmacy') => {
  event({
    action: 'booking_initiated',
    category: 'Engagement',
    label: type,
  });
};

export const trackPayment = (amount: number, type: string) => {
  event({
    action: 'payment_completed',
    category: 'Conversion',
    label: type,
    value: amount,
  });
};

export const trackSearch = (searchTerm: string) => {
  event({
    action: 'search',
    category: 'Engagement',
    label: searchTerm,
  });
};

export const trackProductView = (productName: string) => {
  event({
    action: 'product_view',
    category: 'Engagement',
    label: productName,
  });
};

// Type definition for window.gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}
*/

// Usage in app/layout.tsx:
/*
import Script from 'next/script';
import { GA_TRACKING_ID } from '@/lib/analytics';

// Add inside <body> tag:
{GA_TRACKING_ID && (
  <>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
    <Script
      id="google-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `,
      }}
    />
  </>
)}
*/

// Usage in client components to track events:
/*
'use client';

import { trackBooking, trackPayment } from '@/lib/analytics';

export default function BookingButton() {
  const handleBooking = () => {
    trackBooking('doctor');
    // ... rest of booking logic
  };

  return <button onClick={handleBooking}>Book Now</button>;
}
*/

// For page view tracking with Next.js App Router:
/*
// app/providers.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '@/lib/analytics';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    pageview(url);
  }, [pathname, searchParams]);

  return <>{children}</>;
}

// Then wrap your app in app/layout.tsx:
import { AnalyticsProvider } from './providers';

<AnalyticsProvider>
  {children}
</AnalyticsProvider>
*/

export const ANALYTICS_TEMPLATE = `
To enable Google Analytics:

1. Add to .env.local:
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

2. Uncomment the code in this file (lib/analytics.ts)

3. Add the Script tags to app/layout.tsx as shown in comments

4. Wrap your app with AnalyticsProvider for automatic page tracking

5. Use trackBooking(), trackPayment(), etc. in your components
`;

console.log(ANALYTICS_TEMPLATE);
