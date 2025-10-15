import PropTypes from "prop-types";
import stylesgrid from "./ProductGrid.module.css";
import styles from "./ProductCard.module.css";
import toast from "react-hot-toast";
import { useCart } from "../../../Context/cart";
import { useAuth } from "../../../Context/auth";
import { useNavigate } from "react-router-dom";

const ProductGrid = ({ products, isLoading, error }) => {
  const { addToCart, canAccessCart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();

  console.log(products);

  if (isLoading) {
    return <div className={stylesgrid.loading}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={stylesgrid.error}>
        Error loading products. Please try again.
      </div>
    );
  }

  const handleAddToCart = (product) => () => {
    console.log("Adding product to cart:", product);

    const accessResult = canAccessCart();
    if (accessResult === null) {
      toast.error("Please wait, loading...");
      return;
    }
    if (accessResult === false) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    // Convert product format to match our cart system
    const cartProduct = {
      _id: product.id || product._id,
      name: product.name,
      price: product.discount || product.price,
      image: product.image,
      description: product.description || "",
      quantity: 1
    };

    const success = addToCart(cartProduct, 1);
    if (!success) {
      console.error("Failed to add product to cart");
    }
  };

  return (
    <div className={stylesgrid.productGrid}>
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <span className={styles.newBadge}>New</span>
          <img
            src={product.image}
            alt={`Image of ${product.name}`}
            className={styles.productImage}
          />

          <div className={styles.quickLook}>Quick Look</div>

          <h4 className={styles.productName}>{product.name}</h4>
          <div className={styles.colorOptions}>
            {product.colorOptions?.map((color, index) => (
              <span
                key={index}
                className={styles.colorCircle}
                style={{ backgroundColor: color }}
              ></span>
            ))}
          </div>

          <div className={styles.priceContainer}>
            {product.isSale && (
              <span className={styles.originalPrice}>₹{product.price}</span>
            )}
            <span className={styles.discountedPrice}>₹{product.discount}</span>
            {product.isSale && (
              <span className={styles.discountAmount}>
                Save ₹{(product.price - product.discount).toFixed(2)}
              </span>
            )}
          </div>

          <div className={styles.rating}>⭐⭐⭐⭐⭐ (0)</div>

          <div className={styles.features}>
            {product.features?.map((feature, index) => (
              <div key={index} className={styles.feature}>
                {feature}
              </div>
            ))}
          </div>

          <div className={styles.buttons}>
            <button className={styles.buyButton} onClick={handleAddToCart(product)}>
              Add to Cart
            </button>
            <button
              className={styles.learnMoreButton}
              onClick={() => console.log("ok")}
            >
              Learn more
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      discount: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      isSale: PropTypes.bool,
      colorOptions: PropTypes.arrayOf(PropTypes.string),
      features: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

ProductGrid.defaultProps = {
  isLoading: false,
  error: null,
  products: [],
};

export default ProductGrid;
