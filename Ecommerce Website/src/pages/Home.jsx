import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- LOGIC: Limit to 2 rows (assuming 4 items per row) ---
  const displayedProducts = products.slice(0, 8);

  return (
    <div className="bg-[#FDFBF7]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Hero Section */}
      <section className="bg-[#2d5a4d] min-h-[90vh] text-white flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[5px] text-[#EAB308] mb-8 block font-bold border border-[#EAB308]/30 px-6 py-2 rounded-full bg-[#1F3E35]/50">
            Luxora Collection 2026
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl tracking-tight mb-8" 
              style={{ fontFamily: "'Playfair Display', serif" }}>
            Curated Products for <br />
            <span className="italic font-light text-[#EAB308]">Luxurious</span> Living
          </h1>
          
          <button 
            onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#EAB308] text-[#1F3E35] px-12 py-4 rounded-sm font-bold text-[11px] uppercase tracking-[4px] hover:bg-white transition-all duration-500 shadow-2xl"
          >
            Explore Collection →
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#FDFBF7]" style={{ clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0 100%)' }}></div>
      </section>

      {/* Featured Products Section */}
      <section id="products-section" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-gray-100 pb-8">
          <div>
            <h2 className="text-4xl font-bold text-[#1F3E35] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>The Gallery</h2>
            <p className="text-gray-400 text-[10px] tracking-[3px] uppercase font-bold">Hand-picked favorites for your home</p>
          </div>
          {/* --- View All Navigation Fix --- */}
          <button 
            onClick={() => navigate('/shop')}
            className="text-[#2d5a4d] font-bold hover:tracking-[4px] transition-all text-[10px] uppercase tracking-[3px] flex items-center gap-2"
          >
            View All <ArrowRight size={14}/>
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-[10px] tracking-[4px] text-gray-400 font-bold uppercase">Loading Luxury</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {displayedProducts.map(product => (
              <div 
                key={product._id} 
                onClick={() => navigate(`/product/${product._id}`)} 
                className="cursor-pointer group relative bg-white p-4 transition-all duration-500 hover:shadow-2xl border border-transparent hover:border-gray-50"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-[#F9F7F2] rounded-sm">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" 
                  />
                  {/* Shop Indicator on hover */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 px-4 py-2 text-[8px] uppercase tracking-widest font-bold text-[#1F3E35]">View Details</span>
                  </div>
                </div>
                <div className="space-y-2 px-2">
                  <p className="text-[8px] font-bold text-[#BF8F36] uppercase tracking-[4px]">{product.category}</p>
                  <h3 className="text-lg font-bold text-[#1F3E35] line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>{product.name}</h3>
                  <div className="flex justify-between items-center pt-2 font-bold text-[#1F3E35]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- View All Bottom Button (Optional but good for UX) --- */}
        <div className="mt-20 flex justify-center">
             <button 
                onClick={() => navigate('/shop')}
                className="px-10 py-4 border border-[#1F3E35] text-[#1F3E35] text-[10px] font-bold uppercase tracking-[4px] hover:bg-[#1F3E35] hover:text-white transition-all duration-500 rounded-sm"
             >
               Explore Full Catalog
             </button>
        </div>
      </section>
    </div>
  );
};

export default Home;