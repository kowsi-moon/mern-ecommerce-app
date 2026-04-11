import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- Slider Logic ---
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselData = [
    {
      image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2000",
      title: "PREMIUM ELECTRONICS",
      offer: "Up to 30% Off",
      desc: "Selected premium accessories and essentials."
    },
    {
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2000",
      title: "SMART SOLUTIONS",
      offer: "New Arrivals",
      desc: "Experience the next level of tech with our latest collection."
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [carouselData.length]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const displayedProducts = products.slice(0, 8);

  // --- FIX 2: Function to go to TOP of Shop Page ---
  const handleShopRedirect = () => {
    window.scrollTo(0, 0); // Force scroll to top
    navigate('/shop');     // Move to shop page
  };

  return (
    <div className="bg-[#FDFBF7] overflow-x-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      
      {/* --- Section 1: Hero Video --- */}
      <section className="min-h-[90vh] text-white flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="https://www.pexels.com/download/video/8387356/" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative z-20 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[5px] text-[#EAB308] mb-8 block font-bold border border-[#EAB308]/30 px-6 py-2 rounded-full bg-black/20 backdrop-blur-sm">
            Luxora Collection 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl tracking-tight mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Curated Products for <br />
            <span className="italic font-light text-[#EAB308]">Luxurious</span> Living
          </h1>
          
          {/* FIX 1: Changed from scrollIntoView to navigate to Gallery page */}
          <button 
  onClick={() => {
    const section = document.getElementById("products-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}
  className="bg-[#EAB308] text-[#1F3E35] px-12 py-4 rounded-sm font-bold text-[11px] uppercase tracking-[4px] hover:bg-white transition-all duration-500 shadow-2xl"
>
  Explore Collection →
</button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#FDFBF7] z-30" style={{ clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0 100%)' }}></div>
      </section>

      {/* --- Section 3: High-Impact Gallery --- */}
      <section id="products-section" className="py-20 px-4 md:px-10 w-full">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-8">
            <div>
              <h2 className="text-4xl font-bold text-[#1F3E35] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>The Gallery</h2>
              <p className="text-gray-400 text-[10px] tracking-[3px] uppercase font-bold">Curated Hand-picked items</p>
            </div>
            <button onClick={() => navigate('/shop')} className="text-[#2d5a4d] font-bold text-[10px] uppercase tracking-[3px] flex items-center gap-2 hover:gap-4 transition-all">
              View All <ArrowRight size={14}/>
            </button>
          </div>

          {loading ? (
            <div className="py-24 text-center text-[10px] tracking-[4px] text-gray-400 font-bold uppercase">Loading Luxury...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {displayedProducts.map(product => (
                <div 
                  key={product._id} 
           onClick={() => {
  window.scrollTo(0, 0);
  navigate(`/product/${product._id}`);
}}
                  className="cursor-pointer group flex flex-col transition-all duration-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-[#F9F7F2] rounded-sm">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white px-5 py-2.5 text-[9px] uppercase tracking-[3px] font-bold text-[#1F3E35] shadow-xl">
                        View Product
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-[#BF8F36] uppercase tracking-[2px]">{product.category}</p>
                    <h3 className="text-lg font-bold text-[#1F3E35] line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>{product.name}</h3>
                    <div className="pt-1 font-bold text-[#1F3E35] text-sm">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- Section 2: Slim Banner Slider --- */}
      <section id="carousel-section" className="relative w-full py-8 bg-[#FDFBF7]">
        <div className="max-w-[1400px] mx-auto h-[250px] md:h-[380px] overflow-hidden relative group shadow-lg rounded-sm">
          {carouselData.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-transparent flex flex-col justify-center px-10 md:px-20">
                <span className="text-[#EAB308] text-[10px] font-bold tracking-[5px] mb-2 uppercase">{slide.title}</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{slide.offer}</h2>
                <p className="text-gray-300 text-xs md:text-sm max-w-md mb-6 line-clamp-2">{slide.desc}</p>
                
                {/* FIX 2: Added handleShopRedirect to ensure it starts at the top */}
                <button 
                  onClick={handleShopRedirect} 
                  className="w-fit bg-[#2563EB] text-white px-8 py-2.5 rounded-full font-bold text-[10px] hover:bg-blue-600 transition-all uppercase tracking-wider"
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}

          <button 
            onClick={() => setActiveSlide(activeSlide === 0 ? carouselData.length - 1 : activeSlide - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-black/70 text-white rounded-full transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => setActiveSlide(activeSlide === carouselData.length - 1 ? 0 : activeSlide + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-black/70 text-white rounded-full transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;