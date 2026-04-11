import React from 'react';
import { useNavigate } from 'react-router-dom';

const Category = ({ products = [] }) => {
  const navigate = useNavigate();

  // Category mapping - Slugs must match your Database exactly
  const categoryConfigs = [
    {
      name: 'Electronics',
      description: 'Headphones, speakers & more',
      image: 'https://i.pinimg.com/1200x/8d/1e/a6/8d1ea6589270fe38b23012af98415a75.jpg',
      slug: 'Electronics'
    },
    {
      name: 'Accessories',
      description: 'Watches, wallets & sunglasses',
      image: 'https://i.pinimg.com/1200x/61/8e/86/618e86914fcb22d4ef7199e0874ca8b6.jpg',
      slug: 'Accessories'
    },
    {
      name: 'Gadgets',
      description: 'Backpacks & travel gear',
      image: 'https://i.pinimg.com/1200x/ed/07/fc/ed07fcb3b5a776179a7e5256eab3d16b.jpg',
      slug: 'Gadgets'
    },
    {
      name: 'Home',
      description: 'Lighting & home decor',
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600&auto=format&fit=crop',
      slug: 'Home & Kitchen' 
    },
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-28 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-serif font-bold text-[#1F3E35] mb-4">Our Collections</h1>
          <p className="text-gray-500 max-w-md">Browse by category to find exactly what you need.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoryConfigs.map((cat) => {
            // Logic to calculate real-time count
            const productCount = products.filter(p => 
              p.category?.trim().toLowerCase() === cat.slug.toLowerCase()
            ).length;

            return (
              <div 
                key={cat.name}
                onClick={() => navigate('/shop', { state: { selectedCategory: cat.slug } })}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 cursor-pointer"
              >
                {/* Image Wrapper */}
                <div className="aspect-square overflow-hidden bg-gray-50 relative">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                </div>

                {/* Content */}
                <div className="p-8 text-center bg-white relative">
                  <h2 className="text-2xl font-serif font-bold text-[#1F3E35] mb-2">{cat.name}</h2>
                  <p className="text-sm text-gray-400 mb-4">{cat.description}</p>
                  
                
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;