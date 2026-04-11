import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { ChevronLeft, ChevronRight } from 'lucide-react'; 

const Shop = ({ products = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const productsPerPage = 12; 
  const categories = ['All', 'Electronics', 'Clothing', 'Home & Kitchen', 'Sports', 'Books', 'Accessories', 'Gadgets'];

  // --- SYNC CATEGORY FROM HOME PAGE ---
  useEffect(() => {
   
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
      setCurrentPage(1);
    
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const getImageUrl = (path) => {
    if (!path) return 'https://placehold.co/400x500?text=No+Image';
    if (path.startsWith('data:image')) return path;
    if (path.startsWith('http')) return path;
    const cleanPath = path.replace(/\\/g, '/').replace(/^\/+/, '');
    const finalPath = cleanPath.startsWith('uploads/') ? cleanPath : `uploads/${cleanPath}`;
    return `http://localhost:5000/${finalPath}`;
  };

  // --- IMPROVED FILTER LOGIC (Case Insensitive & Trimmed) ---
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
    

    const productCat = product.category?.trim().toLowerCase();
    const selectedCat = selectedCategory.trim().toLowerCase();

    const matchesCategory = selectedCategory === 'All' || productCat === selectedCat;
    
    return matchesSearch && matchesCategory;
  });

  // --- PAGINATION LOGIC ---
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-28 px-6 pb-20 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1F3E35] mb-8 font-serif">Shop</h1>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1); 
                }}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory.toLowerCase() === cat.toLowerCase() 
                  ? 'bg-[#1F3E35] text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-white border border-gray-100 rounded-lg py-3 pl-10 pr-4 outline-none focus:border-[#1F3E35] shadow-sm text-sm"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div 
                key={product._id} 
                className="group cursor-pointer flex flex-col"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#F3F3F3] mb-5">
                  <img 
                    src={getImageUrl(product.imageUrl || product.image)} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x500?text=Error'; }}
                  />
                  <div className="absolute bottom-4 right-4 bg-[#1F3E35] text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-[3px] text-gray-400 font-bold">{product.category || 'Luxury'}</p>
                  <h3 className="text-[17px] font-bold text-[#1F3E35] font-serif leading-tight group-hover:text-[#EAB308] transition-colors">{product.name}</h3>
                  <p className="text-[#1F3E35] font-bold text-lg mt-2">₹{product.price?.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-400 text-lg">No products found for "{selectedCategory}"</p>
              <button 
                onClick={() => setSelectedCategory('All')}
                className="mt-4 text-[#1F3E35] font-bold border-b border-[#1F3E35]"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 border-t border-gray-100 pt-10">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-full transition-all ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#1F3E35] hover:bg-gray-100'}`}
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`w-10 h-10 rounded-full text-xs font-bold transition-all ${
                    currentPage === i + 1 
                    ? 'bg-[#1F3E35] text-white shadow-md' 
                    : 'text-gray-400 hover:text-[#1F3E35] hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full transition-all ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-[#1F3E35] hover:bg-gray-100'}`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;