import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ChevronDown, Phone, Mail, MapPin, Clock, HelpCircle, ArrowRight } from "lucide-react";
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
  ];

  const supportChannels = [
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      description: "Instant help via WhatsApp",
      action: "https://wa.me/916307193440",
      color: "bg-green-500 hover:bg-green-600",
      available: "24/7"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Talk to our experts",
      action: "tel:+916307193440",
      color: "bg-blue-500 hover:bg-blue-600",
      available: "10AM-6:30PM"
    },
    {
      icon: Mail,
      title: "Email Support", 
      description: "Detailed technical help",
      action: "mailto:support@flytium.com",
      color: "bg-emerald-500 hover:bg-emerald-600",
      available: "24 hrs"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-amber-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-amber-400/10 to-transparent rounded-full blur-3xl"></div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
            <HelpCircle className="w-4 h-4" />
            FAQ & Support
          </motion.div>
          
          <motion.h2 
            className="text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6"
          >
            Got Questions? We've Got
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-600 ml-3">
              Answers
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Find answers to common questions or get in touch with our expert support team
          </motion.p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Support Channels */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-soft border border-white/50 sticky top-8">
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-6">
                  Need Immediate Help?
                </h3>
                
                <div className="space-y-4 mb-8">
                  {supportChannels.map((channel, index) => (
                    <motion.a
                      key={index}
                      href={channel.action}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        ${channel.color} text-white rounded-xl p-4 flex items-center gap-4 
                        transition-all duration-300 shadow-lg hover:shadow-xl group
                      `}
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <channel.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{channel.title}</h4>
                        <p className="text-sm opacity-90">{channel.description}</p>
                        <span className="text-xs opacity-75">Available: {channel.available}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ))}
                </div>

                {/* Business Hours */}
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-semibold text-emerald-900">Business Hours</h4>
                  </div>
                  <div className="space-y-1 text-sm text-emerald-700">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>10:00 AM - 6:30 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Emergency Only</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-soft border border-white/50">
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-8">
                  Frequently Asked Questions
                </h3>
                
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`
                        border rounded-xl transition-all duration-300 
                        ${activeIndex === index 
                          ? 'border-emerald-200 bg-emerald-50/50 shadow-md' 
                          : 'border-slate-200 bg-white hover:border-emerald-200 hover:shadow-sm'
                        }
                      `}
                    >
                      <button
                        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <span className={`
                            w-2 h-2 rounded-full transition-colors
                            ${activeIndex === index ? 'bg-emerald-500' : 'bg-slate-300'}
                          `}></span>
                          <span className="font-semibold text-slate-900 text-lg">
                            {faq.question}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                            {faq.category}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
                              activeIndex === index ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <div className="pl-6 border-l-2 border-emerald-200">
                                <p className="text-slate-600 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-12 p-6 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl text-white text-center"
                >
                  <h4 className="text-xl font-bold mb-2">Still have questions?</h4>
                  <p className="mb-4 opacity-90">Our expert team is here to help you make the right choice</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <motion.a
                      href="/contact"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Contact Us
                    </motion.a>
                    <motion.a
                      href="/store"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                    >
                      Browse Products
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;
