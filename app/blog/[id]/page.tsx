import React from 'react';
import { getBlogPost } from '../data';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function BlogPostPage(props: Props) {
    const params = await props.params;
    const post = await getBlogPost(params.id);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section: Title & Icons */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#0F766E] leading-tight flex-1">
                        {post.title}
                    </h1>

                    {/* Action Icons */}
                    <div className="flex items-center gap-3 text-[#0F766E] shrink-0 pt-1">
                        <button className="hover:bg-teal-50 p-2 rounded-full transition-colors" aria-label="Bookmark">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                            </svg>
                        </button>
                        <button className="hover:bg-teal-50 p-2 rounded-full transition-colors" aria-label="Like">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 10v12" />
                                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content Layout: Image Left, Text Right, then Wraps */}
                <div className="space-y-6 text-gray-800 leading-relaxed text-lg">
                    {/* Top Loop: Image + First Paragraph */}
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="w-full lg:w-[45%] shrink-0">
                            <div className="rounded-xl overflow-hidden shadow-sm aspect-[4/3] bg-gray-100">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex-1 pt-1">
                            <div dangerouslySetInnerHTML={{ __html: post.content.split('</p>')[0] + '</p>' }} />
                        </div>
                    </div>

                    {/* Remaining Content */}
                    <div
                        className="prose prose-lg max-w-none text-gray-800"
                        dangerouslySetInnerHTML={{ __html: post.content.split('</p>').slice(1).join('</p>') }}
                    />
                </div>

            </div>
        </div>
    );
}
