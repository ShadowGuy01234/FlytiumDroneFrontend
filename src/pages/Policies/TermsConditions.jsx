import React from "react";
import Layout from "../../components/Layout/Layout";
import { motion } from "framer-motion";
import { Scale, FileCheck, AlertCircle, HelpCircle } from "lucide-react";

const TermsConditions = () => {
  return (
    <Layout title="Terms & Conditions - Flytium">
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
                Terms & Conditions
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
                    <Scale className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Agreement to Terms
                    </h2>
                  </div>
                  <p className="text-gray-600">
                    By accessing or using Flytium's services, you agree to be
                    bound by these Terms and Conditions. If you disagree with
                    any part of the terms, you may not access our services.
                  </p>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <FileCheck className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Use License
                    </h2>
                  </div>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>
                      Products purchased are for personal use only unless
                      explicitly stated otherwise
                    </li>
                    <li>
                      Resale of products without written permission is
                      prohibited
                    </li>
                    <li>
                      Modification or copying of website content is not
                      permitted
                    </li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Disclaimer
                    </h2>
                  </div>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>
                      Products are provided "as is" without any warranties
                    </li>
                    <li>We are not responsible for misuse of our products</li>
                    <li>Technical specifications may change without notice</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <HelpCircle className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Governing Law
                    </h2>
                  </div>
                  <p className="text-gray-600">
                    These terms shall be governed by and construed in accordance
                    with the laws of India. Any disputes shall be subject to the
                    exclusive jurisdiction of the courts in Uttar Pradesh,
                    India.
                  </p>
                </section>
              </div>

              {/* Contact Section */}
              <div className="mt-12 p-6 bg-blue-50 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Questions or Concerns?
                </h2>
                <p className="text-gray-600">
                  Please contact us for any questions regarding these Terms &
                  Conditions:
                </p>
                <div className="mt-4">
                  <p className="text-gray-600">Email: legal@flytium.com</p>
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

export default TermsConditions;
