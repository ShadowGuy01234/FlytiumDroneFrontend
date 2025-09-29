import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../api";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/auth";
import { Select, Modal } from "antd";
import "./adminpg.css";

const { Option } = Select;

const JobApplications = () => {
  const { auth } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Get all job applications
  const getAllApplications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/api/job/applications`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setApplications(data.applications);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllApplications();
  }, [auth?.token]);

  // Update application status
  const handleStatusChange = async (applicationId, status) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/api/job/applications/${applicationId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data?.success) {
        toast.success("Application status updated successfully");
        getAllApplications();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Delete application
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${API_URL}/api/job/applications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data.success) {
        toast.success("Application deleted successfully");
        getAllApplications();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning";
      case "reviewed":
        return "bg-info";
      case "shortlisted":
        return "bg-primary";
      case "rejected":
        return "bg-danger";
      case "hired":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Layout title="Job Applications">
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 bg-white shadow-md">
            <AdminMenu />
          </div>

          <div className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Job Applications
              </h1>
              <p className="text-gray-600">
                Manage and review job applications from candidates.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Applications Received ({applications?.length || 0})
                </h3>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Loading applications...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applicant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Job Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applied Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {applications?.map((application) => (
                        <tr
                          key={application._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                  <span className="text-sm font-medium text-gray-700">
                                    {application.applicantName
                                      .charAt(0)
                                      .toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {application.applicantName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {application.position}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {application.jobId?.title || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {application.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(application.appliedAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                application.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : application.status === "reviewed"
                                  ? "bg-blue-100 text-blue-800"
                                  : application.status === "shortlisted"
                                  ? "bg-purple-100 text-purple-800"
                                  : application.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : application.status === "hired"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {application.status.charAt(0).toUpperCase() +
                                application.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                className="inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none transition-colors"
                                onClick={() => {
                                  setSelectedApplication(application);
                                  setShowModal(true);
                                }}
                              >
                                <svg
                                  className="w-3 h-3 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                                View
                              </button>

                              <Select
                                className="min-w-[120px]"
                                value={application.status}
                                onChange={(value) =>
                                  handleStatusChange(application._id, value)
                                }
                                size="small"
                              >
                                <Option value="pending">Pending</Option>
                                <Option value="reviewed">Reviewed</Option>
                                <Option value="shortlisted">Shortlisted</Option>
                                <Option value="rejected">Rejected</Option>
                                <Option value="hired">Hired</Option>
                              </Select>

                              <button
                                className="inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none transition-colors"
                                onClick={() => {
                                  const answer = window.confirm(
                                    "Are you sure you want to delete this application?"
                                  );
                                  if (answer) handleDelete(application._id);
                                }}
                              >
                                <svg
                                  className="w-3 h-3 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {applications?.length === 0 && (
                    <div className="text-center py-12 bg-gray-50">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No applications yet
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Applications will appear here once candidates start
                        applying.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Application Details Modal */}
      <Modal
        title="Application Details"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        width={600}
      >
        {selectedApplication && (
          <div>
            <div className="mb-3">
              <strong>Job Title:</strong>{" "}
              {selectedApplication.jobId?.title || "N/A"}
            </div>
            <div className="mb-3">
              <strong>Applicant Name:</strong>{" "}
              {selectedApplication.applicantName}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {selectedApplication.email}
            </div>
            <div className="mb-3">
              <strong>Phone:</strong> {selectedApplication.phone}
            </div>
            <div className="mb-3">
              <strong>Position Applied:</strong> {selectedApplication.position}
            </div>
            <div className="mb-3">
              <strong>Applied Date:</strong>{" "}
              {formatDate(selectedApplication.appliedAt)}
            </div>
            <div className="mb-3">
              <strong>Status:</strong>{" "}
              <span
                className={`badge ${getStatusBadgeClass(
                  selectedApplication.status
                )}`}
              >
                {selectedApplication.status.charAt(0).toUpperCase() +
                  selectedApplication.status.slice(1)}
              </span>
            </div>
            <div className="mb-3">
              <strong>Description:</strong>
              <div
                className="mt-2 p-3"
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "4px",
                  minHeight: "100px",
                }}
              >
                {selectedApplication.description}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default JobApplications;
