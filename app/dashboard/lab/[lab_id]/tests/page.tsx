'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getLabTests, addLabTest, deleteLabTest, getLabById, getMyLabApplications, getMyManagedLabs } from '@/services/lab';
import type { LabTestResponse, NewLabTest, TestCategory, SampleType, LabResponse } from '@/types/lab';
import '@/app/dashboard.css';

export default function ManageTestsPage() {
    const params = useParams();
    const router = useRouter();
    const labId = Number(params.lab_id);
    
    const [tests, setTests] = useState<LabTestResponse[]>([]);
    const [lab, setLab] = useState<LabResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const fetchTests = async () => {
        if (!labId) return;
        setIsLoading(true);
        try {
            // 1. Verify ownership via the specialized 'managed labs' endpoint
            const managedLabs = await getMyManagedLabs();
            const labRecord = managedLabs.find(l => l.id === labId);
            
            if (!labRecord) {
                console.error(`Access Denied: Lab ID ${labId} not found in managed labs:`, managedLabs);
                setError('PERMISSION_DENIED');
                setIsLoading(false);
                return;
            }

            // 2. Fetch the catalog data
            const testsData = await getLabTests(labId);
            
            setTests(testsData || []);
            setLab(labRecord);
        } catch (err: any) {
            console.error('Failed to fetch tests:', err);
            setError('FAILED_TO_FETCH');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTests();
    }, [labId]);

    const handleAddTest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        
        const formData = new FormData(e.currentTarget);
        const testData: NewLabTest = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            category: formData.get('category') as TestCategory,
            turnaround_time_hours: Number(formData.get('turnaround_time_hours')),
            sample_type: formData.get('sample_type') as SampleType,
            test_price: Number(formData.get('test_price')),
            normal_range: formData.get('normal_range') as string,
            unit_of_measurement: formData.get('unit_of_measurement') as string,
        };

        try {
            await addLabTest(labId, testData);
            setIsAdding(false);
            fetchTests();
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to add test.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (testId: number) => {
        if (!confirm('Are you sure you want to delete this test?')) return;
        try {
            await deleteLabTest(labId, testId);
            fetchTests();
        } catch (err) {
            alert('Failed to delete test.');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    if (error === 'PERMISSION_DENIED') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
                <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 14c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">Access Denied</h2>
                <p className="text-gray-500 max-w-md mb-8">This laboratory does not appear to be under your management. Please check your applications.</p>
                <Link href="/dashboard/lab" className="bg-teal-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20">
                    Back to Selection
                </Link>
            </div>
        );
    }

    if (error === 'LAB_NOT_APPROVED') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
                <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">Approval Pending</h2>
                <p className="text-gray-500 max-w-md mb-8">Management is only available for approved laboratories. Please wait for your application to be reviewed.</p>
                <Link href="/dashboard/lab" className="bg-teal-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20">
                    Check Application Status
                </Link>
            </div>
        );
    }
    
    if (error === 'LAB_MISMATCH') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
                <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 14c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">Security Sync Error</h2>
                <p className="text-gray-500 max-w-md mb-8">A laboratory ID mismatch was detected. This laboratory does not belong to you. Your session has been protected from incorrect ID mapping.</p>
                <Link href="/dashboard/lab" className="bg-rose-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20">
                    Return to Safety
                </Link>
            </div>
        );
    }

    return (
        <div className="patient-dashboard bg-gray-50 min-h-screen">
            <header className="dashboard-header mb-8">
                <div className="flex items-center gap-6">
                    <Link href="/dashboard/lab" className="p-2 bg-white rounded-lg shadow-sm text-teal-600 hover:bg-teal-50 transition-all border border-teal-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f766e] tracking-tight">
                                {lab ? `${lab.name} Catalog` : 'Lab Tests Catalog'}
                            </h1>
                            <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-black self-center mt-1">
                                {tests.length} TEST{tests.length !== 1 ? 'S' : ''}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 font-medium mt-1">
                            {lab ? `Managing tests for ${lab.city}, ${lab.lab_code}` : 'Manage the tests offered by your laboratory.'}
                        </p>
                    </div>
                </div>

                <button 
                    onClick={() => setIsAdding(true)}
                    className="bg-teal-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition-all flex items-center gap-2 group"
                >
                    <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Add New Test</span>
                </button>
            </header>

            {isAdding && (
                <div className="fixed inset-0 bg-teal-900/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col scale-100 animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-teal-50/50">
                            <div>
                                <h2 className="text-xl font-black text-teal-900 tracking-tight">Add New Lab Test</h2>
                                <p className="text-[10px] text-teal-600 mt-0.5 uppercase tracking-widest font-black">Configure Test Parameters</p>
                            </div>
                            <button onClick={() => setIsAdding(false)} className="p-2 text-gray-400 hover:text-rose-500 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <form onSubmit={handleAddTest} className="p-8 overflow-y-auto">
                            {error && <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs font-bold uppercase rounded-xl border border-red-100 flex items-center gap-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {error}
                            </div>}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Test Name</label>
                                    <input name="name" required placeholder="e.g. CBC, Blood Sugar" className="w-full px-4 py-3 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Category</label>
                                    <select name="category" required className="w-full px-4 py-3 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all outline-none appearance-none cursor-pointer">
                                        <option value="Blood">Blood</option>
                                        <option value="Urine">Urine</option>
                                        <option value="Imaging">Imaging</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Sample Type</label>
                                    <select name="sample_type" required className="w-full px-4 py-3 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all outline-none">
                                        <option value="blood">Blood</option>
                                        <option value="urine">Urine</option>
                                        <option value="saliva">Saliva</option>
                                        <option value="stool">Stool</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Price (₹)</label>
                                    <input name="test_price" type="number" step="0.01" required placeholder="0.00" className="w-full px-4 py-3 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all outline-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Turnaround Time (Hours)</label>
                                    <input name="turnaround_time_hours" type="number" required defaultValue={24} className="w-full px-4 py-3 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Unit of Measurement</label>
                                    <input name="unit_of_measurement" placeholder="e.g. mg/dL, %" className="w-full px-4 py-3 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all outline-none" />
                                </div>
                            </div>

                            <div className="space-y-2 mb-6">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Normal Range</label>
                                <input name="normal_range" placeholder="e.g. 70-100 mg/dL" className="w-full px-4 py-3 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all outline-none" />
                            </div>

                            <div className="space-y-2 mb-8">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Description</label>
                                <textarea name="description" rows={3} className="w-full px-4 py-3 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all outline-none resize-none" />
                            </div>

                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">Cancel</button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-teal-600 text-white px-10 py-3 rounded-xl font-bold shadow-xl shadow-teal-600/20 hover:bg-teal-700 disabled:bg-gray-200 transition-all flex items-center gap-2"
                                >
                                    {isSubmitting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                                    Add Test
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tests.length > 0 ? tests.map((test) => (
                    <div key={test.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => handleDelete(test.id)}
                                className="p-2 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-black text-xl">
                                {test.name[0]}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors">{test.name}</h3>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{test.category}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Price</span>
                                <span className="font-bold text-teal-600">₹{test.test_price}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Sample</span>
                                <span className="font-bold text-gray-800 capitalize">{test.sample_type}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">TAT</span>
                                <span className="font-bold text-gray-800">{test.turnaround_time_hours} Hours</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-50">
                            <p className="text-xs text-gray-500 line-clamp-2 italic">
                                {test.description || 'No description provided.'}
                            </p>
                        </div>

                        {test.normal_range && (
                            <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Normal Range</p>
                                <p className="text-xs font-bold text-blue-800">{test.normal_range} {test.unit_of_measurement}</p>
                            </div>
                        )}
                    </div>
                )) : (
                    <div className="col-span-full py-20 bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center space-y-4">
                        <div className="p-4 bg-teal-50 rounded-full">
                            <svg className="w-12 h-12 text-teal-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.424 19.536a2 2 0 01-2.828 0L9.939 12.879l5.657-5.657 6.657 6.657a2 2 0 010 2.828l-2.829 2.829zM4.929 15.536l-2.829-2.829a2 2 0 010-2.828l6.657-6.657 5.657 5.657-9.485 9.485z" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">No Tests Cataloged</p>
                            <p className="text-sm text-gray-500 mt-1">Start by adding your first laboratory test.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
