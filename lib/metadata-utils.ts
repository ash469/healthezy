// Metadata generation utilities for dynamic routes

import { Metadata } from 'next';
import { siteConfig } from './seo-config';

/**
 * Generate metadata for doctor detail pages
 */
export function generateDoctorMetadata(doctor: {
    id: string;
    name: string;
    specialty: string;
    description?: string;
    experience?: string;
}): Metadata {
    const title = `Dr. ${doctor.name} - ${doctor.specialty} | ${siteConfig.name}`;
    const description =
        doctor.description ||
        `Book appointment with Dr. ${doctor.name}, an experienced ${doctor.specialty} with ${doctor.experience} of experience. Get expert medical consultation.`;

    return {
        title,
        description,
        keywords: [
            doctor.name,
            doctor.specialty,
            'doctor consultation',
            'book appointment',
            'medical consultation',
        ],
        alternates: {
            canonical: `${siteConfig.url}/doctors/${doctor.id}`,
        },
        openGraph: {
            title,
            description,
            url: `${siteConfig.url}/doctors/${doctor.id}`,
            type: 'profile',
        },
    };
}

/**
 * Generate metadata for hospital detail pages
 */
export function generateHospitalMetadata(hospital: {
    id: string;
    name: string;
    location?: string;
    description?: string;
}): Metadata {
    const title = `${hospital.name} | ${siteConfig.name}`;
    const description =
        hospital.description ||
        `Find information about ${hospital.name}${hospital.location ? ` in ${hospital.location}` : ''}. Book appointments with specialist doctors, view facilities, and more.`;

    return {
        title,
        description,
        keywords: [hospital.name, 'hospital', 'medical center', hospital.location || ''].filter(
            Boolean
        ),
        alternates: {
            canonical: `${siteConfig.url}/hospital/${hospital.id}`,
        },
        openGraph: {
            title,
            description,
            url: `${siteConfig.url}/hospital/${hospital.id}`,
            type: 'website',
        },
    };
}

/**
 * Generate metadata for lab detail pages
 */
export function generateLabMetadata(lab: {
    id: string;
    name: string;
    location?: string;
    description?: string;
}): Metadata {
    const title = `${lab.name} - Book Diagnostic Tests | ${siteConfig.name}`;
    const description =
        lab.description ||
        `Book diagnostic tests at ${lab.name}${lab.location ? ` in ${lab.location}` : ''}. Home sample collection available. Accurate reports from certified labs.`;

    return {
        title,
        description,
        keywords: [lab.name, 'diagnostic lab', 'lab tests', 'pathology', lab.location || ''].filter(
            Boolean
        ),
        alternates: {
            canonical: `${siteConfig.url}/labs/${lab.id}`,
        },
        openGraph: {
            title,
            description,
            url: `${siteConfig.url}/labs/${lab.id}`,
            type: 'website',
        },
    };
}

/**
 * Generate metadata for pharmacy detail pages
 */
export function generatePharmacyMetadata(pharmacy: {
    id: string;
    name: string;
    location?: string;
    description?: string;
}): Metadata {
    const title = `${pharmacy.name} - Online Pharmacy | ${siteConfig.name}`;
    const description =
        pharmacy.description ||
        `Order medicines from ${pharmacy.name}${pharmacy.location ? ` in ${pharmacy.location}` : ''}. Genuine medicines, fast delivery, and expert consultation available.`;

    return {
        title,
        description,
        keywords: [
            pharmacy.name,
            'pharmacy',
            'medicine delivery',
            'online pharmacy',
            pharmacy.location || '',
        ].filter(Boolean),
        alternates: {
            canonical: `${siteConfig.url}/pharmacy/${pharmacy.id}`,
        },
        openGraph: {
            title,
            description,
            url: `${siteConfig.url}/pharmacy/${pharmacy.id}`,
            type: 'website',
        },
    };
}

/**
 * Generate metadata for blog article pages
 */
export function generateBlogMetadata(article: {
    id: string;
    title: string;
    description: string;
    author?: string;
    category?: string;
    image?: string;
}): Metadata {
    const title = `${article.title} | ${siteConfig.name} Blog`;

    return {
        title,
        description: article.description,
        keywords: [article.title, article.category || '', 'health blog', 'wellness'].filter(Boolean),
        authors: article.author ? [{ name: article.author }] : undefined,
        alternates: {
            canonical: `${siteConfig.url}/blog/${article.id}`,
        },
        openGraph: {
            title,
            description: article.description,
            url: `${siteConfig.url}/blog/${article.id}`,
            type: 'article',
            images: article.image
                ? [{ url: article.image, width: 1200, height: 630 }]
                : [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: article.description,
            images: [article.image || siteConfig.ogImage],
        },
    };
}

/**
 * Generate metadata for booking/payment pages
 */
export function generateBookingMetadata(
    type: 'doctor' | 'lab' | 'pharmacy' | 'hospital',
    step: 'book' | 'payment' | 'confirmation'
): Metadata {
    const stepTitles = {
        book: 'Book Appointment',
        payment: 'Payment',
        confirmation: 'Booking Confirmation',
    };

    const title = `${stepTitles[step]} | ${siteConfig.name}`;

    return {
        title,
        robots: {
            index: step === 'confirmation' || step === 'payment' ? false : true,
            follow: true,
        },
    };
}

/**
 * Generate metadata for dashboard pages (should not be indexed)
 */
export function generateDashboardMetadata(
    dashboardType: 'patient' | 'doctor' | 'lab' | 'pharmacy' | 'hospital' | 'ecommerce'
): Metadata {
    return {
        title: `${dashboardType.charAt(0).toUpperCase() + dashboardType.slice(1)} Dashboard | ${siteConfig.name}`,
        robots: {
            index: false,
            follow: false,
        },
    };
}
