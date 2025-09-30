import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Container from '../../ui/Container';

const ImageSlider = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollerRef = useRef(null);
  const containerRef = useRef(null);
  const [start, setStart] = useState(false);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const isInView = useInView(containerRef, { 
    once: false, 
    margin: "-100px" 
  });
  
  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
  
  // Optional scroll tracking for enhanced effects
  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / window.innerHeight;
      setScrollOffset(progress * 50); // Adjust scroll influence
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cards = [
    {
      id: 1,
      title: "Components",
      subtitle: "Premium Drone Parts",
      description: "High-quality components engineered for peak performance and reliability",
      icon: "🔧",
      gradient: "from-violet-600 via-purple-600 to-blue-600",
      bgPattern: "geometric",
      features: ["Flight Controllers", "Motors & ESCs", "Cameras & Gimbals", "Batteries"],
      image: "/FCpix.png"
    },
    {
      id: 2,
      title: "Technology",
      subtitle: "Smart Systems",
      description: "Cutting-edge AI and sensor technology for autonomous flight",
      icon: "🤖",
      gradient: "from-pink-600 via-rose-600 to-orange-500",
      bgPattern: "circuits",
      features: ["AI Navigation", "Obstacle Avoidance", "Real-time Processing", "Smart Sensors"],
      image: "/sensors.png"
    },
    {
      id: 3,
      title: "Innovation",
      subtitle: "Future Forward",
      description: "Revolutionary designs pushing the boundaries of what's possible",
      icon: "🚀",
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      bgPattern: "waves",
      features: ["Next-Gen Materials", "Advanced Aerodynamics", "Modular Design", "Eco-Friendly"],
      image: "/RT.png"
    },
    {
      id: 4,
      title: "Solutions",
      subtitle: "Complete Systems",
      description: "End-to-end drone solutions for professional applications",
      icon: "⚡",
      gradient: "from-indigo-600 via-blue-600 to-purple-600",
      bgPattern: "grid",
      features: ["Custom Solutions", "24/7 Support", "Global Warranty", "Training Included"],
      image: "/motor.png"
    },
    {
      id: 5,
      title: "Support",
      subtitle: "24/7 Assistance",
      description: "Round-the-clock support for all your drone technology needs",
      icon: "🛠️",
      gradient: "from-amber-600 via-orange-600 to-red-600",
      bgPattern: "geometric",
      features: ["Live Chat Support", "Video Tutorials", "Remote Assistance", "Expert Guidance"],
      image: "/C1.png"
    },
    {
      id: 6,
      title: "Training",
      subtitle: "Skill Development",
      description: "Comprehensive training programs for drone operation and maintenance",
      icon: "🎓",
      gradient: "from-teal-600 via-green-600 to-emerald-600",
      bgPattern: "waves",
      features: ["Certified Courses", "Hands-on Training", "Safety Protocols", "Advanced Techniques"],
      image: "/ESC.png"
    }
  ];

  // Setup infinite scroll animation
  useEffect(() => {
    if (scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      
      // Clone cards for seamless infinite effect
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });
      
      setStart(true);
    }
  }, []);

  // JavaScript-based seamless infinite scroll
  useEffect(() => {
    if (!start || !scrollerRef.current) return;

    const animate = () => {
      if (!isPaused && scrollerRef.current) {
        positionRef.current -= 3; // Adjust speed here (higher = faster)
        
        // Get the width of one complete set of cards
        const totalWidth = scrollerRef.current.scrollWidth / 2;
        
        // Reset position when we've scrolled through one complete set
        if (Math.abs(positionRef.current) >= totalWidth) {
          positionRef.current = 0;
        }
        
        scrollerRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [start, isPaused]);

  return (
    <motion.section 
      ref={containerRef}
      style={{ scale, opacity }}
      className="py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden"
    >
      {/* Animated Background Elements with Parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-120 h-72 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            rotate: [360, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-120 h-72 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </motion.div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1, 
            ease: "easeOut",
            staggerChildren: 0.2
          }}
          className="text-center mb-20 relative z-10"
        >
          <motion.h2 
            className="text-5xl lg:text-7xl font-display font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Our
            </motion.span>
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 ml-4"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.5,
                type: "spring",
                stiffness: 120
              }}
              animate={{ 
                y: [0, -5, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              Solutions
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.7,
              ease: "easeOut"
            }}
          >
            Explore our comprehensive range of drone technologies and solutions
          </motion.p>
        </motion.div>
      </Container>

      {/* Infinite Scrolling Cards - Complete Full Width Edge-to-Edge */}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        style={{ 
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          left: 0,
          right: 0
        }}
      >
        <motion.div 
          className="scroller relative overflow-hidden cursor-pointer"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, white 2%, white 98%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, white 2%, white 98%, transparent 100%)',
            width: '100%',
            minWidth: '100vw'
          }}
          onClick={() => setIsPaused(!isPaused)}
          whileHover={{ scale: 1.002 }}
          transition={{ duration: 0.3 }}
        >
            <div
              ref={scrollerRef}
              className="flex gap-12 py-6"
              style={{
                transform: 'translateX(0px)',
                transition: 'none',
                paddingLeft: '2rem',
                paddingRight: '2rem',
                width: 'fit-content',
                minWidth: '100vw'
              }}
            >
              {cards.map((card, index) => (
                <motion.div
                  key={`${card.id}-${index}`}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.7, 
                    y: 100,
                    rotateX: -30
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    rotateX: 0
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 80
                  }}
                  whileHover={{ 
                    scale: 1.08,
                    rotateY: 12,
                    z: 100,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    transformStyle: "preserve-3d"
                  }}
                  className="group relative cursor-pointer flex-shrink-0 w-[320px] lg:w-[360px]"
                >
                  {/* Stacked Cards Effect */}
                  <div className="relative">
                    {/* Background Cards (Stacked) */}
                    <div 
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.gradient} transform rotate-2 translate-x-3 translate-y-3 opacity-60 blur-sm`}
                    />
                    <div 
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.gradient} transform rotate-1 translate-x-1.5 translate-y-1.5 opacity-80`}
                    />
                    
                    {/* Main Card */}
                    <div
                      className={`
                        relative bg-gradient-to-br ${card.gradient} 
                        rounded-3xl p-6 h-[480px]
                        shadow-2xl border border-white/20 backdrop-blur-sm
                        transform-gpu transition-all duration-500
                      `}
                    >
                      {/* Card Content */}
                      <div className="relative z-10 h-full flex flex-col">
                        {/* Icon */}
                        <motion.div
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-xl"
                        >
                          {card.icon}
                        </motion.div>

                        {/* Title and Subtitle */}
                        <div className="mb-4">
                          <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">
                            {card.title}
                          </h3>
                          <p className="text-lg text-white/80 font-medium">
                            {card.subtitle}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-white/90 text-base leading-relaxed mb-6 flex-grow">
                          {card.description}
                        </p>

                        {/* Features List */}
                        <div className="space-y-2 mb-6">
                          {card.features.slice(0, 3).map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 text-white/90"
                            >
                              <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <motion.button
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: 'rgba(255,255,255,0.25)'
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-3 px-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl font-semibold text-white text-base shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                          Explore More
                        </motion.button>
                      </div>

                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        {card.bgPattern === 'geometric' && (
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
                        )}
                        {card.bgPattern === 'circuits' && (
                          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:30px_30px]" />
                        )}
                        {card.bgPattern === 'waves' && (
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
                        )}
                        {card.bgPattern === 'grid' && (
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:25px_25px]" />
                        )}
                      </div>

                      {/* Floating Image */}
                      <motion.div
                        animate={{ 
                          y: [-5, 5, -5],
                          rotate: [-1, 1, -1]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute top-4 right-4 w-16 h-16"
                      >
                        <div className="relative w-full h-full bg-white/10 backdrop-blur-md rounded-xl p-2 shadow-lg">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-contain opacity-80"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
    </motion.section>
  );
};

export default ImageSlider;