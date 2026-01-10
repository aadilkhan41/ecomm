import React from 'react';
import { ArrowLeft, Lock } from 'lucide-react';

interface PrivacyViewProps {
  onBack: () => void;
}

const PrivacyView: React.FC<PrivacyViewProps> = ({ onBack }) => {
  return (
    <div className="container mx-auto px-4 py-12 font-sans max-w-4xl">
      <button 
        onClick={onBack} 
        className="mb-8 text-gray-500 font-bold text-sm hover:text-primary transition flex items-center gap-2"
      >
        <ArrowLeft size={16} /> Back to Home
      </button>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="bg-[#111111] p-8 md:p-12 text-white text-center">
          <Lock size={48} className="mx-auto mb-4 opacity-90 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-2 opacity-80 text-sm">Your privacy is our top priority.</p>
        </div>

        <div className="p-8 md:p-12 space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p>At Shri Shyam Enterprises, we are committed to protecting your personal information and your right to privacy. This policy explains what information we collect, how we use it, and what rights you have in relation to it.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p>We collect personal information that you provide to us when you register on the website, place an order, or contact us. This includes:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>Name and contact details (Email, Phone, Address)</li>
              <li>Payment Information (processed securely via our partners)</li>
              <li>Order history and preferences</li>
              <li>Device information and IP address (via cookies)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">How We Use Your Data</h2>
            <p>We use your information to:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>Process and deliver your orders</li>
              <li>Manage your account and provide customer support</li>
              <li>Send promotional emails (you can opt-out anytime)</li>
              <li>Improve our website functionality and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p>We implement a variety of security measures to maintain the safety of your personal information. Your sensitive data is encrypted using SSL technology. We do not sell or trade your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cookies</h2>
            <p>Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect some features of our site.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please reach out to our privacy team.</p>
          </section>

          <div className="pt-8 border-t border-gray-100 text-sm text-center">
            Questions? Contact us at <span className="text-primary font-bold">privacy@shrishyam.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyView;