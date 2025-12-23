export default function OfflinePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <svg
                        className="w-24 h-24 mx-auto text-teal-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
                        />
                    </svg>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    You're Offline
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                    It looks like you've lost your internet connection. Don't worry, Healthezy works offline too!
                </p>

                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        What you can do offline:
                    </h2>
                    <ul className="space-y-3 text-left">
                        <li className="flex items-start">
                            <svg className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">View previously loaded doctors and labs</span>
                        </li>
                        <li className="flex items-start">
                            <svg className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">Browse your saved appointments</span>
                        </li>
                        <li className="flex items-start">
                            <svg className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">Access cached health information</span>
                        </li>
                        <li className="flex items-start">
                            <svg className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">Your bookings will sync when you're back online</span>
                        </li>
                    </ul>
                </div>

                <button
                    onClick={() => window.location.reload()}
                    className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                    Try Again
                </button>

                <p className="text-sm text-gray-500 mt-6">
                    Check your internet connection and try again
                </p>
            </div>
        </div>
    );
}
