import React from "react";
import Layout from "../../components/Layout/Layout";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <Layout title="Privacy Policy - Flytium">
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
                Privacy Policy
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
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Information We Collect
                    </h2>
                  </div>
                  <p className="text-gray-600">
                    We collect information that you provide directly to us,
                    including:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Name and contact information</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information</li>
                    <li>Order history and preferences</li>
                    <li>Device and usage information</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      How We Use Your Information
                    </h2>
                  </div>
                  <p className="text-gray-600">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Process your orders and payments</li>
                    <li>Communicate with you about your orders</li>
                    <li>
                      Send you marketing communications (with your consent)
                    </li>
                    <li>Improve our products and services</li>
                    <li>Detect and prevent fraud</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Information Sharing
                    </h2>
                  </div>
                  <p className="text-gray-600">
                    We do not sell your personal information. We may share your
                    information with:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Service providers who assist our operations</li>
                    <li>Payment processors for secure transactions</li>
                    <li>Shipping partners for order delivery</li>
                    <li>Law enforcement when required by law</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Your Rights
                    </h2>
                  </div>
                  <p className="text-gray-600">You have the right to:</p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Lodge a complaint with supervisory authorities</li>
                  </ul>
                </section>
              </div>

              {/* Contact Section */}
              <div className="mt-12 p-6 bg-blue-50 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Contact Us
                </h2>
                <p className="text-gray-600">
                  If you have any questions about our Privacy Policy, please
                  contact us at:
                </p>
                <div className="mt-4">
                  <p className="text-gray-600">Email: privacy@flytium.com</p>
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

export default PrivacyPolicy;
