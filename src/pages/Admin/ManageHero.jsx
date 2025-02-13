import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { API_URL } from "../../api";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/auth";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon } from "lucide-react";

const ManageHero = () => {
  const [slides, setSlides] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    buttonText: "",
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

  const handleEdit = (slide) => {
    setSelectedSlide(slide);
    setFormData({
      title: slide.title,
      description: slide.description,
      buttonText: slide.buttonText,
      image: slide.image,
      order: slide.order,
      isActive: slide.isActive,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this slide?"
      );
      if (confirmed) {
        await axios.delete(`${API_URL}/api/hero/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        toast.success("Slide deleted successfully");
        fetchSlides();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting slide");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      buttonText: "",
      image: "",
      order: 0,
      isActive: true,
    });
    setSelectedSlide(null);
  };

  return (
    <Layout title="Manage Hero Slides - Admin Dashboard">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <AdminMenu />
          </div>

          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Manage Hero Slides</h1>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New Slide
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {slides.map((slide) => (
                <div
                  key={slide._id}
                  className="bg-white rounded-lg shadow-sm p-4 space-y-4"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="font-semibold text-lg">{slide.title}</h3>
                  <p className="text-gray-600">{slide.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Order: {slide.order}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(slide)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(slide._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {selectedSlide ? "Edit Slide" : "Add New Slide"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.buttonText}
                    onChange={(e) =>
                      setFormData({ ...formData, buttonText: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Image
                  </label>
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    <ImageIcon className="w-5 h-5" />
                    {formData.image ? "Change Image" : "Upload Image"}
                  </label>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                  >
                    {isUploading
                      ? "Uploading..."
                      : selectedSlide
                      ? "Update Slide"
                      : "Create Slide"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ManageHero;
