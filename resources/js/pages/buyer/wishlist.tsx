import React from 'react';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import ProductCard from '@/components/ecommerce/product-card';

export default function Wishlist({ wishlistItems = [] }: { wishlistItems?: any[] }) {
    const items = wishlistItems || [];

    return (
        <EcommerceLayout title="My Wishlist">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Wishlist</h1>
                    <span className="text-sm font-medium bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full">{items.length} items</span>
                </div>
                
                {items.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100 animate-slide-in-right">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                        <p className="text-gray-500">Save items you love to your wishlist to easily find them later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {items.map((product, idx) => (
                            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                                <ProductCard
                                    product={{
                                        id: product.id,
                                        name: product.name,
                                        slug: product.slug,
                                        price: product.price,
                                        discount_price: product.discountPrice,
                                        images: product.image ? [{ id: 0, image_path: product.image.replace('/storage/', ''), is_primary: true }] : [],
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </EcommerceLayout>
    );
}
