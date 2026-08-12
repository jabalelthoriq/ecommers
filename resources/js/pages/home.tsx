import React, { useState, useEffect, useRef } from 'react';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import ProductCard from '@/components/ecommerce/product-card';
import CategoryCard from '@/components/ecommerce/category-card';
import { Rocket, Zap, PartyPopper, Gem, Truck, ShieldCheck, RefreshCcw, Headphones } from 'lucide-react';

interface Image {
    id: number;
    image_path: string;
    is_primary: boolean;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
    products_count?: number;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    discount_price?: number;
    images: Image[];
    category: Category;
    reviews_avg_rating?: number;
    reviews_count?: number;
}

interface Props {
    categories: Category[];
    newArrivals: Product[];
    bestSellers: Product[];
    flashSales: Product[];
}

const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
};

// Intersection Observer Fade-In Component
const FadeInSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setVisible(true);
            });
        });
        const currentRef = domRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// Auto Scrolling Carousel Component
const AutoScrollCarousel = ({ products }: { products: Product[] }) => {
    if (!products || products.length === 0) return null;
    const items = [...products, ...products, ...products, ...products].slice(0, Math.max(12, products.length * 2));
    
    return (
        <div className="relative overflow-hidden group py-4">
            <div className="flex w-max animate-auto-scroll hover:[animation-play-state:paused] space-x-6 px-4">
                {items.map((product, idx) => (
                    <div key={`${product.id}-${idx}`} className="w-64 sm:w-72 shrink-0 transition-transform duration-300 hover:-translate-y-2">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            {/* Gradient faded edges for smooth scroll appearance */}
            <div className="absolute top-0 bottom-0 left-0 w-12 md:w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-12 md:w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        </div>
    );
};

export default function Home({ categories = [], newArrivals = [], bestSellers = [], flashSales = [] }: Props) {
    // Hero Slides
    const heroSlides = [
        { text: "Discover Premium Lifestyle", desc: "Elevate your everyday with our carefully curated collection of luxury items.", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80" },
        { text: "Next Generation Tech", desc: "Experience the future today with state-of-the-art electronics.", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80" },
        { text: "Modern Home Living", desc: "Transform your space with minimalist and elegant decor.", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80" }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

    // Slide interval
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Countdown interval
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;
                if (hours === 0 && minutes === 0 && seconds === 0) return prev;
                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        hours--;
                    }
                }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <EcommerceLayout title="Home - Premium Shop">
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 25s linear infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-20px) scale(1.05); }
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
                @keyframes auto-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-auto-scroll {
                    animation: auto-scroll 40s linear infinite;
                }
                .glass-card {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.5);
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
                }
            `}</style>

            {/* Pull content up behind the fixed navbar for full-bleed hero */}
            <div className="-mt-16">

            {/* Marquee Ticker */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white py-2.5 overflow-hidden whitespace-nowrap flex items-center shadow-lg relative z-20 pt-16">
                <div className="animate-marquee flex space-x-12 min-w-full">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex space-x-12 shrink-0">
                            <span className="flex items-center text-sm font-semibold tracking-widest"><Rocket className="w-4 h-4 mr-2" /> FREE SHIPPING ON ORDERS OVER {formatRupiah(500000)}</span>
                            <span className="flex items-center text-sm font-semibold tracking-widest"><Zap className="w-4 h-4 mr-2" /> FLASH SALE ENDS SOON</span>
                            <span className="flex items-center text-sm font-semibold tracking-widest"><PartyPopper className="w-4 h-4 mr-2" /> NEW COLLECTION ARRIVED</span>
                            <span className="flex items-center text-sm font-semibold tracking-widest"><Gem className="w-4 h-4 mr-2" /> PREMIUM QUALITY GUARANTEED</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative bg-gray-950 text-white overflow-hidden min-h-[85vh] flex items-center justify-center">
                {/* Floating Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-float"></div>
                <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-float" style={{ animationDelay: '4s' }}></div>

                {/* Slides Backgrounds */}
                <div className="absolute inset-0 z-0">
                    {heroSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${index === currentSlide ? 'opacity-40' : 'opacity-0'}`}
                        >
                            <img src={slide.img} alt="Hero background" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-indigo-950/60 to-gray-950/90 mix-blend-overlay"></div>
                        </div>
                    ))}
                </div>

                {/* Slides Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center pb-40">
                    {heroSlides.map((slide, index) => (
                        <div 
                            key={index} 
                            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 transform ${index === currentSlide ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95 pointer-events-none'}`}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-sm font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm animate-pulse">
                                Explore The Best
                            </span>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-100 via-white to-purple-100 drop-shadow-2xl">
                                {slide.text}
                            </h1>
                            <p className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-2xl font-light leading-relaxed">
                                {slide.desc}
                            </p>
                            <a href="/shop" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-indigo-600 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(79,70,229,0.5)]">
                                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                                <span className="relative text-lg">Shop Collection</span>
                                <svg className="relative w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </a>
                        </div>
                    ))}
                    {/* Placeholder for layout height */}
                    <div className="opacity-0 pointer-events-none">
                        <span className="inline-block py-1 px-3 mb-6">Explore</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6">Discover Premium Lifestyle</h1>
                        <p className="text-xl md:text-2xl mb-10">Elevate your everyday with our carefully curated collection of luxury items.</p>
                        <a href="#" className="px-8 py-4 text-lg">Shop Collection</a>
                    </div>
                </div>
            </section>

            {/* Features Row - Overlapping Glassmorphism */}
            <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 mb-16">
                <div className="glass-card rounded-3xl p-8 sm:p-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: <Truck className="w-10 h-10 text-indigo-600" />, title: 'Free Shipping', desc: `On orders over ${formatRupiah(500000)}` },
                            { icon: <ShieldCheck className="w-10 h-10 text-indigo-600" />, title: 'Secure Payments', desc: '100% encrypted & protected' },
                            { icon: <RefreshCcw className="w-10 h-10 text-indigo-600" />, title: 'Easy Returns', desc: '30-day hassle-free policy' },
                            { icon: <Headphones className="w-10 h-10 text-indigo-600" />, title: '24/7 Support', desc: 'Dedicated professional team' }
                        ].map((feature, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="mb-4 transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-6 inline-block drop-shadow-md">
                                    {feature.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1 text-lg">{feature.title}</h3>
                                <p className="text-sm text-gray-500 font-medium">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            </div>{/* end -mt-20 wrapper */}

            {/* Shop by Categories */}
            <section className="py-20 bg-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-white z-0 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeInSection>
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">Curated Categories</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                            {categories.length > 0 ? categories.map((category) => (
                                <div key={category.id} className="transform transition duration-500 hover:-translate-y-3 hover:shadow-2xl rounded-2xl group">
                                    <div className="relative overflow-hidden rounded-2xl">
                                        <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition duration-300 z-10"></div>
                                        <CategoryCard category={category} />
                                    </div>
                                </div>
                            )) : (
                                <p className="col-span-4 text-center text-gray-500">No categories found.</p>
                            )}
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* Flash Sale Banner with Countdown */}
            <section className="relative bg-gray-950 text-white py-24 overflow-hidden">
                {/* Parallax background effect */}
                <div className="absolute inset-0 bg-fixed bg-center bg-cover opacity-20 transform scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/95 via-purple-900/90 to-indigo-950/95"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeInSection>
                        <div className="flex flex-col lg:flex-row items-center justify-between">
                            <div className="mb-12 lg:mb-0 text-center lg:text-left z-10 lg:w-1/2">
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                    <Zap className="text-yellow-400 w-4 h-4 mr-2 animate-pulse" />
                                    <span className="text-sm font-bold tracking-widest uppercase text-white">Limited Time Offer</span>
                                </div>
                                <h2 className="text-5xl lg:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-purple-200">
                                    Flash Sale
                                </h2>
                                <p className="text-xl text-indigo-100/90 max-w-xl leading-relaxed mx-auto lg:mx-0">
                                    Grab your favorite premium items at unbeatable prices before time runs out. Exclusive discounts available now!
                                </p>
                            </div>
                            
                            {/* Timer */}
                            <div className="flex gap-3 sm:gap-6 z-10">
                                {Object.entries(timeLeft).map(([unit, value]) => (
                                    <div key={unit} className="flex flex-col items-center">
                                        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)] mb-3 relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <span className="text-4xl sm:text-5xl font-black text-white">{value.toString().padStart(2, '0')}</span>
                                        </div>
                                        <span className="text-xs sm:text-sm font-bold text-indigo-200 uppercase tracking-widest">{unit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Flash Sale Products */}
                        {flashSales.length > 0 && (
                            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {flashSales.slice(0, 4).map(product => (
                                    <div key={product.id} className="transform transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] rounded-xl relative group">
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg animate-pulse">
                                                SALE {product.discount_price ? Math.round(((product.price - product.discount_price) / product.price) * 100) : 20}%
                                            </span>
                                        </div>
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </FadeInSection>
                </div>
            </section>

            {/* Auto Scrolling New Arrivals */}
            <section className="py-24 bg-gray-50 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                    <FadeInSection>
                        <div className="flex items-end justify-between">
                            <div>
                                <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-2 block">Just Landed</span>
                                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">New Arrivals</h2>
                            </div>
                            <a href="/shop" className="hidden sm:inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-500 transition group">
                                View Collection 
                                <span className="transform transition group-hover:translate-x-1 ml-1">&rarr;</span>
                            </a>
                        </div>
                    </FadeInSection>
                </div>
                
                <FadeInSection delay={200}>
                    {newArrivals.length > 0 ? (
                        <AutoScrollCarousel products={newArrivals} />
                    ) : (
                        <p className="text-center text-gray-500">No new arrivals found.</p>
                    )}
                </FadeInSection>
            </section>

            {/* Best Sellers */}
            <section className="py-24 bg-white border-t border-gray-100 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeInSection>
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <span className="text-purple-600 font-bold tracking-wider uppercase text-sm mb-2 block">Most Popular</span>
                                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Best Sellers</h2>
                            </div>
                            <a href="/shop" className="hidden sm:inline-flex items-center text-sm font-bold text-purple-600 hover:text-purple-500 transition group">
                                View Collection
                                <span className="transform transition group-hover:translate-x-1 ml-1">&rarr;</span>
                            </a>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {bestSellers.length > 0 ? bestSellers.map((product, idx) => (
                                <div key={product.id} className="group relative">
                                    {idx === 0 && (
                                        <div className="absolute -top-3 -right-3 z-20 bg-yellow-400 text-yellow-900 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transform rotate-12 group-hover:scale-110 transition">
                                            #1
                                        </div>
                                    )}
                                    <ProductCard product={product} />
                                </div>
                            )) : (
                                <p className="col-span-4 text-center text-gray-500">No best sellers found.</p>
                            )}
                        </div>
                    </FadeInSection>
                </div>
            </section>
        </EcommerceLayout>
    );
}
