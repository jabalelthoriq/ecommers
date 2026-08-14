import DashboardAdmin from '@/layouts/dashboard-admin';
import { Head, Link } from '@inertiajs/react';
import { Eye, Clock, Package, CheckCircle, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

export default function Index({ orders = [] }: { orders: any[] }) {


    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'diproses': return <Clock className="w-3.5 h-3.5 mr-1.5" />;
            case 'dikirim': return <Package className="w-3.5 h-3.5 mr-1.5" />;
            case 'selesai': return <CheckCircle className="w-3.5 h-3.5 mr-1.5" />;
            case 'dibatalkan': return <XCircle className="w-3.5 h-3.5 mr-1.5" />;
            default: return <Clock className="w-3.5 h-3.5 mr-1.5" />;
        }
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

    return (
        <DashboardAdmin>
            <Head title="Orders Management" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div>
                            <Link href="/seller/dashboard" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-2 transition-colors">
                                <ArrowLeft className="mr-1 h-4 w-4" /> Back to Dashboard
                            </Link>
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Incoming Orders</h1>
                            <p className="text-gray-500 mt-1">Review and manage all orders placed by your customers.</p>
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50/80 text-gray-500 font-semibold border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 uppercase tracking-wider text-xs">Order ID</th>
                                        <th className="px-6 py-4 uppercase tracking-wider text-xs">Customer</th>
                                        <th className="px-6 py-4 uppercase tracking-wider text-xs">Date</th>
                                        <th className="px-6 py-4 uppercase tracking-wider text-xs">Status</th>
                                        <th className="px-6 py-4 uppercase tracking-wider text-xs">Total Amount</th>
                                        <th className="px-6 py-4 text-right uppercase tracking-wider text-xs">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {orders.length > 0 ? orders.map(order => (
                                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4 font-bold text-indigo-600">#{order.order_number || order.id}</td>
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-gray-900 block">{order.customer_name || order.user?.name || 'Customer'}</span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 font-medium">
                                                {order.created_at ? new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border shadow-sm ${getStatusStyle(order.status)}`}>
                                                    {getStatusIcon(order.status)}
                                                    <span className="capitalize">{order.status}</span>
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-900">
                                                {formatRupiah(order.total_amount || order.total || 0)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link 
                                                    href={`/seller/orders/${order.id}`}
                                                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg shadow-sm text-xs font-semibold text-indigo-600 bg-white hover:bg-indigo-50 hover:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all opacity-0 group-hover:opacity-100"
                                                >
                                                    <Eye className="h-3.5 w-3.5 mr-1.5" /> Manage <ArrowRight className="h-3.5 w-3.5 ml-1 opacity-50" />
                                                </Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-16 text-center text-gray-500">
                                                <div className="flex flex-col items-center justify-center">
                                                    <Package className="h-12 w-12 text-gray-300 mb-4" />
                                                    <p className="text-lg font-medium text-gray-900 mb-1">No incoming orders</p>
                                                    <p className="text-sm text-gray-500">When customers place orders, they will appear here.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </DashboardAdmin>
    );
}
