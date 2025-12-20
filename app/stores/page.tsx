import Link from 'next/link';

export default function StoresPage() {
    const stores = [
        {
            id: 1,
            name: "HealthPlus Pharmacy",
            location: "Main Street, Downtown",
            rating: 4.8,
            reviews: 567,
            deliveryTime: "30 mins",
            minimumOrder: "$10",
            discount: "20% OFF",
            image: "💊"
        },
        {
            id: 2,
            name: "MediCare Store",
            location: "Park Avenue, East Side",
            rating: 4.9,
            reviews: 689,
            deliveryTime: "45 mins",
            minimumOrder: "$15",
            discount: "15% OFF",
            image: "💊"
        },
        {
            id: 3,
            name: "Wellness Pharmacy",
            location: "Oak Street, Central",
            rating: 4.7,
            reviews: 423,
            deliveryTime: "25 mins",
            minimumOrder: "$12",
            discount: "10% OFF",
            image: "💊"
        },
        {
            id: 4,
            name: "QuickMeds Pharmacy",
            location: "Elm Road, West District",
            rating: 4.8,
            reviews: 512,
            deliveryTime: "20 mins",
            minimumOrder: "$8",
            discount: "25% OFF",
            image: "💊"
        },
        {
            id: 5,
            name: "CityHealth Store",
            location: "Maple Lane, North",
            rating: 4.9,
            reviews: 734,
            deliveryTime: "35 mins",
            minimumOrder: "$10",
            discount: "15% OFF",
            image: "💊"
        },
        {
            id: 6,
            name: "MedExpress Pharmacy",
            location: "Pine Street, South",
            rating: 4.6,
            reviews: 398,
            deliveryTime: "40 mins",
            minimumOrder: "$15",
            discount: "10% OFF",
            image: "💊"
        }
    ];

    const categories = [
        { name: "Prescription Medicines", icon: "💊" },
        { name: "OTC Medicines", icon: "🏥" },
        { name: "Health Supplements", icon: "💪" },
        { name: "Personal Care", icon: "🧴" },
        { name: "Baby Care", icon: "👶" },
        { name: "First Aid", icon: "🩹" }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-green-500 to-teal-500 py-20">
                <div className="container">
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
                        Medical Stores
                    </h1>
                    <p className="text-xl text-white/90 text-center max-w-2xl mx-auto mb-8">
                        Order medicines and healthcare products with fast and reliable delivery
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto glass rounded-2xl p-2">
                        <div className="flex flex-col md:flex-row gap-2">
                            <input
                                type="text"
                                placeholder="Search for medicines or healthcare products..."
                                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none"
                            />
                            <button className="btn btn-success whitespace-nowrap">
                                Search Products
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="section bg-white">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="card text-center cursor-pointer group fade-in"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
                                <h3 className="text-sm font-semibold">{category.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stores Grid */}
            <div className="section">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-8">Nearby Stores</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stores.map((store, index) => (
                            <div
                                key={store.id}
                                className="card fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {store.discount && (
                                    <div className="badge badge-success mb-3">{store.discount}</div>
                                )}

                                <div className="flex items-start gap-4 mb-4">
                                    <div className="text-6xl">{store.image}</div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-1">{store.name}</h3>
                                        <p className="text-gray-600 text-sm flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            {store.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-1">
                                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-semibold">{store.rating}</span>
                                    </div>
                                    <span className="text-gray-600 text-sm">({store.reviews} reviews)</span>
                                </div>

                                <div className="space-y-2 mb-4 pb-4 border-b">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Delivery Time</span>
                                        <span className="font-semibold text-green-600">{store.deliveryTime}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Minimum Order</span>
                                        <span className="font-semibold">{store.minimumOrder}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        href={`/stores/${store.id}/purchase`}
                                        className="btn btn-success flex-1"
                                    >
                                        Order Now
                                    </Link>
                                    <Link
                                        href={`/stores/${store.id}/chat`}
                                        className="btn btn-outline"
                                        title="Chat with pharmacist"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="section bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Genuine Products</h3>
                            <p className="text-gray-600">100% authentic medicines from verified sources</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
                            <p className="text-gray-600">Quick delivery to your doorstep in under an hour</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Expert Support</h3>
                            <p className="text-gray-600">Chat with pharmacists for medication guidance</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
