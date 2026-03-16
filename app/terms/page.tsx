export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-teal-200 selection:text-teal-900 pb-20">
            {/* Sleek, Compact Header */}
            <div className="w-full bg-gradient-to-r from-[#0f766e] via-[#0d6b63] to-teal-800 text-white py-12 px-6 relative overflow-hidden shadow-lg border-b border-teal-900">
                {/* Decorative background element */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight drop-shadow-sm">
                            Terms & Conditions
                        </h1>
                        <p className="text-base md:text-lg font-medium max-w-2xl opacity-90 text-teal-50">
                            Welcome to Healthezy. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions.
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

                <section className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-default">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-5">
                            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-[#0f766e] border border-teal-100 font-bold text-xl shadow-inner group-hover:bg-[#0f766e] group-hover:text-white transition-colors duration-300">1</span>
                            <h2 className="text-xl font-bold text-slate-800">Platform Usage</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-base group-hover:text-slate-800 transition-colors">
                            Healthezy provides a digital platform that connects users with healthcare providers including clinics, hospitals, laboratories, and pharmacies. We do not provide direct medical services.
                        </p>
                    </div>
                </section>

                <section className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-default">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-5">
                            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-[#0f766e] border border-teal-100 font-bold text-xl shadow-inner group-hover:bg-[#0f766e] group-hover:text-white transition-colors duration-300">2</span>
                            <h2 className="text-xl font-bold text-slate-800">User Responsibility</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-base group-hover:text-slate-800 transition-colors">
                            Users are responsible for providing accurate information while using the platform. Any misuse of the platform or fraudulent activities may lead to suspension of access.
                        </p>
                    </div>
                </section>

                <section className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-default">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-5">
                            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-[#0f766e] border border-teal-100 font-bold text-xl shadow-inner group-hover:bg-[#0f766e] group-hover:text-white transition-colors duration-300">3</span>
                            <h2 className="text-xl font-bold text-slate-800">Medical Disclaimer</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-base group-hover:text-slate-800 transition-colors">
                            Information provided on the platform is for informational purposes only and should not be considered a substitute for professional medical advice, diagnosis, or treatment.
                        </p>
                    </div>
                </section>

                <section className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-default">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-5">
                            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-[#0f766e] border border-teal-100 font-bold text-xl shadow-inner group-hover:bg-[#0f766e] group-hover:text-white transition-colors duration-300">4</span>
                            <h2 className="text-xl font-bold text-slate-800">Third-Party Services</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-base group-hover:text-slate-800 transition-colors">
                            Healthcare providers listed on the platform operate independently. Healthezy is not responsible for the quality, accuracy, or outcomes of services provided by third-party providers.
                        </p>
                    </div>
                </section>

                <section className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-default md:col-span-1 lg:col-span-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-5">
                            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-[#0f766e] border border-teal-100 font-bold text-xl shadow-inner group-hover:bg-[#0f766e] group-hover:text-white transition-colors duration-300">5</span>
                            <h2 className="text-xl font-bold text-slate-800">Intellectual Property</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-base group-hover:text-slate-800 transition-colors">
                            All content, branding, and technology associated with Healthezy are the property of the company and may not be copied or reproduced without permission.
                        </p>
                    </div>
                </section>

                <section className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-default md:col-span-2 lg:col-span-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-5">
                            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-[#0f766e] border border-teal-100 font-bold text-xl shadow-inner group-hover:bg-[#0f766e] group-hover:text-white transition-colors duration-300">6</span>
                            <h2 className="text-xl font-bold text-slate-800">Modification of Terms</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-base group-hover:text-slate-800 transition-colors">
                            Healthezy reserves the right to modify these terms at any time. Continued use of the platform indicates acceptance of the updated terms.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
