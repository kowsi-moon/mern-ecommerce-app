import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <div className="min-h-screen flex items-center justify-center uppercase tracking-[4px] text-[10px]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Loading Treasure...</div>;

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20 px-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-[#1F3E35] mb-12 text-[10px] uppercase tracking-[3px] font-bold">
          <ArrowLeft size={14} /> Back to Shop
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="aspect-square bg-white p-8 border border-gray-100 shadow-sm overflow-hidden">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-[#BF8F36] text-[10px] font-bold uppercase tracking-[4px] mb-4">{product.category}</p>
              <h1 className="text-5xl font-bold text-[#1F3E35] leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {product.name}
              </h1>
              <p className="text-3xl font-medium text-[#1F3E35]">₹{product.price}</p>
            </div>

            <p className="text-gray-500 leading-relaxed text-sm">{product.description}</p>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
              <div className="flex items-center border border-gray-200 bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4 hover:bg-gray-50"><Minus size={14}/></button>
                <span className="w-12 text-center font-bold text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-4 hover:bg-gray-50"><Plus size={14}/></button>
              </div>

              <button 
                onClick={() => addToCart(product, quantity)}
                className="flex-1 w-full bg-[#1F3E35] text-white flex items-center justify-center gap-3 py-5 px-10 font-bold text-[11px] uppercase tracking-[4px] hover:bg-[#2d5a4d] transition-all shadow-xl"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;