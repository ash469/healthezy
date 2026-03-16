'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getHospitalById, getDoctorsInHospital } from '@/services/hospital';
import DoctorCard from '@/components/doctors/DoctorCard';
import '@/components/doctors/Doctors.css';

export default function HospitalDoctorsPage() {
    const params = useParams();
    const router = useRouter();
    const hospitalIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const hospitalId = parseInt(hospitalIdStr, 10);

    const [hospital, setHospital] = useState<any>(null);
    const [doctors, setDoctors] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Filter and Sort states
    const [genderFilter, setGenderFilter] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('none');

    useEffect(() => {
        if (!hospitalId) return;

        async function fetchData() {
            setLoading(true);
            try {
                console.log(`Fetching doctors for hospital ID: ${hospitalId}`);
                const [hospitalData, doctorsData] = await Promise.all([
                    getHospitalById(hospitalId),
                    getDoctorsInHospital(hospitalId)
                ]);
                setHospital(hospitalData);
                setDoctors(doctorsData);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [hospitalId]);

    // Filter and sort doctors
    const filteredAndSortedDoctors = React.useMemo(() => {
        let result = [...doctors];

        // Filter by gender
        if (genderFilter !== 'All') {
            result = result.filter(doc => doc.gender === genderFilter);
        }

        // Sort by fee
        if (sortBy === 'fee-low') {
            result.sort((a, b) => {
                const feeA = parseFloat(a.consultation_fee || 0);
                const feeB = parseFloat(b.consultation_fee || 0);
                return feeA - feeB;
            });
        } else if (sortBy === 'fee-high') {
            result.sort((a, b) => {
                const feeA = parseFloat(a.consultation_fee || 0);
                const feeB = parseFloat(b.consultation_fee || 0);
                return feeB - feeA;
            });
        } else if (sortBy === 'experience') {
            result.sort((a, b) => {
                const expA = a.experience_years || 0;
                const expB = b.experience_years || 0;
                return expB - expA;
            });
        }

        return result;
    }, [doctors, genderFilter, sortBy]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-teal-600">Loading Doctors...</div>
            </div>
        );
    }

    if (!hospital) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Hospital Not Found</h2>
                <button
                    onClick={() => router.push('/hospital')}
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                    Back to Hospitals
                </button>
            </div>
        );
    }

    return (
        <div className="doctors-container">
            <div className="doctors-header">
                <div className="doctors-header-top">
                    <h1 className="doctors-title">Doctors at {hospital.name}</h1>
                    <button
                        onClick={() => router.push('/hospital')}
                        className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        Back to Hospitals
                    </button>
                </div>

                {/* Filters */}
                <div className="doctors-filters">
                    <div className="filter-group">
                        <label className="filter-label">Filter by Gender</label>
                        <select
                            className="filter-select"
                            value={genderFilter}
                            onChange={(e) => setGenderFilter(e.target.value)}
                        >
                            <option value="All">All Genders</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Sort By</label>
                        <select
                            className="filter-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="none">Default</option>
                            <option value="fee-low">Fee: Low to High</option>
                            <option value="fee-high">Fee: High to Low</option>
                            <option value="experience">Most Experienced</option>
                        </select>
                    </div>
                </div>
            </div>

            {filteredAndSortedDoctors.length > 0 ? (
                <div className="doctors-list">
                    {filteredAndSortedDoctors.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg">
                        {doctors.length === 0
                            ? 'No doctors found for this hospital.'
                            : 'No doctors match your filters.'}
                    </p>
                </div>
            )}
        </div>
    );
}
