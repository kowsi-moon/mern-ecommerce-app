import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { ShoppingCart, Minus, Plus, ArrowLeft, Star, Check, X } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(0); // For the Review Form
  const { addToCart } = useCart();

  // --- REVIEWS WITH LOCALSTORAGE (Refresh pannaalum pogaadhu) ---
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem(`reviews_${id}`);
    return savedReviews ? JSON.parse(savedReviews) : [
      { name: "Alex M.", initial: "AM", date: "3/15/2026", color: "bg-blue-100 text-blue-600", text: "Absolutely amazing build quality. The materials feel premium and it matches the description perfectly.", rating: 5 },
      { name: "Sarah K.", initial: "SK", date: "3/10/2026", color: "bg-purple-100 text-purple-600", text: "Exactly what I was looking for. The sleek design fits my setup perfectly.", rating: 4 }
    ];
  });

  // Save to LocalStorage whenever reviews change
  useEffect(() => {
    if (id) localStorage.setItem(`reviews_${id}`, JSON.stringify(reviews));
  }, [reviews, id]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <div className="min-h-screen flex items-center justify-center uppercase tracking-[4px] text-[10px]">Loading...</div>;

  // --- DYNAMIC DATA GENERATORS ---
  const baseRating = (4 + (product._id.charCodeAt(0) % 10) / 10).toFixed(1);
  const originalPrice = Math.floor(product.price * 1.25);
  const saveAmount = originalPrice - product.price;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (userRating === 0) return alert("Please select a star rating!");

    const formData = new FormData(e.target);
    const newReview = {
      name: formData.get('userName'),
      initial: formData.get('userName').charAt(0).toUpperCase(),
      date: new Date().toLocaleDateString(),
      color: "bg-green-100 text-green-600",
      text: formData.get('userExperience'),
      rating: userRating
    };

    setReviews([newReview, ...reviews]);
    setIsReviewModalOpen(false);
    setUserRating(0); // Reset for next time
  };

  const getFeatures = (category) => {
    const featureMap = {
      'Electronics': ['High Performance & Efficiency', 'Energy Efficient Design', 'Durable Build Quality', 'Advanced Technology Integration'],
      'Accessories': ['Premium Quality Material', 'Lightweight & Comfortable', 'Skin-Friendly (Allergy Safe)', 'Trendy & Stylish Design'],
      'Gadgets': ['High-Resolution Display', 'Long-Lasting Battery Life', 'Fast Charging Support', 'Powerful Processor Performance'],
      'Home': ['Durable & Long-Lasting', 'Easy to Use Design', 'Space-Saving Structure', 'Modern & Elegant Look'],
      'Sports': ['Sweat & Water Resistant', 'Lightweight & Portable', 'Strong Grip Control', 'Professional Quality Material'],
      'Books': ['High-Quality Paper Print', 'Engaging Content', 'Captivating Storyline', 'Premium Cover Design'],
      'Clothing': ['Premium Fabric Quality', 'Elegant Design', 'Classic & Modern Styles', 'Wrinkle-Resistant Fabric']
    };
    return featureMap[category] || ['Premium Quality', 'Handcrafted', '1-Year Warranty', 'Ethically Sourced'];
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-gray-400 hover:text-black mb-12 text-[11px] uppercase tracking-[2px] font-bold">
          <ArrowLeft size={14} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
          <div className="max-w-md mx-auto lg:mx-0 lg:max-w-full">
            <div className="aspect-square bg-[#F9F9F9] rounded-xl overflow-hidden border border-gray-100">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain p-8" />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < Math.floor(baseRating) ? "currentColor" : "none"} />)}
              </div>
              <span className="text-sm text-gray-500">{baseRating} ({reviews.length} reviews)</span>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="text-xl text-gray-400 line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
              <span className="text-green-600 text-xs font-bold">Save ₹{saveAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="mb-10">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Key Features</h4>
              <ul className="grid grid-cols-2 gap-4">
                {getFeatures(product.category).map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-600">
                    <Check size={14} className="text-green-500" />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg bg-gray-50">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3"><Minus size={14}/></button>
                  <span className="px-4 font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3"><Plus size={14}/></button>
                </div>
                <button onClick={() => addToCart(product, quantity)} className="flex-1 bg-[#1F3E35] text-white py-4 rounded-lg font-bold uppercase text-xs tracking-widest">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-gray-100 pt-20">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Customer Reviews</h2>
              <p className="text-gray-400 text-[10px] uppercase tracking-[2px] font-bold">Real feedback from our community</p>
            </div>
            <button 
              onClick={() => setIsReviewModalOpen(true)}
              className="border border-gray-300 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#1F3E35] hover:text-white transition-all duration-300"
            >
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="border border-gray-100 p-8 rounded-2xl bg-[#FAFAFA] hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${review.color} rounded-full flex items-center justify-center font-bold text-sm shadow-sm`}>{review.initial}</div>
                    <div>
                      <h5 className="font-bold text-gray-900 text-sm">{review.name}</h5>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed italic">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- REVIEW MODAL --- */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsReviewModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#1F3E35]">Write a Review</h3>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-gray-400 hover:text-black transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Rating</label>
                <div className="flex gap-2 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={24} 
                      className="cursor-pointer transition-transform active:scale-90" 
                      fill={i < userRating ? "currentColor" : "none"}
                      onClick={() => setUserRating(i + 1)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Your Name</label>
                <input name="userName" type="text" placeholder="e.g. Alex M." className="w-full border border-gray-100 bg-gray-50 rounded-lg p-3 text-sm focus:outline-none focus:border-[#1F3E35]" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Your Experience</label>
                <textarea name="userExperience" rows="4" placeholder="What did you like or dislike?" className="w-full border border-gray-100 bg-gray-50 rounded-lg p-3 text-sm focus:outline-none focus:border-[#1F3E35] resize-none" required></textarea>
              </div>
              <button type="submit" className="w-full bg-[#1F3E35] text-white py-4 rounded-xl font-bold uppercase text-[11px] tracking-[3px] hover:bg-[#2d5a4d] transition-all mt-4">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;