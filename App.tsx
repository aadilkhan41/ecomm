import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductView from './components/ProductView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import WishlistView from './components/WishlistView';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import TermsView from './components/TermsView';
import PrivacyView from './components/PrivacyView';
import FAQView from './components/FAQView';
import { Product, Badge } from './types';
import { RAW_PRODUCTS } from './data';
import { ChevronDown } from 'lucide-react';

// Storage keys
const CART_STORAGE_KEY = 'liv_dry_fruits_cart';
const LIKES_STORAGE_KEY = 'liv_dry_fruits_likes';

const PRODUCTS: Product[] = RAW_PRODUCTS.map((item, index) => {
    const badges: Badge[] = [];
    if (item.tags) {
        if (item.tags.includes('offer')) badges.push({ text: 'Offer', type: 'discount' });
        if (item.tags.includes('best seller')) badges.push({ text: 'Best Seller', type: 'sale' });
        if (item.tags.includes('gift wrapped')) badges.push({ text: 'Gift', type: 'new' });
    }

    let originalPrice = undefined;
    if (item.tags && item.tags.includes('offer')) {
        originalPrice = Math.round(item.price * 1.2);
    }

    return {
        id: String(index + 1),
        title: item.title || item.name,
        weight: `${item.weight_g}g`,
        price: item.price,
        originalPrice: originalPrice,
        rating: item.rating,
        reviews: item.review_count,
        image: item.image,
        badges: badges,
        category: item.category,
        tags: item.tags,
        stockStatus: item.stock_status,
        description: item.long_description || item.short_description
    };
});

type ViewState = 'home' | 'product' | 'cart' | 'checkout' | 'wishlist' | 'terms' | 'privacy' | 'faq';

interface CartItem {
    product: Product;
    quantity: number;
}

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewState>('home');
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [likedProductIds, setLikedProductIds] = useState<(string | number)[]>(() => {
        const savedLikes = localStorage.getItem(LIKES_STORAGE_KEY);
        return savedLikes ? JSON.parse(savedLikes) : [];
    });

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Category');
    const [showOffersOnly, setShowOffersOnly] = useState(false);
    const [showHighRatedOnly, setShowHighRatedOnly] = useState(false);
    const [showBestSellingOnly, setShowBestSellingOnly] = useState(false);

    const itemsPerPage = 12;

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likedProductIds));
    }, [likedProductIds]);

    const handleAddToCart = (product: Product, quantity = 1) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.product.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { product, quantity }];
        });
    };

    const handleUpdateCartQuantity = (productId: number | string, delta: number) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.product.id === productId);
            if (existingItem && existingItem.quantity === 1 && delta === -1) {
                return prev.filter(item => item.product.id !== productId);
            }
            return prev.map(item => {
                if (item.product.id === productId) {
                    const newQuantity = Math.max(0, item.quantity + delta);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(item => item.quantity > 0);
        });
    };

    const handleRemoveFromCart = (productId: number | string) => {
        setCartItems(prev => prev.filter(item => item.product.id !== productId));
    };

    const handleToggleLike = (productId: number | string) => {
        setLikedProductIds(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const filteredProducts = useMemo(() => {
        let result = [...PRODUCTS];
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
        }
        if (selectedCategory !== 'All Category') {
            result = result.filter(p => p.category === selectedCategory);
        }
        if (showOffersOnly) result = result.filter(p => p.tags && p.tags.includes('offer'));
        if (showHighRatedOnly) result = result.filter(p => p.rating >= 4.0);
        if (showBestSellingOnly) result = result.filter(p => p.tags && p.tags.includes('best seller'));

        return result;
    }, [searchQuery, selectedCategory, showOffersOnly, showHighRatedOnly, showBestSellingOnly]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [currentPage, filteredProducts]);

    const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const wishlistCount = likedProductIds.length;

    const navigateTo = (view: ViewState, productId: string | null = null) => {
        setCurrentView(view);
        setSelectedProductId(productId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderContent = () => {
        switch (currentView) {
            case 'product':
                const product = PRODUCTS.find(p => p.id === selectedProductId);
                if (!product) return <div className="p-20 text-center text-gray-500 font-bold">Product not found.</div>;
                return (
                    <ProductView
                        product={product}
                        onBack={() => navigateTo('home')}
                        onAddToCart={handleAddToCart}
                        isLiked={likedProductIds.includes(product.id)}
                        onToggleLike={() => handleToggleLike(product.id)}
                    />
                );
            case 'cart':
                return (
                    <CartView
                        items={cartItems}
                        onUpdateQuantity={handleUpdateCartQuantity}
                        onRemoveItem={handleRemoveFromCart}
                        onCheckout={() => navigateTo('checkout')}
                        onClearCart={() => navigateTo('home')}
                    />
                );
            case 'checkout':
                return (
                    <CheckoutView
                        items={cartItems}
                        onBack={() => navigateTo('cart')}
                        onPlaceOrder={() => { alert("Order Placed Successfully!"); setCartItems([]); navigateTo('home'); }}
                    />
                );
            case 'wishlist':
                return (
                    <WishlistView
                        products={PRODUCTS.filter(p => likedProductIds.includes(p.id))}
                        onProductClick={(p) => navigateTo('product', String(p.id))}
                        onAddToCart={handleAddToCart}
                        onRemoveFromCart={handleUpdateCartQuantity}
                        onToggleLike={handleToggleLike}
                        onBack={() => navigateTo('home')}
                        cartItems={cartItems}
                    />
                );
            case 'terms':
                return <TermsView onBack={() => navigateTo('home')} />;
            case 'privacy':
                return <PrivacyView onBack={() => navigateTo('home')} />;
            case 'faq':
                return <FAQView onBack={() => navigateTo('home')} />;
            case 'home':
            default:
                return (
                    <>
                        {!searchQuery && <Hero />}
                        <div className="container mx-auto px-4 py-6">
                            {filteredProducts.length === 0 ? (
                                <div className="text-center py-20">
                                    <h3 className="text-xl font-bold text-gray-400">No products found.</h3>
                                    <button onClick={() => { setSearchQuery(''); setSelectedCategory('All Category'); }} className="mt-4 text-primary font-bold hover:underline">Clear all filters</button>
                                </div>
                            ) : (
                                <>

                                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                                        {currentProducts.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                quantity={cartItems.find(item => item.product.id === product.id)?.quantity || 0}
                                                onAdd={(p) => handleAddToCart(p, 1)}
                                                onRemove={(id) => handleUpdateCartQuantity(id, -1)}
                                                onClick={(p) => navigateTo('product', String(p.id))}
                                                isLiked={likedProductIds.includes(product.id)}
                                                onToggleLike={handleToggleLike}
                                            />
                                        ))}
                                    </div>
                                    {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />}
                                </>
                            )}
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header
                cartCount={cartTotalCount}
                wishlistCount={wishlistCount}
                onSearch={(q) => { setSearchQuery(q); navigateTo('home'); }}
                onCartClick={() => navigateTo('cart')}
                onWishlistClick={() => navigateTo('wishlist')}
                onLogoClick={() => navigateTo('home')}
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => { setSelectedCategory(cat); navigateTo('home'); }}
                showOffersOnly={showOffersOnly}
                onToggleOffers={() => { setShowOffersOnly(!showOffersOnly); navigateTo('home'); }}
                showHighRatedOnly={showHighRatedOnly}
                onToggleHighRated={() => { setShowHighRatedOnly(!showHighRatedOnly); navigateTo('home'); }}
                showBestSellingOnly={showBestSellingOnly}
                onToggleBestSelling={() => { setShowBestSellingOnly(!showBestSellingOnly); navigateTo('home'); }}
                onCustomerServiceClick={() => navigateTo('faq')}
            />
            <main className="flex-grow bg-white">
                {renderContent()}
            </main>
            <Footer
                onCartClick={() => navigateTo('cart')}
                onWishlistClick={() => navigateTo('wishlist')}
                onTermsClick={() => navigateTo('terms')}
                onPrivacyClick={() => navigateTo('privacy')}
                onFAQClick={() => navigateTo('faq')}
            />
        </div>
    );
};

export default App;