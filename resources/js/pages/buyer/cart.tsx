import React from 'react';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Link } from '@inertiajs/react';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartProps {
    cartItems?: CartItem[];
}

const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
};

export default function Cart({ cartItems = [] }: CartProps) {
    const items = cartItems || [];

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <EcommerceLayout title="Shopping Cart">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Shopping Cart</h1>
                
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    <div className="lg:col-span-7">
                        {items.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100 animate-slide-in-right">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                                <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
                                <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all">
                                    Continue Shopping
                                </Link>
                            </div>
                        ) : (
                            <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                                {items.map((item, idx) => (
                                    <li key={item.id} className="flex py-6 sm:py-10 animate-fade-in-up hover:bg-gray-50 transition-colors rounded-xl px-4 group" style={{ animationDelay: `${idx * 0.1}s` }}>
                                        <div className="flex-shrink-0 overflow-hidden rounded-lg">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-24 rounded-lg object-center object-cover sm:w-32 sm:h-32 border border-gray-100 group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm">
                                                            <a href="#" className="font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                                                                {item.name}
                                                            </a>
                                                        </h3>
                                                    </div>
                                                    <p className="mt-1 text-sm font-bold text-gray-900">{formatRupiah(item.price)}</p>
                                                </div>

                                                <div className="mt-4 sm:mt-0 sm:pr-9">
                                                    <div className="flex items-center border border-gray-200 rounded-lg w-fit bg-white">
                                                        <Link 
                                                            href={`/buyer/cart/${item.id}`} 
                                                            method="patch" 
                                                            data={{ quantity: Math.max(1, item.quantity - 1) }}
                                                            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-l-lg transition-colors"
                                                            preserveScroll
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </Link>
                                                        <span className="px-4 py-2 text-sm font-medium text-gray-900 text-center min-w-[3rem]">
                                                            {item.quantity}
                                                        </span>
                                                        <Link 
                                                            href={`/buyer/cart/${item.id}`} 
                                                            method="patch" 
                                                            data={{ quantity: item.quantity + 1 }}
                                                            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-r-lg transition-colors"
                                                            preserveScroll
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </Link>
                                                    </div>
                                                    <div className="absolute top-0 right-0">
                                                        <Link
                                                            href={`/buyer/cart/${item.id}`}
                                                            method="delete"
                                                            className="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                            preserveScroll
                                                        >
                                                            <span className="sr-only">Remove</span>
                                                            <Trash2 className="h-5 w-5" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="mt-4 flex text-sm text-gray-500 space-x-2">
                                                <span>Subtotal: <span className="font-semibold text-gray-900">{formatRupiah(item.price * item.quantity)}</span></span>
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Order summary */}
                    <div className="mt-16 bg-white rounded-2xl px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 border border-gray-100 shadow-lg animate-slide-in-right hover:shadow-xl transition-shadow">
                        <h2 className="text-lg font-medium text-gray-900 mb-6 relative inline-block">
                            Order summary
                            <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-indigo-500 rounded-full"></span>
                        </h2>
                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">{formatRupiah(subtotal)}</dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt className="flex items-center text-sm text-gray-600">
                                    <span>Shipping estimate</span>
                                </dt>
                                <dd className="text-sm font-medium text-indigo-600">Calculated at checkout</dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex items-center justify-between bg-gray-50 -mx-6 px-6 py-4 mt-4 rounded-b-2xl">
                                <dt className="text-base font-medium text-gray-900">Total Estimate</dt>
                                <dd className="text-lg font-bold text-gray-900">{formatRupiah(subtotal)}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <Link
                                href="/buyer/checkout"
                                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all group animate-pulse-glow"
                            >
                                Proceed to Checkout
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    );
}
