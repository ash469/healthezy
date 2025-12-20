
"use client";

import { useState } from 'react';
import Image from 'next/image';
import ChatBot from './ChatBot';


const PromoBanner = () => {
    const [showChat, setShowChat] = useState(false);

    return (
        <>
            {showChat && <ChatBot onClose={() => setShowChat(false)} />}

            <section className="w-full px-1">
                <div className="flex flex-row items-center justify-center gap-2 md:gap-6">
                    <div className="relative w-34 h-34 md:w-72 md:h-72 flex-shrink-0 animate-bounce-slow">
                        <Image
                            src="/home/chatBot.png"
                            alt="AI Assistant"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div className="w-full md:w-auto text-center md:text-left">
                        <button
                            onClick={() => setShowChat(true)}
                            suppressHydrationWarning
                            className="bg-gradient-to-r from-[#009ca6] to-[#0D5C63] hover:from-[#00858e] hover:to-[#084248] text-white text-sm md:text-2xl font-bold py-3 px-4 md:py-4 md:px-12 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 border-2 border-white/20 whitespace-nowrap"
                        >
                            How Are You Feeling Today ?
                        </button>
                        <div className="flex items-center justify-center md:justify-start gap-2 mt-2 md:mt-3 opacity-80">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <p className="text-xs md:text-sm font-medium text-[#005f6b]">
                                Chat with our AI Assistant
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PromoBanner;
