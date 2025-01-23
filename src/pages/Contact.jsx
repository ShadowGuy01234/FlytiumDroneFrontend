


import React, { useState } from 'react';
import '../css/Contact.css';
import { FaUser, FaPhoneAlt, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
  };

  return (
    <div>

<div className="ct-maps-section">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14251.601236369019!2d83.3737098!3d26.7475572!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39914485e61aef37%3A0xa6b9a2dcb469be46!2sPaidleganj%2C%20Gorakhpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1730280570332!5m2!1sen!2sin" 
            width="400px"
            height="540px"
            border=" 5px solid black"
            border-radius="10px"
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>

          
        </div>

      <div className="ct-main-container">
  
       
        <form className="ct-form" onSubmit={handleSubmit}>
          <h2>CONTACT US</h2>

          {/* Input group for Name */}
          <div className="ct-input-group">
            <label htmlFor="name">Name</label>
            <div className="ct-input-with-icon">
              <FaUser className="ct-icon" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Input group for Phone No */}
          <div className="ct-input-group">
            <label htmlFor="phone">Phone No</label>
            <div className="ct-input-with-icon">
              <FaPhoneAlt className="ct-icon" />
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Your Phone No"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Input group for Email */}
          <div className="ct-input-group">
            <label htmlFor="email">Email</label>
            <div className="ct-input-with-icon">
              <FaEnvelope className="ct-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Input group for Message */}
          <div className="ct-input-group">
            <label htmlFor="message">Message</label>
            <div className="ct-input-with-icon">
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="ct-button-container">
            <span className="ct-button-text">SUBMIT</span>
            <button>SUBMIT</button>
          </div>
        </form>
      </div>

      {/* for black field */}
      <div className="ct-black-section">
        <h4>Why Choose Us?</h4>

        <div className="ct-benefits">
          <h5>Vast Selection:</h5>
          <p className="ct-benefit-text">Explore a diverse range of high-quality IoT products including smart home systems, wearables, industrial sensors, smart appliances, and more.</p>
          
          <h5>Competitive Prices:</h5>
          <p className="ct-benefit-text">Get the latest IoT devices at unbeatable prices.</p>
          
          <h5>Expert Support:</h5>
          <p className="ct-benefit-text">Our knowledgeable team is always here to guide you in selecting the right products and help with integration.</p>
          
          <h5>Fast Shipping:</h5>
          <p className="ct-benefit-text">Enjoy quick, reliable delivery, so you can start automating your world without delay</p>
        </div>

        <h5 className="ct-connect-heading">Connect with us:</h5>

        <div className="ct-social-icons">
          <FaInstagram className="ct-icon-instagram" />
          <FaTwitter className="ct-icon-twitter" />
          <FaFacebook className="ct-icon-facebook" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
