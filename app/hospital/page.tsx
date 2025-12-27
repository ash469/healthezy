'use client';

import { useState } from 'react';
import HospitalCard from '@/components/hospital/HospitalCard';
import '@/components/hospital/Hospital.css';
import '@/components/header-main.css';
import { hospitals } from '@/data/hospitals';

export default function HospitalPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Sort by');

    const filteredHospitals = hospitals.filter(hospital =>
        (hospital.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (hospital.location?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (hospital.address?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );

    const sortedHospitals = [...filteredHospitals].sort((a, b) => {
        if (sortBy === 'Rating') return (b.rating || 0) - (a.rating || 0);
        return 0;
    });

    return (
        <div className="hospital-container">
            <div className="page-header">
                <div className="header-row">
                    <h1 className="page-title">Hospital</h1>

                    {/* Search Bar */}
                    <div className="search-container">
                        <div className="search-wrapper">
                            <div className="search-icon">🔍</div>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search by name or location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="filters-container">
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
            </div>

            <div className="hospital-list">
                {sortedHospitals.map((hospital) => (
                    <HospitalCard key={hospital.id} hospital={hospital} />
                ))}
            </div>
        </div>
    );
}
