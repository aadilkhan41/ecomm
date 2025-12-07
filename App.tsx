import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import { Product, Badge } from './types';
import { RAW_PRODUCTS } from './data';

// Map raw JSON to application Product type
const PRODUCTS: Product[] = RAW_PRODUCTS.map((item, index) => {
  const badges: Badge[] = [];
  if (item.tags) {
    if (item.tags.includes('offer')) badges.push({ text: 'Offer', type: 'discount' });
    if (item.tags.includes('best seller')) badges.push({ text: 'Best Seller', type: 'sale' });
    if (item.tags.includes('gift wrapped')) badges.push({ text: 'Gift', type: 'new' });
  }

  // Determine original price if on offer (simulation)
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
    image: item.image, // Using Unsplash images from source
    badges: badges,
    category: item.category,
    tags: item.tags,
    stockStatus: item.stock_status
  };
});

type SortOption = 'popularity' | 'priceLowToHigh' | 'priceHighToLow' | 'newest';

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'popularity', label: 'Popularity' },
  { id: 'priceLowToHigh', label: 'Price -- Low to High' },
  { id: 'priceHighToLow', label: 'Price -- High to Low' },
  { id: 'newest', label: 'Newest First' },
];

const App: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // -- FILTER & SORT STATES --
  const [selectedCategory, setSelectedCategory] = useState('All Category');
  const [showOffersOnly, setShowOffersOnly] = useState(false);
  const [showHighRatedOnly, setShowHighRatedOnly] = useState(false);
  const [showBestSellingOnly, setShowBestSellingOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');

  const itemsPerPage = 12;

  const handleAddToCart = (product: Product) => {
    setCartCount(prev => prev + 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCustomerService = () => {
    alert("Customer Service Page - Coming Soon!");
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      );
    }

    // 2. Category Filter
    if (selectedCategory !== 'All Category') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 3. Offer Filter
    if (showOffersOnly) {
      result = result.filter(p => p.tags && p.tags.includes('offer'));
    }

    // 4. Rating Filter
    if (showHighRatedOnly) {
      result = result.filter(p => p.rating >= 4.0);
    }

    // 5. Best Selling Filter
    if (showBestSellingOnly) {
      result = result.filter(p => p.tags && p.tags.includes('best seller'));
    }

    // 6. Sorting
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

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return filteredProducts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredProducts]);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, showOffersOnly, showHighRatedOnly, showBestSellingOnly, sortBy]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        cartCount={cartCount} 
        onSearch={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        showOffersOnly={showOffersOnly}
        onToggleOffers={() => setShowOffersOnly(!showOffersOnly)}
        showHighRatedOnly={showHighRatedOnly}
        onToggleHighRated={() => setShowHighRatedOnly(!showHighRatedOnly)}
        showBestSellingOnly={showBestSellingOnly}
        onToggleBestSelling={() => setShowBestSellingOnly(!showBestSellingOnly)}
        onCustomerServiceClick={handleCustomerService}
      />
      
      <main className="flex-grow">
        {!searchQuery && <Hero />}
        
        <div className="container mx-auto px-4 py-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-bold text-gray-400">No products found matching your criteria.</h3>
              <button 
                onClick={() => {
                  setSelectedCategory('All Category');
                  setSearchQuery('');
                  setShowOffersOnly(false);
                  setShowHighRatedOnly(false);
                  setShowBestSellingOnly(false);
                }}
                className="mt-4 text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              {/* Sort Bar */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6">
                <span className="font-bold text-gray-900 text-sm shrink-0">Sort By</span>
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSortBy(option.id)}
                    className={`whitespace-nowrap text-sm font-medium transition-colors pb-1 border-b-2 ${
                      sortBy === option.id
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-700 border-transparent hover:text-blue-600 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {currentProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAdd={handleAddToCart} 
                  />
                ))}
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
      </main>
      
      <Footer />
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 px-6 flex justify-between z-50 shadow-lg pb-safe">
         <div className="flex flex-col items-center text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span className="text-[10px] font-medium mt-1">Home</span>
         </div>
         <div className="flex flex-col items-center text-gray-400">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
             <span className="text-[10px] font-medium mt-1">Cart</span>
         </div>
         <div className="flex flex-col items-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="text-[10px] font-medium mt-1">Account</span>
         </div>
      </div>
    </div>
  );
};

export default App;