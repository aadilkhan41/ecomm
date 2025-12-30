import React, { useState } from 'react';
import { Product } from '../types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CheckoutViewProps {
  items: CartItem[];
  onBack: () => void;
  onPlaceOrder: () => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ items, onBack, onPlaceOrder }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = 0;
  const taxes = 0;
  const discount = 10; // Mock discount based on image
  const total = subtotal + shipping + taxes - discount;
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <button 
        onClick={onBack} 
        className="mb-8 text-gray-500 font-bold text-sm hover:text-primary transition flex items-center gap-2"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Left Column: Billing Details Form */}
        <div className="lg:col-span-7 xl:col-span-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Billing Details</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">First Name *</label>
                <input 
                  type="text" 
                  placeholder="Ex. John" 
                  className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-white text-gray-900 placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Last Name *</label>
                <input 
                  type="text" 
                  placeholder="Ex. Doe" 
                  className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-white text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Company Name (Optional)</label>
              <input 
                type="text" 
                placeholder="Enter Company Name" 
                className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-white text-gray-900 placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Country *</label>
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-white text-gray-500 appearance-none cursor-pointer">
                  <option>Select Country</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>India</option>
                  <option>UAE</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Street Address *</label>
              <input 
                type="text" 
                placeholder="Enter Street Address" 
                className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-white text-gray-900 placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">City *</label>
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-white text-gray-500 appearance-none cursor-pointer">
                  <option>Select City</option>
                  <option>New York</option>
                  <option>London</option>
                  <option>Mumbai</option>
                  <option>Dubai</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">State *</label>
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-white text-gray-500 appearance-none cursor-pointer">
                  <option>Select State</option>
                  <option>NY</option>
                  <option>CA</option>
                  <option>TX</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Zip Code *</label>
              <input 
                type="text" 
                placeholder="Enter Zip Code" 
                className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-white text-gray-900 placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Phone *</label>
              <input 
                type="tel" 
                placeholder="Enter Phone Number" 
                className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-white text-gray-900 placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Email *</label>
              <input 
                type="email" 
                placeholder="Enter Email Address" 
                className="w-full border border-gray-200 rounded-lg px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-white text-gray-900 placeholder-gray-400"
              />
            </div>

          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="bg-white rounded-lg border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-500 text-sm font-medium">
                <span>Items</span>
                <span className="text-gray-900">{totalItems}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm font-medium">
                <span>Sub Total</span>
                <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm font-medium">
                <span>Shipping</span>
                <span className="text-gray-900">₹{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm font-medium">
                <span>Taxes</span>
                <span className="text-gray-900">₹{taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm font-medium">
                <span>Coupon Discount</span>
                <span className="text-gray-900">-₹{discount.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Total</span>
                <span className="text-xl font-bold text-gray-900">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={onPlaceOrder}
              className="w-full bg-primary text-white font-bold px-10 py-5 rounded-full transition-all shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 text-base"
            >
              Proceed to Payment
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutView;