import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { API_URL } from "../../api";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/auth";
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon, Tag, DollarSign } from "lucide-react";

const CreateAd = () => {
  const [ads, setAds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    features: "",
    image: "",
  });

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/ad/get-ads`);
      if (data.success) {
        setAds(data.ads);
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
      toast.error("Failed to fetch ads");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", "flytium");
      uploadData.append("cloud_name", "dhkpwi9ga");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dhkpwi9ga/image/upload",
        {
          method: "POST",
          body: uploadData,
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
      if (selectedAd) {
        await axios.put(`${API_URL}/api/ad/update-ad/${selectedAd._id}`, formData, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        toast.success("Ad updated successfully");
      } else {
        await axios.post(`${API_URL}/api/ad/create-ad`, formData, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        toast.success("Ad created successfully");
      }
      resetForm();
      setIsModalOpen(false);
      fetchAds();
    } catch (error) {
      console.error("Error saving ad:", error);
      toast.error("Failed to save ad");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ad?")) {
      try {
        await axios.delete(`${API_URL}/api/ad/delete-ad/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        toast.success("Ad deleted successfully");
        fetchAds();
      } catch (error) {
        console.error("Error deleting ad:", error);
        toast.error("Failed to delete ad");
      }
    }
  };

  const handleEdit = (ad) => {
    setSelectedAd(ad);
    setFormData({
      title: ad.title,
      description: ad.description,
      price: ad.price,
      features: ad.features,
      image: ad.image,
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      features: "",
      image: "",
    });
    setSelectedAd(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <Layout title="Manage Ads">
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
                  <Tag className="w-10 h-10 mr-3 text-indigo-500" />
                  Advertisement Management
                </h1>
                <p className="text-slate-400 text-lg">
                  Create and manage promotional ads
                </p>
              </div>
              <button
                onClick={openCreateModal}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black py-3 px-6 border-2 border-indigo-500 transition-all flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Ad
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-indigo-600 transition-all">
                <p className="text-3xl font-black text-white">{ads.length}</p>
                <p className="text-sm text-slate-400 font-bold">Total Ads</p>
              </div>
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-emerald-500 transition-all">
                <p className="text-3xl font-black text-emerald-400">
                  {ads.filter(ad => ad.image).length}
                </p>
                <p className="text-sm text-emerald-400 font-bold">With Images</p>
              </div>
              <div className="bg-slate-900 border-2 border-slate-800 p-6 hover:border-amber-500 transition-all">
                <p className="text-3xl font-black text-amber-400">
                  {ads.filter(ad => ad.price).length}
                </p>
                <p className="text-sm text-amber-400 font-bold">Priced</p>
              </div>
            </div>

            {/* Ads Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ads?.map((ad) => (
                <div
                  key={ad._id}
                  className="bg-slate-900 border-2 border-slate-800 overflow-hidden hover:border-indigo-600 transition-all"
                >
                  <div className="relative h-48 bg-slate-950">
                    {ad.image ? (
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-slate-700" />
                      </div>
                    )}
                    {ad.price && (
                      <div className="absolute top-2 right-2">
                        <span className="px-3 py-1 text-sm font-black bg-emerald-950 border-2 border-emerald-600 text-emerald-400 flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {ad.price}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-black text-white mb-2">{ad.title}</h3>
                    <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                      {ad.description}
                    </p>
                    {ad.features && (
                      <p className="text-xs text-slate-500 mb-4 line-clamp-1">
                        Features: {ad.features}
                      </p>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(ad)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 border-2 border-cyan-600 text-sm font-black bg-cyan-950 text-cyan-400 hover:bg-cyan-600 hover:text-white transition-all"
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ad._id)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 border-2 border-red-600 text-sm font-black bg-red-950 text-red-400 hover:bg-red-600 hover:text-white transition-all"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {ads?.length === 0 && (
                <div className="col-span-full bg-slate-900 border-2 border-slate-800 p-12 text-center">
                  <Tag className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                  <p className="text-xl text-white font-bold">No ads yet</p>
                  <p className="text-slate-500 mt-2">
                    Create your first advertisement to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ad Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-slate-900 border-2 border-slate-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-slate-900 border-b-2 border-slate-800 px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-black text-white flex items-center">
                {selectedAd ? <Edit2 className="w-6 h-6 mr-2 text-indigo-500" /> : <Plus className="w-6 h-6 mr-2 text-indigo-500" />}
                {selectedAd ? "Edit Advertisement" : "Create New Advertisement"}
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
                <label className="block text-sm font-bold text-slate-300 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                  placeholder="Enter ad title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors resize-none"
                  placeholder="Enter ad description"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors"
                  placeholder="e.g., $99.99"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Features</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-600 focus:outline-none transition-colors resize-none"
                  placeholder="List key features (comma separated)"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Ad Image *</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="ad-image"
                  />
                  <label
                    htmlFor="ad-image"
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
                  {selectedAd ? "Update Ad" : "Create Ad"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CreateAd;
