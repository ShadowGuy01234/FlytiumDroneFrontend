import React from "react";
import Layout from "../../components/Layout/Layout";
import { motion } from "framer-motion";
import { Truck, Clock, Package, RefreshCw } from "lucide-react";

const ShippingPolicy = () => {
  return (
    <Layout title="Shipping Policy - Flytium">
      <div className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Shipping Policy
              </h1>
              <p className="text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              <div className="space-y-8">
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Truck className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Shipping Methods
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-900">
                        Standard Shipping
                      </h3>
                      <p className="text-gray-600">
                        4-7 business days | Free on orders above ₹999
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-900">
                        Express Shipping
                      </h3>
                      <p className="text-gray-600">
                        2-3 business days | ₹199 flat rate
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Processing Time
                    </h2>
                  </div>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Orders are processed within 24-48 hours</li>
                    <li>
                      Custom orders may require additional processing time
                    </li>
                    <li>Orders placed after 2 PM IST process the next day</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      International Shipping
                    </h2>
                  </div>
                  <p className="text-gray-600">
                    We currently ship to select countries:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>USA (7-10 business days)</li>
                    <li>UK (6-8 business days)</li>
                    <li>Canada (8-12 business days)</li>
                    <li>Australia (10-14 business days)</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <RefreshCw className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Returns & Exchanges
                    </h2>
                  </div>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>30-day return policy for unused items</li>
                    <li>Return shipping cost borne by customer</li>
                    <li>Damaged items eligible for free returns</li>
                  </ul>
                </section>
              </div>

              {/* Contact Section */}
              <div className="mt-12 p-6 bg-blue-50 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Shipping Support
                </h2>
                <p className="text-gray-600">
                  For any shipping-related queries, please contact us:
                </p>
                <div className="mt-4">
                  <p className="text-gray-600">Email: shipping@flytium.com</p>
                  <p className="text-gray-600">Phone: +91 6307193440</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPolicy;
