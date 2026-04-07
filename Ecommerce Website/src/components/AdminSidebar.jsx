import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiBox, FiShoppingCart, FiUsers, FiLogOut, FiArrowLeft, FiGrid } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FiGrid /> },
    { name: 'Products', path: '/admin/products', icon: <FiBox /> },
    { name: 'Orders', path: '/admin/orders', icon: <FiShoppingCart /> },
    { name: 'Users', path: '/admin/users', icon: <FiUsers /> },
  ];

  return (
    <>
      {/* ================= DESKTOP / TABLET SIDEBAR ================= */}
      <div className="hidden md:flex w-64 bg-[#1F3E35] text-white h-screen flex-col p-5 shadow-xl fixed left-0 top-0 z-50 overflow-y-auto">
        
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-wider">LUXORA</h1>
          <p className="text-xs text-gray-400">ADMIN PANEL</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive(item.path)
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-700 pt-4 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 transition"
          >
            <FiArrowLeft />
            Back to Shop
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-md text-gray-300 hover:bg-red-500 hover:text-white transition"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#1F3E35] flex justify-around items-center h-16 border-t border-gray-700 z-50 shadow-lg">
        
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center justify-center text-xs w-full h-full transition ${
              isActive(item.path)
                ? 'text-amber-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}

      </div>
    </>
  );
};

export default AdminSidebar;