"use client";
import React, { useEffect, useState, useRef } from 'react';

// Custom hook for counting animation
const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => {
            if (countRef.current) observer.unobserve(countRef.current);
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number | null = null;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            setCount(Math.floor(end * percentage));

            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, isVisible]);

    return { count, countRef };
};

const StatItem = ({ label, value, className }: { label: React.ReactNode, value: number, className?: string }) => {
    const { count, countRef } = useCounter(value);

    return (
        <div ref={countRef} className={`p-6 flex flex-col items-center justify-center relative w-full border-gray-200 ${className || ''}`}>
            <p className="text-sm md:text-lg text-[#005f6b] font-bold mb-3 leading-tight min-h-[3rem] flex items-center text-center">
                {label}
            </p>
            <h3 className="text-3xl md:text-5xl font-extrabold text-[#9ca3af]">
                {count}+
            </h3>
        </div>
    );
};

const Stats = () => {
    return (
        <section className="w-full px-4 pt-0 pb-12">
            <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4">
                <StatItem
                    label={<>No. Of Doctors<br />Available</>}
                    value={75}
                    className="border-r-4 border-b-4 md:border-b-0 md:border-r-4"
                />
                <StatItem
                    label={<>No. Of Hospital<br />Available</>}
                    value={10}
                    className="border-b-4 md:border-b-0 md:border-r-4"
                />
                <StatItem
                    label={<>No. Of Lab<br />Available</>}
                    value={35}
                    className="border-r-4 md:border-b-0 md:border-r-4"
                />
                <StatItem
                    label={<>No. Of Medical<br />Stores Available</>}
                    value={55}
                    className="md:border-b-0"
                />
            </div>
        </section>
    );
};

export default Stats;
