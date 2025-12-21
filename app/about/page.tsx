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
                        <p className="about-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis libero tempor, convallis nisi vel, accumsan lacus. Nam quis fringilla ipsum. Nulla in sapien et nunc finibus rutrum ut nec nibh. Morbi dictum fringilla neque a fermentum. Integer nec leo eget nisl pulvinar sagittis. Donec id turpis libero. Praesent quam turpis, ultricies ut erat a, efficitur accumsan libero.
                        </p>
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
                        <h2 className="about-title">Why Choose Us ?</h2>
                        <p className="about-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis libero tempor, convallis nisi vel, accumsan lacus. Nam quis fringilla ipsum. Nulla in sapien et nunc finibus rutrum ut nec nibh. Morbi dictum fringilla neque a fermentum. Integer nec leo eget nisl pulvinar sagittis. Donec id turpis libero. Praesent quam turpis, ultricies ut erat a, efficitur accumsan libero.
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default AboutPage;
