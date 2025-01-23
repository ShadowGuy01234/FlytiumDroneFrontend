// import React, { useState, useEffect } from 'react';
import "./Hero.css";

// const Hero = () => {
//   const images = [
//     { src: '/001.jpg', learnMoreUrl: '/learn-more-1', orderNowUrl: '/order-now-1' },
//     { src: '/002.jpg', learnMoreUrl: '/learn-more-2', orderNowUrl: '/order-now-2' },
//     { src: '/003.jpg', learnMoreUrl: '/learn-more-3', orderNowUrl: '/order-now-3' },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [images.length]);

//   const prevSlide = () => {
//     const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
//     setCurrentIndex(index);
//   };

//   const nextSlide = () => {
//     const index = (currentIndex + 1) % images.length;
//     setCurrentIndex(index);
//   };

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <section className="chk">
//       <div className="relative overflow-hidden h-full">
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//               index === currentIndex ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             <img src={image.src} alt={`Slide ${index}`} className="w-full h-full object-cover" />
//           </div>
//         ))}
//       </div>

//       <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
//         <a href={images[currentIndex].learnMoreUrl}>
//           <button className="border border-white text-white bg-transparent rounded-full px-6 py-2 hover:bg-white hover:text-black transition duration-300 ease-in-out">
//             Learn More
//           </button>
//         </a>
//         <a href={images[currentIndex].orderNowUrl}>
//           <button className="bg-black text-white rounded-full px-6 py-2 font-bold transition duration-300 ease-in-out hover:bg-gray-700">
//             Order Now
//           </button>
//         </a>
//       </div>

//       <button
//         onClick={prevSlide}
//         className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 z-20"
//       >
//         &#10094;
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 z-20"
//       >
//         &#10095;
//       </button>

//       <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`w-3 h-3 rounded-full ${
//               currentIndex === index ? 'bg-white' : 'bg-gray-400'
//             }`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image1 from "../../../assets/ser.png";
import Image2 from "../../../assets/sensors.png";
import Image3 from "../../../assets/001.png";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Upto 50% off on all Drone Components",
    description:
      "Discover our premium selection of drone parts and components at unbeatable prices. Limited time offer!",
    buttonText: "Shop Now",
  },
  {
    id: 2,
    img: Image2,
    title: "30% off on all IoT Items",
    description:
      "Explore our cutting-edge IoT devices and sensors. Transform your ideas into smart solutions.",
    buttonText: "Explore IoT",
  },
  {
    id: 3,
    img: Image3,
    title: "70% off on all Products",
    description:
      "Don't miss out on our biggest sale of the year. Premium quality at amazing prices.",
    buttonText: "View Deals",
  },
];

const Hero = ({ handleOrderPopup }) => {
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

  return (
    <div className="relative overflow-hidden min-h-[650px] bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>

      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div key={data.id} className="outline-none">
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
                    src={data.img}
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
