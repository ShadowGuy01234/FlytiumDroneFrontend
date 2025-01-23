import React from "react";
import "./ProductCard.css";

const ProductCard = () => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src="ser.png" alt="Galaxy S24 Ultra" />
      </div>
      <div className="product-info">
        <h3 className="product-title">Grab Galaxy S24 Ultra</h3>
        <p className="product-price">
          Starting ₹ 4833*/mo.
          <br />
          Instant bank discount up to ₹ 12000*
        </p>
        <button className="buy-button">Buy now</button>
      </div>
    </div>
  );
};

export default ProductCard;
