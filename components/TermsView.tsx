import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

interface TermsViewProps {
  onBack: () => void;
}

const TermsView: React.FC<TermsViewProps> = ({ onBack }) => {
  return (
    <div className="container mx-auto px-4 py-12 font-sans max-w-4xl">
      <button 
        onClick={onBack} 
        className="mb-8 text-gray-500 font-bold text-sm hover:text-primary transition flex items-center gap-2"
      >
        <ArrowLeft size={16} /> Back to Home
      </button>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="bg-primary p-8 md:p-12 text-white text-center">
          <ShieldCheck size={48} className="mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold">Terms & Conditions</h1>
          <p className="mt-2 opacity-80 text-sm">Last Updated: October 2023</p>
        </div>

        <div className="p-8 md:p-12 space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p>Welcome to Shri Shyam Enterprises. By accessing our website and placing an order, you agree to be bound by these Terms and Conditions. Please read them carefully before proceeding with any transaction.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Product Information</h2>
            <p>We strive to provide accurate descriptions and images of our dry fruits, nuts, and seeds. However, since these are natural products, slight variations in color, size, and appearance may occur. All weights mentioned are approximate at the time of packing.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Pricing & Payments</h2>
            <p>All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise. We reserve the right to change prices at any time without prior notice. Payments must be made in full at the time of ordering via our secure payment gateway.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Shipping & Delivery</h2>
            <p>We aim to dispatch all orders within 24-48 hours. Delivery timelines depend on your location and the shipping partner. Shri Shyam Enterprises is not liable for delays caused by logistics partners, weather conditions, or other external factors.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Returns & Refunds</h2>
            <p>Due to the perishable nature of food items, we only accept returns if the product received is damaged, expired, or incorrect. Please notify us within 24 hours of delivery with photographic evidence to initiate a refund or replacement.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p>Shri Shyam Enterprises shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>
          </section>

          <div className="pt-8 border-t border-gray-100 text-sm italic">
            For further clarification on our terms, please contact our support team at support@shrishyam.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsView;