import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from "../api";
import Layout from "../components/Layout/Layout";
import EmployeeCard from "../components/EmployeeCard";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { Modal } from "antd";

const Career = () => {
  const [employees, setEmployees] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("current");
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationData, setApplicationData] = useState({
    applicantName: "",
    email: "",
    phone: "",
    description: "",
  });

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

  const fetchJobs = async () => {
    try {
      setJobsLoading(true);
      const response = await axios.get(
        `${API_URL}/api/job/get-jobs?isActive=true`
      );
      if (response.data.success) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch job openings");
    } finally {
      setJobsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchJobs();
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

  const handleApply = (job) => {
    setSelectedJob(job);
    setApplicationData({
      applicantName: "",
      email: "",
      phone: "",
      description: "",
    });
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/api/job/apply`, {
        jobId: selectedJob._id,
        ...applicationData,
        position: selectedJob.title,
      });

      if (data?.success) {
        toast.success("Application submitted successfully!");
        setShowApplicationModal(false);
        setSelectedJob(null);
        setApplicationData({
          applicantName: "",
          email: "",
          phone: "",
          description: "",
        });
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while submitting application");
    }
  };

  const handleInputChange = (e) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value,
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
              Careers at <span className="text-blue-600">FlightDrone</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our innovative team and help shape the future of drone
              technology. Explore career opportunities and meet the talented
              individuals who make FlightDrone possible.
            </p>
          </motion.div>

          {/* Job Openings Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Current Job Openings
            </h2>

            {jobsLoading ? (
              <div className="text-center">
                <Spinner />
              </div>
            ) : jobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {jobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {job.jobType}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                          {job.location}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {job.description}
                      </p>
                      <div className="text-sm text-gray-500 mb-4">
                        <p>
                          <strong>Experience:</strong> {job.experience}
                        </p>
                        {job.salary && (
                          <p>
                            <strong>Salary:</strong> {job.salary}
                          </p>
                        )}
                        {job.applicationDeadline && (
                          <p>
                            <strong>Apply by:</strong>{" "}
                            {formatDate(job.applicationDeadline)}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleApply(job)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Apply Now
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg mb-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-16 w-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v10.5a2.25 2.25 0 01-2.25 2.25H10.25A2.25 2.25 0 018 16.5V6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No Job Openings Available
                </h3>
                <p className="text-gray-500">
                  We don't have any open positions at the moment, but we're
                  always looking for talented individuals. Check back soon!
                </p>
              </div>
            )}
          </motion.div>

          {/* Team Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-blue-600">Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get to know the talented individuals who drive innovation at
              FlightDrone
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
            transition={{ duration: 0.6, delay: 0.8 }}
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
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-16 text-center bg-blue-600 rounded-2xl p-8 text-white"
          >
            <h2 className="text-3xl text-white font-bold mb-4">
              Join Our Team
            </h2>
            <p className="text-xl mb-6 opacity-90 text-white">
              We're always looking for talented individuals to join our mission
            </p>
            <p className="text-white opacity-90">
              {jobs.length > 0
                ? `We have ${jobs.length} open position${
                    jobs.length > 1 ? "s" : ""
                  } available above!`
                : "While we don't have open positions right now, we're always interested in connecting with talented people."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Job Application Modal */}
      <Modal
        title={`Apply for ${selectedJob?.title}`}
        open={showApplicationModal}
        onCancel={() => setShowApplicationModal(false)}
        footer={null}
        width={600}
      >
        {selectedJob && (
          <div>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">
                {selectedJob.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {selectedJob.location} • {selectedJob.jobType}
              </p>
            </div>

            <form onSubmit={handleApplicationSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="applicantName"
                  value={applicationData.applicantName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={applicationData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={applicationData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position Applied For
                </label>
                <input
                  type="text"
                  value={selectedJob.title}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  disabled
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us about yourself and why you're interested in this
                  position *
                </label>
                <textarea
                  name="description"
                  value={applicationData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your experience, skills, and motivation for applying..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Career;
