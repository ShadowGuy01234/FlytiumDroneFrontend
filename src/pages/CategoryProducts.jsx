import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api";
import toast from "react-hot-toast";
import { useCart } from "../Context/cart";
import Layout from "../components/Layout/Layout";
import { motion } from "framer-motion";

const CategoryProducts = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cart, setCart } = useCart();

  const getProductsByCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/api/product/product-category/${params.slug}`
      );
      if (data?.success) {
        setProducts(data.products);
        setCategory(data.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);

  const handleAddToCart = (product) => {
    try {
      const existingProductIndex = cart.findIndex(
        (item) => item._id === product._id
      );
      let updatedCart;

      if (existingProductIndex >= 0) {
        updatedCart = cart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
        toast.success(`Increased ${product.name} quantity in cart`);
      } else {
        updatedCart = [...cart, { ...product, quantity: 1 }];
        toast.success(`${product.name} added to cart`);
      }

      setCart(updatedCart);
      localStorage.setItem("Flytium", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                {category?.name}
              </h1>
              <p className="text-gray-600 mt-2">
                Browse our selection of {category?.name}
              </p>
            </div>

            {products.length === 0 ? (
              <div className="text-center text-gray-500">
                No products available in this category
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {products.map((product) => (
                  <motion.div
                    key={product._id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                      {product.discountedPrice &&
                        product.price > product.discountedPrice && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {Math.round(
                              ((product.price - product.discountedPrice) /
                                product.price) *
                                100
                            )}
                            % OFF
                          </div>
                        )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2 mb-4">
                        {product.discountedPrice &&
                        product.price > product.discountedPrice ? (
                          <>
                            <span className="text-xl font-bold text-gray-900">
                              ₹{product.discountedPrice.toLocaleString()}
                            </span>
                            <span className="text-sm line-through text-gray-500">
                              ₹{product.price.toLocaleString()}
                            </span>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-gray-900">
                            ₹{product.price.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => navigate(`/product/${product.slug}`)}
                          className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default CategoryProducts;
