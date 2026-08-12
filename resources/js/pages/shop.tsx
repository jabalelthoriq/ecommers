import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import ProductCard, { Product } from '@/components/ecommerce/product-card';
import EcommerceLayout from '@/layouts/ecommerce-layout';

interface Category {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedProducts {
    data: Product[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
}

interface Filters {
    search?: string;
    category?: string;
    sort?: string;
}

interface ShopProps {
    products: PaginatedProducts;
    categories: Category[];
    filters: Filters;
}

export default function Shop({ products, categories, filters }: ShopProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [isSearching, setIsSearching] = useState(false);

    // Debounce search input for seamless animated filtering
    useEffect(() => {
        const timer = setTimeout(() => {
            const currentSearch = searchTerm || '';
            const previousSearch = filters.search || '';
            
            if (currentSearch !== previousSearch && !isSearching) {
                handleFilter('search', currentSearch);
            }
        }, 600);
        return () => clearTimeout(timer);
    }, [searchTerm, filters.search, isSearching]);

    const handleFilter = (key: string, value: string) => {
        setIsSearching(true);
        router.get('/shop', {
            ...filters,
            [key]: value,
            page: 1 // Reset to first page on new filter
        }, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsSearching(false)
        });
    };

    return (
        <EcommerceLayout title="Shop">
            {/* Compact Header Section */}
            <div className="bg-white border-b border-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight animate-fade-in-up">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Premium</span> Collection
                    </h1>
                    <p className="mt-2 text-base text-gray-500 animate-fade-in-up animation-delay-200">
                        Discover thoughtfully curated pieces designed to elevate your everyday lifestyle.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Sidebar Filters */}
                    <div className="w-full lg:w-64 flex-shrink-0 animate-fade-in-right">
                        <div className="sticky top-24 space-y-8 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            
                            {/* Animated Search Bar */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Search</h3>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Find products..."
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-10 py-2.5 text-sm text-gray-900 shadow-sm transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 hover:border-gray-300 outline-none"
                                    />
                                    <div className={`absolute inset-y-0 right-0 flex items-center pr-3 transition-opacity duration-300 ${isSearching ? 'opacity-100' : 'opacity-0'}`}>
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                                    </div>
                                </div>
                            </div>

                            {/* Categories */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Categories</h3>
                                <div className="space-y-1">
                                    <button
                                        onClick={() => handleFilter('category', '')}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 text-sm flex items-center justify-between group
                                            ${!filters.category ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <span>All Products</span>
                                        {!filters.category && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                                    </button>
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleFilter('category', category.slug)}
                                            className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 text-sm flex items-center justify-between group
                                                ${filters.category === category.slug ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            <span>{category.name}</span>
                                            {filters.category === category.slug && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sort Filter */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Sort By</h3>
                                <div className="relative">
                                    <select
                                        value={filters.sort || ''}
                                        onChange={(e) => handleFilter('sort', e.target.value)}
                                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 shadow-sm transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 hover:border-gray-300 outline-none cursor-pointer"
                                    >
                                        <option value="">Latest Arrivals</option>
                                        <option value="price_asc">Price: Low to High</option>
                                        <option value="price_desc">Price: High to Low</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Products Grid */}
                    <div className="flex-1">
                        <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity duration-500 ${isSearching ? 'opacity-50' : 'opacity-100'}`}>
                            {products.data.length > 0 ? (
                                products.data.map((product, index) => (
                                    <div 
                                        key={product.id}
                                        className="animate-fade-in-up"
                                        style={{ animationFillMode: 'both', animationDelay: `${index * 75}ms` }}
                                    >
                                        <ProductCard product={product} />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center animate-fade-in bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
                                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 mb-4">
                                        <svg className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">No products found</h3>
                                    <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
                                    <button 
                                        onClick={() => {
                                            setSearchTerm('');
                                            router.get('/shop');
                                        }}
                                        className="mt-6 inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Beautiful Pagination */}
                        {products.links.length > 3 && (
                            <div className="mt-12 flex justify-center">
                                <nav className="inline-flex rounded-xl bg-white shadow-sm border border-gray-200 p-1 gap-1">
                                    {products.links.map((link, index) => {
                                        let label = link.label;
                                        if (label.includes('Previous')) label = '&larr;';
                                        if (label.includes('Next')) label = '&rarr;';

                                        return (
                                            <button
                                                key={index}
                                                disabled={!link.url}
                                                onClick={() => link.url && router.get(link.url, {}, { preserveScroll: true, preserveState: true })}
                                                className={`
                                                    relative inline-flex items-center justify-center min-w-[2.25rem] px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300
                                                    ${link.active ? 'bg-gray-900 text-white shadow' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                                                    ${!link.url ? 'text-gray-300 cursor-not-allowed hover:bg-transparent hover:text-gray-300' : 'cursor-pointer'}
                                                `}
                                                dangerouslySetInnerHTML={{ __html: label }}
                                            />
                                        );
                                    })}
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Custom Animations for the Shop Page */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-right {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in-up { animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
                .animate-fade-in-right { animation: fade-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
                .animate-fade-in { animation: fade-in 0.6s ease-out; }
                .animation-delay-200 { animation-delay: 200ms; }
            `}} />
        </EcommerceLayout>
    );
}
