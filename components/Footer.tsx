import React from 'react';
import { Facebook, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8 font-sans">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tighter">liv.</h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              We're based in Palo-Alto where our doors first opened in 2015. We're part of a vibrant creative community and love what we do.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Company</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Project Protection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-white font-bold mb-6">About</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Store</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6">Sign up to our Newsletter</h3>
            <div className="flex flex-col sm:flex-row gap-2 mb-8">
              <input 
                type="email" 
                placeholder="E-mail" 
                className="bg-transparent border border-gray-700 rounded text-sm px-4 py-2.5 w-full focus:outline-none focus:border-white transition-colors text-white placeholder-gray-500"
              />
              <button className="bg-white text-black font-bold text-xs px-6 py-2.5 rounded hover:bg-gray-200 transition-colors uppercase tracking-wider">
                Subscribe
              </button>
            </div>
            <div className="flex items-center gap-6 text-white">
              <a href="#" className="hover:text-gray-300 transition-colors"><Facebook size={20} fill="currentColor" strokeWidth={0} /></a>
              <a href="#" className="hover:text-gray-300 transition-colors"><Twitter size={20} fill="currentColor" strokeWidth={0} /></a>
              <a href="#" className="hover:text-gray-300 transition-colors"><Linkedin size={20} fill="currentColor" strokeWidth={0} /></a>
              <a href="#" className="hover:text-gray-300 transition-colors"><Github size={20} fill="currentColor" strokeWidth={0} /></a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            Copyright © 2016 Ease Corp. Created by KK UI Store
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
