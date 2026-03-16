'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getDoctorById } from '@/services/doctor';
import Image from 'next/image';
import Link from 'next/link';

export default function DoctorDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const doctorIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const doctorId = parseInt(doctorIdStr, 10);
    const [doctor, setDoctor] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!doctorId) return;

        async function fetchDoctorData() {
            setLoading(true);
            try {
                const doctorData = await getDoctorById(doctorId);
                setDoctor(doctorData);
            } catch (error) {
                console.error("Failed to fetch doctor details", error);
            } finally {
                setLoading(false);
            }
        }

        fetchDoctorData();
    }, [doctorId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-teal-600 font-semibold text-lg">Loading Doctor Details...</div>
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-lg m-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Doctor Not Found</h2>
                <div className="text-gray-500 mb-6">The doctor profile you are looking for does not exist or has been removed.</div>
                <button
                    onClick={() => router.back()}
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-md"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const photoUrl = doctor.photo_url || '/doctor.png';
    const fullName = doctor.full_name || `${doctor.first_name || ''} ${doctor.last_name || ''}`.trim() || 'Doctor';
    const specialization = doctor.specialization || 'General';
    const qualification = doctor.qualification || '';
    const hospitalName = doctor.hospital_name || '';

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="mb-6">
                <button
                    onClick={() => router.back()}
                    className="text-teal-600 hover:text-teal-800 font-medium flex items-center transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="md:flex">
                    <div className="md:w-1/3 bg-gradient-to-br from-teal-50 to-white p-8 flex flex-col items-center border-r border-gray-100">
                        <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden ring-4 ring-teal-100 shadow-md">
                            <Image
                                src={photoUrl}
                                alt={fullName}
                                fill
                                sizes="(max-width: 768px) 192px, 192px"
                                className="object-cover"
                                unoptimized={true}
                                priority
                            />
                        </div>

                        <div className="w-full space-y-3">
                            <Link
                                href={`/doctors/${doctor.id}/book?name=${encodeURIComponent(fullName)}&photo=${encodeURIComponent(photoUrl)}&specialization=${encodeURIComponent(specialization)}`}
                                className="w-full block text-center bg-teal-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-teal-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Book Appointment
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-2/3 p-8">
                        <div className="mb-6">
                            <div className="flex items-center space-x-2 text-teal-600 font-bold uppercase tracking-wider text-xs mb-2">
                                <span className="bg-teal-50 px-2 py-1 rounded-md border border-teal-100">{specialization}</span>
                                {doctor.status === 'ACTIVE' && (
                                    <span className="bg-green-50 text-green-600 px-2 py-1 rounded-md border border-green-100">Active</span>
                                )}
                            </div>

                            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{fullName}</h1>

                            {qualification && (
                                <p className="text-gray-500 font-medium mb-1 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                    </svg>
                                    {qualification}
                                </p>
                            )}

                            {hospitalName && (
                                <p className="text-gray-500 mb-1 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                                    </svg>
                                    {hospitalName}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <span className="block text-xs font-bold text-gray-500 uppercase">Consultation Fee</span>
                                <span className="text-lg font-bold text-gray-800">
                                    ₹{doctor.consultation_fee || 800}
                                </span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <span className="block text-xs font-bold text-gray-500 uppercase">Experience</span>
                                <span className="text-lg font-bold text-gray-800">
                                    {doctor.experience_years || 0} Years
                                </span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <span className="block text-xs font-bold text-gray-500 uppercase">Registration No.</span>
                                <span className="text-lg font-bold text-gray-800">
                                    {doctor.registration_number || doctor.registrationNumber || 'N/A'}
                                </span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <span className="block text-xs font-bold text-gray-500 uppercase">Gender</span>
                                <span className="text-lg font-bold text-gray-800">
                                    {doctor.gender || 'Not Specified'}
                                </span>
                            </div>
                        </div>

                        {doctor.bio && (
                            <div className="prose max-w-none">
                                <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2">About Doctor</h3>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                    {doctor.bio}
                                </p>
                            </div>
                        )}

                        {(doctor.address) && (
                            <div className="mt-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2">Address</h3>
                                <p className="text-gray-600">
                                    {doctor.address}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
