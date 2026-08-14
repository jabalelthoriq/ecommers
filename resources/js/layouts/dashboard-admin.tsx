import React from 'react';
import { Head } from '@inertiajs/react';
import Footer from '@/components/ecommerce/footer';
import Sidebar from '@/components/ecommerce/sidebar';
import GlobalToast from '@/components/global-toast';

interface EcommerceLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function EcommerceLayout({
    children,
    title,
}: EcommerceLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <GlobalToast />

            {title && <Head title={title} />}

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="min-h-screen pl-[124px] pr-5">
                <main className="min-h-screen w-full pt-5">
                    {children}
                </main>

            </div>
        </div>
    );
}