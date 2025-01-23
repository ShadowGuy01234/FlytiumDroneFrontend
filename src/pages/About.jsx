import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaEye, FaStar, FaLinkedin, FaGithub } from "react-icons/fa";
import { BiSolidQuoteLeft } from "react-icons/bi";

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Hero Section with Improved Layout */}
      <motion.div
        variants={fadeIn}
        className="container mx-auto px-4 py-24 md:py-32"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 max-w-6xl mx-auto">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Revolutionizing
              <span className="text-blue-600"> Drone Technology</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Welcome to Flytium Drone Private Limited, where innovation meets
              excellence in drone technology and electronics distribution.
            </p>
          </div>

          <div className="relative group w-full md:w-1/2">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/about-hero.jpg"
                alt="Drone Technology"
                className="w-full h-[400px] object-cover transform transition duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Founder Section with Modern Design */}
      <motion.div variants={fadeIn} className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="relative group w-full md:w-1/3">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto">
                <img
                  src="./ankit sir.png"
                  alt="Founder"
                  className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="flex-1 space-y-6 text-center md:text-left">
              <BiSolidQuoteLeft className="text-6xl text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900">
                Meet Our Founder
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                I am Ankit Kumar Mishra, founder of Flytium Drone Private
                Limited and a Ph.D. scholar at MMMUT, Gorakhpur. My passion lies
                in advancing drone technology and its applications in modern
                industry.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <FaLinkedin className="text-3xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <FaGithub className="text-3xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Values Section with Enhanced Cards */}
      <motion.div variants={fadeIn} className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                icon: <FaRocket className="text-5xl text-blue-600" />,
                title: "Mission",
                description:
                  "To revolutionize drone technology and electronics distribution through innovation and excellence.",
              },
              {
                icon: <FaEye className="text-5xl text-blue-600" />,
                title: "Vision",
                description:
                  "To become a leading force in drone innovation and electronics distribution worldwide.",
              },
              {
                icon: <FaStar className="text-5xl text-blue-600" />,
                title: "Values",
                description:
                  "Excellence in innovation, unwavering commitment to quality, and customer satisfaction.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {item.icon}
                  <h3 className="text-2xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Section with Modern Design */}
      <motion.div variants={fadeIn} className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            {[
              {
                number: "500+",
                label: "Products Sold",
                description:
                  "Successfully delivered high-quality drone products",
              },
              {
                number: "30+",
                label: "Countries Served",
                description: "Global reach across different continents",
              },
              {
                number: "50K+",
                label: "Happy Customers",
                description: "Building a community of loyal tech enthusiasts",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl font-bold text-blue-600 mb-4">
                  {stat.number}
                </div>
                <div className="text-2xl font-semibold text-gray-900 mb-4">
                  {stat.label}
                </div>
                <p className="text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Call to Action Section */}
      <motion.div variants={fadeIn} className="bg-blue-600 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white space-y-8">
            <h2 className="text-4xl font-bold">Ready to Take Flight?</h2>
            <p className="text-xl opacity-90">
              Join us in shaping the future of drone technology
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us Today
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
