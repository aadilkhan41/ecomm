import React from 'react';
import { Star, Plus, Minus, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  quantity?: number;
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
  onClick?: (product: Product) => void;
  isLiked?: boolean;
  onToggleLike?: (productId: string | number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  quantity = 0, 
  onAdd, 
  onRemove, 
  onClick,
  isLiked = false,
  onToggleLike
}) => {

  // Helper to get badge style
  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'sale': return 'bg-badgeRed text-white';
      case 'frozen': return 'bg-livBlue text-white';
      case 'discount': return 'bg-livPurple text-white';
      case 'organic': return 'bg-badgeGreen text-white';
      case 'new': return 'bg-primary text-white';
      default: return 'bg-gray-800 text-white';
    }
  };

  return (
    <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)] hover:border-primary/20 transition-all duration-300 group relative flex flex-col h-full">
      {/* Badges (Top Left) */}
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

      {/* Like Button (Top Right) */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleLike && onToggleLike(product.id);
        }}
        className="absolute top-4 right-4 z-10 h-9 w-9 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-all duration-200 active:scale-90 group/like"
      >
        <Heart 
          size={18} 
          className={`transition-colors duration-300 ${isLiked ? 'text-primary fill-primary' : 'text-gray-400 group-hover/like:text-primary'}`} 
        />
      </button>

      {/* Image Area */}
      <div 
        onClick={() => onClick && onClick(product)}
        className="w-full aspect-square mb-4 flex items-center justify-center overflow-hidden rounded-2xl bg-gray-50/50 cursor-pointer"
      >
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition duration-500 ease-out"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h3 
          onClick={() => onClick && onClick(product)}
          className="text-sm font-bold text-black leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors cursor-pointer"
        >
          {product.title}
        </h3>
        <p className="text-xs text-gray-400 mt-1 font-medium">{product.weight}</p>

        {/* Rating */}
        <div className="flex items-center mt-2 mb-3">
          <Star size={12} className="text-primary fill-primary" />
          <span className="text-xs text-gray-500 ml-1 font-semibold">{product.rating} ({product.reviews})</span>
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
          
          <div className="flex items-center">
            {quantity === 0 ? (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd(product);
                }}
                className="h-10 w-10 flex items-center justify-center bg-gray-100 hover:bg-primary hover:text-white text-black rounded-full transition-all duration-300 shadow-sm active:scale-90"
                aria-label="Add to cart"
              >
                <Plus size={20} />
              </button>
            ) : (
              <div className="flex items-center bg-primary text-white rounded-full p-1 shadow-md transition-all duration-300 animate-in zoom-in-75">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(product.id);
                  }}
                  className="h-8 w-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-3 text-sm font-bold min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd(product);
                  }}
                  className="h-8 w-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;