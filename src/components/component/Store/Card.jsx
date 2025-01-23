import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductCard.module.css';

const ProductCard = ({ name, price , discount , image, isSale = false, colorOptions = [], features = [] }) => {
  const formattedPrice = typeof price === 'number' ? price.toFixed(2) : "0.00";
  const formattedDiscount = typeof discount === 'number' ? discount.toFixed(2) : "0.00";

  return (
    <div className={styles.productCard}>
      <span className={styles.newBadge}>New</span>
      <img src={image} alt={`Image of ${name}`} className={styles.productImage} />

      <div className={styles.quickLook}>Quick Look</div>
      
      <h4 className={styles.productName}>{name}</h4>
      <div className={styles.colorOptions}>
        {colorOptions.map((color, index) => (
          <span key={index} className={styles.colorCircle} style={{ backgroundColor: color }}></span>
        ))}
      </div>

      <div className={styles.priceContainer}>
        {isSale && <span className={styles.originalPrice}>₹{price}</span>}
        <span className={styles.discountedPrice}>₹{discount}</span>
        {isSale && <span className={styles.discountAmount}>Save ₹{(price - discount ).toFixed(2)}</span>}
      </div>

      <div className={styles.rating}>⭐⭐⭐⭐⭐ (0)</div>  

      <div className={styles.features}>
        {features.map((feature, index) => (
          <div key={index} className={styles.feature}>{feature}</div>
        ))}
      </div>

      <div className={styles.buttons}>
        <button className={styles.buyButton} onClick={() => handleBuyNow(name)}>Buy Now</button>
        <button className={styles.learnMoreButton}>Learn more</button>
      </div>
    </div>
  );
};

const handleBuyNow = (productName) => {
  alert(`You bought ${productName}!`);
};

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  discount: PropTypes.number,
  image: PropTypes.string.isRequired,
  isSale: PropTypes.bool,
  colorOptions: PropTypes.arrayOf(PropTypes.string),
  features: PropTypes.arrayOf(PropTypes.string),
};

ProductCard.defaultProps = {
  price: 0,
  discount: 0,
  isSale: false,
  colorOptions: [],
  features: [],
};

export default ProductCard;
