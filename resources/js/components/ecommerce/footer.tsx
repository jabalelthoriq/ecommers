import { Link } from '@inertiajs/react';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white relative overflow-hidden">
            {/* Decorative Gradient Blob */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                E-COMMERCE
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your premium destination for the finest products. Experience seamless shopping with unparalleled customer service and lightning-fast delivery.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { icon: Facebook, href: '#' },
                                { icon: Twitter, href: '#' },
                                { icon: Instagram, href: '#' },
                                { icon: Youtube, href: '#' },
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/25"
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-indigo-500 rounded-full"></span>
                        </h3>
                        <ul className="space-y-4">
                            {['Home', 'Products', 'Categories', 'Deals', 'About Us', 'Contact'].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                                        <span className="w-0 h-0.5 bg-indigo-500 mr-0 transition-all duration-300 group-hover:w-2 group-hover:mr-2"></span>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white relative inline-block">
                            Customer Service
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-purple-500 rounded-full"></span>
                        </h3>
                        <ul className="space-y-4">
                            {['My Account', 'Order History', 'Track Order', 'FAQ', 'Shipping Info', 'Returns'].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                                        <span className="w-0 h-0.5 bg-purple-500 mr-0 transition-all duration-300 group-hover:w-2 group-hover:mr-2"></span>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white relative inline-block">
                            Stay Updated
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-pink-500 rounded-full"></span>
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to our newsletter and get 10% off your first purchase.
                        </p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-gray-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center group shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                            >
                                Subscribe
                                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm text-gray-500">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
