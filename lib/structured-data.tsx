// Utility functions for generating structured data (JSON-LD) for specific content types

import { siteConfig } from './seo-config';

// Doctor/Medical Professional Schema
export function generateDoctorSchema(doctor: {
    id: string;
    name: string;
    specialty: string;
    education?: string;
    experience?: string;
    image?: string;
    rating?: number;
    reviewCount?: number;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Physician',
        name: doctor.name,
        image: doctor.image || `${siteConfig.url}/doctor.png`,
        medicalSpecialty: doctor.specialty,
        educationalOccupationalCredential: doctor.education,
        yearsOfExperience: doctor.experience,
        aggregateRating: doctor.rating
            ? {
                '@type': 'AggregateRating',
                ratingValue: doctor.rating,
                reviewCount: doctor.reviewCount || 0,
                bestRating: 5,
                worstRating: 1,
            }
            : undefined,
        url: `${siteConfig.url}/doctors/${doctor.id}`,
    };
}

// Hospital/Medical Business Schema
export function generateHospitalSchema(hospital: {
    id: string;
    name: string;
    address?: string;
    phone?: string;
    image?: string;
    rating?: number;
    reviewCount?: number;
    priceRange?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'MedicalBusiness',
        name: hospital.name,
        image: hospital.image || `${siteConfig.url}/hospital.png`,
        address: hospital.address
            ? {
                '@type': 'PostalAddress',
                streetAddress: hospital.address,
                addressCountry: 'IN',
            }
            : undefined,
        telephone: hospital.phone,
        priceRange: hospital.priceRange || '$$',
        aggregateRating: hospital.rating
            ? {
                '@type': 'AggregateRating',
                ratingValue: hospital.rating,
                reviewCount: hospital.reviewCount || 0,
                bestRating: 5,
                worstRating: 1,
            }
            : undefined,
        url: `${siteConfig.url}/hospital/${hospital.id}`,
    };
}

// Product Schema (for health products in shop)
export function generateProductSchema(product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    brand?: string;
    rating?: number;
    reviewCount?: number;
    availability?: boolean;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image || `${siteConfig.url}/product.png`,
        brand: product.brand
            ? {
                '@type': 'Brand',
                name: product.brand,
            }
            : undefined,
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'INR',
            availability: product.availability
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            url: `${siteConfig.url}/shop`,
        },
        aggregateRating: product.rating
            ? {
                '@type': 'AggregateRating',
                ratingValue: product.rating,
                reviewCount: product.reviewCount || 0,
                bestRating: 5,
                worstRating: 1,
            }
            : undefined,
    };
}

// Medical Test/Service Schema
export function generateMedicalTestSchema(test: {
    id: string;
    name: string;
    description: string;
    price?: number;
    category?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'MedicalTest',
        name: test.name,
        description: test.description,
        medicalSpecialty: test.category,
        relevantSpecialty: test.category,
        offers: test.price
            ? {
                '@type': 'Offer',
                price: test.price,
                priceCurrency: 'INR',
            }
            : undefined,
    };
}

// Blog Article Schema
export function generateArticleSchema(article: {
    title: string;
    description: string;
    author: string;
    publishDate: string;
    modifiedDate?: string;
    image?: string;
    url: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        image: article.image || `${siteConfig.url}${siteConfig.ogImage}`,
        datePublished: article.publishDate,
        dateModified: article.modifiedDate || article.publishDate,
        author: {
            '@type': 'Person',
            name: article.author,
        },
        publisher: {
            '@type': 'Organization',
            name: siteConfig.name,
            logo: {
                '@type': 'ImageObject',
                url: `${siteConfig.url}/logo.png`,
            },
        },
        url: article.url,
    };
}

// FAQ Schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

// Review Schema
export function generateReviewSchema(review: {
    author: string;
    rating: number;
    reviewBody: string;
    datePublished: string;
    itemReviewed: {
        type: 'Doctor' | 'Hospital' | 'Product';
        name: string;
    };
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Review',
        author: {
            '@type': 'Person',
            name: review.author,
        },
        reviewRating: {
            '@type': 'Rating',
            ratingValue: review.rating,
            bestRating: 5,
            worstRating: 1,
        },
        reviewBody: review.reviewBody,
        datePublished: review.datePublished,
        itemReviewed: {
            '@type': review.itemReviewed.type === 'Doctor' ? 'Physician' : review.itemReviewed.type,
            name: review.itemReviewed.name,
        },
    };
}

// Helper to inject JSON-LD into component
export function JSONLDScript({ data }: { data: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data),
            }}
        />
    );
}
