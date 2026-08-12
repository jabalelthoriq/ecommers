import React from 'react';
import { Link } from '@inertiajs/react';

interface ProductImage {
    id: number;
    image_path: string;
    is_primary: boolean;
}

interface ProductCategory {
    id: number;
    name: string;
    slug: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    discount_price: number | null;
    images: ProductImage[];
    category?: ProductCategory;
}

interface ProductCardProps {
    product: Product;
}

const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export default function ProductCard({ product }: ProductCardProps) {
    const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0];
    const isSale = product.discount_price !== null && product.discount_price < product.price;

    return (
        <Link 
            href={`/product/${product.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100/80"
        >
            {/* Image container with zoom on hover */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-50/50">
                {primaryImage ? (
                    <img
                        src={`/storage/${primaryImage.image_path}`}
                        alt={product.name}
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100/50 text-gray-400 font-medium">
                        No Image Available
                    </div>
                )}
                
                {/* Animated badge for SALE items */}
                {isSale && (
                    <div className="absolute left-4 top-4 overflow-hidden rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-[0_4px_12px_rgba(239,68,68,0.3)] z-10">
                        <span className="relative z-10 tracking-wider">SALE</span>
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    </div>
                )}

                {/* Subtle shadow glow on hover (image overlay) */}
                <div className="absolute inset-0 bg-indigo-900/0 transition-colors duration-300 group-hover:bg-indigo-900/5 mix-blend-multiply" />
                
                {/* Quick action overlay */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent p-4 transition-transform duration-300 ease-out group-hover:translate-y-0 text-white flex justify-center backdrop-blur-[2px]">
                    <span className="font-semibold text-sm tracking-widest uppercase">View Details</span>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                {product.category && (
                    <span className="mb-2 text-xs font-bold tracking-widest text-indigo-500 uppercase">
                        {product.category.name}
                    </span>
                )}
                
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                    {product.name}
                </h3>
                
                <div className="mt-auto flex items-end gap-2.5">
                    {isSale ? (
                        <>
                            {/* Gradient shimmer on price */}
                            <span className="text-xl font-extrabold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                {formatRupiah(product.discount_price!)}
                            </span>
                            <span className="text-sm font-medium text-gray-400 line-through mb-0.5">
                                {formatRupiah(product.price)}
                            </span>
                        </>
                    ) : (
                        <span className="text-xl font-extrabold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                            {formatRupiah(product.price)}
                        </span>
                    )}
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}} />
        </Link>
    );
}
