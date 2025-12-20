import Link from 'next/link';

export default function ShopPage() {
    const products = [
        {
            id: 1,
            name: "Premium Multivitamin Tablets",
            category: "Supplements",
            price: "$29.99",
            originalPrice: "$39.99",
            rating: 4.8,
            reviews: 234,
            inStock: true,
            image: "💊"
        },
        {
            id: 2,
            name: "Digital Blood Pressure Monitor",
            category: "Medical Devices",
            price: "$49.99",
            originalPrice: "$69.99",
            rating: 4.9,
            reviews: 456,
            inStock: true,
            image: "🩺"
        },
        {
            id: 3,
            name: "Protein Powder (2kg)",
            category: "Nutrition",
            price: "$59.99",
            originalPrice: "$79.99",
            rating: 4.7,
            reviews: 567,
            inStock: true,
            image: "🥤"
        },
        {
            id: 4,
            name: "Fitness Tracker Watch",
            category: "Wearables",
            price: "$89.99",
            originalPrice: "$129.99",
            rating: 4.8,
            reviews: 789,
            inStock: false,
            image: "⌚"
        },
        {
            id: 5,
            name: "Yoga Mat Premium",
            category: "Fitness",
            price: "$34.99",
            originalPrice: "$49.99",
            rating: 4.6,
            reviews: 345,
            inStock: true,
            image: "🧘"
        },
        {
            id: 6,
            name: "Omega-3 Fish Oil Capsules",
            category: "Supplements",
            price: "$24.99",
            originalPrice: "$34.99",
            rating: 4.9,
            reviews: 678,
            inStock: true,
            image: "🐟"
        },
        {
            id: 7,
            name: "Infrared Thermometer",
            category: "Medical Devices",
            price: "$39.99",
            originalPrice: "$54.99",
            rating: 4.7,
            reviews: 423,
            inStock: true,
            image: "🌡️"
        },
        {
            id: 8,
            name: "Resistance Bands Set",
            category: "Fitness",
            price: "$19.99",
            originalPrice: "$29.99",
            rating: 4.8,
            reviews: 512,
            inStock: true,
            image: "💪"
        },
        {
            id: 9,
            name: "Pulse Oximeter",
            category: "Medical Devices",
            price: "$29.99",
            originalPrice: "$44.99",
            rating: 4.9,
            reviews: 634,
            inStock: true,
            image: "📊"
        }
    ];

    const categories = [
        "All Products",
        "Supplements",
        "Medical Devices",
        "Nutrition",
        "Fitness",
        "Wearables"
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="gradient-warm py-20">
                <div className="container">
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
                        Health & Wellness Shop
                    </h1>
                    <p className="text-xl text-white/90 text-center max-w-2xl mx-auto mb-8">
                        Premium health products, supplements, and fitness equipment delivered to your door
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto glass rounded-2xl p-2">
                        <div className="flex flex-col md:flex-row gap-2">
                            <input
                                type="text"
                                placeholder="Search for health products..."
                                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none"
                            />
                            <button className="btn bg-white text-orange-600 hover:bg-gray-100 whitespace-nowrap">
                                Search Products
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Filter */}
            <div className="section bg-white">
                <div className="container">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className={`badge cursor-pointer text-base px-5 py-2 ${index === 0 ? 'badge-info' : 'bg-gray-200 text-gray-700'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="section">
                <div className="container">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold">Featured Products</h2>
                        <select className="input w-auto">
                            <option>Sort by: Popularity</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Rating</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className="card fade-in group"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">{product.image}</div>

                                <div className="mb-2">
                                    <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>
                                </div>

                                <h3 className="text-lg font-bold mb-2 min-h-[3rem]">{product.name}</h3>

                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-semibold text-sm">{product.rating}</span>
                                    </div>
                                    <span className="text-gray-600 text-xs">({product.reviews})</span>
                                </div>

                                <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-2xl font-bold text-green-600">{product.price}</span>
                                    <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                                </div>

                                <div className="mb-4">
                                    {product.inStock ? (
                                        <span className="badge badge-success text-xs">In Stock</span>
                                    ) : (
                                        <span className="badge badge-warning text-xs">Out of Stock</span>
                                    )}
                                </div>

                                <Link
                                    href={`/shop/${product.id}`}
                                    className={`btn w-full ${product.inStock ? 'btn-primary' : 'btn-outline opacity-50 cursor-not-allowed'}`}
                                >
                                    {product.inStock ? 'Add to Cart' : 'Notify Me'}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="section bg-white">
                <div className="container">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Shop With Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                            <h3 className="font-bold mb-2">Certified Products</h3>
                            <p className="text-gray-600 text-sm">All products are certified and tested</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="font-bold mb-2">Free Shipping</h3>
                            <p className="text-gray-600 text-sm">On orders above $50</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                </svg>
                            </div>
                            <h3 className="font-bold mb-2">Easy Returns</h3>
                            <p className="text-gray-600 text-sm">30-day return policy</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold mb-2">24/7 Support</h3>
                            <p className="text-gray-600 text-sm">We're here to help anytime</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
