import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../Context/auth";
import { useCart } from "../Context/cart";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import axios from "axios";
import { motion } from "framer-motion";
import { FiMinus, FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";

const CheckoutPage = () => {
  const { auth } = useAuth();
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth?.token) {
      navigate("/login", { state: "/checkout" });
    }
  }, [auth?.token, navigate]);

  const totalAmount = () => {
    return cart
      .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
      .toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("Flytium", JSON.stringify(updatedCart));
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("Flytium", JSON.stringify(updatedCart));
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const amount = cart.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      );

      const response = await axios.post(
        `${API_URL}/api/payment/order`,
        { amount },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        alert("Error creating payment order");
        return;
      }

      const options = {
        key: "rzp_test_mn0PTHHGYdjsI8",
        amount: response.data.order.amount,
        currency: response.data.order.currency,
        name: "Flytium",
        description: "Order Payment",
        image: "/logo.png",
        order_id: response.data.order.id,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(
              `${API_URL}/api/payment/verify`,
              {
                response,
                products: cart,
                buyer: auth?.user?.id,
                address: auth?.user?.address,
                totalPrice: amount,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (verifyResponse.data.success) {
              setCart([]);
              localStorage.removeItem("Flytium");
              alert("Payment Successful");
              navigate("/dashboard/user/orders");
            } else {
              alert("Payment Verification Failed");
            }
          } catch (error) {
            console.error("Verification Error:", error);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: auth?.user?.name || "Guest",
          email: auth?.user?.email || "guest@example.com",
          contact: auth?.user?.phone || "",
        },
        theme: {
          color: "#3B82F6",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Error processing payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Checkout" description="Complete your purchase">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            {auth?.user?.address ? (
              <div className="mb-4">
                <p className="text-gray-700">{auth.user.address}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 text-blue-500 hover:text-blue-700"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Add Address
              </motion.button>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/cartpage")}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
              >
                <FiEdit2 className="w-4 h-4" />
                <span>Edit Cart</span>
              </motion.button>
            </div>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center flex-1 justify-between">
                    <div className="ml-4 ">
                      <div className=" flex">
                        {" "}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <h3 className="font-medium text-lg flex items-center justify-center">
                          {item.name}
                        </h3>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        ₹{item.price.toLocaleString()} × {item.quantity || 1}
                      </p>
                      <p className="font-semibold text-blue-600">
                        Total: ₹
                        {(item.price * (item.quantity || 1)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t mt-6 pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Amount:</span>
                <span className="text-blue-600">{totalAmount()}</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading || !auth?.user?.address || cart.length === 0}
            onClick={handlePayment}
            className={`w-full bg-blue-500 text-white py-4 rounded-lg font-medium text-lg ${
              loading || !auth?.user?.address || cart.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </motion.button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
