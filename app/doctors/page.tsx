'use client';

import React, { useState, useEffect } from 'react';
import DoctorCard from '@/components/doctors/DoctorCard';
import '@/components/doctors/Doctors.css';
import '@/components/header-main.css';
import { getAllDoctors, getDoctorsBySpecialization, getDoctorsByExperience } from '@/services/doctor';
import type { Doctor } from '@/types/doctor';

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterGender, setFilterGender] = useState<string>('Gender');
    const [filterSpecialization, setFilterSpecialization] = useState<string>('All');
    const [filterExperience, setFilterExperience] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('Sort by');

    // Fetch doctors based on filters
    useEffect(() => {
        async function fetchDoctors() {
            setLoading(true);
            try {
                let data;
                if (filterSpecialization !== 'All') {
                    data = await getDoctorsBySpecialization(filterSpecialization);
                } else if (filterExperience !== 'All') {
                    const expValue = parseInt(filterExperience);
                    data = await getDoctorsByExperience(expValue);
                } else {
                    data = await getAllDoctors();
                }
                setDoctors(data);
            } catch (error) {
                console.error("Failed to fetch doctors", error);
                setDoctors([]);
            } finally {
                setLoading(false);
            }
        }
        fetchDoctors();
    }, [filterSpecialization, filterExperience]);

    const filteredDoctors = doctors.filter(doctor => {
        const lowerQuery = searchQuery.toLowerCase();
        const matchesSearch = searchQuery === '' ||
            (doctor.full_name?.toLowerCase().includes(lowerQuery) ||
                doctor.first_name?.toLowerCase().includes(lowerQuery) ||
                doctor.last_name?.toLowerCase().includes(lowerQuery) ||
                doctor.specialization?.toLowerCase().includes(lowerQuery));
        if (filterGender === 'Gender') return matchesSearch;
        return matchesSearch && doctor.gender === filterGender;
    });

    const sortedDoctors = [...filteredDoctors].sort((a, b) => {
        if (sortBy === 'Fees: Low to High') {
            return (a.consultation_fee || 0) - (b.consultation_fee || 0);
        } else if (sortBy === 'Fees: High to Low') {
            return (b.consultation_fee || 0) - (a.consultation_fee || 0);
        } else if (sortBy === 'Experience') {
            const expA = a.experience_years || 0;
            const expB = b.experience_years || 0;
            return expB - expA;
        }
        return 0;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-teal-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="doctors-container">
            <div className="page-header">
                <div className="header-row">
                    <h1 className="page-title">Doctors</h1>
                    
                    <div className="search-container">
                        <div className="search-wrapper">
                            <div className="search-icon">🔍</div>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search by name or specialization..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="filters-container">
                        <div className="filter-group">
                            <select
                                className="filter-select"
                                value={filterSpecialization}
                                onChange={(e) => setFilterSpecialization(e.target.value)}
                            >
                                <option value="All">Specialization: All</option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Orthopedics">Orthopedics</option>
                                <option value="Oncology">Oncology</option>
                                <option value="Dermatology">Dermatology</option>
                                <option value="General Medicine">General Medicine</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <select
                                className="filter-select"
                                value={filterExperience}
                                onChange={(e) => setFilterExperience(e.target.value)}
                            >
                                <option value="All">Experience: All</option>
                                <option value="5">5+ years</option>
                                <option value="10">10+ years</option>
                                <option value="15">15+ years</option>
                                <option value="20">20+ years</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <select
                                className="filter-select"
                                value={filterGender}
                                onChange={(e) => setFilterGender(e.target.value)}
                            >
                                <option value="Gender">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <select
                                className="filter-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="Sort by">Sort by</option>
                                <option value="Fees: Low to High">Fees: Low to High</option>
                                <option value="Fees: High to Low">Fees: High to Low</option>
                                <option value="Experience">Experience</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {sortedDoctors.length > 0 ? (
                <div className="doctors-list">
                    {sortedDoctors.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300 mt-8">
                    <p className="text-gray-500 text-lg">
                        {doctors.length === 0
                            ? 'No doctors found matching your filters.'
                            : 'No doctors match your search.'}
                    </p>
                    <button
                        onClick={() => {
                            setFilterSpecialization('All');
                            setFilterExperience('All');
                            setFilterGender('Gender');
                            setSearchQuery('');
                        }}
                        className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
}
