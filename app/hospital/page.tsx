'use client';

import React, { useState, useEffect } from 'react';
import HospitalCard from '@/components/hospital/HospitalCard';
import '@/components/hospital/Hospital.css';
import '@/components/header-main.css';
import { getAllHospitals, getHospitalsByCity, getHospitalsByType, getNearbyHospitals } from '@/services/hospital';
import type { Hospital } from '@/types/hospital';

export default function HospitalPage() {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [sortBy, setSortBy] = useState('Sort by');
    const [locationError, setLocationError] = useState('');
    const [isLocating, setIsLocating] = useState(false);
    const [radius, setRadius] = useState<number>(10);
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Fetch hospitals based on filters
    useEffect(() => {
        async function fetchHospitals() {
            // optimized to avoid double fetch on mount if locating
            if (isLocating) return;
            if (cityFilter.trim() !== '' || typeFilter !== 'All') {
                setUserLocation(null);
            }
            if (userLocation && cityFilter === '' && typeFilter === 'All') {
                return;
            }

            setLoading(true);
            try {
                let data;

                // Priority: Type filter > City filter > All hospitals
                if (typeFilter !== 'All') {
                    data = await getHospitalsByType(typeFilter);
                } else if (cityFilter.trim() !== '') {
                    data = await getHospitalsByCity(cityFilter.trim());
                } else {
                    data = await getAllHospitals();
                }

                setHospitals(data);
            } catch (error) {
                console.error("Failed to fetch hospitals", error);
                setHospitals([]);
            } finally {
                setLoading(false);
            }
        }
        fetchHospitals();
    }, [cityFilter, typeFilter, userLocation]); // Added userLocation to dependencies

    // Helper to fetch nearby with specific radius
    const fetchNearby = async (lat: number, lng: number, rad: number) => {
        setLoading(true);
        try {
            const nearbyHospitals = await getNearbyHospitals(lat, lng, rad);
            setHospitals(nearbyHospitals);
        } catch (err) {
            console.error("Error fetching nearby hospitals:", err);
            setLocationError('Failed to fetch nearby hospitals');
        } finally {
            setLoading(false);
        }
    };

    const handleRadiusChange = (newRadius: number) => {
        setRadius(newRadius);
        if (userLocation) {
            fetchNearby(userLocation.latitude, userLocation.longitude, newRadius);
        }
    };

    const handleClearLocation = () => {
        setUserLocation(null);
        setRadius(10);
        setIsDropdownOpen(false);
    };

    const handleNearbySearch = () => {
        setIsLocating(true);
        setLocationError('');
        setLoading(true);

        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser');
            setIsLocating(false);
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    console.log("Position obtained:", position.coords);
                    const { latitude, longitude } = position.coords;

                    setUserLocation({ latitude, longitude });
                    await fetchNearby(latitude, longitude, radius);

                    // Clear other filters
                    setCityFilter('');
                    setTypeFilter('All');
                    setSearchQuery('');

                    // Open dropdown to show radius options
                    setIsDropdownOpen(true);
                } catch (err) {
                    console.error("Error in nearby search flow:", err);
                    setLocationError('Failed to fetch nearby hospitals'); // Ensure error is set for UI
                } finally {
                    setIsLocating(false);
                }
            },
            (error) => {
                console.error("Geolocation error object:", error);
                console.error("Geolocation error code:", error.code);
                console.error("Geolocation error message:", error.message);

                let errorMessage = 'Unable to retrieve your location';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'User denied the request for Geolocation. Please reset permissions.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'The request to get user location timed out.';
                        break;
                    default:
                        errorMessage = `An unknown error occurred: ${error.message}`;
                }
                setLocationError(errorMessage);
                setIsLocating(false);
                setLoading(false);
            }
        );
    };

    // Filter by search query (name, location, address)
    const filteredHospitals = hospitals.filter(hospital =>
        (hospital.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (hospital.city?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (hospital.address?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (hospital.city?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );

    // Sort hospitals
    const sortedHospitals = [...filteredHospitals].sort((a, b) => {
        if (sortBy === 'Name') return (a.name || '').localeCompare(b.name || '');
        return 0;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-teal-600">Loading Hospitals...</div>
            </div>
        );
    }

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
                        {/* City Filter */}
                        <div className="filter-group">
                            <input
                                type="text"
                                className="filter-select"
                                placeholder="Filter by City..."
                                value={cityFilter}
                                onChange={(e) => setCityFilter(e.target.value)}
                            />
                        </div>

                        {/* Type Filter */}
                        <div className="filter-group">
                            <select
                                className="filter-select"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option value="All">Type: All</option>
                                <option value="Government">Government</option>
                                <option value="Private">Private</option>
                                <option value="Multi-Specialty">Multi-Specialty</option>
                                <option value="General">General</option>
                                <option value="Clinic">Clinic</option>
                            </select>
                        </div>

                        {/* Nearby Search Button and Radius Dropdown */}
                        <div className="filter-group">
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        if (userLocation) {
                                            setIsDropdownOpen(!isDropdownOpen);
                                        } else {
                                            handleNearbySearch();
                                        }
                                    }}
                                    disabled={isLocating}
                                    className={`filter-select flex items-center justify-between gap-2 text-white border-none min-w-[150px] px-3 ${isLocating
                                        ? '!bg-teal-400 cursor-not-allowed'
                                        : '!bg-teal-600 hover:!bg-teal-700'
                                        }`}
                                    style={{ height: '45px' }}
                                >
                                    {isLocating ? (
                                        <>
                                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                            Locating...
                                        </>
                                    ) : (
                                        <>
                                            <span className="flex items-center gap-1">
                                                <span>📍</span>
                                                {userLocation ? `Nearby (${radius}km)` : 'Find Nearby'}
                                            </span>
                                            {userLocation && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            )}
                                        </>
                                    )}
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && userLocation && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden">
                                        <div className="py-1">
                                            {[10, 50, 100, 200, 300].map((r) => (
                                                <button
                                                    key={r}
                                                    onClick={() => {
                                                        handleRadiusChange(r);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-teal-50 transition-colors ${radius === r ? 'text-teal-600 font-medium bg-teal-50' : 'text-gray-700'
                                                        }`}
                                                >
                                                    {r} km Radius
                                                </button>
                                            ))}
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <button
                                                onClick={handleClearLocation}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                Clear Location
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {locationError && (
                    <div className="flex justify-end mt-1">
                        <p className="text-red-500 text-xs font-medium">{locationError}</p>
                    </div>
                )}
            </div>

            {sortedHospitals.length > 0 ? (
                <div className="hospital-list">
                    {sortedHospitals.map((hospital) => (
                        <HospitalCard key={hospital.id} hospital={hospital} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300 mt-8">
                    <p className="text-gray-500 text-lg">
                        {hospitals.length === 0
                            ? 'No hospitals found matching your filters.'
                            : 'No hospitals match your search.'}
                    </p>
                    <button
                        onClick={() => {
                            setCityFilter('');
                            setTypeFilter('All');
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
