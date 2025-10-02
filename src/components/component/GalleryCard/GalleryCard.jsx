import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Calendar, Users } from "lucide-react";
import Container from "../../ui/Container";
import axios from "axios";
import { API_URL } from "../../../api";

const GalleryCard = () => {
  const [experiences, setExperiences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  
  const containerRef = useRef(null);

  // Fetch hero data from API
  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/hero`);
      if (data.success && data.heros?.length > 0) {
        const activeHeroes = data.heros
          .filter(hero => hero.isActive)
          .sort((a, b) => a.order - b.order);
        
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
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6">
            <span>Explore Our</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-600 ml-3">
              Experiences
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From training arenas to competitive racing, discover the world of possibilities with our drone experiences
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft overflow-hidden border border-white/50 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <div className="relative h-[400px] lg:h-full">
                  <div className="absolute inset-0">
                    <img
                      key={currentIndex}
                      src={currentExperience.src}
                      alt={currentExperience.title}
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
                    
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
                  </div>

                  {/* Navigation Buttons */}
                  <div className="absolute inset-0 flex items-center justify-between p-6 pointer-events-none">
                    <button
                      onClick={prevImage}
                      className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-800 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 pointer-events-auto"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-800 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 pointer-events-auto"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
                    <MapPin className="w-4 h-4" />
                    {currentExperience.category}
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-6 leading-tight">
                    {currentExperience.title}
                  </h2>

                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {currentExperience.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 gap-3 mb-8">
                    {currentExperience.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={currentExperience.buttonAction}
                      className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      {currentExperience.buttonText}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            {experiences.length > 1 && (
              <div className="flex justify-center gap-2 py-6">
                {experiences.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-emerald-600 scale-125' 
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GalleryCard;