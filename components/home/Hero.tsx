import Image from 'next/image';
import './Hero.css';

const Hero = () => {
    return (
        <section className="w-full pt-0 px-4 md:px-8 py-6 md:py-10">
            <div className="hero-gradient-container shadow-2xl">
                <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-white/10 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl opacity-30"></div>

                <div className="hero-grid">
                    <div className="col-span-5 flex flex-col justify-center space-y-2 md:space-y-8 relative z-20">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-3xl p-2 md:p-6 border border-white/10 shadow-lg max-w-sm w-full md:w-auto">
                            <h3 className="text-[10px] md:text-xl font-bold text-white text-center mb-2 md:mb-4">Request a Call</h3>
                            <form className="space-y-2 md:space-y-4">
                                <input
                                    suppressHydrationWarning
                                    type="text"
                                    placeholder="Name"
                                    className="w-full h-6 md:h-10 px-2 md:px-4 rounded bg-white text-gray-800 placeholder-gray-400 text-[8px] md:text-base focus:outline-none focus:ring-1 md:focus:ring-2 focus:ring-[#00A3B1]"
                                />
                                <input
                                    suppressHydrationWarning
                                    type="tel"
                                    placeholder="Phone No."
                                    className="w-full h-6 md:h-10 px-2 md:px-4 rounded bg-white text-gray-800 placeholder-gray-400 text-[8px] md:text-base focus:outline-none focus:ring-1 md:focus:ring-2 focus:ring-[#00A3B1]"
                                />
                                <div className="flex justify-center">
                                    <button suppressHydrationWarning className="bg-[#0D5C63] hover:bg-[#084248] text-white text-[8px] md:text-sm font-bold py-1 px-3 md:py-2 md:px-6 rounded shadow-md transition-colors uppercase">
                                        Submit Request
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="know-us-container">
                            <h2 className="know-us-title">Know Us</h2>
                            <p className="know-us-desc">
                                Healthezy brings the entire healthcare ecosystem together on a single digital platform. Users can easily find doctors, schedule appointments, order medicines, access medical reports, manage insurance claims, and explore curated wellness products.
                            </p>
                        </div>
                    </div>
                    <div className="col-span-7 flex flex-col items-end text-white space-y-2 md:space-y-6 md:pr-10 relative z-20 w-full">
                        <h1 className="text-xl md:text-6xl font-bold">Healthezy</h1>

                        <div className="flex flex-col items-end space-y-1 md:space-y-3 text-sm md:text-4xl font-bold">
                            <span className="border-b-2 md:border-b-4 border-white pb-0.5 md:pb-1">Doctors</span>
                            <span>Hospitals</span>
                            <span>Labs</span>
                            <span>Medicine</span>
                        </div>

                        <button suppressHydrationWarning className="mt-1 md:mt-6 bg-[#0D5C63] hover:bg-[#084248] text-white text-[8px] md:text-lg font-medium py-1 px-3 md:py-3 md:px-8 rounded-full shadow-lg transition-transform hover:scale-105 border border-white/20">
                            Book Online
                        </button>
                    </div>
                </div>
                <div className="block absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 hero-image-container md:left-[55%] lg:left-[60%] xl:left-[62%]">
                    <Image
                        src="/home/hero.png"
                        alt="Medical Professional"
                        fill
                        className="object-contain object-bottom"
                        priority
                    />
                </div>

            </div>
        </section >
    );
};

export default Hero;
