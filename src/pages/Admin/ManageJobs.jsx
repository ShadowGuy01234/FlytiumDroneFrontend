import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../api";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/auth";
import { Briefcase, Plus, Edit2, Trash2, X, MapPin, Clock, DollarSign, Calendar } from "lucide-react";

const ManageJobs = () => {
  const { auth } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedRequirements, setUpdatedRequirements] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [updatedJobType, setUpdatedJobType] = useState("");
  const [updatedExperience, setUpdatedExperience] = useState("");
  const [updatedSalary, setUpdatedSalary] = useState("");
  const [updatedDeadline, setUpdatedDeadline] = useState("");
  const [updatedIsActive, setUpdatedIsActive] = useState(true);

  // Get all jobs
  const getAllJobs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/api/job/get-jobs`);
      setJobs(data?.jobs);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  // Create job function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const jobData = {
        title,
        description,
        requirements,
        location,
        jobType,
        experience,
        salary,
        applicationDeadline,
      };

      const { data } = await axios.post(
        `${API_URL}/api/job/create`,
        jobData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data?.success) {
        toast.success(`Job Created Successfully`);
        getAllJobs();
        setTitle("");
        setDescription("");
        setRequirements("");
        setLocation("");
        setJobType("");
        setExperience("");
        setSalary("");
        setApplicationDeadline("");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Update job function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const jobData = {
        title: updatedTitle,
        description: updatedDescription,
        requirements: updatedRequirements,
        location: updatedLocation,
        jobType: updatedJobType,
        experience: updatedExperience,
        salary: updatedSalary,
        applicationDeadline: updatedDeadline,
        isActive: updatedIsActive,
      };

      const { data } = await axios.put(
        `${API_URL}/api/job/update-job/${selected._id}`,
        jobData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data.success) {
        toast.success("Job Updated Successfully");
        setVisible(false);
        getAllJobs();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Delete job function
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${API_URL}/api/job/delete-job/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data.success) {
        toast.success("Job Deleted Successfully");
        getAllJobs();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Manage Jobs">
      <div className="min-h-screen bg-slate-950">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4">
            <AdminMenu />
          </div>

          <div className="flex-1 p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-black text-white mb-2 flex items-center">
                <Briefcase className="w-10 h-10 mr-3 text-indigo-500" />
                Job Management
              </h1>
              <p className="text-slate-400 text-lg">
                Create and manage career opportunities for top talent
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-indigo-600 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 font-bold">Total Jobs</span>
                  <Briefcase className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-3xl font-black text-white">{jobs?.length || 0}</p>
              </div>

              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-emerald-500 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 font-bold">Active</span>
                  <Clock className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-3xl font-black text-white">
                  {jobs?.filter(j => j.isActive).length || 0}
                </p>
              </div>

              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-amber-500 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 font-bold">Full-time</span>
                  <Clock className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-3xl font-black text-white">
                  {jobs?.filter(j => j.jobType === "Full-time").length || 0}
                </p>
              </div>

              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-cyan-500 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 font-bold">Locations</span>
                  <MapPin className="w-5 h-5 text-cyan-500 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-3xl font-black text-white">
                  {new Set(jobs?.map(j => j.location)).size || 0}
                </p>
              </div>
            </div>

            {/* Create Job Form */}
            <div className="bg-slate-900 border-2 border-slate-800 p-8 mb-8">
              <h3 className="text-2xl font-black text-white mb-6 flex items-center">
                <Plus className="w-6 h-6 mr-2 text-indigo-500" />
                Create New Job Opening
              </h3>
              <form onSubmit={handleCreate} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    value={description}
                    placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors resize-none"
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Requirements *
                  </label>
                  <textarea
                    value={requirements}
                    placeholder="List the required skills, qualifications, and experience..."
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors resize-none"
                    onChange={(e) => setRequirements(e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-cyan-500" />
                      Location *
                    </label>
                    <input
                      type="text"
                      value={location}
                      placeholder="e.g., Remote, New York, NY"
                      className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">
                      Job Type *
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white focus:border-indigo-600 focus:outline-none transition-colors"
                      onChange={(e) => setJobType(e.target.value)}
                      value={jobType}
                      required
                    >
                      <option value="">Select Job Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2 flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-emerald-500" />
                      Experience Required *
                    </label>
                    <input
                      type="text"
                      value={experience}
                      placeholder="e.g., 2-3 years, Entry level, Senior"
                      className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                      onChange={(e) => setExperience(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2 flex items-center">
                      <DollarSign className="w-4 h-4 mr-1 text-amber-500" />
                      Salary Range (Optional)
                    </label>
                    <input
                      type="text"
                      value={salary}
                      placeholder="e.g., $80,000 - $120,000"
                      className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                      onChange={(e) => setSalary(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-cyan-500" />
                    Application Deadline (Optional)
                  </label>
                  <input
                    type="date"
                    value={applicationDeadline}
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white focus:border-indigo-600 focus:outline-none transition-colors"
                    onChange={(e) => setApplicationDeadline(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <p className="text-sm text-slate-500 mt-1">
                    Leave empty for no deadline
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black py-3 px-8 border-2 border-indigo-500 transition-all duration-200 flex items-center"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Job Opening
                  </button>
                </div>
              </form>
            </div>

            {/* Jobs List */}
            <div className="bg-slate-900 border-2 border-slate-800 overflow-hidden">
              <div className="px-6 py-4 border-b-2 border-slate-800">
                <h3 className="text-2xl font-black text-white flex items-center">
                  <Briefcase className="w-6 h-6 mr-2 text-indigo-500" />
                  Current Job Openings ({jobs?.length || 0})
                </h3>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  <p className="mt-2 text-slate-400">Loading jobs...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y-2 divide-slate-800">
                    <thead className="bg-slate-950">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-black text-slate-300 uppercase tracking-wider">
                          Job Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-black text-slate-300 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-black text-slate-300 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-black text-slate-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-black text-slate-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-slate-900 divide-y-2 divide-slate-800">
                      {jobs?.map((job) => (
                        <tr
                          key={job._id}
                          className="hover:bg-slate-800 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="font-bold text-white">
                              {job.title}
                            </div>
                            <div className="text-sm text-slate-400">
                              Experience: {job.experience}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-300 flex items-center">
                            <MapPin className="w-4 h-4 mr-1 text-cyan-500" />
                            {job.location}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-3 py-1 text-xs font-black border-2 bg-indigo-950 border-indigo-600 text-indigo-400">
                              {job.jobType}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-black border-2 ${
                                job.isActive
                                  ? "bg-emerald-950 border-emerald-600 text-emerald-400"
                                  : "bg-red-950 border-red-600 text-red-400"
                              }`}
                            >
                              {job.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                className="inline-flex items-center px-3 py-2 border-2 border-indigo-600 text-sm font-black bg-indigo-950 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all"
                                onClick={() => {
                                  setVisible(true);
                                  setSelected(job);
                                  setUpdatedTitle(job.title);
                                  setUpdatedDescription(job.description);
                                  setUpdatedRequirements(job.requirements);
                                  setUpdatedLocation(job.location);
                                  setUpdatedJobType(job.jobType);
                                  setUpdatedExperience(job.experience);
                                  setUpdatedSalary(job.salary || "");
                                  setUpdatedDeadline(
                                    job.applicationDeadline
                                      ? job.applicationDeadline.split("T")[0]
                                      : ""
                                  );
                                  setUpdatedIsActive(job.isActive);
                                }}
                              >
                                <Edit2 className="w-4 h-4 mr-1" />
                                Edit
                              </button>
                              <button
                                className="inline-flex items-center px-3 py-2 border-2 border-red-600 text-sm font-black bg-red-950 text-red-400 hover:bg-red-600 hover:text-white transition-all"
                                onClick={() => {
                                  const answer = window.confirm(
                                    "Are you sure you want to delete this job?"
                                  );
                                  if (answer) handleDelete(job._id);
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

                  {jobs?.length === 0 && (
                    <div className="text-center py-12 bg-slate-950">
                      <Briefcase className="mx-auto h-12 w-12 text-slate-700" />
                      <h3 className="mt-2 text-sm font-bold text-white">
                        No job openings
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Get started by creating your first job opening.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Dark Modal */}
      {visible && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border-2 border-slate-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 border-b-2 border-slate-800 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-2xl font-black text-white flex items-center">
                <Edit2 className="w-6 h-6 mr-2 text-indigo-500" />
                Edit Job Opening
              </h3>
              <button
                onClick={() => setVisible(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={updatedTitle}
                  placeholder="Job Title"
                  className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Job Description *
                </label>
                <textarea
                  value={updatedDescription}
                  placeholder="Job Description"
                  className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors resize-none"
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Requirements *
                </label>
                <textarea
                  value={updatedRequirements}
                  placeholder="Job Requirements"
                  className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors resize-none"
                  onChange={(e) => setUpdatedRequirements(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={updatedLocation}
                    placeholder="Location"
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                    onChange={(e) => setUpdatedLocation(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Job Type *
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white focus:border-indigo-600 focus:outline-none transition-colors"
                    onChange={(e) => setUpdatedJobType(e.target.value)}
                    value={updatedJobType}
                    required
                  >
                    <option value="">Select Job Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Experience Required *
                  </label>
                  <input
                    type="text"
                    value={updatedExperience}
                    placeholder="Experience Required"
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                    onChange={(e) => setUpdatedExperience(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={updatedSalary}
                    placeholder="Salary Range"
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                    onChange={(e) => setUpdatedSalary(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Application Deadline
                </label>
                <input
                  type="date"
                  value={updatedDeadline}
                  className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white focus:border-indigo-600 focus:outline-none transition-colors"
                  onChange={(e) => setUpdatedDeadline(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Job Status *
                </label>
                <select
                  className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white focus:border-indigo-600 focus:outline-none transition-colors"
                  onChange={(e) => setUpdatedIsActive(e.target.value === 'true')}
                  value={updatedIsActive}
                  required
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setVisible(false)}
                  className="px-6 py-3 border-2 border-slate-700 text-slate-300 font-black hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black border-2 border-indigo-500 transition-all"
                >
                  UPDATE JOB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ManageJobs;
