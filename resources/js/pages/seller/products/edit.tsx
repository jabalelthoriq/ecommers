import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Edit as EditIcon, Image as ImageIcon } from 'lucide-react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    slug: string;
    name: string;
    category_id: number;
    description: string;
    price: number;
    stock: number;
    image: string | null;
}

export default function Edit({ product, categories = [] }: { product: Product; categories?: Category[] }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: product?.name || '',
        category_id: product?.category_id || '',
        description: product?.description || '',
        price: product?.price || '',
        stock: product?.stock || '',
        image: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/seller/products/${product.slug}`);
    };

    return (
        <EcommerceLayout>
            <Head title="Edit Product" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="mb-8 flex flex-col items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <Link href="/seller/products" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Products
                        </Link>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                                <EditIcon className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Edit Product</h1>
                                <p className="text-gray-500 text-sm mt-1">Update the details of your existing product below.</p>
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
                                        <Label htmlFor="name" className="mb-1 block">Product Name</Label>
                                        <Input 
                                            id="name" 
                                            type="text"
                                            placeholder="e.g. Premium Wireless Headphones"
                                            value={data.name} 
                                            onChange={(e) => setData('name', e.target.value)} 
                                        />
                                        <InputError message={errors.name} className="mt-1" />
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="category_id" className="mb-1 block">Category</Label>
                                        <Select 
                                            value={data.category_id.toString()} 
                                            onValueChange={(val) => setData('category_id', val)}
                                        >
                                            <SelectTrigger id="category_id">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map(cat => (
                                                    <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.category_id} className="mt-1" />
                                    </div>

                                    <div>
                                        <Label htmlFor="description" className="mb-1 block">Description</Label>
                                        <Textarea 
                                            id="description" 
                                            rows={5}
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
                                        <Label htmlFor="price" className="mb-1 block">Price (Rp)</Label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="text-gray-500 sm:text-sm">Rp</span>
                                            </div>
                                            <Input 
                                                id="price" 
                                                type="number" 
                                                min="0"
                                                className="pl-10"
                                                placeholder="0"
                                                value={data.price} 
                                                onChange={(e) => setData('price', e.target.value)} 
                                            />
                                        </div>
                                        <InputError message={errors.price} className="mt-1" />
                                    </div>

                                    <div>
                                        <Label htmlFor="stock" className="mb-1 block">Available Stock</Label>
                                        <Input 
                                            id="stock" 
                                            type="number" 
                                            min="0"
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
                                {(data.image || product.image) && (
                                    <div className="mb-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2">{data.image ? 'New Image Preview:' : 'Current Image:'}</p>
                                        <div className="h-32 w-32 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                                            <img 
                                                src={data.image ? URL.createObjectURL(data.image) : (product.image || '')} 
                                                alt="Preview" 
                                                className="h-full w-full object-cover object-center" 
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="mt-2 flex justify-center rounded-xl border border-dashed border-gray-300 px-6 py-10 bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="text-center">
                                        <ImageIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                            <label htmlFor="image" className="relative cursor-pointer rounded-md bg-white px-3 py-1 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 border border-indigo-100 shadow-sm">
                                                <span>Upload a new file</span>
                                                <input id="image" type="file" className="sr-only" onChange={(e) => setData('image', e.target.files?.[0] || null)} accept="image/*" />
                                            </label>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-500 mt-2">
                                            {data.image ? data.image.name : 'Leave blank to keep current image (PNG, JPG, GIF up to 2MB)'}
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
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="px-6"
                            >
                                {processing ? 'Updating...' : 'Update Product'}
                            </Button>
                        </div>
                    </form>

                </div>
            </div>
        </EcommerceLayout>
    );
}
