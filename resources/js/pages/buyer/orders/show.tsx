import React from 'react';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Check, Truck, Package, CreditCard } from 'lucide-react';

const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
};

export default function Show({ orderDetails }: { orderDetails?: any }) {
    const order = orderDetails;

    if (!order) {
        return (
            <EcommerceLayout title="Order Not Found">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h1>
                    <Link href="/buyer/orders" className="text-indigo-600 hover:text-indigo-500">Return to Orders</Link>
                </div>
            </EcommerceLayout>
        );
    }

    return (
        <EcommerceLayout title={`Order ${order.id}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
                <div className="mb-8">
                    <Link href="/buyer/orders" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors mb-4 group">
                        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                        Back to Orders
                    </Link>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Order {order.id}</h1>
                            <p className="text-sm text-gray-500 mt-1">Placed on {order.date}</p>
                        </div>
                        <button className="inline-flex items-center justify-center px-5 py-2.5 border-2 border-indigo-100 shadow-sm text-sm font-bold rounded-lg text-indigo-700 bg-white hover:bg-indigo-50 hover:border-indigo-200 transition-all hover:-translate-y-0.5">
                            Download Invoice
                        </button>
                    </div>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    <div className="lg:col-span-8 space-y-8">
                        {/* Order Timeline */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-shadow">
                            <h2 className="text-lg font-medium text-gray-900 mb-8 relative inline-block">
                                Order Status
                                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-indigo-500 rounded-full"></span>
                            </h2>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 animate-slide-in-right" style={{ width: '100%' }}></div>
                                    </div>
                                </div>
                                <ul className="relative flex justify-between">
                                    {order.timeline.map((step: any, stepIdx: number) => (
                                        <li key={step.title} className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${stepIdx * 0.15}s` }}>
                                            <div className={`relative flex h-10 w-10 items-center justify-center rounded-full ${step.completed ? 'bg-indigo-600 shadow-md shadow-indigo-200' : 'bg-gray-200'} ring-8 ring-white transition-all duration-500 hover:scale-110`}>
                                                {step.completed ? (
                                                    <Check className="h-5 w-5 text-white" aria-hidden="true" />
                                                ) : (
                                                    <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                                                )}
                                            </div>
                                            <div className="mt-4 hidden sm:block text-center">
                                                <p className={`text-sm font-bold ${step.completed ? 'text-indigo-900' : 'text-gray-500'}`}>{step.title}</p>
                                                <p className="text-xs text-gray-500 mt-1 font-medium">{step.date}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
                                <h2 className="text-lg font-medium text-gray-900">Items Ordered</h2>
                            </div>
                            <ul className="divide-y divide-gray-100">
                                {order.items.map((item: any, idx: number) => (
                                    <li key={item.id} className="p-6 flex items-center sm:items-start hover:bg-gray-50 transition-colors animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                                        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-xl overflow-hidden sm:w-24 sm:h-24 shadow-sm border border-gray-100 group">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-center object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="ml-6 flex-1 flex flex-col justify-center sm:justify-start">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                                <h4 className="text-base font-bold text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer">{item.name}</h4>
                                                <p className="mt-2 sm:mt-0 ml-0 sm:ml-4 text-base font-bold text-indigo-700">{formatRupiah(item.price)}</p>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500 font-medium bg-gray-100 w-fit px-2.5 py-0.5 rounded-full">Qty: {item.quantity}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 lg:mt-0 lg:col-span-4 space-y-8 animate-fade-in-up delay-200">
                        {/* Summary */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-shadow">
                            <h2 className="text-lg font-medium text-gray-900 mb-6 relative inline-block">
                                Order Summary
                                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-indigo-500 rounded-full"></span>
                            </h2>
                            <dl className="space-y-4 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <dt>Subtotal</dt>
                                    <dd className="text-gray-900 font-medium">{formatRupiah(order.subtotal)}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt>Shipping</dt>
                                    <dd className="text-gray-900 font-medium">{formatRupiah(order.shipping)}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt>Tax</dt>
                                    <dd className="text-gray-900 font-medium">{formatRupiah(order.tax)}</dd>
                                </div>
                                <div className="border-t border-gray-100 bg-gray-50 -mx-8 px-8 py-5 mt-6 rounded-b-2xl flex justify-between items-center text-base">
                                    <dt className="font-medium text-gray-900">Total</dt>
                                    <dd className="text-xl font-bold text-indigo-700">{formatRupiah(order.total)}</dd>
                                </div>
                            </dl>
                        </div>

                        {/* Info */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-shadow">
                            <h2 className="text-lg font-medium text-gray-900 mb-6 relative inline-block">
                                Shipping & Payment
                                <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-indigo-500 rounded-full"></span>
                            </h2>
                            
                            <div className="space-y-8">
                                <div className="group">
                                    <h3 className="text-sm font-bold text-gray-900 flex items-center mb-3">
                                        <div className="p-2 bg-indigo-50 rounded-lg mr-3 group-hover:bg-indigo-100 transition-colors">
                                            <Truck className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        Shipping Address
                                    </h3>
                                    <p className="text-sm text-gray-800 font-medium ml-11">{order.shipping_name}</p>
                                    <p className="text-sm text-gray-500 ml-11 mt-1 leading-relaxed">{order.shipping_address}</p>
                                </div>
                                
                                <div className="group">
                                    <h3 className="text-sm font-bold text-gray-900 flex items-center mb-3">
                                        <div className="p-2 bg-indigo-50 rounded-lg mr-3 group-hover:bg-indigo-100 transition-colors">
                                            <CreditCard className="w-4 h-4 text-indigo-600" />
                                        </div>
                                        Payment Method
                                    </h3>
                                    <p className="text-sm text-gray-800 font-medium ml-11">{order.payment_method}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    );
}
