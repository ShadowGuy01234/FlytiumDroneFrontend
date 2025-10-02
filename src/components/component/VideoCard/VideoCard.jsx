import React, { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, ArrowRight } from "lucide-react";
import Container from "../../ui/Container";

const VideoCard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlayPause = () => {
    const video = document.getElementById('drone-video');
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    const video = document.getElementById('drone-video');
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const videoFeatures = [
    { icon: "🎯", title: "Precision Control", description: "Advanced flight stabilization" },
    { icon: "📸", title: "4K Recording", description: "Ultra-high definition capture" },
    { icon: "🌐", title: "Live Streaming", description: "Real-time video transmission" },
    { icon: "🔋", title: "Extended Flight", description: "Up to 30 minutes flight time" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-amber-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-amber-400/10 to-transparent rounded-full blur-3xl"></div>

      <Container>
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6">
            See Our Drones in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-600 ml-3">
              Action
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Experience the precision, power, and beauty of our drone technology
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft overflow-hidden border border-white/50 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Video Section */}
              <div className="relative group">
                <div className="relative overflow-hidden hover:scale-105 transition-transform duration-300">
                  <video
                    id="drone-video"
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                    poster="/003.jpg"
                    muted={isMuted}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src="./13370-247710847_medium.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 group-hover:from-black/40 transition-all duration-300">
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={handlePlayPause}
                        className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 group-hover:scale-110"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-emerald-600" />
                        ) : (
                          <Play className="w-8 h-8 text-emerald-600 ml-1" />
                        )}
                      </button>
                    </div>

                    {/* Video Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <div className="flex gap-3">
                        <button
                          onClick={handleMuteToggle}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-300"
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                      </div>
                      
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-300">
                        <Maximize2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Live Demo
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-6 leading-tight">
                    Experience the Future of 
                    <span className="text-emerald-600"> Aerial Technology</span>
                  </h2>

                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    Watch our professional-grade drones in action. From smooth aerial cinematography to precision industrial applications, see how our technology transforms possibilities into reality.
                  </p>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {videoFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-300 animate-fade-in-up"
                        style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                      >
                        <div className="text-2xl mb-2">{feature.icon}</div>
                        <h4 className="font-semibold text-slate-900 mb-1">{feature.title}</h4>
                        <p className="text-sm text-slate-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                      Explore Products
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    
                    <button className="px-8 py-4 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                      Watch Full Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VideoCard;
