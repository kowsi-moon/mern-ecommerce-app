import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu open state
  
  const context = useCart();
  const cart = context?.cart || []; 
  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  return (
    <nav className="bg-[#FDFBF7] border-b border-gray-100 sticky top-0 z-50">
      {/* --- Main Navbar Container --- */}
      <div className="flex items-center justify-between px-4 md:px-10 py-4 max-w-7xl mx-auto">
        
        {/* Mobile Menu Icon (Hamburger) - Only shows on mobile */}
        <button 
          className="md:hidden text-[#1F3E35]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-serif font-bold tracking-tighter text-[#1F3E35]">
            LUXORA<span className="text-green-400">.</span>
          </span>
        </Link>

        {/* Desktop Navigation Links - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-8 text-[#1F3E35] font-medium">
          <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-amber-600 transition-colors">Shop</Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4 md:gap-6 text-[#1F3E35]">
          <FiSearch size={20} className="hidden sm:block cursor-pointer hover:text-amber-600" />
          
          {/* Cart Icon */}
          <Link to="/cart" className="relative group">
            <FiShoppingCart size={20} className="group-hover:text-amber-600 transition-colors" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#EAB308] text-[#1F3E35] text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-sm">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* User Section (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to={user.isAdmin ? "/admin/dashboard" : "/profile"} className="flex items-center gap-2 font-bold hover:text-amber-600">
                  <FiUser size={20} />
                  <span className="text-sm">{user.isAdmin ? "Dashboard" : `Hi, ${user.name?.split(' ')[0]}`}</span>
                </Link>
                <button onClick={logout} className="hover:text-red-600 transition-colors">
                  <FiLogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 font-bold hover:text-amber-600">
                <FiUser size={20} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex flex-col gap-4 animate-fade-in-down">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-[#1F3E35] font-medium py-2 border-b border-gray-50">Home</Link>
          <Link to="/shop" onClick={() => setIsOpen(false)} className="text-[#1F3E35] font-medium py-2 border-b border-gray-50">Shop</Link>
          
          {/* User Links for Mobile */}
          {user ? (
            <>
              <Link to={user.isAdmin ? "/admin/dashboard" : "/profile"} onClick={() => setIsOpen(false)} className="text-[#1F3E35] font-bold py-2">
                {user.isAdmin ? "Dashboard" : "My Profile"}
              </Link>
              <button onClick={() => { logout(); setIsOpen(false); }} className="text-red-600 font-bold text-left py-2">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-[#1F3E35] font-bold py-2">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;