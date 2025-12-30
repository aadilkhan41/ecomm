import React from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface WishlistViewProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onRemoveFromCart: (productId: string | number, delta: number) => void;
  onToggleLike: (productId: string | number) => void;
  onBack: () => void;
  cartItems: { product: Product; quantity: number }[];
}

const WishlistView: React.FC<WishlistViewProps> = ({ 
  products, 
  onProductClick, 
  onAddToCart, 
  onRemoveFromCart,
  onToggleLike, 
  onBack,
  cartItems
}) => {
  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack} 
          className="text-gray-500 font-bold text-sm hover:text-primary transition flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Heart className="text-primary fill-primary" size={28} /> My Wishlist
        </h2>
        <div className="w-24 md:block hidden"></div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="mb-6 flex justify-center text-gray-300">
            <Heart size={80} strokeWidth={1} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Save your favorite healthy snacks and dry fruits here to buy them later.
          </p>
          <button 
            onClick={onBack} 
            className="bg-primary text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-opacity-90 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Explore Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {products.map((product) => {
            const qty = cartItems.find(item => item.product.id === product.id)?.quantity || 0;
            return (
              <ProductCard 
                key={product.id} 
                product={product} 
                quantity={qty}
                onAdd={(p) => onAddToCart(p, 1)} 
                onRemove={(productId) => onRemoveFromCart(productId, -1)}
                onClick={onProductClick}
                isLiked={true}
                onToggleLike={onToggleLike}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WishlistView;