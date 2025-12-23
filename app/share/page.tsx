'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SharePage() {
    const router = useRouter();
    const [sharedData, setSharedData] = useState<{
        title?: string;
        text?: string;
        url?: string;
        files?: FileList;
    } | null>(null);

    useEffect(() => {
        // Handle shared data when the page loads
        const handleSharedData = async () => {
            if (typeof window !== 'undefined' && 'launchQueue' in window) {
                // Web Share Target API
                (window as any).launchQueue.setConsumer(async (launchParams: any) => {
                    if (launchParams.files && launchParams.files.length > 0) {
                        const files = await Promise.all(
                            launchParams.files.map(async (fileHandle: any) => {
                                return await fileHandle.getFile();
                            })
                        );

                        setSharedData({
                            title: launchParams.title,
                            text: launchParams.text,
                            url: launchParams.url,
                            files: files as any
                        });
                    }
                });
            }
        };

        handleSharedData();
    }, []);

    const handleUpload = async () => {
        if (sharedData?.files) {
            // Redirect to upload page based on file type
            const file = sharedData.files[0];
            if (file.type.includes('pdf') || file.type.includes('image')) {
                router.push('/dashboard/patient?tab=documents');
            }
        } else {
            router.push('/');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-teal-600 mb-6">Share Medical Documents</h1>

                    {sharedData ? (
                        <div className="space-y-4">
                            {sharedData.title && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <p className="text-gray-900">{sharedData.title}</p>
                                </div>
                            )}

                            {sharedData.text && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <p className="text-gray-900">{sharedData.text}</p>
                                </div>
                            )}

                            {sharedData.url && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                                    <a href={sharedData.url} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                                        {sharedData.url}
                                    </a>
                                </div>
                            )}

                            {sharedData.files && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Files</label>
                                    <ul className="space-y-2">
                                        {Array.from(sharedData.files).map((file, index) => (
                                            <li key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
                                                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" />
                                                </svg>
                                                <span className="text-gray-900">{file.name}</span>
                                                <span className="text-sm text-gray-500">({(file.size / 1024).toFixed(2)} KB)</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex space-x-4 mt-6">
                                <button
                                    onClick={handleUpload}
                                    className="flex-1 bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors"
                                >
                                    Upload to Health Records
                                </button>
                                <button
                                    onClick={() => router.push('/')}
                                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-gray-600 mb-4">Waiting for shared content...</p>
                            <button
                                onClick={() => router.push('/')}
                                className="text-teal-600 hover:underline"
                            >
                                Go to Homepage
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
