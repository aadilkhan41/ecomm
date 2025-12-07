import React, { useState } from 'react';
import { ChevronDown, SlidersHorizontal, Check, X } from 'lucide-react';
import { SortOption } from '../types';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  priceRange: [number, number] | null;
  onPriceRangeChange: (range: [number, number] | null) => void;
  showOffersOnly: boolean;
  onToggleOffers: () => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  showOffersOnly,
  onToggleOffers,
  minRating,
  onRatingChange
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handlePriceClick = (min: number, max: number) => {
    if (priceRange && priceRange[0] === min && priceRange[1] === max) {
      onPriceRangeChange(null);
    } else {
      onPriceRangeChange([min, max]);
    }
    setActiveDropdown(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 relative z-40">
      <div className="flex flex-col gap-5">
        
        {/* Title Section */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#014421]">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h2>
          
          {/* Mobile Sort Trigger */}
          <div className="md:hidden relative">
            <button 
              onClick={() => toggleDropdown('mobileSort')}
              className="flex items-center gap-2 text-sm font-bold text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm"
            >
               <span>Sort</span>
               <ChevronDown size={14} />
            </button>
            {activeDropdown === 'mobileSort' && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                {['default', 'price-asc', 'price-desc', 'rating'].map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      onSortChange(option as SortOption);
                      setActiveDropdown(null);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 ${sortBy === option ? 'font-bold text-primary' : 'text-gray-700'}`}
                  >
                    {option === 'default' ? 'Recommended' : 
                     option === 'price-asc' ? 'Price: Low to High' :
                     option === 'price-desc' ? 'Price: High to Low' : 'Top Rated'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Left Side: Filter Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
             {/* Mobile Filter Icon */}
             <button className="md:hidden p-2.5 text-black bg-white border border-gray-200 rounded-lg flex-shrink-0 shadow-sm">
                <SlidersHorizontal size={18} />
             </button>

            {/* Categories Dropdown */}
            <div className="relative flex-shrink-0">
              <button 
                onClick={() => toggleDropdown('category')}
                className={`text-sm font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm whitespace-nowrap transition border ${selectedCategory !== 'All' ? 'bg-[#014421] text-white border-[#014421]' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}
              >
                {selectedCategory === 'All' ? 'All Categories' : selectedCategory} <ChevronDown size={16} />
              </button>
              
              {activeDropdown === 'category' && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 max-h-64 overflow-y-auto">
                  {['All', ...categories].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        onSelectCategory(cat);
                        setActiveDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 ${selectedCategory === cat ? 'font-bold text-primary bg-gray-50' : 'text-gray-700'}`}
                    >
                      {cat === 'All' ? 'All Categories' : cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Price Filter */}
            <div className="relative flex-shrink-0">
              <button 
                onClick={() => toggleDropdown('price')}
                className={`border text-sm font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 transition whitespace-nowrap shadow-sm ${priceRange ? 'bg-accent border-primary text-primary' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              >
                Price {priceRange ? `(₹${priceRange[0]}-₹${priceRange[1]})` : ''} <ChevronDown size={14} />
              </button>
              
              {activeDropdown === 'price' && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  <button onClick={() => handlePriceClick(0, 200)} className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 text-gray-700">Under ₹200</button>
                  <button onClick={() => handlePriceClick(200, 500)} className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 text-gray-700">₹200 - ₹500</button>
                  <button onClick={() => handlePriceClick(500, 1000)} className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 text-gray-700">₹500 - ₹1000</button>
                  <button onClick={() => handlePriceClick(1000, 20000)} className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 text-gray-700">Above ₹1000</button>
                  {priceRange && (
                    <div className="border-t border-gray-100 p-2">
                      <button onClick={() => { onPriceRangeChange(null); setActiveDropdown(null); }} className="w-full text-center text-xs text-red-500 font-bold py-1">Clear Filter</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Review Filter */}
            <button 
              onClick={() => onRatingChange(minRating === 4 ? 0 : 4)}
              className={`border text-sm font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 transition whitespace-nowrap flex-shrink-0 shadow-sm ${minRating === 4 ? 'bg-accent border-primary text-primary' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
              Review {minRating === 4 ? '(4★+)' : ''} {minRating === 4 ? <Check size={14}/> : <ChevronDown size={14} className="text-gray-400" />}
            </button>

            {/* Offer Filter */}
            <button 
              onClick={onToggleOffers}
              className={`border text-sm font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 transition whitespace-nowrap flex-shrink-0 shadow-sm ${showOffersOnly ? 'bg-accent border-primary text-primary' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
              Offer {showOffersOnly ? <Check size={14}/> : <ChevronDown size={14} className="text-gray-400" />}
            </button>
          </div>

          {/* Right Side: Desktop Sort */}
          <div className="hidden md:block relative">
            <button 
              onClick={() => toggleDropdown('sort')}
              className="bg-white border border-gray-300 text-black text-sm font-bold px-5 py-2.5 rounded-lg flex items-center gap-8 hover:border-gray-400 transition shadow-sm"
            >
               Sort by: {sortBy === 'default' ? 'Recommended' : sortBy === 'price-asc' ? 'Low to High' : sortBy === 'price-desc' ? 'High to Low' : 'Rating'} 
               <ChevronDown size={14} />
            </button>
            
            {activeDropdown === 'sort' && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                {[
                  { label: 'Recommended', value: 'default' },
                  { label: 'Price: Low to High', value: 'price-asc' },
                  { label: 'Price: High to Low', value: 'price-desc' },
                  { label: 'Top Rated', value: 'rating' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSortChange(option.value as SortOption);
                      setActiveDropdown(null);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 ${sortBy === option.value ? 'font-bold text-primary bg-gray-50' : 'text-gray-700'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;