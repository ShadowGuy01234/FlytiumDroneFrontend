import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Check } from "lucide-react";
import axios from "axios";
import { API_URL } from "../../../api";
import toast from "react-hot-toast";


const ProductAdCard = () => {
  const [product, setProduct] = useState(null); // State for product data

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/ad/get-ads`);
      if (data?.success) {
        setProduct(data.ads[0]);  // Assuming you want the first ad
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load product");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-white to-gray-50/50">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <span className="text-slate-600 font-medium">Loading special offer...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl opacity-20"></div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-strong border border-white/50 overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-12 p-8 lg:p-16">
            {/* Content Section */}
            <div className="space-y-8 order-2 lg:order-1 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium w-fit"
              >
                <Clock className="w-4 h-4 mr-2" />
                Special Offer Available
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 leading-tight">
                  {product.title}
                </h2>
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl lg:text-4xl font-bold text-emerald-600">
                    ₹{product.price}
                  </span>
                  <span className="text-lg text-slate-500 line-through">
                    ₹{Math.round(product.price * 1.2)}
                  </span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full">
                    Save 20%
                  </span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-slate-600 leading-relaxed"
              >
                {product.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-display font-semibold text-slate-900">
                  Key Features
                </h3>
                <div className="grid gap-3">
                  {Array.isArray(product.features) && product.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className="flex items-center p-4 bg-emerald-50 border border-emerald-100 rounded-xl hover:bg-emerald-100/50 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <Check className="w-5 h-5 text-emerald-700" />
                      </div>
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <motion.a
                  href="/store"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  Order Now
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="/about"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 text-center"
                >
                  Learn More
                </motion.a>
              </motion.div>
            </div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
              className="relative order-1 lg:order-2"
            >
              {/* Background Elements */}
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-56 h-56 bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded-full blur-2xl"></div>
              
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm rounded-2xl p-8 shadow-medium border border-white/50">
                <motion.div 
                  className="aspect-square flex items-center justify-center"
                >
                  <motion.img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-contain drop-shadow-2xl"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </motion.div>
                
                {/* Product Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -top-4 -left-4 bg-emerald-600 text-white p-3 rounded-full shadow-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </motion.div>

                {/* Discount Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="absolute -top-4 -right-4 bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm"
                >
                  20% OFF
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProductAdCard;
