import Link from 'next/link';
import Image from 'next/image';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="bg-[#007c87] text-white">
            <div className="footer-container">
                <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-8 items-start">
                    <div>
                        <h3 className="text-xl font-bold mb-6 border-b-2 border-white pb-2 inline-block">
                            Browse
                        </h3>
                        <ul className="space-y-2 text-lg">
                            <li>
                                <Link href="/" className="hover:text-gray-200 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-gray-200 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-gray-200 transition-colors">
                                    Contact us
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-gray-200 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-gray-200 transition-colors">
                                    Terms and Conditions
                                </Link>
                            </li>
                        </ul>

                        <div className="mt-10">
                            <h3 className="text-lg font-medium mb-4">Follow Us</h3>
                            <div className="flex gap-4">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 transition-opacity"
                                    aria-label="Instagram"
                                >
                                    <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 transition-opacity"
                                    aria-label="Twitter"
                                >
                                    <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} />
                                </a>
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80 transition-opacity"
                                    aria-label="Facebook"
                                >
                                    <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="w-[2px] bg-white/25 self-stretch mx-2"></div>

                    <div>
                        <h3 className="text-xl font-bold mb-6 border-b-2 border-white pb-2 inline-block">
                            Quick Links
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/doctors" className="hover:text-gray-200 transition-colors">
                                    Doctors
                                </Link>
                            </li>
                            <li>
                                <Link href="/labs" className="hover:text-gray-200 transition-colors">
                                    Labs
                                </Link>
                            </li>
                            <li>
                                <Link href="/hospital" className="hover:text-gray-200 transition-colors">
                                    Hospitals
                                </Link>
                            </li>
                            <li>
                                <Link href="/pharmacy" className="hover:text-gray-200 transition-colors">
                                    Pharmacy
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="hover:text-gray-200 transition-colors">
                                    Wellness Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-gray-200 transition-colors">
                                    Blogs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Vertical Divider 2 */}
                    <div className="w-[2px] bg-white/25 self-stretch mx-2"></div>

                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4">
                            <Image
                                src="/footerlogo.png"
                                alt="Healthezy Logo"
                                width={120}
                                height={120}
                                className="w-auto h-32"
                            />

                        </div>

                        <h2 className="text-3xl font-bold mb-4">Healthezy</h2>

                        <p className="text-sm leading-relaxed max-w-sm">
                            Healthezy - One-stop healthcare platform making doctor availability, clinics, labs, and pharmacies accessible in real time for Tier-2/3 India. Prevention, Care, Cure - All in one place.
                        </p>
                    </div>
                </div>

                <div className="md:hidden flex flex-col items-center space-y-12 mb-12 w-full">

                    {/* Links Section: Side by Side with Divider */}
                    <div className="grid grid-cols-[1fr_auto_1fr] w-full max-w-sm gap-4">
                        {/* Browse */}
                        <div>
                            <h3 className="text-lg font-bold mb-4 border-b-2 border-white pb-2 inline-block">
                                Browse
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li><Link href="/" className="hover:text-gray-200">Home</Link></li>
                                <li><Link href="/about" className="hover:text-gray-200">About Us</Link></li>
                                <li><Link href="/contact" className="hover:text-gray-200">Contact us</Link></li>
                                <li><Link href="/privacy" className="hover:text-gray-200">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-gray-200">Terms and Conditions</Link></li>
                            </ul>
                        </div>

                        {/* Divider */}
                        <div className="w-[2px] bg-white/30 self-stretch mx-2"></div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-bold mb-4 border-b-2 border-white pb-2 inline-block">
                                Quick Links
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li><Link href="/doctors" className="hover:text-gray-200">Doctors</Link></li>
                                <li><Link href="/labs" className="hover:text-gray-200">Labs</Link></li>
                                <li><Link href="/stores" className="hover:text-gray-200">Hospitals</Link></li>
                                <li><Link href="/stores" className="hover:text-gray-200">Pharmacy</Link></li>
                                <li><Link href="/shop" className="hover:text-gray-200">Wellness Products</Link></li>
                                <li><Link href="/blog" className="hover:text-gray-200">Blogs</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Follow Us Section */}
                    <div className="text-center">
                        <h3 className="text-lg font-medium mb-4">Follow Us</h3>
                        <div className="flex justify-center gap-6">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-80 transition-opacity"
                                aria-label="Instagram"
                            >
                                <Image src="/icons/instagram.svg" alt="Instagram" width={32} height={32} />
                            </a>

                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-80 transition-opacity"
                                aria-label="Twitter"
                            >
                                <Image src="/icons/twitter.svg" alt="Twitter" width={32} height={32} />
                            </a>

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-80 transition-opacity"
                                aria-label="Facebook"
                            >
                                <Image src="/icons/facebook.svg" alt="Facebook" width={32} height={32} />
                            </a>
                        </div>
                    </div>

                    {/* Logo & Description Section */}
                    <div className="flex flex-col items-center text-center max-w-xs">
                        <div className="mb-4">
                            <Image src="/footerlogo.png" alt="Logo" width={100} height={100} className="w-24 h-auto" />
                        </div>

                        <h2 className="text-3xl font-bold mb-3">Healthezy</h2>

                        <p className="text-xs leading-relaxed opacity-90">
                            Healthezy - One-stop healthcare platform making doctor availability, clinics, labs, and pharmacies accessible in real time for Tier-2/3 India. Prevention, Care, Cure - All in one place.
                        </p>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()} Healthezy. All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}
