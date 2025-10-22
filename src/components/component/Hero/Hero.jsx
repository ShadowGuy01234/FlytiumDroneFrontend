import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";
import { ArrowRight } from "lucide-react";

const Hero = ({ handleOrderPopup }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const scrollToShop = () => {
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen bg-white overflow-hidden flex items-center justify-center">
      
      {/* Animated Background Mesh Gradient */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
              radial-gradient(at ${50 - mousePosition.x * 10}% ${50 - mousePosition.y * 10}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              radial-gradient(at ${50 + mousePosition.y * 10}% ${50 - mousePosition.x * 10}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)
            `,
            transition: 'all 0.3s ease-out'
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-5">
        
        {/* Typography First Design */}
        <div className="text-center mb-16">
          
          {/* Minimalist Badge */}
          <div className="inline-block mb-2">
            <div className="flex items-center gap-3 px-4 py-2 border border-gray-900/10 rounded-full backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium tracking-wider uppercase text-gray-600">
                Flytium Drones
              </span>
            </div>
          </div>

          {/* Hero Typography - Ultra Large & Bold */}
          <div className="relative mb-12">
            <h1 className="font-display font-black leading-[0.85] tracking-tighter">
              {/* First Line */}
              <div 
                className="text-[12vw] md:text-[10vw] lg:text-[9rem] text-gray-900"
                style={{
                  transform: `translateX(${mousePosition.x * 20}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                ELEVATE
              </div>
              
              {/* Second Line - Italic with gradient */}
              <div 
                className="text-[12vw] md:text-[10vw] lg:text-[9rem] italic relative"
                style={{
                  transform: `translateX(${-mousePosition.x * 20}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600">
                  YOUR VISION
                </span>
              </div>
            </h1>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              <div className="w-1 h-1 rounded-full bg-gray-400" />
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-16 font-light leading-relaxed">
            Precision engineering meets extraordinary design.<br className="hidden md:block" />
            Professional aerial technology for the modern era.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
            <button 
              onClick={scrollToShop}
              className="group relative px-10 py-5 bg-gray-900 text-white overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3 font-medium">
                Explore Collection
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Product Showcase - Large Image */}
        <div className="relative">
          <div 
            className="relative mx-auto max-w-4xl"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Main Product Image */}
            {/* <div className="relative">
              <img
                src="/003.jpg"
                alt="Flytium Drone"
                className="w-full h-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.2))',
                }}
              />
            </div> */}

            {/* Subtle Glow */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-emerald-500/10 via-blue-500/10 to-transparent blur-3xl" />
          </div>

          
        </div>

      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="text-xs font-medium tracking-widest uppercase">Scroll</div>
          <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent hero-scroll-indicator" />
        </div>
      </div>

    </section>
  );
};

export default Hero;
