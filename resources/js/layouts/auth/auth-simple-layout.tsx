import { Link } from '@inertiajs/react';
import { useEffect, type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    // Force light mode on auth pages so they look clean
    useEffect(() => {
        document.documentElement.classList.remove('dark');
    }, []);

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* LEFT SIDE - Hidden on mobile, visible on lg */}
            <div className="hidden lg:flex lg:w-1/2 h-full flex-col justify-between bg-gradient-to-br from-indigo-600 to-purple-600 p-12 text-white relative overflow-hidden">
                {/* Decorative floating circles */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <Link href={route('home')} className="inline-block">
                        <span className="text-3xl font-bold tracking-tight text-white">
                            NovaTrend
                        </span>
                    </Link>
                </div>
                
                <div className="relative z-10 mb-10">
                    <h2 className="text-4xl font-bold mb-4">Temukan Gaya Terbaikmu</h2>
                    <p className="text-lg text-indigo-100 max-w-md">
                        Platform e-commerce premium untuk kebutuhan fashion dan gaya hidup modern Anda. Bergabunglah dengan ribuan pengguna lainnya.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE - Form Area */}
            <div className="w-full lg:w-1/2 h-full overflow-y-auto flex flex-col items-center justify-center p-6 md:p-12 animate-in fade-in duration-700">
                <div className="w-full max-w-md py-8">
                    {/* Mobile Header - Visible only on small screens */}
                    <div className="lg:hidden flex flex-col items-center mb-8 gap-2">
                        <Link href={route('home')}>
                            <span className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                NovaTrend
                            </span>
                        </Link>
                    </div>

                    <div className="space-y-2 mb-8 text-center lg:text-left">
                        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                        <p className="text-muted-foreground">{description}</p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
