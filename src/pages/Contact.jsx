import React, { useState } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { API_URL } from "../api";
import SEO from "../components/SEO/SEO";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await axios.post(
        `${API_URL}/api/contact/submit`,
        formData
      );

      if (data.success) {
        setIsSuccess(true);
        toast.success(data.message);
        setFormData({ name: "", phone: "", email: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to submit form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us | Flytium Drones"
        description="Get in touch with Flytium Drones for drone training, workshops, repairs, or product inquiries. We're here to help!"
        keywords="contact Flytium Drones, drone training contact, Gorakhpur drone institute"
        url="/contact"
      />

      <div className="flex flex-col items-center p-6 bg-gradient-to-b from-gray-100 to-white min-h-screen">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Get In <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-lg text-gray-600">
            Have questions about our drone training, products, or services? We'd
            love to hear from you!
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <FaMapMarkerAlt className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">Visit Us</h3>
            <p className="text-gray-600 text-sm">
              Paidleganj, Gorakhpur
              <br />
              Uttar Pradesh, India
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <FaPhoneAlt className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">Call Us</h3>
            <p className="text-gray-600 text-sm">
              +91 XXX XXX XXXX
              <br />
              Mon-Sat: 9AM - 6PM
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <FaEnvelope className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">Email Us</h3>
            <p className="text-gray-600 text-sm">
              info@flytiumdrones.com
              <br />
              support@flytiumdrones.com
            </p>
          </motion.div>
        </div>

        {/* Google Maps Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-5xl mb-10 rounded-xl overflow-hidden shadow-xl"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14251.601236369019!2d83.3737098!3d26.7475572!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39914485e61aef37%3A0xa6b9a2dcb469be46!2sPaidleganj%2C%20Gorakhpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1730280570332!5m2!1sen!2sin"
            className="w-full h-96 rounded-xl"
            allowFullScreen=""
            loading="lazy"
            title="Flytium Drones Location"
          ></iframe>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl border border-gray-200"
        >
          {isSuccess ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center py-12"
            >
              <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600">
                We've received your message and will get back to you soon.
              </p>
            </motion.div>
          ) : (
            <>
              <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800">
                Send us a Message
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Fill out the form below and we'll respond within 24 hours
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {["name", "phone", "email", "message"].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block font-semibold text-gray-700 capitalize"
                    >
                      {field}
                    </label>
                    <div className="relative flex items-center">
                      {field !== "message" && (
                        <span className="absolute left-3 text-gray-500">
                          {field === "name" && <FaUser />}
                          {field === "phone" && <FaPhoneAlt />}
                          {field === "email" && <FaEnvelope />}
                        </span>
                      )}
                      {field !== "message" ? (
                        <input
                          type={
                            field === "email"
                              ? "email"
                              : field === "phone"
                              ? "tel"
                              : "text"
                          }
                          id={field}
                          name={field}
                          placeholder={`Enter your ${field}`}
                          value={formData[field]}
                          onChange={handleChange}
                          required
                          className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 bg-gray-50"
                        />
                      ) : (
                        <textarea
                          id={field}
                          name={field}
                          placeholder="Write your message here..."
                          value={formData[field]}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 bg-gray-50"
                        ></textarea>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transform hover:scale-105"
                  } text-white`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl shadow-xl w-full max-w-4xl"
        >
          <h4 className="text-3xl font-bold mb-6 text-center text-white">
            Why Choose Flytium Drones?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h5 className="text-xl font-bold text-blue-400 mb-2">
                Expert Training
              </h5>
              <p className="text-gray-300">
                DGCA certified drone pilot training programs
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h5 className="text-xl font-bold text-blue-400 mb-2">
                Quality Products
              </h5>
              <p className="text-gray-300">
                Premium drones, parts, and IoT components
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h5 className="text-xl font-bold text-blue-400 mb-2">
                Repair Services
              </h5>
              <p className="text-gray-300">
                Professional drone repair and maintenance
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h5 className="text-xl font-bold text-blue-400 mb-2">
                Fast Support
              </h5>
              <p className="text-gray-300">
                Quick response and reliable customer service
              </p>
            </div>
          </div>

          <div className="text-center border-t border-gray-700 pt-6">
            <h5 className="text-xl font-semibold mb-4">
              Connect with us on social media
            </h5>
            <div className="flex justify-center gap-6">
              <motion.a
                href="https://instagram.com/flytiumdrone"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="text-4xl cursor-pointer hover:text-pink-500 transition-colors"
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                href="https://twitter.com/flytiumdrone"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="text-4xl cursor-pointer hover:text-blue-400 transition-colors"
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href="https://facebook.com/flytiumdrone"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="text-4xl cursor-pointer hover:text-blue-600 transition-colors"
              >
                <FaFacebook />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;
