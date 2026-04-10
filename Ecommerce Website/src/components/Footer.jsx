import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1F3E35] text-white py-16 px-8 md:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold tracking-tight">
              Luxora<span className="text-green-400">.</span>
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Curated products for intentional living.
            </p>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[3px] text-white mb-6">Shop</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer transition-colors">All Products</li>
              <li className="hover:text-white cursor-pointer transition-colors">Electronics</li>
              <li className="hover:text-white cursor-pointer transition-colors">Clothing</li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[3px] text-white mb-6">Company</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer transition-colors">About</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[3px] text-white mb-6">Support</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
              <li className="hover:text-white cursor-pointer transition-colors">Shipping</li>
              <li className="hover:text-white cursor-pointer transition-colors">Returns</li>
            </ul>
          </div>

        </div>

        {/* Bottom Border & Copyright */}
        <div className="border-t border-white/10 pt-8 flex justify-center items-center">
          <p className="text-[11px] text-gray-400 tracking-wider">
            © 2026 Luxora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;