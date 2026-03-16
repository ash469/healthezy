'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getLabById, getLabTests } from '@/services/lab';
import { TestCard } from '@/components/labs/TestCard';
import '@/components/labs/Labs.css';

export default function LabTestsPage() {
    const params = useParams();
    const router = useRouter();
    const labIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const labId = parseInt(labIdStr, 10);

    const [lab, setLab] = useState<any>(null);
    const [tests, setTests] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        if (!labId) return;

        async function fetchData() {
            setLoading(true);
            try {
                const [labData, testsData] = await Promise.all([
                    getLabById(labId),
                    getLabTests(labId)
                ]);
                setLab(labData);
                setTests(testsData || []);
            } catch (error) {
                console.error("Failed to fetch lab tests", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [labId]);

    const filteredTests = tests.filter(test => 
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-teal-600">Loading Tests...</div>
            </div>
        );
    }

    if (!lab) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Laboratory Not Found</h2>
                <button
                    onClick={() => router.push('/labs')}
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                    Back to Labs
                </button>
            </div>
        );
    }

    return (
        <div className="labs-container">
            <div className="page-header">
                <div className="header-row">
                    <h1 className="page-title">Tests at {lab.name}</h1>
                    <button
                        onClick={() => router.push('/labs')}
                        className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        Back to Labs
                    </button>
                </div>

                <div className="search-container mt-4">
                    <div className="search-wrapper">
                        <div className="search-icon">🔍</div>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search tests by name or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {filteredTests.length > 0 ? (
                <div className="labs-list">
                    {filteredTests.map((test) => (
                        <TestCard key={test.id} test={test} lab={lab} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300 mt-8">
                    <p className="text-gray-500 text-lg">
                        {tests.length === 0
                            ? 'No tests available for this laboratory.'
                            : 'No tests match your search.'}
                    </p>
                </div>
            )}
        </div>
    );
}
