import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Clock,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import { API_URL } from "../../../api";
import toast from "react-hot-toast";

const ProductAdCard = () => {
  const [ads, setAds] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const getAds = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/ad/get-ads`);
      if (data?.success && data.ads?.length > 0) {
        setAds(data.ads);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load ads");
    }
  };

  // Auto-change ads every 5 seconds
  useEffect(() => {
    if (ads.length > 1 && isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [ads.length, isAutoPlaying]);

  // Load ads on component mount
  useEffect(() => {
    getAds();
  }, []);

  // Navigation functions
  const goToNext = () => {
    setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
  };

  const goToPrevious = () => {
    setCurrentAdIndex((prevIndex) => 
      prevIndex === 0 ? ads.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentAdIndex(index);
    setIsAutoPlaying(false);
  };

  // Don't render if no ads
  if (!ads.length) return null;

  const currentAd = ads[currentAdIndex];

  return (
    <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-amber-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-emerald-400/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-amber-400/10 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        {ads.length > 1 && (
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 animate-fade-in-up">
              Featured Products
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover our latest offerings and exclusive deals
            </p>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2">
              {ads.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentAdIndex
                      ? "bg-emerald-600 scale-125"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="relative">
          {/* Navigation Arrows */}
          {ads.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 flex items-center justify-center group"
                aria-label="Previous ad"
              >
                <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-emerald-600 transition-colors" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 flex items-center justify-center group"
                aria-label="Next ad"
              >
                <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-emerald-600 transition-colors" />
              </button>
            </>
          )}

          {/* Ad Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-strong border border-white/50 overflow-hidden transition-opacity duration-500">
            <div className="grid lg:grid-cols-2 gap-12 p-8 lg:p-16">
              {/* Content Section */}
              <div className="space-y-8 order-2 lg:order-1 flex flex-col justify-center">
                <div>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
                    <Clock className="w-4 h-4" />
                    {currentAd.badge || "Limited Time"}
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
                    {currentAd.title}
                  </h1>

                  {/* Description */}
                  <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                    {currentAd.description}
                  </p>

                  {/* Features */}
                  {Array.isArray(currentAd.features) && (
                    <div className="grid gap-3 mb-8">
                      {currentAd.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center p-4 bg-emerald-50 border border-emerald-100 rounded-xl hover:bg-emerald-100/50 transition-colors duration-200"
                        >
                          <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <Check className="w-5 h-5 text-emerald-700" />
                          </div>
                          <span className="text-slate-700 font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      {currentAd.buttonText || "Shop Now"}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="px-8 py-4 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 hover:scale-105 hover:-translate-y-1 transition-all duration-200 text-center">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div className="relative order-1 lg:order-2">
                {/* Background Elements */}
                <div className="absolute -top-8 -right-8 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-2xl"></div>

                {/* Product Image */}
                <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 shadow-soft border border-gray-100 overflow-hidden group">
                  <img
                    src={currentAd.image}
                    alt={currentAd.title}
                    className="w-full h-auto max-h-96 object-contain relative z-10 group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Discount Badge */}
                  {currentAd.discount && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        {currentAd.discount}% OFF
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {ads.length > 1 && isAutoPlaying && (
            <div className="mt-6 mx-auto max-w-md">
              <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-600 transition-all duration-75 ease-linear"
                  style={{ 
                    width: '100%',
                    animation: `progress 5s linear infinite`
                  }}
                  key={currentAdIndex}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default ProductAdCard;