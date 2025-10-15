import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-white">
      
      {/* Opening Statement - Horizontal Scroll Banner */}
      <section className="py-10 border-b-4 border-gray-900 overflow-hidden">
        <div 
          className="flex animate-infinite-scroll whitespace-nowrap"
          style={{
            width: 'fit-content',
            minWidth: '100vw',
            willChange: 'transform',
          }}
        >
          <span className="inline-block text-6xl md:text-8xl font-black text-gray-200 px-4">
            INNOVATION • PRECISION • EXCELLENCE • INNOVATION • PRECISION • EXCELLENCE • 
          </span>
          <span className="inline-block text-6xl md:text-8xl font-black text-gray-200 px-4">
            INNOVATION • PRECISION • EXCELLENCE • INNOVATION • PRECISION • EXCELLENCE • 
          </span>
          <span className="inline-block text-6xl md:text-8xl font-black text-gray-200 px-4">
            INNOVATION • PRECISION • EXCELLENCE • INNOVATION • PRECISION • EXCELLENCE • 
          </span>
        </div>
      </section>

      {/* Who We Are - Asymmetric Layout */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left: Title and Line */}
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <span className="text-sm font-bold tracking-[0.3em] uppercase text-gray-400">
                  Chapter One
                </span>
                <div className="flex items-start gap-4 py-2">
                  
                  <div className="w-1 h-32 bg-gradient-to-b from-emerald-600 to-blue-600"></div>
                  <div>
                    <h2 className="text-5xl font-black text-gray-900 leading-tight">
                      Who<br />We Are
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-6">
                <p className="text-3xl font-light text-gray-900 leading-relaxed border-l-2 border-gray-900 pl-8">
                  Flytium Drone is not just a company—<br />
                  it's a movement.
                </p>
                
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed pl-8">
                  <p>
                    We exist at the intersection of technology and possibility, crafting 
                    drone solutions that push the boundaries of what aerial innovation can achieve.
                  </p>
                  
                  <p>
                    From cutting-edge drone technology to comprehensive electronics distribution, 
                    we serve creators, engineers, and visionaries who refuse to settle for ordinary.
                  </p>

                  <p className="font-semibold text-gray-900">
                    Our mission is simple: Make advanced drone technology accessible to everyone.
                  </p>
                </div>
              </div>

              {/* Stats in Compact Format */}
              <div className="grid grid-cols-3 gap-8 pt-12 border-t-2 border-gray-200">
                <div>
                  <div className="text-4xl font-black text-gray-900">500+</div>
                  <div className="text-sm text-gray-600 mt-1">Products Delivered</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-gray-900">30+</div>
                  <div className="text-sm text-gray-600 mt-1">Countries Reached</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600 mt-1">Community Strong</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Chapter 2: The Story - Split Screen Narrative */}
      <section className="min-h-screen flex items-center py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: The Story */}
            <div className="space-y-12">
              <div>
                <span className="text-sm font-bold tracking-[0.3em] uppercase text-gray-400">
                  Chapter Two
                </span>
                <h2 className="text-6xl lg:text-7xl font-black text-gray-900 mt-4 mb-8">
                  The Story
                </h2>
              </div>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p className="text-2xl font-light text-gray-900">
                  In a world rapidly transforming through technology, we saw an opportunity 
                  to <span className="font-bold">redefine what's possible</span>.
                </p>

                <p>
                  Founded by <span className="font-semibold text-gray-900">Ankit Kumar Mishra</span>, 
                  a Ph.D. scholar at MMMUT Gorakhpur, Flytium Drone emerged from years of research, 
                  passion, and an unwavering belief in the power of aerial innovation.
                </p>

                <p>
                  We're not just building drones. We're crafting <span className="font-semibold text-gray-900">tools 
                  for dreamers</span>, engineers, creators, and pioneers who refuse to be bound by gravity.
                </p>

                {/* Visual Quote */}
                <div className="border-l-4 border-gray-900 pl-6 py-4 my-8">
                  <p className="text-xl italic text-gray-900">
                    "Technology should elevate humanity, not complicate it."
                  </p>
                  <p className="text-sm text-gray-500 mt-2">— Our Founding Principle</p>
                </div>
              </div>
            </div>

            {/* Right: Founder Image with Creative Frame */}
            <div className="relative">
              
              
              <div className="relative z-10">
                {/* Corner brackets */}
                <div className="absolute -top-6 -left-6 w-24 h-24 border-l-4 border-t-4 border-gray-900"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r-4 border-b-4 border-gray-900"></div>
                
                {/* Image */}
                <div className="aspect-[1:1] overflow-hidden bg-gray-100">
                  <img
                    src="https://res.cloudinary.com/dsg5tzzdg/image/upload/v1759421026/ankit_sir_kfgxxo.png"
                    alt="Ankit Kumar Mishra - Founder"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                {/* Caption */}
                <div className="mt-6 border-t-2 border-gray-900 pt-4">
                  <p className="text-sm font-bold tracking-[0.2em] uppercase text-gray-900">
                    Ankit Kumar Mishra
                  </p>
                  <p className="text-sm text-gray-600">
                    Founder & Visionary
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* What We Stand For - Grid with Borders */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-gray-400">
                  Chapter Three
                </span>
          <div className="mb-20">
            <h2 className="text-5xl font-black text-gray-900 py-2">What We Stand For</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 mt-6"></div>
          </div>

          {/* Three Column Grid */}
          <div className="grid md:grid-cols-3 gap-0 border-2 border-gray-900">
            
            {/* Mission */}
            <div className="p-12 border-r-2 border-gray-900 hover:bg-white transition-colors group">
              <div className="space-y-6">
                <div className="text-7xl font-black text-gray-200 group-hover:text-emerald-600 transition-colors">
                  01
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  Democratize drone technology and make advanced aerial solutions 
                  accessible to everyone—from hobbyists to industry leaders.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="p-12 border-r-2 border-gray-900 hover:bg-white transition-colors group">
              <div className="space-y-6">
                <div className="text-7xl font-black text-gray-200 group-hover:text-blue-600 transition-colors">
                  02
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  Build a future where technology elevates humanity, pushing boundaries 
                  through innovation, precision, and passion in every product.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="p-12 hover:bg-white transition-colors group">
              <div className="space-y-6">
                <div className="text-7xl font-black text-gray-200 group-hover:text-purple-600 transition-colors">
                  03
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Values</h3>
                <p className="text-gray-600 leading-relaxed">
                  Excellence in innovation, unwavering commitment to quality, 
                  and customer satisfaction in everything we do.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us - List Format */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-gray-400">
                  Chapter Four
                </span>
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            
            {/* Left: Title */}
            <div className="lg:sticky lg:top-32">
              <h2 className="text-6xl font-black text-gray-900 leading-tight py-2">
                Why Choose<br />Flytium?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 mt-8"></div>
            </div>

            {/* Right: List */}
            <div className="space-y-8">
              {[
                {
                  number: "01",
                  title: "Research-Driven Innovation",
                  description: "Founded by a Ph.D. scholar, our products are backed by rigorous research and academic excellence."
                },
                {
                  number: "02",
                  title: "Quality Guaranteed",
                  description: "Every product undergoes strict quality checks to ensure it meets our high standards of performance."
                },
                {
                  number: "03",
                  title: "Global Reach",
                  description: "Serving customers across 30+ countries with reliable shipping and dedicated support."
                },
                {
                  number: "04",
                  title: "Community First",
                  description: "Join 50,000+ innovators, creators, and dreamers who trust Flytium for their aerial needs."
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="text-3xl font-black text-gray-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-blue-600 transition-all">
                      {item.number}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action - Side by Side */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left: Message */}
            <div className="space-y-8">
              <h2 className="text-5xl font-black leading-tight text-white">
                Ready to<br />
                Take Flight?
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Join thousands of innovators who are already building the future with Flytium Drone technology.
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-blue-600"></div>
            </div>

            {/* Right: CTA Buttons */}
            <div className="space-y-6">
              <Link to="/products" className="block w-full group relative px-12 py-6 bg-white text-gray-900 font-bold tracking-wider uppercase text-sm overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Explore Products
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
              </Link>

              <Link to="/contact" className="block w-full px-12 py-6 border-2 border-white text-white font-bold tracking-wider uppercase text-sm hover:bg-white hover:text-gray-900 transition-all text-center">
                Contact Us
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
