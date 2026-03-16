'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/admin';
import { AdminHospitalResponse, AdminLabResponse, AdminEntity } from '@/types/admin';

export default function ApplicationReview() {
    const [hospitals, setHospitals] = useState<AdminHospitalResponse[]>([]);
    const [labs, setLabs] = useState<AdminLabResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<AdminEntity>('hospital');
    const [fullDetail, setFullDetail] = useState<AdminHospitalResponse | AdminLabResponse | null>(null);
    const [isDetailLoading, setIsDetailLoading] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const hData = await adminService.getApplications('hospital', 'pending');
            const lData = await adminService.getApplications('lab', 'pending');
            setHospitals(hData || []);
            setLabs(lData || []);
        } catch (err) {
            console.error('Data sync failed:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleViewDetails = async (app: AdminHospitalResponse | AdminLabResponse) => {
        setIsDetailLoading(true);
        try {
            const entityPlural = activeTab === 'hospital' ? 'hospitals' : 'labs';
            const details = await adminService.getApplicationDetails(entityPlural, app.id);
            setFullDetail(details);
        } catch (err) {
            console.error('Retrieval failed:', err);
            setFullDetail(app);
        } finally {
            setIsDetailLoading(false);
        }
    };

    const handleAction = async (action: 'approve' | 'reject') => {
        if (!fullDetail) return;
        if (!window.confirm(`Are you sure you want to ${action} ${fullDetail.name}?`)) return;

        setIsActionLoading(true);
        try {
            const entityPlural = activeTab === 'hospital' ? 'hospitals' : 'labs';
            await adminService.performApplicationAction(entityPlural, action, fullDetail.id);
            setFullDetail(null);
            await fetchData();
        } catch (err) {
            alert(`Failed to ${action} application.`);
        } finally {
            setIsActionLoading(false);
        }
    };

    const currentData = activeTab === 'hospital' ? hospitals : labs;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
                <div>
                    <h1 className="text-[2.5rem] font-bold text-[#0e5c63]">Applications</h1>
                    <p className="text-gray-500 mt-1">Review and manage registration requests from medical facilities.</p>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => { setActiveTab('hospital'); setFullDetail(null); }}
                        className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'hospital' ? 'bg-white text-[#0e5c63] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Hospitals
                    </button>
                    <button
                        onClick={() => { setActiveTab('lab'); setFullDetail(null); }}
                        className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'lab' ? 'bg-white text-[#0e5c63] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Laboratories
                    </button>
                </div>
            </header>

            <main className="space-y-4">
                {isLoading ? (
                    <div className="py-20 text-center text-gray-400 font-medium">Loading applications...</div>
                ) : currentData.length > 0 ? (
                    currentData.map((app) => (
                        <div key={app.id} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#0e5c63]/30 transition-colors shadow-sm">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[#0e5c63] font-bold text-lg">
                                    {app.name[0]}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{app.name}</h3>
                                    <p className="text-sm text-gray-500">{app.email} • {activeTab === 'hospital' ? (app as AdminHospitalResponse).hospital_code : (app as AdminLabResponse).lab_code}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${app.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-gray-50 text-gray-500 border border-gray-100'}`}>
                                    {app.status}
                                </span>
                                <button
                                    onClick={() => handleViewDetails(app)}
                                    className="px-5 py-2.5 bg-[#0e5c63] text-white rounded-lg text-sm font-semibold hover:bg-[#0b4a50] transition-colors"
                                >
                                    Review Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-24 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-400 font-medium">No pending {activeTab} applications.</p>
                    </div>
                )}
            </main>

            {/* Detail Overlay */}
            {fullDetail && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setFullDetail(null)} />
                    <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden relative flex flex-col animate-in slide-in-from-bottom-4 duration-300">
                        <header className="p-8 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-[#0e5c63]">{fullDetail.name}</h2>
                            <button onClick={() => setFullDetail(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </header>

                        <div className="flex-1 overflow-y-auto p-8 space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <section className="space-y-6">
                                    <DetailGroup label="General Information">
                                        <DetailItem label="Entity Type" value={activeTab.toUpperCase()} />
                                        <DetailItem label="Organization Code" value={activeTab === 'hospital' ? (fullDetail as AdminHospitalResponse).hospital_code : (fullDetail as AdminLabResponse).lab_code} />
                                        <DetailItem label="License Number" value={fullDetail.license_number} />
                                        <DetailItem label="Accreditation" value={fullDetail.accreditation} />
                                    </DetailGroup>
                                    <DetailGroup label="Capability">
                                        {activeTab === 'hospital' ? (
                                            <>
                                                <DetailItem label="Total Beds" value={(fullDetail as AdminHospitalResponse).total_beds?.toString()} />
                                                <DetailItem label="Available Beds" value={(fullDetail as AdminHospitalResponse).available_beds?.toString()} />
                                            </>
                                        ) : (
                                            <>
                                                <DetailItem label="Timings" value={`${(fullDetail as AdminLabResponse).opening_time} - ${(fullDetail as AdminLabResponse).closing_time}`} />
                                                <DetailItem label="24/7 Service" value={fullDetail.is24x7 ? 'Yes' : 'No'} />
                                            </>
                                        )}
                                    </DetailGroup>
                                </section>
                                <section className="space-y-6">
                                    <DetailGroup label="Contact & Location">
                                        <DetailItem label="Email" value={fullDetail.email} />
                                        <DetailItem label="Phone" value={fullDetail.phone_number} />
                                        <DetailItem label="Address" value={fullDetail.address} />
                                        <DetailItem label="Location" value={`${fullDetail.city}, ${fullDetail.state}`} />
                                    </DetailGroup>
                                    <DetailGroup label="About">
                                        <p className="text-sm text-gray-600 leading-relaxed font-medium">{fullDetail.description || 'No description provided.'}</p>
                                    </DetailGroup>
                                </section>
                            </div>
                        </div>

                        <footer className="p-8 border-t border-gray-100 bg-gray-50 flex justify-end gap-4">
                            <button
                                onClick={() => handleAction('reject')}
                                disabled={isActionLoading}
                                className="px-8 py-3 bg-white border border-red-200 text-red-600 text-sm font-bold rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => handleAction('approve')}
                                disabled={isActionLoading}
                                className="px-10 py-3 bg-[#0e5c63] text-white text-sm font-bold rounded-xl hover:bg-[#0b4a50] transition-colors shadow-lg shadow-[#0e5c63]/20 disabled:opacity-50"
                            >
                                Approve Application
                            </button>
                        </footer>
                    </div>
                </div>
            )}

            {(isActionLoading || isDetailLoading) && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white/60">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-4 border-gray-100 border-t-[#0e5c63] rounded-full animate-spin" />
                        <p className="text-sm font-bold text-[#0e5c63] animate-pulse">Processing...</p>
                    </div>
                </div>
            )}
        </div>
    );
}

function DetailGroup({ label, children }: { label: string, children: React.ReactNode }) {
    return (
        <div>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{label}</h4>
            <div className="space-y-4">{children}</div>
        </div>
    );
}

function DetailItem({ label, value }: { label: string, value?: string }) {
    return (
        <div className="flex justify-between border-b border-gray-50 pb-2">
            <span className="text-sm text-gray-500 font-medium">{label}</span>
            <span className="text-sm text-gray-900 font-bold">{value || 'N/A'}</span>
        </div>
    );
}
