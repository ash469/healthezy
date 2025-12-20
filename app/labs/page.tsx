'use client';

import { useState } from 'react';
import LabCard from '@/components/labs/LabCard';
import '@/components/labs/Labs.css';
import { labs } from '@/data/labs';

export default function LabsPage() {
    const [sortBy, setSortBy] = useState('Sort by');

    // Sorting Logic
    const sortedLabs = [...labs].sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        if (sortBy === 'Rating') return b.rating - a.rating;
        return 0;
    });

    return (
        <div className="labs-container">
            <div className="labs-header">
                <h1 className="labs-title">Labs</h1>

                <div className="labs-filters">
                    <div className="filter-group">
                        <label className="filter-label">Sort by</label>
                        <select
                            className="filter-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option>Sort by</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Rating</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="labs-list">
                {sortedLabs.map((lab) => (
                    <LabCard key={lab.id} lab={lab} />
                ))}
            </div>
        </div>
    );
}
