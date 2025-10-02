import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../api";
import toast from "react-hot-toast";


const ShopByType = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories from the backend
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/category/get-category`);
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="h-1 w-12 bg-emerald-600 rounded-full"></div>
            <span className="mx-4 text-emerald-600 font-medium text-sm uppercase tracking-wider">
              Our Products
            </span>
            <div className="h-1 w-12 bg-emerald-600 rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
            Professional Drone Solutions
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover our comprehensive range of cutting-edge drone technology and accessories
          </p>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              <span className="text-slate-600 font-medium">Loading categories...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={category._id}
                onClick={() => navigate(`/category/${category.slug}`)}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-white rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-200">
                  {/* Image Container */}
                  <div className="relative p-8 bg-gradient-to-br from-gray-50 to-white group-hover:from-emerald-50 group-hover:to-emerald-100/50 transition-all duration-300">
                    <div className="aspect-square flex items-center justify-center">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-contain transform transition-all duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 text-center bg-white">
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors duration-200 mb-2">
                      {category.name}
                    </h3>
                    <div className="flex items-center justify-center text-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="text-sm font-medium mr-2">Explore Collection</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-100 group-hover:bg-emerald-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigate('/store')}
            className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View All Products
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopByType;
