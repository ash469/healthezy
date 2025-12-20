import React from 'react';
import Link from 'next/link';
import { getAllBlogPosts } from './data';

export default async function BlogPage() {
    const blogPosts = await getAllBlogPosts();


    return (
        <div className="min-h-screen bg-white py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-[#0F766E] mb-2">Blogs</h1>
                    <p className="text-lg text-gray-600 font-medium">Health & Wellness Insights</p>
                </div>

                {/* Blog List */}
                <div className="space-y-12">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="group flex flex-col md:flex-row gap-8 items-start">
                            {/* Image */}
                            <div className="w-full md:w-[320px] shrink-0">
                                <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 py-1">
                                <h2 className="text-[22px] font-bold text-[#0F766E] mb-3 leading-tight group-hover:text-[#0D9488] transition-colors">{post.title}</h2>
                                <p className="text-gray-600 mb-6 leading-relaxed text-[15px]">{post.excerpt}</p>
                                <Link href={`/blog/${post.id}`} className="inline-block bg-[#0F766E] hover:bg-[#0D9488] text-white px-6 py-2.5 rounded-md text-sm font-semibold transition-colors shadow-sm">
                                    Read More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
