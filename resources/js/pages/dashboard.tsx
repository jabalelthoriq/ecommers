import EcommerceLayout from '@/layouts/ecommerce-layout';
import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Heart, Package, ShoppingCart } from 'lucide-react';


export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;

    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    return (
        <EcommerceLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Welcome Section with Gradient */}
                    <div className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-lg">
                        <h1 className="mb-2 text-3xl font-bold">Welcome back, {auth.user.name}!</h1>
                        <p className="text-indigo-100">
                            Manage your orders, wishlist, and shopping cart all in one place.
                        </p>
                    </div>

                    {/* Quick Action Cards */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* My Orders */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
                                    <Package className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </div>
                            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                                My Orders
                            </h3>
                            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                Track, return, or buy things again
                            </p>
                            <Link
                                href="/buyer/orders"
                                className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                                View Orders <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>

                        {/* My Wishlist */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
                                    <Heart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                                My Wishlist
                            </h3>
                            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                View your saved items
                            </p>
                            <Link
                                href="/buyer/wishlist"
                                className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                            >
                                View Wishlist <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>

                        {/* My Cart */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
                                    <ShoppingCart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                                My Cart
                            </h3>
                            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                Checkout your current items
                            </p>
                            <Link
                                href="/buyer/cart"
                                className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Go to Cart <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    );
}
