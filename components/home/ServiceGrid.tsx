import Image from 'next/image';
import Link from 'next/link';

const ServiceGrid = () => {
    const services = [
        {
            title: 'Book a Doctor',
            image: '/home/doctor.png',
            link: '/doctors',
            color: 'bg-cyan-600',
        },
        {
            title: 'Book a Lab Test',
            image: '/home/lab.png',
            link: '/labs',
            color: 'bg-teal-600',
        },
        {
            title: 'Medical Stores',
            image: '/home/store.png',
            link: '/pharmacy',
            color: 'bg-emerald-600',
        },
        {
            title: 'Hospitals & Nursing Homes',
            image: '/home/hospital.png',
            link: '/hospital',
            color: 'bg-cyan-700',
        },
    ];

    return (
        <section className="w-full px-4 md:px-8">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {services.map((service, index) => (
                    <Link href={service.link} key={index} className="group relative overflow-hidden rounded-[2rem] h-64 md:h-80 shadow-lg hover:shadow-2xl transition-all duration-300">
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>

                        <div className="absolute inset-0 p-8 flex flex-col justify-end items-end">
                            <div className={`px-6 py-3 rounded-full text-white font-bold text-base md:text-lg shadow-lg backdrop-blur-sm ${service.color}`}>
                                {service.title}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ServiceGrid;
