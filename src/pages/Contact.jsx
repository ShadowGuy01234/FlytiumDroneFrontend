import React, { useState } from 'react';
import { FaUser, FaPhoneAlt, FaEnvelope, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-b from-gray-100 to-white min-h-screen">
      {/* Google Maps Section */}
      <div className="w-full max-w-5xl mb-10 rounded-xl overflow-hidden shadow-xl">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14251.601236369019!2d83.3737098!3d26.7475572!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39914485e61aef37%3A0xa6b9a2dcb469be46!2sPaidleganj%2C%20Gorakhpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1730280570332!5m2!1sen!2sin" 
          className="w-full h-96 rounded-xl"
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </div>

      {/* Contact Form */}
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Get In Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {['name', 'phone', 'email', 'message'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block font-semibold text-gray-700 capitalize">{field}</label>
              <div className="relative flex items-center">
                {field !== 'message' && (
                  <span className="absolute left-3 text-gray-500">
                    {field === 'name' && <FaUser />}
                    {field === 'phone' && <FaPhoneAlt />}
                    {field === 'email' && <FaEnvelope />}
                  </span>
                )}
                {field !== 'message' ? (
                  <input
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
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
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:shadow-lg transition-transform transform hover:scale-105 font-semibold">Submit</button>
        </form>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-12 p-8 bg-gray-900 text-white rounded-xl shadow-xl w-full max-w-4xl text-center">
        <h4 className="text-2xl font-bold mb-4">Why Choose Us?</h4>
        <ul className="text-lg space-y-3">
          <li><strong className="text-blue-400">Vast Selection:</strong> Explore high-quality IoT products.</li>
          <li><strong className="text-blue-400">Competitive Prices:</strong> Get the best deals available.</li>
          <li><strong className="text-blue-400">Expert Support:</strong> Our team is here to assist you.</li>
          <li><strong className="text-blue-400">Fast Shipping:</strong> Quick and reliable delivery.</li>
        </ul>
        <h5 className="mt-6 text-lg">Connect with us:</h5>
        <div className="flex justify-center gap-6 mt-4">
          <FaInstagram className="text-3xl cursor-pointer hover:text-pink-500 transition-transform transform hover:scale-110" />
          <FaTwitter className="text-3xl cursor-pointer hover:text-blue-400 transition-transform transform hover:scale-110" />
          <FaFacebook className="text-3xl cursor-pointer hover:text-blue-600 transition-transform transform hover:scale-110" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
