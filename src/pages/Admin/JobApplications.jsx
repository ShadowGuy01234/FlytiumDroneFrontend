import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../api";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/auth";
import { FileText, Eye, Trash2, X, Mail, Phone, Calendar, User } from "lucide-react";

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-950 border-amber-600 text-amber-400";
      case "reviewed":
        return "bg-blue-950 border-blue-600 text-blue-400";
      case "shortlisted":
        return "bg-purple-950 border-purple-600 text-purple-400";
      case "rejected":
        return "bg-red-950 border-red-600 text-red-400";
      case "hired":
        return "bg-emerald-950 border-emerald-600 text-emerald-400";
      default:
        return "bg-slate-800 border-slate-600 text-slate-400";
    }
  };

  return (
    <Layout title="Job Applications">
      <div className="min-h-screen bg-slate-950">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4">
            <AdminMenu />
          </div>

          <div className="flex-1 p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-black text-white mb-2 flex items-center">
                <FileText className="w-10 h-10 mr-3 text-indigo-500" />
                Job Applications
              </h1>
              <p className="text-slate-400 text-lg">
                Manage and review candidate applications
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-indigo-600 transition-all">
                <div className="text-slate-400 font-bold mb-2">Total</div>
                <p className="text-3xl font-black text-white">{applications?.length || 0}</p>
              </div>
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-amber-500 transition-all">
                <div className="text-slate-400 font-bold mb-2">Pending</div>
                <p className="text-3xl font-black text-amber-400">
                  {applications?.filter(a => a.status === "pending").length || 0}
                </p>
              </div>
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-blue-500 transition-all">
                <div className="text-slate-400 font-bold mb-2">Reviewed</div>
                <p className="text-3xl font-black text-blue-400">
                  {applications?.filter(a => a.status === "reviewed").length || 0}
                </p>
              </div>
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-purple-500 transition-all">
                <div className="text-slate-400 font-bold mb-2">Shortlisted</div>
                <p className="text-3xl font-black text-purple-400">
                  {applications?.filter(a => a.status === "shortlisted").length || 0}
                </p>
              </div>
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-emerald-500 transition-all">
                <div className="text-slate-400 font-bold mb-2">Hired</div>
                <p className="text-3xl font-black text-emerald-400">
                  {applications?.filter(a => a.status === "hired").length || 0}
                </p>
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-slate-900 border-2 border-slate-800 overflow-hidden">
              <div className="px-6 py-4 border-b-2 border-slate-800">
                <h3 className="text-2xl font-black text-white flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-indigo-500" />
                  All Applications ({applications?.length || 0})
                </h3>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  <p className="mt-2 text-slate-400">Loading applications...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y-2 divide-slate-800">
                    <thead className="bg-slate-950">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-black text-slate-300 uppercase">Applicant</th>
                        <th className="px-6 py-3 text-left text-xs font-black text-slate-300 uppercase">Job Title</th>
                        <th className="px-6 py-3 text-left text-xs font-black text-slate-300 uppercase">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-black text-slate-300 uppercase">Applied Date</th>
                        <th className="px-6 py-3 text-left text-xs font-black text-slate-300 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-black text-slate-300 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-slate-900 divide-y-2 divide-slate-800">
                      {applications?.map((application) => (
                        <tr key={application._id} className="hover:bg-slate-800 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-indigo-950 border-2 border-indigo-600 flex items-center justify-center mr-3">
                                <span className="text-sm font-black text-indigo-400">
                                  {application.applicantName?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <div className="font-bold text-white">{application.applicantName}</div>
                                <div className="text-sm text-slate-400">{application.position}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-300">
                            {application.jobId?.title || "N/A"}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-slate-300 flex items-center mb-1">
                              <Mail className="w-3 h-3 mr-1 text-cyan-500" />
                              {application.email}
                            </div>
                            <div className="text-sm text-slate-400 flex items-center">
                              <Phone className="w-3 h-3 mr-1 text-emerald-500" />
                              {application.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-300">
                            {formatDate(application.appliedAt)}
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={application.status}
                              onChange={(e) => handleStatusChange(application._id, e.target.value)}
                              className={`px-3 py-1 text-xs font-black border-2 focus:outline-none ${getStatusColor(application.status)}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="shortlisted">Shortlisted</option>
                              <option value="rejected">Rejected</option>
                              <option value="hired">Hired</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                className="inline-flex items-center px-3 py-2 border-2 border-cyan-600 text-sm font-black bg-cyan-950 text-cyan-400 hover:bg-cyan-600 hover:text-white transition-all"
                                onClick={() => {
                                  setSelectedApplication(application);
                                  setShowModal(true);
                                }}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </button>
                              <button
                                className="inline-flex items-center px-3 py-2 border-2 border-red-600 text-sm font-black bg-red-950 text-red-400 hover:bg-red-600 hover:text-white transition-all"
                                onClick={() => {
                                  if (window.confirm("Delete this application?")) {
                                    handleDelete(application._id);
                                  }
                                }}
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {applications?.length === 0 && (
                    <div className="text-center py-12 bg-slate-950">
                      <FileText className="mx-auto h-12 w-12 text-slate-700" />
                      <h3 className="mt-2 text-sm font-bold text-white">No applications yet</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Applications will appear here once candidates start applying.
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
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border-2 border-slate-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 border-b-2 border-slate-800 px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-black text-white flex items-center">
                <FileText className="w-6 h-6 mr-2 text-indigo-500" />
                Application Details
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-slate-950 border-2 border-slate-800 p-4">
                <div className="text-sm font-bold text-slate-400 mb-1">Job Title</div>
                <div className="text-white font-bold">{selectedApplication.jobId?.title || "N/A"}</div>
              </div>

              <div className="bg-slate-950 border-2 border-slate-800 p-4">
                <div className="text-sm font-bold text-slate-400 mb-1 flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  Applicant Name
                </div>
                <div className="text-white font-bold">{selectedApplication.applicantName}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 border-2 border-slate-800 p-4">
                  <div className="text-sm font-bold text-slate-400 mb-1 flex items-center">
                    <Mail className="w-4 h-4 mr-1 text-cyan-500" />
                    Email
                  </div>
                  <div className="text-white">{selectedApplication.email}</div>
                </div>

                <div className="bg-slate-950 border-2 border-slate-800 p-4">
                  <div className="text-sm font-bold text-slate-400 mb-1 flex items-center">
                    <Phone className="w-4 h-4 mr-1 text-emerald-500" />
                    Phone
                  </div>
                  <div className="text-white">{selectedApplication.phone}</div>
                </div>
              </div>

              <div className="bg-slate-950 border-2 border-slate-800 p-4">
                <div className="text-sm font-bold text-slate-400 mb-1">Position Applied</div>
                <div className="text-white">{selectedApplication.position}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 border-2 border-slate-800 p-4">
                  <div className="text-sm font-bold text-slate-400 mb-1 flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-amber-500" />
                    Applied Date
                  </div>
                  <div className="text-white">{formatDate(selectedApplication.appliedAt)}</div>
                </div>

                <div className="bg-slate-950 border-2 border-slate-800 p-4">
                  <div className="text-sm font-bold text-slate-400 mb-1">Status</div>
                  <span className={`inline-flex px-3 py-1 text-xs font-black border-2 ${getStatusColor(selectedApplication.status)}`}>
                    {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                  </span>
                </div>
              </div>

              {selectedApplication.description && (
                <div className="bg-slate-950 border-2 border-slate-800 p-4">
                  <div className="text-sm font-bold text-slate-400 mb-2">Description</div>
                  <div className="text-slate-300 whitespace-pre-wrap">{selectedApplication.description}</div>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-4 border-t-2 border-slate-800">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border-2 border-slate-700 text-slate-300 font-black hover:bg-slate-800 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default JobApplications;
