import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100 h-64 md:h-72">
        <img
          src={product.imageUrl}
          alt={product.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category */}
        <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-4 line-clamp-2">
          {product.name}
        </h3>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-xl font-bold text-gray-900">
            ₹{product.price}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-[#2d5a4d] text-white p-3 rounded-full hover:bg-[#1F3E35] transition-colors duration-300 flex items-center justify-center"
            title="Add to cart"
          >
            <FiShoppingCart size={20} />
          </button>
        </div>

        {/* Stock Status */}
        {product.stock > 0 ? (
          <p className="text-xs text-green-600 mt-2">In Stock</p>
        ) : (
          <p className="text-xs text-red-600 mt-2">Out of Stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;