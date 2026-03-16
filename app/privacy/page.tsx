export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-teal-200 selection:text-teal-900 pb-20">
            {/* Sleek, Compact Header */}
            <div className="w-full bg-gradient-to-r from-[#0f766e] via-[#0d6b63] to-teal-800 text-white py-12 px-6 relative overflow-hidden shadow-lg border-b border-teal-900">
                {/* Decorative background element */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight drop-shadow-sm">
                            Privacy Policy
                        </h1>
                        <p className="text-base md:text-lg font-medium max-w-2xl opacity-90 text-teal-50">
                            Healthezy respects your privacy and is committed to protecting your personal information.
                        </p>
                    </div>
                    {/* Interactive badge or element */}
                    <div className="hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all cursor-default">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-semibold tracking-wide uppercase text-teal-50">Active Document</span>
                    </div>
                </div>
            </div>

            {/* Expansive, Interactive Content Grid */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

                <section className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-default md:col-span-2 lg:col-span-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-5">
                            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-[#0f766e] border border-teal-100 font-bold text-xl shadow-inner group-hover:bg-[#0f766e] group-hover:text-white transition-colors duration-300">1</span>
                            <h2 className="text-xl font-bold text-slate-800">Information We Collect</h2>
                        </div>
                        <div className="text-slate-600 leading-relaxed text-base group-hover:text-slate-800 transition-colors">
                            <p className="mb-3 font-medium text-slate-700">We may collect the following information:</p>
                            <ul className="list-disc pl-5 space-y-1 marker:text-teal-500">
                                <li>Name and contact details</li>
                                <li>Account information</li>
                                <li>Location data (for nearby services)</li>
                                <li>Health-related information shared voluntarily by users</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-default md:col-span-2 lg:col-span-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-5">
                            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-[#0f766e] border border-teal-100 font-bold text-xl shadow-inner group-hover:bg-[#0f766e] group-hover:text-white transition-colors duration-300">2</span>
                            <h2 className="text-xl font-bold text-slate-800">How We Use Information</h2>
                        </div>
                        <div className="text-slate-600 leading-relaxed text-base group-hover:text-slate-800 transition-colors">
                            <p className="mb-3 font-medium text-slate-700">The collected information is used to:</p>
                            <ul className="list-disc pl-5 space-y-1 marker:text-teal-500">
                                <li>Provide healthcare services through the platform</li>
                                <li>Improve platform functionality and user experience</li>
                                <li>Connect users with relevant healthcare providers</li>
                                <li>Ensure security and prevent fraud</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-default md:col-span-2 lg:col-span-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-5">
                            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-[#0f766e] border border-teal-100 font-bold text-xl shadow-inner group-hover:bg-[#0f766e] group-hover:text-white transition-colors duration-300">3</span>
                            <h2 className="text-xl font-bold text-slate-800">Data Protection</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-base group-hover:text-slate-800 transition-colors">
                            We take appropriate technical and organizational measures to protect your personal data from unauthorized access, misuse, or disclosure.
                        </p>
                    </div>
                </section>

                <section className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-default md:col-span-1 lg:col-span-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-5">
                            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-[#0f766e] border border-teal-100 font-bold text-xl shadow-inner group-hover:bg-[#0f766e] group-hover:text-white transition-colors duration-300">4</span>
                            <h2 className="text-xl font-bold text-slate-800">Third-Party Sharing</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-base group-hover:text-slate-800 transition-colors">
                            We do not sell personal data. Information may only be shared with healthcare providers when necessary to deliver services through the platform.
                        </p>
                    </div>
                </section>

                <section className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-default md:col-span-2 lg:col-span-2">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-5">
                            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-[#0f766e] border border-teal-100 font-bold text-xl shadow-inner group-hover:bg-[#0f766e] group-hover:text-white transition-colors duration-300">5</span>
                            <h2 className="text-xl font-bold text-slate-800">Updates to Privacy Policy</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-base group-hover:text-slate-800 transition-colors">
                            This policy may be updated periodically to reflect improvements or regulatory requirements.
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
}
