import React from 'react';
import { X, Minus, Plus, Truck, CreditCard, Headphones } from 'lucide-react';
import { Product } from '../types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartViewProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number | string, delta: number) => void;
  onRemoveItem: (productId: number | string) => void;
  onCheckout: () => void;
  onClearCart: () => void;
}

const CartView: React.FC<CartViewProps> = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  onClearCart
}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = 0;
  const taxes = 0;
  const discount = 0; // Mock discount
  const total = subtotal + shipping + taxes - discount;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center font-sans">
        <div className="mb-6 flex justify-center text-gray-200">
          <Truck size={80} strokeWidth={1} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any healthy snacks yet. Explore our premium selection of dry fruits and seeds.</p>
        <button 
          onClick={onClearCart} 
          className="bg-primary text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-opacity-90 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        
        {/* Left Column: Cart Items */}
        <div className="flex-grow">
          {/* Table Header - Brand Row */}
          <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-900 text-white font-bold py-4 px-6 rounded-lg mb-6 shadow-sm">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-4 text-right pr-4">Quantity & Subtotal</div>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="relative flex flex-col md:grid md:grid-cols-12 gap-6 items-center bg-white p-6 md:px-6 md:py-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                
                {/* Remove Button (Top Right) */}
                <button 
                  onClick={() => onRemoveItem(item.product.id)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-primary hover:bg-primary/5 transition p-1.5 rounded-full z-10"
                  aria-label="Remove item"
                >
                  <X size={18} />
                </button>

                {/* Product Info */}
                <div className="col-span-6 flex items-center w-full gap-6">
                  <div className="h-24 w-24 bg-gray-50 rounded-xl flex-shrink-0 overflow-hidden p-2 border border-gray-100">
                    <img 
                      src={item.product.image} 
                      alt={item.product.title} 
                      className="w-full h-full object-contain mix-blend-multiply" 
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight text-lg mb-1 pr-6 md:pr-0">{item.product.title}</h3>
                    <p className="text-xs text-gray-500 font-medium">{item.product.category}</p>
                    <p className="text-xs text-gray-400">{item.product.weight}</p>
                    <p className="text-sm font-bold text-primary md:hidden mt-1">₹{item.product.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Price (Desktop) */}
                <div className="col-span-2 text-center font-bold text-gray-700 hidden md:block text-lg">
                  ₹{item.product.price.toFixed(2)}
                </div>

                {/* Quantity & Subtotal Combined Row */}
                <div className="col-span-4 flex items-center justify-between md:justify-end w-full gap-4 md:gap-12 px-2 md:px-0">
                  {/* Quantity Control - Styled like ProductView */}
                  <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 h-12 bg-white shadow-sm">
                    <button 
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="p-1 text-gray-500 hover:text-primary transition disabled:opacity-30"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="mx-3 font-bold text-gray-900 text-base w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="p-1 text-gray-500 hover:text-primary transition"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <span className="md:hidden text-gray-400 text-xs block mb-0.5">Subtotal</span>
                    <span className="font-bold text-gray-900 text-xl whitespace-nowrap">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon & Actions */}
          <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-100 pt-8">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Coupon Code" 
                className="border border-gray-200 rounded-full px-8 py-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full sm:w-72 transition-all shadow-sm"
              />
              <button className="bg-primary text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-opacity-90 transition whitespace-nowrap shadow-md transform hover:-translate-y-0.5 active:translate-y-0">
                Apply Coupon
              </button>
            </div>
            
            <button 
              onClick={onClearCart}
              className="text-gray-500 font-bold text-sm hover:text-primary transition underline decoration-gray-300 hover:decoration-primary underline-offset-4"
            >
              Clear Shopping Cart
            </button>
          </div>
          
          {/* Features Footer */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-dashed border-gray-200 pt-12">
            <div className="flex items-center gap-4 group">
              <div className="bg-accent p-3.5 rounded-full text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Free Shipping</h4>
                <p className="text-xs text-gray-500 mt-0.5">Free shipping for order above ₹1500</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="bg-accent p-3.5 rounded-full text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <CreditCard size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Flexible Payment</h4>
                <p className="text-xs text-gray-500 mt-0.5">Multiple secure payment options</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="bg-accent p-3.5 rounded-full text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Headphones size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">24x7 Support</h4>
                <p className="text-xs text-gray-500 mt-0.5">We support online all days</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Summary */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Items ({items.reduce((acc, i) => acc + i.quantity, 0)})</span>
                <span className="font-medium text-gray-900">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Taxes (Estimated)</span>
                <span className="font-medium text-gray-900">₹{taxes.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-primary text-sm font-medium">
                  <span>Coupon Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-8 pt-6 border-t border-gray-100">
              <span className="font-bold text-gray-900 text-lg">Total</span>
              <span className="font-bold text-2xl text-gray-900">₹{total.toFixed(2)}</span>
            </div>

            <button 
              onClick={onCheckout}
              className="w-full bg-primary hover:bg-opacity-90 text-white font-bold px-10 py-5 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 group text-base"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartView;