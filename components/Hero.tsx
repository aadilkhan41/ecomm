import React from 'react';


const Hero: React.FC = () => {
    return (
        <section className="container mx-auto px-4 py-4 md:py-6">
            <div className="w-full relative">
                <img
                    src="/images/desktop-hero.jpg"
                    alt="Premium Dry Fruits"
                    className="w-full h-auto rounded-3xl object-cover border border-gray-200 md:border-0"
                />
            </div>
        </section>
    );
};

export default Hero;