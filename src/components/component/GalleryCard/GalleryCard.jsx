import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Calendar, Users } from "lucide-react";
import Container from "../../ui/Container";
import axios from "axios";
import { API_URL } from "../../../api";

const GalleryCard = () => {
  // All state hooks first
  const [experiences, setExperiences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // All ref hooks
  const containerRef = useRef(null);
  
  // All motion hooks - keep them simple to avoid conflicts
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  
  // Optional scroll tracking for enhanced effects
  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch hero data from API
  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/hero`);
      if (data.success && data.heros?.length > 0) {
        // Get active hero slides and sort by order
        const activeHeroes = data.heros
          .filter(hero => hero.isActive)
          .sort((a, b) => a.order - b.order);
        
        // Transform API data to match component format
        const transformedData = activeHeroes.map(hero => ({
          id: hero._id,
          src: hero.image,
          category: hero.category || "Experience",
          title: hero.title,
          description: hero.description,
          buttonText: hero.buttonText || "Learn More",
          buttonAction: () => (window.location.href = hero.buttonLink || "/"),
          features: hero.features || ["Professional", "High Quality", "Expert Support"],
          stats: { 
            participants: hero.stats?.participants || "100+", 
            rating: hero.stats?.rating || "4.9", 
            duration: hero.stats?.duration || "Varies" 
          }
        }));
        
        setExperiences(transformedData);
      }
    } catch (error) {
      console.error("Error fetching hero data:", error);
      // Fallback to default data on error
      setExperiences([
        {
          id: 1,
          src: "/001.jpg",
          category: "Experience",
          title: "Drone Experience Arena",
          description: "Step into our state-of-the-art drone arena where beginners and professionals alike can experience the thrill of aerial flight in a safe, controlled environment.",
          buttonText: "Book Arena",
          buttonAction: () => (window.location.href = "/drone-arena"),
          features: ["Professional Training", "Safety Equipment", "Guided Sessions"],
          stats: { participants: "500+", rating: "4.9", duration: "2 hrs" }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % experiences.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, experiences.length]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % experiences.length);
    setIsAutoPlaying(false);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? experiences.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentExperience = experiences[currentIndex];

  // Loading state
  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-white via-emerald-50/30 to-amber-50/20 relative overflow-hidden">
        <Container>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              <span className="text-slate-600 font-medium">Loading gallery...</span>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // No data state
  if (!experiences.length) {
    return (
      <section className="py-24 bg-gradient-to-br from-white via-emerald-50/30 to-amber-50/20 relative overflow-hidden">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">No gallery content available</h2>
            <p className="text-slate-600">Please check back later or contact admin.</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="py-24 bg-gradient-to-br from-white via-emerald-50/30 to-amber-50/20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-emerald-400/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-amber-400/10 to-transparent rounded-full blur-3xl"></div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1, 
            ease: "easeOut",
            staggerChildren: 0.2
          }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Explore Our
            </motion.span>
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-600 ml-3"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              animate={{ 
                y: [0, -5, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              transition={{ 
                duration: 0.8, 
                delay: 0.5,
                ease: "easeOut"
              }}
            >
              Experiences
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.7,
              ease: "easeOut"
            }}
          >
            From training arenas to competitive racing, discover the world of possibilities with our drone experiences
          </motion.p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft overflow-hidden border border-white/50"
          >
            <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
              {/* Image Section */}
              <motion.div 
                className="relative overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative h-[400px] lg:h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={currentExperience.src}
                        alt={currentExperience.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-emerald-700 font-semibold rounded-full text-sm shadow-lg">
                          {currentExperience.category}
                        </span>
                      </div>

                      {/* Stats Overlay */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-sm text-slate-500">Participants</div>
                              <div className="font-semibold text-slate-900">{currentExperience.stats.participants}</div>
                            </div>
                            <div>
                              <div className="text-sm text-slate-500">Rating</div>
                              <div className="font-semibold text-slate-900">⭐ {currentExperience.stats.rating}</div>
                            </div>
                            <div>
                              <div className="text-sm text-slate-500">Duration</div>
                              <div className="font-semibold text-slate-900">{currentExperience.stats.duration}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="absolute inset-0 flex items-center justify-between p-6 pointer-events-none">
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,1)" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevImage}
                      className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-800 shadow-lg transition-all duration-300 pointer-events-auto"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,1)" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextImage}
                      className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-800 shadow-lg transition-all duration-300 pointer-events-auto"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 leading-tight">
                      {currentExperience.title}
                    </h2>
                    
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {currentExperience.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-900">What's Included:</h4>
                      <div className="space-y-2">
                        {currentExperience.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span className="text-slate-700">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={currentExperience.buttonAction}
                      className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      {currentExperience.buttonText}
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>

                    {/* Dots Navigation */}
                    <div className="flex gap-3 pt-4">
                      {experiences.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`transition-all duration-300 rounded-full ${
                            index === currentIndex
                              ? "w-8 h-3 bg-emerald-600"
                              : "w-3 h-3 bg-slate-300 hover:bg-emerald-400"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Auto-play Toggle */}
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className={`px-3 py-1 rounded-full transition-colors ${
                          isAutoPlaying 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {isAutoPlaying ? 'Auto-playing' : 'Auto-play off'}
                      </button>
                      <span>•</span>
                      <span>{currentIndex + 1} of {experiences.length}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default GalleryCard;
