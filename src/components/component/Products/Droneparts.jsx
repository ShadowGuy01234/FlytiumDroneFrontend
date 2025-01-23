


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import '../../css/Sensor.css';

// Notice we removed the backPath prop since we're using a specific path
const Droneparts = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const leftCards = [
    { id: 1, name: "IOT Components", image: "./Image/droneimg.jpg", url: "https://your-link-1.com", rating: 4.5, description: "Best quality IoT components for your projects", price: 99.99 },
    { id: 2, name: "Sensors", image: "./Image/droneimg.jpg", url: "https://your-link-2.com", rating: 4.0, description: "High-performance sensors for every need", price: 49.99 },
  ];

  const rightCards = [
    { id: 3, name: "Microcontroller Boards", image: "./Image/droneimg.jpg", url: "https://your-link-3.com", rating: 5.0, description: "Latest microcontroller boards for your DIY projects", price: 79.99 },
    { id: 4, name: "Batteries", image: "./Image/droneimg.jpg", url: "https://your-link-4.com", rating: 4.3, description: "Long-lasting batteries for electronics and drones", price: 29.99 },
  ];

  const leftCardsSecondRow = [
    { id: 5, name: "Drone parts", image: "./Image/droneimg.jpg", url: "https://your-link-5.com", rating: 4.7, description: "Durable drone parts for custom builds", price: 59.99 },
    { id: 6, name: "Customized Drone", image: "./Image/droneimg.jpg", url: "https://your-link-6.com", rating: 5.0, description: "Fully customized drones tailored to your needs", price: 999.99 },
  ];

  const rightCardsSecondRow = [
    { id: 7, name: "3D-printings", image: "./Image/droneimg.jpg", url: "https://your-link-7.com", rating: 4.8, description: "High-quality 3D printing services", price: 39.99 },
    { id: 8, name: "Tools and equipment", image: "./Image/droneimg.jpg", url: "https://your-link-8.com", rating: 4.6, description: "Precision tools and equipment for professionals", price: 149.99 },
  ];

  const leftCardAnimation = {
    initial: { x: '-100vw', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 1, delay: 0.2 }
  };

  const rightCardAnimation = {
    initial: { x: '100vw', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 1, delay: 0.2 }
  };

  const handleClick = (url) => {
    window.open(url, "_blank");
  };

  const handleAddToCart = (card) => {
    setCartItems([...cartItems, card]);
  };

  const handleCartClick = () => {
    navigate('/cart', { state: { cartItems, totalPrice: calculateTotalPrice() } });
  };

  // Updated handleBackClick to navigate to store
  const handleBackClick = () => {
    navigate('/Store'); // This assumes your Store component is routed at '/store'
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const renderCard = (card, animation) => (
    <motion.div
      key={card.id}
      className="card"
      initial={animation.initial}
      animate={animation.animate}
      transition={{ ...animation.transition, delay: 0.1 * card.id }}
    >
      <div className="image-container">
        <motion.img
          src={card.image}
          alt={card.name}
          className="card-image"
          whileHover={{ rotateY: 180 }}
        />
        <motion.div className="description" whileHover={{ opacity: 1 }}>
          <p>{card.description}</p>
        </motion.div>
      </div>

      <div className="name-container">
        <h3>{card.name}</h3>
        <div className="price-rating">
          <div className="price">Price:₹{card.price}</div>
          <div className="rating">
            {"★".repeat(Math.floor(card.rating))}
            {card.rating % 1 !== 0 && "★".slice(0, 1)}
            <span>({card.rating})</span>
          </div>
        </div>

        <div className="card-buttons">
          <button onClick={() => handleClick(card.url)}>Buy</button>
          <button onClick={() => handleAddToCart(card)}>Add to Cart</button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>

      <div className="cart-container" onClick={handleCartClick}>
        <div className="cart-icon">
          <FaShoppingCart size={35} color="white" backgorundcolor="black" />
          {cartItems.length > 0 && <span className="cart-counter">{cartItems.length}</span>}
        </div>
      </div>

      <div className="cards-container">
        <h2>SENSORS</h2>

        {/* First Row */}
        <div className="row">
          {leftCards.map(card => renderCard(card, leftCardAnimation))}
          {rightCards.map(card => renderCard(card, rightCardAnimation))}
        </div>

        {/* Second Row */}
        <div className="row">
          {leftCardsSecondRow.map(card => renderCard(card, leftCardAnimation))}
          {rightCardsSecondRow.map(card => renderCard(card, rightCardAnimation))}
        </div>
      </div>
    </>
  );
};

export default Droneparts;