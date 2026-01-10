import React from 'react';
import { Facebook, Twitter, Linkedin, Github } from 'lucide-react';

interface FooterProps {
  onCartClick: () => void;
  onWishlistClick: () => void;
  onTermsClick: () => void;
  onPrivacyClick: () => void;
  onFAQClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ 
  onCartClick, 
  onWishlistClick, 
  onTermsClick, 
  onPrivacyClick, 
  onFAQClick 
}) => {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8 font-sans">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tighter cursor-pointer hover:text-primary transition-colors">Shri.</h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Premium quality dry fruits and healthy snacks delivered across India. We believe in nature's purity and taste.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Company</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <button onClick={onTermsClick} className="hover:text-primary transition-colors text-left">Terms & Conditions</button>
              </li>
              <li>
                <button onClick={onPrivacyClick} className="hover:text-primary transition-colors text-left">Privacy Policy</button>
              </li>
              <li>
                <button onClick={onFAQClick} className="hover:text-primary transition-colors text-left">FAQs</button>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <button onClick={onCartClick} className="hover:text-primary transition-colors text-left">My Cart</button>
              </li>
              <li>
                <button onClick={onWishlistClick} className="hover:text-primary transition-colors text-left">My Wishlist</button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Stay Healthy</h3>
            <p className="text-gray-400 text-xs mb-4">Sign up for healthy tips and special offers!</p>
            <div className="flex flex-col gap-2 mb-8">
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="E-mail" 
                  className="bg-white/5 border border-gray-800 rounded-full text-sm px-5 py-3 w-full focus:outline-none focus:border-primary transition-colors text-white placeholder-gray-500"
                />
                <button className="bg-primary text-white font-bold px-6 py-3 rounded-full text-xs hover:bg-opacity-90 transition-all uppercase tracking-wider whitespace-nowrap">
                  Join
                </button>
              </div>
            </div>
            <div className="flex items-center gap-6 text-white">
              <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} fill="currentColor" strokeWidth={0} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} fill="currentColor" strokeWidth={0} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Linkedin size={20} fill="currentColor" strokeWidth={0} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Github size={20} fill="currentColor" strokeWidth={0} /></a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            Copyright © 2023 Shri Shyam Enterprises. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;