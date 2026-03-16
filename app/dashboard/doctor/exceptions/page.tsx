"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDoctorExceptions, addDoctorException, deleteDoctorException } from '@/services/doctor';
import { apiClient } from '@/services/config';

export default function DoctorExceptionsPage() {
    const [exceptions, setExceptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [doctorId, setDoctorId] = useState<number | null>(null);

    // Form state
    const [newException, setNewException] = useState({
        exception_date: new Date().toISOString().split('T')[0],
        is_available: false,
        start_time: '',
        end_time: '',
        reason: ''
    });

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const userRes = await apiClient.get('/users/me');
                const dId = userRes.data.doctor_id;

                if (dId) {
                    setDoctorId(dId);
                    const data = await getDoctorExceptions(dId);
                    setExceptions(data);
                }
            } catch (err) {
                console.error("Error fetching exceptions:", err);
                setError("Failed to load leaves/exceptions.");
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const handleAddException = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!doctorId) return;

        try {
            const data = await addDoctorException(doctorId, newException);
            setExceptions([...exceptions, data]);
            alert("Leave/Exception added successfully!");
        } catch (err) {
            console.error("Error adding exception:", err);
            alert("Failed to add leave. Check if it overlaps with existing ones.");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Remove this leave/exception?")) return;
        try {
            await deleteDoctorException(id);
            setExceptions(exceptions.filter(e => e.id !== id));
        } catch (err) {
            console.error("Error deleting exception:", err);
            alert("Failed to delete.");
        }
    };

    if (loading) return <div className="p-8 text-center">Loading leaves...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-teal-900">Manage Leaves & Exceptions</h1>
                        <p className="text-gray-600">Plan your holidays or special working hours</p>
                    </div>
                    <Link href="/dashboard/doctor" className="text-teal-700 hover:text-teal-900 font-medium font-semibold">
                        Back to Dashboard
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Add Form */}
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-fit">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Exception</h2>
                        <form onSubmit={handleAddException} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                    value={newException.exception_date}
                                    onChange={(e) => setNewException({ ...newException, exception_date: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-3 py-2">
                                <input
                                    type="checkbox"
                                    id="is_available"
                                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                                    checked={newException.is_available}
                                    onChange={(e) => setNewException({ ...newException, is_available: e.target.checked })}
                                />
                                <label htmlFor="is_available" className="text-sm font-medium text-gray-700">Available on this day? (Override Leave)</label>
                            </div>

                            {!newException.is_available ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="Holiday, Emergency, etc."
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                        value={newException.reason}
                                        onChange={(e) => setNewException({ ...newException, reason: e.target.value })}
                                    />
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                        <input
                                            type="time"
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                            value={newException.start_time}
                                            onChange={(e) => setNewException({ ...newException, start_time: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                        <input
                                            type="time"
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                            value={newException.end_time}
                                            onChange={(e) => setNewException({ ...newException, end_time: e.target.value })}
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-lg transition-colors shadow-sm mt-4"
                            >
                                Set Exception
                            </button>
                        </form>
                    </div>

                    {/* Exceptions List */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden h-fit">
                        <div className="p-4 border-b border-gray-100 bg-teal-50">
                            <h2 className="font-bold text-teal-900">Planned Exceptions</h2>
                        </div>
                        <div className="max-h-[500px] overflow-y-auto">
                            {exceptions.length > 0 ? (
                                exceptions.map((ex) => (
                                    <div key={ex.id} className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div>
                                            <div className="font-bold text-gray-800">{new Date(ex.exception_date).toLocaleDateString()}</div>
                                            <div className="text-sm">
                                                {ex.is_available ? (
                                                    <span className="text-green-600 font-medium">Extra Hours: {ex.start_time?.substring(0, 5)} - {ex.end_time?.substring(0, 5)}</span>
                                                ) : (
                                                    <span className="text-red-500 font-medium">Leave: {ex.reason || 'Not available'}</span>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(ex.id)}
                                            className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-400">
                                    No leaves or exceptions planned.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
