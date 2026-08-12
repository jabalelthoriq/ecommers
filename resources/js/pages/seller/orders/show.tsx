import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Clock, Package, CheckCircle, XCircle, User, Calendar, MapPin, Tag } from 'lucide-react';

export default function Show({ order }: { order: any }) {
    // Make sure we have a fallback for order
    const currentOrder = order || { id: '', status: '', items: [], customer_name: '', created_at: '', total_amount: 0 };
    
    const { data, setData, put, processing } = useForm({
        status: currentOrder.status || 'diproses'
    });

    const updateStatus = (newStatus: string) => {
        setData('status', newStatus);
        put(`/seller/orders/${currentOrder.id}`);
    };

    const formatRupiah = (value: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'diproses': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'dikirim': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'selesai': return 'bg-green-100 text-green-800 border-green-200';
            case 'dibatalkan': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'diproses': return <Clock className="w-4 h-4 mr-1.5" />;
            case 'dikirim': return <Package className="w-4 h-4 mr-1.5" />;
            case 'selesai': return <CheckCircle className="w-4 h-4 mr-1.5" />;
            case 'dibatalkan': return <XCircle className="w-4 h-4 mr-1.5" />;
            default: return <Clock className="w-4 h-4 mr-1.5" />;
        }
    };

    const items = currentOrder.items || currentOrder.order_items || [];

    return (
        <EcommerceLayout>
            <Head title={`Order #${currentOrder.order_number || currentOrder.id}`} />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="mb-6 flex flex-col items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <Link href="/seller/orders" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Orders
                        </Link>
                        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 flex items-center gap-3">
                                    Order #{currentOrder.order_number || currentOrder.id}
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${getStatusStyle(data.status)}`}>
                                        {getStatusIcon(data.status)}
                                        <span className="capitalize">{data.status}</span>
                                    </span>
                                </h1>
                                <p className="text-gray-500 text-sm mt-2 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> Placed on {currentOrder.created_at ? new Date(currentOrder.created_at).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' }) : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* Left Column - Order Items */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="border-b border-gray-100 px-6 py-5 bg-gray-50/50">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <Package className="w-5 h-5 text-indigo-500" /> Items Ordered
                                    </h3>
                                </div>
                                <div className="p-0">
                                    {items.length > 0 ? (
                                        <ul className="divide-y divide-gray-100">
                                            {items.map((item: any, i: number) => (
                                                <li key={i} className="p-6 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                                                    <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200 overflow-hidden">
                                                        {item.product?.images?.[0] ? (
                                                            <img src={`/storage/${item.product.images[0].image_path}`} alt={item.product.name} className="h-full w-full object-cover" />
                                                        ) : (
                                                            <Tag className="w-6 h-6 text-gray-400" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-gray-900 text-base">{item.product_name || item.name || item.product?.name || 'Product'}</h4>
                                                        <p className="text-sm text-gray-500 mt-1">Quantity: <span className="font-semibold text-gray-700">{item.quantity || item.qty}</span></p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-indigo-600 text-lg">{formatRupiah(item.price)}</p>
                                                        {item.quantity > 1 && (
                                                            <p className="text-xs text-gray-500 mt-1">Total: {formatRupiah(item.price * (item.quantity || item.qty))}</p>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="p-12 text-center text-gray-500">
                                            <Tag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                            <p>No items found for this order.</p>
                                        </div>
                                    )}
                                </div>
                                <div className="bg-gray-50 border-t border-gray-100 p-6">
                                    <div className="flex justify-between items-center text-xl">
                                        <span className="font-bold text-gray-900">Total Amount</span>
                                        <span className="font-extrabold text-indigo-600">{formatRupiah(currentOrder.total_amount || currentOrder.total || 0)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Customer & Actions */}
                        <div className="space-y-6">
                            
                            {/* Update Status */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="border-b border-gray-100 px-6 py-5 bg-indigo-50">
                                    <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-indigo-600" /> Update Order Status
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <div className="flex flex-col gap-3">
                                        <button 
                                            disabled={processing || data.status === 'diproses'}
                                            onClick={() => updateStatus('diproses')}
                                            className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all border ${data.status === 'diproses' ? 'bg-yellow-100 text-yellow-800 border-yellow-300 shadow-sm' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                                        >
                                            <Clock className="w-4 h-4 inline mr-2" /> Mark as Processing (diproses)
                                        </button>
                                        <button 
                                            disabled={processing || data.status === 'dikirim'}
                                            onClick={() => updateStatus('dikirim')}
                                            className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all border ${data.status === 'dikirim' ? 'bg-indigo-100 text-indigo-800 border-indigo-300 shadow-sm' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                                        >
                                            <Package className="w-4 h-4 inline mr-2" /> Mark as Shipped (dikirim)
                                        </button>
                                        <button 
                                            disabled={processing || data.status === 'selesai'}
                                            onClick={() => updateStatus('selesai')}
                                            className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all border ${data.status === 'selesai' ? 'bg-green-100 text-green-800 border-green-300 shadow-sm' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                                        >
                                            <CheckCircle className="w-4 h-4 inline mr-2" /> Mark as Delivered (selesai)
                                        </button>
                                        <div className="my-2 border-t border-gray-100"></div>
                                        <button 
                                            disabled={processing || data.status === 'dibatalkan'}
                                            onClick={() => updateStatus('dibatalkan')}
                                            className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all border ${data.status === 'dibatalkan' ? 'bg-red-100 text-red-800 border-red-300 shadow-sm' : 'bg-white text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300'}`}
                                        >
                                            <XCircle className="w-4 h-4 inline mr-2" /> Cancel Order (dibatalkan)
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Details */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="border-b border-gray-100 px-6 py-5 bg-gray-50/50">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <User className="w-5 h-5 text-indigo-500" /> Customer Details
                                    </h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Name</p>
                                        <p className="font-semibold text-gray-900">{currentOrder.shipping_name || currentOrder.customer_name || currentOrder.user?.name || 'Customer'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Contact</p>
                                        <p className="text-gray-700">{currentOrder.shipping_phone || currentOrder.user?.phone || 'No phone provided'}</p>
                                        <p className="text-gray-700">{currentOrder.user?.email || 'No email provided'}</p>
                                    </div>
                                    <div className="pt-2 border-t border-gray-100">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Shipping Address</p>
                                        <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                                            {currentOrder.shipping_address || 'No shipping address provided.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </EcommerceLayout>
    );
}
