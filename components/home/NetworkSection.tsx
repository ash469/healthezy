import Link from 'next/link';

const NetworkSection = () => {
    return (
        <section className="bg-azure-50 py-10">
            <div className="container mx-auto px-2">
                <h2 className="text-xl md:text-3xl font-bold text-center text-[#005f6b] mb-12 whitespace-nowrap overflow-hidden text-ellipsis">
                    Join Healthezy Network
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:divide-x md:divide-gray-300">
                    <div className="text-center px-4">
                        <h2 className="text-3xl font-bold text-[#009ca6] mb-4">Patients</h2>
                        <p className="text-sm text-gray-600 mb-8 max-w-xs mx-auto">
                            Book appointments, order medicines, view your wellness journey.
                        </p>
                        <Link href="/signup?type=patient" className="bg-[#005f6b] text-white px-6 py-2 rounded text-sm hover:bg-[#004a54] transition-colors inline-block">
                            Join as Patient
                        </Link>
                    </div>
                    <div className="text-center px-4">
                        <h2 className="text-3xl font-bold text-[#009ca6] mb-4">Provider</h2>
                        <p className="text-sm text-gray-600 mb-8 max-w-xs mx-auto">
                            Clinics, Labs, Pharmacies & Brands — manage appointments and services.
                        </p>
                        <Link href="/signup?type=provider" className="border border-[#005f6b] text-[#005f6b] px-6 py-2 rounded text-sm hover:bg-gray-50 transition-colors inline-block">
                            Join as Provider
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NetworkSection;
