import React, { useState, useEffect, useRef } from 'react';
// Removed Framer Motion for performance
import Container from '../../ui/Container';

const ImageSlider = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollerRef = useRef(null);

  const cards = [
    {
      id: 1,
      title: "Components",
      subtitle: "Premium Drone Parts",
      description: "High-quality components engineered for peak performance and reliability",
      icon: "🔧",
      gradient: "from-violet-600 via-purple-600 to-blue-600",
      bgPattern: "geometric",
      features: ["Flight Controllers", "Motors & ESCs", "Cameras & Gimbals", "Batteries"],
      image: "/FCpix.png"
    },
    {
      id: 2,
      title: "Technology",
      subtitle: "Smart Systems",
      description: "Cutting-edge AI and sensor technology for autonomous flight",
      icon: "🤖",
      gradient: "from-pink-600 via-rose-600 to-orange-500",
      bgPattern: "circuits",
      features: ["AI Navigation", "Obstacle Avoidance", "Real-time Processing", "Smart Sensors"],
      image: "/sensors.png"
    },
    {
      id: 3,
      title: "Innovation",
      subtitle: "Future Forward",
      description: "Revolutionary designs pushing the boundaries of what's possible",
      icon: "🚀",
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      bgPattern: "waves",
      features: ["Next-Gen Materials", "Advanced Aerodynamics", "Modular Design", "Eco-Friendly"],
      image: "/RT.png"
    },
    {
      id: 4,
      title: "Solutions",
      subtitle: "Complete Systems",
      description: "End-to-end drone solutions for professional applications",
      icon: "⚡",
      gradient: "from-indigo-600 via-blue-600 to-purple-600",
      bgPattern: "grid",
      features: ["Custom Solutions", "24/7 Support", "Global Warranty", "Training Included"],
      image: "/motor.png"
    },
    {
      id: 5,
      title: "Support",
      subtitle: "24/7 Assistance",
      description: "Round-the-clock support for all your drone technology needs",
      icon: "🛠️",
      gradient: "from-amber-600 via-orange-600 to-red-600",
      bgPattern: "geometric",
      features: ["Live Chat Support", "Video Tutorials", "Remote Assistance", "Expert Guidance"],
      image: "/C1.png"
    },
    {
      id: 6,
      title: "Training",
      subtitle: "Skill Development",
      description: "Comprehensive training programs for drone operation and maintenance",
      icon: "🎓",
      gradient: "from-teal-600 via-green-600 to-emerald-600",
      bgPattern: "waves",
      features: ["Certified Courses", "Hands-on Training", "Safety Protocols", "Advanced Techniques"],
      image: "/ESC.png"
    }
  ];

  // Duplicate cards for seamless infinite effect
  const duplicatedCards = [...cards, ...cards];

  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Elements (static for performance) */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-120 h-72 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-spin-slow" />
        <div className="absolute bottom-20 right-20 w-120 h-72 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-spin-slow-reverse" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <Container>
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-5xl lg:text-7xl font-display font-bold text-white mb-6">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Solutions
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive range of drone technologies and solutions
          </p>
        </div>
      </Container>

      {/* Infinite Scrolling Cards - CSS Animation */}
      <div className="relative z-10 w-full overflow-hidden" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
        <div
          ref={scrollerRef}
          className="flex gap-12 py-6 animate-infinite-scroll"
          style={{
            paddingLeft: '2rem',
            paddingRight: '2rem',
            width: 'fit-content',
            minWidth: '100vw',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            perspective: 1000,
            WebkitPerspective: 1000
          }}
        >
          {duplicatedCards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="group relative cursor-pointer flex-shrink-0 w-[320px] lg:w-[360px]"
            >
              {/* Stacked Cards Effect */}
              <div className="relative">
                {/* Background Cards (Stacked) */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.gradient} transform rotate-2 translate-x-3 translate-y-3 opacity-60 blur-sm`} />
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.gradient} transform rotate-1 translate-x-1.5 translate-y-1.5 opacity-80`} />

                {/* Main Card */}
                <div
                  className={`
                    relative bg-gradient-to-br ${card.gradient}
                    rounded-3xl p-6 h-[480px]
                    shadow-2xl border border-white/20 backdrop-blur-sm
                    transform-gpu transition-all duration-500
                  `}
                >
                  {/* Card Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-xl">
                      {card.icon}
                    </div>

                    {/* Title and Subtitle */}
                    <div className="mb-4">
                      <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">
                        {card.title}
                      </h3>
                      <p className="text-lg text-white/80 font-medium">
                        {card.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-white/90 text-base leading-relaxed mb-6 flex-grow">
                      {card.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 mb-6">
                      {card.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-white/90">
                          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button className="w-full py-3 px-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl font-semibold text-white text-base shadow-xl hover:shadow-2xl transition-all duration-300">
                      Explore More
                    </button>
                  </div>

                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    {card.bgPattern === 'geometric' && (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
                    )}
                    {card.bgPattern === 'circuits' && (
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:30px_30px]" />
                    )}
                    {card.bgPattern === 'waves' && (
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
                    )}
                    {card.bgPattern === 'grid' && (
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:25px_25px]" />
                    )}
                  </div>

                  {/* Floating Image */}
                  <div className="absolute top-4 right-4 w-16 h-16">
                    <div className="relative w-full h-full bg-white/10 backdrop-blur-md rounded-xl p-2 shadow-lg">
                      <img src={card.image} alt={card.title} className="w-full h-full object-contain opacity-80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;