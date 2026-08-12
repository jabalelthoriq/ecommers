import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/ecommerce/navbar';
import Footer from '@/components/ecommerce/footer';
import GlobalToast from '@/components/global-toast';

interface EcommerceLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function EcommerceLayout({ children, title }: EcommerceLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            <GlobalToast />
            {title && <Head title={title} />}
            <Navbar />
            <main className="flex-grow w-full pt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
}
