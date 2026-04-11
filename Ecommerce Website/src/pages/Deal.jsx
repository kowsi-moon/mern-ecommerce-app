import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import { FiTag, FiStar, FiShoppingCart } from 'react-icons/fi';

const Deal = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        
        // --- FIXED FILTERING LOGIC ---
        // Idhu true (boolean) matrum "true" (string) rendaiyum detect pannum
        const activeDeals = res.data.filter(p => 
          p.isBestSeller === true || String(p.isBestSeller).toLowerCase() === 'true'
        );
        
        setDeals(activeDeals);
      } catch (err) {
        console.error("Error fetching deals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  if (loading) return (
    <div className="p-20 text-center font-bold text-gray-400 animate-pulse">
      FETCHING DEALS...
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white min-h-screen">
      <div className="flex items-center gap-6 mb-16">
        <div className="bg-red-500 p-5 rounded-[25px] shadow-xl shadow-red-100 rotate-3">
          <FiTag className="text-white text-3xl" />
        </div>
        <div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Deals & Offers</h1>
          <p className="text-gray-400 font-bold uppercase text-xs tracking-[4px] mt-1">Exclusive Premium Collection</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {deals.map((product) => (
          <div 
  key={product._id} 
  onClick={() => {
    window.scrollTo(0, 0);
    navigate(`/product/${product._id}`);
  }}
  className="group cursor-pointer relative bg-white border border-gray-50 rounded-[50px] overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-700"
>
            
            <div className="absolute top-8 left-8 z-20">
               <span className="bg-black text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-xl">Best Seller</span>
            </div>

            <div className="relative aspect-square bg-[#FBFBFB] flex items-center justify-center p-16">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000 ease-out" />
              <button className="absolute bottom-8 right-8 bg-black text-white p-5 rounded-3xl opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-2xl hover:bg-emerald-600">
                <FiShoppingCart size={24} />
              </button>
            </div>

            <div className="p-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-md">{product.category}</span>
                <div className="flex items-center gap-1">
                  <FiStar className="text-amber-400 fill-amber-400" size={14} />
                  <span className="text-sm font-black text-gray-900">4.9</span>
                </div>
              </div>

              <h3 className="text-3xl font-black text-gray-900 leading-tight mb-4">{product.name}</h3>
              <p className="text-gray-400 text-sm font-medium line-clamp-2 mb-8">{product.description}</p>

              <div className="pt-6 border-t border-gray-50">
                <span className="text-4xl font-black text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {deals.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-gray-200 text-3xl font-black italic tracking-tighter uppercase">No Active Deals Found</p>
          <p className="text-gray-400 mt-2">Make sure products are marked as 'Best Seller' in Admin.</p>
        </div>
      )}
    </div>
  );
};

export default Deal;