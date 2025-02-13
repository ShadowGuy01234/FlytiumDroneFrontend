import React, { useState, useEffect } from "react";
import "./Hero.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { API_URL } from "../../../api";

const Hero = ({ handleOrderPopup }) => {
  const [heroSlides, setHeroSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroSlides();
  }, []);

  const fetchHeroSlides = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/hero`);
      if (data.success) {
        setHeroSlides(data.heros);
      }
    } catch (error) {
      console.error("Error fetching hero slides:", error);
    } finally {
      setLoading(false);
    }
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
    pauseOnHover: false,
    pauseOnFocus: true,
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-300 rounded-full mt-8 hover:bg-blue-600 transition-colors"></div>
    ),
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative overflow-hidden min-h-[650px] bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>

      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {heroSlides.map((data) => (
            <div key={data._id} className="outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
                {/* Content Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                    {data.title}
                  </h1>
                  <p className="text-lg text-gray-600 max-w-lg">
                    {data.description}
                  </p>
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleOrderPopup}
                      className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      {data.buttonText}
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Learn More
                    </motion.button>
                  </div>
                </motion.div>

                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
                  <img
                    src={data.image}
                    alt={data.title}
                    className="relative w-full h-[400px] object-contain transform hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
