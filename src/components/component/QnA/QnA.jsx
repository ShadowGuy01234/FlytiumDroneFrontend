import React, { useState } from "react";
import { MessageCircle, Phone, Mail, Plus, Minus, HelpCircle } from "lucide-react";
import Container from "../../ui/Container";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "What makes Flytium drones different from competitors?",
      answer:
        "Flytium drones are engineered with precision and built using premium components. Our unique combination of advanced flight control systems, professional-grade cameras, and intuitive software makes our drones perfect for both beginners and professionals. Each drone undergoes rigorous quality testing to ensure reliability and performance.",
      category: "Products"
    },
    {
      question: "Do you provide training and support for beginners?",
      answer:
        "Absolutely! We offer comprehensive training programs including hands-on workshops, online tutorials, and one-on-one coaching sessions. Our certified instructors guide you through everything from basic flight operations to advanced aerial photography techniques. We also provide 24/7 technical support.",
      category: "Training"
    },
    {
      question: "What certifications and regulations should I know about?",
      answer:
        "We provide guidance on all necessary certifications including DGCA compliance in India, Part 107 in the US, and other international regulations. Our legal team stays updated with changing drone laws and helps customers navigate licensing requirements for commercial operations.",
      category: "Legal"
    },
    {
      question: "What warranty and after-sales support do you offer?",
      answer:
        "We provide a comprehensive 1-year warranty covering manufacturing defects. Our after-sales support includes free repairs, replacement parts at discounted rates, and lifetime technical assistance. We also offer extended warranty plans for professional users.",
      category: "Support"
    },
    {
      question: "Can I customize my drone for specific applications?",
      answer:
        "Yes! We offer customization services for payload integration, camera upgrades, extended battery packs, and specialized sensors. Our engineering team works with you to design solutions for agriculture, surveillance, mapping, and other industry-specific needs.",
      category: "Custom"
    },
  ];

  const supportChannels = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      info: "+91 9236993440",
      action: "https://wa.me/9236993440",
      color: "emerald"
    },
    {
      icon: Phone,
      title: "Call Us",
      info: "+91 9236993440",
      action: "tel:+919236993440",
      color: "blue"
    },
    {
      icon: Mail,
      title: "Email",
      info: "flytiumdrones@gmail.com",
      action: "mailto:flytiumdrones@gmail.com",
      color: "purple"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <Container>
        {/* Header - Clean and Simple */}
        <div className="max-w-2xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-full text-sm text-gray-600 mb-6">
            <HelpCircle className="w-4 h-4" />
            Support Center
          </div>
          
          <h2 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Questions &<br />
            <span className="text-gray-400">Answers</span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Everything you need to know about our drones, support, and services.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left Side - FAQ List */}
          <div className="lg:col-span-7">
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`
                    border-l-2 transition-all duration-200
                    ${activeIndex === index 
                      ? 'border-gray-900 bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-400'
                    }
                  `}
                >
                  <button
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-start justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-gray-400">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className={`font-semibold text-base transition-colors ${
                        activeIndex === index ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>
                    
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors
                      ${activeIndex === index 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-100 text-gray-600'
                      }
                    `}>
                      {activeIndex === index ? (
                        <Minus className="w-3 h-3" />
                      ) : (
                        <Plus className="w-3 h-3" />
                      )}
                    </div>
                  </button>
                  
                  {activeIndex === index && (
                    <div className="px-6 pb-6">
                      <div className="pl-8">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Contact Cards */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Contact Methods */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                  Get in Touch
                </h3>
                
                {supportChannels.map((channel, index) => {
                  const colorClasses = {
                    emerald: 'border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50',
                    blue: 'border-blue-200 hover:border-blue-400 hover:bg-blue-50',
                    purple: 'border-purple-200 hover:border-purple-400 hover:bg-purple-50'
                  };
                  
                  const iconColors = {
                    emerald: 'text-emerald-600',
                    blue: 'text-blue-600',
                    purple: 'text-purple-600'
                  };

                  return (
                    <a
                      key={index}
                      href={channel.action}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        block p-4 border-2 rounded-lg transition-all duration-200
                        ${colorClasses[channel.color]}
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <channel.icon className={`w-5 h-5 mt-0.5 ${iconColors[channel.color]}`} />
                        <div>
                          <div className="font-semibold text-gray-900 text-sm mb-0.5">
                            {channel.title}
                          </div>
                          <div className="text-sm text-gray-600">
                            {channel.info}
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Hours Box */}
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                  Business Hours
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Mon - Fri</span>
                    <span className="font-mono">10:00 - 18:30</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Saturday</span>
                    <span className="font-mono">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Sunday</span>
                    <span className="font-mono">Emergency</span>
                  </div>
                </div>
              </div>

              {/* CTA Box */}
              <div className="p-6 bg-gray-900 text-white rounded-lg">
                <h4 className="text-lg font-bold mb-2 text-white">
                  Need More Help?
                </h4>
                <p className="text-gray-400 text-sm mb-4">
                  Our experts are ready to assist you with any questions.
                </p>
                <a
                  href="/contact"
                  className="inline-block w-full px-4 py-2.5 bg-white text-gray-900 text-center text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Contact Support →
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;
