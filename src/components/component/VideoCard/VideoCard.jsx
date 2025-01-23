import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const VideoCard = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Video Section */}
            <div className="relative group">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer"
                >
                  <Play className="w-6 h-6 text-blue-600 ml-1" />
                </motion.div>
              </div>
              <video
                className="w-full h-[400px] object-cover"
                poster="/video-thumbnail.jpg"
                muted
              >
                <source src="./13370-247710847_medium.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Experience the Future of Drones
              </h2>
              <p className="text-gray-600 mb-6">
                Discover how our cutting-edge drone technology is
                revolutionizing aerial photography, delivery services, and
                industrial applications.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors self-start"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoCard;
