import * as React from 'react';
import DashboardAdmin from '@/layouts/dashboard-admin';
import { Head, Link, useForm } from '@inertiajs/react';
import { DataTable } from "@/components/ecommerce/data-tabel-produtcs/data-table";
import { getProductColumns, Product } from "@/components/ecommerce/data-tabel-produtcs/columns";
import { Plus, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Index({ products = [] }: { products: Product[] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (slug: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(`/seller/products/${slug}`);
            }
        });
    };

    // Memoize kolom agar tidak dirender ulang secara berlebihan
    const columns = React.useMemo(
        () => getProductColumns({ onDelete: handleDelete }),
        []
    );

    return (
        <DashboardAdmin>
            <Head title="Manage Products" />

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
                                Manage Products
                            </h1>
                            <p className="text-gray-500 mt-1">
                                View, edit, or delete the products you are currently selling.
                            </p>
                        </div>
                        <Link 
                            href="/seller/products/create" 
                            className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all hover:scale-105"
                        >
                            <Plus className="mr-2 h-5 w-5" /> Add New Product
                        </Link>
                    </div>

                    {/* Data Table Section */}
                    <DataTable columns={columns} data={products} />

                </div>
            </div>
        </DashboardAdmin>
    );
}