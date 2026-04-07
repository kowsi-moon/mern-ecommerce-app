import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Shop = ({ products = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Electronics', 'Clothing', 'Home & Kitchen', 'Sports', 'Books', 'Accessories',"Gadgets",];

  // ---  IMPROVED IMAGE LOGIC ---
  const getImageUrl = (path) => {
    if (!path) return 'https://placehold.co/400x500?text=No+Image';
    
    // 1. Base64 string-ah irundha direct-ah return pannu
    if (path.startsWith('data:image')) return path;
    
    // 2. Full HTTP URL-ah irundha adhaiye return pannu
    if (path.startsWith('http')) return path;
    
    // 3. Local path-ah irundha clean panni backend URL seru
    const cleanPath = path.replace(/\\/g, '/').replace(/^\/+/, '');
    
    // Check if 'uploads/' is already in the string to avoid 'uploads/uploads'
    const finalPath = cleanPath.startsWith('uploads/') ? cleanPath : `uploads/${cleanPath}`;
    
    return `http://localhost:5000/${finalPath}`;
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-28 px-6 pb-20 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1F3E35] mb-8 font-serif">Shop</h1>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat 
                  ? 'bg-[#1F3E35] text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-white border border-gray-100 rounded-lg py-3 pl-10 pr-4 outline-none focus:border-[#1F3E35] shadow-sm text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <p className="text-gray-500 text-xs mb-8 italic tracking-widest uppercase">
          {filteredProducts.length} products found
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => {
            const finalImage = getImageUrl(product.imageUrl || product.image);

            return (
              <div 
                key={product._id} 
                className="group cursor-pointer flex flex-col"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#F3F3F3] mb-5">
                  <img 
                    src={finalImage} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    // CrossOrigin removed for Base64 compatibility issues
                    onError={(e) => { 
                      if (e.target.src !== 'https://placehold.co/400x500?text=Error') {
                        e.target.src = 'https://placehold.co/400x500?text=Error';
                      }
                    }}
                  />
                  <div className="absolute bottom-4 right-4 bg-[#1F3E35] text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-[3px] text-gray-400 font-bold">{product.category || 'Luxury'}</p>
                  <h3 className="text-[17px] font-bold text-[#1F3E35] font-serif leading-tight group-hover:text-[#EAB308] transition-colors">{product.name}</h3>
                  <p className="text-[#1F3E35] font-bold text-lg mt-2">₹{product.price?.toLocaleString('en-IN')}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shop;