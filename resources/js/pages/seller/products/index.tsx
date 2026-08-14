import DashboardAdmin from '@/layouts/dashboard-admin';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Edit, Trash, Package, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import { formatRupiah } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
    id: number;
    slug: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string | null;
}

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

    return (
        <DashboardAdmin>
            <Head title="Manage Products" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div>
                            <Link href="/seller/dashboard" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-2 transition-colors">
                                <ArrowLeft className="mr-1 h-4 w-4" /> Back to Dashboard
                            </Link>
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Manage Products</h1>
                            <p className="text-gray-500 mt-1">View, edit, or delete the products you are currently selling.</p>
                        </div>
                        <Link href="/seller/products/create" className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all hover:scale-105">
                            <Plus className="mr-2 h-5 w-5" /> Add New Product
                        </Link>
                    </div>

                    {/* Products Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-gray-50/80">
                                <TableRow>
                                    <TableHead className="uppercase tracking-wider text-xs">Product Image</TableHead>
                                    <TableHead className="uppercase tracking-wider text-xs">Name</TableHead>
                                    <TableHead className="uppercase tracking-wider text-xs">Price</TableHead>
                                    <TableHead className="uppercase tracking-wider text-xs">Stock</TableHead>
                                    <TableHead className="text-right uppercase tracking-wider text-xs">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.length > 0 ? products.map(product => (
                                    <TableRow key={product.id} className="hover:bg-gray-50/50 group">
                                        <TableCell>
                                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center" />
                                                ) : (
                                                    <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                        <Package className="h-8 w-8" />
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-semibold text-gray-900">{product.name}</TableCell>
                                        <TableCell className="font-bold text-indigo-600">{formatRupiah(product.price)}</TableCell>
                                        <TableCell>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                                {product.stock} in stock
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/seller/products/${product.slug}/edit`} className="inline-flex items-center justify-center p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-indigo-600 shadow-sm transition-colors">
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <button onClick={() => handleDelete(product.slug)} className="inline-flex items-center justify-center p-2 rounded-lg border border-red-200 bg-white text-red-500 hover:bg-red-50 hover:text-red-700 shadow-sm transition-colors">
                                                    <Trash className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-16 text-center text-gray-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <Package className="h-12 w-12 text-gray-300 mb-4" />
                                                <p className="text-lg font-medium text-gray-900 mb-1">No products yet</p>
                                                <p className="text-sm text-gray-500">Get started by creating your first product to sell.</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                </div>
            </div>
        </DashboardAdmin>
    );
}
