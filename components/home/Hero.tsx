'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './Hero.css';

const categories = [
    { name: 'Doctors', route: '/doctors' },
    { name: 'Hospitals', route: '/hospital' },
    { name: 'Labs', route: '/labs' },
    { name: 'Medicine', route: '/pharmacy' },
];

const Hero = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const router = useRouter();

    const handleBookOnline = () => {
        // Default to Doctors if no category has been hovered yet
        const selectedName = activeCategory || 'Doctors';
        const category = categories.find(c => c.name === selectedName);
        if (category) {
            router.push(category.route);
        }
    };

    return (
        <section className="w-full pt-0 px-4 md:px-8 pb-6 md:pb-10">
            <div className="hero-gradient-container shadow-2xl">
                <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-white/10 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl opacity-30"></div>

                {/* Decorative Stats Card Circles */}
                <div className="hero-stat-circle top-right"></div>
                <div className="hero-stat-circle bottom-left"></div>

                <div className="hero-grid">
                    <div className="absolute -top-40 -right-40 w-24 h-24 bg-white/10 rounded-full pointer-events-none"></div>
                    <div className="col-span-5 flex flex-col justify-center space-y-2 md:space-y-8 relative z-20">
                        <div className="know-us-container">
                            <h2 className="know-us-title">Know Us</h2>
                            <p className="know-us-desc">
                                Healthezy brings the entire healthcare ecosystem together on a single digital platform. Users can easily find doctors, schedule appointments, order medicines, access medical reports, manage insurance claims, and explore curated wellness products.
                            </p>
                        </div>
                    </div>
                    <div className="col-span-7 flex flex-col items-end text-white space-y-2 md:space-y-6 md:pr-10 relative z-20 w-full">
                        <h1 className="text-xl md:text-6xl font-bold">Healthezy</h1>

                        <div className="flex flex-col items-end space-y-1 md:space-y-3 text-sm md:text-4xl font-bold cursor-default">
                            {categories.map((category) => (
                                <span
                                    key={category.name}
                                    onMouseEnter={() => setActiveCategory(category.name)}
                                    className={`transition-all duration-300 ${activeCategory === category.name
                                        ? "border-b-2 md:border-b-4 border-white pb-0.5 md:pb-1"
                                        : "border-b-2 md:border-b-4 border-transparent pb-0.5 md:pb-1 opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    {category.name}
                                </span>
                            ))}
                        </div>

                        <button
                            onClick={handleBookOnline}
                            className="mt-1 md:mt-6 bg-[#0D5C63] hover:bg-[#084248] text-white text-[8px] md:text-lg font-medium py-1 px-3 md:py-3 md:px-8 rounded-full shadow-lg transition-transform hover:scale-105 border border-white/20"
                        >
                            Book Online
                        </button>
                    </div>
                </div>
                <div className="block absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 hero-image-container md:left-[55%] lg:left-[60%] xl:left-[62%]">
                    <Image
                        src="/home/hero.png"
                        alt="Medical Professional"
                        fill
                        className="object-contain object-bottom"
                        priority
                    />
                </div>

            </div>
        </section >
    );
};

export default Hero;
