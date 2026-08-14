import DashboardAdmin from '@/layouts/dashboard-admin';
import { Head, Link, usePage } from '@inertiajs/react';
import { Package, ShoppingCart, DollarSign, PlusCircle, List, ArrowRight, TrendingUp } from 'lucide-react';
import { PageProps } from '@/types';
import { formatRupiah } from '@/lib/utils';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DashboardProps {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    recentOrders?: any[];
}

export default function Dashboard({ totalProducts = 0, totalOrders = 0, totalRevenue = 0, recentOrders = [] }: DashboardProps) {
    const { auth } = usePage<PageProps>().props;



    return (
        <DashboardAdmin>
            <Head title="Seller Dashboard" />
        
            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                    
                    {/* Welcome Section with Gradient */}
                    <div className="mb-8 rounded-2xl bg-gradient-to-r from-violet-600 to-violet-700 p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h1 className="mb-2 text-3xl font-extrabold tracking-tight">Seller Dashboard</h1>
                            <p className="text-blue-100 max-w-xl text-lg">
                                Welcome back, {auth.user.name}! Manage your store, track your revenue, and fulfill orders seamlessly.
                            </p>
                            
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link href="/seller/products/create" className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent rounded-lg shadow-md text-sm font-semibold text-violet-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:scale-105">
                                    <PlusCircle className="mr-2 h-5 w-5" /> Add New Product
                                </Link>
                                <Link href="/seller/products" className="inline-flex items-center justify-center px-5 py-2.5 border border-white/30 rounded-lg shadow-sm text-sm font-semibold text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 focus:outline-none transition-all">
                                    <List className="mr-2 h-5 w-5" /> Manage Inventory
                                </Link>
                            </div>
                        </div>
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute bottom-0 right-40 w-40 h-40 rounded-full bg-indigo-400/20 blur-2xl"></div>
                    </div>

                    {/* Stats Grid */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Total Revenue */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg group">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Revenue</h3>
                                <div className="rounded-xl bg-green-50 p-3 group-hover:scale-110 transition-transform">
                                    <DollarSign className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                            <div className="text-3xl font-extrabold text-gray-900">{formatRupiah(totalRevenue)}</div>
                            <div className="mt-2 flex items-center text-sm text-green-600 font-medium">
                                <TrendingUp className="mr-1 h-4 w-4" /> Lifetime earnings
                            </div>
                        </div>

                        {/* Total Orders */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg group">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Orders</h3>
                                <div className="rounded-xl bg-blue-50 p-3 group-hover:scale-110 transition-transform">
                                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                            <div className="text-3xl font-extrabold text-gray-900">{totalOrders}</div>
                            <div className="mt-2 flex items-center text-sm text-blue-600 font-medium">
                                <ArrowRight className="mr-1 h-4 w-4" /> View all orders
                            </div>
                        </div>

                        {/* Total Products */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg group">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Products</h3>
                                <div className="rounded-xl bg-purple-50 p-3 group-hover:scale-110 transition-transform">
                                    <Package className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                            <div className="text-3xl font-extrabold text-gray-900">{totalProducts}</div>
                            <div className="mt-2 flex items-center text-sm text-purple-600 font-medium">
                                <ArrowRight className="mr-1 h-4 w-4" /> Manage catalog
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders Section */}
                    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                        <div className="border-b border-gray-100 bg-white px-6 py-5 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                            <Link href="/seller/orders" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                                View All
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-gray-50/80">
                                    <TableRow>
                                        <TableHead className="px-6 py-4 uppercase tracking-wider text-xs font-semibold text-gray-500">Order ID</TableHead>
                                        <TableHead className="px-6 py-4 uppercase tracking-wider text-xs font-semibold text-gray-500">Customer</TableHead>
                                        <TableHead className="px-6 py-4 uppercase tracking-wider text-xs font-semibold text-gray-500">Status</TableHead>
                                        <TableHead className="px-6 py-4 text-right uppercase tracking-wider text-xs font-semibold text-gray-500">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentOrders.length > 0 ? recentOrders.map((order: any) => (
                                        <TableRow key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                            <TableCell className="px-6 py-4 font-semibold text-indigo-600">#{order.order_number || order.id}</TableCell>
                                            <TableCell className="px-6 py-4 text-gray-700 font-medium">{order.shipping_name || order.user?.name || 'Customer'}</TableCell>
                                            <TableCell className="px-6 py-4">
                                                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                                    {order.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-right font-bold text-gray-900">
                                                {formatRupiah(order.total_amount || order.total || 0)}
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-32 text-center text-gray-500">
                                                <div className="flex flex-col items-center justify-center">
                                                    <ShoppingCart className="h-10 w-10 text-gray-300 mb-3" />
                                                    <p>No recent orders found.</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                </div>
            </div>
        </DashboardAdmin>
    );
}
