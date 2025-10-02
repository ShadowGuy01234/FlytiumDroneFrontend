import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api";
import toast from "react-hot-toast";
import { useCart } from "../Context/cart";
import Layout from "../components/Layout/Layout";
import { ShoppingCart, Eye, Package, Tag } from "lucide-react";

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
      <div className="min-h-screen bg-white">
        
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Header */}
            <section className="pt-32 pb-16 border-b-2 border-gray-900">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-3 mb-6">
                  <Tag className="w-8 h-8" />
                  <span className="text-sm font-bold uppercase tracking-wider text-gray-600">Category</span>
                </div>
                <h1 className="text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
                  {category?.name}
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl">
                  {products.length} {products.length === 1 ? 'product' : 'products'} available
                </p>
              </div>
            </section>

            {/* Products Grid */}
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-6">
                {products.length === 0 ? (
                  <div className="border-2 border-gray-900 p-16 text-center">
                    <Package className="w-24 h-24 mx-auto mb-6 text-gray-400" />
                    <h3 className="text-2xl font-black text-gray-900 mb-4">
                      No Products Available
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-8">
                      We don't have any products in this category yet. Check back soon!
                    </p>
                    <button
                      onClick={() => navigate("/store")}
                      className="group relative px-8 py-4 bg-gray-900 text-white font-bold overflow-hidden"
                    >
                      <span className="relative z-10">Browse All Products</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <div
                        key={product._id}
                        className="border-2 border-gray-900 group hover:shadow-lg transition-all"
                      >
                        {/* Image */}
                        <div className="relative aspect-square bg-gray-50 border-b-2 border-gray-900 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          />
                          {product.discountedPrice && product.price > product.discountedPrice && (
                            <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-600 text-white text-xs font-bold">
                              {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="p-6">
                          <h3 className="text-lg font-black text-gray-900 mb-4 line-clamp-2">
                            {product.name}
                          </h3>

                          {/* Price */}
                          <div className="mb-6">
                            {product.discountedPrice && product.price > product.discountedPrice ? (
                              <div className="flex items-end gap-3">
                                <span className="text-2xl font-black text-gray-900">
                                  ₹{product.discountedPrice.toLocaleString()}
                                </span>
                                <span className="text-lg line-through text-gray-400">
                                  ₹{product.price.toLocaleString()}
                                </span>
                              </div>
                            ) : (
                              <span className="text-2xl font-black text-gray-900">
                                ₹{product.price.toLocaleString()}
                              </span>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="space-y-3">
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="w-full group/btn relative px-6 py-3 bg-gray-900 text-white font-bold overflow-hidden"
                            >
                              <span className="relative z-10 flex items-center justify-center gap-2">
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                            </button>
                            
                            <button
                              onClick={() => navigate(`/product/${product.slug}`)}
                              className="w-full px-6 py-3 border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CategoryProducts;
