'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getLabById } from '@/services/lab';
import Image from 'next/image';
import Link from 'next/link';
import '@/components/labs/Labs.css';

export default function LabDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const labIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const labId = parseInt(labIdStr, 10);

    const [lab, setLab] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!labId) return;

        async function fetchLabData() {
            setLoading(true);
            try {
                const labData = await getLabById(labId);
                setLab(labData);
            } catch (error) {
                console.error("Failed to fetch lab details", error);
            } finally {
                setLoading(false);
            }
        }

        fetchLabData();
    }, [labId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-teal-600">Loading Lab Details...</div>
            </div>
        );
    }

    if (!lab) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Laboratory Not Found</h2>
                <Link
                    href="/labs"
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                    Back to Labs
                </Link>
            </div>
        );
    }

    const logoUrl = lab.logo_url || lab.logoUrl || '/lab.png';

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="md:flex">
                    <div className="md:w-1/3 bg-gray-50 flex items-center justify-center p-8">
                        <Image
                            src={logoUrl}
                            alt={lab.name}
                            width={200}
                            height={200}
                            className="object-contain"
                            unoptimized={true}
                        />
                    </div>
                    <div className="md:w-2/2 p-8 flex-1">
                        <div className="uppercase tracking-wide text-sm text-teal-600 font-bold mb-1">{lab.type || 'Diagnostics'}</div>
                        <h1 className="block mt-1 text-3xl leading-tight font-extrabold text-gray-900">{lab.name}</h1>
                        <p className="mt-2 text-gray-500">{lab.address}, {lab.city}, {lab.state} - {lab.zip_code}</p>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-700">About</h3>
                            <p className="mt-2 text-gray-600">{lab.description || 'Professional diagnostic services provided by certified specialists.'}</p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center text-gray-600">
                                <span className="font-bold mr-2">Phone:</span> {lab.phone_number}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <span className="font-bold mr-2">Email:</span> {lab.email}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <span className="font-bold mr-2">License:</span> {lab.license_number}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <span className="font-bold mr-2">Accreditation:</span> {lab.accreditation || 'Verified'}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <span className="font-bold mr-2">Established:</span> {lab.established_year}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <span className="font-bold mr-2">Website:</span> {lab.website || 'N/A'}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <span className="font-bold mr-2">24x7 Open:</span> {lab.is24x7 ? 'Yes' : 'No'}
                            </div>
                        </div>

                        <div className="mt-8">
                            <Link
                                href={`/labs/${lab.id}/book`}
                                className="action-btn"
                                style={{ width: 'fit-content' }}
                            >
                                Book Appointment
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
