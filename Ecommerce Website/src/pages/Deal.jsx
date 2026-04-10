import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTag, FiStar } from 'react-icons/fi';

const Deal = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH DYNAMIC DATA ---
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        // Replace with your actual backend endpoint
        // Filter for products that have a 'discount' or 'isOnSale' flag if needed
        const res = await axios.get('http://localhost:5000/api/products');
        
        // Example: Only show products that have a sale price lower than the original price
        const discountedProducts = res.data.filter(p => p.salePrice < p.price);
        setDeals(discountedProducts);
      } catch (err) {
        console.error("Error fetching deals:", err);
      } finally {
        setLoading(setLoading(false));
      }
    };
    fetchDeals();
  }, []);

  if (loading) return <div className="p-20 text-center">Loading premium deals...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:px-10">
      
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-red-50 p-3 rounded-2xl">
          <FiTag className="text-red-500 text-2xl" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Deals & Offers</h1>
          <p className="text-gray-500">Limited-time discounts on premium products</p>
        </div>
      </div>

      {/* Dynamic Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {deals.map((product) => (
          <div 
            key={product._id} 
            className="group relative bg-white border border-gray-100 rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500"
          >
            {/* Dynamic Badge (Sale/Best Seller) */}
            {product.badge && (
              <span className="absolute top-5 left-5 z-10 bg-[#1e40af] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.badge}
              </span>
            )}

            {/* Product Image */}
            <div className="aspect-square bg-[#f9fafb] flex items-center justify-center p-10 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
              />
            </div>

            {/* Content Section */}
            <div className="p-8">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {product.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-1 group-hover:text-blue-700 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                {product.description}
              </p>

              {/* Price & Rating Row */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-gray-900">
                    ${product.salePrice}
                  </span>
                  <span className="text-gray-400 line-through text-sm font-medium">
                    ${product.price}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                  <FiStar className="text-amber-400 fill-amber-400 text-sm" />
                  <span className="text-sm font-bold text-gray-700">{product.rating || '4.8'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {deals.length === 0 && (
        <div className="py-20 text-center text-gray-400 italic">
          Check back soon for new offers!
        </div>
      )}
    </div>
  );
};

export default Deal;