import Link from 'next/link';

export default function LabsPage() {
    const labs = [
        {
            id: 1,
            name: "HealthCare Diagnostics",
            location: "Downtown Medical Center",
            rating: 4.8,
            reviews: 456,
            tests: 250,
            homeCollection: true,
            turnaroundTime: "24 hours",
            image: "🏥"
        },
        {
            id: 2,
            name: "PathLab Solutions",
            location: "East Side Health District",
            rating: 4.9,
            reviews: 523,
            tests: 320,
            homeCollection: true,
            turnaroundTime: "12 hours",
            image: "🏥"
        },
        {
            id: 3,
            name: "MediTest Laboratory",
            location: "Central Medical Plaza",
            rating: 4.7,
            reviews: 389,
            tests: 200,
            homeCollection: false,
            turnaroundTime: "48 hours",
            image: "🏥"
        },
        {
            id: 4,
            name: "QuickDiagnostics Center",
            location: "West Medical Zone",
            rating: 4.8,
            reviews: 412,
            tests: 180,
            homeCollection: true,
            turnaroundTime: "6 hours",
            image: "🏥"
        },
        {
            id: 5,
            name: "Advanced Lab Services",
            location: "North Healthcare Hub",
            rating: 4.9,
            reviews: 578,
            tests: 350,
            homeCollection: true,
            turnaroundTime: "24 hours",
            image: "🏥"
        },
        {
            id: 6,
            name: "Precision Pathology",
            location: "South Medical District",
            rating: 4.6,
            reviews: 298,
            tests: 150,
            homeCollection: false,
            turnaroundTime: "36 hours",
            image: "🏥"
        }
    ];

    const popularTests = [
        { name: "Complete Blood Count (CBC)", price: "$25" },
        { name: "Lipid Profile", price: "$35" },
        { name: "Thyroid Function Test", price: "$45" },
        { name: "Diabetes Screening (HbA1c)", price: "$30" },
        { name: "Liver Function Test", price: "$40" },
        { name: "Kidney Function Test", price: "$38" }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="gradient-secondary py-20">
                <div className="container">
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
                        Book Lab Tests
                    </h1>
                    <p className="text-xl text-white/90 text-center max-w-2xl mx-auto mb-8">
                        Get accurate diagnostic tests from certified laboratories with home sample collection
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto glass rounded-2xl p-2">
                        <div className="flex flex-col md:flex-row gap-2">
                            <input
                                type="text"
                                placeholder="Search for tests or lab centers..."
                                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none"
                            />
                            <button className="btn btn-primary whitespace-nowrap">
                                Search Tests
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Tests */}
            <div className="section bg-white">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-8 text-center">Popular Tests</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {popularTests.map((test, index) => (
                            <div
                                key={index}
                                className="card flex items-center justify-between fade-in"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div>
                                    <h3 className="font-semibold mb-1">{test.name}</h3>
                                    <p className="text-2xl font-bold text-purple-600">{test.price}</p>
                                </div>
                                <button className="btn btn-outline btn-sm">Book Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Labs Grid */}
            <div className="section">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-8">Certified Laboratories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {labs.map((lab, index) => (
                            <div
                                key={lab.id}
                                className="card fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="text-6xl">{lab.image}</div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-1">{lab.name}</h3>
                                        <p className="text-gray-600 text-sm flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            {lab.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-1">
                                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-semibold">{lab.rating}</span>
                                    </div>
                                    <span className="text-gray-600 text-sm">({lab.reviews} reviews)</span>
                                </div>

                                <div className="space-y-2 mb-4 pb-4 border-b">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Available Tests</span>
                                        <span className="font-semibold">{lab.tests}+ tests</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Turnaround Time</span>
                                        <span className="font-semibold">{lab.turnaroundTime}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Home Collection</span>
                                        {lab.homeCollection ? (
                                            <span className="badge badge-success">Available</span>
                                        ) : (
                                            <span className="badge badge-warning">Not Available</span>
                                        )}
                                    </div>
                                </div>

                                <Link
                                    href={`/labs/${lab.id}/booking`}
                                    className="btn btn-primary w-full"
                                >
                                    Book Tests
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
