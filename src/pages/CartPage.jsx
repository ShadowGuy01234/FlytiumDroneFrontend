import { motion } from "framer-motion";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cart";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

const Cart = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  const totalPrices = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price * (item.quantity || 1);
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
  };
  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("PushPakCart", JSON.stringify(updatedCart));
  };
  const removeItem = (id) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === id);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
    toast.success("Item removed from cart", {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
      iconTheme: {
        primary: "#713200",
        secondary: "#FFFAEE",
      },
    });
  };

  return (
    <Layout title="Cart" description="Your shopping cart">
      <div className="container mx-auto p-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            {`Welcome, ${auth?.user?.name || "Guest"}`}
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4">
            {cart?.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm p-12 text-center"
              >
                <div className="flex flex-col items-center">
                  <img
                    src="/empty-cart.png"
                    alt="Empty Cart"
                    className="w-48 h-48 mb-4 opacity-50"
                  />
                  <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                    Your cart is empty
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Add some products to start shopping!
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/store")}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                >
                  Browse Products
                </motion.button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {cart?.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-full md:w-1/3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="w-full md:w-2/3 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">
                          {item.name}
                        </h4>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        <p className="text-2xl font-bold text-blue-600 mb-4">
                          ₹{item.price}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item._id, (item.quantity || 1) - 1)
                            }
                            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-600"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item._id, (item.quantity || 1) + 1)
                            }
                            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-600"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-1/4 h-fit"
            >
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Order Summary
                </h2>
                <div className="border-t border-gray-100 py-4">
                  <h4 className="text-xl font-semibold text-gray-800 mb-6">
                    Total: {totalPrices()}
                  </h4>
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate("/checkout")}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Proceed to Checkout
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate("/store")}
                      className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                    >
                      Continue Shopping
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
