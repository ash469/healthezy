import Link from 'next/link';

const AppDownload = () => {
    return (
        <section className="container mx-auto p-2 py-12">
            <div className="flex flex-row items-center justify-center gap-8 md:gap-12">
                <div className="w-auto flex flex-shrink-0">
                    <div className="w-24 h-32 md:w-64 md:h-80 bg-gray-200 rounded-lg shadow-inner flex-shrink-0"></div>
                </div>

                <div className="w-full md:w-2/3 text-left">
                    <h2 className="text-lg md:text-3xl font-bold text-[#005f6b] mb-2 md:mb-4">
                        Everything in one App
                    </h2>
                    <p className="text-gray-600 text-xs md:text-base mb-4 md:mb-8 max-w-xl">
                        Track appointments, lab-results, and prescriptions all from your dashboard.
                        Manage your complete health journey seamlessly with Healthezy app.
                    </p>
                    <button suppressHydrationWarning className="bg-[#005f6b] hover:bg-[#004a54] text-white text-xs md:text-base font-semibold py-2 px-4 md:py-3 md:px-8 rounded-lg transition-colors whitespace-nowrap">
                        Create Free Account
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AppDownload;
