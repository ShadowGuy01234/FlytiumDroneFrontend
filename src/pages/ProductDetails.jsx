import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api";
import toast from "react-hot-toast";
import { useCart } from "../Context/cart";
import { motion } from "framer-motion";
import { FiMinus, FiPlus, FiShoppingCart, FiArrowLeft } from "react-icons/fi";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { slug } = useParams();
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  useEffect(() => {
    getProduct();
  }, [slug]);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/product/get-product/${slug}`
      );
      if (response?.data?.success) {
        setProduct(response.data.product);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Error fetching product details");
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    try {
      const existingProductIndex = cart.findIndex(
        (item) => item._id === product._id
      );
      let updatedCart;

      if (existingProductIndex >= 0) {
        updatedCart = cart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: (item.quantity || 0) + quantity }
            : item
        );
        toast.success(`Added ${quantity} more ${product.name}(s) to cart`, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });
      } else {
        updatedCart = [...cart, { ...product, quantity }];
        toast.success(`Added ${quantity} ${product.name}(s) to cart`, {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });
      }

      setCart(updatedCart);
      localStorage.setItem("Flytium", JSON.stringify(updatedCart));
      setQuantity(1);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button
          onClick={() => navigate("/store")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FiArrowLeft /> Back to Store
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <button
          onClick={() => navigate("/store")}
          className="text-gray-600 hover:text-blue-600 flex items-center gap-2 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Store
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Product Image Section */}
            <div className="p-8 lg:p-12 bg-gray-50">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="aspect-square rounded-xl overflow-hidden bg-white"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              </motion.div>
            </div>

            {/* Product Details Section */}
            <div className="p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Category Badge */}
                <span className="inline-block bg-blue-50 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
                  {product.category.name}
                </span>

                {/* Product Title */}
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ₹{(product.price * 1.2).toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    20% OFF
                  </span>
                </div>

                {/* Description */}
                <div className="prose prose-sm text-gray-600">
                  <p>{product.description}</p>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleDecreaseQuantity}
                      disabled={quantity <= 1}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>

                    <span className="w-12 text-center font-medium text-lg">
                      {quantity}
                    </span>

                    <button
                      onClick={handleIncreaseQuantity}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Total Price
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{(product.price * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    Add {quantity} to Cart
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/cartpage")}
                    className="flex-1 border border-gray-300 text-gray-700 py-4 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    View Cart
                  </motion.button>
                </div>

                {/* Additional Info */}
                <div className="pt-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Free shipping on orders over ₹999
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    30-day return policy
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
