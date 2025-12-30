import React, { useState } from 'react';
import { Search, ShoppingCart, MapPin, Menu, ChevronDown, Check, Phone, X, Star, Tag, Award, ArrowLeft, Heart } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onSearch: (query: string) => void;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onLogoClick: () => void;
  
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  
  showOffersOnly: boolean;
  onToggleOffers: () => void;
  
  showHighRatedOnly: boolean;
  onToggleHighRated: () => void;

  showBestSellingOnly: boolean;
  onToggleBestSelling: () => void;
  
  onCustomerServiceClick: () => void;
}

const CATEGORY_OPTIONS = ['Common Dry Fruits', 'Exotic Dry Fruits', 'Sweets & Cooking', 'Seeds'];

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  wishlistCount,
  onSearch,
  onCartClick,
  onWishlistClick,
  onLogoClick,
  selectedCategory,
  onSelectCategory,
  showOffersOnly,
  onToggleOffers,
  showHighRatedOnly,
  onToggleHighRated,
  showBestSellingOnly,
  onToggleBestSelling,
  onCustomerServiceClick
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const getButtonStyle = (isActive: boolean) => {
    return isActive 
      ? 'bg-primary text-white border-primary shadow-md' 
      : 'bg-white text-gray-700 border-gray-200 hover:border-primary/30 hover:bg-gray-50';
  };

  const getMobileFilterStyle = (isActive: boolean) => {
    return isActive 
      ? 'bg-primary text-white border-primary' 
      : 'bg-gray-50 text-gray-700 border-gray-100';
  };

  return (
    <header className="bg-white w-full shadow-sm sticky top-0 z-50">
      {/* Top Banner - Desktop Only */}
      <div className="bg-gradient-to-r from-livPurple via-primary to-livOrange text-white text-xs py-2 px-4 flex justify-center items-center hidden md:flex">
        <div className="flex items-center space-x-4">
          <span>Get 30% OFF your first order</span>
          <span className="opacity-50">|</span>
          <span>Healthy snacking delivered to your door</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="relative min-h-[48px] flex items-center">
          {/* Default Header Row - Mobile/Desktop */}
          <div className={`w-full flex items-center justify-between gap-4 transition-all duration-300 ${isMobileSearchOpen ? 'opacity-0 invisible scale-95 pointer-events-none md:opacity-100 md:visible md:scale-100 md:pointer-events-auto' : 'opacity-100 visible scale-100'}`}>
            {/* Logo & Mobile Menu */}
            <div className="flex items-center gap-2 md:gap-8">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-black hover:bg-gray-50 rounded-full transition"
              >
                <Menu size={24} />
              </button>
              <div className="flex flex-col cursor-pointer group" onClick={onLogoClick}>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-none transition-transform group-active:scale-95">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-livBlue via-livPurple to-primary">Shri</span>
                  <span className="text-primary">.</span>
                </h1>
                <span className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-[0.15em] md:tracking-widest pl-0.5 md:pl-1 mt-0.5 md:mt-0 font-bold whitespace-nowrap">SHYAM ENTERPRISES</span>
              </div>

              {/* Location Selector (Desktop) */}
              <div className="hidden lg:flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-full border border-gray-100 cursor-pointer hover:bg-gray-100 transition">
                <MapPin size={18} className="text-black" />
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] text-gray-500">Delivery to</span>
                  <span className="font-semibold text-sm text-black">Abu Dhabi</span>
                </div>
                <ChevronDown size={14} className="text-black ml-1" />
              </div>
            </div>

            {/* Search Bar - Desktop Only */}
            <div className="flex-1 max-w-2xl hidden md:block relative mx-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search for nuts, berries, seeds..." 
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full pl-5 pr-12 py-3 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-full text-sm transition-all outline-none placeholder-gray-400"
                />
                <button className="absolute right-2 top-1.5 bottom-1.5 bg-primary text-white rounded-full w-9 flex items-center justify-center hover:bg-opacity-90 transition">
                   <Search size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1 md:space-x-4 lg:space-x-6">
              <button 
                onClick={() => setIsMobileSearchOpen(true)}
                className="md:hidden p-2 text-black hover:text-primary transition"
              >
                <Search size={24} />
              </button>

              <button 
                onClick={onWishlistClick}
                className="flex items-center relative text-black hover:text-primary transition group"
              >
                 <div className="group-hover:bg-gray-50 rounded-full p-2 transition">
                   <Heart size={24} className={wishlistCount > 0 ? "fill-primary text-primary" : ""} />
                 </div>
                 {wishlistCount > 0 && (
                   <span className="absolute top-0 right-0 bg-livPurple text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                     {wishlistCount}
                   </span>
                 )}
              </button>

              <button 
                onClick={onCartClick}
                className="flex items-center relative text-black hover:text-primary transition group"
              >
                 <div className="group-hover:bg-gray-50 rounded-full p-2 transition">
                   <ShoppingCart size={24} />
                 </div>
                 {cartCount > 0 && (
                   <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                     {cartCount}
                   </span>
                 )}
              </button>
            </div>
          </div>

          {/* Mobile Full Search Bar Overlay */}
          <div className={`md:hidden absolute inset-0 bg-white flex items-center gap-3 transition-all duration-300 ${isMobileSearchOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1 pointer-events-none'}`}>
            <button 
              onClick={() => {
                setIsMobileSearchOpen(false);
                onSearch('');
              }}
              className="p-2 text-gray-500 hover:text-black transition"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="relative flex-1">
              <input 
                autoFocus={isMobileSearchOpen}
                type="text" 
                placeholder="Search snacks..." 
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-5 pr-12 py-2.5 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-full text-sm transition-all outline-none placeholder-gray-400"
              />
              <button className="absolute right-1.5 top-1 bottom-1 bg-primary text-white rounded-full w-8 flex items-center justify-center">
                 <Search size={14} className="text-white" />
              </button>
            </div>
            <button 
              onClick={() => setIsMobileSearchOpen(false)}
              className="p-2 text-gray-400 hover:text-black transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation / Filter Bar - Desktop Only */}
      <nav className="border-t border-gray-100 bg-white hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 py-3 flex-wrap">
            
            {/* Category Dropdown */}
            <div className="relative flex-shrink-0">
              <button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={`text-sm font-bold px-8 py-3 rounded-full flex items-center gap-2 shadow-sm whitespace-nowrap transition border ${selectedCategory !== 'All Category' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-200 hover:border-primary/30'}`}
              >
                {selectedCategory} <ChevronDown size={14} />
              </button>
              
              {isCategoryOpen && (
                <div className="absolute left-0 top-full mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200">
                  <button
                    onClick={() => { onSelectCategory('All Category'); setIsCategoryOpen(false); }}
                    className={`w-full text-left px-5 py-3 text-sm hover:bg-gray-50 transition-colors ${selectedCategory === 'All Category' ? 'font-bold text-primary bg-gray-50' : 'text-gray-600'}`}
                  >
                    All Category
                  </button>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { onSelectCategory(cat); setIsCategoryOpen(false); }}
                      className={`w-full text-left px-5 py-3 text-sm hover:bg-gray-50 transition-colors ${selectedCategory === cat ? 'font-bold text-primary bg-gray-50' : 'text-gray-600'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden md:block h-6 w-px bg-gray-200 mx-1 flex-shrink-0"></div>

            <button 
              onClick={onToggleOffers}
              className={`border text-sm font-bold px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-200 whitespace-nowrap flex-shrink-0 ${getButtonStyle(showOffersOnly)}`}
            >
              Offer {showOffersOnly && <Check size={14} strokeWidth={3} />}
            </button>

            <button 
              onClick={onToggleHighRated}
              className={`border text-sm font-bold px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-200 whitespace-nowrap flex-shrink-0 ${getButtonStyle(showHighRatedOnly)}`}
            >
              4+ Rating Product {showHighRatedOnly && <Check size={14} strokeWidth={3} />}
            </button>

            <button 
              onClick={onToggleBestSelling}
              className={`border text-sm font-bold px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-200 whitespace-nowrap flex-shrink-0 ${getButtonStyle(showBestSellingOnly)}`}
            >
              Best Selling {showBestSellingOnly && <Check size={14} strokeWidth={3} />}
            </button>

            <div className="flex-grow hidden md:block"></div>

            <button 
              onClick={onCustomerServiceClick}
              className="text-gray-500 hover:text-primary font-bold text-sm flex items-center gap-2 whitespace-nowrap ml-auto md:ml-0 flex-shrink-0 px-2"
            >
              <Phone size={16} />
              <span>Customer Service</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          <div className="absolute left-0 top-0 bottom-0 w-[80%] max-sm:w-[85%] bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex flex-col cursor-pointer group" onClick={() => { onLogoClick(); setIsMobileMenuOpen(false); }}>
                <h2 className="text-3xl font-bold tracking-tighter leading-none">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-livBlue via-livPurple to-primary">Shri</span>
                  <span className="text-primary">.</span>
                </h2>
                <span className="text-[8px] text-gray-400 uppercase tracking-[0.15em] font-bold mt-0.5">SHYAM ENTERPRISES</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-black transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <div className="px-6 mb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Account</h3>
                <div className="space-y-1">
                  <button 
                    onClick={() => { onWishlistClick(); setIsMobileMenuOpen(false); }}
                    className="w-full text-left px-8 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Heart size={18} className={wishlistCount > 0 ? "text-primary fill-primary" : "text-gray-400"} />
                      <span>My Wishlist</span>
                    </div>
                    {wishlistCount > 0 && <span className="bg-livPurple text-white text-[10px] px-2 py-0.5 rounded-full">{wishlistCount}</span>}
                  </button>
                </div>
              </div>

              <div className="px-6 mb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Categories</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => { onSelectCategory('All Category'); setIsMobileMenuOpen(false); }}
                    className={`w-full text-left px-8 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${selectedCategory === 'All Category' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <span>All Category</span>
                    {selectedCategory === 'All Category' && <Check size={16} />}
                  </button>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { onSelectCategory(cat); setIsMobileMenuOpen(false); }}
                      className={`w-full text-left px-8 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${selectedCategory === cat ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-6 mb-8">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Filters</h3>
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={onToggleOffers}
                    className={`flex items-center gap-3 px-8 py-3 rounded-xl border text-sm font-bold transition-all ${getMobileFilterStyle(showOffersOnly)}`}
                  >
                    <Tag size={18} className={showOffersOnly ? 'text-white' : 'text-primary'} />
                    <span>Special Offers</span>
                    {showOffersOnly && <Check size={16} className="ml-auto" />}
                  </button>
                  
                  <button 
                    onClick={onToggleHighRated}
                    className={`flex items-center gap-3 px-8 py-3 rounded-xl border text-sm font-bold transition-all ${getMobileFilterStyle(showHighRatedOnly)}`}
                  >
                    <Star size={18} className={showHighRatedOnly ? 'text-white' : 'text-primary'} fill={showHighRatedOnly ? 'white' : 'none'} />
                    <span>4+ Rating Products</span>
                    {showHighRatedOnly && <Check size={16} className="ml-auto" />}
                  </button>
                  
                  <button 
                    onClick={onToggleBestSelling}
                    className={`flex items-center gap-3 px-8 py-3 rounded-xl border text-sm font-bold transition-all ${getMobileFilterStyle(showBestSellingOnly)}`}
                  >
                    <Award size={18} className={showBestSellingOnly ? 'text-white' : 'text-livPurple'} />
                    <span>Best Selling</span>
                    {showBestSellingOnly && <Check size={16} className="ml-auto" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;