import React, { useRef, useEffect, useState } from "react";
import "./Hero.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = ({ handleOrderPopup }) => {
  const heroRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Static hero content - carousel moved to GalleryCard
  const heroContent = {
    subtitle: "Professional Drone Solutions",
    title: "Advanced Drone Technology for Every Need",
    description: "Experience cutting-edge drone technology with our comprehensive range of professional solutions. From aerial photography to industrial applications, we provide the tools and expertise you need.",
    buttonText: "Get Started",
    image: "/FCpix.png"
  };

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Transform values for parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Optional scroll tracking without requiring Lenis
  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <section 
      ref={heroRef}
      className="relative overflow-hidden min-h-[700px] bg-gradient-to-br from-white via-gray-50 to-emerald-50/30"
    >
      {/* Background Pattern with Parallax */}
      <motion.div 
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0 opacity-60"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-transparent"></div>
      </motion.div>
      
      {/* Floating Elements with Parallax */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "80%"]) }}
        className="absolute top-20 right-20 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"
      ></motion.div>
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]) }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse"
      ></motion.div>

      <motion.div 
        style={{ y: textY, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 min-h-[600px]">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              staggerChildren: 0.1
            }}
            className="space-y-8 lg:pr-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-700 font-semibold text-sm"
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 bg-emerald-500 rounded-full"
                ></motion.span>
                {heroContent.subtitle}
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3,
                  type: "spring",
                  stiffness: 80
                }}
              >
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-emerald-600 to-gray-800"
                  animate={{ 
                    scale: [1, 1.02, 1],
                    transition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {heroContent.title}
                </motion.span>
              </motion.h1>
            </div>
            
            <motion.p 
              className="text-xl text-gray-600 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.4,
                ease: "easeOut"
              }}
            >
              {heroContent.description}
            </motion.p>
            
            <motion.div 
              className="pt-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.5,
                type: "spring",
                stiffness: 90
              }}
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: "0 20px 40px rgba(5, 150, 105, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOrderPopup}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center gap-2 group"
              >
                {heroContent.buttonText}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.8, y: 50, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
            transition={{ 
              duration: 1, 
              ease: "easeOut", 
              delay: 0.3,
              type: "spring",
              stiffness: 60
            }}
            className="relative lg:order-first"
          >
            <motion.div 
              className="relative bg-white/90 border border-gray-200 rounded-2xl p-6 shadow-lg overflow-hidden"
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-blue-50/50 rounded-2xl"
                animate={{ 
                  background: [
                    "linear-gradient(45deg, rgba(16, 185, 129, 0.05), rgba(59, 130, 246, 0.05))",
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.05))",
                    "linear-gradient(45deg, rgba(16, 185, 129, 0.05), rgba(59, 130, 246, 0.05))"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.img
                src={heroContent.image}
                alt={heroContent.title}
                className="w-full h-[450px] object-contain relative z-10"
                initial={{ scale: 1.1, opacity: 0.8 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, 1, -1, 0],
                  transition: { rotate: { duration: 0.5 } }
                }}
              />
              
              {/* Floating particles effect */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
                  style={{
                    top: `${20 + i * 10}%`,
                    left: `${10 + i * 15}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
