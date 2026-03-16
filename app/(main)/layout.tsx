import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import RegisterServiceWorker from "@/components/RegisterServiceWorker";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <RegisterServiceWorker />
            <Navbar />
            <main className="min-h-screen pt-20">
                {children}
            </main>
            <Footer />
        </AuthProvider>
    );
}
