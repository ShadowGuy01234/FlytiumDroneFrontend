import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Shield, Award, Sparkles, ChevronRight } from "lucide-react";
import axios from "axios";
import { API_URL } from "../../../api";
import toast from "react-hot-toast";
import Container from "../../ui/Container";

const ShopNew = () => {
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  // Fetch categories from the backend
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/category/get-category`);
      if (data?.success && data.category?.length > 0) {
        // Transform admin categories to component format with enhanced UI data
        const transformedCategories = data.category.map((category, index) => ({
          _id: category._id,
          name: category.name,
          slug: category.slug,
          image: category.image,
          description: getCategoryDescription(category.name),
          icon: getCategoryIcon(category.name, index),
          gradient: getCategoryGradient(index)
        }));
        
        setCategories(transformedCategories);
      } else {
        // Fallback categories if API fails
        setCategories([
          {
            _id: 'drones',
            name: 'Professional Drones',
            slug: 'drones',
            description: 'High-performance drones for professional cinematography and industrial applications',
            icon: '🚁',
            gradient: 'from-emerald-500 to-teal-600',
            image: '/003.jpg'
          },
          {
            _id: 'cameras',
            name: 'Camera Systems',
            slug: 'cameras',
            description: 'Advanced imaging solutions with 4K recording and gimbal stabilization',
            icon: '📸',
            gradient: 'from-blue-500 to-indigo-600',
            image: '/FCpix.png'
          },
          {
            _id: 'accessories',
            name: 'Accessories',
            slug: 'accessories',
            description: 'Essential accessories including batteries, propellers, and carrying cases',
            icon: '⚡',
            gradient: 'from-purple-500 to-pink-600',
            image: '/sensors.png'
          }
        ]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading categories");
      // Fallback categories on error
      setCategories([
        {
          _id: 'drones',
          name: 'Professional Drones',
          slug: 'drones',
          description: 'High-performance drones for professional cinematography and industrial applications',
          icon: '🚁',
          gradient: 'from-emerald-500 to-teal-600',
          image: '/003.jpg'
        },
        {
          _id: 'cameras',
          name: 'Camera Systems',
          slug: 'cameras',
          description: 'Advanced imaging solutions with 4K recording and gimbal stabilization',
          icon: '📸',
          gradient: 'from-blue-500 to-indigo-600',
          image: '/FCpix.png'
        },
        {
          _id: 'accessories',
          name: 'Accessories',
          slug: 'accessories',
          description: 'Essential accessories including batteries, propellers, and carrying cases',
          icon: '⚡',
          gradient: 'from-purple-500 to-pink-600',
          image: '/sensors.png'
        }
      ]);
    }
  };

  // Helper functions to enhance category data
  const getCategoryDescription = (categoryName) => {
    const descriptions = {
      'Professional Drones': 'High-performance drones for professional cinematography and industrial applications',
      'Camera Systems': 'Advanced imaging solutions with 4K recording and gimbal stabilization',
      'Accessories': 'Essential accessories including batteries, propellers, and carrying cases',
      'Batteries': 'Long-lasting power solutions for extended flight operations',
      'Motors': 'High-efficiency brushless motors for superior performance',
      'Controllers': 'Precision remote controllers with advanced telemetry',
      'Sensors': 'Advanced sensor systems for navigation and obstacle avoidance',
      'Frames': 'Lightweight yet durable frames engineered for optimal aerodynamics',
      'Propellers': 'Precision-engineered propellers for maximum efficiency and performance'
    };
    
    return descriptions[categoryName] || `Explore our premium ${categoryName.toLowerCase()} collection designed for professionals and enthusiasts alike.`;
  };

  const getCategoryIcon = (categoryName, index) => {
    const icons = {
      'Professional Drones': '🚁',
      'Camera Systems': '📸',
      'Accessories': '⚡',
      'Batteries': '🔋',
      'Motors': '⚙️',
      'Controllers': '🎮',
      'Sensors': '📡',
      'Frames': '🔧',
      'Propellers': '🌀'
    };
    
    const fallbackIcons = ['🚁', '📸', '⚡', '🔋', '⚙️', '🎮', '📡', '🔧', '🌀'];
    return icons[categoryName] || fallbackIcons[index % fallbackIcons.length];
  };

  const getCategoryGradient = (index) => {
    const gradients = [
      'from-emerald-500 to-teal-600',
      'from-blue-500 to-indigo-600', 
      'from-purple-500 to-pink-600',
      'from-orange-500 to-red-600',
      'from-cyan-500 to-blue-600',
      'from-green-500 to-emerald-600',
      'from-violet-500 to-purple-600',
      'from-rose-500 to-pink-600',
      'from-amber-500 to-orange-600'
    ];
    
    return gradients[index % gradients.length];
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const filters = [
    { id: 'all', label: 'All Categories', icon: Sparkles },
    { id: 'professional', label: 'Pro Series', icon: Award },
    { id: 'consumer', label: 'Consumer', icon: Zap },
    { id: 'enterprise', label: 'Enterprise', icon: Shield }
  ];

  const handleCategoryClick = (category) => {
    // Use slug from admin data, fallback to _id if no slug
    const categoryPath = category.slug || category.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/category/${categoryPath}`, {
      state: { 
        categoryName: category.name,
        categoryId: category._id 
      }
    });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 backdrop-blur-md border border-emerald-400/30 rounded-full text-emerald-300 font-semibold text-sm mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Explore Our Collection
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Award className="w-4 h-4" />
            </motion.div>
          </motion.div>

          <motion.h2 
            className="text-5xl lg:text-7xl font-display font-bold leading-tight mb-6"
          >
            <span className="text-white">
              Cutting-Edge
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">
              Drone Technology
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            From professional cinematography to industrial applications, discover our comprehensive range of advanced drone solutions
          </motion.p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-16"
        >
          <div className="flex gap-2 p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Categories Display */}
        {categories.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-400">Loading categories...</p>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: "easeOut" 
                }}
                onHoverStart={() => setHoveredCategory(category._id)}
                onHoverEnd={() => setHoveredCategory(null)}
                onClick={() => handleCategoryClick(category)}
                className="group cursor-pointer"
              >
                {/* Category Card */}
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
                >
                  {/* Glowing Border Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  
                  {/* Card Content */}
                  <div className="relative z-10 p-8">
                    {/* Icon Header */}
                    <div className="flex items-center justify-between mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="text-4xl"
                      >
                        {category.icon || '🚁'}
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ 
                          opacity: hoveredCategory === category._id ? 1 : 0,
                          x: hoveredCategory === category._id ? 0 : 20
                        }}
                        transition={{ duration: 0.3 }}
                        className="p-2 bg-white/10 rounded-full"
                      >
                        <ChevronRight className="w-5 h-5 text-emerald-400" />
                      </motion.div>
                    </div>

                    {/* Category Info */}
                    <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors duration-300">
                      {category.name}
                    </h3>
                    
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      {category.description || 'Explore our premium drone solutions designed for professionals and enthusiasts.'}
                    </p>

                    {/* Stats/Features */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[
                        { label: 'Products', value: '25+' },
                        { label: 'Rating', value: '4.9★' },
                        { label: 'Reviews', value: '1.2k' }
                      ].map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-lg font-bold text-white">{stat.value}</div>
                          <div className="text-xs text-slate-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-6 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:from-blue-600 group-hover:to-purple-600"
                    >
                      Explore Category
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>

                  {/* Product Preview Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: hoveredCategory === category._id ? 1 : 0,
                      scale: hoveredCategory === category._id ? 1 : 0.8
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-4 right-4 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20"
                  >
                    <img
                      src={category.image || '/003.jpg'}
                      alt={category.name}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center p-8 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 backdrop-blur-md border border-emerald-400/30 rounded-2xl"
          >
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Need Custom Solutions?</h3>
              <p className="text-slate-300">Our experts can help you find the perfect drone for your specific needs</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              Contact Expert
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ShopNew;