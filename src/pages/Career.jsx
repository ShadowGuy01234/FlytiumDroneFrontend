import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from "../api";
import Layout from "../components/Layout/Layout";
import EmployeeCard from "../components/EmployeeCard";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

const Career = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("current");

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/employee/get-employees?isActive=true&status=current,past`
      );
      if (response.data.success) {
        setEmployees(response.data.employees);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (employee) => employee.status === activeTab
  );

  const tabs = [
    {
      key: "current",
      label: "Current Team",
      count: employees.filter((e) => e.status === "current").length,
    },
    {
      key: "past",
      label: "Past Members",
      count: employees.filter((e) => e.status === "past").length,
    },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Spinner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Team</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the talented individuals who make FlightDrone possible. Our
              diverse team brings together expertise from various fields to
              deliver innovative drone solutions.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center mb-8"
          >
            <div className="bg-white rounded-lg p-2 shadow-md">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 mr-2 last:mr-0 ${
                    activeTab === tab.key
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        activeTab === tab.key
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Employees Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredEmployees.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredEmployees.map((employee, index) => (
                  <motion.div
                    key={employee._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <EmployeeCard employee={employee} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {activeTab} team members found
                </h3>
                <p className="text-gray-500">
                  Check back later for updates to our team.
                </p>
              </div>
            )}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center bg-blue-600 rounded-2xl p-8 text-white"
          >
            <h2 className="text-3xl text-white font-bold mb-4">
              Join Our Team
            </h2>
            <p className="text-xl mb-6 opacity-90 text-white">
              We're always looking for talented individuals to join our mission
            </p>
            <button className="bg-white  bg-clip-text bg-gradient-to-r from-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors border border-white hover:border-gray-200">
              View Open Positions
            </button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Career;
