import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { API_URL } from "../../api";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/auth";
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon, Monitor } from "lucide-react";

const ManageHero = () => {
  const [slides, setSlides] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    image: "",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/hero`);
      if (data.success) {
        setSlides(data.heros);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching slides");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "flytium");
      formData.append("cloud_name", "dhkpwi9ga");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dhkpwi9ga/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setFormData((prev) => ({ ...prev, image: data.secure_url }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedSlide) {
        await axios.put(`${API_URL}/api/hero/${selectedSlide._id}`, formData, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        toast.success("Slide updated successfully");
      } else {
        await axios.post(`${API_URL}/api/hero`, formData, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        toast.success("Slide created successfully");
      }
      resetForm();
      setIsModalOpen(false);
      fetchSlides();
    } catch (error) {
      console.error(error);
      toast.error("Error saving slide");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this slide?")) {
      try {
        await axios.delete(`${API_URL}/api/hero/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        toast.success("Slide deleted successfully");
        fetchSlides();
      } catch (error) {
        console.error(error);
        toast.error("Error deleting slide");
      }
    }
  };

  const handleEdit = (slide) => {
    setSelectedSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      buttonText: slide.buttonText,
      buttonLink: slide.buttonLink,
      image: slide.image,
      order: slide.order,
      isActive: slide.isActive,
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      buttonText: "",
      buttonLink: "",
      image: "",
      order: 0,
      isActive: true,
    });
    setSelectedSlide(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <Layout title="Manage Hero Slider">
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
                  <Monitor className="w-10 h-10 mr-3 text-indigo-500" />
                  Hero Slider
                </h1>
                <p className="text-slate-400 text-lg">
                  Manage homepage carousel slides
                </p>
              </div>
              <button
                onClick={openCreateModal}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black py-3 px-6 border-2 border-indigo-500 transition-all flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Slide
              </button>
            </div>

            {/* Slides Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slides?.map((slide) => (
                <div
                  key={slide._id}
                  className="bg-slate-900 border-2 border-slate-800 overflow-hidden hover:border-indigo-600 transition-all"
                >
                  <div className="relative h-48 bg-slate-950">
                    {slide.image ? (
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-slate-700" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <span
                        className={`px-2 py-1 text-xs font-black border-2 ${
                          slide.isActive
                            ? "bg-emerald-950 border-emerald-600 text-emerald-400"
                            : "bg-red-950 border-red-600 text-red-400"
                        }`}
                      >
                        {slide.isActive ? "Active" : "Inactive"}
                      </span>
                      <span className="px-2 py-1 text-xs font-black bg-indigo-950 border-2 border-indigo-600 text-indigo-400">
                        Order: {slide.order}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-black text-white mb-1">
                      {slide.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-2">{slide.subtitle}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                      {slide.description}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(slide)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 border-2 border-cyan-600 text-sm font-black bg-cyan-950 text-cyan-400 hover:bg-cyan-600 hover:text-white transition-all"
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(slide._id)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 border-2 border-red-600 text-sm font-black bg-red-950 text-red-400 hover:bg-red-600 hover:text-white transition-all"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {slides?.length === 0 && (
                <div className="col-span-full bg-slate-900 border-2 border-slate-800 p-12 text-center">
                  <Monitor className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                  <p className="text-xl text-white font-bold">No slides yet</p>
                  <p className="text-slate-500 mt-2">
                    Create your first hero slide to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-slate-900 border-2 border-slate-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-slate-900 border-b-2 border-slate-800 px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-black text-white flex items-center">
                {selectedSlide ? <Edit2 className="w-6 h-6 mr-2 text-indigo-500" /> : <Plus className="w-6 h-6 mr-2 text-indigo-500" />}
                {selectedSlide ? "Edit Slide" : "Create New Slide"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                  placeholder="Enter slide title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                  placeholder="Enter subtitle"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors resize-none"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.buttonText}
                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                    placeholder="e.g., Learn More"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Button Link
                  </label>
                  <input
                    type="text"
                    value={formData.buttonLink}
                    onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                    placeholder="/products"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">
                  Slide Image *
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="hero-image"
                  />
                  <label
                    htmlFor="hero-image"
                    className="cursor-pointer bg-slate-950 border-2 border-slate-800 text-slate-300 px-4 py-3 hover:border-indigo-600 transition-all flex items-center"
                  >
                    <ImageIcon className="w-5 h-5 mr-2" />
                    {isUploading ? "Uploading..." : "Choose Image"}
                  </label>
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-20 w-20 object-cover border-2 border-slate-800"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white focus:border-indigo-600 focus:outline-none transition-colors"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                    className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white focus:border-indigo-600 focus:outline-none transition-colors"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t-2 border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border-2 border-slate-700 text-slate-300 font-black hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black border-2 border-indigo-500 transition-all disabled:opacity-50"
                >
                  <Save className="w-5 h-5 inline mr-2" />
                  {selectedSlide ? "Update Slide" : "Create Slide"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ManageHero;
