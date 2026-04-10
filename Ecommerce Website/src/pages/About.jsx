import React from 'react';
import { ShieldCheck, Truck, Headphones, Heart } from 'lucide-react';

const About = () => {
  const features = [
    {
      title: "Quality Guaranteed",
      desc: "Every product is carefully curated and quality-checked before it reaches you.",
      icon: <ShieldCheck className="text-[#1F3E35]" size={28} />,
    },
    {
      title: "Fast Shipping",
      desc: "Free shipping on orders over ₹100. Delivered within 2-3 business days.",
      icon: <Truck className="text-[#1F3E35]" size={28} />,
    },
    {
      title: "24/7 Support",
      desc: "Our dedicated team is always ready to help with any questions or concerns.",
      icon: <Headphones className="text-[#1F3E35]" size={28} />,
    },
    {
      title: "Customer First",
      desc: "Your satisfaction is our top priority. Easy returns within 30 days.",
      icon: <Heart className="text-[#1F3E35]" size={28} />,
    },
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-28 pb-20 font-sans text-[#1F3E35]">
      {/* Increased max-width from 7xl to 8xl for a wider page feel */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        
        {/* --- HERO SECTION --- */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-32">
          {/* Increased text width to 60% */}
          <div className="lg:w-[60%] space-y-8">
            <p className="uppercase tracking-[4px] text-xs font-bold text-gray-400">Lux. 2026</p>
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight">
              Crafting a <br />
              <span className="italic text-[#EAB308]">Luxe</span> Lifestyle
            </h1>
            <div className="h-1 w-20 bg-[#EAB308]"></div>
            <p className="text-gray-600 text-xl leading-relaxed max-w-2xl">
              We're a premium lifestyle brand dedicated to bringing you the finest products that blend 
              style, quality, and innovation. At LUXE, we believe everyone deserves access to 
              exceptional quality without compromise.
            </p>
          </div>
          
          {/* Reduced image width to 40% and added extra padding */}
          <div className="lg:w-[40%] relative flex justify-center">
            <div className="relative w-full max-w-sm"> {/* max-w-sm keeps the image size controlled */}
              {/* Main Image */}
              <div className="rounded-sm overflow-hidden shadow-2xl z-10 relative aspect-[4/5]">
                <img 
                  src="https://i.pinimg.com/1200x/43/34/78/4334781ffa85208ae3f132b01b11ec7c.jpg" 
                  alt="Premium store" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Gold Box */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#EAB308] -z-0 hidden md:block"></div>
            </div>
          </div>
        </div>

        {/* --- FEATURES GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
          {features.map((item, index) => (
            <div key={index} className="group flex flex-col items-start">
              <div className="mb-6 p-4 bg-white shadow-sm rounded-full group-hover:bg-[#1F3E35] transition-all duration-500">
                <div className="group-hover:filter group-hover:invert transition-all duration-500">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 font-serif uppercase tracking-wider">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed border-l-2 border-gray-100 pl-4 italic">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* --- OUR MISSION SECTION --- */}
        <div className="relative py-28 px-12 overflow-hidden rounded-sm bg-[#1F3E35] text-white">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute inset-0 bg-[radial-gradient(#EAB308_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
            <h2 className="text-5xl md:text-6xl font-serif font-bold italic">Our Mission</h2>
            <p className="text-gray-300 text-2xl leading-relaxed italic font-light">
              "To inspire and empower through premium products that elevate everyday experiences. 
              We strive to make luxury accessible and sustainable for all."
            </p>
            <div className="flex justify-center gap-3">
               {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#EAB308]/40"></div>)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;