'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getHospitalById, getDoctorsInHospital } from '@/services/hospital';
import DoctorCard from '@/components/doctors/DoctorCard';
import Image from 'next/image';
import Link from 'next/link';

export default function HospitalDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const hospitalIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const hospitalId = parseInt(hospitalIdStr, 10);

    const [hospital, setHospital] = useState<any>(null);
    const [doctors, setDoctors] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showDoctors, setShowDoctors] = useState<boolean>(false); // Toggle to show doctors

    useEffect(() => {
        if (!hospitalId) return;

        async function fetchHospitalData() {
            setLoading(true);
            try {
                const hospitalData = await getHospitalById(hospitalId);
                setHospital(hospitalData);
            } catch (error) {
                console.error("Failed to fetch hospital details", error);
            } finally {
                setLoading(false);
            }
        }

        fetchHospitalData();
    }, [hospitalId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-teal-600">Loading Hospital Details...</div>
            </div>
        );
    }

    if (!hospital) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Hospital Not Found</h2>
                <Link
                    href="/hospital"
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                    Back to Hospitals
                </Link>
            </div>
        );
    }

    const logoUrl = hospital.logo_url || hospital.logoUrl || '/hospital.png';

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="md:flex">
                    <div className="md:w-1/3 bg-gray-50 flex items-center justify-center p-8">
                        <Image
                            src={logoUrl}
                            alt={hospital.name}
                            width={200}
                            height={200}
                            className="object-contain"
                            unoptimized={true}
                        />
                    </div>
                    <div className="md:w-2/3 p-8">
                        <div className="uppercase tracking-wide text-sm text-teal-600 font-bold mb-1">{hospital.type} Hospital</div>
                        <h1 className="block mt-1 text-3xl leading-tight font-extrabold text-gray-900">{hospital.name}</h1>
                        <p className="mt-2 text-gray-500">{hospital.address}, {hospital.city}, {hospital.state} - {hospital.zip_code}</p>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-700">About</h3>
                            <p className="mt-2 text-gray-600">{hospital.description}</p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center text-gray-600">
                                <span className="font-bold mr-2">Phone:</span> {hospital.phone_number}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <span className="font-bold mr-2">Email:</span> {hospital.email}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <span className="font-bold mr-2">Emergency:</span> {hospital.emergency_number}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <span className="font-bold mr-2">Total Beds:</span> {hospital.total_beds}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <span className="font-bold mr-2">Available Beds:</span> {hospital.available_beds}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <span className="font-bold mr-2">Website:</span> {hospital.website}
                            </div>
                        </div>

                        <div className="mt-8">
                            <Link
                                href={`/hospital/${hospital.id}/doctors`}
                                className="action-btn"
                            >
                                Book Appointment
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {showDoctors && (
                <div className="animate-fade-in-up">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Doctors at {hospital.name}</h2>

                    {doctors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {doctors.map((doctor) => (
                                <DoctorCard key={doctor.id} doctor={doctor} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <p className="text-gray-500 text-lg">No doctors found for this hospital.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
