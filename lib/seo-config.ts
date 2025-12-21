// SEO Configuration for Healthezy
export const siteConfig = {
    name: "Healthezy",
    tagline: "Your Trusted Healthcare Platform",
    description: "Connect with top doctors, book diagnostic lab tests, find nearby pharmacies, and shop for health products. Healthezy is your all-in-one healthcare solution for better health management.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://healthezy.com",
    ogImage: "/og-image.png",
    twitterHandle: "@healthezy",
    keywords: [
        "healthcare platform",
        "online doctor consultation",
        "book lab tests online",
        "pharmacy near me",
        "health products",
        "medical store",
        "diagnostic tests",
        "telehealth",
        "healthcare services",
        "medical consultation"
    ],
    author: "Healthezy Team",
    locale: "en_IN",
    type: "website"
};

// Page-specific SEO data
export const pageMetadata = {
    home: {
        title: "Healthezy - Your Trusted Healthcare Platform | Online Doctor, Labs & Pharmacy",
        description: "Connect with certified doctors, book lab tests, find pharmacies, and shop for health products. Get quality healthcare services at your fingertips with Healthezy.",
        keywords: "online healthcare, doctor consultation, lab tests, pharmacy, health products, teleconsultation"
    },
    doctors: {
        title: "Book Doctors Online - Expert Medical Consultation | Healthezy",
        description: "Consult with experienced and certified doctors online. Book appointments, get prescriptions, and manage your health with trusted medical professionals.",
        keywords: "online doctor, book doctor appointment, medical consultation, healthcare professionals, certified doctors"
    },
    labs: {
        title: "Book Diagnostic Lab Tests Online - Home Sample Collection | Healthezy",
        description: "Book diagnostic and pathology lab tests online with home sample collection. Get accurate reports from certified labs at affordable prices.",
        keywords: "lab tests online, diagnostic tests, pathology, home sample collection, blood test, health checkup"
    },
    pharmacy: {
        title: "Online Pharmacy - Order Medicines & Healthcare Products | Healthezy",
        description: "Order medicines, health supplements, and wellness products online. Get genuine medicines delivered to your doorstep from verified pharmacies.",
        keywords: "online pharmacy, buy medicines online, prescription drugs, health supplements, medical store"
    },
    shop: {
        title: "Health Products & Wellness Store - Buy Online | Healthezy",
        description: "Shop for health products, wellness items, fitness equipment, and personal care products. Quality products for a healthier lifestyle.",
        keywords: "health products, wellness store, fitness equipment, personal care, health supplements"
    },
    hospital: {
        title: "Find Hospitals & Medical Centers Near You | Healthezy",
        description: "Find top hospitals, medical centers, and clinics near you. Access quality healthcare facilities with experienced doctors and modern infrastructure.",
        keywords: "hospitals near me, medical centers, clinics, healthcare facilities, emergency care"
    },
    about: {
        title: "About Healthezy - Revolutionizing Healthcare Access",
        description: "Learn about Healthezy's mission to make quality healthcare accessible to everyone. Discover our story, values, and commitment to your health.",
        keywords: "about healthezy, healthcare mission, company values, healthcare innovation"
    },
    contact: {
        title: "Contact Us - Get in Touch with Healthezy Support",
        description: "Have questions? Contact Healthezy support team for assistance with appointments, orders, or any healthcare queries. We're here to help 24/7.",
        keywords: "contact healthezy, customer support, healthcare assistance, help center"
    },
    blog: {
        title: "Health Blog - Tips, News & Wellness Articles | Healthezy",
        description: "Read expert health tips, wellness articles, medical news, and lifestyle guides. Stay informed about the latest in healthcare and wellness.",
        keywords: "health blog, wellness tips, medical news, health articles, lifestyle guides"
    },
    login: {
        title: "Login to Your Healthezy Account - Access Healthcare Services",
        description: "Sign in to your Healthezy account to book appointments, order medicines, view reports, and manage your healthcare needs.",
        keywords: "healthezy login, user account, healthcare portal, patient login"
    },
    signup: {
        title: "Sign Up - Create Your Healthezy Account Today",
        description: "Create your free Healthezy account to access online doctor consultations, book lab tests, order medicines, and more healthcare services.",
        keywords: "healthezy signup, create account, register, new user, healthcare registration"
    },
    privacy: {
        title: "Privacy Policy - How We Protect Your Data | Healthezy",
        description: "Read our privacy policy to understand how Healthezy collects, uses, and protects your personal and health information.",
        keywords: "privacy policy, data protection, personal information, HIPAA compliance"
    },
    terms: {
        title: "Terms & Conditions - Healthezy User Agreement",
        description: "Review the terms and conditions for using Healthezy's healthcare services, including doctors, labs, pharmacy, and health products.",
        keywords: "terms and conditions, user agreement, service terms, legal"
    }
};

// Structured Data Templates
export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": siteConfig.name,
    "description": siteConfig.description,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/logo.png`,
    "image": `${siteConfig.url}${siteConfig.ogImage}`,
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-XXXXXXXXXX",
        "contactType": "Customer Service",
        "areaServed": "IN",
        "availableLanguage": ["en", "hi"]
    },
    "sameAs": [
        "https://www.facebook.com/healthezy",
        "https://twitter.com/healthezy",
        "https://www.linkedin.com/company/healthezy",
        "https://www.instagram.com/healthezy"
    ]
};

export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteConfig.url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
    }
};
