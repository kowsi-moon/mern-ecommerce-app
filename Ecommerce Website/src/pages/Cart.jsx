import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ChevronLeft, Minus, Plus } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { cart = [], updateQuantity, removeFromCart } = useCart();

  const subtotal = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6">
        <h2 className="text-4xl font-serif font-bold text-[#1F3E35] mb-6">Your bag is empty</h2>
        <button 
          onClick={() => navigate('/shop')}
          className="bg-[#1F3E35] text-white px-12 py-4 rounded-sm hover:bg-[#2d5a4d] transition-all uppercase tracking-widest text-xs font-bold"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20 px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-12">
          <h1 className="text-5xl font-serif font-bold text-[#1F3E35] mb-8">Checkout</h1>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: CART ITEMS (8 columns) */}
          <div className="lg:col-span-8 bg-white p-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0,03)] border border-gray-50">
            <div className="flex items-center gap-3 mb-10 group cursor-pointer" onClick={() => navigate('/shop')}>
              <ChevronLeft size={20} className="text-gray-400 group-hover:text-[#1F3E35] transition-colors" />
              <h2 className="text-2xl font-serif font-bold text-[#1F3E35]">Shopping Cart</h2>
            </div>

            <div className="space-y-10">
              {cart.map((item) => (
                <div key={item._id} className="flex flex-col md:flex-row items-center gap-8 pb-10 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-32 h-32 bg-gray-50 rounded-xl overflow-hidden">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-[#1F3E35] mb-1">{item.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 uppercase tracking-widest">{item.category}</p>
                    
                    <div className="flex items-center justify-center md:justify-start gap-6">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(item._id, Math.max(1, (item.quantity || 1) - 1))} className="p-2 px-4 hover:bg-gray-50 text-gray-500 transition-colors border-r border-gray-200"><Minus size={14}/></button>
                        <span className="px-6 font-bold text-[#1F3E35]">{item.quantity || 1}</span>
                        <button onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)} className="p-2 px-4 hover:bg-gray-50 text-gray-500 transition-colors border-l border-gray-200"><Plus size={14}/></button>
                      </div>
                      <button onClick={() => removeFromCart(item._id)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold text-[#1F3E35]">
                    ₹{item.price * (item.quantity || 1)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY (4 columns) */}
          <div className="lg:col-span-4">
            <div className="bg-white p-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0,03)] border border-gray-100 sticky top-32">
              <h2 className="text-2xl font-serif font-bold text-[#1F3E35] mb-8">Order Summary</h2>
              
              <div className="space-y-5 mb-8">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-[#1F3E35] font-bold text-lg">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-between items-center mb-10">
                <span className="text-xl font-bold text-[#1F3E35]">Total</span>
                <span className="text-3xl font-bold text-[#1F3E35]">₹{subtotal}</span>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#1F3E35] text-white py-5 rounded-xl font-bold text-sm uppercase tracking-[2px] hover:bg-[#152b25] transition-all shadow-lg active:scale-[0.98]"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;