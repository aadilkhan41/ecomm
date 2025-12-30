import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-4 md:py-6">
      {/* Brand Gradient Background */}
      <div className="bg-gradient-to-br from-[#6A368B] via-[#E72B56] to-[#F48422] rounded-3xl overflow-hidden relative min-h-[200px] md:min-h-[300px] flex items-center shadow-lg">
        
        {/* Abstract Shapes/Texture */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full p-8 md:p-14 items-center">
          <div className="text-white space-y-5 md:max-w-lg">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-1 border border-white/20">
              Premium Selection
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-none tracking-tight">
              Nature's <br/>
              <span className="text-white opacity-90">Superfoods.</span>
            </h2>
            <p className="text-white/90 text-sm md:text-base font-medium max-w-sm leading-relaxed">
              Hand-picked almonds, cashews, pistachios and more. The finest quality dry fruits delivered fresh to your home.
            </p>
            <button className="mt-4 bg-white text-black font-bold px-8 py-3 rounded-full text-sm hover:bg-primary hover:text-white transition-all duration-300 shadow-lg flex items-center gap-2 w-fit transform hover:-translate-y-1">
              Shop Healthy
              <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="hidden md:flex justify-end items-center h-full relative">
            {/* Image */}
            <img 
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop" 
              alt="Dry Fruit Basket" 
              className="relative z-10 object-cover rounded-2xl shadow-2xl hover:scale-105 transition duration-700 animate-in fade-in slide-in-from-right-10"
              style={{ maxHeight: '320px', maxWidth: '400px', transform: 'rotate(-5deg)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;