import React from 'react';
import { Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  // Helper to get badge style
  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'sale': return 'bg-badgeRed text-white';
      case 'frozen': return 'bg-livBlue text-white';
      case 'discount': return 'bg-secondary text-white';
      case 'organic': return 'bg-badgeGreen text-white';
      case 'new': return 'bg-livPurple text-white';
      default: return 'bg-gray-800 text-white';
    }
  };

  return (
    <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)] hover:border-primary/20 transition-all duration-300 group relative flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
        {product.badges.map((badge, index) => (
          <span 
            key={index} 
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm ${getBadgeStyle(badge.type)}`}
          >
            {badge.text}
          </span>
        ))}
      </div>

      {/* Image Area */}
      <div className="w-full aspect-square mb-4 flex items-center justify-center overflow-hidden rounded-2xl bg-gray-50/50">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition duration-500 ease-out"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-sm font-bold text-black leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <p className="text-xs text-gray-400 mt-1 font-medium">{product.weight}</p>

        {/* Rating */}
        <div className="flex items-center mt-2 mb-3">
          <Star size={12} className="text-secondary fill-secondary" />
          <span className="text-xs text-gray-500 ml-1 font-semibold">4.8 (120)</span>
        </div>

        {/* Price & Add Button */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-black">₹{product.price.toFixed(0)}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toFixed(0)}</span>
              )}
            </div>
          </div>
          
          <button 
            onClick={() => onAdd(product)}
            className="px-4 py-2 bg-gray-100 hover:bg-secondary hover:text-black text-black text-xs font-bold rounded-full transition-all duration-300 shadow-sm whitespace-nowrap active:scale-95"
            aria-label="Add to cart"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;