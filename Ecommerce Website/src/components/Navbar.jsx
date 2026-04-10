import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom'; 
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const context = useCart();
  const cart = context?.cart || [];
  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  // Active Link-kaga oru common style function
  const activeLinkStyle = ({ isActive }) => 
    isActive 
      ? "text-amber-600 border-b-2 border-amber-600 pb-1 transition-all duration-200" 
      : "hover:text-amber-600 transition-colors";

  return (
    <nav className="bg-[#FDFBF7] border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-10 py-4 max-w-7xl mx-auto">
        
        {/* Mobile Menu Icon */}
        <button className="md:hidden text-[#1F3E35]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-serif font-bold tracking-tighter text-[#1F3E35]">
            LUXORA<span className="text-green-400">.</span>
          </span>
        </Link>

        {/* Desktop Navigation - NavLink use pannirukken */}
        <div className="hidden md:flex items-center gap-8 text-[#1F3E35] font-medium">
          <NavLink to="/" className={activeLinkStyle}>Home</NavLink>
          <NavLink to="/shop" className={activeLinkStyle}>Shop</NavLink>
          <NavLink to="/category" className={activeLinkStyle}>Category</NavLink>
          <NavLink to="/deals" className={activeLinkStyle}>Deals</NavLink>
          <NavLink to="/about" className={activeLinkStyle}>About Luxora</NavLink>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4 md:gap-6 text-[#1F3E35]">
          <Link to="/cart" className="relative group">
            <FiShoppingCart size={20} className="group-hover:text-amber-600 transition-colors" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#EAB308] text-[#1F3E35] text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-sm">
                {cartItemCount}
              </span>
            )}
          </Link>

          <Link to="/shop">
            <FiSearch size={20} className="hidden sm:block cursor-pointer hover:text-amber-600" />
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <NavLink to={user.isAdmin ? "/admin/dashboard" : "/profile"} className={activeLinkStyle}>
                <div className="flex items-center gap-2 font-bold">
                  <FiUser size={20} />
                  <span className="text-sm">{user.isAdmin ? "Dashboard" : `Hi, ${user.name?.split(' ')[0]}`}</span>
                </div>
              </NavLink>
            ) : (
              <NavLink to="/login" className={activeLinkStyle}>
                <div className="flex items-center gap-2 font-bold">
                  <FiUser size={20} />
                  <span>Login</span>
                </div>
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex flex-col gap-4">
          {/* Mobile-layum active-ah highlight panna idhe NavLink logic thaan */}
          <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-amber-600 font-bold" : "text-[#1F3E35]"}>Home</NavLink>
          <NavLink to="/shop" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-amber-600 font-bold" : "text-[#1F3E35]"}>Shop</NavLink>
          <NavLink to="/category" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-amber-600 font-bold" : "text-[#1F3E35]"}>Category</NavLink>
          <NavLink to="/deals" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-amber-600 font-bold" : "text-[#1F3E35]"}>Deals</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-amber-600 font-bold" : "text-[#1F3E35]"}>About Luxora</NavLink>
          
          {user ? (
            <>
              <NavLink to={user.isAdmin ? "/admin/dashboard" : "/profile"} onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-amber-600 font-bold" : "text-[#1F3E35]"}>
                {user.isAdmin ? "Dashboard" : "My Profile"}
              </NavLink>
              <button onClick={() => { logout(); setIsOpen(false); }} className="text-red-600 font-bold text-left">Logout</button>
            </>
          ) : (
            <NavLink to="/login" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-amber-600 font-bold" : "text-[#1F3E35]"}>Login</NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;