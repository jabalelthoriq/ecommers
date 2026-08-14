import React from 'react';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Link } from '@inertiajs/react';
import { Package, ChevronRight, Clock, CheckCircle } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';



export default function Index({ orders = [] }: { orders?: any[] }) {
    const pastOrders = orders || [];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'delivered':
                return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 shadow-sm"><CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Delivered</span>;
            case 'processing':
                return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 shadow-sm"><Clock className="w-3.5 h-3.5 mr-1.5" /> Processing</span>;
            case 'shipped':
                return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 shadow-sm"><Package className="w-3.5 h-3.5 mr-1.5" /> Shipped</span>;
            default:
                return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 shadow-sm">{status}</span>;
        }
    };

    return (
        <EcommerceLayout title="My Orders">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">My Orders</h1>
                
                {pastOrders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100 animate-slide-in-right">
                        <Package className="mx-auto h-16 w-16 text-indigo-200 mb-4 animate-float" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-500 mb-6">When you place an order, it will appear here.</p>
                        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <ul className="divide-y divide-gray-200">
                            {pastOrders.map((order, idx) => (
                                <li key={order.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                                    <Link href={`/buyer/orders/${order.id}`} className="block hover:bg-indigo-50 transition-all duration-300 group">
                                        <div className="px-4 py-6 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <span className="font-semibold text-gray-900">
                                                        {order.order_number}
                                                    </span>
                                                    <span className="mx-2 text-gray-300">•</span>
                                                    <p className="text-sm text-gray-500">
                                                        {order.date}
                                                    </p>
                                                </div>
                                                <div className="ml-2 flex-shrink-0 flex">
                                                    {getStatusBadge(order.status)}
                                                </div>
                                            </div>
                                            <div className="mt-4 sm:flex sm:justify-between">
                                                <div className="sm:flex">
                                                    <p className="flex items-center text-sm text-gray-500">
                                                        {order.items} {order.items === 1 ? 'item' : 'items'}
                                                    </p>
                                                    <span className="hidden sm:block mx-2 text-gray-300">•</span>
                                                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                        Total: <span className="ml-1 font-bold text-gray-900">{formatRupiah(order.total)}</span>
                                                    </p>
                                                </div>
                                                <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 sm:mt-0 group-hover:text-indigo-800 transition-colors">
                                                    View details
                                                    <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </EcommerceLayout>
    );
}
