import React from "react";
import "./Hero.css";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = ({ handleOrderPopup }) => {
  // Static hero content - carousel moved to GalleryCard
  const heroContent = {
    subtitle: "Professional Drone Solutions",
    title: "Advanced Drone Technology for Every Need",
    description: "Experience cutting-edge drone technology with our comprehensive range of professional solutions. From aerial photography to industrial applications, we provide the tools and expertise you need.",
    buttonText: "Get Started",
    image: "/FCpix.png"
  };



  return (
    <section className="relative overflow-hidden min-h-[700px] bg-gradient-to-br from-white via-gray-50 to-emerald-50/30">
      {/* Simplified Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-transparent"></div>
      </div>
      
      {/* Static Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-emerald-200/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-amber-200/10 rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 min-h-[600px]">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-8 lg:pr-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-700 font-semibold text-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                {heroContent.subtitle}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-emerald-600 to-gray-800">
                  {heroContent.title}
                </span>
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              {heroContent.description}
            </p>
            
            <div className="pt-4">
              <button
                onClick={handleOrderPopup}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center gap-2 group hover:scale-105 transform"
              >
                {heroContent.buttonText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </motion.div>

          {/* Simplified Image Section */}
          <div className="relative lg:order-first">
            <div className="relative bg-white/90 border border-gray-200 rounded-2xl p-6 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-blue-50/50 rounded-2xl"></div>
              
              <img
                src={heroContent.image}
                alt={heroContent.title}
                className="w-full h-[450px] object-contain relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
