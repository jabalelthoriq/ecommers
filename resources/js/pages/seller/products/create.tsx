import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, PackagePlus, Image as ImageIcon } from 'lucide-react';
import InputError from '@/components/input-error';

interface Category {
    id: number;
    name: string;
}

export default function Create({ categories = [] }: { categories?: Category[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category_id: '',
        description: '',
        price: '',
        stock: '',
        image: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/seller/products');
    };

    return (
        <EcommerceLayout>
            <Head title="Create Product" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="mb-8 flex flex-col items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <Link href="/seller/products" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Products
                        </Link>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                                <PackagePlus className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Add New Product</h1>
                                <p className="text-gray-500 text-sm mt-1">Fill out the details below to list a new item in your store.</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={submit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 space-y-8">
                            
                            {/* Basic Info Section */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Basic Information</h3>
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                        <input 
                                            id="name" 
                                            type="text"
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                                            placeholder="e.g. Premium Wireless Headphones"
                                            value={data.name} 
                                            onChange={(e) => setData('name', e.target.value)} 
                                        />
                                        <InputError message={errors.name} className="mt-1" />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <select 
                                            id="category_id" 
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                                            value={data.category_id} 
                                            onChange={(e) => setData('category_id', e.target.value)} 
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.category_id} className="mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea 
                                            id="description" 
                                            rows={5}
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                                            placeholder="Describe your product's features and benefits..."
                                            value={data.description} 
                                            onChange={(e) => setData('description', e.target.value)} 
                                        />
                                        <InputError message={errors.description} className="mt-1" />
                                    </div>
                                </div>
                            </div>

                            {/* Pricing & Inventory */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Pricing & Inventory</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price (Rp)</label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="text-gray-500 sm:text-sm">Rp</span>
                                            </div>
                                            <input 
                                                id="price" 
                                                type="number" 
                                                min="0"
                                                className="block w-full rounded-lg border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                                                placeholder="0"
                                                value={data.price} 
                                                onChange={(e) => setData('price', e.target.value)} 
                                            />
                                        </div>
                                        <InputError message={errors.price} className="mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Available Stock</label>
                                        <input 
                                            id="stock" 
                                            type="number" 
                                            min="0"
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                                            placeholder="0"
                                            value={data.stock} 
                                            onChange={(e) => setData('stock', e.target.value)} 
                                        />
                                        <InputError message={errors.stock} className="mt-1" />
                                    </div>
                                </div>
                            </div>

                            {/* Media Section */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Product Image</h3>
                                <div className="mt-2 flex justify-center rounded-xl border border-dashed border-gray-300 px-6 py-10 bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="text-center">
                                        <ImageIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                            <label htmlFor="image" className="relative cursor-pointer rounded-md bg-white px-3 py-1 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 border border-indigo-100 shadow-sm">
                                                <span>Upload a file</span>
                                                <input id="image" type="file" className="sr-only" onChange={(e) => setData('image', e.target.files?.[0] || null)} accept="image/*" />
                                            </label>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-500 mt-2">
                                            {data.image ? data.image.name : 'PNG, JPG, GIF up to 2MB'}
                                        </p>
                                    </div>
                                </div>
                                <InputError message={errors.image as string} className="mt-2" />
                            </div>

                        </div>
                        
                        <div className="bg-gray-50 px-8 py-5 flex items-center justify-end gap-4 border-t border-gray-100">
                            <Link href="/seller/products" className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2">
                                Cancel
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Saving...' : 'Save Product'}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </EcommerceLayout>
    );
}
