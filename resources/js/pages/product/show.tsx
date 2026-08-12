import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Star, ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw, Check, ChevronRight, Minus, Plus, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ecommerce/product-card';

interface User {
    id: number;
    name: string;
    avatar?: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface ProductImage {
    id: number;
    image_path: string;
    is_primary: boolean;
}

interface Review {
    id: number;
    rating: number;
    comment: string;
    created_at: string;
    user: User;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    sku: string;
    category: Category;
    seller: User;
    images: ProductImage[];
    reviews: Review[];
    rating_avg?: number;
    reviews_count?: number;
}

interface Props {
    product: Product;
    relatedProducts: Product[];
    isWishlisted?: boolean;
}

export default function Show({ product, relatedProducts, isWishlisted = false }: Props) {
    const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0];
    const [activeImage, setActiveImage] = useState<string>(primaryImage?.image_path || '/placeholder.png');
    const [quantity, setQuantity] = useState(1);
    const [isHoveringImage, setIsHoveringImage] = useState(false);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleQuantityChange = (type: 'increase' | 'decrease') => {
        if (type === 'increase' && quantity < product.stock) {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        // Optimistic UI update
        setIsAddedToCart(true);
        setTimeout(() => setIsAddedToCart(false), 2000);
        
        // Form post would go here via Inertia
        router.post('/buyer/cart', {
            product_id: product.id,
            quantity: quantity
        }, {
            preserveScroll: true
        });
    };

    // Calculate average rating if not provided
    const avgRating = product.rating_avg || 
        (product.reviews?.length > 0 
            ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length 
            : 0);

    return (
        <EcommerceLayout title={product.name}>
            <Head title={`${product.name} - E-Commerce`} />

            {/* Breadcrumbs */}
            <div className="bg-gray-50 py-4 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/shop" className="hover:text-indigo-600 transition-colors">Shop</Link>
                        <ChevronRight className="h-4 w-4" />
                        {product.category && (
                            <>
                                <Link href={`/category/${product.category.slug}`} className="hover:text-indigo-600 transition-colors">
                                    {product.category.name}
                                </Link>
                                <ChevronRight className="h-4 w-4" />
                            </>
                        )}
                        <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-md">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Image Gallery - Left Side */}
                    <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4 animate-[fadeIn_0.5s_ease-out]">
                        {/* Thumbnails */}
                        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:max-h-[600px] pb-2 md:pb-0 scrollbar-hide w-full md:w-24 shrink-0">
                            {product.images?.map((image) => (
                                <button
                                    key={image.id}
                                    onClick={() => setActiveImage(image.image_path)}
                                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all duration-300 ${
                                        activeImage === image.image_path
                                            ? 'border-indigo-600 ring-2 ring-indigo-600/20'
                                            : 'border-transparent hover:border-indigo-300 opacity-70 hover:opacity-100'
                                    }`}
                                >
                                    <img
                                        src={`/storage/${image.image_path}`}
                                        alt={`Thumbnail ${image.id}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/placeholder.png';
                                        }}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div 
                            className="relative flex-1 bg-gray-50 rounded-2xl overflow-hidden group aspect-square md:aspect-auto"
                            onMouseEnter={() => setIsHoveringImage(true)}
                            onMouseLeave={() => setIsHoveringImage(false)}
                        >
                            <img
                                src={activeImage ? `/storage/${activeImage}` : '/placeholder.png'}
                                alt={product.name}
                                className={`w-full h-full object-contain transition-all duration-500 ease-in-out ${
                                    isHoveringImage ? 'scale-110' : 'scale-100'
                                }`}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/placeholder.png';
                                }}
                            />
                            {/* Tags */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {product.stock > 0 && product.stock < 10 && (
                                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        Only {product.stock} left!
                                    </span>
                                )}
                            </div>
                            
                            {/* Actions overlay */}
                            <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                                <Link 
                                    href="/buyer/wishlist/toggle"
                                    method="post"
                                    data={{ product_id: product.id }}
                                    preserveScroll
                                    className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center backdrop-blur-sm
                                        ${isWishlisted 
                                            ? 'bg-pink-100 text-pink-600 hover:bg-pink-200' 
                                            : 'bg-white/90 text-gray-700 hover:text-pink-500 hover:bg-white'
                                        }`}
                                >
                                    <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
                                </Link>
                                <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full text-gray-700 hover:text-indigo-600 hover:bg-white shadow-lg transition-all duration-300 hover:scale-110">
                                    <Share2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Info - Right Side */}
                    <div className="w-full lg:w-1/2 flex flex-col animate-[slideInRight_0.6s_ease-out]">
                        {/* Title & Brand */}
                        <div className="mb-6">
                            {product.category && (
                                <Link 
                                    href={`/category/${product.category.slug}`} 
                                    className="text-indigo-600 font-medium text-sm tracking-wide uppercase hover:underline mb-2 inline-block"
                                >
                                    {product.category.name}
                                </Link>
                            )}
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                                {product.name}
                            </h1>
                            
                            {/* Ratings */}
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${
                                                i < Math.floor(avgRating)
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300'
                                            } transition-all duration-300 hover:scale-110`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                                    {avgRating.toFixed(1)}
                                </span>
                                <span className="text-sm text-gray-500 underline decoration-dashed underline-offset-4 cursor-pointer hover:text-indigo-600 transition-colors">
                                    {product.reviews_count || product.reviews?.length || 0} Reviews
                                </span>
                            </div>
                        </div>

                        {/* Price & Stock */}
                        <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-2xl shadow-sm">
                            <div className="flex items-end gap-4 mb-4">
                                <span className="text-4xl font-black text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                                    {formatPrice(product.price)}
                                </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <div className={`h-3 w-3 rounded-full animate-pulse ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-700' : 'text-red-700'}`}>
                                    {product.stock > 0 ? `In Stock (${product.stock} items)` : 'Out of Stock'}
                                </span>
                                {product.sku && (
                                    <>
                                        <span className="text-gray-300">|</span>
                                        <span className="text-sm text-gray-500">SKU: {product.sku}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8 prose prose-sm text-gray-600 max-w-none">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">About this item</h3>
                            <p className="leading-relaxed">{product.description}</p>
                        </div>

                        {/* Add to Cart Section */}
                        <div className="mb-8 space-y-4">
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700 font-medium">Quantity:</span>
                                <div className="flex items-center border border-gray-200 rounded-full p-1 bg-white shadow-sm">
                                    <button 
                                        onClick={() => handleQuantityChange('decrease')}
                                        disabled={quantity <= 1}
                                        className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-12 text-center font-semibold text-lg text-gray-900">
                                        {quantity}
                                    </span>
                                    <button 
                                        onClick={() => handleQuantityChange('increase')}
                                        disabled={quantity >= product.stock}
                                        className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button 
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className={`flex-1 flex items-center justify-center space-x-2 py-4 px-8 rounded-full text-white font-bold text-lg transition-all duration-300 transform active:scale-95 shadow-xl relative overflow-hidden ${
                                        product.stock === 0 
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : isAddedToCart
                                                ? 'bg-green-500 hover:bg-green-600 shadow-green-500/30'
                                                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1'
                                    }`}
                                >
                                    {isAddedToCart ? (
                                        <>
                                            <Check className="h-6 w-6 animate-[bounceIn_0.5s_ease-out]" />
                                            <span>Added to Cart!</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="h-6 w-6" />
                                            <span>Add to Cart</span>
                                        </>
                                    )}
                                    {/* Ripple Effect Background */}
                                    {isAddedToCart && (
                                        <div className="absolute inset-0 bg-white/20 animate-[ripple_1s_ease-out] rounded-full"></div>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-8">
                            <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300">
                                <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                                    <Shield className="h-6 w-6" />
                                </div>
                                <h4 className="font-semibold text-gray-900 text-sm">Secure Payment</h4>
                                <p className="text-xs text-gray-500">100% secure payment</p>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300">
                                <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                                    <Truck className="h-6 w-6" />
                                </div>
                                <h4 className="font-semibold text-gray-900 text-sm">Fast Delivery</h4>
                                <p className="text-xs text-gray-500">Free shipping available</p>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300">
                                <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                                    <RotateCcw className="h-6 w-6" />
                                </div>
                                <h4 className="font-semibold text-gray-900 text-sm">Easy Returns</h4>
                                <p className="text-xs text-gray-500">30 days return policy</p>
                            </div>
                        </div>
                        
                        {/* Seller Info */}
                        {product.seller && (
                            <div className="mt-8 border border-gray-200 rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                                <div className="flex items-center space-x-4">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                                        {product.seller.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Sold By</p>
                                        <h4 className="text-lg font-bold text-gray-900">{product.seller.name}</h4>
                                    </div>
                                </div>
                                <Link href="#" className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full text-sm font-medium hover:bg-indigo-50 transition-colors">
                                    Visit Store
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Reviews Section */}
                {product.reviews && product.reviews.length > 0 && (
                    <div className="mt-24 border-t border-gray-200 pt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                            Customer Reviews 
                            <span className="ml-3 bg-indigo-100 text-indigo-800 text-sm py-1 px-3 rounded-full">
                                {product.reviews.length}
                            </span>
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {product.reviews.slice(0, 4).map((review) => (
                                <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                                                {review.user?.name?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{review.user?.name || 'Anonymous User'}</h4>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(review.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 italic">"{review.comment}"</p>
                                </div>
                            ))}
                        </div>
                        {product.reviews.length > 4 && (
                            <div className="mt-8 text-center">
                                <button className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-colors duration-300">
                                    See All Reviews
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Related Products */}
                {relatedProducts && relatedProducts.length > 0 && (
                    <div className="mt-24 border-t border-gray-200 pt-16">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">You Might Also Like</h2>
                            <Link href="/shop" className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center group">
                                View all 
                                <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map((item) => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Custom Animations CSS block */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes bounceIn {
                    0% { transform: scale(0.3); opacity: 0; }
                    50% { transform: scale(1.05); opacity: 1; }
                    70% { transform: scale(0.9); }
                    100% { transform: scale(1); }
                }
                @keyframes ripple {
                    0% { transform: scale(0); opacity: 1; }
                    100% { transform: scale(2); opacity: 0; }
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </EcommerceLayout>
    );
}
