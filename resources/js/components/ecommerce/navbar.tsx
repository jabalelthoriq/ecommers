import { Link, usePage } from '@inertiajs/react';
import { ShoppingCart, Menu, X, User, Search, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PageProps } from '@/types';

export default function Navbar() {
    const { auth } = usePage<PageProps>().props;
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/80 backdrop-blur-md shadow-sm py-2'
                    : 'bg-white py-3'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">N</span>
                            </div>
                            <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
                                NovaTrend
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Icons and Auth */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="text-gray-600 hover:text-blue-600 transition-colors">
                            <Search className="h-4 w-4" />
                        </button>
                        <Link href="/buyer/wishlist" className="relative text-gray-600 hover:text-blue-600 transition-colors">
                            <Heart className="h-4 w-4" />
                        </Link>
                        
                        <Link href="/buyer/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors">
                            <ShoppingCart className="h-4 w-4" />
                        </Link>

                        <div className="h-6 w-px bg-gray-200"></div>

                        {auth.user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors focus:outline-none"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                                        <User className="h-4 w-4 text-gray-500" />
                                    </div>
                                    <span className="font-medium text-sm hidden lg:block">{auth.user.name}</span>
                                </button>
                                
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 ring-1 ring-black ring-opacity-5">
                                        <Link
                                            href={auth.roles?.includes('penjual') ? '/seller/dashboard' : '/dashboard'}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            Log Out
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/login"
                                    className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-violet-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-violet-600 transition-colors shadow-sm"
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <Link href="/buyer/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors">
                            <ShoppingCart className="h-5 w-5" />
                        </Link>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-600 hover:text-blue-600 focus:outline-none"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        
                        <div className="border-t border-gray-100 my-4 pt-4">
                            {auth.user ? (
                                <div className="space-y-1">
                                    <div className="px-3 py-2 flex items-center space-x-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                            <User className="h-5 w-5 text-gray-500" />
                                        </div>
                                        <div>
                                            <div className="text-base font-medium text-gray-800">{auth.user.name}</div>
                                            <div className="text-sm font-medium text-gray-500">{auth.user.email}</div>
                                        </div>
                                    </div>
                                    <Link
                                        href={auth.roles?.includes('penjual') ? '/seller/dashboard' : '/dashboard'}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                                    >
                                        Log Out
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4 px-3">
                                    <Link
                                        href="/login"
                                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gray-900 hover:bg-gray-800"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
