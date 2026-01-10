import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQViewProps {
  onBack: () => void;
}

const FAQ_DATA = [
  {
    question: "Where do you source your dry fruits from?",
    answer: "We source our premium dry fruits directly from the best farms across India and internationally (like California for Almonds and Middle East for Dates) to ensure the highest quality and freshness."
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes! We offer free standard shipping on all orders above ₹1500. For orders below this amount, a flat shipping fee is applied at checkout."
  },
  {
    question: "How should I store my dry fruits?",
    answer: "To maintain freshness, we recommend storing them in an airtight container in a cool, dry place. For longer shelf life (especially in humid weather), keeping them in the refrigerator is ideal."
  },
  {
    question: "What is your return policy?",
    answer: "Since food items are perishable, we only accept returns if the product is damaged or incorrect. Please contact us within 24 hours of delivery with photos of the issue."
  },
  {
    question: "Do you have gift packaging options?",
    answer: "Absolutely! We offer various gift wrapping options including premium boxes and hampers, perfect for festivals, weddings, and corporate gifting."
  },
  {
    question: "Can I track my order?",
    answer: "Yes, once your order is dispatched, you will receive a tracking link via email and SMS to monitor the real-time status of your delivery."
  },
  {
    question: "Are your products organic?",
    answer: "While not all our products are certified organic, we prioritize natural processing without added preservatives or artificial colors to keep the nutrition intact."
  }
];

const FAQView: React.FC<FAQViewProps> = ({ onBack }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="container mx-auto px-4 py-12 font-sans max-w-3xl">
      <button 
        onClick={onBack} 
        className="mb-8 text-gray-500 font-bold text-sm hover:text-primary transition flex items-center gap-2"
      >
        <ArrowLeft size={16} /> Back to Home
      </button>

      <div className="text-center mb-12">
        <div className="bg-accent h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary shadow-sm">
          <HelpCircle size={32} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-500">Everything you need to know about our products and services.</p>
      </div>

      <div className="space-y-4">
        {FAQ_DATA.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className={`border rounded-2xl transition-all duration-300 ${isOpen ? 'border-primary/30 shadow-md bg-white' : 'border-gray-100 bg-gray-50/50 hover:bg-white'}`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`font-bold text-lg transition-colors ${isOpen ? 'text-primary' : 'text-gray-800'}`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 ml-4 h-8 w-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-white text-gray-400 border border-gray-100'}`}>
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 bg-gray-900 rounded-3xl p-8 md:p-12 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="opacity-70 mb-8 max-w-md mx-auto">Our customer support team is here to help you. Reach out to us anytime!</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition">
            Chat With Us
          </button>
          <button className="bg-white/10 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition backdrop-blur-sm border border-white/20">
            Email Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQView;