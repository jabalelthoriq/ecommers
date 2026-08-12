import React from 'react';
import { Link } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
    slug: string;
    image?: string;
    products_count?: number;
}

interface CategoryCardProps {
    category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Link 
            href={`/shop?category=${category.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out border border-gray-100"
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                {category.image ? (
                    <img
                        src={`/storage/${category.image}`}
                        alt={category.name}
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
                        <span className="text-5xl font-bold text-indigo-200/50">{category.name.charAt(0)}</span>
                    </div>
                )}
                
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-2xl font-bold text-white tracking-wide transition-transform duration-300 group-hover:-translate-y-2 drop-shadow-md">
                    {category.name}
                </h3>
                
                {/* Count badge animation */}
                <div className="mt-3 overflow-hidden h-8 flex items-center justify-center">
                    <span className="translate-y-8 rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 border border-white/30 shadow-lg">
                        {category.products_count !== undefined ? `${category.products_count} Items` : 'Shop Now'}
                    </span>
                </div>
            </div>
        </Link>
    );
}
