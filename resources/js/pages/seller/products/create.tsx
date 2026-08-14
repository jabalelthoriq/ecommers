import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Head, router, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, PackagePlus, Image as ImageIcon } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';

import InputError from '@/components/input-error';
import DashboardAdmin from '@/layouts/dashboard-admin';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const productSchema = z.object({
    name: z.string().min(1, "Nama produk tidak boleh kosong"),
    category_id: z.string().min(1, "Kategori harus dipilih"),
    description: z.string().min(1, "Deskripsi produk tidak boleh kosong"),
    price: z.coerce.number().min(1, "Harga minimal 1"),
    stock: z.coerce.number().min(0, "Stok tidak boleh negatif"),
    image: z.any().refine((file) => file !== null && file !== undefined && file !== '', "Gambar produk wajib diunggah"),
});

type ProductSchema = z.infer<typeof productSchema>;

interface Category {
    id: number;
    name: string;
}

export default function Create({ categories = [] }: { categories?: Category[] }) {
    const { errors: serverErrors } = usePage().props as unknown as { errors: Record<string, string> };
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<z.input<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            category_id: '',
            description: '',
            price: undefined as any,
            stock: undefined as any,
            image: null,
        },
    });

    const imageFile = watch('image');

    const onSubmit = (data: any) => {
        router.post('/seller/products', data);
    };

    // Cleanup object URL
    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    return (
        <DashboardAdmin>
            <Head title="Create Product" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                    
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
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
                                            {...register('name')}
                                        />
                                        <InputError message={errors.name?.message || serverErrors.name} className="mt-1" />
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="category_id" className="mb-1 block">Category</Label>
                                        <Controller
                                            name="category_id"
                                            control={control}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger id="category_id">
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categories.map(cat => (
                                                            <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        <InputError message={errors.category_id?.message || serverErrors.category_id} className="mt-1" />
                                    </div>

                                    <div>
                                        <Label htmlFor="description" className="mb-1 block">Description</Label>
                                        <Textarea 
                                            id="description" 
                                            rows={5}
                                            placeholder="Describe your product's features and benefits..."
                                            {...register('description')}
                                        />
                                        <InputError message={errors.description?.message || serverErrors.description} className="mt-1" />
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
                                                {...register('price')}
                                            />
                                        </div>
                                        <InputError message={errors.price?.message || serverErrors.price} className="mt-1" />
                                    </div>

                                    <div>
                                        <Label htmlFor="stock" className="mb-1 block">Available Stock</Label>
                                        <Input 
                                            id="stock" 
                                            type="number" 
                                            min="0"
                                            placeholder="0"
                                            {...register('stock')}
                                        />
                                        <InputError message={errors.stock?.message || serverErrors.stock} className="mt-1" />
                                    </div>
                                </div>
                            </div>

                            {/* Media Section */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Product Image</h3>
                                {imagePreview && (
                                    <div className="mb-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                                        <div className="h-32 w-32 rounded-lg border border-gray-200 overflow-hidden">
                                            <img src={imagePreview} alt="Preview" className="h-full w-full object-cover object-center" />
                                        </div>
                                    </div>
                                )}
                                <div className="mt-2 flex justify-center rounded-xl border border-dashed border-gray-300 px-6 py-10 bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="text-center">
                                        <ImageIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                            <label htmlFor="image" className="relative cursor-pointer rounded-md bg-white px-3 py-1 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 border border-indigo-100 shadow-sm">
                                                <span>Upload a file</span>
                                                <input 
                                                    id="image" 
                                                    type="file" 
                                                    className="sr-only" 
                                                    accept="image/*" 
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0] || null;
                                                        setValue('image', file, { shouldValidate: true });
                                                        if (file) setImagePreview(URL.createObjectURL(file));
                                                        else setImagePreview(null);
                                                    }}
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-500 mt-2">
                                            {imageFile ? imageFile.name : 'PNG, JPG, GIF up to 2MB'}
                                        </p>
                                    </div>
                                </div>
                                <InputError message={errors.image?.message as string || serverErrors.image} className="mt-2" />
                            </div>

                        </div>
                        
                        <div className="bg-gray-50 px-8 py-5 flex items-center justify-end gap-4 border-t border-gray-100">
                            <Link href="/seller/products" className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2">
                                Cancel
                            </Link>
                            <Button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="bg-violet-600 px-6 text-white hover:bg-violet-700"
                            >
                                {isSubmitting ? 'Saving...' : 'Save Product'}
                            </Button>
                        </div>
                    </form>

                </div>
            </div>
        </DashboardAdmin>
    );
}
