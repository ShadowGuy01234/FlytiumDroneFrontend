import React from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Shield,
  Clock,
  CreditCard,
  Package,
  Headphones,
  Cpu,
  Wifi,
  Database,
  ArrowRight,
} from "lucide-react";
import "../styles/Service.css";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const ServiceCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-4 bg-blue-50 rounded-xl text-blue-600">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const TrainingCard = ({
  icon: Icon,
  title,
  duration,
  level,
  description,
  topics,
}) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
  >
    <div className="flex items-start gap-4 mb-6">
      <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="flex gap-4 text-sm">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
            {duration}
          </span>
          <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full">
            {level}
          </span>
        </div>
      </div>
    </div>

    <p className="text-gray-600 mb-6">{description}</p>

    <div className="mt-auto">
      <h4 className="font-semibold text-gray-900 mb-3">
        What you&apos;ll learn:
      </h4>
      <ul className="space-y-2 mb-6">
        {topics.map((topic, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-600">
            <ArrowRight className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <span>{topic}</span>
          </li>
        ))}
      </ul>

      <button className="w-full py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
        Enroll Now
      </button>
    </div>
  </motion.div>
);

const Service = () => {
  const services = [
    {
      icon: Truck,
      title: "Free Shipping",
      description:
        "Free shipping on all orders over ₹999. Fast and reliable delivery to your doorstep.",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description:
        "100% secure payment processing. We ensure your data is protected.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Round-the-clock customer service. We're here to help anytime.",
    },
    {
      icon: CreditCard,
      title: "Easy Returns",
      description:
        "30-day easy return policy. No questions asked returns and exchanges.",
    },
    {
      icon: Package,
      title: "Quality Products",
      description:
        "All products are quality checked. We ensure the best for our customers.",
    },
    {
      icon: Headphones,
      title: "Premium Support",
      description:
        "Dedicated support team to assist you with any queries or concerns.",
    },
  ];

  const trainings = [
    {
      icon: Cpu,
      title: "IoT Fundamentals",
      duration: "6 weeks",
      level: "Beginner",
      description:
        "Master the basics of IoT architecture, sensors, and connectivity protocols with hands-on projects.",
      topics: [
        "Introduction to IoT ecosystems",
        "Sensor types and applications",
        "Basic electronics for IoT",
        "Communication protocols",
      ],
    },
    {
      icon: Wifi,
      title: "IoT Networking",
      duration: "8 weeks",
      level: "Intermediate",
      description:
        "Deep dive into IoT networking protocols and wireless communications with practical implementations.",
      topics: [
        "WiFi and Bluetooth protocols",
        "LoRaWAN and cellular IoT",
        "Network security basics",
        "Troubleshooting connectivity",
      ],
    },
    {
      icon: Database,
      title: "IoT Data Management",
      duration: "7 weeks",
      level: "Intermediate",
      description:
        "Learn to collect, process, and analyze IoT sensor data with real-world applications.",
      topics: [
        "Data collection methods",
        "Real-time data processing",
        "Database management",
        "Data visualization",
      ],
    },
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Hero Section */}
      <motion.div
        variants={fadeIn}
        className="relative bg-blue-600 text-white py-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl opacity-90">
              Empowering your journey with cutting-edge drone technology and
              expert training
            </p>
          </div>
        </div>
      </motion.div>

      {/* Services Section */}
      <motion.section variants={fadeIn} className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600">
              Experience excellence with our comprehensive range of services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Training Section */}
      <motion.section variants={fadeIn} className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              IoT Training Programs
            </h2>
            <p className="text-xl text-gray-600">
              Master the Internet of Things with our comprehensive training
              programs. From basics to advanced concepts, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {trainings.map((training, index) => (
              <TrainingCard key={index} {...training} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section variants={fadeIn} className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-blue-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join our community of innovators and tech enthusiasts
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us Today
            </motion.button>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Service;
