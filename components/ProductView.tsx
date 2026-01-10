import React, { useState } from 'react';
import { Star, Heart, Minus, Plus, Facebook, Twitter, Instagram, ArrowLeft, Share2 } from 'lucide-react';
import { Product } from '../types';

interface ProductViewProps {
    product: Product;
    onBack: () => void;
    onAddToCart: (product: Product, quantity: number) => void;
    isLiked?: boolean;
    onToggleLike?: () => void;
}

const ProductView: React.FC<ProductViewProps> = ({
    product,
    onBack,
    onAddToCart,
    isLiked = false,
    onToggleLike
}) => {
    const [quantity, setQuantity] = useState(1);


    // Mock options for the design
    const [selectedSize, setSelectedSize] = useState('Small');
    const [selectedMaterial, setSelectedMaterial] = useState('Pouch');
    const [selectedColor, setSelectedColor] = useState('white');



    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.title,
                text: product.short_description || `Check out this ${product.title} from Liv!`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert("Sharing link: " + window.location.href);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6 md:py-12 font-sans bg-white">
            {/* Breadcrumb & Back Button */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <button onClick={onBack} className="hover:text-primary flex items-center gap-1">
                    <ArrowLeft size={16} /> Back
                </button>
                <span>/</span>
                <span className="text-gray-400">{product.category}</span>
                <span>/</span>
                <span className="text-gray-800 font-medium truncate max-w-[200px] md:max-w-none">{product.title}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                {/* Left Column: Image Gallery */}
                <div className="space-y-6">
                    <div className="bg-[#F9F9F9] rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-8 relative group">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition duration-500"
                        />

                        {/* Badges (Top Left) */}
                        {product.badges.length > 0 && (
                            <span className="absolute top-6 left-6 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                {product.badges[0].text}
                            </span>
                        )}

                        {/* Top Right Actions (Like & Share) */}
                        <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
                            <button
                                onClick={onToggleLike}
                                className="h-11 w-11 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 active:scale-90 group/like"
                                aria-label="Like product"
                            >
                                <Heart
                                    size={22}
                                    className={`transition-all duration-300 ${isLiked ? 'text-primary fill-primary scale-110' : 'text-gray-400 group-hover/like:text-primary'}`}
                                />
                            </button>
                            <button
                                onClick={handleShare}
                                className="h-11 w-11 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 active:scale-90 group/share"
                                aria-label="Share product"
                            >
                                <Share2
                                    size={20}
                                    className="text-gray-400 group-hover/share:text-livBlue transition-colors"
                                />
                            </button>
                        </div>
                    </div>


                </div>

                {/* Right Column: Product Details */}
                <div className="flex flex-col">
                    <span className="text-gray-400 text-sm font-medium mb-2">{product.category}</span>

                    <div className="flex items-start justify-between gap-4 mb-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                            {product.title}
                        </h1>
                        {product.stockStatus !== 'out_of_stock' && (
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200 whitespace-nowrap mt-2">
                                In Stock
                            </span>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex text-primary">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-gray-300"} />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500 font-medium">
                            {product.rating} ({product.reviews} Review)
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-end gap-3 mb-8">
                        <span className="text-4xl font-bold text-gray-900">₹{product.price.toFixed(0)}</span>
                        {product.originalPrice && (
                            <span className="text-xl text-gray-400 line-through mb-1">₹{product.originalPrice.toFixed(0)}</span>
                        )}
                    </div>

                    <div className="prose prose-sm text-gray-500 mb-8 leading-relaxed">
                        <p>{product.description || "Our premium products are hand-picked from the finest farms to ensure superior quality and natural taste. Packed with essential nutrients, they make the perfect healthy snack for any time of day."}</p>
                    </div>

                    {/* Selectors Section */}
                    <div className="space-y-6 mb-8 border-t border-b border-gray-100 py-6">

                        {/* Pack Size */}
                        <div>
                            <span className="block text-sm font-bold text-gray-900 mb-3">Pack Size</span>
                            <div className="flex flex-wrap gap-3">
                                {['Small (100g)', 'Medium (250g)', 'Large (500g)'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${selectedSize === size
                                                ? 'bg-primary text-white shadow-md scale-105'
                                                : 'bg-white border border-gray-200 text-gray-600 hover:border-primary/40'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Packaging */}
                        <div>
                            <span className="block text-sm font-bold text-gray-900 mb-3">Packaging</span>
                            <div className="flex flex-wrap gap-3">
                                {['Pouch', 'Jar', 'Gift Box', 'Tin'].map((mat) => (
                                    <button
                                        key={mat}
                                        onClick={() => setSelectedMaterial(mat)}
                                        className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${selectedMaterial === mat
                                                ? 'bg-primary text-white shadow-md scale-105'
                                                : 'bg-white border border-gray-200 text-gray-600 hover:border-primary/40'
                                            }`}
                                    >
                                        {mat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color/Variant */}
                        <div>
                            <span className="block text-sm font-bold text-gray-900 mb-3">Gift Wrap Color</span>
                            <div className="flex gap-3">
                                {[
                                    { id: 'white', class: 'bg-gray-100 border-gray-300' },
                                    { id: 'brown', class: 'bg-[#8B4513]' },
                                    { id: 'pink', class: 'bg-primary' },
                                    { id: 'blue', class: 'bg-livBlue' },
                                    { id: 'black', class: 'bg-black' }
                                ].map((color) => (
                                    <button
                                        key={color.id}
                                        onClick={() => setSelectedColor(color.id)}
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${color.class} ${selectedColor === color.id ? 'ring-2 ring-offset-2 ring-primary scale-110' : 'border-transparent'}`}
                                        aria-label={`Select ${color.id} color`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 h-14 w-fit">
                            <button onClick={() => handleQuantityChange(-1)} className="p-1 text-gray-500 hover:text-primary transition">
                                <Minus size={18} />
                            </button>
                            <span className="mx-4 font-bold text-lg w-6 text-center">{quantity}</span>
                            <button onClick={() => handleQuantityChange(1)} className="p-1 text-gray-500 hover:text-primary transition">
                                <Plus size={18} />
                            </button>
                        </div>

                        <button
                            onClick={() => onAddToCart(product, quantity)}
                            className="flex-1 bg-primary hover:bg-opacity-90 text-white font-bold rounded-full px-10 py-4 text-sm transition-all shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-1"
                        >
                            Add To Cart
                        </button>

                        <button className="flex-1 bg-black hover:bg-gray-900 text-white font-bold rounded-full px-10 py-4 text-sm transition-all shadow-lg transform hover:-translate-y-1">
                            Buy Now
                        </button>
                    </div>

                    {/* Metadata */}
                    <div className="text-sm space-y-2 text-gray-500">
                        <p><span className="font-bold text-gray-900 w-20 inline-block">SKU:</span> PLTC87654ABC</p>
                        <p><span className="font-bold text-gray-900 w-20 inline-block">Tags:</span> {product.tags?.join(', ') || 'Healthy, Snack, Premium'}</p>
                        <div className="flex items-center gap-4 mt-4 pt-4">
                            <span className="font-bold text-gray-900">Share:</span>
                            <div className="flex gap-4 text-gray-600">
                                <button className="hover:text-primary transition" onClick={handleShare} aria-label="Facebook share simulation"><Facebook size={20} /></button>
                                <button className="hover:text-primary transition" onClick={handleShare} aria-label="Twitter share simulation"><Twitter size={20} /></button>
                                <button className="hover:text-primary transition" onClick={handleShare} aria-label="Direct share"><Share2 size={20} /></button>
                                <button className="hover:text-primary transition" onClick={handleShare} aria-label="Instagram share simulation"><Instagram size={20} /></button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductView;