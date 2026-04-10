import React from 'react';

// You will import your images here like this:
// import electronicsImg from '../assets/images/electronics_cat.jpg';
// import accessoriesImg from '../assets/images/accessories_cat.jpg';
// import bagsImg from '../assets/images/bags_cat.jpg';
// import homeImg from '../assets/images/home_cat.jpg';

const CategoryGrid = () => {
  const items = [
    {
      name: 'Electronics',
      description: 'Headphones, speakers & more',
      products: 3,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop', // Placeholder: use your own
      id: 1,
    },
    {
      name: 'Accessories',
      description: 'Watches, wallets & sunglasses',
      products: 3,
      image: 'https://images.unsplash.com/photo-1617138334003-75aaa7952688?q=80&w=600&auto=format&fit=crop', // Placeholder: use your own
      id: 2,
    },
    {
      name: 'Bags',
      description: 'Backpacks & travel gear',
      products: 1,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop', // Placeholder: use your own
      id: 3,
    },
    {
      name: 'Home',
      description: 'Lighting & home decor',
      products: 1,
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600&auto=format&fit=crop', // Placeholder: use your own
      id: 4,
    },
  ];

  return (
    // Outer container for padding and background
    <div className="bg-white px-6 py-12 md:px-10 md:py-16 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Section (matching your layout) */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-950 dark:text-white mb-2">
            Categories
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Browse products by category
          </p>
        </div>

        {/* --- GRID SECTION --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            // A. The Card Component
            <div 
              key={item.id} 
              className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center"
            >
              
              {/* B. Image Container (The replacement) */}
              <div className="w-full h-48 bg-gray-50 dark:bg-gray-700 p-6 flex items-center justify-center">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transform scale-110" 
                  />
                ) : (
                  // Fallback if image path is broken
                  <div className="text-xs text-gray-400">No Image</div>
                )}
              </div>

              {/* C. Text Container (The spacing is critical here) */}
              <div className="p-8 pb-10 flex flex-col items-center text-center gap-2">
                <h2 className="text-xl font-bold text-gray-950 dark:text-white">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 min-h-[40px]">
                  {item.description}
                </p>
                {/* Product Count (using that signature blue/amber) */}
                <p className="mt-2 text-sm font-semibold text-amber-500 dark:text-amber-400">
                  {item.products === 1 ? '1 product' : `${item.products} products`}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* --- END GRID SECTION --- */}

      </div>
    </div>
  );
};

export default CategoryGrid;