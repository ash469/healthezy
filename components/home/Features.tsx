import Image from 'next/image';
import Link from 'next/link';

const Features = () => {
    const features = [
        {
            title: "Find Trusted Doctors",
            desc: "Search by specialty, clinic, ratings, and availability near your location.",
            image: "/home/doctor2.png"
        },
        {
            title: "Book Lab Tests",
            desc: "Access top-rated labs and book blood tests or X-rays with ease.",
            image: "/home/lab2.png"
        },
        {
            title: "Chat with Pharmacies",
            desc: "Check medicine availability in real-time and upload prescriptions securely.",
            image: "/home/pharmacy2.png"
        },
        {
            title: "Shop Healthy Products",
            desc: "Buy organic food, fitness items, and preventive health devices online.",
            image: "/home/store2.png"
        },
    ];

    return (
        <section className="container mx-auto px-4 pt-0 pb-20">
            <h2 className="text-lg md:text-2xl font-bold text-center text-[#005f6b] mb-6 md:mb-12 whitespace-nowrap overflow-hidden text-ellipsis">
                What You Can Do with Healthezy
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-2 md:gap-6">
                {features.map((feature, idx) => (
                    <div key={idx} className="text-center group flex flex-col items-center h-full">
                        <div className="mb-1 relative w-20 h-20 md:w-28 md:h-28 transform group-hover:scale-110 transition-transform duration-300">
                            <Image
                                src={feature.image}
                                alt={feature.title}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <h3 className="text-m md:text-xl font-bold text-gray-800 mb-2 min-h-[2.5rem] md:min-h-[3.5rem] flex items-end justify-center w-full leading-tight">
                            {feature.title}
                        </h3>
                        <p className="text-sm md:text-m text-gray-500 w-full max-w-[150px] md:max-w-[200px]  line-clamp-3">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
