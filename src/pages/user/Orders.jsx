import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import { API_URL } from "../../api";
import moment from "moment";
import { motion } from "framer-motion";
import {
  ClockIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UserIcon,
  CheckCircleIcon,
  ClockIcon as PendingIcon,
} from "@heroicons/react/24/outline";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [sortNewestFirst, setSortNewestFirst] = useState(true);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/getorders`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      const data = response.data;
      if (data.success) {
        const sortedOrders = sortOrders(data.orders);
        setOrders(sortedOrders);
      }
    } catch (error) {
      console.log("Get Orders Error:", error);
    }
  };

  const sortOrders = (ordersToSort) => {
    return [...ordersToSort].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortNewestFirst ? dateB - dateA : dateA - dateB;
    });
  };

  useEffect(() => {
    getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Orders"} description={"Your Order History"}>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto p-6">
          <div className="flex flex-col space-y-6">
            {/* Header Section */}
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Orders</h1>
                <p className="text-gray-600">Track and manage your purchases</p>
              </motion.div>
              
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => {
                  setSortNewestFirst(!sortNewestFirst);
                  setOrders(sortOrders(orders));
                }}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                <ClockIcon className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700 font-medium">
                  {sortNewestFirst ? 'Newest First' : 'Oldest First'}
                </span>
              </motion.button>
            </div>

            {/* Orders List */}
            <div className="grid gap-6">
              {sortOrders(orders)?.map((order, index) => (
                <motion.div
                  key={order._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div className="bg-gray-50/50 p-4 border-b border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-3">
                        <ShoppingBagIcon className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Order ID</p>
                          <p className="text-sm font-semibold text-gray-800">#{order._id?.slice(-6).toUpperCase() || index + 1}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <UserIcon className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Customer</p>
                          <p className="text-sm font-semibold text-gray-800">{order?.buyer?.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <ClockIcon className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Order Date</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {moment(order?.createdAt).format('MMM DD, YYYY')}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <CurrencyDollarIcon className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Payment</p>
                          <div className="flex items-center space-x-1.5">
                            {order?.payment?.razorpay_payment_id ? (
                              <>
                                <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                <span className="text-sm font-semibold text-green-600">Paid</span>
                              </>
                            ) : (
                              <>
                                <PendingIcon className="h-4 w-4 text-orange-500" />
                                <span className="text-sm font-semibold text-orange-600">Pending</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {order?.products?.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-all"
                        >
                          <div className="aspect-square w-full">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <h4 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-bold text-gray-900">
                                ₹{item.price.toLocaleString()}
                              </p>
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                Qty: {item.quantity || 1}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Add a total amount section before the Order Summary */}
                  <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100">
                    <div className="flex justify-end">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 font-medium">
                          Total Amount:
                        </span>
                        <span className="text-base font-bold text-gray-900">
                          ₹{order?.products?.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50/50 p-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 font-medium">
                          Total Items:
                        </span>
                        <span className="text-sm font-semibold text-gray-800">
                          {order?.products?.length}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 font-medium">
                          Status:
                        </span>
                        <span className="text-sm font-semibold text-gray-800">
                          {order?.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
