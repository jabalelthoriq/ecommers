import React from 'react';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import { useForm, Link } from '@inertiajs/react';
import { CreditCard, Truck, AlertCircle } from 'lucide-react';

const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
};

export default function Checkout({ cartItems = [] }: { cartItems?: any[] }) {
    const items = cartItems || [];
    
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingCost = 150000;
    const total = subtotal + shippingCost;

    const { data, setData, post, processing, errors } = useForm({
        shipping_name: '',
        shipping_phone: '',
        shipping_address: '',
        payment_method: 'transfer' // default to transfer
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/buyer/checkout');
    };

    return (
        <EcommerceLayout title="Checkout">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Checkout</h1>
                
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    <div className="lg:col-span-7">
                        <form onSubmit={submit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 animate-slide-in-right hover:shadow-xl transition-shadow">
                            <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
                                <Truck className="mr-2 h-5 w-5 text-indigo-500" />
                                Shipping Information
                            </h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="shipping_name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        id="shipping_name"
                                        name="shipping_name"
                                        value={data.shipping_name}
                                        onChange={e => setData('shipping_name', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all hover:border-indigo-300"
                                        placeholder="Jane Doe"
                                    />
                                    {errors.shipping_name && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center animate-fade-in-up">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            {errors.shipping_name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="shipping_phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="shipping_phone"
                                        name="shipping_phone"
                                        value={data.shipping_phone}
                                        onChange={e => setData('shipping_phone', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all hover:border-indigo-300"
                                        placeholder="+62 (812) 123-4567"
                                    />
                                    {errors.shipping_phone && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center animate-fade-in-up">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            {errors.shipping_phone}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="shipping_address" className="block text-sm font-medium text-gray-700">Complete Address</label>
                                    <textarea
                                        id="shipping_address"
                                        name="shipping_address"
                                        rows={3}
                                        value={data.shipping_address}
                                        onChange={e => setData('shipping_address', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all hover:border-indigo-300"
                                        placeholder="123 Street Name, City, Country, Zip Code"
                                    />
                                    {errors.shipping_address && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center animate-fade-in-up">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            {errors.shipping_address}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <hr className="my-8 border-gray-200" />

                            <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
                                <CreditCard className="mr-2 h-5 w-5 text-indigo-500" />
                                Payment Method
                            </h2>

                            <div className="space-y-4">
                                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${data.payment_method === 'transfer' ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' : 'border-gray-200 hover:border-indigo-300'}`}>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="transfer"
                                        checked={data.payment_method === 'transfer'}
                                        onChange={e => setData('payment_method', e.target.value)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 transition-colors"
                                    />
                                    <div className="ml-3">
                                        <span className={`block text-sm font-medium ${data.payment_method === 'transfer' ? 'text-indigo-900' : 'text-gray-900'}`}>Bank Transfer</span>
                                        <span className={`block text-sm ${data.payment_method === 'transfer' ? 'text-indigo-700' : 'text-gray-500'}`}>Transfer directly to our bank account</span>
                                    </div>
                                </label>

                                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${data.payment_method === 'cod' ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' : 'border-gray-200 hover:border-indigo-300'}`}>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="cod"
                                        checked={data.payment_method === 'cod'}
                                        onChange={e => setData('payment_method', e.target.value)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 transition-colors"
                                    />
                                    <div className="ml-3">
                                        <span className={`block text-sm font-medium ${data.payment_method === 'cod' ? 'text-indigo-900' : 'text-gray-900'}`}>Cash on Delivery (COD)</span>
                                        <span className={`block text-sm ${data.payment_method === 'cod' ? 'text-indigo-700' : 'text-gray-500'}`}>Pay when you receive your order</span>
                                    </div>
                                </label>
                                {errors.payment_method && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center animate-fade-in-up">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        {errors.payment_method}
                                    </p>
                                )}
                            </div>

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${processing ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-lg animate-pulse-glow'}`}
                                >
                                    {processing ? 'Processing...' : 'Place Order'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-16 bg-white rounded-2xl px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 border border-gray-100 shadow-lg sticky top-8 animate-fade-in-up delay-100">
                        <h2 className="text-lg font-medium text-gray-900 mb-6 relative inline-block">
                            Order Summary
                            <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-indigo-500 rounded-full"></span>
                        </h2>
                        
                        <div className="flow-root">
                            <ul className="-my-4 divide-y divide-gray-200">
                                {items.map((item) => (
                                    <li key={item.id} className="flex items-center py-4 hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="ml-4 flex-shrink-0 text-sm font-bold text-gray-900">
                                            {formatRupiah(item.price * item.quantity)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <dl className="mt-6 border-t border-gray-200 pt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">{formatRupiah(subtotal)}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Shipping</dt>
                                <dd className="text-sm font-medium text-indigo-600">{formatRupiah(shippingCost)}</dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex items-center justify-between bg-gray-50 -mx-8 px-8 py-4 mt-4 rounded-b-2xl">
                                <dt className="text-base font-medium text-gray-900">Total</dt>
                                <dd className="text-xl font-bold text-indigo-700">{formatRupiah(total)}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    );
}
