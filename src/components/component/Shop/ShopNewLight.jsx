import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap, Shield, Award, Sparkles, ChevronRight, Package, TrendingUp, Star, Users } from "lucide-react";
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
    <section id="shop" className="py-20 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Soft Gradient Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-100/40 to-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-100/40 to-pink-100/40 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Header Section with Stats */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            {/* Title Section */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-700 text-sm font-semibold mb-6">
                <Package className="w-4 h-4" />
                Premium Drone Collection
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4">
                Shop Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600">
                  Premium Categories
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl">
                Professional-grade drones and accessories for every application. Industry-leading quality, performance, and reliability.
              </p>
            </div>

            
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
                }`}
              >
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Loading categories...</p>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {categories.map((category, index) => (
              <div
                key={category._id}
                onClick={() => handleCategoryClick(category)}
                className="group cursor-pointer"
              >
                <div className="relative bg-white border-2 border-gray-200 rounded-2xl overflow-hidden h-full hover:border-emerald-400 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  {/* Subtle Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-blue-50/0 group-hover:from-emerald-50/30 group-hover:to-blue-50/30 transition-all duration-500 pointer-events-none z-10" />
                  
                  {/* Category Image Banner */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                    <img
                      src={category.image || '/003.jpg'}
                      alt={category.name}
                      className="w-full h-full object-contain object-center p-6 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      onError={(e) => {
                        e.target.src = '/003.jpg';
                        e.target.onerror = null;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent pointer-events-none" />

                    {/* Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-emerald-500 backdrop-blur-sm rounded-full text-white text-xs font-bold shadow-lg animate-pulse">
                      NEW
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    {/* Category Name */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {category.description || 'Explore our premium drone solutions designed for professionals and enthusiasts.'}
                    </p>

                    {/* Info Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-4 py-4 border-y border-gray-100">
                      {[
                        { label: 'Products', value: '25+', icon: Package },
                        { label: 'Rating', value: '4.9', icon: Star },
                        { label: 'Stock', value: 'In Stock', icon: TrendingUp }
                      ].map((item, idx) => (
                        <div key={idx} className="text-center">
                          <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
                            <item.icon className="w-3 h-3" />
                            <span className="text-sm font-bold text-gray-900">{item.value}</span>
                          </div>
                          <div className="text-xs text-gray-500">{item.label}</div>
                        </div>
                      ))}
                    </div>

                    

                    {/* CTA Button */}
                    <button className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.02]">
                      View Products
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Hover Arrow Indicator */}
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:right-6 transition-all duration-300">
                    <ChevronRight className="w-8 h-8 text-emerald-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        
      </Container>
    </section>
  );
};

export default ShopNew;
