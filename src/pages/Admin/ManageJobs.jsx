import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../api";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/auth";
import { Modal, Select } from "antd";

const { Option } = Select;

const ManageJobs = () => {
  // Auth hook
  const { auth } = useAuth();

  // Job list states
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal states
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  // Update job states
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedRequirements, setUpdatedRequirements] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [updatedJobType, setUpdatedJobType] = useState("");
  const [updatedExperience, setUpdatedExperience] = useState("");
  const [updatedSalary, setUpdatedSalary] = useState("");
  const [updatedDeadline, setUpdatedDeadline] = useState("");
  const [updatedIsActive, setUpdatedIsActive] = useState(true);

  // Create job form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");

  // Get all jobs
  const getAllJobs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/api/job/get-jobs`);
      setJobs(data.jobs);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting jobs");
    } finally {
      setLoading(false);
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
        applicationDeadline: applicationDeadline || null,
      };

      const { data } = await axios.post(`${API_URL}/api/job/create`, jobData, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (data?.success) {
        toast.success("Job Created Successfully");
        getAllJobs();
        // Reset form
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
        applicationDeadline: updatedDeadline || null,
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

      if (data?.success) {
        toast.success("Job Updated Successfully");
        setSelected(null);
        setUpdatedTitle("");
        setUpdatedDescription("");
        setUpdatedRequirements("");
        setUpdatedLocation("");
        setUpdatedJobType("");
        setUpdatedExperience("");
        setUpdatedSalary("");
        setUpdatedDeadline("");
        setUpdatedIsActive(true);
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
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 bg-white shadow-md">
            <AdminMenu />
          </div>

          <div className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Manage Jobs</h1>
              <p className="text-gray-600">
                Create and manage job openings for your company.
              </p>
            </div>

            {/* Create Job Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create New Job Opening
              </h3>
              <form onSubmit={handleCreate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    value={description}
                    placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requirements *
                  </label>
                  <textarea
                    value={requirements}
                    placeholder="List the required skills, qualifications, and experience..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    onChange={(e) => setRequirements(e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={location}
                      placeholder="e.g., Remote, New York, NY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Type *
                    </label>
                    <Select
                      placeholder="Select Job Type"
                      className="w-full"
                      size="large"
                      onChange={(value) => setJobType(value)}
                      value={jobType}
                    >
                      <Option value="Full-time">Full-time</Option>
                      <Option value="Part-time">Part-time</Option>
                      <Option value="Contract">Contract</Option>
                      <Option value="Internship">Internship</Option>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Required *
                    </label>
                    <input
                      type="text"
                      value={experience}
                      placeholder="e.g., 2-3 years, Entry level, Senior"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      onChange={(e) => setExperience(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary Range (Optional)
                    </label>
                    <input
                      type="text"
                      value={salary}
                      placeholder="e.g., $80,000 - $120,000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      onChange={(e) => setSalary(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Deadline (Optional)
                  </label>
                  <input
                    type="date"
                    value={applicationDeadline}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    onChange={(e) => setApplicationDeadline(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Leave empty for no deadline
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center"
                  >
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Create Job Opening
                  </button>
                </div>
              </form>
            </div>

            {/* Jobs List */}
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
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Current Job Openings ({jobs?.length || 0})
                </h3>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Loading jobs...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Job Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
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
                      {jobs?.map((job) => (
                        <tr
                          key={job._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">
                              {job.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              Experience: {job.experience}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {job.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              {job.jobType}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                job.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {job.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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
                                <svg
                                  className="w-4 h-4 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                                Edit
                              </button>
                              <button
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                onClick={() => {
                                  const answer = window.confirm(
                                    "Are you sure you want to delete this job?"
                                  );
                                  if (answer) handleDelete(job._id);
                                }}
                              >
                                <svg
                                  className="w-4 h-4 mr-1"
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

                  {jobs?.length === 0 && (
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
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v10.5a2.25 2.25 0 01-2.25 2.25H10.25A2.25 2.25 0 018 16.5V6"
                        />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No job openings
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
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

      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        open={visible}
        width={800}
      >
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <input
              type="text"
              value={updatedTitle}
              placeholder="Job Title"
              className="form-control"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <textarea
              value={updatedDescription}
              placeholder="Job Description"
              className="form-control"
              onChange={(e) => setUpdatedDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="mb-3">
            <textarea
              value={updatedRequirements}
              placeholder="Job Requirements"
              className="form-control"
              onChange={(e) => setUpdatedRequirements(e.target.value)}
              rows={3}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                value={updatedLocation}
                placeholder="Location"
                className="form-control"
                onChange={(e) => setUpdatedLocation(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <Select
                placeholder="Select Job Type"
                style={{ width: "100%" }}
                onChange={(value) => setUpdatedJobType(value)}
                value={updatedJobType}
              >
                <Option value="Full-time">Full-time</Option>
                <Option value="Part-time">Part-time</Option>
                <Option value="Contract">Contract</Option>
                <Option value="Internship">Internship</Option>
              </Select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                value={updatedExperience}
                placeholder="Experience Required"
                className="form-control"
                onChange={(e) => setUpdatedExperience(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                value={updatedSalary}
                placeholder="Salary Range"
                className="form-control"
                onChange={(e) => setUpdatedSalary(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <input
              type="date"
              value={updatedDeadline}
              className="form-control"
              onChange={(e) => setUpdatedDeadline(e.target.value)}
            />
            <small className="text-muted">Application Deadline</small>
          </div>

          <div className="mb-3">
            <Select
              placeholder="Job Status"
              style={{ width: "100%" }}
              onChange={(value) => setUpdatedIsActive(value)}
              value={updatedIsActive}
            >
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              UPDATE JOB
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default ManageJobs;
