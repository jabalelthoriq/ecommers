import * as React from 'react';
import DashboardAdmin from '@/layouts/dashboard-admin';
import { Head, Link } from '@inertiajs/react';
import { DataTable } from '@/components/ecommerce/data-tabel-orders/data-table';
import { getOrderColumns, Order } from '@/components/ecommerce/data-tabel-orders/columns';
import { Clock, Package, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

export default function Index({ orders = [] }: { orders: Order[] }) {
    const getStatusIcon = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'diproses': return <Clock className="w-3.5 h-3.5 mr-1.5" />;
            case 'dikirim': return <Package className="w-3.5 h-3.5 mr-1.5" />;
            case 'selesai': return <CheckCircle className="w-3.5 h-3.5 mr-1.5" />;
            case 'dibatalkan': return <XCircle className="w-3.5 h-3.5 mr-1.5" />;
            default: return <Clock className="w-3.5 h-3.5 mr-1.5" />;
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'diproses': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'dikirim': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'selesai': return 'bg-green-100 text-green-800 border-green-200';
            case 'dibatalkan': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Memoize kolom agar kalkulasi fungsi helper tidak berulang saat re-render
    const columns = React.useMemo(
        () => getOrderColumns({ getStatusStyle, getStatusIcon }),
        []
    );

    return (
        <DashboardAdmin>
            <Head title="Orders Management" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div>
                            <Link 
                                href="/seller/dashboard" 
                                className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-2 transition-colors"
                            >
                                <ArrowLeft className="mr-1 h-4 w-4" /> Back to Dashboard
                            </Link>
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                Incoming Orders
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Review and manage all orders placed by your customers.
                            </p>
                        </div>
                    </div>

                    {/* Data Table Section */}
                    <DataTable columns={columns} data={orders} />

                </div>
            </div>
        </DashboardAdmin>
    );
}