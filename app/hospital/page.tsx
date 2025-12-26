'use client';

import { useState } from 'react';
import HospitalCard from '@/components/hospital/HospitalCard';
import '@/components/hospital/Hospital.css';
import { hospitals } from '@/data/hospitals';

export default function HospitalPage() {
    const [sortBy, setSortBy] = useState('Sort by');

    const sortedHospitals = [...hospitals].sort((a, b) => {
        if (sortBy === 'Rating') return (b.rating || 0) - (a.rating || 0);
        return 0;
    });

    return (
        <div className="hospital-container">
            <div className="hospital-header">
                <h1 className="hospital-title">Hospital</h1>

                <div className="hospital-filters">
                    <div className="filter-group">
                        <label className="filter-label">Sort by</label>
                        <select
                            className="filter-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option>Sort by</option>
                            <option>Rating</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="hospital-list">
                {sortedHospitals.map((hospital) => (
                    <HospitalCard key={hospital.id} hospital={hospital} />
                ))}
            </div>
        </div>
    );
}
