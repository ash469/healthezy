import React from 'react';
import { Metadata } from 'next';
import './about.css';
import { pageMetadata, siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: pageMetadata.about.title,
    description: pageMetadata.about.description,
    keywords: pageMetadata.about.keywords,
    alternates: {
        canonical: `${siteConfig.url}/about`
    }
};


const AboutPage = () => {
    return (
        <div className="about-page">
            <div className="about-container">

                <section className="about-section">
                    <div className="about-image">
                        <img
                            src="/about_us_team.png"
                            alt="Our Medical Team"
                        />
                    </div>
                    <div className="about-content">
                        <h2 className="about-title">About Us</h2>
                        <div className="about-description">
                            <p style={{ marginBottom: '1rem' }}>
                                Healthezy is a unified healthcare platform designed to simplify how people access and manage healthcare services. Our mission is to make healthcare accessible, transparent, and convenient for everyone by connecting patients with trusted healthcare providers on a single digital platform.
                            </p>
                            <p>
                                Healthezy brings together clinics, hospitals, laboratories, pharmacies, and healthcare brands into one ecosystem so that users can easily discover, compare, and access healthcare services in their locality.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="about-section reverse">
                    <div className="about-image">
                        <img
                            src="/why_choose_us.png"
                            alt="Why Choose Healthezy"
                        />
                    </div>
                    <div className="about-content">
                        <h2 className="about-title">What We Do</h2>
                        <div className="about-description">
                            <p style={{ marginBottom: '0.5rem' }}>Our platform helps patients with:</p>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                                <li style={{ marginBottom: '0.25rem' }}>Finding nearby doctors, clinics, labs, and pharmacies</li>
                                <li style={{ marginBottom: '0.25rem' }}>Accessing healthcare services quickly and efficiently</li>
                                <li style={{ marginBottom: '0.25rem' }}>Managing health records and prescriptions</li>
                                <li style={{ marginBottom: '0.25rem' }}>Getting reliable healthcare information and support</li>
                            </ul>
                            <p style={{ marginBottom: '1rem' }}>
                                At the same time, Healthezy empowers healthcare providers with digital tools to manage their services, improve patient engagement, and streamline operations.
                            </p>
                            <p>
                                We believe that healthcare should be simple, reliable, and available when people need it the most.
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default AboutPage;
