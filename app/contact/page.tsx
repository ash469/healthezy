import { Metadata } from 'next';
import { pageMetadata, siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: pageMetadata.contact.title,
    description: pageMetadata.contact.description,
    keywords: pageMetadata.contact.keywords,
    alternates: {
        canonical: `${siteConfig.url}/contact`
    }
};


export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-teal-200 selection:text-teal-900 pb-20">
            {/* Sleek, Compact Header */}
            <div className="w-full bg-gradient-to-r from-[#0f766e] via-[#0d6b63] to-teal-800 text-white py-12 px-6 relative overflow-hidden shadow-lg border-b border-teal-900">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight drop-shadow-sm">
                            Contact Us
                        </h1>
                        <p className="text-base md:text-lg font-medium max-w-2xl opacity-90 text-teal-50">
                            If you have any questions, feedback, or support requests, feel free to contact us. Our team will try to respond to your query as soon as possible.
                        </p>
                    </div>
                </div>
            </div>

            {/* Expansive, Interactive Content Grid */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">

                {/* Contact Information Card */}
                <section className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-[#0f766e] border border-teal-100 font-bold text-xl shadow-inner group-hover:bg-[#0f766e] group-hover:text-white transition-colors duration-300">📞</span>
                                <h2 className="text-xl font-bold text-slate-800">Get in Touch</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="text-[#0f766e] mt-1 shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.432-4.132-7.028-7.028l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone</p>
                                        <a href="tel:+919334076735" className="text-lg font-medium text-slate-800 hover:text-[#0f766e] transition-colors inline-block">+91 93340 76735</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="text-[#0f766e] mt-1 shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</p>
                                        <a href="mailto:sctcpvtltd@gmail.com" className="text-lg font-medium text-slate-800 hover:text-[#0f766e] transition-colors break-all inline-block">sctcpvtltd@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Media Card */}
                <section className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-[#0f766e] border border-teal-100 font-bold text-xl shadow-inner group-hover:bg-[#0f766e] group-hover:text-white transition-colors duration-300">🌐</span>
                            <h2 className="text-xl font-bold text-slate-800">Connect With Us</h2>
                        </div>

                        <p className="text-slate-600 mb-6 group-hover:text-slate-800 transition-colors">
                            Follow our social media channels to stay updated on the latest news, features, and healthcare tips from Healthezy.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 mt-auto">
                            <a href="https://www.instagram.com/healthezy.in?igsh=MW53MmkyaWUyZHRzcg==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-100 hover:shadow-md hover:-translate-y-1 transition-all group/social">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-sm group-hover/social:scale-110 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </div>
                                <span className="font-semibold text-slate-800 group-hover/social:text-pink-600 transition-colors">Instagram</span>
                            </a>

                            <a href="https://www.linkedin.com/company/sustainable-care-tech-chain-pvt-ltd/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100 hover:shadow-md hover:-translate-y-1 transition-all group/social">
                                <div className="w-10 h-10 rounded-full bg-[#0077b5] flex items-center justify-center text-white shadow-sm group-hover/social:scale-110 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                </div>
                                <span className="font-semibold text-slate-800 group-hover/social:text-[#0077b5] transition-colors">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
