import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../api";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/auth";
import { Users, Plus, Edit2, Trash2, X, Save, Upload, Calendar, Award } from "lucide-react";

const ManageEmployees = () => {
  const { auth } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    status: "current",
    joinDate: "",
    leaveDate: "",
    description: "",
    displayOrder: 0,
    featured: false,
    isActive: true,
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });
  };

  const getEmploymentSummary = (employee) => {
    const joined = formatDate(employee.joinDate);
    if (employee.status === "current") {
      return `Currently working since ${joined}`;
    }
    const left = formatDate(employee.leaveDate);
    return left === "—"
      ? `Worked from ${joined}`
      : `Worked from ${joined} to ${left}`;
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/employee/get-employees?includeInactive=true`
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const nextValue = type === "checkbox" ? checked : value;
      const updated = {
        ...prev,
        [name]: nextValue,
      };

      if (name === "status" && nextValue === "current") {
        updated.leaveDate = "";
      }

      return updated;
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      designation: "",
      status: "current",
      joinDate: "",
      leaveDate: "",
      description: "",
      displayOrder: 0,
      featured: false,
      isActive: true,
    });
    setPhotoFile(null);
    setPhotoPreview("");
    setEditingEmployee(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      if (photoFile) {
        formDataToSend.append("photo", photoFile);
      }

      if (editingEmployee) {
        await axios.put(
          `${API_URL}/api/employee/update-employee/${editingEmployee._id}`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Employee updated successfully");
      } else {
        await axios.post(
          `${API_URL}/api/employee/create-employee`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Employee created successfully");
      }

      fetchEmployees();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error saving employee:", error);
      toast.error("Failed to save employee");
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      designation: employee.designation,
      status: employee.status,
      joinDate: employee.joinDate
        ? new Date(employee.joinDate).toISOString().split("T")[0]
        : "",
      leaveDate: employee.leaveDate
        ? new Date(employee.leaveDate).toISOString().split("T")[0]
        : "",
      description: employee.description || "",
      displayOrder: employee.displayOrder,
      featured: employee.featured,
      isActive: employee.isActive,
    });
    if (employee.photo) {
      setPhotoPreview(employee.photo);
    }
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${API_URL}/api/employee/delete-employee/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        toast.success("Employee deleted successfully");
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
        toast.error("Failed to delete employee");
      }
    }
  };

  return (
    <Layout title="Manage Employees">
      <div className="min-h-screen bg-slate-950">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4">
            <AdminMenu />
          </div>

          <div className="flex-1 p-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-white mb-2 flex items-center">
                  <Users className="w-10 h-10 mr-3 text-indigo-500" />
                  Team Members
                </h1>
                <p className="text-slate-400 text-lg">
                  Manage your team and employee information
                </p>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black py-3 px-6 border-2 border-indigo-500 transition-all flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Employee
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-indigo-600 transition-all">
                <p className="text-3xl font-black text-white">{employees.length}</p>
                <p className="text-sm text-slate-400 font-bold">Total Team</p>
              </div>
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-emerald-500 transition-all">
                <p className="text-3xl font-black text-emerald-400">
                  {employees.filter(e => e.status === "current").length}
                </p>
                <p className="text-sm text-emerald-400 font-bold">Current</p>
              </div>
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-amber-500 transition-all">
                <p className="text-3xl font-black text-amber-400">
                  {employees.filter(e => e.featured).length}
                </p>
                <p className="text-sm text-amber-400 font-bold">Featured</p>
              </div>
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-cyan-500 transition-all">
                <p className="text-3xl font-black text-cyan-400">
                  {employees.filter(e => e.isActive).length}
                </p>
                <p className="text-sm text-cyan-400 font-bold">Active</p>
              </div>
            </div>

            {/* Employees Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-slate-400">Loading employees...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map((employee) => (
                  <div
                    key={employee._id}
                    className="bg-slate-900 border-2 border-slate-800 overflow-hidden hover:border-indigo-600 transition-all"
                  >
                    <div className="relative h-48 bg-slate-950 flex items-center justify-center">
                      {employee.photo ? (
                        <img
                          src={employee.photo}
                          alt={employee.name}
                          className="w-32 h-32 object-cover border-4 border-slate-800"
                        />
                      ) : (
                        <Users className="w-16 h-16 text-slate-700" />
                      )}
                      <div className="absolute top-2 right-2 flex gap-2">
                        {employee.featured && (
                          <span className="px-2 py-1 text-xs font-black bg-amber-950 border-2 border-amber-600 text-amber-400">
                            <Award className="w-3 h-3 inline mr-1" />
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-black text-white mb-1">
                        {employee.name}
                      </h3>
                      <p className="text-sm text-indigo-400 font-bold mb-2">
                        {employee.designation}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`px-2 py-1 text-xs font-black border-2 ${
                            employee.status === "current"
                              ? "bg-emerald-950 border-emerald-600 text-emerald-400"
                              : "bg-slate-800 border-slate-600 text-slate-400"
                          }`}
                        >
                          {employee.status === "current" ? "Current" : "Former"}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-black border-2 ${
                            employee.isActive
                              ? "bg-cyan-950 border-cyan-600 text-cyan-400"
                              : "bg-red-950 border-red-600 text-red-400"
                          }`}
                        >
                          {employee.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mb-4 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {getEmploymentSummary(employee)}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(employee)}
                          className="flex-1 inline-flex items-center justify-center px-3 py-2 border-2 border-cyan-600 text-sm font-black bg-cyan-950 text-cyan-400 hover:bg-cyan-600 hover:text-white transition-all"
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(employee._id)}
                          className="flex-1 inline-flex items-center justify-center px-3 py-2 border-2 border-red-600 text-sm font-black bg-red-950 text-red-400 hover:bg-red-600 hover:text-white transition-all"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {employees.length === 0 && (
                  <div className="col-span-full bg-slate-900 border-2 border-slate-800 p-12 text-center">
                    <Users className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                    <p className="text-xl text-white font-bold">No employees yet</p>
                    <p className="text-slate-500 mt-2">Add your first team member to get started</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Employee Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-slate-900 border-2 border-slate-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-slate-900 border-b-2 border-slate-800 px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-black text-white flex items-center">
                {editingEmployee ? <Edit2 className="w-6 h-6 mr-2 text-indigo-500" /> : <Plus className="w-6 h-6 mr-2 text-indigo-500" />}
                {editingEmployee ? "Edit Employee" : "Add New Employee"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Designation *</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Photo</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    id="employee-photo"
                  />
                  <label
                    htmlFor="employee-photo"
                    className="cursor-pointer bg-slate-950 border-2 border-slate-800 text-slate-300 px-4 py-3 hover:border-indigo-600 transition-all flex items-center"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Choose Photo
                  </label>
                  {photoPreview && (
                    <img src={photoPreview} alt="Preview" className="h-20 w-20 object-cover border-2 border-slate-800" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white focus:border-indigo-600 focus:outline-none transition-colors"
                  >
                    <option value="current">Current</option>
                    <option value="former">Former</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Join Date *</label>
                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleInputChange}
                    max={today}
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white focus:border-indigo-600 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {formData.status === "former" && (
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Leave Date</label>
                  <input
                    type="date"
                    name="leaveDate"
                    value={formData.leaveDate}
                    onChange={handleInputChange}
                    min={formData.joinDate}
                    max={today}
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white focus:border-indigo-600 focus:outline-none transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors resize-none"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Display Order</label>
                  <input
                    type="number"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white focus:border-indigo-600 focus:outline-none transition-colors"
                    min="0"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-5 h-5 bg-slate-950 border-2 border-slate-800 text-indigo-600 focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="ml-2 text-sm font-bold text-slate-300">Featured</span>
                  </label>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="w-5 h-5 bg-slate-950 border-2 border-slate-800 text-indigo-600 focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="ml-2 text-sm font-bold text-slate-300">Active</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t-2 border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border-2 border-slate-700 text-slate-300 font-black hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black border-2 border-indigo-500 transition-all"
                >
                  <Save className="w-5 h-5 inline mr-2" />
                  {editingEmployee ? "Update Employee" : "Add Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ManageEmployees;
