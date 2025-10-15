import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

/**
 * Universal scroll animations hook for components
 * Provides consistent scroll-based animations across all components
 */
export const useUniversalScrollEffects = (options = {}) => {
  const {
    enableParallax = true,
    enableScale = true,
    enableOpacity = true,
    parallaxStrength = 0.3,
    scaleRange = [0.9, 1, 0.95],
    opacityRange = [0, 1, 1, 0.7],
    offsetStart = "start end",
    offsetEnd = "end start",
    margin = "-100px"
  } = options;

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin });

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [offsetStart, offsetEnd]
  });

  // Transform values
  const transforms = {};
  
  if (enableParallax) {
    transforms.backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", `${parallaxStrength * 100}%`]);
    transforms.contentY = useTransform(scrollYProgress, [0, 1], ["0%", `${parallaxStrength * -30}%`]);
  }
  
  if (enableScale) {
    transforms.scale = useTransform(scrollYProgress, [0, 0.5, 1], scaleRange);
  }
  
  if (enableOpacity) {
    transforms.opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], opacityRange);
  }

  return {
    containerRef,
    isInView,
    scrollYProgress,
    transforms
  };
};

/**
 * Common animation variants for consistent feel
 */
export const scrollAnimationVariants = {
  // Section container animations
  sectionContainer: {
    initial: { opacity: 0, y: 60, scale: 0.9 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: { 
      duration: 1, 
      ease: "easeOut",
      staggerChildren: 0.1
    }
  },

  // Title animations
  title: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.8, 
      delay: 0.2,
      type: "spring",
      stiffness: 100
    }
  },

  // Subtitle animations
  subtitle: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.7, 
      delay: 0.4,
      ease: "easeOut"
    }
  },

  // Card/item animations
  card: {
    initial: { opacity: 0, y: 80, scale: 0.8, rotateX: -10 },
    whileInView: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
    transition: { 
      duration: 0.8, 
      type: "spring",
      stiffness: 80
    },
    whileHover: { 
      scale: 1.05,
      y: -10,
      rotateY: 5,
      transition: { duration: 0.3 }
    }
  },

  // Button animations
  button: {
    whileHover: { 
      scale: 1.05, 
      y: -3,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
    },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 }
  },

  // Stagger container
  staggerContainer: {
    transition: { staggerChildren: 0.1 }
  }
};

/**
 * Background pattern component with parallax
 */
export const ParallaxBackground = React.forwardRef(({ children, pattern = "default", ...motionProps }, ref) => {
  const patterns = {
    default: "bg-gradient-to-br from-white via-gray-50 to-emerald-50/30",
    dark: "bg-gradient-to-br from-slate-900 via-gray-900 to-black",
    colorful: "bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50",
    emerald: "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"
  };

  return (
    <motion.div 
      ref={ref}
      className={`relative overflow-hidden ${patterns[pattern] || patterns.default}`}
      {...motionProps}
    >
      {/* Floating background elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 360],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [360, 0],
          opacity: [0.2, 0.1, 0.2]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
      />
      {children}
    </motion.div>
  );
});

export default {
  useUniversalScrollEffects,
  scrollAnimationVariants,
  ParallaxBackground
};