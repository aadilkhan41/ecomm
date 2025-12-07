import React, { useState } from 'react';
import { Search, ShoppingCart, MapPin, Menu, ChevronDown, Check, Phone } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onSearch: (query: string) => void;
  
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
  onSearch,
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

  const getButtonStyle = (isActive: boolean) => {
    return isActive 
      ? 'bg-[#014421] text-white border-[#014421] shadow-md' 
      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50';
  };

  return (
    <header className="bg-white w-full shadow-sm sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-livPurple via-primary to-livOrange text-white text-xs py-2 px-4 flex justify-center items-center hidden md:flex">
        <div className="flex items-center space-x-4">
          <span>Get 30% OFF your first order</span>
          <span className="opacity-50">|</span>
          <span>Healthy snacking delivered to your door</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-8">
            <button className="md:hidden p-2 text-black">
              <Menu size={24} />
            </button>
            <div className="flex flex-col cursor-pointer" onClick={() => window.location.reload()}>
              {/* Liv Logo simulation */}
              <h1 className="text-4xl font-bold tracking-tighter leading-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-livBlue via-livPurple to-primary">liv</span>
                <span className="text-primary">.</span>
              </h1>
              <span className="text-[10px] text-gray-400 hidden md:block uppercase tracking-widest pl-1">Premium Dry Fruits</span>
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

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:block relative">
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
          <div className="flex items-center space-x-2 md:space-x-6">
            <button className="flex items-center relative text-black hover:text-primary transition group">
               <div className="group-hover:bg-gray-50 rounded-full p-2 transition">
                 <ShoppingCart size={24} />
               </div>
               {cartCount > 0 && (
                 <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                   {cartCount}
                 </span>
               )}
            </button>
            <button className="hidden md:flex items-center space-x-2 pl-2 border-l border-gray-200">
               <div className="h-9 w-9 bg-gradient-to-br from-livBlue to-livPurple rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                 L
               </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Search (visible only on small screens) */}
        <div className="mt-4 md:hidden relative">
          <input 
            type="text" 
            placeholder="Search nuts & berries..." 
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 bg-gray-100 rounded-full text-sm outline-none focus:ring-1 focus:ring-primary"
          />
          <Search className="absolute right-3 top-2.5 text-black" size={18} />
        </div>
      </div>

      {/* Navigation / Filter Bar */}
      <nav className="border-t border-gray-100 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 py-3 flex-wrap">
            
            {/* 1. Category Dropdown */}
            <div className="relative flex-shrink-0">
              <button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={`text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-sm whitespace-nowrap transition border ${selectedCategory !== 'All Category' ? 'bg-[#014421] text-white border-[#014421]' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}
              >
                {selectedCategory} <ChevronDown size={14} />
              </button>
              
              {isCategoryOpen && (
                <div className="absolute left-0 top-full mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200">
                  <button
                    onClick={() => { onSelectCategory('All Category'); setIsCategoryOpen(false); }}
                    className={`w-full text-left px-5 py-3 text-sm hover:bg-gray-50 transition-colors ${selectedCategory === 'All Category' ? 'font-bold text-[#014421] bg-gray-50' : 'text-gray-600'}`}
                  >
                    All Category
                  </button>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { onSelectCategory(cat); setIsCategoryOpen(false); }}
                      className={`w-full text-left px-5 py-3 text-sm hover:bg-gray-50 transition-colors ${selectedCategory === cat ? 'font-bold text-[#014421] bg-gray-50' : 'text-gray-600'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Separator - Hidden on mobile when wrapping */}
            <div className="hidden md:block h-6 w-px bg-gray-200 mx-1 flex-shrink-0"></div>

            {/* 2. Offer Filter */}
            <button 
              onClick={onToggleOffers}
              className={`border text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200 whitespace-nowrap flex-shrink-0 ${getButtonStyle(showOffersOnly)}`}
            >
              Offer {showOffersOnly && <Check size={14} strokeWidth={3} />}
            </button>

            {/* 3. 4+ Rating Filter */}
            <button 
              onClick={onToggleHighRated}
              className={`border text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200 whitespace-nowrap flex-shrink-0 ${getButtonStyle(showHighRatedOnly)}`}
            >
              4+ Rating Product {showHighRatedOnly && <Check size={14} strokeWidth={3} />}
            </button>

            {/* 4. Best Selling Filter */}
            <button 
              onClick={onToggleBestSelling}
              className={`border text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200 whitespace-nowrap flex-shrink-0 ${getButtonStyle(showBestSellingOnly)}`}
            >
              Best Selling {showBestSellingOnly && <Check size={14} strokeWidth={3} />}
            </button>

            {/* Spacer to push Customer Service to right on desktop */}
            <div className="flex-grow hidden md:block"></div>

            {/* 5. Customer Service */}
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
    </header>
  );
};

export default Header;