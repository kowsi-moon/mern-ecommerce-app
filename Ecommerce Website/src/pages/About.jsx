import React from 'react';
import { ShieldCheck, Truck, Headphones, Heart } from 'lucide-react';

const About = () => {
  const features = [
    {
      title: "Quality Guaranteed",
      desc: "Every product is carefully curated and quality-checked before it reaches you.",
      icon: <ShieldCheck className="text-blue-600" size={24} />,
    },
    {
      title: "Fast Shipping",
      desc: "Free shipping on orders over ₹100. Most orders delivered within 2-3 business days.",
      icon: <Truck className="text-blue-600" size={24} />,
    },
    {
      title: "24/7 Support",
      desc: "Our dedicated team is always ready to help with any questions or concerns.",
      icon: <Headphones className="text-blue-600" size={24} />,
    },
    {
      title: "Customer First",
      desc: "Your satisfaction is our top priority. Easy returns within 30 days.",
      icon: <Heart className="text-blue-600" size={24} />,
    },
  ];

  return (
    <div className="bg-white min-h-screen py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About LUXE</h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-6">
            We're a premium lifestyle brand dedicated to bringing you the finest products that blend 
            style, quality, and innovation.
          </p>
          <p className="text-gray-500 text-lg leading-relaxed">
            Founded in 2024, LUXE curates a collection of carefully selected products from around 
            the world. We believe everyone deserves access to exceptional quality without compromise.
          </p>
        </div>

        {/* --- FEATURES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="p-8 border border-gray-100 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* --- MISSION SECTION --- */}
        <div className="bg-slate-50 rounded-[40px] py-16 px-8 text-center max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
            To inspire and empower through premium products that elevate everyday experiences. 
            We strive to make luxury accessible and sustainable for all.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;