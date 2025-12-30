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
import { Product, Badge } from './types';
import { RAW_PRODUCTS } from './data';
import { ChevronDown } from 'lucide-react';

// Storage keys
const CART_STORAGE_KEY = 'liv_dry_fruits_cart';
const LIKES_STORAGE_KEY = 'liv_dry_fruits_likes';

// Map raw JSON to application Product type
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
    id: index + 1,
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

type SortOption = 'popularity' | 'priceLowToHigh' | 'priceHighToLow' | 'newest';
type ViewState = 'home' | 'product' | 'cart' | 'checkout' | 'wishlist';

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'popularity', label: 'Popularity' },
  { id: 'priceLowToHigh', label: 'Price -- Low to High' },
  { id: 'priceHighToLow', label: 'Price -- High to Low' },
  { id: 'newest', label: 'Newest First' },
];

interface CartItem {
  product: Product;
  quantity: number;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

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

  const handleClearCart = () => {
    setCartItems([]);
    if (currentView === 'cart') setCurrentView('home');
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setCurrentView('checkout');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePlaceOrder = () => {
    alert("Order Placed Successfully! (Simulation)");
    setCartItems([]);
    setCurrentView('home');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCustomerService = () => {
    alert("Customer Service Page - Coming Soon!");
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
    setCurrentView('home');
    setSearchQuery('');
  };

  const handleCartClick = () => {
    setCurrentView('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWishlistClick = () => {
    setCurrentView('wishlist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleGoHome = () => {
    setCurrentView('home');
    setSelectedProduct(null);
    setSelectedCategory('All Category');
    setSearchQuery('');
    setShowOffersOnly(false);
    setShowHighRatedOnly(false);
    setShowBestSellingOnly(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All Category') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (showOffersOnly) {
      result = result.filter(p => p.tags && p.tags.includes('offer'));
    }

    if (showHighRatedOnly) {
      result = result.filter(p => p.rating >= 4.0);
    }

    if (showBestSellingOnly) {
      result = result.filter(p => p.tags && p.tags.includes('best seller'));
    }

    switch (sortBy) {
      case 'priceLowToHigh':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, showOffersOnly, showHighRatedOnly, showBestSellingOnly, sortBy]);

  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter(p => likedProductIds.includes(p.id));
  }, [likedProductIds]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return filteredProducts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, showOffersOnly, showHighRatedOnly, showBestSellingOnly, sortBy]);

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = likedProductIds.length;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        cartCount={cartTotalCount} 
        wishlistCount={wishlistCount}
        onSearch={setSearchQuery}
        onCartClick={handleCartClick}
        onWishlistClick={handleWishlistClick}
        onLogoClick={handleGoHome}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (currentView !== 'home') setCurrentView('home');
          setSelectedProduct(null);
        }}
        showOffersOnly={showOffersOnly}
        onToggleOffers={() => {
          setShowOffersOnly(!showOffersOnly);
          if (currentView !== 'home') setCurrentView('home');
        }}
        showHighRatedOnly={showHighRatedOnly}
        onToggleHighRated={() => {
          setShowHighRatedOnly(!showHighRatedOnly);
          if (currentView !== 'home') setCurrentView('home');
        }}
        showBestSellingOnly={showBestSellingOnly}
        onToggleBestSelling={() => {
          setShowBestSellingOnly(!showBestSellingOnly);
          if (currentView !== 'home') setCurrentView('home');
        }}
        onCustomerServiceClick={handleCustomerService}
      />
      
      <main className="flex-grow bg-white">
        {currentView === 'checkout' ? (
          <CheckoutView 
            items={cartItems}
            onBack={() => setCurrentView('cart')}
            onPlaceOrder={handlePlaceOrder}
          />
        ) : currentView === 'cart' ? (
          <CartView 
            items={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onCheckout={handleCheckout}
            onClearCart={handleGoHome}
          />
        ) : currentView === 'wishlist' ? (
          <WishlistView 
            products={wishlistProducts}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleUpdateCartQuantity}
            onToggleLike={handleToggleLike}
            onBack={handleGoHome}
            cartItems={cartItems}
          />
        ) : currentView === 'product' && selectedProduct ? (
          <ProductView 
            product={selectedProduct} 
            onBack={handleBackToList}
            onAddToCart={handleAddToCart}
            isLiked={likedProductIds.includes(selectedProduct.id)}
            onToggleLike={() => handleToggleLike(selectedProduct.id)}
          />
        ) : (
          <>
            {!searchQuery && <Hero />}
            
            <div className="container mx-auto px-4 py-6">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <h3 className="text-xl font-bold text-gray-400">No products found matching your criteria.</h3>
                  <button 
                    onClick={handleGoHome}
                    className="mt-4 text-primary font-bold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="hidden md:flex flex-wrap items-center gap-x-6 gap-y-3">
                      <span className="font-bold text-gray-900 text-sm shrink-0">Sort By</span>
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSortBy(option.id)}
                          className={`whitespace-nowrap text-sm font-medium transition-colors pb-1 border-b-2 ${
                            sortBy === option.id
                              ? 'text-primary border-primary'
                              : 'text-gray-700 border-transparent hover:text-primary hover:border-gray-300'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>

                    <div className="md:hidden relative">
                      <button 
                        onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                        className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-6 py-4 text-sm font-bold shadow-sm active:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 font-medium">Sort by:</span>
                          <span className="text-primary">{SORT_OPTIONS.find(o => o.id === sortBy)?.label}</span>
                        </div>
                        <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isSortDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-20" onClick={() => setIsSortDropdownOpen(false)} />
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            {SORT_OPTIONS.map((option) => (
                              <button
                                key={option.id}
                                onClick={() => {
                                  setSortBy(option.id);
                                  setIsSortDropdownOpen(false);
                                }}
                                className={`w-full text-left px-5 py-4 text-sm font-bold border-b border-gray-50 last:border-none transition-colors ${
                                  sortBy === option.id ? 'text-primary bg-primary/5' : 'text-gray-700 active:bg-gray-50'
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                    {currentProducts.map((product) => {
                      const qty = cartItems.find(item => item.product.id === product.id)?.quantity || 0;
                      return (
                        <ProductCard 
                          key={product.id} 
                          product={product} 
                          quantity={qty}
                          onAdd={(p) => handleAddToCart(p, 1)} 
                          onRemove={(productId) => handleUpdateCartQuantity(productId, -1)}
                          onClick={handleProductClick}
                          isLiked={likedProductIds.includes(product.id)}
                          onToggleLike={handleToggleLike}
                        />
                      );
                    })}
                  </div>
                  
                  {totalPages > 1 && (
                    <Pagination 
                      currentPage={currentPage} 
                      totalPages={totalPages} 
                      onPageChange={handlePageChange} 
                    />
                  )}
                </>
              )}
            </div>
          </>
        )}
      </main>
      
      <Footer onCartClick={handleCartClick} onWishlistClick={handleWishlistClick} />
    </div>
  );
};

export default App;