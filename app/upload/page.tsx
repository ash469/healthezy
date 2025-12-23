'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
    const router = useRouter();
    const [files, setFiles] = useState<FileList | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        // Handle files opened with the app via file_handlers
        const handleFiles = async () => {
            if (typeof window !== 'undefined' && 'launchQueue' in window) {
                (window as any).launchQueue.setConsumer(async (launchParams: any) => {
                    if (launchParams.files && launchParams.files.length > 0) {
                        const fileHandles = launchParams.files;
                        const fileArray: File[] = [];

                        for (const fileHandle of fileHandles) {
                            const file = await fileHandle.getFile();
                            fileArray.push(file);
                        }

                        // Create a FileList-like object
                        const dt = new DataTransfer();
                        fileArray.forEach(file => dt.items.add(file));
                        setFiles(dt.files);
                    }
                });
            }
        };

        handleFiles();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(e.target.files);
        }
    };

    const handleUpload = async () => {
        if (!files || files.length === 0) return;

        setUploading(true);

        // Simulate upload - replace with actual upload logic
        setTimeout(() => {
            setUploading(false);
            router.push('/dashboard/patient?uploadSuccess=true');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-teal-600 mb-6">Upload Medical Documents</h1>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Files (PDF, PNG, JPG)
                        </label>
                        <input
                            type="file"
                            accept=".pdf,.png,.jpg,.jpeg"
                            multiple
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                        />
                    </div>

                    {files && files.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Selected Files</h3>
                            <div className="space-y-2">
                                {Array.from(files).map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-teal-100 rounded">
                                                {file.type.includes('pdf') ? (
                                                    <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-600">{file.type.split('/')[1].toUpperCase() || 'FILE'}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex space-x-4">
                        <button
                            onClick={handleUpload}
                            disabled={!files || files.length === 0 || uploading}
                            className="flex-1 bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            {uploading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Uploading...
                                </span>
                            ) : (
                                'Upload to Health Records'
                            )}
                        </button>
                        <button
                            onClick={() => router.push('/')}
                            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
